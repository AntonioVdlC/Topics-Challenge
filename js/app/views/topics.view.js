/* -- TOPIC VIEW -- */
/* ---------------- */
/*
 *  Declares and returns the Topic View.
 *	
 */

define(function (require) {
	
	var $			= require('jquery'),
		_			= require('underscore'),
		Backbone	= require('backbone'),

		Topics		= require('app/models/topics.model'),
		tpl			= require('text!tpl/topics.html'),

		Randomize	= require('app/utils/randomizer'),

		template	= _.template(tpl);

	return Backbone.View.extend({

		initialize: function () {
			this.collection = new Topics();
			this.listenTo(this.collection, 'all', this.render);

			this.collection.retrieveData();
		},

		render: function () {
			this.$el.html(template({topics: this.collection.toJSON()}));
			
			//Randomizing the position of the words in the cloud.
			Randomize();
		},

		events: {
			'click .topic': 'showMetadata'
		},

		//showMetadata
		/*
			@desc		Shows the metadata information about a topic when clicked.
			@params		e
							@desc	Click event Object
							@type	<Object>
							@vals 	/
			@return		/
		*/
		showMetadata: function (e) {
			var id = e.currentTarget.id;
			var data = this.collection.toJSON();

			// Show the info div.
			$('#topic-info').css('visibility', 'visible');

			//Remove the information text.
			$('#info-text').remove();

			//Change selected topic.
			$('.selected').removeClass('selected');
			$('#'+id).addClass('selected');

			// Write new metadata.
			$('#topic-name').html(data[id].label);
			$('#total-mentions').html(data[id].volume);
			$('#positive-mentions').html(data[id].positive);
			$('#neutral-mentions').html(data[id].neutral);
			$('#negative-mentions').html(data[id].negative);
		}
	});
});