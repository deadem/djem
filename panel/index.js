webpackJsonp([0],{

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __webpack_require__(124);
var index_1 = __webpack_require__(56);
var auth = {
    token: '',
};
var Core = /** @class */ (function () {
    function Core() {
        var _this = this;
        this._http = axios_1.default.create({
            baseURL: 'api',
        });
        this._http.interceptors.response.use(function (success) {
            _this.updateToken(success);
            return success;
        }, function (error) {
            _this.updateToken(error.response);
            return Promise.reject(error);
        });
        this._http.interceptors.request.use(function (config) {
            config.headers['X-CSRF-TOKEN'] = _this.getToken();
            return config;
        });
    }
    Core.prototype.setAuthorized = function (state) {
        index_1.store.dispatch({
            type: 'authorize',
            state: state,
        });
    };
    Core.prototype.updateToken = function (response) {
        auth.token = response.headers['x-csrf-token'];
    };
    Core.prototype.getToken = function () {
        return auth.token;
    };
    return Core;
}());
exports.Core = Core;


/***/ }),

/***/ 205:
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
var index_1 = __webpack_require__(56);
var react_redux_1 = __webpack_require__(54);
var HttpProxy_1 = __webpack_require__(532);
var httpProxy = new HttpProxy_1.HttpProxy();
var Proxy = /** @class */ (function (_super) {
    __extends(Proxy, _super);
    function Proxy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dependencies = [];
        return _this;
    }
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
    Proxy.prototype.load = function (_proxy, _store) {
        return;
    };
    Proxy.prototype.loadComponentData = function () {
        this.load(httpProxy.instance(), index_1.store);
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

/***/ 206:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = __webpack_require__(54);
var store_1 = __webpack_require__(56);
var Main_1 = __webpack_require__(236);
var loader = document.getElementById('container-loader');
var parent = loader.parentNode;
if (parent) {
    parent.removeChild(loader);
}
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
            return __assign({}, state, { login: __assign({}, state.login, { authorized: !state.login.authorized }) });
        case 'tree':
            return __assign({}, state, { tree: action.state.slice() });
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
var Toolbar_1 = __webpack_require__(530);
var Tree_1 = __webpack_require__(531);
var Grid_1 = __webpack_require__(534);
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
var react_redux_1 = __webpack_require__(54);
var Auth_1 = __webpack_require__(238);
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
            new Auth_1.Auth().login(authState.name, authState.password).then(function () {
                authState.password = '';
                _this.state.password.value = '';
            });
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
            React.createElement(Mui_1.default.Dialog, { open: this.props.open, onClose: this.empty, "aria-labelledby": 'form-dialog-title', disableBackdropClick: true, disableEscapeKeyDown: true },
                React.createElement(Mui_1.default.DialogTitle, { id: 'form-dialog-title' }, "Login"),
                React.createElement(Mui_1.default.DialogContent, null,
                    React.createElement(Mui_1.default.DialogContentText, null, "Please enter your credentials"),
                    React.createElement(Mui_1.default.TextField, { autoFocus: true, margin: 'dense', id: 'name', label: 'Login', type: 'text', fullWidth: true, onChange: this.onChange, onKeyPress: this.catchReturn }),
                    React.createElement(Mui_1.default.TextField, { margin: 'dense', id: 'password', label: 'Password', type: 'password', fullWidth: true, onChange: this.onChange, onKeyPress: this.catchReturn, inputRef: this.passwordField })),
                React.createElement(Mui_1.default.DialogActions, null,
                    React.createElement(Mui_1.default.Button, { onClick: this.handleLogin, color: 'primary' }, "Login")))));
    };
    Login.prototype.empty = function () {
        return;
    };
    return Login;
}(React.Component));
exports.default = react_redux_1.connect(function (state) { return ({ open: !state.login.authorized }); })(Login);


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
var core_1 = __webpack_require__(123);
var Auth = /** @class */ (function (_super) {
    __extends(Auth, _super);
    function Auth() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Auth.prototype.login = function (login, password) {
        var _this = this;
        var post = this._http.post('', { login: login, password: password });
        post.then(function () { return _this.setAuthorized(true); }, function (error) { return error; }); // bad auth does nothing
        return post;
    };
    return Auth;
}(core_1.Core));
exports.Auth = Auth;


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
var Mui_1 = __webpack_require__(81);
var Toolbar = /** @class */ (function (_super) {
    __extends(Toolbar, _super);
    function Toolbar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Toolbar.prototype.render = function () {
        return (React.createElement(Mui_1.default.AppBar, { position: 'static' },
            React.createElement(Mui_1.default.Toolbar, null,
                React.createElement(Mui_1.default.Typography, { type: 'title', color: 'inherit', noWrap: true }, "DJEM"))));
    };
    return Toolbar;
}(React.Component));
exports.default = Toolbar;


