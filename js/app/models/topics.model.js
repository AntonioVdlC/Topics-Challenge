/* -- TOPIC MODEL & COLLECTION -- */
/* ------------------------------ */
/*
 *  Declares the Topic Model and returns the Topics Collection.
 *	The data that is fed to the Collection comes from a JSON file (data/topics.json).
 */

/*
	Topic
		@desc		Model of a topic.
		@type		<Model>
		@struct		{
						'label':'Label',
							@desc	Word to show on the word cloud.
							@type	<string>
							@vals 	/

						'size':'size0',
							@desc	Name of the size the word will be using.
							@type	<string>
							@vals 	'size' + cluster_id (ex: 'size1', 'size4' ...)

						'volume': 3,
							@desc	Volume (or weight) of the topic.
							@type	<int>
							@vals 	0 < volume

						'sentiment': 'neutral',
							@desc	Sentiment about the topic. Depends on the sentimentScore and on the values of _positive and _negative.
							@type	<string>
							@vals 	'positive', 'neutral' or 'negative'

						'positive': 1,
							@desc	Number of positive entries for the topic.
							@type	<int>
							@vals 	0 < positive

						'neutral': 1,
							@desc	Number of neutral entries for the topic.
							@type	<int>
							@vals 	0 < neutral

						'negative': 1
							@desc	Number of negative entries for the topic.
							@type	<int>
							@vals 	0 < negative
					}
*/


define(function (require){

	var $				= require('jquery'),
		Backbone		= require('backbone'),
		
		Sentimentize 	= require('app/utils/sentimentizer'),
		Clusterize		= require('app/utils/clusterizer'),

		dataUrl = 'data/topics.json',

		Topic = Backbone.Model.extend({

			defaults:{
				'label': 'Label',
				'size': 'size0',
				'volume': 3,
				'sentiment': 'neutral',
				'positive': 1,
				'neutral': 1,
				'negative': 1
			}
		});
	
	return Backbone.Collection.extend({

		model: Topic,

		//retriveData
		/*	
			@desc		Retrieves the data from a JSON file.
			@params		/
			@return 	/
		*/
		retrieveData: function () {
			var $this = this;

			$.getJSON(dataUrl)
			.done(function (json) {
				$this.parseData(json);
			});
		},

		//Parse the retrieved data
		/*	
			@desc		Parses the retrieve data that will be fed to the view.
			@params		json
							@desc	JSON object retrieved from a JSON file.
							@type	<Object>
							@vals	/
			@return 	/
		*/
		parseData: function (json) {
			//Array to save the parsed data.
			var data = [];
			
			//Array to save the different volumes of the dataset for clusterization.
			var values = [];

			//Boolean to test if a topic.volume has been already saved in values[] (False), or not (True).
			var newValue = true;

			//Parsing data & saving values for clustering.
			$.each(json.topics, function (i, topic) {
				data.push({
					'label': topic.label,
					'size': '',
					'volume': topic.volume,
					'sentiment': Sentimentize(topic.sentimentScore),
					'positive': topic.sentiment.positive ? topic.sentiment.positive : 0,
					'neutral': topic.sentiment.neutral ? topic.sentiment.neutral : 0,
					'negative': topic.sentiment.negative ? topic.sentiment.negative : 0
				});

				newValue = true;

				for(var i=0; i< values.length; i++){
					if(values[i] == topic.volume){
						newValue = false;
						break;
					}
				}

				if(newValue) values.push(topic.volume);
			});

			//Array of clusters corresponding to each value in values[].
			var clusters = Clusterize(values);

			//Adding the clusters ('sizeX') to the parsed data.
			for(var i=0; i<values.length; i++){
				for(var j=0; j<data.length; j++){
					if(values[i] == data[j].volume){
						data[j].size = 'size' + clusters[i];
					}
				}
			}

			//Save the collection's data and trigger a rendering of the view.
			this.reset(data);
		}

	});
});