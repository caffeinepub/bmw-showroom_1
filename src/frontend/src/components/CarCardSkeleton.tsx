export default function CarCardSkeleton() {
  return (
    <div className="rounded-sm overflow-hidden bg-card border border-border">
      {/* Image skeleton */}
      <div className="aspect-[3/2] skeleton-shimmer" />
      {/* Content skeleton */}
      <div className="p-5 flex flex-col gap-4">
        <div className="space-y-2">
          <div className="h-5 w-2/3 skeleton-shimmer rounded-sm" />
          <div className="h-4 w-full skeleton-shimmer rounded-sm" />
          <div className="h-4 w-4/5 skeleton-shimmer rounded-sm" />
        </div>
        <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-border">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="h-4 w-10 skeleton-shimmer rounded-sm" />
              <div className="h-3 w-6 skeleton-shimmer rounded-sm" />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="h-3 w-16 skeleton-shimmer rounded-sm" />
            <div className="h-6 w-24 skeleton-shimmer rounded-sm" />
          </div>
          <div className="h-4 w-14 skeleton-shimmer rounded-sm" />
        </div>
      </div>
    </div>
  );
}
