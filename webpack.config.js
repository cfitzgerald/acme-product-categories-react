'use strict';

// The exports is a configuration object that tells webpack what to do
module.exports = {

  // The entry field tells webpack where our application starts.
  // Webpack will start building this file and any subsequent file(s) that are imported by that file
  entry: './browser/react/App.js',

  // The output field specifies where webpack's output will go. In this case, we've specified
  // that it should put it into a file called bundle.js in our public directory
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },

  // The context field simply sets the context for relative pathnames
  context: __dirname,

  // This handy option tells webpack to create another, special file called "bundle.js.map".
  // This special file is called a "source-map".
  // If enabled, your browser will automatically request this file so that it can faithfully re-create your source code in your browser's dev tools.
  // This way, when you open the code for debugging in Chrome dev tools, instead of seeing the hard-to-read transpiled code that webpack creates, you'll
  // see your clean source code.
  // For more info: https://developers.google.com/web/tools/chrome-devtools/javascript/source-maps
  devtool: 'source-map',

  // Here is where we specify what kinds of special syntax webpack should look out for
  module: {
    // Loaders are special node modules that we've installed that know how to parse certain syntax.
    // There are loaders for all different kinds of syntax.
    loaders: [
      {
        // Here, we want to test and see if any files end with .js or .jsx.
        // Only files that match this criteria will be parsed by this loader.
        test: /jsx?$/,
        // We want webpack to ignore anything in a node_modules or bower_components directory.
        // This is very important - modules have a responsibility to build their own js files.
        // If we were to do this ourselves, building our bundle.js would take forever!
        exclude: /(node_modules|bower_components)/,
        // We're using the babel-loader module to read our files - it can handle both ES6 and JSX!
        loader: 'babel-loader',
        // Here, we telling webpack to look for any syntax that looks like ES6 and any syntax that looks like JSX.
        // If it finds it, the babel-loader will transpile it for us!
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};
