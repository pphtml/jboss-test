var global = this;
var window = this;
var process = {env:{},
    cwd: () => java.nio.file.Paths.get(".").toAbsolutePath().normalize().toString()
};

var console = {};
console.debug = print;
console.info = print;
console.log = print;
console.warn = print;
console.error = print;

