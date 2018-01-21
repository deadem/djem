var path = require('path');
var webpack = require('webpack');

const targetPath = path.resolve(__dirname, '../panel');
const Plugins = {
  raw: require(path.join(__dirname, 'plugins', 'extract-raw-output.js')),
};

module.exports = [
  {
    entry: {
      'index': './src/index.tsx',
      'core': [
        'material-ui',
        'react-redux',
        'redux',
        'axios',
      ]
    },
    output: {
      path: targetPath,
      // publicPath: '/dist/',
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            { loader: 'ts-loader' },
            {
              loader: 'tslint-loader',
              options: {
                emitErrors: true,
                // failOnHint: true,
                formatter: 'verbose',
                configFile: '.tslint.json',
              }
            },
          ],
          exclude: /node_modules/,
        },
        { test: /\.(png|jpg|gif|svg)$/, loader: 'file-loader', options: { name: '[name].[ext]?[hash]' } }
      ],
    },
    resolve: { extensions: ['.ts', '.js', '.tsx', '.json'] },
    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
    },
    // performance: { hints: false },
    // devServer: { historyApiFallback: true, noInfo: true },
    // devtool: '#eval-source-map'
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        'name': 'core',
        minChunks: Infinity,
      }),
    ]
  },
  {
    entry: './src/css/index.scss',
    output: {
      path: targetPath,
      filename: 'index.css',
    },
    module: {
      rules: [{
        test: /\.scss$/,
        use: [
          { loader: 'extract-raw-output-loader' },
          { loader: 'sass-loader' },
        ],
      }]
    },
    resolveLoader: { alias: { 'extract-raw-output-loader': path.join(__dirname, 'plugins/extract-raw-output-loader.js') } },
    plugins: [
      new Plugins.raw(),
    ]
  },
  {
    entry: {
      'react.js': path.resolve(__dirname, './node_modules/react/umd/react.development.js'),
      'react-dom.js': path.resolve(__dirname, './node_modules/react-dom/umd/react-dom.development.js'),
      'es6-promise.js': path.resolve(__dirname, './node_modules/es6-promise/dist/es6-promise.auto.min.js'),
    },
    output: {
      path: targetPath,
      filename: '[name]',
    },
    module: {
      rules: [{
        test: /./,
        use: {
          loader: 'extract-raw-output-loader',
        }
      }],
      noParse: [/./],
    },
    resolveLoader: { alias: { 'extract-raw-output-loader': path.join(__dirname, 'plugins/extract-raw-output-loader.js') } },
    plugins: [
      new Plugins.raw(),
    ]
  }
];

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"production"' } }),
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true, compress: { warnings: false } }),
    new webpack.LoaderOptionsPlugin({ minimize: true })
  ])
}
