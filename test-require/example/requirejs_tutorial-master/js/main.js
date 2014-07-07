require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'vendor/jquery-1.10.2.min',
    }
});

requirejs(['jquery', "helper/utils"], function($, Util) {
    console.log(Util.hello);
    console.log($);
});