import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';

function devApiPlugin(): Plugin {
  return {
    name: 'dev-api-contact-handler',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && (req.url === '/api/contact' || req.url.startsWith('/api/contact?'))) {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });
            req.on('end', async () => {
              try {
                (req as any).body = body ? JSON.parse(body) : {};
              } catch {
                (req as any).body = {};
              }

              const vRes: any = res;
              vRes.status = (code: number) => {
                res.statusCode = code;
                return vRes;
              };
              vRes.json = (data: any) => {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
                return vRes;
              };

              try {
                const { default: handler } = await import('./api/contact.ts');
                await handler(req as any, vRes);
              } catch (err: any) {
                console.error('[Dev API error]', err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: err.message }));
              }
            });
            return;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), devApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
