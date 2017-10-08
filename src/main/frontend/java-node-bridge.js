/**
 *  Copyright 2014-2016 Red Hat, Inc.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License")
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

// Since we intend to use the Function constructor.
/* jshint evil: true */

module = (typeof module === 'undefined') ? {} : module;

(function () {
    let Paths = java.nio.file.Paths;
    let Files = java.nio.file.Files;
    var System = java.lang.System;
    var Scanner = java.util.Scanner;
    var File = java.io.File;

    NativeRequire = (typeof NativeRequire === 'undefined') ? {} : NativeRequire;
    if (typeof require === 'function' && !NativeRequire.require) {
        NativeRequire.require = require;
    }

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

    let internalNodeModules = {
        path: {
            basename: (path) => Paths.get(path).getFileName().toString(),
            delimiter: System.getProperty('path.separator'),
            dirname: (path) => Paths.get(path).getParent().toString(),
            join: (paths) => (paths) => Array.isArray(paths) ? (paths.length > 1 ? Paths.get(paths[0], paths.slice(1)).toString() : Paths.get(paths[0]).toString()) : Paths.get(paths).toString()
        },
        fs: {
            mkdir: (path, mode, callback) => {
                print(`MKDIR ${path}`);
                if (callback) {
                    callback();
                }
            },
            rmdir: (path, callback) => {
                print(`RMDIR ${path}`);
                if (callback) {
                    callback();
                }
            },
            unlink: (path, callback) => {
                print(`UNLINK ${path}`);
                if (callback) {
                    callback();
                }
            },
            writeFile: (file, data, options, callback) => {
                print(`WRITEFILE ${file}`);
                if (callback) {
                    callback();
                }
            }
        },
        constants: 
            { E2BIG: 7,
                EACCES: 13,
                EADDRINUSE: 98,
                EADDRNOTAVAIL: 99,
                EAFNOSUPPORT: 97,
                EAGAIN: 11,
                EALREADY: 114,
                EBADF: 9,
                EBADMSG: 74,
                EBUSY: 16,
                ECANCELED: 125,
                ECHILD: 10,
                ECONNABORTED: 103,
                ECONNREFUSED: 111,
                ECONNRESET: 104,
                EDEADLK: 35,
                EDESTADDRREQ: 89,
                EDOM: 33,
                EDQUOT: 122,
                EEXIST: 17,
                EFAULT: 14,
                EFBIG: 27,
                EHOSTUNREACH: 113,
                EIDRM: 43,
                EILSEQ: 84,
                EINPROGRESS: 115,
                EINTR: 4,
                EINVAL: 22,
                EIO: 5,
                EISCONN: 106,
                EISDIR: 21,
                ELOOP: 40,
                EMFILE: 24,
                EMLINK: 31,
                EMSGSIZE: 90,
                EMULTIHOP: 72,
                ENAMETOOLONG: 36,
                ENETDOWN: 100,
                ENETRESET: 102,
                ENETUNREACH: 101,
                ENFILE: 23,
                ENOBUFS: 105,
                ENODATA: 61,
                ENODEV: 19,
                ENOENT: 2,
                ENOEXEC: 8,
                ENOLCK: 37,
                ENOLINK: 67,
                ENOMEM: 12,
                ENOMSG: 42,
                ENOPROTOOPT: 92,
                ENOSPC: 28,
                ENOSR: 63,
                ENOSTR: 60,
                ENOSYS: 38,
                ENOTCONN: 107,
                ENOTDIR: 20,
                ENOTEMPTY: 39,
                ENOTSOCK: 88,
                ENOTSUP: 95,
                ENOTTY: 25,
                ENXIO: 6,
                EOPNOTSUPP: 95,
                EOVERFLOW: 75,
                EPERM: 1,
                EPIPE: 32,
                EPROTO: 71,
                EPROTONOSUPPORT: 93,
                EPROTOTYPE: 91,
                ERANGE: 34,
                EROFS: 30,
                ESPIPE: 29,
                ESRCH: 3,
                ESTALE: 116,
                ETIME: 62,
                ETIMEDOUT: 110,
                ETXTBSY: 26,
                EWOULDBLOCK: 11,
                EXDEV: 18,
                SIGHUP: 1,
                SIGINT: 2,
                SIGQUIT: 3,
                SIGILL: 4,
                SIGTRAP: 5,
                SIGABRT: 6,
                SIGIOT: 6,
                SIGBUS: 7,
                SIGFPE: 8,
                SIGKILL: 9,
                SIGUSR1: 10,
                SIGSEGV: 11,
                SIGUSR2: 12,
                SIGPIPE: 13,
                SIGALRM: 14,
                SIGTERM: 15,
                SIGCHLD: 17,
                SIGSTKFLT: 16,
                SIGCONT: 18,
                SIGSTOP: 19,
                SIGTSTP: 20,
                SIGTTIN: 21,
                SIGTTOU: 22,
                SIGURG: 23,
                SIGXCPU: 24,
                SIGXFSZ: 25,
                SIGVTALRM: 26,
                SIGPROF: 27,
                SIGWINCH: 28,
                SIGIO: 29,
                SIGPOLL: 29,
                SIGPWR: 30,
                SIGSYS: 31,
                SIGUNUSED: 31,
                O_RDONLY: 0,
                O_WRONLY: 1,
                O_RDWR: 2,
                S_IFMT: 61440,
                S_IFREG: 32768,
                S_IFDIR: 16384,
                S_IFCHR: 8192,
                S_IFBLK: 24576,
                S_IFIFO: 4096,
                S_IFLNK: 40960,
                S_IFSOCK: 49152,
                O_CREAT: 64,
                O_EXCL: 128,
                O_NOCTTY: 256,
                O_TRUNC: 512,
                O_APPEND: 1024,
                O_DIRECTORY: 65536,
                O_NOATIME: 262144,
                O_NOFOLLOW: 131072,
                O_SYNC: 4096,
                O_DIRECT: 16384,
                O_NONBLOCK: 2048,
                S_IRWXU: 448,
                S_IRUSR: 256,
                S_IWUSR: 128,
                S_IXUSR: 64,
                S_IRWXG: 56,
                S_IRGRP: 32,
                S_IWGRP: 16,
                S_IXGRP: 8,
                S_IRWXO: 7,
                S_IROTH: 4,
                S_IWOTH: 2,
                S_IXOTH: 1,
                F_OK: 0,
                R_OK: 4,
                W_OK: 2,
                X_OK: 1,
                SSL_OP_ALL: 2147486719,
                SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION: 262144,
                SSL_OP_CIPHER_SERVER_PREFERENCE: 4194304,
                SSL_OP_CISCO_ANYCONNECT: 32768,
                SSL_OP_COOKIE_EXCHANGE: 8192,
                SSL_OP_CRYPTOPRO_TLSEXT_BUG: 2147483648,
                SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS: 2048,
                SSL_OP_EPHEMERAL_RSA: 0,
                SSL_OP_LEGACY_SERVER_CONNECT: 4,
                SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER: 32,
                SSL_OP_MICROSOFT_SESS_ID_BUG: 1,
                SSL_OP_MSIE_SSLV2_RSA_PADDING: 0,
                SSL_OP_NETSCAPE_CA_DN_BUG: 536870912,
                SSL_OP_NETSCAPE_CHALLENGE_BUG: 2,
                SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG: 1073741824,
                SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG: 8,
                SSL_OP_NO_COMPRESSION: 131072,
                SSL_OP_NO_QUERY_MTU: 4096,
                SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION: 65536,
                SSL_OP_NO_SSLv2: 16777216,
                SSL_OP_NO_SSLv3: 33554432,
                SSL_OP_NO_TICKET: 16384,
                SSL_OP_NO_TLSv1: 67108864,
                SSL_OP_NO_TLSv1_1: 268435456,
                SSL_OP_NO_TLSv1_2: 134217728,
                SSL_OP_PKCS1_CHECK_1: 0,
                SSL_OP_PKCS1_CHECK_2: 0,
                SSL_OP_SINGLE_DH_USE: 1048576,
                SSL_OP_SINGLE_ECDH_USE: 524288,
                SSL_OP_SSLEAY_080_CLIENT_DH_BUG: 128,
                SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG: 0,
                SSL_OP_TLS_BLOCK_PADDING_BUG: 512,
                SSL_OP_TLS_D5_BUG: 256,
                SSL_OP_TLS_ROLLBACK_BUG: 8388608,
                ENGINE_METHOD_RSA: 1,
                ENGINE_METHOD_DSA: 2,
                ENGINE_METHOD_DH: 4,
                ENGINE_METHOD_RAND: 8,
                ENGINE_METHOD_ECDH: 16,
                ENGINE_METHOD_ECDSA: 32,
                ENGINE_METHOD_CIPHERS: 64,
                ENGINE_METHOD_DIGESTS: 128,
                ENGINE_METHOD_STORE: 256,
                ENGINE_METHOD_PKEY_METHS: 512,
                ENGINE_METHOD_PKEY_ASN1_METHS: 1024,
                ENGINE_METHOD_ALL: 65535,
                ENGINE_METHOD_NONE: 0,
                DH_CHECK_P_NOT_SAFE_PRIME: 2,
                DH_CHECK_P_NOT_PRIME: 1,
                DH_UNABLE_TO_CHECK_GENERATOR: 4,
                DH_NOT_SUITABLE_GENERATOR: 8,
                NPN_ENABLED: 1,
                ALPN_ENABLED: 1,
                RSA_PKCS1_PADDING: 1,
                RSA_SSLV23_PADDING: 2,
                RSA_NO_PADDING: 3,
                RSA_PKCS1_OAEP_PADDING: 4,
                RSA_X931_PADDING: 5,
                RSA_PKCS1_PSS_PADDING: 6,
                POINT_CONVERSION_COMPRESSED: 2,
                POINT_CONVERSION_UNCOMPRESSED: 4,
                POINT_CONVERSION_HYBRID: 6,
                defaultCoreCipherList: 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:DHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA256:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA',
                defaultCipherList: 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:DHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA256:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA' }
    }

    function Require(id, parent) {
        print(`require(${id})   ${parent != undefined ? ' - [' + parent.filename + ']' : ''}`);

        if (id in internalNodeModules) {
            return internalNodeModules[id];
        }


        var core;
        var native_;
        var file = Require.resolve(id, parent);

        if (!file) {
            if (typeof NativeRequire.require === 'function') {
                if (Require.debug) {
                    System.out.println(['Cannot resolve', id, 'defaulting to native'].join(' '));
                }
                native_ = NativeRequire.require(id);
                if (native_) return native_;
            }
            System.err.println('Cannot find module ' + id);
            throw new ModuleError('Cannot find module ' + id, 'MODULE_NOT_FOUND');
        }

        if (file.core) {
            file = file.path;
            core = true;
        }
        try {
            if (Require.cache[file]) {
                print(`    CACHE ${file}`);
                return Require.cache[file];
            } else if (file.endsWith('.js')) {
                print(`    LOADING ${file}`);
                return Module._load(file, parent, core);
            } else if (file.endsWith('.json')) {
                print(`    JSONLOAD ${file}`);
                return loadJSON(file);
            }
        } catch (ex) {
            if (ex instanceof java.lang.Exception) {
                throw new ModuleError('Cannot load module ' + id, 'LOAD_ERROR', ex);
            } else {
                ex.printStackTrace();
                System.out.println('Cannot load module ' + id + ' LOAD_ERROR');
                throw ex;
            }
        }
    }

    Require.resolve = function (id, parent) {
        var roots = findRoots(parent);
        for (var i = 0; i < roots.length; ++i) {
            var root = roots[i];
            var result = resolveCoreModule(id, root) ||
                resolveAsFile(id, root, '.js') ||
                resolveAsFile(id, root, '.json') ||
                resolveAsDirectory(id, root) ||
                resolveAsNodeModule(id, root);
            if (result) {
                return result;
            }
        }
        return false;
    };

    Require.root = System.getProperty('user.dir');
    Require.NODE_PATH = '/home/petr/IdeaProjects/jboss-test/src/main/frontend/node_modules';

    function findRoots(parent) {
        var r = [];
        r.push(findRoot(parent));
        return r.concat(Require.paths());
    }

    function parsePaths(paths) {
        if (!paths) {
            return [];
        }
        if (paths === '') {
            return [];
        }
        var osName = java.lang.System.getProperty('os.name').toLowerCase();
        var separator;

        if (osName.indexOf('win') >= 0) {
            separator = ';';
        } else {
            separator = ':';
        }

        return paths.split(separator);
    }

    Require.paths = function () {
        var r = [];
        r.push(java.lang.System.getProperty('user.home') + '/.node_modules');
        r.push(java.lang.System.getProperty('user.home') + '/.node_libraries');

        if (Require.NODE_PATH) {
            r = r.concat(parsePaths(Require.NODE_PATH));
        } else {
            var NODE_PATH = java.lang.System.getenv().NODE_PATH;
            if (NODE_PATH) {
                r = r.concat(parsePaths(NODE_PATH));
            }
        }
        // r.push( $PREFIX + "/node/library" )
        return r;
    };

    function findRoot(parent) {
        if (!parent || !parent.id) {
            return Require.root;
        }
        var pathParts = parent.id.split(/[\/|\\,]+/g);
        pathParts.pop();
        return pathParts.join('/');
    }

    Require.debug = true;
    Require.cache = {};
    Require.extensions = {};
    require = Require;

    module.exports = Module;

    function loadJSON(file) {
        var json = JSON.parse(readFile(file));
        Require.cache[file] = json;
        return json;
    }

    function resolveAsNodeModule(id, root) {
        var base = [root, 'node_modules'].join('/');
        return resolveAsFile(id, base) ||
            resolveAsDirectory(id, base) ||
            (root ? resolveAsNodeModule(id, new File(root).getParent()) : false);
    }

    function resolveAsDirectory(id, root) {
        var base = [root, id].join('/');
        var file = new File([base, 'package.json'].join('/'));
        if (file.exists()) {
            try {
                var body = readFile(file.getCanonicalPath());
                var package_ = JSON.parse(body);
                if (package_.main) {
                    return (resolveAsFile(package_.main, base) ||
                        resolveAsDirectory(package_.main, base));
                }
                // if no package.main exists, look for index.js
                return resolveAsFile('index.js', base);
            } catch (ex) {
                throw new ModuleError('Cannot load JSON file', 'PARSE_ERROR', ex);
            }
        }
        return resolveAsFile('index.js', base);
    }

    function resolveAsFile(id, root, ext) {
        var file;
        if (id.length > 0 && id[0] === '/') {
            file = new File(normalizeName(id, ext));
            if (!file.exists()) {
                return resolveAsDirectory(id);
            }
        } else {
            file = new File([root, normalizeName(id, ext)].join('/'));
        }
        if (file.exists()) {
            //print(`FOUND: ${file.getCanonicalPath()}`);
            return file.getCanonicalPath();
        }
    }

    function resolveCoreModule(id, root) {
        var name = normalizeName(id);
        var classloader = java.lang.Thread.currentThread().getContextClassLoader();
        if (classloader.getResource(name)) {
            return {path: name, core: true};
        }
    }

    function normalizeName(fileName, ext) {
        var extension = ext || '.js';
        if (fileName.endsWith(extension)) {
            return fileName;
        }
        return fileName + extension;
    }

    function readFile(filename, core) {
        var input;
        try {
            if (core) {
                var classloader = java.lang.Thread.currentThread().getContextClassLoader();
                input = classloader.getResourceAsStream(filename);
            } else {
                input = new File(filename);
            }
            // TODO: I think this is not very efficient
            return new Scanner(input).useDelimiter('\\A').next();
        } catch (e) {
            throw new ModuleError('Cannot read file [' + input + ']: ', 'IO_ERROR', e);
        }
    }

    function ModuleError(message, code, cause) {
        this.code = code || 'UNDEFINED';
        this.message = message || 'Error loading module';
        this.cause = cause;
    }

    // Helper function until ECMAScript 6 is complete
    if (typeof String.prototype.endsWith !== 'function') {
        String.prototype.endsWith = function (suffix) {
            if (!suffix) return false;
            return this.indexOf(suffix, this.length - suffix.length) !== -1;
        };
    }

    ModuleError.prototype = new Error();
    ModuleError.prototype.constructor = ModuleError;
}());
