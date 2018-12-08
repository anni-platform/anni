import styled, { css } from 'styled-components';

var utils = {
  margin: function margin() {
    return css(["margin-top:", ";margin-right:", ";margin-bottom:", ";margin-left:", ";"], function (_ref) {
      var mt = _ref.mt;
      return mt ? "".concat(mt, "px") : '0';
    }, function (_ref2) {
      var mr = _ref2.mr;
      return mr ? "".concat(mr, "px") : '0';
    }, function (_ref3) {
      var mb = _ref3.mb;
      return mb ? "".concat(mb, "px") : '0';
    }, function (_ref4) {
      var ml = _ref4.ml;
      return ml ? "".concat(ml, "px") : '0';
    });
  },
  padding: function padding() {
    return css(["padding-top:", ";padding-right:", ";padding-bottom:", ";padding-left:", ";"], function (_ref5) {
      var pt = _ref5.pt;
      return pt ? "".concat(pt, "px") : '0';
    }, function (_ref6) {
      var pr = _ref6.pr;
      return pr ? "".concat(pr, "px") : '0';
    }, function (_ref7) {
      var pb = _ref7.pb;
      return pb ? "".concat(pb, "px") : '0';
    }, function (_ref8) {
      var pl = _ref8.pl;
      return pl ? "".concat(pl, "px") : '0';
    });
  }
};

/*
 * Colors
 */
var EASE_OUT_EXPO = 'cubic-bezier(0.19, 1, 0.22, 1)';

var Button = styled.button.withConfig({
  displayName: "Button",
  componentId: "r5ecib-0"
})(["align-items:center;backface-visibility:hidden;background:", ";border:", ";border:", ";border-radius:80px;color:", ";cursor:pointer;display:inline-flex;flex-direction:", ";font-family:'Apercu Bold',sans-serif;font-size:", ";justify-content:center;letter-spacing:1px;line-height:1;outline:none;padding:", ";text-decoration:none;text-transform:uppercase;transition:400ms ", ";z-index:2;", ";&:active{transform:scale(0.998);}&:focus,&:hover{transform:scale(1.02);&:disabled,&[disabled]{cursor:default;transform:scale(1);}}svg{", ";fill:", ";height:", ";margin-right:", ";margin-bottom:", ";stroke:", ";stroke:", ";stroke-width:", ";stroke-width:", ";transition:400ms ", ";width:", ";}"], function (props) {
  return !props.primary || props.link ? 'none' : "".concat(props.theme.colorPrimary);
}, function (props) {
  return props.noBorder || props.link ? 'none' : "2px solid ".concat(props.theme.colorPrimary);
}, function (props) {
  return props.stacked && 'none';
}, function (props) {
  return props.theme.textPrimary;
}, function (props) {
  return props.stacked && 'column';
}, function (props) {
  return props.stacked ? '12px' : '13px';
}, function (props) {
  return props.full ? '0' : '12px 24px';
}, EASE_OUT_EXPO, utils.margin, utils.padding, function (props) {
  return props.fill ? props.theme.textPrimary : 'transparent';
}, function (props) {
  return props.iconSize ? "".concat(props.iconSize, "px") : '18px';
}, function (props) {
  return props.stacked ? '0' : '6px';
}, function (props) {
  return props.stacked ? '6px' : '0';
}, function (props) {
  return props.fill ? 'transparent' : "".concat(props.theme.textPrimary);
}, function (props) {
  return props.stacked && "".concat(props.theme.textPrimary);
}, function (props) {
  return props.strokeWidth ? "".concat(props.strokeWidth, "px") : '6px';
}, function (props) {
  return props.fill && '6px';
}, EASE_OUT_EXPO, function (props) {
  return props.iconSize ? "".concat(props.iconSize, "px") : '18px';
});

export { Button };
