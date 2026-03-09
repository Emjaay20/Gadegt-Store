import { getProductBySlug, getProducts } from '@/src/lib/woocommerce';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import AddToCartButton from '@/src/components/AddToCartButton';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    // In Next.js 15+, dynamic params must be awaited
    const { slug } = await params;

    // 1. Fetch the main product
    const product = await getProductBySlug(slug);

    // If the product doesn't exist, trigger the Next.js 404 page
    if (!product) {
        notFound();
    }

    // 2. Fetch Related Products (same category, excluding this exact product)
    const categoryId = product.categories?.[0]?.id;
    const relatedProductsQuery = categoryId
        ? `&category=${categoryId}&exclude=${product.id}&per_page=4`
        : `&exclude=${product.id}&per_page=4`;

    const relatedProducts = await getProducts(relatedProductsQuery);

    return (
        <div className="bg-white min-h-screen pt-24 pb-20">
            <div className="max-w-[1400px] mx-auto px-6">

                {/* Breadcrumb Navigation */}
                <nav className="text-sm font-medium text-text-muted mb-8 flex gap-2">
                    <Link href="/store" className="hover:text-black transition-colors">Store</Link>
                    <span>/</span>
                    {product.categories?.[0]?.name && (
                        <>
                            <Link href={`/store?category=${categoryId}`} className="hover:text-black transition-colors">
                                {product.categories[0].name}
                            </Link>
                            <span>/</span>
                        </>
                    )}
                    <span className="text-black">{product.name}</span>
                </nav>

                {/* TOP SECTION: Buy Box */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">

                    {/* Left: Product Image */}
                    <div className="aspect-square bg-surface-light rounded-3xl p-12 flex items-center justify-center">
                        <img
                            src={product.images?.[0]?.src || 'https://placehold.co/800x800/f5f5f7/a3a3a3?text=No+Image'}
                            alt={product.name}
                            className="w-full h-full object-contain mix-blend-multiply drop-shadow-2xl"
                        />
                    </div>

                    {/* Right: Product Details & Add to Cart */}
                    <div className="flex flex-col justify-center">
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-black mb-4">
                            {product.name}
                        </h1>

                        <p className="text-2xl font-bold text-black mb-6">
                            ₦{Number(product.price || 0).toLocaleString()}
                        </p>

                        {/* Short description from WordPress */}
                        <div
                            className="text-lg text-text-muted mb-10 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: product.short_description || product.description }}
                        />

                        <div className="w-full max-w-md mb-12">
                            <AddToCartButton product={product} />
                            <p className="text-xs text-text-muted text-center mt-4 font-medium flex items-center justify-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Secure Encrypted Checkout
                            </p>
                        </div>

                        {/* Specifications Grid — fills the white space beautifully */}
                        <div className="border-t border-neutral-200 pt-8">
                            <h3 className="text-sm font-bold tracking-widest uppercase text-black mb-6">Specifications</h3>
                            <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                                <div>
                                    <p className="text-xs text-text-muted mb-1">Stock Status</p>
                                    <p className="text-sm font-bold text-black">
                                        {product.stock_status === 'instock' ? '✓ In Stock' : 'Out of Stock'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-text-muted mb-1">SKU</p>
                                    <p className="text-sm font-bold text-black">{product.sku || 'N/A'}</p>
                                </div>
                                {/* Dynamically renders any Attributes you add in WooCommerce */}
                                {product.attributes?.slice(0, 4).map((attr: any) => (
                                    <div key={attr.id || attr.name}>
                                        <p className="text-xs text-text-muted mb-1">{attr.name}</p>
                                        <p className="text-sm font-bold text-black">{attr.options.join(', ')}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* BOTTOM SECTION: Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="border-t border-neutral-200 pt-24">
                        <h2 className="font-display text-3xl font-bold text-black mb-10">You might also like</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map((rel: any) => (
                                <Link key={rel.id} href={`/product/${rel.slug}`} className="group cursor-pointer flex flex-col">
                                    <div className="aspect-[4/5] bg-surface-light rounded-2xl mb-4 overflow-hidden relative flex items-center justify-center p-6">
                                        <div
                                            className="absolute inset-0 bg-contain bg-center bg-no-repeat m-6 transition-transform duration-700 ease-out group-hover:scale-110"
                                            style={{ backgroundImage: `url(${rel.images?.[0]?.src || 'https://placehold.co/600x800/f5f5f7/a3a3a3?text=No+Image'})` }}
                                        />
                                    </div>
                                    <div className="flex justify-between items-start gap-4">
                                        <h3 className="font-display text-base font-bold text-black mb-1 group-hover:text-neutral-600 transition-colors pr-2">
                                            {rel.name}
                                        </h3>
                                        <span className="text-sm font-bold text-black whitespace-nowrap bg-surface-light px-2 py-1 rounded-md">
                                            ₦{Number(rel.price || 0).toLocaleString()}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
