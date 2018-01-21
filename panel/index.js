webpackJsonp([0],{

/***/ 127:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __webpack_require__(128);
var index_1 = __webpack_require__(79);
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
exports.Core = Core;


/***/ }),

/***/ 207:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = __webpack_require__(55);
var store_1 = __webpack_require__(79);
var Main_1 = __webpack_require__(237);
var loader = document.getElementById('container-loader');
var parent = loader.parentNode;
parent && parent.removeChild(loader);
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store_1.store },
    React.createElement(Main_1.default, null)), document.getElementById('app'));


/***/ }),

/***/ 236:
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
            return __assign({}, state, { login: __assign({}, state.login, { authorized: !state.login.authorized }) });
        case 'tree':
            return __assign({}, state, { tree: action.state.slice() });
        default:
            return state;
    }
};
exports.default = reducers;


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
var Login_1 = __webpack_require__(238);
var Toolbar_1 = __webpack_require__(423);
var Tree_1 = __webpack_require__(424);
var Grid_1 = __webpack_require__(533);
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
                React.createElement(Tree_1.default, null),
                React.createElement(Grid_1.default, null))));
    };
    return Main;
}(React.Component));
exports.default = Main;


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
Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = __webpack_require__(55);
var Auth_1 = __webpack_require__(239);
var Mui_1 = __webpack_require__(81);
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
            var auth = new Auth_1.Auth().login(authState.name, authState.password).then(function () {
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
exports.default = react_redux_1.connect(function (state) { return ({ open: !state.login.authorized }); })(Login);


/***/ }),

/***/ 239:
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
var core_1 = __webpack_require__(127);
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
}(core_1.Core));
exports.Auth = Auth;


/***/ }),

/***/ 423:
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
var Mui_1 = __webpack_require__(81);
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

/***/ 424:
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
var Proxy_1 = __webpack_require__(425);
var Mui_1 = __webpack_require__(81);
var TreeNode = /** @class */ (function (_super) {
    __extends(TreeNode, _super);
    function TreeNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TreeNode.prototype.subNodes = function () {
        var result = [];
        (this.props.nodes || []).forEach(function (node) {
            result.push(React.createElement(Mui_1.default.ListItem, { button: true, key: node.id },
                React.createElement(Mui_1.default.ListItemText, { inset: true, primary: node.text })));
            if (node.items) {
                result.push(React.createElement(TreeNode, { key: "sub-" + node.id, nodes: node.items }));
            }
        });
        return result;
    };
    TreeNode.prototype.render = function () {
        return (React.createElement(Mui_1.default.List, null, this.subNodes()));
    };
    return TreeNode;
}(React.Component));
var Tree = /** @class */ (function (_super) {
    __extends(Tree, _super);
    function Tree() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dependencies = ['id'];
        return _this;
    }
    Tree.prototype.load = function (proxy, store) {
        proxy.post('tree', {}).then(function (response) {
            store.dispatch({
                type: 'tree',
                state: response.data
            });
        });
    };
    Tree.prototype.render = function () {
        return (React.createElement("div", { className: 'Tree' },
            React.createElement(TreeNode, { nodes: this.props.tree })));
    };
    return Tree;
}(Proxy_1.Proxy));
;
exports.default = Tree.connect(function (state) { return { tree: state.tree }; });


/***/ }),

/***/ 425:
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
var index_1 = __webpack_require__(79);
var react_redux_1 = __webpack_require__(55);
var core_1 = __webpack_require__(127);
var httpProxy = new (/** @class */ (function (_super) {
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
}(core_1.Core)));
var Proxy = /** @class */ (function (_super) {
    __extends(Proxy, _super);
    function Proxy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dependencies = [];
        return _this;
    }
    Proxy.prototype.load = function (proxy, store) {
    };
    Proxy.prototype.loadComponentData = function () {
        this.load(httpProxy.instance(), index_1.store);
    };
    Proxy.prototype.componentDidMount = function () {
        this.loadComponentData();
    };
    Proxy.prototype.componentWillReceiveProps = function (nextProps) {
        var props = this.props;
        for (var i = 0; i < this.dependencies.length; ++i) {
            var key = this.dependencies[i];
            if (nextProps[key] !== props[key]) {
                this.loadComponentData();
                return;
            }
        }
    };
    // redux connect wrapper
    Proxy.connect = (function (fn) {
        return function (params) {
            return fn(params)(this);
        };
    })(react_redux_1.connect);
    return Proxy;
}(React.Component));
exports.Proxy = Proxy;


/***/ }),

/***/ 533:
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
var Proxy_1 = __webpack_require__(425);
var Grid = /** @class */ (function (_super) {
    __extends(Grid, _super);
    function Grid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Grid.prototype.render = function () {
        return (React.createElement("div", { className: 'Grid' }));
    };
    return Grid;
}(Proxy_1.Proxy));
exports.default = Grid;


/***/ }),

/***/ 79:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = __webpack_require__(77);
var reducers_1 = __webpack_require__(236);
var initialState = {
    login: {
        authorized: true,
    }
};
exports.store = redux_1.createStore(reducers_1.default, initialState);


/***/ }),

/***/ 81:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AppBar_1 = __webpack_require__(134);
var Button_1 = __webpack_require__(105);
var Dialog_1 = __webpack_require__(171);
var IconButton_1 = __webpack_require__(53);
var List_1 = __webpack_require__(110);
var TextField_1 = __webpack_require__(183);
var Toolbar_1 = __webpack_require__(112);
var Typography_1 = __webpack_require__(27);
var styles_1 = __webpack_require__(113);
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
    Mui.List = List_1.default;
    Mui.ListItem = List_1.ListItem;
    Mui.ListItemIcon = List_1.ListItemIcon;
    Mui.ListItemText = List_1.ListItemText;
    Mui.TextField = TextField_1.default;
    Mui.Toolbar = Toolbar_1.default;
    Mui.Typography = Typography_1.default;
    Mui.withStyles = styles_1.withStyles;
    return Mui;
}());
exports.default = Mui;


/***/ })

},[207]);