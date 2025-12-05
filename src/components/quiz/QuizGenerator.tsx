import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Loader2 } from "lucide-react";

interface QuizGeneratorProps {
  onGenerate: (topic: string, difficulty: string, count: number) => void;
  isLoading: boolean;
}

export function QuizGenerator({ onGenerate, isLoading }: QuizGeneratorProps) {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [count, setCount] = useState("5");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onGenerate(topic.trim(), difficulty, parseInt(count));
    }
  };

  return (
    <Card variant="elevated" className="w-full max-w-lg mx-auto">
      <CardHeader className="text-center">
        <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center mx-auto mb-4">
          <Sparkles className="h-8 w-8 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl">Generate a Quiz</CardTitle>
        <CardDescription>
          Enter a topic and we'll create a custom quiz for you
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Topic</Label>
            <Input
              id="topic"
              placeholder="e.g., Photosynthesis, World War II, Algebra"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select value={difficulty} onValueChange={setDifficulty} disabled={isLoading}>
                <SelectTrigger id="difficulty">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="count">Questions</Label>
              <Select value={count} onValueChange={setCount} disabled={isLoading}>
                <SelectTrigger id="count">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 Questions</SelectItem>
                  <SelectItem value="5">5 Questions</SelectItem>
                  <SelectItem value="10">10 Questions</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            variant="hero"
            className="w-full"
            disabled={isLoading || !topic.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating Quiz...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate Quiz
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
