import { assetPath } from "@/lib/site";

type MdxFigureProps = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

export function MdxFigure({
  src,
  alt,
  caption,
  width,
  height,
}: MdxFigureProps) {
  return (
    <figure>
      {/* MDX body images are intentionally plain img elements for portable content. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={assetPath(src)}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
      />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
