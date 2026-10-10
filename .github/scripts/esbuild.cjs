const esbuild = require('esbuild');

// Keep one reproducible CommonJS build for the artifact referenced by action.yml.
esbuild
  .build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    platform: 'node',
    target: 'node24',
    format: 'cjs',
    outdir: 'lib',
    sourcemap: true,
    sourcesContent: false,
    logLevel: 'info',
  })
  .catch(() => {
    process.exitCode = 1;
  });
