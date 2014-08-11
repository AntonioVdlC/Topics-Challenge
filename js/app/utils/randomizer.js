/* -- RANDOMIZER -- */
/* ---------------- */
/*
 *  Randomizes the positions of the words in the cloud so that the visual appearance is more appealing.
 *	
 */

//Implementation inspired on the jQCloud Plugin implementation by Luca Ongaro
/*!
 * jQCloud Plugin for jQuery
 *
 * Version 1.0.4
 *
 * Copyright 2011, Luca Ongaro
 * Licensed under the MIT license.
 *
 * Date: 2013-05-09 18:54:22 +0200
*/

define(function (require) {

	//randomize
	/*
		@desc		Randomize the position of the words in the cloud.
		@params		/
		@return		/
	*/
	function randomize () {
		
		//Word cloud DOM container.
		var container = $('#word-cloud');

		var step = 2.0;
		var ratio = container.width() / container.height();
		var already_placed_words = [];

		//Calculate and assign a new position to the word in the cloud for each word.
		$.each(container.children(), function (index) {
			var word = $('#'+index);

			//Utils variables.
			var angle = 6.28 * Math.random(),
	            radius = 0.0,
	            width = word.width(),
	            height = word.height(),
	            left = (container.width() / 2.0) - width / 2.0,
	            top = (container.height() / 2.0) - height / 2.0;

	        //Word's style.
	       	var word_style = word[0].style;

	        word_style.position = "absolute";
	        word_style.left = left + "px";
	        word_style.top = top + "px";

	        //Positionning of the word in spiral.
	      	while(overlapping(word, already_placed_words)){
	      		radius += step;
	            angle += (index % 2 === 0 ? 1 : -1)*step;

	            left = Math.abs((container.width() / 2.0) - (width / 2.0) + (radius*Math.cos(angle)) * ratio);
	            top = Math.abs((container.height() / 2.0) + radius*Math.sin(angle) - (height / 2.0)); 

				word_style.left = left + "px";
				word_style.top = top + "px";
	      	}

	      	//Word positionned, then added to the list of already placed words.
			already_placed_words.push(word);
		});
	}

	//overlapping
	/*
		@desc		Check if a word is overlapping with the already placed worlds.
		@params		word
						@desc	Object representing the word in the DOM.
						@type	<Object>
						@vals 	/
					other_elms
						@desc	Array of Objects representing already placed words in the DOM.
						@type	<Array>[<Object>]
						@vals 	/
		@return		true | false
	*/
	function overlapping (word, other_elems) {
		//For each other element already placed.
		for(var i=0; i<other_elems.length; i++){
			//If there is overlapping.
			if (Math.abs(2.0*word[0].offsetLeft + word[0].offsetWidth - 2.0*other_elems[i][0].offsetLeft - other_elems[i][0].offsetWidth) < word[0].offsetWidth + other_elems[i][0].offsetWidth) {
				if (Math.abs(2.0*word[0].offsetTop + word[0].offsetHeight - 2.0*other_elems[i][0].offsetTop - other_elems[i][0].offsetHeight) < word[0].offsetHeight + other_elems[i][0].offsetHeight) {
					return true;
				}
			}
		}	
		return false;
	}

	return randomize;
})