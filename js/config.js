requirejs.config({
    // 默认路径 js/lib
    baseUrl: 'js/lib',
    paths: {
        "app1": "../app",
        "jquery": "./jquery-1.11.2.min",
        "bi_base": "./bi_base"
    }
});
// 入口文件
requirejs(["app1/main"]);
