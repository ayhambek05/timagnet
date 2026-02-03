import { useState, useRef, useCallback } from "react";
import { Upload, X, Crop } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ImageCropDialog } from "./ImageCropDialog";
import { useTranslation } from "react-i18next";

interface ImageUploadCardProps {
  index: number;
  image: string | null;
  onImageChange: (image: string | null) => void;
  aspectRatio: number;
  description: string;
}

export function ImageUploadCard({ index, image, onImageChange, aspectRatio, description }: ImageUploadCardProps) {
  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [pendingImage, setPendingImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const openCropDialog = useCallback((imageData: string) => {
    setPendingImage(imageData);
    setCropDialogOpen(true);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        openCropDialog(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [openCropDialog]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        openCropDialog(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [openCropDialog]);

  const handleCropComplete = useCallback((croppedImage: string) => {
    onImageChange(croppedImage);
    setPendingImage(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [onImageChange]);

  const handleRemove = useCallback(() => {
    onImageChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [onImageChange]);

  const handleReCrop = useCallback(() => {
    if (image) {
      setPendingImage(image);
      setCropDialogOpen(true);
    }
  }, [image]);

  return (
    <>
      <div
        style={{ aspectRatio }}
        className={cn(
          "relative rounded-xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center cursor-pointer",
          isDragging ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/50",
          image && "border-solid border-border"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !image && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        
        {image ? (
          <>
            <img 
              src={image} 
              alt={t('upload.image_alt', { index: index + 1 })}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
              <Button 
                size="sm" 
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  handleReCrop();
                }}
              >
                <Crop className="w-4 h-4 mr-1" />
                {t('upload.crop')}
              </Button>
              <Button 
                size="sm" 
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  inputRef.current?.click();
                }}
              >
                {t('upload.change')}
              </Button>
              <Button 
                size="sm" 
                variant="destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center p-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-3">
              <Upload className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="font-medium text-sm mb-1">{t('upload.upload_image', { index: index + 1 })}</h3>
            <p className="text-xs text-muted-foreground">
              {t('upload.drag_drop')} <span className="text-primary">{t('upload.click_select')}</span> {t('upload.to_select')}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {description}
            </p>
          </div>
        )}
      </div>

      <ImageCropDialog
        open={cropDialogOpen}
        onOpenChange={setCropDialogOpen}
        imageSrc={pendingImage}
        onCropComplete={handleCropComplete}
        aspectRatio={aspectRatio}
      />
    </>
  );
}
