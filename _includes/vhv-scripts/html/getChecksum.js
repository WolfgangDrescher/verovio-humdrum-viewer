{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Tue Jul  2 21:02:53 CEST 2024
// Last Modified: Tue Jul  2 21:02:56 CEST 2024
// Filename:      _includes/vhv-scripts/html/getChecksum.js
// Included in:   _includes/vhv-scripts/html/main.js
// Syntax:        HTML; ECMAScript 6; Jekyll/Liquid
// vim:           ts=3:nowrap
//
// Description:   Get simple checksum for avoiding retypesetting SCORE files.
//
{% endcomment %}

function getChecksum(humdrum) {
	let sum = 0;
	for (let i=0; i<humdrum.length; i++) {
		sum += humdrum.charCodeAt(i);
	}
	return sum;
}



