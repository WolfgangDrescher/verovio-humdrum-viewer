define("ace/theme/esac_dark",["require","exports","module","ace/lib/dom"],function(e,t,n) {
  t.isDark=true,
  t.cssClass="ace-esac-dark",
  t.cssText= `

.ace_start-line {
    background-color: green; /* Green background for start-line text */
}

.ace_inside-brackets {
    color: blue; /* Blue color for text inside brackets */
}

.ace_outside-brackets {
    color: black;
    font-weight: bold; /* Bold black for text outside brackets */
}

`;
  var r=e("../lib/dom");r.importCssString(t.cssText,t.cssClass)
})
