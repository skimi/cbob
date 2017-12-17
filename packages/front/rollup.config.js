import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import replace from 'rollup-plugin-replace';
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import postcssModules from 'postcss-modules';
import sass from 'node-sass';
import html from 'rollup-plugin-fill-html';

const cssExportMap = {};

const sassPreprocessor = (content, id) => new Promise((resolve) => {
  const result = sass.renderSync({ file: id })
  resolve({ code: result.css.toString() })
})

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife'
  },
  plugins: [
    resolve(),
    commonjs({
      include: 'node_modules/**',
    }),
    html({
      template: 'src/index.html',
      filename: 'index.html',
    }),
    postcss({
      extract: true,
      extensions: ['.scss'],
      preprocessor: sassPreprocessor,
      plugins: [
        postcssModules({
          getJSON(id, exportTokens) {
            cssExportMap[id] = exportTokens;
          }
        })
      ],
      getExport(id) {
        return cssExportMap[id];
      },
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.ROLLUP_WATCH ? 'dev' : 'production')
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    process.env.ROLLUP_WATCH && serve('dist'),
    process.env.ROLLUP_WATCH && livereload('dist')
  ].filter(Boolean),
};
