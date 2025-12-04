'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Upload, Download } from 'lucide-react';

type LoadedImage = {
  url: string;
  element: HTMLImageElement;
};

interface CircleCropToolProps {
  showHeading?: boolean;
}

export function CircleCropTool({ showHeading = true }: CircleCropToolProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loadedImage, setLoadedImage] = useState<LoadedImage | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [isCropping, setIsCropping] = useState(false);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);

  // 清理 Object URL
  useEffect(() => {
    return () => {
      if (loadedImage?.url) {
        URL.revokeObjectURL(loadedImage.url);
      }
    };
  }, [loadedImage]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      // 简单防御：只允许图片
      alert('请选择图片文件');
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      // 清理上一个 URL
      if (loadedImage?.url) {
        URL.revokeObjectURL(loadedImage.url);
      }
      setLoadedImage({ url: objectUrl, element: img });
      setScale(1);
      setOffsetX(0);
      setOffsetY(0);
    };
    img.src = objectUrl;
  };

  const drawCirclePreview = () => {
    const canvas = canvasRef.current;
    if (!canvas || !loadedImage) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { element: img } = loadedImage;
    const size = canvas.width; // 正方形画布
    const radius = size / 2;

    ctx.clearRect(0, 0, size, size);

    // 裁剪成圆形
    ctx.save();
    ctx.beginPath();
    ctx.arc(radius, radius, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    // 以图片的短边为基准，尽量铺满圆
    const base = Math.min(img.width, img.height);
    const drawSize = base * scale;

    const sx = (img.width - base) / 2;
    const sy = (img.height - base) / 2;

    // 应用偏移量
    const x = radius - drawSize / 2 + offsetX;
    const y = radius - drawSize / 2 + offsetY;

    ctx.drawImage(
      img,
      sx,
      sy,
      base,
      base,
      x,
      y,
      drawSize,
      drawSize,
    );

    ctx.restore();
  };

  // 图片、缩放或位置变化时重绘预览
  useEffect(() => {
    if (loadedImage) {
      drawCirclePreview();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedImage, scale, offsetX, offsetY]);

  // 处理鼠标/触摸事件
  const getEventPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!loadedImage) return;
    e.preventDefault();
    const pos = getEventPos(e);
    if (pos) {
      setIsDragging(true);
      setDragStart({ x: pos.x - offsetX, y: pos.y - offsetY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !dragStart || !loadedImage) return;
    e.preventDefault();
    const pos = getEventPos(e);
    if (pos) {
      setOffsetX(pos.x - dragStart.x);
      setOffsetY(pos.y - dragStart.y);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStart(null);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!loadedImage) return;
    const pos = getEventPos(e);
    if (pos) {
      setIsDragging(true);
      setDragStart({ x: pos.x - offsetX, y: pos.y - offsetY });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !dragStart || !loadedImage) return;
    e.preventDefault();
    const pos = getEventPos(e);
    if (pos) {
      setOffsetX(pos.x - dragStart.x);
      setOffsetY(pos.y - dragStart.y);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setDragStart(null);
  };

  const handleDownload = () => {
    if (!loadedImage) {
      alert('请先上传一张图片');
      return;
    }
    setIsCropping(true);
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      drawCirclePreview();

      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      // 生成带时间戳的文件名
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
      a.download = `circle-crop-${timestamp}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } finally {
      setIsCropping(false);
    }
  };

  return (
    <div className="space-y-8">
      {showHeading && (
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Circle Crop Image – Perfect Round Photos in Seconds
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
            Upload any picture, adjust the zoom, and download a high-quality circular PNG with a
            transparent background. All processing happens instantly in your browser.
          </p>
        </div>
      )}

      <div className="space-y-6 rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="flex-1 space-y-4">
            <div>
              <label className="group relative inline-flex cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-xl border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 px-6 py-4 text-sm font-semibold text-primary transition-all duration-300 hover:border-primary/50 hover:from-primary/10 hover:to-primary/15 hover:shadow-lg hover:shadow-primary/20">
                <Upload className="size-5 transition-transform duration-300 group-hover:scale-110" />
                <span>Upload image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden cursor-pointer"
                  onChange={handleFileChange}
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:animate-shimmer" />
              </label>
              <p className="mt-3 text-xs text-muted-foreground">
                Supports JPG / PNG / WEBP / GIF. Images are processed locally in your browser and
                never leave your device.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Zoom</span>
                <span>{Math.round(scale * 100)}%</span>
              </div>
              <Slider
                value={[scale]}
                min={0.5}
                max={2}
                step={0.01}
                onValueChange={(values) => setScale(values[0] ?? 1)}
                disabled={!loadedImage}
              />
            </div>

            {loadedImage && (
              <Button
                onClick={handleDownload}
                disabled={isCropping}
                className="mt-2 cursor-pointer"
              >
                <Download className="mr-2 size-4" />
                {isCropping ? 'Processing…' : 'Download Circle Image'}
              </Button>
            )}
          </div>

          <div className="flex flex-1 flex-col items-center gap-4">
            <div className="text-sm font-medium">Preview</div>
            <div className="flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={320}
                height={320}
                className="h-64 w-64 rounded-full border bg-muted cursor-move"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              />
            </div>
            {!loadedImage && (
              <p className="text-center text-xs text-muted-foreground">
                Upload an image to see a live circular preview here.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


