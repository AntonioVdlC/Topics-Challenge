/* -- SENTIMENTIZER -- */
/* ------------------- */
/*
 *  Returns a string defining the sentiment towards a topic depending on the topic.sentimentScore
 *	and the values of _positive and _negative.
 */

define(function (require) {

	//sentimentize
	/*
		@desc		Returns the sentiment depending on the sentimentScore and the values of _positive and _negative.
		@params		sentimentScore
						@desc	Sentiment score of a topic as retrieved from the data.
						@type	<int>
						@vals 	0 < sentimentScore
		@return 	'positive', 'negative' or 'neutral'
	*/
	function sentimentize (sentimentScore) {
		if(sentimentScore > _positive)
			return 'positive';
		else if(sentimentScore < _negative)
			return 'negative';
		else
			return 'neutral';
	}

	return sentimentize;
})