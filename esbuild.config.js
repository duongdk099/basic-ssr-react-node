const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['server/server.jsx'],
  outfile: 'build/server.js',
  platform: 'node',
  watch: true, // Active la surveillance des changements
}).catch(() => process.exit(1));