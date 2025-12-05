import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { Button } from "@/components/ui/button";
import { Sparkles, BookOpen, Calculator, Beaker, Globe, Mic, MicOff, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: "user" | "assistant";
  content: string;
  image?: string;
}

const quickPrompts = [
  { icon: BookOpen, text: "Explain photosynthesis in simple terms" },
  { icon: Calculator, text: "Help me solve a quadratic equation" },
  { icon: Beaker, text: "What are the states of matter?" },
  { icon: Globe, text: "Summarize World War II causes" },
];

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { isListening, transcript, startListening, stopListening, isSupported } = useSpeechRecognition();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (content: string) => {
    const userMessage: Message = { role: "user", content };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
      
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        }),
      });

      if (!resp.ok) {
        const errorData = await resp.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to get response");
      }

      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let assistantContent = "";

      // Add empty assistant message
      setMessages(prev => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const deltaContent = parsed.choices?.[0]?.delta?.content;
            if (deltaContent) {
              assistantContent += deltaContent;
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "assistant", content: assistantContent };
                return updated;
              });
            }
          } catch {
            // Incomplete JSON, continue
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      });
      // Remove the loading message if error
      setMessages(prev => prev.filter(m => m.content !== ""));
    } finally {
      setIsLoading(false);
    }
  };

  const generateImage = async (prompt: string) => {
    setIsGeneratingImage(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("generate-image", {
        body: { prompt }
      });

      if (error) throw error;

      if (data?.imageUrl) {
        const imageMessage: Message = {
          role: "assistant",
          content: data.description || `Here's an illustration of: ${prompt}`,
          image: data.imageUrl,
        };
        setMessages(prev => [...prev, imageMessage]);
      }
    } catch (error) {
      console.error("Image generation error:", error);
      toast({
        title: "Error",
        description: "Failed to generate image",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
      if (transcript.trim()) {
        sendMessage(transcript);
      }
    } else {
      startListening();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20 pb-4 flex flex-col">
        <div className="container mx-auto px-4 flex-1 flex flex-col max-w-4xl">
          {messages.length === 0 ? (
            /* Empty State */
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-lg animate-slide-up">
                <div className="w-20 h-20 rounded-2xl gradient-hero flex items-center justify-center mx-auto mb-6 shadow-glow">
                  <Sparkles className="h-10 w-10 text-primary-foreground" />
                </div>
                <h1 className="text-3xl font-bold mb-3">
                  Ask Me <span className="gradient-text">Anything</span>
                </h1>
                <p className="text-muted-foreground mb-8">
                  I'm your personal AI tutor. Ask questions about any subject and 
                  I'll provide clear, detailed explanations.
                </p>
                
                {isSupported && (
                  <div className="mb-6">
                    <Button
                      variant={isListening ? "destructive" : "outline"}
                      size="lg"
                      onClick={handleVoiceToggle}
                      className="gap-2"
                    >
                      {isListening ? (
                        <>
                          <MicOff className="h-5 w-5" />
                          Stop Recording
                        </>
                      ) : (
                        <>
                          <Mic className="h-5 w-5" />
                          Ask with Voice
                        </>
                      )}
                    </Button>
                    {isListening && transcript && (
                      <p className="mt-3 text-sm text-muted-foreground italic">"{transcript}"</p>
                    )}
                  </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {quickPrompts.map((prompt, index) => {
                    const Icon = prompt.icon;
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-auto py-3 px-4 justify-start text-left"
                        onClick={() => sendMessage(prompt.text)}
                      >
                        <Icon className="h-4 w-4 mr-2 flex-shrink-0 text-primary" />
                        <span className="text-sm">{prompt.text}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* Chat Messages */
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index}>
                  <ChatMessage
                    role={message.role}
                    content={message.content}
                  />
                  {message.image && (
                    <div className="ml-12 mt-2">
                      <img 
                        src={message.image} 
                        alt="Generated illustration" 
                        className="max-w-md rounded-xl shadow-lg"
                      />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <ChatMessage role="assistant" content="" isLoading />
              )}
              {isGeneratingImage && (
                <ChatMessage role="assistant" content="🎨 Generating illustration..." isLoading />
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
          
          {/* Voice Button for active chat */}
          {messages.length > 0 && isSupported && (
            <div className="flex justify-center pb-2">
              <Button
                variant={isListening ? "destructive" : "secondary"}
                size="sm"
                onClick={handleVoiceToggle}
                className="gap-2"
              >
                {isListening ? (
                  <>
                    <MicOff className="h-4 w-4" />
                    {transcript || "Listening..."}
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4" />
                    Voice Input
                  </>
                )}
              </Button>
            </div>
          )}
          
          {/* Input */}
          <div className="py-4">
            <ChatInput
              onSend={sendMessage}
              disabled={isLoading || isListening}
              placeholder="Ask any question about any subject..."
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
