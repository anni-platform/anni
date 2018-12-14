import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import url from 'rollup-plugin-url';
import { mainFile, components } from './build-config.json';

const options = {
  external: ['react', 'prop-types', 'styled-components'],
  plugins: [
    resolve({
      extensions: ['.js', '.jsx', '.json'],
    }),
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: ['@babel/preset-env', '@babel/preset-react'],
    }),
    url({
      // limit: 1024, // inline files < 10k, copy files > 10k
      include: ['**/*.woff'],
    }),
    uglify(),
  ],
};

export default [
  ...components.map(c => ({
    ...options,
    input: `./src/components/${c}.js`,
    output: {
      file: `./lib/${c}.js`,
      format: 'cjs',
    },
  })),
  {
    ...options,
    input: mainFile,
    output: {
      file: 'index.js',
      format: 'cjs',
    },
  },
];
