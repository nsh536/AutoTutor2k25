import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, ArrowRight, Trophy } from "lucide-react";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizCardProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
  showNextButton: boolean;
  isLastQuestion: boolean;
}

export function QuizCard({ 
  question, 
  questionNumber, 
  totalQuestions, 
  onAnswer,
  onNext,
  showNextButton,
  isLastQuestion
}: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
    onAnswer(selectedAnswer === question.correctAnswer);
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <Card variant="elevated" className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </span>
          <div className="flex gap-1">
            {Array.from({ length: totalQuestions }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  i < questionNumber - 1
                    ? "bg-primary"
                    : i === questionNumber - 1
                    ? "bg-primary animate-pulse-glow"
                    : "bg-muted"
                )}
              />
            ))}
          </div>
        </div>
        <CardTitle className="text-xl">{question.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectOption = index === question.correctAnswer;
            
            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={showResult}
                className={cn(
                  "w-full p-4 rounded-xl text-left transition-all border-2",
                  !showResult && "hover:border-primary/50 hover:bg-secondary cursor-pointer",
                  isSelected && !showResult && "border-primary bg-primary/10",
                  showResult && isCorrectOption && "border-success bg-success/10",
                  showResult && isSelected && !isCorrectOption && "border-destructive bg-destructive/10",
                  !isSelected && !showResult && "border-border",
                  showResult && !isSelected && !isCorrectOption && "border-border opacity-50"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm transition-colors",
                    showResult && isCorrectOption ? "bg-success text-success-foreground" :
                    showResult && isSelected && !isCorrectOption ? "bg-destructive text-destructive-foreground" :
                    isSelected ? "bg-primary text-primary-foreground" : "bg-secondary"
                  )}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {showResult && isCorrectOption && (
                    <CheckCircle className="h-5 w-5 text-success" />
                  )}
                  {showResult && isSelected && !isCorrectOption && (
                    <XCircle className="h-5 w-5 text-destructive" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {showResult && question.explanation && (
          <div className={cn(
            "p-4 rounded-xl animate-slide-up",
            isCorrect ? "bg-success/10 border border-success/20" : "bg-secondary"
          )}>
            <p className="text-sm font-medium mb-1 flex items-center gap-2">
              {isCorrect ? (
                <>
                  <CheckCircle className="h-4 w-4 text-success" />
                  Correct!
                </>
              ) : (
                "Explanation:"
              )}
            </p>
            <p className="text-sm text-muted-foreground">{question.explanation}</p>
          </div>
        )}

        <div className="flex gap-3">
          {!showResult ? (
            <Button
              variant="hero"
              className="w-full"
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
            >
              Submit Answer
            </Button>
          ) : (
            <Button
              variant="hero"
              className="w-full"
              onClick={onNext}
            >
              {isLastQuestion ? (
                <>
                  <Trophy className="h-4 w-4 mr-2" />
                  View Results
                </>
              ) : (
                <>
                  Next Question
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
