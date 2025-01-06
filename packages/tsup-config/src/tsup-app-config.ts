import { Options } from 'tsup'

export const DefaultAppConfig: Options = {
  entry: ['src/entrypoint.ts'],
  skipNodeModulesBundle: false,
  format: 'esm',
  splitting: false,
  sourcemap: true,
  clean: true,
  target: 'es2024',
  minify: false,
  dts: true
}
