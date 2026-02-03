import { useState, useRef, useCallback, useEffect } from "react";
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface ImageCropDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageSrc: string | null;
  onCropComplete: (croppedImage: string) => void;
  aspectRatio: number;
}

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
): Crop {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 80,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export function ImageCropDialog({
  open,
  onOpenChange,
  imageSrc,
  onCropComplete,
  aspectRatio,
}: ImageCropDialogProps) {
  const { t } = useTranslation();
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, aspectRatio));
  }, [aspectRatio]);

  const handleApplyCrop = useCallback(() => {
    if (!imgRef.current || !completedCrop) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

    const pixelRatio = window.devicePixelRatio || 1;
    
    canvas.width = completedCrop.width * scaleX;
    canvas.height = completedCrop.height * scaleY;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      imgRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    );

    const croppedImageUrl = canvas.toDataURL("image/jpeg", 0.95);
    onCropComplete(croppedImageUrl);
    onOpenChange(false);
  }, [completedCrop, onCropComplete, onOpenChange]);

  useEffect(() => {
    if (!open) {
      setCrop(undefined);
      setCompletedCrop(undefined);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>{t('crop.title')}</DialogTitle>
          <DialogDescription>
            {t('crop.description')}
          </DialogDescription>
        </DialogHeader>

        <div className="relative bg-foreground rounded-lg overflow-hidden flex items-center justify-center min-h-[400px] max-h-[60vh]">
          {imageSrc && (
            <div className="relative">
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={aspectRatio}
                className="max-h-[55vh]"
              >
                <img
                  ref={imgRef}
                  src={imageSrc}
                  alt="Crop preview"
                  onLoad={onImageLoad}
                  className="max-h-[55vh] object-contain"
                />
              </ReactCrop>
              
              {/* Zone Labels Overlay */}
              {crop && completedCrop && (
                <div 
                  className="absolute pointer-events-none"
                  style={{
                    left: `${crop.x}%`,
                    top: `${crop.y}%`,
                    width: `${crop.width}%`,
                    height: `${crop.height}%`,
                  }}
                >
                  {/* Bleed Zone Label */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-crop-overlay text-crop-bleed text-xs px-2 py-0.5 rounded whitespace-nowrap font-medium">
                    {t('crop.bleed_zone')}
                  </div>
                  
                  {/* Safe Area Box */}
                  <div className="absolute inset-[10%] border-2 border-dashed border-crop-safe rounded pointer-events-none">
                    {/* Safe Area Label */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-crop-overlay text-crop-safe text-xs px-2 py-0.5 rounded whitespace-nowrap font-medium">
                      {t('crop.safe_zone')}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('crop.cancel')}
          </Button>
          <Button onClick={handleApplyCrop} disabled={!completedCrop}>
            {t('crop.apply')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
