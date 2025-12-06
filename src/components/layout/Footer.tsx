import { Link } from "react-router-dom";
import { GraduationCap, Github, Twitter, Linkedin } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface SocialLinks {
  github: string;
  twitter: string;
  linkedin: string;
}

export function Footer() {
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(() => {
    const saved = localStorage.getItem("autotutor-social-links");
    return saved ? JSON.parse(saved) : { github: "", twitter: "", linkedin: "" };
  });
  
  const [tempLinks, setTempLinks] = useState<SocialLinks>(socialLinks);
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    setSocialLinks(tempLinks);
    localStorage.setItem("autotutor-social-links", JSON.stringify(tempLinks));
    setIsOpen(false);
    toast.success("Social links saved successfully!");
  };

  const handleLinkClick = (url: string, platform: string) => {
    if (!url) {
      toast.info(`No ${platform} link configured. Click the edit button to add one.`);
      return;
    }
    let formattedUrl = url;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      formattedUrl = `https://${url}`;
    }
    window.open(formattedUrl, "_blank", "noopener,noreferrer");
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
            <div className="flex items-center gap-2 mb-4">
              <h4 className="font-semibold">Connect</h4>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                    onClick={() => setTempLinks(socialLinks)}
                  >
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Social Links</DialogTitle>
                    <DialogDescription>
                      Add your social media profile URLs. These will be saved locally.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="github" className="text-right flex items-center justify-end gap-2">
                        <Github className="h-4 w-4" /> GitHub
                      </Label>
                      <Input
                        id="github"
                        placeholder="github.com/username"
                        value={tempLinks.github}
                        onChange={(e) => setTempLinks({ ...tempLinks, github: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="twitter" className="text-right flex items-center justify-end gap-2">
                        <Twitter className="h-4 w-4" /> Twitter
                      </Label>
                      <Input
                        id="twitter"
                        placeholder="twitter.com/username"
                        value={tempLinks.twitter}
                        onChange={(e) => setTempLinks({ ...tempLinks, twitter: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="linkedin" className="text-right flex items-center justify-end gap-2">
                        <Linkedin className="h-4 w-4" /> LinkedIn
                      </Label>
                      <Input
                        id="linkedin"
                        placeholder="linkedin.com/in/username"
                        value={tempLinks.linkedin}
                        onChange={(e) => setTempLinks({ ...tempLinks, linkedin: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleSave}>Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => handleLinkClick(socialLinks.github, "GitHub")}
                className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-secondary"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </button>
              <button 
                onClick={() => handleLinkClick(socialLinks.twitter, "Twitter")}
                className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-secondary"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </button>
              <button 
                onClick={() => handleLinkClick(socialLinks.linkedin, "LinkedIn")}
                className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-secondary"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </button>
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
