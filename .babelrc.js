module.exports = {
  sourceMaps: 'inline',
  presets: [
    [
      '@babel/preset-env',
      {
        targets: 'node 16.0',
      },
    ],
  ],
  plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]],
};
