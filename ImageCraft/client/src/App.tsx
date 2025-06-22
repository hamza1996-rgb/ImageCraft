import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider, useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

function Header() {
  const { language, changeLanguage, t } = useLanguage();

  return (
    <header className="border-b border-slate-700 bg-surface/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">🎭</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ImagenIA
            </h1>
          </div>
          
          {/* Language Toggle */}
          <div className="flex items-center space-x-4">
            <div className="flex bg-surface-light rounded-lg p-1">
              <Button
                variant={language === "es" ? "default" : "ghost"}
                size="sm"
                onClick={() => changeLanguage("es")}
                className={`px-3 py-1 text-sm font-medium transition-all ${
                  language === "es" 
                    ? "bg-primary text-white" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                ES
              </Button>
              <Button
                variant={language === "en" ? "default" : "ghost"}
                size="sm"
                onClick={() => changeLanguage("en")}
                className={`px-3 py-1 text-sm font-medium transition-all ${
                  language === "en" 
                    ? "bg-primary text-white" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                EN
              </Button>
            </div>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <div className="bg-dark text-slate-50 font-inter min-h-screen">
            <Header />
            <Router />
            <Toaster />
          </div>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
