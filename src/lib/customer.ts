// Customer auth via Shopify Storefront API
// All mutations use the public Storefront token — no Admin API needed.

import { shopifyFetch } from "./shopify";

export async function customerCreate(
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<{ customer: { id: string } | null; errors: { field: string; message: string }[] }> {
  const data = await shopifyFetch<{ customerCreate: { customer: { id: string } | null; customerUserErrors: { field: string[]; message: string }[] } }>(`
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer { id }
        customerUserErrors { field message }
      }
    }
  `, { input: { email, password, firstName, lastName } });
  return {
    customer: data.customerCreate.customer,
    errors: data.customerCreate.customerUserErrors.map(e => ({ field: e.field.join('.'), message: e.message })),
  };
}

export async function customerAccessTokenCreate(
  email: string,
  password: string
): Promise<{ accessToken: string | null; expiresAt: string | null; errors: { message: string }[] }> {
  const data = await shopifyFetch<{ customerAccessTokenCreate: { customerAccessToken: { accessToken: string; expiresAt: string } | null; customerUserErrors: { message: string }[] } }>(`
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken { accessToken expiresAt }
        customerUserErrors { message }
      }
    }
  `, { input: { email, password } });
  return {
    accessToken: data.customerAccessTokenCreate.customerAccessToken?.accessToken ?? null,
    expiresAt: data.customerAccessTokenCreate.customerAccessToken?.expiresAt ?? null,
    errors: data.customerAccessTokenCreate.customerUserErrors,
  };
}

export async function customerAccessTokenDelete(accessToken: string): Promise<void> {
  await shopifyFetch(`
    mutation customerAccessTokenDelete($customerAccessToken: String!) {
      customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
        deletedAccessToken
      }
    }
  `, { customerAccessToken: accessToken });
}

export async function getCustomer(accessToken: string): Promise<{ id: string; email: string; firstName: string; lastName: string } | null> {
  const data = await shopifyFetch<{ customer: { id: string; email: string; firstName: string; lastName: string } | null }>(`
    query getCustomer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id email firstName lastName
      }
    }
  `, { customerAccessToken: accessToken });
  return data.customer;
}


// ── Order history ────────────────────────────────────────

export interface ShopifyOrderLineItem {
  title: string;
  quantity: number;
  variant: {
    title: string;
    image: { url: string; altText: string | null } | null;
    price: { amount: string; currencyCode: string };
  } | null;
}

export interface ShopifyOrder {
  id: string;
  orderNumber: number;
  processedAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  totalPrice: { amount: string; currencyCode: string };
  lineItems: { edges: { node: ShopifyOrderLineItem }[] };
  shippingAddress: ShopifyAddress | null;
  statusUrl: string;
}

export interface ShopifyAddress {
  id?: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string | null;
  city: string;
  province: string;
  zip: string;
  country: string;
  phone: string | null;
}

export async function getCustomerOrders(
  accessToken: string
): Promise<ShopifyOrder[]> {
  const data = await shopifyFetch<{
    customer: {
      orders: { edges: { node: ShopifyOrder }[] };
    } | null;
  }>(
    `query getCustomerOrders($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        orders(first: 20, sortKey: PROCESSED_AT, reverse: true) {
          edges {
            node {
              id
              orderNumber
              processedAt
              financialStatus
              fulfillmentStatus
              totalPrice { amount currencyCode }
              statusUrl
              shippingAddress {
                firstName lastName address1 address2
                city province zip country phone
              }
              lineItems(first: 10) {
                edges {
                  node {
                    title
                    quantity
                    variant {
                      title
                      price { amount currencyCode }
                      image { url altText }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`,
    { customerAccessToken: accessToken }
  );
  return data.customer?.orders.edges.map((e) => e.node) ?? [];
}

// ── Address book ─────────────────────────────────────────

export async function getCustomerAddresses(
  accessToken: string
): Promise<(ShopifyAddress & { id: string })[]> {
  const data = await shopifyFetch<{
    customer: {
      addresses: { edges: { node: ShopifyAddress & { id: string } }[] };
    } | null;
  }>(
    `query getCustomerAddresses($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        addresses(first: 10) {
          edges {
            node {
              id firstName lastName address1 address2
              city province zip country phone
            }
          }
        }
      }
    }`,
    { customerAccessToken: accessToken }
  );
  return data.customer?.addresses.edges.map((e) => e.node) ?? [];
}

export async function customerAddressCreate(
  accessToken: string,
  address: Omit<ShopifyAddress, "id">
): Promise<{ id: string } | null> {
  const data = await shopifyFetch<{
    customerAddressCreate: {
      customerAddress: { id: string } | null;
    };
  }>(
    `mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
      customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
        customerAddress { id }
      }
    }`,
    { customerAccessToken: accessToken, address }
  );
  return data.customerAddressCreate.customerAddress;
}

export async function customerAddressUpdate(
  accessToken: string,
  addressId: string,
  address: Omit<ShopifyAddress, "id">
): Promise<void> {
  await shopifyFetch(
    `mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
      customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
        customerAddress { id }
      }
    }`,
    { customerAccessToken: accessToken, id: addressId, address }
  );
}

export async function customerAddressDelete(
  accessToken: string,
  addressId: string
): Promise<void> {
  await shopifyFetch(
    `mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
      customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
        deletedCustomerAddressId
      }
    }`,
    { customerAccessToken: accessToken, id: addressId }
  );
}

// ── Account details ───────────────────────────────────────

export async function customerUpdate(
  accessToken: string,
  fields: {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
  }
): Promise<{ errors: { message: string }[] }> {
  const data = await shopifyFetch<{
    customerUpdate: {
      customerUserErrors: { message: string }[];
    };
  }>(
    `mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
      customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
        customerUserErrors { message }
      }
    }`,
    { customerAccessToken: accessToken, customer: fields }
  );
  return { errors: data.customerUpdate.customerUserErrors };
}
