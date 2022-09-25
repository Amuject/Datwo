module.exports = {
  presets: [
    [
      'babel-preset-minify',
      {
        builtIns: false,
        evaluate: false,
        mangle: false,
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-transform-modules-commonjs',
      {
        allowTopLevelThis: true,
      },
    ],
  ],
  comments: false,
};
