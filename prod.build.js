const {build} =  require('esbuild')
const {resolve} = require('path')

const buildPath = resolve(__dirname, 'dist');
// Server
build({
    entryPoints: ['./server/server.ts'],
    outdir: resolve(buildPath, 'server'),
    bundle: true,
    minify: true,
    platform: 'node',
    target: 'node14',
    logLevel: "info"
}).catch(() => process.exit(1))

// Client
build({
    entryPoints: ['./client/client.ts'],
    outdir: resolve(buildPath, 'client'),
    bundle: true,
    minify: true,
    platform: 'browser',
    target: 'es2020',
    logLevel: "info"
}).catch(() => process.exit(1))