import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import { Mic, MicOff, Video, VideoOff, Phone, PhoneOff, Loader2, ArrowLeft, Brain, GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function LiveMockInterview() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [interviewType, setInterviewType] = useState("doubt-clearing");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const startCall = async () => {
    setIsConnecting(true);
    
    try {
      // Get ephemeral token
      const { data, error } = await supabase.functions.invoke("realtime-session", {
        body: { interviewType },
      });

      if (error || !data?.client_secret?.value) {
        throw new Error("Failed to get session token");
      }

      const ephemeralKey = data.client_secret.value;

      // Create peer connection
      pcRef.current = new RTCPeerConnection();

      // Set up audio element for AI voice
      audioElRef.current = document.createElement("audio");
      audioElRef.current.autoplay = true;

      pcRef.current.ontrack = (e) => {
        if (audioElRef.current) {
          audioElRef.current.srcObject = e.streams[0];
        }
      };

      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Add audio track to peer connection
      const audioTrack = stream.getAudioTracks()[0];
      pcRef.current.addTrack(audioTrack);

      // Set up data channel
      dcRef.current = pcRef.current.createDataChannel("oai-events");
      dcRef.current.addEventListener("message", (e) => {
        const event = JSON.parse(e.data);
        console.log("Received event:", event);
        handleAIEvent(event);
      });

      // Create and set local description
      const offer = await pcRef.current.createOffer();
      await pcRef.current.setLocalDescription(offer);

      // Connect to OpenAI
      const baseUrl = "https://api.openai.com/v1/realtime";
      const model = "gpt-4o-realtime-preview-2024-12-17";
      const sdpResponse = await fetch(`${baseUrl}?model=${model}`, {
        method: "POST",
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${ephemeralKey}`,
          "Content-Type": "application/sdp",
        },
      });

      const answer = {
        type: "answer" as RTCSdpType,
        sdp: await sdpResponse.text(),
      };

      await pcRef.current.setRemoteDescription(answer);
      
      setIsConnected(true);
      setIsConnecting(false);
      toast.success("Connected! Start speaking to begin your session.");
      
    } catch (error) {
      console.error("Error starting call:", error);
      toast.error("Failed to connect. Please try again.");
      setIsConnecting(false);
    }
  };

  const handleAIEvent = (event: any) => {
    if (event.type === "response.audio_transcript.delta") {
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: m.content + event.delta } : m
          );
        }
        return [...prev, { role: "assistant", content: event.delta }];
      });
    } else if (event.type === "response.audio.delta") {
      setIsAISpeaking(true);
    } else if (event.type === "response.audio.done") {
      setIsAISpeaking(false);
    } else if (event.type === "conversation.item.input_audio_transcription.completed") {
      setMessages((prev) => [...prev, { role: "user", content: event.transcript }]);
    }
  };

  const endCall = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (dcRef.current) {
      dcRef.current.close();
    }
    if (pcRef.current) {
      pcRef.current.close();
    }
    setIsConnected(false);
    setMessages([]);
    toast.info("Session ended");
  };

  const toggleMic = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsMicOn(audioTrack.enabled);
    }
  };

  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoOn(videoTrack.enabled);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 hover:bg-secondary"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Video Section */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="overflow-hidden border-border/50">
              <div className="relative aspect-video bg-secondary/50">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className={`w-full h-full object-cover ${!isVideoOn ? "hidden" : ""}`}
                />
                {!isVideoOn && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-6 rounded-full bg-secondary">
                      <VideoOff className="h-12 w-12 text-muted-foreground" />
                    </div>
                  </div>
                )}
                
                {isConnected && isAISpeaking && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-success text-success-foreground animate-pulse">
                      <Brain className="h-3 w-3 mr-1" />
                      AI Speaking
                    </Badge>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="p-4 bg-card border-t border-border flex items-center justify-center gap-4">
                <Button
                  variant={isMicOn ? "secondary" : "destructive"}
                  size="icon"
                  onClick={toggleMic}
                  disabled={!isConnected}
                  className="rounded-full h-12 w-12"
                >
                  {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                </Button>

                <Button
                  variant={isVideoOn ? "secondary" : "destructive"}
                  size="icon"
                  onClick={toggleVideo}
                  disabled={!isConnected}
                  className="rounded-full h-12 w-12"
                >
                  {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                </Button>

                {!isConnected ? (
                  <Button
                    onClick={startCall}
                    disabled={isConnecting}
                    className="rounded-full h-12 px-6 gradient-hero text-primary-foreground"
                  >
                    {isConnecting ? (
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    ) : (
                      <Phone className="h-5 w-5 mr-2" />
                    )}
                    {isConnecting ? "Connecting..." : "Start Session"}
                  </Button>
                ) : (
                  <Button
                    onClick={endCall}
                    variant="destructive"
                    className="rounded-full h-12 px-6"
                  >
                    <PhoneOff className="h-5 w-5 mr-2" />
                    End Session
                  </Button>
                )}
              </div>
            </Card>

            {/* Session Type Selector */}
            {!isConnected && (
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    Session Type
                  </CardTitle>
                  <CardDescription>
                    Choose what kind of help you need
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={interviewType} onValueChange={setInterviewType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="doubt-clearing">📚 Doubt Clearing Session</SelectItem>
                      <SelectItem value="mock-interview">💼 Mock Interview Practice</SelectItem>
                      <SelectItem value="concept-explanation">💡 Concept Explanation</SelectItem>
                      <SelectItem value="exam-prep">📝 Exam Preparation</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Transcript Section */}
          <div className="lg:col-span-1">
            <Card className="h-[600px] flex flex-col border-border/50">
              <CardHeader className="border-b border-border">
                <CardTitle className="text-lg">Live Transcript</CardTitle>
                <CardDescription>
                  Real-time conversation with AI tutor
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Start a session to see the conversation here</p>
                  </div>
                ) : (
                  messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-lg ${
                        msg.role === "user"
                          ? "bg-primary/10 text-foreground ml-4"
                          : "bg-secondary text-foreground mr-4"
                      }`}
                    >
                      <p className="text-xs font-medium mb-1 text-muted-foreground">
                        {msg.role === "user" ? "You" : "AI Tutor"}
                      </p>
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
