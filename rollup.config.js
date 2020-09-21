import { terser } from 'rollup-plugin-terser';

export default [{
  input: './build/purj.js',
  output: [
    { file: 'dist/purj.js', format: 'iife' },
    { file: 'dist/purj.min.js', format: 'iife', plugins: [terser()] },
  ],
}, {
  input: './build/bulma.js',
  output: [
    { file: 'dist/bulma.js', format: 'iife' },
    { file: 'dist/bulma.min.js', format: 'iife', plugins: [terser()] },
  ],
}];
