type Props = { children: string; className?: string };

export function IntroTextBlock({ children, className = "" }: Props) {
  return <p className={`max-w-3xl text-lg leading-relaxed text-nk-muted ${className}`}>{children}</p>;
}
