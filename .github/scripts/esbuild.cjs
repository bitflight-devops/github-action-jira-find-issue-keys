#!/usr/bin/env node
const ESM_REQUIRE_SHIM = `
await (async () => {
  const { dirname } = await import("path");
  const { fileURLToPath } = await import("url");

  /**
   * Shim entry-point related paths.
   */
  if (typeof globalThis.__filename === "undefined") {
    globalThis.__filename = fileURLToPath(import.meta.url);
  }
  if (typeof globalThis.__dirname === "undefined") {
    globalThis.__dirname = dirname(globalThis.__filename);
  }
  /**
   * Shim require if needed.
   */
  if (typeof globalThis.require === "undefined") {
    const { default: module } = await import("module");
    globalThis.require = module.createRequire(import.meta.url);
  }
})();
`;

/** Whether or not you're bundling. */
const bundle = true;

/** Tell esbuild to add the shim to emitted JS. */
const shimBanner = {
  js: ESM_REQUIRE_SHIM,
};

/**
 * ESNext + ESM, bundle: true, and require() shim in banner.
 */
const buildOptions = {
  entryPoints: ['src/index.ts'],
  sourcemap: true,
  platform: 'node',
  outfile: 'lib/main.js',
  target: 'node16',
  format: 'esm',
  banner: bundle ? shimBanner : undefined,
  bundle,
};

require('esbuild')
  .build({
    ...buildOptions,
  })
  .catch(() => process.exit(1));
