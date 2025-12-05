import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { QuizGenerator } from "@/components/quiz/QuizGenerator";
import { QuizCard, QuizQuestion } from "@/components/quiz/QuizCard";
import { QuizResults } from "@/components/quiz/QuizResults";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type QuizState = "generate" | "playing" | "results";

const Quiz = () => {
  const [state, setState] = useState<QuizState>("generate");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const generateQuiz = async (topic: string, difficulty: string, count: number) => {
    setIsLoading(true);
    
    // Simulate AI quiz generation (replace with actual API call)
    setTimeout(() => {
      const mockQuestions = generateMockQuestions(topic, difficulty, count);
      setQuestions(mockQuestions);
      setCurrentQuestion(0);
      setScore(0);
      setState("playing");
      setIsLoading(false);
    }, 2000);
  };

  const generateMockQuestions = (topic: string, difficulty: string, count: number): QuizQuestion[] => {
    // Mock questions based on topic
    const baseQuestions: QuizQuestion[] = [
      {
        question: `What is the primary process by which plants convert sunlight into energy?`,
        options: ["Respiration", "Photosynthesis", "Fermentation", "Decomposition"],
        correctAnswer: 1,
        explanation: "Photosynthesis is the process where plants use sunlight, water, and carbon dioxide to create glucose and oxygen.",
      },
      {
        question: `Which organelle contains chlorophyll in plant cells?`,
        options: ["Mitochondria", "Nucleus", "Chloroplast", "Ribosome"],
        correctAnswer: 2,
        explanation: "Chloroplasts contain chlorophyll, the green pigment that absorbs light energy for photosynthesis.",
      },
      {
        question: `What gas do plants release during photosynthesis?`,
        options: ["Carbon dioxide", "Nitrogen", "Oxygen", "Hydrogen"],
        correctAnswer: 2,
        explanation: "Plants release oxygen as a byproduct of photosynthesis, which is essential for most life on Earth.",
      },
      {
        question: `Which part of the plant is mainly responsible for photosynthesis?`,
        options: ["Roots", "Stem", "Leaves", "Flowers"],
        correctAnswer: 2,
        explanation: "Leaves have the highest concentration of chloroplasts and are optimized for capturing sunlight.",
      },
      {
        question: `What is the main source of energy for photosynthesis?`,
        options: ["Water", "Soil nutrients", "Sunlight", "Air"],
        correctAnswer: 2,
        explanation: "Sunlight provides the energy needed to drive the chemical reactions of photosynthesis.",
      },
      {
        question: `What substance is produced by plants during photosynthesis?`,
        options: ["Protein", "Glucose", "Fat", "Vitamin"],
        correctAnswer: 1,
        explanation: "Glucose (a type of sugar) is the primary product of photosynthesis, used for energy and growth.",
      },
      {
        question: `Where does the water used in photosynthesis come from?`,
        options: ["Air", "Leaves", "Roots", "Sunlight"],
        correctAnswer: 2,
        explanation: "Water is absorbed by the roots and transported through the stem to the leaves.",
      },
      {
        question: `What is chlorophyll?`,
        options: ["A type of sugar", "A green pigment", "A plant hormone", "A vitamin"],
        correctAnswer: 1,
        explanation: "Chlorophyll is a green pigment in plants that absorbs light energy for photosynthesis.",
      },
      {
        question: `Which gas do plants absorb from the air for photosynthesis?`,
        options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Helium"],
        correctAnswer: 2,
        explanation: "Plants absorb carbon dioxide through tiny pores called stomata on their leaves.",
      },
      {
        question: `At what time of day is photosynthesis most active?`,
        options: ["Night", "Morning", "Daytime", "Evening"],
        correctAnswer: 2,
        explanation: "Photosynthesis requires light, so it's most active during the day when sunlight is available.",
      },
    ];

    return baseQuestions.slice(0, count);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        setState("results");
      }
    }, 1500);
  };

  const handleRetry = () => {
    setState("generate");
    setQuestions([]);
    setCurrentQuestion(0);
    setScore(0);
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
                question={questions[currentQuestion]}
                questionNumber={currentQuestion + 1}
                totalQuestions={questions.length}
                onAnswer={handleAnswer}
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
