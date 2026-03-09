// src/lib/woocommerce.ts
const URL = process.env.NEXT_PUBLIC_WC_GRAPHQL_URL;

async function fetchGraphQL(query: string, variables: any = {}) {
  const response = await fetch(URL as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    cache: 'no-store',
  });

  const result = await response.json();
  if (result.errors) {
    console.error("GraphQL Error:", result.errors);
    throw new Error("Failed to fetch GraphQL data");
  }
  return result.data;
}

// We normalize the GraphQL response to match the REST API shape for the frontend
function normalizeProduct(node: any) {
  // Strip currency symbol and commas from price string e.g. "₦1,000.00" -> "1000.00"
  // This allows the frontend's Number(price).toLocaleString() to keep working
  const cleanPrice = node.price ? node.price.replace(/[^\d.]/g, '') : "0";

  return {
    ...node,
    // WooCommerce REST API (used in checkout) MUST have the numeric ID, not the GraphQL Global ID
    id: node.databaseId,
    price: cleanPrice,
    // Add images array since frontend expects product.images[0].src
    images: node.image ? [{ src: node.image.sourceUrl }] : [],
    short_description: node.shortDescription || "",
    description: node.description || "",
  };
}

export async function getProducts(queryString: string = ""): Promise<any[]> {
  try {
    // Parse the REST-style query string into variables for GraphQL
    const params = new URLSearchParams(queryString.startsWith('&') ? queryString.substring(1) : queryString);

    const categoryId = params.get('category');
    const search = params.get('search');
    const first = parseInt(params.get('per_page') || '20');
    const order = params.get('order')?.toUpperCase() || 'DESC';

    const query = `
      query GetProducts($first: Int, $categoryId: Int, $search: String, $order: OrderEnum) {
        products(
          first: $first,
          where: {
            categoryId: $categoryId,
            search: $search,
            orderby: [{ field: DATE, order: $order }]
          }
        ) {
          nodes {
            id
            databaseId
            name
            slug
            description
            shortDescription
            ... on SimpleProduct {
              price
            }
            ... on VariableProduct {
              price
            }
            image {
              sourceUrl
            }
          }
        }
      }
    `;

    const variables: any = { first, order };
    if (categoryId) variables.categoryId = parseInt(categoryId);
    if (search) variables.search = search;

    const data = await fetchGraphQL(query, variables);
    return data.products.nodes.map(normalizeProduct);
  } catch (error) {
    console.error("getProducts Error:", error);
    return [];
  }
}

export async function getCategories(): Promise<{ id: number; name: string; count: number }[]> {
  try {
    const query = `
      query GetCategories {
        productCategories(first: 50, where: { hideEmpty: true }) {
          nodes {
            databaseId
            name
            count
          }
        }
      }
    `;

    const data = await fetchGraphQL(query);
    return data.productCategories.nodes.map((cat: any) => ({
      id: cat.databaseId,
      name: cat.name,
      count: cat.count || 0,
    }));
  } catch (error) {
    console.error("getCategories Error:", error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<any | null> {
  try {
    const query = `
      query GetProductBySlug($slug: ID!) {
        product(id: $slug, idType: SLUG) {
          id
          databaseId
          name
          slug
          description
          shortDescription
          ... on SimpleProduct {
            price
          }
          ... on VariableProduct {
            price
          }
          image {
            sourceUrl
          }
          galleryImages {
            nodes {
              sourceUrl
            }
          }
          productCategories {
            nodes {
              name
            }
          }
        }
      }
    `;

    const data = await fetchGraphQL(query, { slug });
    if (!data.product) return null;

    const product = normalizeProduct(data.product);

    // Add gallery images if they exist
    if (data.product.galleryImages?.nodes) {
      product.images = [
        ...product.images,
        ...data.product.galleryImages.nodes.map((img: any) => ({ src: img.sourceUrl }))
      ];
    }

    return product;
  } catch (error) {
    console.error("getProductBySlug Error:", error);
    return null;
  }
}
