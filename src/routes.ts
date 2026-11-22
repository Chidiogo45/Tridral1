import { PageId } from './types.ts';

export const PAGE_PATHS: Record<PageId, string> = {
  home: '/',
  products: '/products',
  solutions: '/solutions',
  technology: '/technology',
  about: '/about',
  contact: '/contact',
  privacy: '/privacy',
  terms: '/terms',
};

export interface RouteResolution {
  page: PageId;
  redirectedFrom?: string;
}

const LEGACY_REDIRECTS: Record<string, PageId> = {
  '/product': 'products',
  '/platform': 'products',
  '/how-it-works': 'products',
  '/capabilities': 'products',
  '/sample-report': 'products',
  '/why-it-matters': 'solutions',
  '/why-bids-get-rejected': 'solutions',
  '/roadmap': 'technology',
  '/trust-center': 'technology',
  '/early-access': 'contact',
  '/quote': 'contact',
  '/pricing': 'products',
  '/faq': 'about',
};

export function resolveRouteFromLocation(pathname: string, hash: string): RouteResolution {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';

  if (cleanPath in LEGACY_REDIRECTS) {
    return { page: LEGACY_REDIRECTS[cleanPath], redirectedFrom: cleanPath };
  }

  for (const [id, path] of Object.entries(PAGE_PATHS)) {
    if (path === cleanPath) {
      return { page: id as PageId };
    }
  }

  const cleanHash = hash.replace(/^#\/?/, '').trim();
  if (cleanHash) {
    const hashAsPath = `/${cleanHash}`;
    if (hashAsPath in LEGACY_REDIRECTS) {
      return { page: LEGACY_REDIRECTS[hashAsPath], redirectedFrom: `#${cleanHash}` };
    }
    if (cleanHash in PAGE_PATHS) {
      return { page: cleanHash as PageId, redirectedFrom: `#${cleanHash}` };
    }
  }

  return { page: 'home' };
}
