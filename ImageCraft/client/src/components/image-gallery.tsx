import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Images, Grid, List, Download, Share, Trash2, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "./language-provider";
import { type GeneratedImage } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { es, enUS } from "date-fns/locale";

export function ImageGallery() {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data: images, isLoading } = useQuery<GeneratedImage[]>({
    queryKey: ["/api/images"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/images/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/images"] });
      toast({
        title: "Image deleted successfully",
        description: "",
      });
      setSelectedImage(null);
    },
    onError: (error: any) => {
      toast({
        title: t.error_occurred,
        description: error.message || "Failed to delete image",
        variant: "destructive"
      });
    }
  });

  const handleDownload = async (image: GeneratedImage) => {
    try {
      // Try direct download first
      const a = document.createElement('a');
      a.href = image.imageUrl;
      a.download = `generated-image-${image.id}.png`;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      toast({
        title: "Descarga iniciada",
        description: "La imagen se está descargando. Si no funciona, haz clic derecho en la imagen y selecciona 'Guardar imagen como'",
      });
    } catch (error) {
      console.error('Download error:', error);
      // Fallback: open in new tab
      window.open(image.imageUrl, '_blank');
      toast({
        title: "Imagen abierta",
        description: "Haz clic derecho en la imagen y selecciona 'Guardar imagen como'",
      });
    }
  };

  const handleShare = async (image: GeneratedImage) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Generated Image',
          text: image.prompt,
          url: image.imageUrl,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback: copy URL to clipboard
      try {
        await navigator.clipboard.writeText(image.imageUrl);
        toast({
          title: "Link copied to clipboard",
          description: "",
        });
      } catch (error) {
        toast({
          title: t.error_occurred,
          description: "Failed to copy link",
          variant: "destructive"
        });
      }
    }
  };

  const formatTime = (date: Date) => {
    return formatDistanceToNow(new Date(date), { 
      addSuffix: true,
      locale: language === 'es' ? es : enUS
    });
  };

  if (isLoading) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center">
            <Images className="text-primary mr-2 h-6 w-6" />
            {t.gallery_title}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, index) => (
            <Card key={index} className="bg-surface border-slate-700">
              <Skeleton className="w-full h-64 bg-slate-600" />
              <CardContent className="p-4">
                <Skeleton className="h-4 w-full mb-2 bg-slate-600" />
                <Skeleton className="h-4 w-2/3 bg-slate-600" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center">
            <Images className="text-primary mr-2 h-6 w-6" />
            {t.gallery_title}
          </h2>
        </div>
        <Card className="bg-surface border-slate-700">
          <CardContent className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-surface-light rounded-full mb-6">
              <Images className="text-slate-400 h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t.no_images}</h3>
            <p className="text-slate-400 mb-6">{t.no_images_desc}</p>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              {t.start_creating}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      {/* Gallery Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <Images className="text-primary mr-2 h-6 w-6" />
          {t.gallery_title}
        </h2>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("grid")}
            className="text-slate-400 hover:text-slate-200"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("list")}
            className="text-slate-400 hover:text-slate-200"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.map((image) => (
          <Card 
            key={image.id} 
            className="bg-surface border-slate-700 overflow-hidden group hover:border-primary/50 transition-all cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <img 
              src={image.imageUrl} 
              alt={image.prompt} 
              className="w-full h-64 object-cover"
            />
            <CardContent className="p-4">
              <p className="text-sm text-slate-300 mb-3 line-clamp-2">
                "{image.prompt}"
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <Clock className="h-4 w-4" />
                  <span>{formatTime(image.createdAt)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(image);
                    }}
                    className="p-2 text-slate-400 hover:text-primary transition-colors"
                    title={t.download}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(image);
                    }}
                    className="p-2 text-slate-400 hover:text-primary transition-colors"
                    title={t.share}
                  >
                    <Share className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteMutation.mutate(image.id);
                    }}
                    className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                    title={t.delete}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="bg-surface border-slate-700 max-w-4xl max-h-[90vh] overflow-auto" aria-describedby="image-details-description">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">{t.image_details}</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="p-6" id="image-details-description">
              <img 
                src={selectedImage.imageUrl} 
                alt={selectedImage.prompt} 
                className="w-full rounded-lg mb-4" 
              />
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Prompt:</label>
                  <p className="text-slate-100 bg-surface-light p-3 rounded-lg">
                    {selectedImage.prompt}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      {t.image_size}:
                    </label>
                    <p className="text-slate-100">{selectedImage.size}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      Creado:
                    </label>
                    <p className="text-slate-100">{formatTime(selectedImage.createdAt)}</p>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 pt-4 border-t border-slate-600">
                  <Button
                    variant="outline"
                    onClick={() => handleDownload(selectedImage)}
                    className="bg-primary hover:bg-primary/90 text-white border-primary"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {t.download}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.open(selectedImage.imageUrl, '_blank')}
                    className="bg-secondary hover:bg-secondary/90 text-white border-secondary"
                  >
                    Ver imagen completa
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