/***/ }),

/***/ 531:
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
var Proxy_1 = __webpack_require__(205);
var TreeNode_1 = __webpack_require__(533);
var Tree = /** @class */ (function (_super) {
    __extends(Tree, _super);
    function Tree() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dependencies = ['id'];
        return _this;
    }
    Tree.prototype.render = function () {
        return (React.createElement("div", { className: 'Tree' },
            React.createElement(TreeNode_1.TreeNode, { nodes: this.props.tree })));
    };
    Tree.prototype.load = function (proxy, store) {
        proxy.post('tree', {}).then(function (response) {
            store.dispatch({
                type: 'tree',
                state: response.data,
            });
        });
    };
    return Tree;
}(Proxy_1.Proxy));
exports.default = Tree.connect(function (state) { return ({ tree: state.tree }); });


/***/ }),

/***/ 532:
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
var core_1 = __webpack_require__(123);
var index_1 = __webpack_require__(56);
var HttpProxy = /** @class */ (function (_super) {
    __extends(HttpProxy, _super);
    function HttpProxy() {
        var _this = _super.call(this) || this;
        _this._http.interceptors.response.use(function (response) { return response; }, function (error) { return _this.retry(error); });
        return _this;
    }
    HttpProxy.prototype.instance = function () {
        return this._http;
    };
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
                        return _this._http.request(originalRequest_1).then(resolve, reject);
                    }
                    return;
                });
            });
        }
        return Promise.reject(error);
    };
    return HttpProxy;
}(core_1.Core));
exports.HttpProxy = HttpProxy;


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
var Mui_1 = __webpack_require__(81);
var TreeNode = /** @class */ (function (_super) {
    __extends(TreeNode, _super);
    function TreeNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TreeNode.prototype.render = function () {
        return (React.createElement(Mui_1.default.List, null, this.subNodes()));
    };
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
    return TreeNode;
}(React.Component));
exports.TreeNode = TreeNode;


/***/ }),

/***/ 534:
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
var Proxy_1 = __webpack_require__(205);
// import { Proxy, Http, State, Store } from '../store/Proxy';
// import Mui from './Mui';
var Grid = /** @class */ (function (_super) {
    __extends(Grid, _super);
    function Grid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Grid.prototype.render = function () {
        return (React.createElement("div", { className: 'Grid' }, this.props.id));
    };
    return Grid;
}(Proxy_1.Proxy));
exports.default = Grid.connect(function (state) { return ({ id: state.grid.id, grid: state.grid.data }); });


/***/ }),

/***/ 536:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.initialState = {
    login: {
        authorized: true,
    },
    grid: {
        id: undefined,
    },
};


/***/ }),

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = __webpack_require__(78);
var reducers_1 = __webpack_require__(235);
var store_1 = __webpack_require__(536);
exports.store = redux_1.createStore(reducers_1.default, store_1.initialState);


/***/ }),

/***/ 81:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var material_ui_1 = __webpack_require__(130);
var Mui = /** @class */ (function () {
    function Mui() {
    }
    Mui.AppBar = material_ui_1.AppBar;
    Mui.Button = material_ui_1.Button;
    Mui.Dialog = material_ui_1.Dialog;
    Mui.DialogActions = material_ui_1.DialogActions;
    Mui.DialogContent = material_ui_1.DialogContent;
    Mui.DialogContentText = material_ui_1.DialogContentText;
    Mui.DialogTitle = material_ui_1.DialogTitle;
    Mui.IconButton = material_ui_1.IconButton;
    Mui.List = material_ui_1.List;
    Mui.ListItem = material_ui_1.ListItem;
    Mui.ListItemIcon = material_ui_1.ListItemIcon;
    Mui.ListItemText = material_ui_1.ListItemText;
    Mui.TextField = material_ui_1.TextField;
    Mui.Toolbar = material_ui_1.Toolbar;
    Mui.Typography = material_ui_1.Typography;
    return Mui;
}());
exports.default = Mui;


/***/ })

},[206]);