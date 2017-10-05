// module = (typeof module === 'undefined') ? {} : module;

(function () {
    let Paths = java.nio.file.Paths;
    let Files = java.nio.file.Files;
    let File = java.io.File;

    function Module(id, parent, core) {
        this.id = id;
        this.core = core;
        this.parent = parent;
        this.children = [];
        this.filename = id;
        this.loaded = false;

        Object.defineProperty(this, 'exports', {
            get: function () {
                return this._exports;
            }.bind(this),
            set: function (val) {
                Require.cache[this.filename] = val;
                this._exports = val;
            }.bind(this)
        });
        this.exports = {};

        if (parent && parent.children) parent.children.push(this);

        this.require = function (id) {
            return Require(id, this);
        }.bind(this);
    }

    Module._load = function _load(file, parent, core, main) {
        var module = new Module(file, parent, core);
        var body = readFile(module.filename, module.core);
        var dir = new File(module.filename).getParent();
        var func = new Function('exports', 'module', 'require', '__filename', '__dirname', body);
        func.apply(module,
            [module.exports, module, module.require, module.filename, dir]);
        module.loaded = true;
        module.main = main;
        return module.exports;
    };

    Module.runMain = function runMain(main) {
        var file = Require.resolve(main);
        Module._load(file, undefined, false, true);
    };

    function Require(id, parent) {
        var file = Require.resolve(id, parent);
        // print(file);
        return Module._load(file, parent);

        // try {
        //     if (Require.cache[file]) {
        //         return Require.cache[file];
        //     } else if (file.endsWith('.js')) {
        //         return Module._load(file, parent, core);
        //     } else if (file.endsWith('.json')) {
        //         return loadJSON(file);
        //     }
        // } catch (ex) {
        //     if (ex instanceof java.lang.Exception) {
        //         throw new ModuleError('Cannot load module ' + id, 'LOAD_ERROR', ex);
        //     } else {
        //         System.out.println('Cannot load module ' + id + ' LOAD_ERROR');
        //         throw ex;
        //     }
        // }
    }

    Require.resolve = function (id, parent) {
        let path = Paths.get(id);
        return path.toAbsolutePath();
        // var roots = findRoots(parent);
        // print(roots);
        // for (var i = 0; i < roots.length; ++i) {
        //     var root = roots[i];
        //     var result = resolveCoreModule(id, root) ||
        //         resolveAsFile(id, root, '.js') ||
        //         resolveAsFile(id, root, '.json') ||
        //         resolveAsDirectory(id, root) ||
        //         resolveAsNodeModule(id, root);
        //     if (result) {
        //         return result;
        //     }
        // }
        return false;
    };

    Require.cache = {};
    require = Require;

    function readFile(filename) {
        return new java.lang.String(Files.readAllBytes(Paths.get(filename)));
        // var input;
        // try {
        //     if (core) {
        //         var classloader = java.lang.Thread.currentThread().getContextClassLoader();
        //         input = classloader.getResourceAsStream(filename);
        //     } else {
        //         input = new File(filename);
        //     }
        //     return new Scanner(input).useDelimiter('\\A').next();
        // } catch (e) {
        //     throw new ModuleError('Cannot read file [' + input + ']: ', 'IO_ERROR', e);
        // }
    }

}());
