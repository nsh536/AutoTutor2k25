import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, FileQuestion, Mic, Image, Globe, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: MessageSquare,
    title: "AI Chat Tutor",
    description: "Ask any question and get detailed, easy-to-understand explanations instantly. Like having a patient teacher available 24/7.",
    link: "/chat",
  },
  {
    icon: FileQuestion,
    title: "Quiz Generator",
    description: "Generate custom quizzes on any topic to test your knowledge. Get immediate feedback and track your progress.",
    link: "/quiz",
  },
  {
    icon: Mic,
    title: "Voice Input",
    description: "Speak your questions naturally. Our AI transcribes and responds, making learning more accessible and hands-free.",
    link: "/chat",
  },
  {
    icon: Image,
    title: "Visual Learning",
    description: "Request educational illustrations and diagrams generated on demand to enhance your understanding of complex concepts.",
    link: "/chat",
  },
  {
    icon: Globe,
    title: "Any Subject",
    description: "From mathematics to history, science to literature. Our AI tutor is trained to help with virtually any academic subject.",
    link: "/chat",
  },
  {
    icon: Clock,
    title: "Learn Anytime",
    description: "No scheduling needed. Access your personal tutor whenever inspiration strikes, day or night.",
    link: "/chat",
  },
];

export function FeaturesSection() {
  const navigate = useNavigate();

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to
            <span className="gradient-text"> Excel</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Powerful AI features designed to make learning engaging, efficient, and accessible for everyone.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                variant="feature"
                className="group animate-slide-up cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(feature.link)}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
