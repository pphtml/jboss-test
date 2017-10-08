// module = (typeof module === 'undefined') ? {} : module;

(function () {
    let Paths = java.nio.file.Paths;
    let Files = java.nio.file.Files;
    let File = java.io.File;
    let System = java.lang.System;

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
            let parent = Paths.get(this.filename).getParent().toString()
            return Require(id, parent);
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

    let internalNodeModules = {
        path: {
            basename: (path) => Paths.get(path).getFileName().toString(),
            delimiter: System.getProperty('path.separator'),
            dirname: (path) => Paths.get(path).getParent().toString()
        }
    }

    function Require(id, parent) {
        print(`require(${id})   ${parent != undefined ? ' - [' + parent + ']' : ''}`);
        if (id in internalNodeModules) {
            return internalNodeModules[id];
        } else if (id in Require.cache) {
            return Require.cache[id];
        } else {
            let file = Require.resolve(id, parent);
            return Module._load(file, parent);
        }

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

    function resolveFile(name, base, suffix = '.js') {
        print(`resolveFile(${name}, ${base})`);
        let filename = name.substr(name.length-suffix.length) === suffix ? name : name + suffix;
        let path = Paths.get(base, filename);
        if (Files.isRegularFile(path)) {
            print(`FOUND: ${path}`);
            return path.normalize().toAbsolutePath().toString();
        }
    }
    
    function resolveDirectory(base) {
        print(`resolveDirectory(${base})`);
        if (Files.isDirectory(Paths.get(base))) {
            let packageJsonFilename = Paths.get(base, 'package.json');
            if (Files.isRegularFile(Paths.get(packageJsonFilename))) {
                let jsonBody = readFile(packageJsonFilename),
                    package = JSON.parse(jsonBody);
                if ('main' in package) {
                    return resolveFile(package.main, base) ||
                        resolveDirectory(Paths.get(base, package.main).normalize().toAbsolutePath().toString());
                }
            }
        }

        return resolveFile('index.js', base);
    }

    Require.resolve = function (id, base) {
        let paths = [];
        if (base) { paths.push(base); }
        paths.push(Require.CWD); // TODO dolu
        if (Require.NODE_PATH) { paths.push(Require.NODE_PATH); }
        for (let parentPath of paths) {
            // let path = Paths.get(parentPath, id);
            // let absolutePath = path.toAbsolutePath();
            let resolved =
                resolveFile(id, parentPath) ||
                resolveDirectory(Paths.get(parentPath, id).normalize().toString());
            if (resolved) { return resolved }
        }

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
    // Require.CWD = System.getProperty('user.dir');
    //Require.CWD = Paths.get('src/main/frontend').toAbsolutePath().toString();
    Require.CWD = 'src/main/frontend';
    // Require.NODE_PATH = undefined;
    Require.NODE_PATH = 'src/main/frontend/node_modules';
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
