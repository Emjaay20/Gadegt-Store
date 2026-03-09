export default function StoreLoading() {
    return (
        <div className="bg-white min-h-screen pt-24 pb-20">
            <div className="max-w-[1400px] mx-auto px-6">

                {/* Page Header Skeleton */}
                <div className="mb-12 border-b border-neutral-200 pb-6 animate-pulse">
                    <div className="h-10 w-64 bg-surface-light rounded-lg mb-4"></div>
                    <div className="h-4 w-96 bg-surface-light rounded-lg"></div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* LEFT SIDEBAR SKELETON */}
                    <aside className="w-full lg:w-64 flex-shrink-0 animate-pulse">
                        <div className="h-4 w-24 bg-surface-light rounded mb-6"></div>
                        <div className="space-y-4 mb-10">
                            <div className="h-3 w-32 bg-surface-light rounded"></div>
                            <div className="h-3 w-28 bg-surface-light rounded"></div>
                        </div>

                        <div className="h-4 w-24 bg-surface-light rounded mb-6"></div>
                        <div className="space-y-4">
                            <div className="h-3 w-20 bg-surface-light rounded"></div>
                            <div className="h-3 w-24 bg-surface-light rounded"></div>
                            <div className="h-3 w-16 bg-surface-light rounded"></div>
                        </div>
                    </aside>

                    {/* RIGHT COLUMN GRID SKELETON */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {/* We map out 6 dummy skeleton cards to fill the screen */}
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="flex flex-col animate-pulse">
                                    {/* Image Block Skeleton */}
                                    <div className="aspect-[4/5] bg-surface-light rounded-2xl mb-4"></div>

                                    {/* Title and Price Skeleton */}
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="w-full">
                                            <div className="h-5 w-3/4 bg-surface-light rounded-md mb-2"></div>
                                        </div>
                                        <div className="h-6 w-16 bg-surface-light rounded-md flex-shrink-0"></div>
                                    </div>

                                    {/* Button Skeleton */}
                                    <div className="mt-4 h-12 w-full bg-surface-light rounded-xl"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
