import { Link } from "react-router-dom";
import { GraduationCap, Github, Linkedin } from "lucide-react";

export function Footer() {
  const socialLinks = {
    github: "https://github.com/nsh536",
    linkedin: "https://www.linkedin.com/in/narasimha-golla8844"
  };

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl gradient-hero">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold gradient-text">AutoTutor</span>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              AI-powered tutoring system making quality education accessible to everyone, everywhere.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/chat" className="text-muted-foreground hover:text-foreground transition-colors">
                AI Tutor
              </Link>
              <Link to="/quiz" className="text-muted-foreground hover:text-foreground transition-colors">
                Quiz Generator
              </Link>
            </nav>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a 
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-secondary"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-secondary"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} AutoTutor. Built for the OpenAI x Nxtwave Buildathon.</p>
        </div>
      </div>
    </footer>
  );
}
