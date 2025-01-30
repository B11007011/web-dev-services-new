import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  animation?: "pulse" | "wave" | "none";
}

export function Skeleton({
  className,
  variant = "text",
  animation = "pulse",
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "bg-gray-200 dark:bg-gray-700",
        {
          "h-4 w-full rounded": variant === "text",
          "rounded-full": variant === "circular",
          "rounded-md": variant === "rectangular",
          "animate-pulse": animation === "pulse",
          "animate-shimmer": animation === "wave",
        },
        className
      )}
      {...props}
    />
  );
}

// Usage example:
// <Skeleton className="h-12 w-12" variant="circular" />
// <Skeleton className="h-4 w-[250px]" />
// <Skeleton className="h-[200px] w-full" variant="rectangular" />

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton } 