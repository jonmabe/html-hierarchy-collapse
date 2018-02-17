var HIERARCHY_FILE = 'hierarchy.txt';

$(document).ready(function() {
	var h = $('#hierarchy');
	var u =  $('<div class="ul collapsibleList"></div>').appendTo(h);
	var r_text = /([\. ]*)(.+)/;
	var r_depth = /\./g;
	$.get(HIERARCHY_FILE, function(text) {
		var lines = text.split("\n");
		var depth = 0;
		var parent = u;
		var last_item = null;
		for (var i = 0, len = lines.length; i < len; i++) {
			var m = lines[i].match(r_text);
			var m_next = lines.length > i+2 ? lines[i+1].match(r_text) : null;
			var item_depth = 0;
			var next_item_depth = null;
			var label = m === null || m.length < 3 ? "ERROR" : m[2];
			var p = null;

			if (m) {
				var d = m[1].match(r_depth);
				item_depth = d === null ? 0 : d.length;
			}
			if (m_next) {
				var d = m_next[1].match(r_depth);
				next_item_depth = d === null ? 0 : d.length;
			}

			if(item_depth > depth){
				p = $('<div class="ul shelf-depth-'+ item_depth +'"></div>').appendTo(last_item);
			} else if(item_depth < depth){
				p = parent;
				for(var j = 0, jlen = depth - item_depth; j < jlen; j++){
					p = p.parent().closest('div.ul');
				}
			} else {
				p = parent;
			}

			if(label != "ERROR"){
				var a = null;

				if(next_item_depth > item_depth){
					a = $('<details><summary class="item-depth-'+ item_depth +'">'+ label + '</summary></details>').appendTo(p);
				} else {
					a = $('<div class="item-depth-'+ item_depth +'">'+ label + '</div>').appendTo(p);
				}
				last_item = a;
			} else {
			}
			depth = item_depth;
			parent = p;
		}
	}, 'text');
});


function getItemDepth(line){
		var m = line.match(r_text);

		if (m) {
			var d = m[1].match(r_depth);
			item_depth = d === null ? 0 : d.length;
		}
}
