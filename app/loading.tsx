export default function HomeLoading() {
    return (
        <div className="min-h-screen bg-white pt-32 pb-20 animate-pulse">
            <div className="max-w-[1400px] mx-auto px-6">

                {/* Massive Hero Skeleton */}
                <div className="flex flex-col items-center justify-center mb-32">
                    <div className="h-4 w-32 bg-surface-light rounded mb-8"></div>
                    <div className="h-24 w-3/4 md:w-1/2 bg-surface-light rounded-2xl mb-8"></div>
                    <div className="h-6 w-2/3 md:w-1/3 bg-surface-light rounded mb-12"></div>
                    <div className="flex gap-4">
                        <div className="h-14 w-40 bg-surface-light rounded-full"></div>
                        <div className="h-14 w-40 bg-surface-light rounded-full"></div>
                    </div>
                </div>

                {/* Curated Essentials Header */}
                <div className="mb-16">
                    <div className="h-10 w-72 bg-surface-light rounded-lg mb-4"></div>
                    <div className="h-4 w-48 bg-surface-light rounded"></div>
                </div>

                {/* 4-Card Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="aspect-[4/5] bg-surface-light rounded-2xl"></div>
                    ))}
                </div>

            </div>
        </div>
    );
}
