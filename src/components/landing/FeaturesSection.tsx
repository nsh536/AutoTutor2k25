import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, FileQuestion, Mic, Image, Globe, Clock, Sparkles, BookOpen, Calculator, Palette, Music, Code, Video, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: MessageSquare,
    title: "AI Chat Tutor",
    description: "Ask any question and get detailed, easy-to-understand explanations instantly. Like having a patient teacher available 24/7.",
    link: "/chat",
    gradient: "from-violet-500 to-purple-600",
    bgGradient: "from-violet-500/10 to-purple-600/10",
    preview: (
      <div className="flex flex-col gap-2 mt-4 p-3 rounded-lg bg-secondary/50">
        <div className="flex items-start gap-2">
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-3 h-3 text-primary" />
          </div>
          <p className="text-xs text-muted-foreground">How does gravity work?</p>
        </div>
        <div className="flex items-start gap-2">
          <div className="w-6 h-6 rounded-full gradient-hero flex items-center justify-center shrink-0">
            <MessageSquare className="w-3 h-3 text-primary-foreground" />
          </div>
          <p className="text-xs text-foreground/80">Gravity is a fundamental force that attracts objects with mass...</p>
        </div>
      </div>
    ),
  },
  {
    icon: FileQuestion,
    title: "Quiz Generator",
    description: "Generate custom quizzes on any topic to test your knowledge. Get immediate feedback and track your progress.",
    link: "/quiz",
    gradient: "from-emerald-500 to-teal-600",
    bgGradient: "from-emerald-500/10 to-teal-600/10",
    preview: (
      <div className="mt-4 p-3 rounded-lg bg-secondary/50">
        <p className="text-xs font-medium text-foreground mb-2">Quick Quiz Preview:</p>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-emerald-500 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            </div>
            <span className="text-xs text-muted-foreground">Option A ✓</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30"></div>
            <span className="text-xs text-muted-foreground">Option B</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: Mic,
    title: "Voice Input",
    description: "Speak your questions naturally. Our AI transcribes and responds, making learning more accessible and hands-free.",
    link: "/chat",
    gradient: "from-rose-500 to-pink-600",
    bgGradient: "from-rose-500/10 to-pink-600/10",
    preview: (
      <div className="mt-4 flex flex-col items-center justify-center p-4 rounded-lg bg-secondary/50">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center animate-pulse-glow">
            <Mic className="w-8 h-8 text-white" />
          </div>
          <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-rose-400/30 animate-ping"></div>
        </div>
        <p className="text-xs text-muted-foreground mt-3 text-center">Tap to speak your question...</p>
      </div>
    ),
  },
  {
    icon: Image,
    title: "Visual Learning",
    description: "Request educational illustrations and diagrams generated on demand to enhance your understanding of complex concepts.",
    link: "/chat",
    gradient: "from-amber-500 to-orange-600",
    bgGradient: "from-amber-500/10 to-orange-600/10",
    preview: (
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="aspect-square rounded-lg bg-gradient-to-br from-amber-400/30 to-orange-500/30 flex items-center justify-center">
          <Image className="w-5 h-5 text-amber-600" />
        </div>
        <div className="aspect-square rounded-lg bg-gradient-to-br from-blue-400/30 to-cyan-500/30 flex items-center justify-center">
          <Palette className="w-5 h-5 text-blue-600" />
        </div>
        <div className="aspect-square rounded-lg bg-gradient-to-br from-purple-400/30 to-pink-500/30 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-purple-600" />
        </div>
        <p className="col-span-3 text-xs text-center text-muted-foreground mt-1">AI-generated diagrams & illustrations</p>
      </div>
    ),
  },
  {
    icon: Globe,
    title: "Any Subject",
    description: "From mathematics to music, coding to chemistry. Our AI tutor is trained to help with virtually any academic subject.",
    link: "/chat",
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-500/10 to-indigo-600/10",
    preview: (
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-700 dark:text-blue-300">
          <Calculator className="w-3 h-3" /> Math
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-purple-500/20 text-purple-700 dark:text-purple-300">
          <Code className="w-3 h-3" /> Coding
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
          <BookOpen className="w-3 h-3" /> Literature
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-amber-500/20 text-amber-700 dark:text-amber-300">
          <Music className="w-3 h-3" /> Music
        </span>
      </div>
    ),
  },
  {
    icon: Clock,
    title: "Learn Anytime",
    description: "No scheduling needed. Access your personal tutor whenever inspiration strikes, day or night.",
    link: "/chat",
    gradient: "from-cyan-500 to-sky-600",
    bgGradient: "from-cyan-500/10 to-sky-600/10",
    preview: (
      <div className="mt-4 p-4 rounded-lg bg-secondary/50 text-center">
        <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-sky-600 text-white font-bold text-lg mb-2 shadow-lg">
          24/7
        </div>
        <p className="text-xs italic text-muted-foreground mt-2">
          "The beautiful thing about learning is that no one can take it away from you."
        </p>
        <p className="text-xs text-primary font-medium mt-1">— B.B. King</p>
      </div>
    ),
  },
  {
    icon: Video,
    title: "Live Mock Session",
    description: "Real-time voice & video sessions with AI for doubt clearing, mock interviews, and personalized tutoring.",
    link: "/live-session",
    gradient: "from-fuchsia-500 to-pink-600",
    bgGradient: "from-fuchsia-500/10 to-pink-600/10",
    preview: (
      <div className="mt-4 p-4 rounded-lg bg-secondary/50">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-pink-600 flex items-center justify-center">
            <Video className="w-5 h-5 text-white" />
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center animate-pulse">
            <Brain className="w-5 h-5 text-white" />
          </div>
        </div>
        <div className="flex flex-wrap gap-1 justify-center">
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-fuchsia-500/20 text-fuchsia-700 dark:text-fuchsia-300">Doubt Clearing</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-pink-500/20 text-pink-700 dark:text-pink-300">Mock Interview</span>
        </div>
      </div>
    ),
  },
];

export function FeaturesSection() {
  const navigate = useNavigate();

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
      
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
                className={`group animate-slide-up cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br ${feature.bgGradient}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(feature.link)}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 transition-transform group-hover:scale-110 shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                  {feature.preview}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
