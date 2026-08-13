export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display tracking-tight ${className}`.trim()}>
      C<span className="text-petrol">&amp;</span>S Consulting
    </span>
  );
}
