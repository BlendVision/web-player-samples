import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import babel from '@rollup/plugin-babel';
import copy from 'rollup-plugin-copy';
import { copyPSEEngine } from '@blendvision/pse/bundle-utils';

const config = [{
  input: './js/index.js',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'esm', 
      inlineDynamicImports: true,
    },
  ],
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false,
    }),
    commonjs({
      include: /node_modules/,
      transformMixedEsModules: true,
    }),
    babel({
      babelHelpers: 'runtime',
      presets: ['@babel/env', '@babel/react'],
      plugins: [
        'inline-import',
        '@babel/syntax-dynamic-import',
        ['@babel/plugin-transform-runtime', {helpers: true, useESModules: true}],
      ],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      exclude: 'node_modules/**',
    }),
    replace({
      'process.env.npm_package_version': JSON.stringify(
        `${process.env.npm_package_version || '{{VERSION}}'}`,
      ),
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true,
    }),
    copy({
      targets: [
        {
          src: './index.html', 
          dest: 'dist',
          transform: (contents, filename) => contents.toString().replace('./js/index.js', './index.esm.js'),
        },
      ],
    }),
    copyPSEEngine({
      dest: 'dist',
    })
  ],
  treeshake: true,
}];

export default config;