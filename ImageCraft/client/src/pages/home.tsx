import { ImageGenerator } from "@/components/image-generator";
import { ImageGallery } from "@/components/image-gallery";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ImageGenerator />
        </div>
        <div className="lg:col-span-2">
          <ImageGallery />
        </div>
      </div>
    </main>
  );
}
