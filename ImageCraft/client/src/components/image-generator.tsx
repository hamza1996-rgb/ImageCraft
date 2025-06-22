import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight, Edit, Lightbulb, Sparkles } from "lucide-react";
import { useLanguage } from "./language-provider";
import { generateImageRequestSchema, type GenerateImageRequest } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const suggestions = {
  es: [
    "Doctora joven sonriendo con máscara médica azul",
    "Persona elegante con máscara de seda negra",
    "Niño feliz con máscara colorida de superhéroe",
    "Artista con máscara veneciana dorada",
    "Deportista con máscara deportiva moderna",
    "Persona amigable con máscara personalizada"
  ],
  en: [
    "Young doctor smiling with blue medical mask",
    "Elegant person with black silk fashion mask",
    "Happy child with colorful superhero mask",
    "Artist with golden venetian mask",
    "Athlete with modern sports mask",
    "Friendly person with custom designed mask"
  ]
};

export function ImageGenerator() {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const form = useForm<GenerateImageRequest>({
    resolver: zodResolver(generateImageRequestSchema),
    defaultValues: {
      prompt: "",
      maskType: "medical",
      size: "1024x1024",
      style: "realistic"
    }
  });

  const generateMutation = useMutation({
    mutationFn: async (data: GenerateImageRequest) => {
      const response = await apiRequest("POST", "/api/images/generate", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/images"] });
      toast({
        title: t.success_generated,
        description: "",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: t.error_occurred,
        description: error.message || "Failed to generate image",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: GenerateImageRequest) => {
    generateMutation.mutate(data);
  };

  const handleSuggestionClick = (suggestion: string) => {
    form.setValue("prompt", suggestion);
  };

  const placeholderText = language === "es" 
    ? "Ej: Doctora joven sonriendo con máscara médica azul, fondo limpio, expresión amigable..."
    : "E.g: Young doctor smiling with blue medical mask, clean background, friendly expression...";

  return (
    <div className="space-y-6">
      {/* Prompt Input Card */}
      <Card className="bg-surface border-slate-700">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Edit className="text-primary mr-2 h-5 w-5" />
            {t.prompt_title}
          </h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">{t.prompt_label}</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="h-32 bg-surface-light border-slate-600 text-slate-50 placeholder-slate-400 resize-none"
                        placeholder={placeholderText}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maskType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">{t.mask_type}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-surface-light border-slate-600 text-slate-50">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-surface border-slate-600">
                        <SelectItem value="medical">{t.mask_medical}</SelectItem>
                        <SelectItem value="fashion">{t.mask_fashion}</SelectItem>
                        <SelectItem value="carnival">{t.mask_carnival}</SelectItem>
                        <SelectItem value="sports">{t.mask_sports}</SelectItem>
                        <SelectItem value="artistic">{t.mask_artistic}</SelectItem>
                        <SelectItem value="custom">{t.mask_custom}</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {/* Advanced Options */}
              <div className="border-t border-slate-700 pt-4">
                <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
                  <CollapsibleTrigger className="flex items-center text-sm text-slate-400 hover:text-slate-300 transition-colors">
                    <ChevronRight className={`mr-2 h-4 w-4 transition-transform ${showAdvanced ? 'rotate-90' : ''}`} />
                    {t.advanced_options}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4 space-y-4">
                    <FormField
                      control={form.control}
                      name="size"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">{t.image_size}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-surface-light border-slate-600 text-slate-50">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-surface border-slate-600">
                              <SelectItem value="1024x1024">1024x1024 (Cuadrada)</SelectItem>
                              <SelectItem value="1792x1024">1792x1024 (Horizontal)</SelectItem>
                              <SelectItem value="1024x1792">1024x1792 (Vertical)</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="style"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">{t.image_style}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-surface-light border-slate-600 text-slate-50">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-surface border-slate-600">
                              <SelectItem value="realistic">Realista</SelectItem>
                              <SelectItem value="artistic">Artístico</SelectItem>
                              <SelectItem value="cartoon">Caricatura</SelectItem>
                              <SelectItem value="abstract">Abstracto</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </CollapsibleContent>
                </Collapsible>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold"
                disabled={generateMutation.isPending}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                {generateMutation.isPending ? t.generating : t.generate_button}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Quick Suggestions */}
      <Card className="bg-surface border-slate-700">
        <CardContent className="p-6">
          <h3 className="text-md font-semibold mb-3 flex items-center">
            <Lightbulb className="text-yellow-400 mr-2 h-5 w-5" />
            {t.suggestions_title}
          </h3>
          <div className="space-y-2">
            {suggestions[language].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left p-3 bg-surface-light hover:bg-slate-600 rounded-lg transition-colors text-sm text-slate-300 hover:text-slate-100"
              >
                {suggestion}
              </button>
            ))}
          </div>
          
          {/* Tips Section */}
          <div className="mt-6 pt-4 border-t border-slate-600">
            <h4 className="text-sm font-medium text-slate-300 mb-2">
              {language === "es" ? "Consejos para mejores resultados:" : "Tips for better results:"}
            </h4>
            <ul className="text-xs text-slate-400 space-y-1">
              <li>• {language === "es" ? "Describe personas de manera positiva y amigable" : "Describe people in positive and friendly ways"}</li>
              <li>• {language === "es" ? "Incluye detalles sobre expresión y ambiente" : "Include details about expression and environment"}</li>
              <li>• {language === "es" ? "Evita contenido violento o inapropiado" : "Avoid violent or inappropriate content"}</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
