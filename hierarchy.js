var HIERARCHY_FILE = 'hierarchy.txt';

$(document).ready(function() {
	var h = $('#hierarchy');
	var u =  $('<ul class="collapsibleList"></ul>').appendTo(h);
	var r_text = /([\. ]*)(.+)/;
	var r_depth = /\./g;
	$.get(HIERARCHY_FILE, function(text) {
		var lines = text.split("\n");
		var depth = 0;
		var parent = u;
		for (var i = 0, len = lines.length; i < len; i++) {
			var m = lines[i].match(r_text);
			var item_depth = 0
			var label = m === null || m.length < 3 ? "ERROR" : m[2];
			var p = null;
			//console.log(depth, item_depth);
			//console.log(t);

			if (m) {
				var d = m[1].match(r_depth);
				item_depth = d === null ? 0 : d.length;
			}

			if(item_depth > depth){
				//console.log("up", item_depth);
				p = $('<ul class="depth-'+ item_depth +'"></ul>').appendTo(parent);
			} else if(item_depth < depth){
				//console.log("down", depth - item_depth);
				p = parent;
				for(var j = 0, jlen = depth - item_depth; j < jlen; j++){
					p = p.parent();
					//console.log("down");
				}
			} else {
				p = parent;
			}
			//console.log("a", p, parent);
			if(label != "ERROR")
				p.append('<li class="depth-'+ item_depth +'">'+ label + '</li>');

			depth = item_depth;
			parent = p;
		}

		CollapsibleLists.applyTo(u.get(0));
	}, 'text');
});
