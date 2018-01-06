webpackJsonp([0],{

/***/ 180:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Login_1 = __webpack_require__(463);
var loader = document.getElementById('container-loader');
var parent = loader.parentNode;
parent && parent.removeChild(loader);
ReactDOM.render(React.createElement(Login_1.Login, null), document.getElementById('app'));


/***/ }),

/***/ 463:
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
var Button_1 = __webpack_require__(143);
var TextField_1 = __webpack_require__(452);
var Dialog_1 = __webpack_require__(325);
var Login = /** @class */ (function (_super) {
    __extends(Login, _super);
    function Login() {
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
    Login.prototype.render = function () {
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
    return Login;
}(React.Component));
exports.Login = Login;


/***/ })

},[180]);