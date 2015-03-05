define('ace/mode/netlogo', function(require, exports, module) {

  // Folding, indenting, and finding matching parents/braces can be implemented later --JAB (4/17/13)
  var oop = require("ace/lib/oop");
  var TextMode = require("ace/mode/text").Mode;
  var Tokenizer = require("ace/tokenizer").Tokenizer;
  var NetLogoHighlightRules = require("ace/mode/netlogo_highlight_rules").NetLogoHighlightRules

  var Mode = function() {
    this.$tokenizer = new Tokenizer(new NetLogoHighlightRules().getRules());
  };

  oop.inherits(Mode, TextMode);

  (function() {
    // extra logic goes here
  }).call(Mode.prototype);

  exports.Mode = Mode;

});

define('ace/mode/netlogo_highlight_rules', function(require, exports, module) {

  var oop = require("ace/lib/oop");
  var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;

  var NetLogoHighlightRules = function() {

    var keywords =
      "globals|breed|turtles-own|patches-own|links-own|to|to-report|" +
      "end|extensions|__includes|directed-link-breed|undirected-link-breed";

    var builtInConstants =
      "false|true|nobody|e|pi|grey|gray|red|orange|brown|yellow|green|lime|" +
      "turquoise|cyan|sky|blue|violet|magenta|pink|black|white";

    // Taken from NetLogo's 'tokens.txt'.  It would be a good idea to ask the server for
    // this each time...?  This will likely get gross to maintain as NetLogo's primitive
    // listing changes....  Same for `reporters` below. --JAB (4/16/13)
    var commands =
      "__bench|__change-topology|__clear-all-and-reset-ticks|__delete-log-files|" +
         "__done|__edit|__experimentstepend|__export-drawing|__fire|__foreverbuttonend|" +
         "__git|__hubnet-broadcast-user-message|__hubnet-create-client|" +
         "__hubnet-robo-client|__hubnet-send-from-local-client|__hubnet-send-user-message|" +
         "__hubnet-set-view-mirroring|__hubnet-wait-for-clients|__hubnet-wait-for-messages|" +
         "__ignore|__let|__life|__linkcode|__make-preview|__mkdir|__observercode|__patchcode|" +
         "__plot-pen-hide|__plot-pen-show|__pwd|__reload-extensions|__set-line-thickness|" +
         "__stderr|__stdout|__thunk-did-finish|__turtlecode|__updatemonitor|__zip-log-files|" +
         "ask|ask-concurrent|auto-plot-off|auto-plot-on|back|beep|bk|ca|carefully|cd|" +
         "clear-all|clear-all-plots|clear-drawing|clear-globals|clear-links|clear-output|" +
         "clear-patches|clear-plot|clear-ticks|clear-turtles|cp|create-link-from|" +
         "create-link-to|create-link-with|create-links-from|create-links-to|" +
         "create-links-with|create-ordered-turtles|create-temporary-plot-pen|create-turtles|" +
         "cro|crt|ct|die|diffuse|diffuse4|display|downhill|downhill4|error|every|" +
         "export-all-plots|export-interface|export-output|export-plot|export-view|" +
         "export-world|face|face-nowrap|facexy|facexy-nowrap|fd|file-close|file-close-all|" +
         "file-delete|file-flush|file-open|file-print|file-show|file-type|file-write|follow|" +
         "follow-me|foreach|forward|hatch|hide-link|hide-turtle|histogram|histogram-from|" +
         "home|ht|hubnet-broadcast|hubnet-broadcast-clear-output|hubnet-broadcast-message|" +
         "hubnet-clear-override|hubnet-clear-overrides|hubnet-fetch-message|" +
         "hubnet-kick-all-clients|hubnet-kick-client|hubnet-reset|hubnet-reset-perspective|" +
         "hubnet-send|hubnet-send-clear-output|hubnet-send-follow|hubnet-send-message|" +
         "hubnet-send-override|hubnet-send-watch|hubnet-set-client-interface|if|if-else|" +
         "ifelse|import-drawing|import-pcolors|import-pcolors-rgb|import-world|inspect|jump|" +
         "layout-circle|layout-radial|layout-spring|layout-tutte|left|let|loop|lt|move-to|" +
         "movie-cancel|movie-close|movie-grab-interface|movie-grab-view|movie-set-frame-rate|" +
         "movie-start|no-display|output-print|output-show|output-type|output-write|pd|pe|" +
         "pen-down|pen-erase|pen-up|pendown|penup|plot|plot-pen-down|plot-pen-reset|" +
         "plot-pen-up|plotxy|print|pu|random-seed|repeat|report|reset-perspective|" +
         "reset-ticks|reset-timer|resize-world|ride|ride-me|right|rp|rt|run|set|" +
         "set-current-directory|set-current-plot|set-current-plot-pen|set-default-shape|" +
         "set-histogram-num-bars|set-patch-size|set-plot-pen-color|set-plot-pen-interval|" +
         "set-plot-pen-mode|set-plot-x-range|set-plot-y-range|setup-plots|setxy|show|" +
         "show-link|show-turtle|sprout|st|stamp|stamp-erase|stop|tick|tick-advance|tie|" +
         "type|untie|update-plots|uphill|uphill4|user-message|wait|watch|watch-me|while|" +
         "with-local-randomness|without-interruption|write";

    var reporters =
      "!=|*|+|-|/|<|<=|=|>|>=|^|__boom|__check-syntax|__dump|__dump-extension-prims|" +
         "__dump-extensions|__dump1|__hubnet-in-q-size|__hubnet-out-q-size|__nano-time|" +
         "__patchcol|__patchrow|__processors|__random-state|__stack-trace|__to-string|abs|" +
         "acos|all?|and|any?|approximate-hsb|approximate-rgb|asin|at-points|atan|autoplot?|" +
         "base-colors|behaviorspace-run-number|bf|bl|both-ends|but-first|but-last|butfirst|" +
         "butlast|can-move?|ceiling|cos|count|date-and-time|distance|distance-nowrap|" +
         "distancexy|distancexy-nowrap|dx|dy|empty?|end1|end2|error-message|exp|extract-hsb|" +
         "extract-rgb|file-at-end?|file-exists?|file-read|file-read-characters|" +
         "file-read-line|filter|first|floor|fput|hsb|hubnet-clients-list|" +
         "hubnet-enter-message?|hubnet-exit-message?|hubnet-message|hubnet-message-source|" +
         "hubnet-message-tag|hubnet-message-waiting?|ifelse-value|in-cone|in-cone-nowrap|" +
         "in-link-from|in-link-neighbor?|in-link-neighbors|in-radius|in-radius-nowrap|int|" +
         "is-agent?|is-agentset?|is-boolean?|is-command-task?|is-directed-link?|" +
         "is-link-set?|is-link?|is-list?|is-number?|is-patch-set?|is-patch?|" +
         "is-reporter-task?|is-string?|is-turtle-set?|is-turtle?|is-undirected-link?|item|" +
         "last|length|link|link-heading|link-length|link-neighbor?|link-neighbors|" +
         "link-set|link-shapes|link-with|links|list|ln|log|lput|map|max|max-n-of|" +
         "max-one-of|max-pxcor|max-pycor|mean|median|member?|min|min-n-of|min-one-of|" +
         "min-pxcor|min-pycor|mod|modes|mouse-down?|mouse-inside?|mouse-xcor|mouse-ycor|" +
         "movie-status|my-in-links|my-links|my-out-links|myself|n-of|n-values|neighbors|" +
         "neighbors4|netlogo-applet?|netlogo-version|new-seed|no-links|no-patches|" +
         "no-turtles|not|of|one-of|or|other|other-end|out-link-neighbor?|" +
         "out-link-neighbors|out-link-to|patch|patch-ahead|patch-at|" +
         "patch-at-heading-and-distance|patch-here|patch-left-and-ahead|" +
         "patch-right-and-ahead|patch-set|patch-size|patches|plot-name|plot-pen-exists?|" +
         "plot-x-max|plot-x-min|plot-y-max|plot-y-min|position|precision|random|" +
         "random-exponential|random-float|random-gamma|random-normal|" +
         "random-or-random-float|random-poisson|random-pxcor|random-pycor|random-xcor|" +
         "random-ycor|read-from-string|reduce|remainder|remove|remove-duplicates|" +
         "remove-item|replace-item|reverse|rgb|round|run-result|runresult|scale-color|" +
         "se|self|sentence|shade-of?|shapes|shuffle|sin|sort|sort-by|sort-on|sqrt|" +
         "standard-deviation|subject|sublist|substring|subtract-headings|sum|tan|task|" +
         "ticks|timer|towards|towards-nowrap|towardsxy|towardsxy-nowrap|turtle|" +
         "turtle-set|turtles|turtles-at|turtles-here|turtles-on|user-directory|" +
         "user-file|user-input|user-new-file|user-one-of|user-yes-or-no?|value-from|" +
         "values-from|variance|with|with-max|with-min|word|world-height|world-width|" +
         "wrap-color|xor";

    var keywordMapper = this.createKeywordMapper({
      "keyword": keywords,
      "constant.language": builtInConstants,
      "command": commands,
      "reporter": reporters
    }, "identifier");

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    var StringText     = '(?:\\\\"|\\r|\\n|\\t|\\\\|\\[^"]|[^\\r\\n"\\\\])*';
    var Letter         = "[a-zA-Z]";
    var IdentifierChar = "(?:" + Letter + "|\\d|[_\\.?=\\*!<>:#+/%$^'&-])";

    this.$rules = {
      "start": [
        {
          token: "start_literal",
          regex: "\\{\\{",
          next: "literal"
        }, {
          token: "comma",
          regex: ","
        }, {
          token: "open_brace",
          regex: "\\{"
        }, {
          token: "close_brace",
          regex: "\\}"
        }, {
          token: "open_bracket",
          regex: "\\["
        }, {
          token: "close_bracket",
          regex: "\\]"
        }, {
          token: "open_paren",
          regex: "\\("
        }, {
          token: "close_paren",
          regex: "\\)"
        }, {
          token: "whitespace",
          regex: "[\\s\\b]+"
        }, {
          token: "comment",
          regex: ";.*"
        }, {
          token: "constant", // Currently lacks checks for badness in constant values (does it need to?)
          regex: "-?\\.?\\d" + IdentifierChar + "*"
        }, {
          token: keywordMapper,
          regex: IdentifierChar + "+"
        }, {
          token: "string",
          regex: "\"" + StringText + "\""
        }, {
          token: "bad",
          regex: "\"" + StringText
        }
      ],
      "literal": [
        {
          token: "close_literal",
          regex: "\\}\\}",
          next: "start" // This is currently incorrect!  Sometimes, literals are nested
        }, {
          token: "open_literal",
          regex: "\\{\\{",
          next: "literal"
        }, {
          token: "literal",
          regex: ".",
          next: "literal"
        }, {
          token: "bad",
          regex: "[\\r\\n]|$"
        }
      ],
      "bad": [
        {
          token: "bad",
          regex: "."
        }
      ]
    };

  };

  oop.inherits(NetLogoHighlightRules, TextHighlightRules);
  exports.NetLogoHighlightRules = NetLogoHighlightRules;

});
