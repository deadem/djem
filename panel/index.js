webpackJsonp([0],{

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = __webpack_require__(77);
var reducers_1 = __webpack_require__(235);
var initialState = {
    login: {
        authorized: true,
    }
};
exports.store = redux_1.createStore(reducers_1.default, initialState);
// setInterval(() => {
//   store.dispatch({
//     type: 'authorize'
//   });
// }, 1000);


/***/ }),

/***/ 131:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AppBar_1 = __webpack_require__(132);
var Button_1 = __webpack_require__(103);
var Dialog_1 = __webpack_require__(169);
var IconButton_1 = __webpack_require__(53);
var TextField_1 = __webpack_require__(180);
var Toolbar_1 = __webpack_require__(109);
var Typography_1 = __webpack_require__(27);
var styles_1 = __webpack_require__(110);
var Mui = /** @class */ (function () {
    function Mui() {
    }
    Mui.AppBar = AppBar_1.default;
    Mui.Button = Button_1.default;
    Mui.Dialog = Dialog_1.default;
    Mui.DialogActions = Dialog_1.DialogActions;
    Mui.DialogContent = Dialog_1.DialogContent;
    Mui.DialogContentText = Dialog_1.DialogContentText;
    Mui.DialogTitle = Dialog_1.DialogTitle;
    Mui.IconButton = IconButton_1.default;
    Mui.TextField = TextField_1.default;
    Mui.Toolbar = Toolbar_1.default;
    Mui.Typography = Typography_1.default;
    Mui.withStyles = styles_1.withStyles;
    return Mui;
}());
exports.default = Mui;


/***/ }),

/***/ 206:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = __webpack_require__(72);
var store_1 = __webpack_require__(124);
var Main_1 = __webpack_require__(236);
var loader = document.getElementById('container-loader');
var parent = loader.parentNode;
parent && parent.removeChild(loader);
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store_1.store },
    React.createElement(Main_1.default, null)), document.getElementById('app'));


/***/ }),

/***/ 235:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var reducers = function (state, action) {
    switch (action.type) {
        case 'authorize':
            console.log(state.login);
            return __assign({}, state, { login: __assign({}, state.login, { authorized: !state.login.authorized }) });
        default:
            return state;
    }
};
exports.default = reducers;


/***/ }),

/***/ 236:
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
var Login_1 = __webpack_require__(237);
var Toolbar_1 = __webpack_require__(422);
var Tree_1 = __webpack_require__(530);
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.render = function () {
        return (React.createElement("div", { className: 'Main' },
            React.createElement(Login_1.default, null),
            React.createElement(Toolbar_1.default, null),
            React.createElement("div", { className: 'Main__container' },
                React.createElement(Tree_1.default, null))));
    };
    return Main;
}(React.Component));
exports.default = Main;


/***/ }),

/***/ 237:
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
var react_redux_1 = __webpack_require__(72);
var Proxy_1 = __webpack_require__(238);
var Mui_1 = __webpack_require__(131);
var authState = {
    name: '',
    password: '',
};
var Login = /** @class */ (function (_super) {
    __extends(Login, _super);
    function Login() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        _this.catchReturn = function (evt) {
            if (evt.charCode == 13) {
                return _this.handleLogin();
            }
        };
        _this.handleLogin = function () {
            var auth = new Proxy_1.Auth().login(authState.name, authState.password).then(function () {
                authState.password = '';
                _this.state.password.value = '';
            }, function (error) { });
        };
        _this.onChange = function (evt) {
            var element = evt.currentTarget;
            authState[element.id] = element.value;
        };
        _this.passwordField = function (field) {
            _this.state.password = field;
        };
        return _this;
    }
    Login.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(Mui_1.default.Dialog, { open: this.props.open, onClose: function () { }, "aria-labelledby": "form-dialog-title", disableBackdropClick: true, disableEscapeKeyDown: true },
                React.createElement(Mui_1.default.DialogTitle, { id: "form-dialog-title" }, "Login"),
                React.createElement(Mui_1.default.DialogContent, null,
                    React.createElement(Mui_1.default.DialogContentText, null, "Please enter your credentials"),
                    React.createElement(Mui_1.default.TextField, { autoFocus: true, margin: "dense", id: "name", label: "Login", type: "text", fullWidth: true, onChange: this.onChange, onKeyPress: this.catchReturn }),
                    React.createElement(Mui_1.default.TextField, { margin: "dense", id: "password", label: "Password", type: "password", fullWidth: true, onChange: this.onChange, onKeyPress: this.catchReturn, inputRef: this.passwordField })),
                React.createElement(Mui_1.default.DialogActions, null,
                    React.createElement(Mui_1.default.Button, { onClick: this.handleLogin, color: "primary" }, "Login")))));
    };
    return Login;
}(React.Component));
var mapStateToProps = function (state) {
    return {
        open: !state.login.authorized,
    };
};
var mapDispatchToProps = function () {
    return {};
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Login);


