import jsx from 'rollup-plugin-jsx';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import url from 'rollup-plugin-url';
import * as index from './src/index';

function createModuleExport(
  format,
  { input = './src/index.js', outputFileName = './index.js' } = {}
) {
  return {
    external: ['react', 'styled-components'],
    plugins: [
      jsx({ factory: 'React.createElement' }),
      resolve({ extensions: ['.js', '.jsx', '.json'] }),
      babel(),
      url({
        limit: 1024, // inline files < 10k, copy files > 10k
        include: ['**/*.woff'],
      }),
      ...(format === 'cjs' ? [uglify()] : []),
    ],
    input,
    output: {
      file: outputFileName,
      format,
    },
  };
}

const components = Object.keys(index).map(c =>
  createModuleExport('esm', {
    input: `./src/components/${c}.js`,
    outputFileName: `./lib/${c}.js`,
  })
);

export default [
  createModuleExport('cjs'),
  ...components,
  createModuleExport('esm', {
    input: `./src/globalStyles.js`,
    outputFileName: `./lib/globalStyles.js`,
  }),
];
