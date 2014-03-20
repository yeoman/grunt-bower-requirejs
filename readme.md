# grunt-bower-requirejs [![Build Status](https://secure.travis-ci.org/yeoman/grunt-bower-requirejs.png?branch=master)](http://travis-ci.org/yeoman/grunt-bower-requirejs) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

> Automagically wire-up installed Bower components into your RequireJS config

Grunt wrapper for the [bower-requirejs](https://github.com/yeoman/bower-requirejs) module.


## Getting Started

If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a Gruntfile as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```shell
npm install grunt-bower-requirejs --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-bower-requirejs');
```

[grunt]: http://gruntjs.com
[Getting Started]: http://gruntjs.com/getting-started


## Example usage

```js
grunt.initConfig({
  bower: {
    target: {
      rjsConfig: 'app/config.js'
    }
  }
});

grunt.loadNpmTasks('grunt-bower-requirejs');

grunt.registerTask('default', ['bower']);
```


## Documentation

When the `bower` task is run it merges the paths of installed Bower components into the `paths` property of your RequireJS config.

You trigger this task from another task in your Gruntfile or through the CLI: `grunt bower`


### rjsConfig

**Required**  
Type: `String`

Specify a relative path to your RequireJS config.

Make sure to specify the `baseUrl` property in your RequireJS config if you want to use relative paths.


### Options

#### exclude

Default: `[]`  
Type: `Array`

Specify components to be excluded from being added to the RequireJS config.

```js
bower: {
  all: {
    rjsConfig: '<%= yeoman.app %>/scripts/main.js',
    options: {
      exclude: ['modernizr', 'sass-bootstrap', 'qtip2']
    }
  }
}
```

#### baseUrl

Default: `null`  
Type: `String`

Generate paths relative to a specific directory. This option is for anyone **not** using `data-main` who wishes to set their own base.

```js
bower: {
  all: {
    rjsConfig: '<%= yeoman.app %>/path/to/main.js',
    options: {
      baseUrl: './'
    }
  }
}
```

#### transitive

Default: `false`  
Type: `Boolean`

If the transitive option is set to `true`, then transitive dependencies will be also added to the require config.

For example, say we explicitly have an entry in our bower config for module `myTotallyCoolModule`, which depends on `jQuery` and `underscore`. If the transitive option is set to `true`, there will be config entries for `myTotallyCoolModule`, `jQuery`, and `underscore`. Otherwise, if the transitive option is set to `false`, there will only be a config entry for `myTotallyCoolModule`.

Each transitive dependency is only included once, even if the dependency is used multiple times.

```js
bower: {
  all: {
    rjsConfig: '<%= yeoman.app %>/scripts/main.js',
    options: {
      transitive: true
    }
  }
}
```

## Using Bower Hooks

Bower >=v1.3.1 includes [hooks](https://github.com/bower/bower/blob/master/HOOKS.md) for `preinstall`, `postinstall` and `preuninstall` actions. To run grunt-bower-requirejs after every bower install, add a `scripts` block to your `.bowerrc`.

```
{
  "scripts": {
    "postinstall": "grunt bower"
  }
}
```

## Things to remember

### Config file

If you do not already have a `config.js` file at the location specified by the `--config` option then one will be generated for you. A basic `config.js` file looks like this:

``` js
requirejs.config({
  shim: {},
  paths: {}
});
```

You still need to create a path for *your* js files. This tool will only create paths for third party libraries specified in `bower.json`.

``` js
requirejs.config({
  shim: {},
  paths: {
    myComponent: 'js/myComponent.js'  // make sure to add your components!
  }
});
```

The tool does not overwrite the config file, it just adds additional paths to it. So paths you add will be preserved. Keep in mind that if you change or remove one of your Bower dependencies after you've run the task, that path will still exist in the config file and you'll need to manually remove it.

### RequireJS component

Although RequireJS does not provide a `bower.json` file, a path to `require.js` will still be created in your `rjsConfig` file. The path's name will be `requirejs`. If you are optimizing your scripts with `r.js` you can use this path to make sure RequireJS is included in your bundle.


## License

[BSD license](http://opensource.org/licenses/bsd-license.php) and copyright Google
