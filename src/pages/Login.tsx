import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = isSignUp
      ? await signUp(email, password)
      : await signIn(email, password);
    setIsLoading(false);
    if (error) {
      toast.error(error.message);
    } else if (isSignUp) {
      toast.success("Account created! You can now sign in.");
      setIsSignUp(false);
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold font-serif text-accent">
            {isSignUp ? "Create Account" : "Admin Login"}
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            {isSignUp ? "Create your admin account" : "Sign in to manage your site"}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (isSignUp ? "Creating..." : "Signing in...") : (isSignUp ? "Create Account" : "Sign In")}
          </Button>
        </form>
        <div className="text-center space-y-2">
          <Button variant="ghost" size="sm" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Already have an account? Sign in" : "Need an account? Sign up"}
          </Button>
          <br />
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            ← Back to site
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
