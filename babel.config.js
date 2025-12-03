module.exports = function (api) {
  api.cache(true)
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            src: './src',
          },
        },
      ],
    ],
  }
}
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@': './src',
            '@components': './src/components',
            '@screens': './src/screens',
            '@services': './src/services',
            '@models': './src/models',
            '@utils': './src/utils',
            '@hooks': './src/hooks',
            '@navigation': './src/navigation',
            '@theme': './src/theme',
            '@constants': './src/constants'
          }
        }
      ]
    ]
  };
};
