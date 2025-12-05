import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, BookOpen, Calculator, Beaker, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (content: string) => {
    const userMessage: Message = { role: "user", content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const assistantMessage: Message = {
        role: "assistant",
        content: generateMockResponse(content),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateMockResponse = (question: string): string => {
    const responses: Record<string, string> = {
      default: `Great question! Let me explain this for you.\n\n**Key Points:**\n\n1. This is an important concept to understand\n2. Here are the main aspects to consider\n3. Let's break it down step by step\n\nWould you like me to elaborate on any specific part?`,
    };

    if (question.toLowerCase().includes("photosynthesis")) {
      return `**Photosynthesis** is the process by which plants convert sunlight into food! 🌱\n\n**Simple Explanation:**\n\n1. **Sunlight** is absorbed by chlorophyll (the green pigment)\n2. **Water** is drawn up from the roots\n3. **Carbon dioxide** enters through tiny pores called stomata\n4. These ingredients combine to create **glucose** (sugar) and release **oxygen**\n\n**The Formula:**\n6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂\n\nThink of it like a recipe: plants take water, air, and sunshine to cook their own food! 🍳\n\nWant me to explain any part in more detail?`;
    }

    if (question.toLowerCase().includes("quadratic")) {
      return `I'd be happy to help with quadratic equations! 📐\n\n**A quadratic equation** has the form: **ax² + bx + c = 0**\n\n**Solution Methods:**\n\n1. **Factoring**: Find two numbers that multiply to 'c' and add to 'b'\n2. **Quadratic Formula**: x = (-b ± √(b²-4ac)) / 2a\n3. **Completing the Square**: Rearrange to perfect square form\n\n**Example:**\nx² + 5x + 6 = 0\n\nFactoring: (x + 2)(x + 3) = 0\nSolutions: x = -2 or x = -3\n\nShare your specific equation and I'll walk you through it step by step!`;
    }

    return responses.default;
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
                <ChatMessage
                  key={index}
                  role={message.role}
                  content={message.content}
                />
              ))}
              {isLoading && (
                <ChatMessage role="assistant" content="" isLoading />
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
          
          {/* Input */}
          <div className="py-4">
            <ChatInput
              onSend={sendMessage}
              disabled={isLoading}
              placeholder="Ask any question about any subject..."
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
