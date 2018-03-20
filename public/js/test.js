var events = (function(){
    var topics = {};
    var hOP = topics.hasOwnProperty;
  
    return {
        subscribe: function (topic, listener) {
            // Create the topic's object if not yet created
            if (!hOP.call(topics, topic)) topics[topic] = [];

            // Add the listener to queue
            var index = topics[topic].push(listener) - 1;

            // Provide handle back for removal of topic
            return {
                remove: function () {
                    delete topics[topic][index];
                }
            };
        },
        publish: function (topic, info) {
            // If the topic doesn't exist, or there's no listeners in queue, just leave
            if (!hOP.call(topics, topic)) return;

            // Cycle through topics queue, fire!
            topics[topic].forEach(function (item) {
                item(info != undefined ? info : {});
            });
        }
    };
})();


document.addEventListener('DOMContentLoaded', function () {
	console.log('DOM loaded');
	
	var subscription = events.subscribe('updated', function (obj) {
		console.log('UPDATED');
		console.log(obj.composedPath()[0]);
	});


	// el.dispatchEvent(new CustomEvent('build'));
	document.addEventListener('updatedfromcontainer', function (ev) {
		console.log('HEAR UPDATED FROM CONTAINER');
	  });

	  document.addEventListener('updatedfrominput', function (ev) {
		console.log('HEAR UPDATED FROM INPUT');
	  });


	  document.addEventListener('updatedfromsource', function (ev) {
		console.log('HEAR UPDATED FROM SOURCE');
		events.publish('updated', ev);
	  });

});


