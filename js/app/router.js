/* -- BACKBONE ROUTER -- */
/* --------------------- */
/*
 *  Declares and returns a Backbone Router.
 *	
 */

define(function (require){

	var $ 				= require('jquery'),
		Backbone		= require('backbone'),
		TopicsView 		= require('app/views/topics.view');

	return Backbone.Router.extend({

		routes: {
			'' : 'topicsWordCloud'
		},

		topicsWordCloud: function (){
			topicsView = new TopicsView({el:$('#content')});
		}
	});
});