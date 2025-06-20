import { Menu, ShopifyMenuOperation } from './types';
import { getMenuQuery } from './queries/menu';
import { SHOPIFY_GRAPHQL_API_ENDPOINT, TAGS } from '../constants';
import { ensuresStartsWith } from '../utils';
import { isShopifyError } from '../type-guards';

const domain = process.env.SHOPIFY_STORE_DOMAIN
  ? ensuresStartsWith(process.env.SHOPIFY_STORE_DOMAIN, 'https://')
  : '';

const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;

const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// ------------------------------------------------------------
// shopifyFetch - generic function to fetch data from Shopify
// ------------------------------------------------------------

type ExtractVariables<T> = T extends { variables: object }
  ? T['variables']
  : never;

export async function shopifyFetch<T>({
  cache = 'force-cache',
  headers,
  query,
  tags,
  variables,
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key,
        ...headers,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables }),
      }),
      cache,
      ...(tags && { next: { tags } }),
    });

    const body = await result.json();

    if (body.errors) {
      throw body.error[0];
    }

    return {
      status: result.status,
      body,
    };
  } catch (error) {
    if (isShopifyError(error)) {
      throw {
        cause: error.cause?.toString() || 'unknown error',
        status: error.status || 500,
        message: error.message,
        query,
      };
    }

    throw {
      error,
      query,
    };
  }
}

// ------------------------------------------------------------

// ------------------------------------------------------------
// getMenu - fetch menu from Shopify
export async function getMenu(handle: string): Promise<Menu[]> {
  const res = await shopifyFetch<ShopifyMenuOperation>({
    query: getMenuQuery,
    tags: [TAGS.collections],
    variables: {
      handle,
    },
  });

  return (
    res.body?.data?.menu?.items.map((item: { title: string; url: string }) => ({
      title: item.title,
      path: item.url
        .replace(domain, '')
        .replace('/collections', '/search')
        .replace('/pages', ''),
    })) ?? []
  );
}

// ------------------------------------------------------------
// getCollection - fetch collection from Shopify
// ------------------------------------------------------------
// export async function getCollection(handle: string): Promise<Collection[]> {
//   const res = await shopifyFetch<ShopifyCollectionOperation>({});
// }
