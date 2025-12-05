import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, RefreshCw, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface QuizResultsProps {
  score: number;
  total: number;
  onRetry: () => void;
}

export function QuizResults({ score, total, onRetry }: QuizResultsProps) {
  const percentage = Math.round((score / total) * 100);
  
  const getMessage = () => {
    if (percentage >= 90) return { text: "Excellent!", emoji: "🎉" };
    if (percentage >= 70) return { text: "Great job!", emoji: "👏" };
    if (percentage >= 50) return { text: "Good effort!", emoji: "👍" };
    return { text: "Keep practicing!", emoji: "💪" };
  };

  const message = getMessage();

  return (
    <Card variant="elevated" className="w-full max-w-md mx-auto text-center animate-slide-up">
      <CardHeader>
        <div className="w-20 h-20 rounded-full gradient-hero flex items-center justify-center mx-auto mb-4 shadow-glow">
          <Trophy className="h-10 w-10 text-primary-foreground" />
        </div>
        <CardTitle className="text-3xl">
          {message.emoji} {message.text}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="text-6xl font-bold gradient-text mb-2">
            {percentage}%
          </div>
          <p className="text-muted-foreground">
            You got {score} out of {total} questions correct
          </p>
        </div>

        {/* Progress Ring Visual */}
        <div className="relative w-32 h-32 mx-auto">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-secondary"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${percentage * 3.52} 352`}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--accent))" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="hero" className="flex-1" onClick={onRetry}>
            <RefreshCw className="h-4 w-4" />
            Try Another Quiz
          </Button>
          <Link to="/" className="flex-1">
            <Button variant="outline" className="w-full">
              <Home className="h-4 w-4" />
              Back Home
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
