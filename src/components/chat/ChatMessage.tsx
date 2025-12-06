import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isLoading?: boolean;
  image?: string;
}

export function ChatMessage({ role, content, isLoading, image }: ChatMessageProps) {
  const isUser = role === "user";

  // Parse markdown-like formatting for better display
  const formatContent = (text: string) => {
    // Split by lines and process
    return text.split('\n').map((line, idx) => {
      // Bold text
      let formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>');
      
      // Check if line is a bullet point
      const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('*');
      
      // Check if line is numbered
      const isNumbered = /^\d+[\.\)]\s/.test(line.trim());
      
      return (
        <span 
          key={idx} 
          className={cn(
            "block",
            isBullet && "pl-2 before:content-[''] before:mr-1",
            isNumbered && "pl-1",
            line.trim() === "" && "h-2"
          )}
          dangerouslySetInnerHTML={{ __html: formattedLine || '&nbsp;' }}
        />
      );
    });
  };

  return (
    <div
      className={cn(
        "flex gap-3 animate-slide-up",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center",
          isUser ? "bg-primary" : "gradient-hero"
        )}
      >
        {isUser ? (
          <User className="h-4 w-4 text-primary-foreground" />
        ) : (
          <Bot className="h-4 w-4 text-primary-foreground" />
        )}
      </div>

      {/* Message */}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3",
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-sm"
            : "bg-secondary text-secondary-foreground rounded-tl-sm"
        )}
      >
        {isLoading ? (
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        ) : (
          <div className="text-sm leading-relaxed space-y-1">
            {formatContent(content)}
            {image && (
              <div className="mt-3">
                <img 
                  src={image} 
                  alt="Generated illustration" 
                  className="max-w-full rounded-lg shadow-md"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
