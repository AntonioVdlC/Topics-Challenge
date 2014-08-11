/* -- CLUSTERIZER -- */
/* ----------------- */
/*
 *  Returns an array of clusters order by increasing numbers assigned to each value of topic.volume
 *	using the k-means algorithm with _k being the number of clusters.
 *	This clusterization makes sure that there will always be _k different sizes in the cloud 
 *	(or less if there are less unique values of topic.volume).
 */

define(function (require) {
	
	var _continue;
	/*	@desc   Global variable that dictates the k-mean algorithm.
        @type   <bool>
        @vals   true | false  
	*/

	//clusterize
	/*
		@desc		Returns a number _k of clusters based on the different topic.volumes in values[].
		@params		data
						@desc	Values of the different topic.volume gathered in values[].
						@type	<Array>[<int>]
						@vals 	/
		@return 	clusters
						@desc	Sorted clusters for each value.
						@type	<Array>[<int>]
						@vals 	/
								ex: [0,0,0,1,2,2,3]
	*/
	function clusterize (data) {

		//If the number of unique values is smaller or equal to the number of clusters, nothing to do!
		if(data.length <= _k){
			var clusters = [];

			for(var i=0; i<data.length; i++)
				clusters.push(i);

			return clusters;
		}

		//Else, here we go for the k-means algorithm!
		var min = Math.min.apply(Math, data);
		var max = Math.max.apply(Math, data);

		data.sort(function(a, b){return a-b});

		//Initialize means, make first assignments and start the k-means algorithm.
		var means = initMeans(min, max);
		var assign = makeAssignments(data, means);
		
		do {
			means = calcNewMeans(min, max, means, assign, data); 
			assign = makeAssignments(data, means); 
		} while(_continue);

		//Sort the cluster to display data by increasing order of volume.
		var clusters = sortClusters(assign); 

		return clusters;
	}

	//initMeans
	/*	
		@desc 		Randomly initialize _k points in the range of the dataset.
		@params		min
						@desc	Minimum value of the dataset.
						@type	<int>
						@vals 	0 < min <= max
					max
						@desc	Maximum value of the dataset.
						@type	<int>
						@vals 	0 < min <= max
		@return 	means
						@desc	List of the means.
						@type 	<Array> [<float>]
						@vals 	/
	*/
	function initMeans (min, max) {

		var range = max - min;

		var means = [];

		//Create random means in the range of the data set.
		for(var i=0; i<_k; i++){
			means.push(min + (Math.random() * range));
		}

		return means;
	}

	//makeAssignments
	/*
		@desc		Assign means to each point of the dataset.
		@params		data
						@desc	Values of the different topic.volume gathered in values[].
						@type	<Array>[<int>]
						@vals 	/ 
					means
						@desc	List of the means.
						@type 	<Array> [<float>]
						@vals 	/
		@return 	assign
						@desc	List of the assignments.
						@type 	<Array> [<int>]
						@vals 	/ 
	*/
	function makeAssignments (data, means) {
		
		var assign = [];

		// For each point of the dataset.
		for(var i=0; i<data.length;i++){
			var distances = [];

			//Calculate the Euclidian distance to each mean.
			for(var j=0; j<_k; j++){
				distances.push(Math.abs(data[i]-means[j]));
			}

			//Select the closet mean to the point.
			assign[i] = distances.indexOf(Math.min.apply(Math, distances));
		}

		return assign;
	}

	//calcNewMeans
	/*
		@desc		Calculate the new means using the k-means algorithm.
		@params		min
						@desc	Minimum value of the dataset.
						@type	<int>
						@vals 	0 < min <= max
					max
						@desc	Maximum value of the dataset.
						@type	<int>
						@vals 	0 < min <= max
					means
						@desc	List of the means.
						@type 	<Array> [<float>]
						@vals 	/
					assign
						@desc	List of the assignments.
						@type 	<Array> [<int>]
						@vals 	/
					data
						@desc	Values of the different topic.volume gathered in values[].
						@type	<Array>[<int>]
						@vals 	/ 

		@return 	means
						@desc	List of the new means.
						@type 	<Array> [<float>]
						@vals 	/
	*/
	function calcNewMeans (min, max, means, assign, data) {

		_continue = false;
		
		for(var i=0; i<_k; i++){
			//If the means is not assigned, create a new random mean.
			if($.inArray(i, assign) == -1){
				means[i] = min + (Math.random() * (max - min));

				//A mean has moved, so continue the algorithm.
				_continue = true;
			}

			//If the mean is assigned,
			else{ 
				//Retrieve the value of all the points of that cluster.
				var points = [];

				for(var j=0; j<data.length; j++){
					if(assign[j] == i){
						points.push(data[j]);
					}
				}

				//Calculate the mean of the points in the cluster.
				var sum = 0;

				for(var j=0; j<points.length; j++){
					sum += points[j];
				}

				var newMean = sum / points.length;

				//If the new mean is different,
				if(newMean != means[i]){ 
					//Move the mean to the newly calculated mean.
					means[i] = newMean;

					//A mean has moved, so continue the algorithm.
					_continue = true;
				}
			}  
		}

		return means;
	}

	//sortClusters
	/*
		@desc		Sorts the cluster to display data by increasing order of volume.
		@params		assign
						@desc	List of the assignments.
						@type 	<Array> [<int>]
						@vals 	/
								ex: [1,1,1,3,0,0,2]
		@return 	sortedClusters
						@desc	Ordered list of the clusters/assignments.
						@type 	<Array> [<int>]
						@vals 	/
								ex: [0,0,0,1,2,2,3]
	*/
	function sortClusters (assign) {
		var sortedClusters = [];
		var j, k = 0;

		for(var i=0; i<assign.length; i++){
			j = i;

			while(assign[j] == assign[i]){
				sortedClusters[j] = k;
				j++
			}

			i = j - 1;
			k ++;
		}

		return sortedClusters;
	}

	return clusterize;
});