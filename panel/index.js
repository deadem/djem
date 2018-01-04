webpackJsonp([0],{

/***/ 182:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Hello_1 = __webpack_require__(183);
var loader = document.getElementById('container-loader');
var parent = loader.parentNode;
parent && parent.removeChild(loader);
ReactDOM.render(React.createElement(Hello_1.Hello, null), document.getElementById('app'));


/***/ }),

/***/ 183:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Button_1 = __webpack_require__(70);
var TextField_1 = __webpack_require__(143);
var Dialog_1 = __webpack_require__(167);
var Hello = /** @class */ (function (_super) {
    __extends(Hello, _super);
    function Hello() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            open: false,
        };
        _this.handleClickOpen = function () {
            _this.setState({ open: true });
        };
        _this.handleClose = function () {
            _this.setState({ open: false });
        };
        return _this;
    }
    Hello.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(Button_1.default, { onClick: this.handleClickOpen, focusRipple: false }, "Open form dialog"),
            React.createElement(Dialog_1.default, { open: this.state.open, onClose: function () { }, "aria-labelledby": "form-dialog-title", disableBackdropClick: true, disableEscapeKeyDown: true },
                React.createElement(Dialog_1.DialogTitle, { id: "form-dialog-title" }, "Login"),
                React.createElement(Dialog_1.DialogContent, null,
                    React.createElement(Dialog_1.DialogContentText, null, "Please enter your credentials"),
                    React.createElement(TextField_1.default, { autoFocus: true, margin: "dense", id: "name", label: "Email Address", type: "email", fullWidth: true }),
                    React.createElement(TextField_1.default, { margin: "dense", id: "password", label: "Password", type: "password", fullWidth: true })),
                React.createElement(Dialog_1.DialogActions, null,
                    React.createElement(Button_1.default, { onClick: this.handleClose, color: "primary" }, "Login")))));
    };
    return Hello;
}(React.Component));
exports.Hello = Hello;


/***/ })

},[182]);