import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  hero?: boolean;
}

export default function ProgressiveImage({ src, alt, hero }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="image-wrapper">
      <img
        src={src}
        className="blur-img"
        aria-hidden
      />

      <img
        src={src}
        alt={alt}
        className={`full-img ${loaded ? "loaded" : ""} ${
          hero ? "blog-hero" : ""
        }`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
