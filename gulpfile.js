const gulp = require("gulp");
const spawn = require('child_process').spawn;
const nodemon = require("gulp-nodemon");



const stylusCompiler = {
    watch: (desk) => {
        require("./compile-stylus").createCompiler(desk).watch();
    },
    compile: (desk) => {
        return Promise.all([
            require("./compile-stylus").createCompiler(desk).compile(),
        ]);
    }
};

const startServer = () => {
    nodemon({
        script: './server/server.js',
        ext: 'js, graphql',
        ignore: [
            ".idea/",
            ".git/",
            "gulpfile.js",
            "client/",
            "public/",
            "node_modules/"
        ],
        env: {'NODE_ENV': 'development'},
        stdout: true,
        exec: "babel-node"
    })
};

gulp.task("dev", () => {
    startServer();
    stylusCompiler.watch("./public/bundle");
    if (!/^win/.test(process.platform)) { // linux
        spawn("webpack", ["--watch"], {stdio: "inherit"});
    } else {
        spawn('cmd', ['/s', "/c", "webpack", "--w"], {stdio: "inherit"});
    }
});

