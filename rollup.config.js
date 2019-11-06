import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import pkg from './package.json';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.js',
  external: ['react', 'react-dom', 'prop-types'],
  output: [
    { file: pkg.main, format: 'cjs', exports: 'named' },
  ],
  plugins: [
    resolve(),
    commonjs({ include: 'node_modules/**' }),
    babel({ exclude: 'node_modules/**' }),
    terser(),
    sizeSnapshot(),
    postcss({
      plugins: [],
      getExportNamed: false,
      extract: 'dist/styles.css',
    })
  ],
};