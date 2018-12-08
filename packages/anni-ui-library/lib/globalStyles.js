import { createGlobalStyle } from 'styled-components';

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

var ApercuRegular = "9562ee1d0a4a2c55.woff";

var ApercuMedium = "419ff062aa15c8b9.woff";

var ApercuBold = "5c6a347498b78726.woff";

var ApercuMono = "cc169c1e632174fb.woff";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  @font-face {\n    font-family: 'Apercu';\n    src: url(", ");\n    font-weight: normal;\n  }\n  @font-face {\n    font-family: 'Apercu Medium';\n    src: url(", ");\n    font-weight: 600;\n  }\n  @font-face {\n    font-family: 'Apercu Bold';\n    src: url(", ");\n    font-weight: 800;\n  }\n  @font-face {\n    font-family: 'Apercu Mono';\n    src: url(", ");\n  }\n\n  html {\n    -webkit-font-smoothing: antialiased;\n  }\n\n  body {\n    color: ", ";\n    background-color: ", ";\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var GlobalStyles = createGlobalStyle(_templateObject(), ApercuRegular, ApercuMedium, ApercuBold, ApercuMono, function (props) {
  return props.theme.textColor;
}, function (props) {
  return props.theme.bgA;
});

export { GlobalStyles };
