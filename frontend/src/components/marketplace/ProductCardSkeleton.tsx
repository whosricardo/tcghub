export function ProductCardSkeleton() {
  return (
    <div className="relative flex flex-col rounded-2xl border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-950">
      {/* Top row: badge + heart */}
      <div className="absolute left-4 right-4 top-4 z-10 flex items-center justify-between p-3">
        <div className="h-5 w-16 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
        <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
      </div>

      {/* Image area — mesma proporção 4/5 do ProductCard */}
      <div className="relative mb-4 aspect-[4/5] w-full animate-pulse overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-900" />

      {/* Info */}
      <div className="mt-auto flex flex-col gap-2">
        {/* edition */}
        <div className="h-3 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        {/* title */}
        <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

        {/* price + button row */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="h-3 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-6 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          </div>
          <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
    </div>
  );
}
