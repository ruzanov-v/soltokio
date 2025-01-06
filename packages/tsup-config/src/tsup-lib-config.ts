import { Options } from 'tsup'

export const DefaultLibConfig: Options = {
  entry: ['src/entrypoint.ts'],
  skipNodeModulesBundle: true,
  format: 'esm',
  splitting: false,
  sourcemap: true,
  clean: true,
  target: 'es2024',
  minify: false,
  dts: true
}
