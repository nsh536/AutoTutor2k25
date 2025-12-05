import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 gradient-hero opacity-10" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,hsl(var(--background))_0%,transparent_20%,transparent_80%,hsl(var(--background))_100%)]" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Free to Start</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Transform
            <span className="gradient-text"> Your Learning?</span>
          </h2>
          
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Join thousands of students who are already learning smarter with AutoTutor. 
            Start your journey today.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/chat">
              <Button variant="hero" size="xl" className="group">
                Get Started Free
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/quiz">
              <Button variant="glass" size="xl">
                Try Quiz Generator
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
