import { NextResponse } from 'next/server';

const WC_KEY = process.env.WC_CONSUMER_KEY;
const WC_SECRET = process.env.WC_CONSUMER_SECRET;
const STORE_URL = process.env.NEXT_PUBLIC_WC_STORE_URL;

export async function POST(request: Request) {
    try {
        // 1. Receive the payload from our frontend form
        const body = await request.json();
        const { customer, items } = body;

        if (!items || items.length === 0) {
            return NextResponse.json({ success: false, message: 'Cart is empty' }, { status: 400 });
        }

        // 2. Format the Cart Items for WooCommerce
        // Our Zustand store uses `cartQuantity`, so we map it to `quantity` here
        const lineItems = items.map((item: any) => ({
            product_id: item.id,
            quantity: item.cartQuantity ?? item.quantity ?? 1,
        }));

        // 3. Build the exact payload WooCommerce demands
        const orderData = {
            payment_method: 'bacs',
            payment_method_title: 'Simulated Portfolio Payment',
            set_paid: true, // Skip 'Pending' and go straight to 'Processing'
            billing: {
                first_name: customer.firstName,
                last_name: customer.lastName,
                address_1: customer.address,
                city: customer.city,
                state: customer.state,
                email: customer.email,
                phone: customer.phone,
                country: 'NG',
            },
            shipping: {
                first_name: customer.firstName,
                last_name: customer.lastName,
                address_1: customer.address,
                city: customer.city,
                state: customer.state,
                country: 'NG',
            },
            line_items: lineItems,
        };

        // 4. Send the POST request to WooCommerce — credentials stay on the server
        const credentials = Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString('base64');

        const wcResponse = await fetch(`${STORE_URL}/wp-json/wc/v3/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${credentials}`,
            },
            body: JSON.stringify(orderData),
            cache: 'no-store',
        });

        if (!wcResponse.ok) {
            const errorData = await wcResponse.json();
            throw new Error(errorData.message || 'Failed to create WooCommerce order');
        }

        const order = await wcResponse.json();

        // 5. Send success and the real Order ID back to the frontend
        return NextResponse.json({ success: true, orderId: order.id }, { status: 200 });

    } catch (error: any) {
        console.error('Checkout API Error:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
