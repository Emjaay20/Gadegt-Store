import { NextResponse } from 'next/server';
import { getProducts } from '@/src/lib/woocommerce';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
        return NextResponse.json({ products: [] });
    }

    try {
        // Fetch up to 5 products matching the query
        const products = await getProducts(`&search=${encodeURIComponent(query)}&per_page=5`);

        // Pick only what we need for the dropdown so the payload is tiny and fast
        const results = products.map((p: any) => ({
            id: p.id,
            name: p.name,
            slug: p.slug,
            price: p.price,
            image: p.images?.[0]?.src || null,
        }));

        return NextResponse.json({ products: results });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
