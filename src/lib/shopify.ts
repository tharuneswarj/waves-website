// Shopify Storefront API client
// Docs: https://shopify.dev/docs/api/storefront

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;

const endpoint = `https://${domain}/api/2025-01/graphql.json`;

interface ShopifyResponse<T> {
  data: T;
  errors?: { message: string }[];
}

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json: ShopifyResponse<T> = await res.json();

  if (json.errors) {
    throw new Error(json.errors.map((e) => e.message).join("\n"));
  }

  return json.data;
}

// ──────────────────────────────────────
// Types
// ──────────────────────────────────────

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyPrice;
  selectedOptions: { name: string; value: string }[];
}

export interface ShopifyMetafield {
  key: string;
  value: string;
}

export interface ShopifyProductOption {
  name: string;
  values: string[];
  optionValues: {
    name: string;
    swatch: { color: string } | null;
  }[];
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  featuredImage: ShopifyImage | null;
  images: { edges: { node: ShopifyImage }[] };
  variants: { edges: { node: ShopifyProductVariant }[] };
  options: ShopifyProductOption[];
  priceRange: {
    minVariantPrice: ShopifyPrice;
    maxVariantPrice: ShopifyPrice;
  };
  tags: string[];
  /** Waves custom metafields — populated after running scripts/seed-metafields.js */
  shadeColours: ShopifyMetafield | null;
  usageCare: ShopifyMetafield | null;
  dimensions: ShopifyMetafield | null;
  weight: ShopifyMetafield | null;
  material: ShopifyMetafield | null;
  bulbSpec: ShopifyMetafield | null;
  cordLength: ShopifyMetafield | null;
  printTime: ShopifyMetafield | null;
  layerHeight: ShopifyMetafield | null;
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      title: string;
      handle: string;
      featuredImage: ShopifyImage | null;
    };
    price: ShopifyPrice;
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: ShopifyPrice;
    subtotalAmount: ShopifyPrice;
  };
  lines: { edges: { node: ShopifyCartLine }[] };
}

// ──────────────────────────────────────
// Fragments
// ──────────────────────────────────────

const PRODUCT_FRAGMENT = /* GraphQL */ `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    featuredImage {
      url
      altText
      width
      height
    }
    images(first: 20) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    options(first: 10) {
      name
      values
      optionValues {
        name
        swatch {
          color
        }
      }
    }
    variants(first: 100) {
      edges {
        node {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    tags
    shadeColours: metafield(namespace: "waves", key: "shade_colours") { key value }
    usageCare: metafield(namespace: "waves", key: "usage_care") { key value }
    dimensions: metafield(namespace: "waves", key: "dimensions") { key value }
    weight: metafield(namespace: "waves", key: "weight") { key value }
    material: metafield(namespace: "waves", key: "material") { key value }
    bulbSpec: metafield(namespace: "waves", key: "bulb_spec") { key value }
    cordLength: metafield(namespace: "waves", key: "cord_length") { key value }
    printTime: metafield(namespace: "waves", key: "print_time") { key value }
    layerHeight: metafield(namespace: "waves", key: "layer_height") { key value }
  }
`;

const CART_FRAGMENT = /* GraphQL */ `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              product {
                title
                handle
                featuredImage {
                  url
                  altText
                  width
                  height
                }
              }
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
`;

// ──────────────────────────────────────
// Product queries
// ──────────────────────────────────────

export async function getAllProducts(): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{
    products: { edges: { node: ShopifyProduct }[] };
  }>(
    /* GraphQL */ `
      query AllProducts {
        products(first: 20, sortKey: TITLE) {
          edges {
            node {
              ...ProductFields
            }
          }
        }
      }
      ${PRODUCT_FRAGMENT}
    `
  );

  return data.products.edges.map((edge) => edge.node);
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{
    productByHandle: ShopifyProduct | null;
  }>(
    /* GraphQL */ `
      query ProductByHandle($handle: String!) {
        productByHandle(handle: $handle) {
          ...ProductFields
        }
      }
      ${PRODUCT_FRAGMENT}
    `,
    { handle }
  );

  return data.productByHandle;
}

// ──────────────────────────────────────
// Cart mutations
// ──────────────────────────────────────

export async function createCart(variantId: string, quantity: number = 1): Promise<ShopifyCart> {
  const data = await shopifyFetch<{
    cartCreate: { cart: ShopifyCart };
  }>(
    /* GraphQL */ `
      mutation CartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            ...CartFields
          }
        }
      }
      ${CART_FRAGMENT}
    `,
    {
      input: {
        lines: [{ merchandiseId: variantId, quantity }],
      },
    }
  );

  return data.cartCreate.cart;
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity: number = 1
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{
    cartLinesAdd: { cart: ShopifyCart };
  }>(
    /* GraphQL */ `
      mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            ...CartFields
          }
        }
      }
      ${CART_FRAGMENT}
    `,
    {
      cartId,
      lines: [{ merchandiseId: variantId, quantity }],
    }
  );

  return data.cartLinesAdd.cart;
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{
    cartLinesUpdate: { cart: ShopifyCart };
  }>(
    /* GraphQL */ `
      mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            ...CartFields
          }
        }
      }
      ${CART_FRAGMENT}
    `,
    {
      cartId,
      lines: [{ id: lineId, quantity }],
    }
  );

  return data.cartLinesUpdate.cart;
}

export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{
    cartLinesRemove: { cart: ShopifyCart };
  }>(
    /* GraphQL */ `
      mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            ...CartFields
          }
        }
      }
      ${CART_FRAGMENT}
    `,
    { cartId, lineIds }
  );

  return data.cartLinesRemove.cart;
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{
    cart: ShopifyCart | null;
  }>(
    /* GraphQL */ `
      query GetCart($cartId: ID!) {
        cart(id: $cartId) {
          ...CartFields
        }
      }
      ${CART_FRAGMENT}
    `,
    { cartId }
  );

  return data.cart;
}
