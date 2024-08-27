/* ***** BEGIN LICENSE BLOCK *****
* Distributed under the BSD license:
*
* Copyright (c) 2010, Ajax.org B.V.
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*     * Redistributions of source code must retain the above copyright
*       notice, this list of conditions and the following disclaimer.
*     * Redistributions in binary form must reproduce the above copyright
*       notice, this list of conditions and the following disclaimer in the
*       documentation and/or other materials provided with the distribution.
*     * Neither the name of Ajax.org B.V. nor the
*       names of its contributors may be used to endorse or promote products
*       derived from this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
* ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
* DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
* ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
* SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*
* ***** END LICENSE BLOCK ***** */


// Reference: https://cloud9-sdk.readme.io/docs/highlighting-rules


//
// syntax match Data           "^[^!\*]"            contains=BadTabbing,Chord
// syntax match Chord          "[^\t][^\t]* [^\t]*" contains=ExtraSpace
// syntax match ExtraSpace     "^ "
// syntax match ExtraSpace     " $"
// syntax match ExtraSpace     "  *\t"
// syntax match ExtraSpace     "\t  *"
// syntax match ExtraSpace     "   *"
// syntax match BadTabbing     "\t\t\t*"
// syntax match BadTabbing     "^\t"
// syntax match BadTabbing     "\t$"
// syntax match GlobalComment  "^!![^!].*$"
// syntax match BibRecord      "^!!![^ ].*:.*$"
// syntax match Interpretation "^\*.*$"             contains=BadTabbing,Exclusive
// syntax match Measure        "^=[^\t]*[\t]?"      contains=BadTabbing
// syntax match Measure        "=[^\t]*[\t]"        contains=BadTabbing
// syntax match Measure        "=[^\t]*$"           contains=BadTabbing
// syntax match LocalComment   "^![^!].*$"          contains=BadTabbing
// syntax match Exclusive      "\*\*[^\t]*"

// Reference:
// https://github.com/ajaxorg/ace/wiki/Creating-or-Extending-an-Edit-Mode

define("ace/mode/esac_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
	"use strict";

	var oop = require("../lib/oop");
	var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

	var EsacHighlightRules = function() {


		this.$rules = {
            "start": [
                {
                    // Match parameter keywords followed by '[' in blue (parameter)
                    token: "parameter-text",
                    regex: /^(CUT|REG|TRD|FKT|SIG|KEY|MEL|BEM)\[/,
                    next: "bracket-text-parameter"
                },
                {
                    // Match analysis keywords followed by '[' in orange (analysis)
                    token: "analysis-text",
                    regex: /^(MEL_SEM|MEL_RAW|NO_REP|RTM|SCL_DEG|SCL_SEM|PHR_NO|PHR_BARS|PHR_CAD|ACC)\[/,
                    next: "bracket-text-analysis"
                },
                {
                    // Match any other keywords followed by '[' in red (unknown)
                    token: "unknown-text",
                    regex: /^[^\[\s]+\[/,
                    next: "bracket-text-unknown"
                },
                {
                    // Match lines without any brackets to be labeled as start-line
                    token: "start-line",
                    regex: /^[^\[\]]+$/,
                    next: "start"
                },
                {
                    // Match empty lines (for highlighting as trailing space in red)
                    token: "trailing-space",
                    regex: /^\s*$/,
                    next: "start"
                }
            ],
            "bracket-text-parameter": [
                {
                    // Inside brackets, keep text black until closing bracket
                    token: "black-text",
                    regex: /[^\]]+/,
                },
                {
                    // Match closing bracket in blue (parameter) and go back to start
                    token: "parameter-bracket",
                    regex: /\]/,
                    next: "start"
                },
                {
                    // Newline without closing bracket, stay in the same state
                    token: "text",
                    regex: /$/,
                    next: "bracket-text-parameter"
                }
            ],
            "bracket-text-analysis": [
                {
                    // Inside brackets, keep text black until closing bracket
                    token: "black-text",
                    regex: /[^\]]+/,
                },
                {
                    // Match closing bracket in orange (analysis) and go back to start
                    token: "analysis-bracket",
                    regex: /\]/,
                    next: "start"
                },
                {
                    // Newline without closing bracket, stay in the same state
                    token: "text",
                    regex: /$/,
                    next: "bracket-text-analysis"
                }
            ],
            "bracket-text-unknown": [
                {
                    // Inside brackets, keep text black until closing bracket
                    token: "black-text",
                    regex: /[^\]]+/,
                },
                {
                    // Match closing bracket in red (unknown) and go back to start
                    token: "unknown-bracket",
                    regex: /\]/,
                    next: "start"
                },
                {
                    // Newline without closing bracket, stay in the same state
                    token: "text",
                    regex: /$/,
                    next: "bracket-text-unknown"
                }
            ]
        };


        this.normalizeRules();
    };


	oop.inherits(EsacHighlightRules, TextHighlightRules);
	exports.EsacHighlightRules = EsacHighlightRules;

});



define("ace/mode/esac",["require","exports","module","ace/lib/oop","ace/mode/text"], function(require, exports, module) {
	"use strict";

	var oop = require("../lib/oop");
	var TextMode = require("./text").Mode;
	var EsacHighlightRules = require("./esac_highlight_rules").EsacHighlightRules;

	var UIWorkerClient = require("ace/worker/worker_client").UIWorkerClient;

	var Mode = function() {
		this.HighlightRules = EsacHighlightRules;
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);

	(function() {
		this.type = "text";
		this.$id = "ace/mode/esac";

		this.createWorker = function(session) {
			var worker = new UIWorkerClient(["ace"], "ace/mode/esac_worker", "EsacWorker");

			worker.attachToDocument(session.getDocument());

			worker.on("annotate", function(results) {
				session.setAnnotations(results.data);
			});

			worker.on("terminate", function() {
				session.clearAnnotations();
			});

			return worker;
		};
	}).call(Mode.prototype);

	exports.Mode = Mode;
});



