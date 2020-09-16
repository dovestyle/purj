import { terser } from 'rollup-plugin-terser';

export default {
  input: 'dist.js',
  output: [
    { file: 'dist/purj.js', format: 'iife' },
    { file: 'dist/purj.min.js', format: 'iife', plugins: [terser()] },
  ],
};
