const {build} =  require('esbuild')
const {resolve} = require('path')

const buildPath = resolve(__dirname, 'dist');
// Server
build({
    entryPoints: ['./server/server.ts'],
    outdir: resolve(buildPath, 'server'),
    bundle: true,
    minify: false,
    platform: 'node',
    target: 'node14',
    watch: true,
    logLevel: "info"
}).catch(() => process.exit(1))

// Client
build({
    entryPoints: ['./client/client.ts'],
    outdir: resolve(buildPath, 'client'),
    bundle: true,
    minify: false,
    platform: 'browser',
    target: 'es2020',
    watch: true,
    logLevel: "info"
}).catch(() => process.exit(1))