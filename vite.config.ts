import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5173',
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            // Intercept the request and send mock data
            if (req.url?.includes('/api/first-activity')) {
              const mockData = [
                { id: 1, name: 'Mock Item One' },
                { id: 2, name: 'Mock Item Two' },
                { id: 3, name: 'Mock Item Three' },
                { id: 4, name: 'Mock Item Four' },
                { id: 5, name: 'Mock Item Five' }
              ];
              
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(mockData));
              proxyReq.destroy();
            }
          });
        }
      }
    }
  }
})
