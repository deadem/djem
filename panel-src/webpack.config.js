var path = require('path');
var webpack = require('webpack');
const targetPath = path.resolve(__dirname, '../panel');
const Plugins = {
  raw: require(path.join(__dirname, 'plugins', 'extract-raw-output.js')),
};

module.exports = [
  {
    entry: './src/index.ts',
    output: {
      path: targetPath,
      // publicPath: '/dist/',
      filename: 'index.js'
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
              // the "scss" and "sass" values for the lang attribute to the right configs here.
              // other preprocessors should work out of the box, no loader config like this necessary.
              'scss': 'vue-style-loader!css-loader!sass-loader',
              'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
            }
            // other vue-loader options go here
          }
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/],
          }
        },
        { test: /\.(png|jpg|gif|svg)$/, loader: 'file-loader', options: { name: '[name].[ext]?[hash]' } }
      ]
    },
    resolve: { extensions: ['.ts', '.js', '.vue', '.json'], alias: { 'vue$': 'vue/dist/vue.esm.js' } },
    devServer: { historyApiFallback: true, noInfo: true },
    performance: { hints: false },
    // devtool: '#eval-source-map'
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
    entry: { vuetify: path.resolve(__dirname, './node_modules/vuetify/dist/vuetify.min.css') },
    output: {
      path: targetPath,
      filename: '._',
    },
    module: {
      rules: [{
        test: /./,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          }
        }
      }]
    }
  }
];

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"production"' } }),
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true, compress: { warnings: false } }),
    new webpack.LoaderOptionsPlugin({ minimize: true })
  ])
}
