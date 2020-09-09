const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const resolvePath = (...args) => path.resolve(__dirname, ...args)
const isPro = process.env.NODE_ENV === 'production'

const extensions = ['.js', '.jsx', '.ts', '.tsx']

module.exports = {
  entry: resolvePath('./src/index.tsx'),
  target: 'web',
  optimization: {
    /**
     *  Modules are removed from chunks when they are already available in all parent chunk groups.
     *  This reduces asset size. Smaller assets also result in faster builds since less code generation has to be performed.
     */
    removeAvailableModules: true,
    /** Empty chunks are removed. This reduces load in filesystem and results in faster builds. */
    removeEmptyChunks: true,
    /** Equal chunks are merged. This results in less code generation and faster builds. */
    mergeDuplicateChunks: true,
    /** Chunks which are subsets of other chunks are determined and flagged in a way that subsets don’t have to be loaded when the bigger chunk has been loaded. */
    // flagIncludedChunks?: boolean;
    /** Give more often used ids smaller (shorter) values. */
    // occurrenceOrder?: boolean;
    /** Determine exports for each module when possible. This information is used by other optimizations or code generation. I. e. to generate more efficient code for export * from. */
    // providedExports?: boolean;
    /**
     *  Determine used exports for each module. This depends on optimization.providedExports. This information is used by other optimizations or code generation.
     *  I. e. exports are not generated for unused exports, export names are mangled to single char identifiers when all usages are compatible.
     *  DCE in minimizers will benefit from this and can remove unused exports.
     */
    // usedExports?: boolean;
    /**
     *  Recognise the sideEffects flag in package.json or rules to eliminate modules. This depends on optimization.providedExports and optimization.usedExports.
     *  These dependencies have a cost, but eliminating modules has positive impact on performance because of less code generation. It depends on your codebase.
     *  Try it for possible performance wins.
     */
    // sideEffects?: boolean;
    /** Tries to find segments of the module graph which can be safely concatenated into a single module. Depends on optimization.providedExports and optimization.usedExports. */
    // concatenateModules?: boolean;
    /** Finds modules which are shared between chunk and splits them into separate chunks to reduce duplication or separate vendor modules from application modules. */
    splitChunks: {
      /** Select chunks for determining shared modules (defaults to \"async\", \"initial\" and \"all\" requires adding these chunks to the HTML) */
      //  chunks?: "initial" | "async" | "all" | ((chunk: compilation.Chunk) => boolean);
      chunks: 'all',
      /** Minimal size for the created chunk */
      //  minSize?: number;
      /** Maximum size for the created chunk */
      //  maxSize?: number;
      /** Minimum number of times a module has to be duplicated until it's considered for splitting */
      //  minChunks?: number;
      /** Maximum number of requests which are accepted for on-demand loading */
      //  maxAsyncRequests?: number;
      /** Maximum number of initial chunks which are accepted for an entry point */
      //  maxInitialRequests?: number;
      /** Give chunks created a name (chunks with equal name are merged) */
      //  name?: boolean | string | ((...args: any[]) => any);
      /** Assign modules to a cache group (modules from different cache groups are tried to keep in separate chunks) */
      //  cacheGroups?: false | string | ((...args: any[]) => any) | RegExp | { [key: string]: CacheGroupsOptions | false };
      /** Override the default name separator (~) when generating names automatically (name: true)  */
      //  automaticNameDelimiter?: string;
    },
    /** Create a separate chunk for the webpack runtime code and chunk hash maps. This chunk should be inlined into the HTML */
    // runtimeChunk?: boolean | "single" | "multiple" | RuntimeChunkOptions;
    /** Avoid emitting assets when errors occur. */
    // noEmitOnErrors?: boolean;
    /** Instead of numeric ids, give modules readable names for better debugging. */
    // namedModules?: boolean;
    /** Instead of numeric ids, give chunks readable names for better debugging. */
    // namedChunks?: boolean;
    /** Tells webpack which algorithm to use when choosing module ids. Default false. */
    // moduleIds?: boolean | "natural" | "named" | "hashed" | "size" | "total-size";
    /** Tells webpack which algorithm to use when choosing chunk ids. Default false. */
    // chunkIds?: boolean | "natural" | "named" | "size" | "total-size";
    /** Defines the process.env.NODE_ENV constant to a compile-time-constant value. This allows to remove development only code from code. */
    // nodeEnv?: string | false;
    /** Use the minimizer (optimization.minimizer, by default uglify-js) to minimize output assets. */
    // minimize?: boolean;
    /** Minimizer(s) to use for minimizing the output */
    // minimizer?: Array<Plugin | Tapable.Plugin>;
    /** Generate records with relative paths to be able to move the context folder". */
    // portableRecords?: boolean;
  },
  resolve: {
    extensions,
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }), // 清理数据
    new HtmlWebpackPlugin({
      // 自动打包数据
      title: '涂鸦智能',
      template: resolvePath('./index.html'), // html文件模板
    }),
    // new TsconfigPathsPlugin({
    //   baseUrl: resolvePath(),
    //   configFile: resolvePath('./tsconfig.json'),
    //   extensions,
    // }),
    // fork一个进程进行检查
    new ForkTsCheckerWebpackPlugin(),
  ],
  output: {
    filename: '[name].[hash].js', // 输出文件名称
    path: resolvePath('../public/admin'), // 输出文件路径
    publicPath: '/admin',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/transform-runtime'],
            },
          },
        ],
      },
      {
        test: /\.(tsx|ts)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/transform-runtime'],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },

      {
        test: /\.less$/,
        use: [
          {
            loader: isPro ? MiniCssExtractPlugin.loader : 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: { modules: false, importLoaders: 1 },
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              implementation: require('less'),
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: isPro ? MiniCssExtractPlugin.loader : 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: { modules: false, importLoaders: 1 },
          },
        ],
      },
    ],
  },
}