/***/ }),

/***/ 238:
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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __webpack_require__(125);
var index_1 = __webpack_require__(124);
var auth = {
    token: '',
};
var Core = /** @class */ (function () {
    function Core() {
        var _this = this;
        this._http = axios_1.default.create({
            baseURL: 'api',
        });
        this._http.interceptors.response.use(function (success) { return (_this.updateToken(success), success); }, function (error) { return (_this.updateToken(error.response), Promise.reject(error)); });
        this._http.interceptors.request.use(function (config) {
            config.headers['X-CSRF-TOKEN'] = _this.getToken();
            return config;
        });
    }
    Core.prototype.updateToken = function (response) {
        auth.token = response.headers['x-csrf-token'];
    };
    Core.prototype.getToken = function () {
        return auth.token;
    };
    Core.prototype.setAuthorized = function (state) {
        index_1.store.dispatch({
            type: 'authorize',
            state: state
        });
    };
    return Core;
}());
var Auth = /** @class */ (function (_super) {
    __extends(Auth, _super);
    function Auth() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Auth.prototype.login = function (login, password) {
        var _this = this;
        var post = this._http.post('', { login: login, password: password });
        post.then(function (success) { return _this.setAuthorized(true); }, function (error) { return error; }); // bad auth does nothing
        return post;
    };
    return Auth;
}(Core));
exports.Auth = Auth;
var HttpProxy = /** @class */ (function (_super) {
    __extends(HttpProxy, _super);
    function HttpProxy() {
        var _this = _super.call(this) || this;
        _this._http.interceptors.response.use(function (response) { return response; }, function (error) { return _this.retry(error); });
        return _this;
    }
    HttpProxy.prototype.retry = function (error) {
        var _this = this;
        if ((error.response || {}).status === 401) {
            this.setAuthorized(false);
            var originalRequest_1 = error.config;
            return new Promise(function (resolve, reject) {
                var stopWatch = index_1.store.subscribe(function () {
                    var state = index_1.store.getState();
                    if (state.login.authorized) {
                        stopWatch();
                        originalRequest_1.baseURL = '';
                        return _this._http.request(originalRequest_1).then(function (success) { return resolve(success); }, function (error) { return reject(error); });
                    }
                    return;
                });
            });
        }
        return Promise.reject(error);
    };
    HttpProxy.prototype.instance = function () {
        return this._http;
    };
    return HttpProxy;
}(Core));
function Proxy(Component) {
    var proxy = new HttpProxy();
    var component;
    var ProxyConnection = /** @class */ (function (_super) {
        __extends(ProxyConnection, _super);
        function ProxyConnection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ProxyConnection.prototype.componentDidMount = function () {
            component.load(proxy.instance());
        };
        ProxyConnection.prototype.componentWillReceiveProps = function () {
            component.load(proxy.instance());
        };
        ProxyConnection.prototype.render = function () {
            return React.createElement(Component, __assign({}, this.props, this.state, { ref: function (child) { component = child; } }));
        };
        return ProxyConnection;
    }(React.Component));
    return ProxyConnection;
}
exports.Proxy = Proxy;


/***/ }),

/***/ 422:
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
var Mui_1 = __webpack_require__(131);
var Toolbar = /** @class */ (function (_super) {
    __extends(Toolbar, _super);
    function Toolbar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Toolbar.prototype.render = function () {
        return (React.createElement(Mui_1.default.AppBar, { position: "static" },
            React.createElement(Mui_1.default.Toolbar, null,
                React.createElement(Mui_1.default.Typography, { type: "title", color: "inherit", noWrap: true }, "DJEM"))));
    };
    return Toolbar;
}(React.Component));
exports.default = Toolbar;


/***/ }),

/***/ 530:
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
var Proxy_1 = __webpack_require__(238);
var Tree = /** @class */ (function (_super) {
    __extends(Tree, _super);
    function Tree() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tree.prototype.load = function (proxy) {
        console.log('load');
        proxy.post('tree', {});
    };
    Tree.prototype.render = function () {
        return (React.createElement("div", { className: 'Tree' }, "tree"));
    };
    return Tree;
}(React.Component));
;
exports.default = Proxy_1.Proxy(Tree);


/***/ })

},[206]);