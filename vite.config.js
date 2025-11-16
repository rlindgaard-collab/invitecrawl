import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        door: resolve(__dirname, 'door.html'),
        tavern: resolve(__dirname, 'tavern.html'),
        tavernServer: resolve(__dirname, 'tavern-server.html'),
        tavernTable: resolve(__dirname, 'tavern-table.html'),
        eventInfo: resolve(__dirname, 'event-info.html'),
        upload: resolve(__dirname, 'upload.html'),
      },
    },
  },
});
