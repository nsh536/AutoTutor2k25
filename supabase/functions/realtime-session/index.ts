import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    if (!OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not set");
    }

    const { interviewType } = await req.json();

    let systemPrompt = "";
    
    switch (interviewType) {
      case "doubt-clearing":
        systemPrompt = `You are a patient and friendly AI tutor helping students clear their doubts. 
        
        IMPORTANT RULES:
        - Speak slowly and clearly like talking to a young student
        - Use very simple words that a 10-year-old can understand
        - Give real-life examples from daily life
        - Break down every concept into tiny baby steps
        - If the student seems confused, try explaining in a different way
        - Be encouraging and supportive, never make them feel bad for not understanding
        - Ask "Does this make sense?" after each explanation
        - Use phrases like "Think of it like..." or "Imagine you have..."`;
        break;
        
      case "mock-interview":
        systemPrompt = `You are a friendly interview coach conducting a mock interview.
        
        IMPORTANT RULES:
        - Start by asking what role they are preparing for
        - Ask one question at a time and wait for their answer
        - Give constructive feedback after each answer
        - Suggest improvements in a kind, encouraging way
        - If they struggle, help them structure their answer
        - Mix behavioral and technical questions appropriate to their level
        - End with summary of strengths and areas to improve`;
        break;
        
      case "concept-explanation":
        systemPrompt = `You are an expert teacher explaining concepts in the simplest way possible.
        
        IMPORTANT RULES:
        - Use the "Explain Like I'm 5" approach
        - Draw word pictures - describe things visually
        - Use analogies from everyday life (cooking, games, sports)
        - Build up from the absolute basics
        - Check understanding frequently
        - If they don't get it, try a completely different approach
        - Make it fun and interesting with stories or examples`;
        break;
        
      case "exam-prep":
        systemPrompt = `You are an exam preparation tutor helping students get ready for tests.
        
        IMPORTANT RULES:
        - Ask which subject/topic they need help with
        - Quiz them with simple questions first
        - Explain any wrong answers in detail
        - Give memory tricks and shortcuts
        - Share study tips specific to the topic
        - Build their confidence with positive reinforcement
        - Focus on commonly tested concepts`;
        break;
        
      default:
        systemPrompt = `You are a helpful AI tutor. Speak clearly and simply, as if talking to a young student. Be patient, encouraging, and always check if they understand.`;
    }

    const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-realtime-preview-2024-12-17",
        voice: "alloy",
        instructions: systemPrompt,
        input_audio_transcription: {
          model: "whisper-1",
        },
        turn_detection: {
          type: "server_vad",
          threshold: 0.5,
          prefix_padding_ms: 300,
          silence_duration_ms: 1000,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API error:", errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Session created:", data);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
