// from: http://stackoverflow.com/a/3454579/766850
function getXPath(element) {
	var xpath = '';
	for (; element && element.nodeType == 1; element = element.parentNode) {
		var id = $(element.parentNode).children(element.tagName).index(element) + 1;
		id > 1 ? (id = '[' + id + ']') : (id = '');
		xpath = '/' + element.tagName.toLowerCase() + id + xpath;
	}
	return xpath;
}

// almost from: http://stackoverflow.com/a/2880929/766850
function parseQueryString(query) {
	var match,
		pl     = /\+/g,  // Regex for replacing addition symbol with a space
		search = /([^&=]+)=?([^&]*)/g,
		decode = function (s) { return decodeURIComponent(s.replace(pl, ' ')); };

	var urlParams = {};
	while (match = search.exec(query))
		urlParams[decode(match[1])] = decode(match[2]);
	return urlParams;
}

var form = $('form');

form.on('submit', function () {
	debugger;
	var self = $(this);  // just being lazy
	var form_id = self.attr('id') ? self.attr('id') : getXPath(self[0]);
	var form_data = $(this).serialize();
	var data_id = window.location.href + '_' + form_id;
	console.log(form_data);
	localStorage[data_id] = form_data;
});

form.each(function() {
	debugger;
	var self = $(this);  // just being lazy
	var form_id = self.attr('id') ? self.attr('id') : getXPath(self[0]);
	var data_id = window.location.href + '_' + form_id;

	if(localStorage[data_id]) {
		var form_data = parseQueryString(localStorage[data_id]);
		for(var name in form_data) {
			if(!form_data.hasOwnProperty(name))
				continue;

			// do NOT fill hidden fields. because just don't okay?
			var form_element = self.find("[name='" + name + "']:visible");
			if(form_element.length) {
				// TODO: check form element type (radio, drop down etc.)
				form_element.val(form_data[name]);
			}
		}
	}
});