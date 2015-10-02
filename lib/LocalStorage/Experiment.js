"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Experiment = require("../Experiment");

var _Experiment2 = _interopRequireDefault(_Experiment);

var store = typeof window !== 'undefined' && 'localStorage' in window && window['localStorage'] !== null ? window.localStorage : {
  getItem: function getItem() {},
  setItem: function setItem() {}
};

exports["default"] = _react2["default"].createClass({
  displayName: "Pushtell.LocalStorage.Experiment",
  propTypes: {
    defaultValue: _react2["default"].PropTypes.string,
    variantNames: _react2["default"].PropTypes.array,
    name: _react2["default"].PropTypes.string.isRequired,
    onPlay: _react2["default"].PropTypes.func,
    onWin: _react2["default"].PropTypes.func
  },
  statics: {
    win: _Experiment2["default"].win,
    emitter: _Experiment2["default"].emitter
  },
  win: function win() {
    _Experiment2["default"].emitter.emit("win", this.props.name, this.state.value);
  },
  getInitialState: function getInitialState() {
    var _this = this;

    _Experiment2["default"].experiments[this.props.name] = _Experiment2["default"].experiments[this.props.name] || {};
    if (this.props.variantNames) {
      this.props.variantNames.forEach(function (name) {
        _Experiment2["default"].experiments[_this.props.name][name] = true;
      });
    }
    _react2["default"].Children.forEach(this.props.children, function (element) {
      if (!_react2["default"].isValidElement(element) || element.type.displayName !== "Pushtell.Variant") {
        throw new Error("Pushtell Experiment children must be Pushtell Variant components.");
      }
      _Experiment2["default"].experiments[_this.props.name][element.props.name] = true;
    });
    return {};
  },
  componentWillMount: function componentWillMount() {
    var storedValue = store.getItem('PUSHTELL-' + this.props.name);
    if (typeof storedValue === "string") {
      return this.setState({
        value: storedValue
      });
    }
    if (typeof this.props.defaultValue === 'string') {
      store.setItem('PUSHTELL-' + this.props.name, this.props.defaultValue);
      return this.setState({
        value: this.props.defaultValue
      });
    }
    var variantNames = Object.keys(_Experiment2["default"].experiments[this.props.name]);
    var randomValue = variantNames[Math.floor(Math.random() * variantNames.length)];
    store.setItem('PUSHTELL-' + this.props.name, randomValue);
    return this.setState({
      value: randomValue
    });
  },
  render: function render() {
    return _react2["default"].createElement(_Experiment2["default"], _extends({}, this.props, this.state));
  }
});
module.exports = exports["default"];