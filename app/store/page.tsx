import { getProducts, getCategories } from '@/src/lib/woocommerce';
import Link from 'next/link';

// Next.js automatically passes URL parameters into the searchParams prop
export default async function StorePage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    // In Next.js 15+, searchParams must be awaited
    const params = await searchParams;

    // Check if the user clicked a filter or searched (e.g., ?sort=asc or ?search=watch)
    const sortOrder = params.sort === 'asc' ? '&order=asc' : '';
    const categoryId = params.category ? `&category=${params.category}` : '';
    const searchQuery = params.search ? `&search=${params.search}` : '';
    const activeQuery = `${sortOrder}${categoryId}${searchQuery}`;

    // Fetch products and categories in parallel — no extra load time
    const [products, categories] = await Promise.all([
        getProducts(activeQuery),
        getCategories(),
    ]);

    return (
        <div className="bg-white min-h-screen pt-24 pb-20">
            <div className="max-w-[1400px] mx-auto px-6">

                {/* Page Header */}
                <div className="mb-12 border-b border-neutral-200 pb-6">
                    {params.search ? (
                        <>
                            <h1 className="font-display text-4xl font-bold text-black mb-2">
                                Search results for &quot;{params.search}&quot;
                            </h1>
                            <p className="text-text-muted">Showing all matching gear from our collection.</p>
                        </>
                    ) : (
                        <>
                            <h1 className="font-display text-4xl font-bold text-black mb-2">All Products</h1>
                            <p className="text-text-muted">Browse our complete collection of premium gear.</p>
                        </>
                    )}
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* LEFT SIDEBAR: Filters */}
                    <aside className="w-full lg:w-64 flex-shrink-0">
                        <div className="sticky top-24">
                            <h3 className="font-bold text-black mb-4 uppercase text-sm tracking-widest">Sort By</h3>
                            <ul className="space-y-3 mb-10 text-sm font-medium text-text-muted">
                                <li>
                                    <Link
                                        href="/store"
                                        className={`hover:text-black transition-colors ${!params.sort ? 'text-black font-semibold' : ''}`}
                                    >
                                        Newest Arrivals
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/store?sort=asc"
                                        className={`hover:text-black transition-colors ${params.sort === 'asc' ? 'text-black font-semibold' : ''}`}
                                    >
                                        Price: Low to High
                                    </Link>
                                </li>
                            </ul>

                            <h3 className="font-bold text-black mb-4 uppercase text-sm tracking-widest">Categories</h3>
                            <ul className="space-y-3 text-sm font-medium text-text-muted">
                                {/* Dynamically rendered from WooCommerce — add a category in WP Admin and it appears here instantly */}
                                {categories.map((cat) => (
                                    <li key={cat.id}>
                                        <Link
                                            href={`/store?category=${cat.id}`}
                                            className={`hover:text-black transition-colors ${params.category === String(cat.id) ? 'text-black font-semibold' : ''}`}
                                        >
                                            {cat.name}
                                            <span className="ml-1 text-xs text-neutral-400">({cat.count})</span>
                                        </Link>
                                    </li>
                                ))}
                                <li className="pt-4 mt-4 border-t border-neutral-100">
                                    <Link href="/store" className="text-black underline">Clear Filters</Link>
                                </li>
                            </ul>
                        </div>
                    </aside>

                    {/* RIGHT COLUMN: Product Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {products.length === 0 ? (
                                <div className="col-span-full py-20 text-center text-text-muted bg-surface-light rounded-2xl">
                                    No products match your filters.
                                </div>
                            ) : (
                                products.map((product) => (
                                    <Link key={product.id} href={`/product/${product.slug}`} className="group cursor-pointer flex flex-col">
                                        <div className="aspect-[4/5] bg-surface-light rounded-2xl mb-4 overflow-hidden relative flex items-center justify-center p-6">
                                            <div
                                                className="absolute inset-0 bg-contain bg-center bg-no-repeat m-6 transition-transform duration-700 ease-out group-hover:scale-110"
                                                style={{ backgroundImage: `url(${product.images?.[0]?.src || 'https://placehold.co/600x800/f5f5f7/a3a3a3?text=No+Image'})` }}
                                            />
                                        </div>
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="pr-2">
                                                <h3 className="font-display text-base font-bold text-black mb-1 group-hover:text-neutral-600 transition-colors">
                                                    {product.name}
                                                </h3>
                                            </div>
                                            <span className="text-sm font-bold text-black whitespace-nowrap bg-surface-light px-2 py-1 rounded-md">
                                                ₦{Number(product.price || 0).toLocaleString()}
                                            </span>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
