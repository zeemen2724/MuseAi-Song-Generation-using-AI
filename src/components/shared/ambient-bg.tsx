import Image from "next/image";

interface AmbientBgProps {
  variant?: "1" | "2";
  className?: string;
  opacity?: number;
  blur?: string;
}

export function AmbientBg({ variant = "1", className = "", opacity = 0.5, blur = "blur-3xl" }: AmbientBgProps) {
  const src = variant === "1" ? "/assets/ai/bg-aurora-1.svg" : "/assets/ai/bg-aurora-2.svg";
  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`} style={{ opacity }}>
      <Image
        src={src}
        alt="Aurora background"
        fill
        priority
        className={`object-cover ${blur} mix-blend-screen`}
        sizes="100vw"
      />
    </div>
  );
}

