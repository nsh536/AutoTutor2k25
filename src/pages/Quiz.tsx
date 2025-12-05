import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { QuizGenerator } from "@/components/quiz/QuizGenerator";
import { QuizCard, QuizQuestion } from "@/components/quiz/QuizCard";
import { QuizResults } from "@/components/quiz/QuizResults";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type QuizState = "generate" | "playing" | "results";

const Quiz = () => {
  const [state, setState] = useState<QuizState>("generate");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [answeredCurrent, setAnsweredCurrent] = useState(false);
  const { toast } = useToast();

  const generateQuiz = async (topic: string, difficulty: string, count: number) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("generate-quiz", {
        body: { topic, difficulty, count }
      });

      if (error) throw error;

      if (data?.questions && Array.isArray(data.questions)) {
        setQuestions(data.questions);
        setCurrentQuestion(0);
        setScore(0);
        setAnsweredCurrent(false);
        setState("playing");
        
        toast({
          title: "Quiz Ready!",
          description: `${data.questions.length} questions about ${topic}`,
        });
      } else {
        throw new Error("Invalid quiz data received");
      }
    } catch (error) {
      console.error("Quiz generation error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate quiz",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    setAnsweredCurrent(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setAnsweredCurrent(false);
    } else {
      setState("results");
    }
  };

  const handleRetry = () => {
    setState("generate");
    setQuestions([]);
    setCurrentQuestion(0);
    setScore(0);
    setAnsweredCurrent(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {state === "generate" && (
            <div className="animate-slide-up">
              <QuizGenerator onGenerate={generateQuiz} isLoading={isLoading} />
            </div>
          )}

          {state === "playing" && questions.length > 0 && (
            <div className="space-y-4 animate-slide-up">
              <Button
                variant="ghost"
                onClick={handleRetry}
                className="mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Generator
              </Button>
              
              <QuizCard
                key={currentQuestion}
                question={questions[currentQuestion]}
                questionNumber={currentQuestion + 1}
                totalQuestions={questions.length}
                onAnswer={handleAnswer}
                onNext={handleNext}
                showNextButton={answeredCurrent}
                isLastQuestion={currentQuestion === questions.length - 1}
              />
            </div>
          )}

          {state === "results" && (
            <QuizResults
              score={score}
              total={questions.length}
              onRetry={handleRetry}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Quiz;
