define("ace/theme/esac_light",["require","exports","module","ace/lib/dom"],function(e,t,n) {
  t.isDark=false,
  t.cssClass="ace-esac-light",
  t.cssText= `

.ace-esac-light .ace_gutter {background: #fbf1d3;color: #9191cf}
.ace-esac-light .ace_print-margin {width: 1px;background: #e8e8e8}
.ace-esac-light {background-color: #FDF6E3;color: black}

.ace-esac-light .ace_cursor.focused {color: #d30102 !important}
.ace-esac-light .ace_cursor.blurred {color: goldenrod !important}

.ace-esac-light .ace_marker-layer .ace_selection {background: rgba(7, 54, 67, 0.09)}
.ace-esac-light.ace_multiselect .ace_selection.ace_start {box-shadow: 0 0 3px 0px #FDF6E3;}

.ace_start-line {
	display: block;  /* Ensure the element is treated as a block to take full width */
	width: 100%;     /* Extend the background across the entire line */
	background-color: peru;
	color: navajowhite;
}


/* Blue color for specific text and brackets */
.ace_parameter-text,
.ace_parameter-bracket {
    color: blue;
}

/* Orange color for specific text and brackets */
.ace_analysis-text,
.ace_analysis-bracket {
    color: purple;
}

/* Red color for other text and brackets */
.ace_unknown-text,
.ace_unknown-bracket {
    color: red;
}

/* Black color for text inside brackets */
.ace_black-text {
    color: black;
}

/* Red color for trailing spaces and tabs */
.ace_trailing-space {
    background-color: red; /* Adjust to highlight trailing whitespace */
}

/* Red color for trailing spaces and tabs */
.ace_leading-space {
    background-color: red; /* Adjust to highlight trailing whitespace */
}

/* Gray color for gutter (line numbers) */
.ace_gutter-cell {
    color: gray; /* Set the gutter numbers to gray */
}




`;
  var r=e("../lib/dom");r.importCssString(t.cssText,t.cssClass)
})
