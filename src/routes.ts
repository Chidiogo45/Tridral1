import { PageId } from './types.ts';

export const PAGE_PATHS: Record<PageId, string> = {
  home: '/',
  product: '/product',
  'sample-report': '/sample-report',
  'why-it-matters': '/why-it-matters',
  pricing: '/pricing',
  roadmap: '/roadmap',
  about: '/about',
  faq: '/faq',
  'trust-center': '/trust-center',
  'early-access': '/early-access',
};

export interface RouteResolution {
  page: PageId;
  redirectedFrom?: string;
  walkthroughIntent: boolean;
}

export function resolveRouteFromLocation(
  pathname: string,
  hash: string,
  search: string
): RouteResolution {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';
  const params = new URLSearchParams(search);
  const walkthroughIntent = params.get('intent') === 'walkthrough';

  // Legacy redirects to /product
  if (
    cleanPath === '/platform' ||
    cleanPath === '/how-it-works' ||
    cleanPath === '/capabilities'
  ) {
    return { page: 'product', redirectedFrom: cleanPath, walkthroughIntent: false };
  }

  // Legacy redirect to /why-it-matters
  if (cleanPath === '/why-bids-get-rejected') {
    return { page: 'why-it-matters', redirectedFrom: cleanPath, walkthroughIntent: false };
  }

  // Legacy redirects to /early-access
  if (cleanPath === '/contact' || cleanPath === '/quote') {
    return { page: 'early-access', redirectedFrom: cleanPath, walkthroughIntent };
  }

  for (const [id, path] of Object.entries(PAGE_PATHS)) {
    if (path === cleanPath) {
      return { page: id as PageId, walkthroughIntent };
    }
  }

  const cleanHash = hash.replace(/^#\/?/, '').trim();
  if (cleanHash === 'platform' || cleanHash === 'how-it-works' || cleanHash === 'capabilities') {
    return { page: 'product', redirectedFrom: `#${cleanHash}`, walkthroughIntent: false };
  }
  if (cleanHash === 'why-bids-get-rejected') {
    return { page: 'why-it-matters', redirectedFrom: `#${cleanHash}`, walkthroughIntent: false };
  }
  if (cleanHash === 'contact' || cleanHash === 'quote') {
    return { page: 'early-access', redirectedFrom: `#${cleanHash}`, walkthroughIntent };
  }
  if (cleanHash && cleanHash in PAGE_PATHS) {
    return { page: cleanHash as PageId, redirectedFrom: `#${cleanHash}`, walkthroughIntent };
  }

  return { page: 'home', walkthroughIntent: false };
}
