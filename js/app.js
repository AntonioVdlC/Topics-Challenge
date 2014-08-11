/* -- APP CONFIGURATION -- */
/* ----------------------- */
/*
 *  Declares global configuration variables, Require configuration and starts the app!
 *
 */

var _positive = 60;
/*      @desc   Minimum value of the sentiment score for positive topics. Sentiment scores above _positive are conisdered positive topics.
        @type   <int>
        @vals   0 < _negative < _positive  
*/

var _negative = 40;
/*      @desc   Maximum value of the sentiment score for negtive topics. Sentiment scores below _negative are considered negative topics.
        @type   <int>
        @vals   0 < _negative < _positive
*/

var _k = 6;
/*      @desc   Number of different sizes for the words in the word cloud. Also, the number of clusters in the k-mean algorithm.
        @type   <int>
        @vals   0 < _k
*/


require.config({

    baseUrl: 'js/lib',

    paths: {
        app: '../app',
        tpl: '../../tpl'
    },

    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});


// Let's get this started!
require(['backbone', 'app/router'], function (Backbone, Router){
    var router = new Router();

    Backbone.history.start();
});