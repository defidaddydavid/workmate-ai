import Link from 'next/link';

interface LogoProps {
  invert?: boolean;
}

export default function Logo({ invert = false }: LogoProps) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-lg">W</span>
      </div>
      <div className="font-semibold text-xl">
        <span className={invert ? "text-white" : "text-foreground"}>WorkMate</span>
        <span className="text-primary">AI</span>
      </div>
    </Link>
  );
}
