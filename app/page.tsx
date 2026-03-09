// src/app/page.tsx
import { getProducts } from '@/src/lib/woocommerce';
import AddToCartButton from '@/src/components/AddToCartButton';
import ProductCarousel from '@/src/components/ProductCarousel';
import Link from 'next/link';

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      {/* EDITORIAL HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center items-center bg-surface-light overflow-hidden pt-20 px-6">
        <div className="container mx-auto relative z-10 text-center max-w-4xl">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-neutral-500 mb-6">
            The New Standard
          </span>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-black mb-8">
            Nova X1.
          </h1>
          <p className="text-lg md:text-xl font-medium text-text-muted max-w-2xl mx-auto leading-relaxed mb-12">
            Sound, redefined. Active noise cancellation meets spatial audio in our lightest form factor yet.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 bg-black text-white rounded-full text-sm font-semibold hover:bg-neutral-800 transition-colors duration-300 min-w-[160px]">
              Buy Now
            </button>
            <a className="px-8 py-4 bg-white text-black border border-neutral-200 rounded-full text-sm font-semibold hover:border-neutral-900 transition-colors duration-300 min-w-[160px]" href="#">
              Learn more
            </a>
          </div>
        </div>

        {/* Subtle bottom gradient to blend into the white section below */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-20"></div>
      </section>

      {/* DYNAMIC PRODUCT GRID (BENTO BOX STYLE) */}
      <section className="py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-black mb-3">Curated Essentials.</h2>
              <p className="text-text-muted text-lg font-medium">Engineered for the modern workflow.</p>
            </div>
            <Link className="text-sm font-semibold text-black hover:text-neutral-500 transition-colors pb-1 border-b-2 border-black hover:border-neutral-500" href="/store">
              Shop All Collection
            </Link>
          </div>

          {/* Interactive Carousel */}
          <ProductCarousel products={products} />

          {/* Centered Explore Button */}
          <div className="flex justify-center mt-8 mb-32">
            <Link
              href="/store"
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-black text-white rounded-full font-bold text-sm tracking-wide overflow-hidden transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-neutral-800 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 flex items-center gap-2">
                Explore the Collection
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>

          {/* LIFESTYLE CTA SECTION */}
          <div className="rounded-[2.5rem] overflow-hidden bg-black text-white flex flex-col md:flex-row items-center border border-neutral-800">
            <div className="md:w-1/2 p-12 md:p-20 flex flex-col justify-center items-start z-10">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-neutral-400 mb-4">
                The Ecosystem
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Seamless <br />Integration.
              </h2>
              <p className="text-neutral-400 text-lg md:text-xl font-medium mb-10 max-w-md leading-relaxed">
                Experience technology that works together perfectly. Build your ultimate workflow with products designed for synergy.
              </p>
              <Link
                href="/store"
                className="group flex items-center gap-3 text-sm font-bold tracking-wide transition-colors hover:text-neutral-300"
              >
                <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
                Shop the Ecosystem
              </Link>
            </div>

            <div className="md:w-1/2 w-full h-[400px] md:h-auto md:self-stretch relative bg-gradient-to-br from-neutral-800 to-black overflow-hidden">
              {/* Abstract graphic representing the ecosystem since we don't have a lifestyle image */}
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square rounded-full bg-gradient-to-tr from-white/5 to-transparent blur-3xl"></div>

              {/* Simulated product constellation */}
              <div className="absolute inset-0 flex items-center justify-center group">
                <div className="relative w-64 h-64 transition-transform duration-1000 ease-out group-hover:scale-105">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-surface-light rounded-2xl shadow-2xl rotate-12 backdrop-blur-md bg-opacity-10 border border-white/20 flex items-center justify-center overflow-hidden">
                    <div className="w-3/4 h-3/4 bg-contain bg-center bg-no-repeat opacity-80" style={{ backgroundImage: `url(${products[0]?.images?.[0]?.src || ''})` }}></div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-surface-light rounded-2xl shadow-2xl -rotate-6 backdrop-blur-md bg-opacity-10 border border-white/20 flex items-center justify-center overflow-hidden z-20 translate-y-8 -translate-x-4">
                    <div className="w-3/4 h-3/4 bg-contain bg-center bg-no-repeat opacity-80" style={{ backgroundImage: `url(${products[1]?.images?.[0]?.src || ''})` }}></div>
                  </div>
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 w-24 h-24 bg-surface-light rounded-2xl shadow-xl -rotate-12 backdrop-blur-md bg-opacity-10 border border-white/20 flex items-center justify-center overflow-hidden z-10 -translate-x-8 -translate-y-4">
                    <div className="w-3/4 h-3/4 bg-contain bg-center bg-no-repeat opacity-60" style={{ backgroundImage: `url(${products[2]?.images?.[0]?.src || ''})` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
