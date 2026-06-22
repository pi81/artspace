import clsx from "clsx";
import type { ImgHTMLAttributes } from "react";

type CmsImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "loading"> & {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  /** Fill the parent box and crop with object-cover. */
  cover?: boolean;
};

export function CmsImage({
  src,
  alt,
  width,
  height,
  priority = false,
  cover = false,
  className,
  ...props
}: CmsImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- CMS images use native lazy img per project policy
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      className={clsx(cover ? "size-full object-cover" : "h-auto max-w-full", className)}
      {...props}
    />
  );
}
