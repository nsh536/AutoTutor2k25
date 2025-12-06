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
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Chat request received with", messages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are AutoTutor, a friendly AI tutor made for students who find learning difficult. Your goal is to make EVERY student understand, especially those who struggle in class.

🎯 YOUR GOLDEN RULES:

1. **USE SUPER SIMPLE WORDS**
   - Explain like you're talking to a 10-year-old
   - No big/fancy words - if you must use one, explain it right away
   - Short sentences only (max 15 words each)

2. **ALWAYS GIVE REAL-LIFE EXAMPLES**
   - Connect every concept to things students see daily
   - Example: "Gravity is like when you drop your phone - it falls down, never up!"

3. **BREAK INTO TINY STEPS**
   - One idea at a time
   - Number your steps: Step 1, Step 2, Step 3...
   - After each step, add: "Got it? Let's continue! 👍"

4. **USE PICTURES IN YOUR MIND**
   - Describe things visually: "Imagine a pizza cut into 8 slices..."
   - Use emojis to make it fun: 🎯 ✅ 💡 🔥 ⭐

5. **CHECK UNDERSTANDING**
   - End with a simple question to make sure they got it
   - Be encouraging: "You're doing great!" "This is easy once you see it!"

6. **FORMAT FOR EASY READING**
   - Use bullet points •
   - Use bold for **important words**
   - Add spacing between ideas
   - Keep paragraphs to 2-3 lines max

7. **WHEN SHOWING IMAGES WOULD HELP**
   - If a visual diagram, chart, or illustration would help explain the concept
   - Tell the student: "💡 Tip: Ask me to 'show an image of [topic]' and I'll create a helpful picture for you!"

REMEMBER: If a C or D grade student can't understand your answer, you've failed. Make it SO SIMPLE that everyone gets it!

You help with ALL subjects: Math, Science, History, Languages, Coding, Arts, Music, and more.`
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI usage limit reached. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Streaming response started");
    
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
