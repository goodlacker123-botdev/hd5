import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface SiteSettings {
  id: string;
  redirect_url: string;
  countdown_target: string;
  site_enabled: boolean;
  updated_at: string;
}

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [countdownTarget, setCountdownTarget] = useState("");
  const [siteEnabled, setSiteEnabled] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/login");
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .limit(1)
      .maybeSingle();
    if (error) {
      toast.error("Failed to load settings");
      return;
    }
    if (data) {
      setSettings(data as SiteSettings);
      setRedirectUrl(data.redirect_url);
      // Convert to local datetime format for the input
      const dt = new Date(data.countdown_target);
      setCountdownTarget(dt.toISOString().slice(0, 16));
      setSiteEnabled(data.site_enabled);
    }
  };

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    const { error } = await supabase
      .from("site_settings")
      .update({
        redirect_url: redirectUrl,
        countdown_target: new Date(countdownTarget).toISOString(),
        site_enabled: siteEnabled,
      })
      .eq("id", settings.id);
    setSaving(false);
    if (error) {
      toast.error("Failed to save: " + error.message);
    } else {
      toast.success("Settings saved!");
      fetchSettings();
    }
  };

  const handleTestRedirect = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("get-redirect-url");
      if (error) {
        setTestResult(`❌ Error: ${error.message}`);
      } else if (data?.url) {
        setTestResult(`✅ Redirect URL: ${data.url}`);
      } else {
        setTestResult("❌ No URL returned");
      }
    } catch (err: any) {
      setTestResult(`❌ ${err.message}`);
    }
    setTesting(false);
  };

  const handleTestCountdown = () => {
    // Open the main page with a test parameter that sets countdown to 10 seconds from now
    const testDate = new Date(Date.now() + 10000).toISOString();
    window.open(`/?test_countdown=${encodeURIComponent(testDate)}`, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold font-serif text-accent">Admin Dashboard</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              View Site
            </Button>
            <Button variant="ghost" size="sm" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>

        {/* Site Toggle */}
        <div className="rounded-lg border border-border p-6 space-y-4 bg-card">
          <h2 className="text-xl font-serif text-foreground">Site Status</h2>
          <div className="flex items-center gap-4">
            <Switch checked={siteEnabled} onCheckedChange={setSiteEnabled} />
            <span className="text-foreground">
              Site is {siteEnabled ? "enabled" : "disabled"}
            </span>
          </div>
        </div>

        {/* Redirect URL */}
        <div className="rounded-lg border border-border p-6 space-y-4 bg-card">
          <h2 className="text-xl font-serif text-foreground">Redirect URL</h2>
          <p className="text-sm text-muted-foreground">
            Where users are sent when the countdown reaches zero.
          </p>
          <div className="space-y-2">
            <Label htmlFor="redirect-url">URL</Label>
            <Input
              id="redirect-url"
              value={redirectUrl}
              onChange={(e) => setRedirectUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleTestRedirect} disabled={testing}>
              {testing ? "Testing..." : "Test Redirect Function"}
            </Button>
          </div>
          {testResult && (
            <p className="text-sm font-mono p-3 rounded bg-muted text-foreground">{testResult}</p>
          )}
        </div>

        {/* Countdown Date */}
        <div className="rounded-lg border border-border p-6 space-y-4 bg-card">
          <h2 className="text-xl font-serif text-foreground">Countdown Target</h2>
          <p className="text-sm text-muted-foreground">
            The date and time the countdown is counting down to.
          </p>
          <div className="space-y-2">
            <Label htmlFor="countdown-target">Date & Time</Label>
            <Input
              id="countdown-target"
              type="datetime-local"
              value={countdownTarget}
              onChange={(e) => setCountdownTarget(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" onClick={handleTestCountdown}>
            Test Countdown (10s timer)
          </Button>
        </div>

        {/* Save */}
        <Button onClick={handleSave} disabled={saving} className="w-full" size="lg">
          {saving ? "Saving..." : "Save All Settings"}
        </Button>

        {/* Info */}
        <div className="text-xs text-muted-foreground text-center">
          Last updated: {settings?.updated_at ? new Date(settings.updated_at).toLocaleString() : "—"}
        </div>
      </div>
    </div>
  );
};

export default Admin;
