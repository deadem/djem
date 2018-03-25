webpackJsonp([0],{

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __webpack_require__(126);
var Reducers_1 = __webpack_require__(553);
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
        Reducers_1.Action.authorize({ state: state });
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

/***/ 208:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = __webpack_require__(59);
var store_1 = __webpack_require__(61);
var Main_1 = __webpack_require__(247);
var loader = document.getElementById('container-loader');
var parent = loader.parentNode;
if (parent) {
    parent.removeChild(loader);
}
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store_1.store },
    React.createElement(Main_1.default, null)), document.getElementById('app'));


/***/ }),

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.initialState = {
    login: {
        authorized: true,
    },
    tree: {
        refs: {},
        data: [],
    },
    grid: {
        id: undefined,
        data: undefined,
    },
    tab: 'grid',
    content: { data: {} },
};


/***/ }),

/***/ 247:
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
var Login_1 = __webpack_require__(248);
var Toolbar_1 = __webpack_require__(546);
var Grid_1 = __webpack_require__(548);
var Content_1 = __webpack_require__(551);
var Proxy_1 = __webpack_require__(58);
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.props = props;
        return _this;
    }
    Main.prototype.render = function () {
        // const content = this.props.content;
        return (React.createElement("div", { className: 'Main' },
            React.createElement(Login_1.default, null),
            React.createElement(Toolbar_1.default, null),
            this.props.tab == 'grid' ? React.createElement(Grid_1.default, { id: '' }) : React.createElement(Content_1.default, null)));
    };
    return Main;
}(Proxy_1.default.Component));
exports.default = Proxy_1.default.connect(Main)(function (state) { return ({ tab: state.tab }); });


/***/ }),

/***/ 248:
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
var react_redux_1 = __webpack_require__(59);
var Auth_1 = __webpack_require__(249);
var Mui_1 = __webpack_require__(62);
var authState = {
    name: '',
    password: '',
};
var Login = /** @class */ (function (_super) {
    __extends(Login, _super);
    function Login(props, context) {
        var _this = _super.call(this, props, context) || this;
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
        _this.props = props;
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

/***/ 249:
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
var core_1 = __webpack_require__(125);
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

/***/ 546:
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
var Proxy_1 = __webpack_require__(58);
var Reducers_1 = __webpack_require__(553);
var Mui_1 = __webpack_require__(62);
var Toolbar = /** @class */ (function (_super) {
    __extends(Toolbar, _super);
    function Toolbar(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.props = props;
        _this.selectTab('grid');
        return _this;
    }
    // <Mui.Toolbar>
    //   <Mui.Typography color='inherit' noWrap={true}>DJEM</Mui.Typography>
    // </Mui.Toolbar>
    Toolbar.prototype.render = function () {
        var _this = this;
        return (React.createElement(Mui_1.default.AppBar, { position: 'static' },
            React.createElement(Mui_1.default.Tabs, { value: this.props.tab, onChange: function (_evt, value) { return _this.selectTab(value); } },
                React.createElement(Mui_1.default.Tab, { label: 'DJEM', value: 'grid' }),
                React.createElement(Mui_1.default.Tab, { label: 'Item Two' }),
                React.createElement(Mui_1.default.Tab, { label: 'Item Three' }))));
    };
    Toolbar.prototype.selectTab = function (id) {
        Reducers_1.Action.tabChange({ id: id });
    };
    return Toolbar;
}(Proxy_1.default.Component));
exports.default = Proxy_1.default.connect(Toolbar)(function (state) { return ({ tab: state.tab }); });


/***/ }),

/***/ 547:
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
var core_1 = __webpack_require__(125);
var index_1 = __webpack_require__(61);
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

/***/ 548:
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
var Proxy_1 = __webpack_require__(58);
var Reducers_1 = __webpack_require__(553);
var Tree_1 = __webpack_require__(549);
var Mui_1 = __webpack_require__(62);
var Grid = /** @class */ (function (_super) {
    __extends(Grid, _super);
    function Grid(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.dependencies = ['id'];
        _this.props = props;
        return _this;
    }
    Grid.prototype.render = function () {
        return (React.createElement("div", { className: 'Grid' },
            React.createElement(Tree_1.default, null),
            React.createElement("div", { className: 'Grid__container' },
                React.createElement(Mui_1.default.Table, null,
                    React.createElement(Mui_1.default.TableHead, null,
                        React.createElement(Mui_1.default.TableRow, null, this.gridHeader())),
                    React.createElement(Mui_1.default.TableBody, null, this.gridRows())))));
    };
    Grid.prototype.load = function (proxy) {
        if (!this.props.id) {
            return;
        }
        proxy.post('grid', { tree: this.props.id }).then(function (response) {
            Reducers_1.Action.grid({ state: response.data });
        });
    };
    Grid.prototype.gridColumns = function () {
        return (((this.props.grid || {}).metaData || {}).columns || []);
    };
    Grid.prototype.gridHeader = function () {
        return this.gridColumns().map(function (column, index) {
            return (React.createElement(Mui_1.default.TableCell, { key: index }, column.text));
        });
    };
    Grid.prototype.selectRow = function (item) {
        var doctype = item._doctype || this.props.tree.refs[this.props.id]._doctype;
        Reducers_1.Action.openContent({ doctype: doctype, id: item.id });
    };
    Grid.prototype.gridRows = function () {
        var _this = this;
        var data = this.gridColumns();
        var items = ((this.props.grid || {}).items || []);
        var row = function (item, index) {
            return data.map(function (column, subindex) { return (React.createElement(Mui_1.default.TableCell, { key: index + "-" + subindex, onClick: function () { return _this.selectRow(item); } }, item[column.dataIndex])); });
        };
        return items.map(function (item, index) {
            return (React.createElement(Mui_1.default.TableRow, { key: index }, row(item, index)));
        });
    };
    return Grid;
}(Proxy_1.default.Component));
exports.default = Proxy_1.default.connect(Grid)(function (state) { return ({ id: state.grid.id, grid: state.grid.data, tree: state.tree }); });


/***/ }),

/***/ 549:
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
var Proxy_1 = __webpack_require__(58);
var Reducers_1 = __webpack_require__(553);
var TreeNode_1 = __webpack_require__(550);
var Tree = /** @class */ (function (_super) {
    __extends(Tree, _super);
    function Tree(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.dependencies = ['id'];
        _this.props = props;
        return _this;
    }
    Tree.prototype.render = function () {
        return (React.createElement("div", { className: 'Tree' },
            React.createElement(TreeNode_1.TreeNode, { nodes: this.props.tree })));
    };
    Tree.prototype.load = function (proxy) {
        proxy.post('tree', {}).then(function (response) {
            var refs = {};
            var walk = function (nodes) {
                for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
                    var node = nodes_1[_i];
                    refs[node.id] = node;
                    if (node.items) {
                        walk(node.items);
                    }
                }
            };
            walk(response.data);
            Reducers_1.Action.tree({ state: { refs: refs, data: response.data } });
        });
    };
    return Tree;
}(Proxy_1.default.Component));
exports.default = Proxy_1.default.connect(Tree)(function (state) { return ({ tree: state.tree.data }); });


/***/ }),

/***/ 550:
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
var Reducers_1 = __webpack_require__(553);
var Mui_1 = __webpack_require__(62);
var TreeNode = /** @class */ (function (_super) {
    __extends(TreeNode, _super);
    function TreeNode(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.props = props;
        return _this;
    }
    TreeNode.prototype.render = function () {
        return (React.createElement(Mui_1.default.List, null, this.subNodes()));
    };
    TreeNode.prototype.selectNode = function (id) {
        Reducers_1.Action.gridChange({ id: id });
    };
    TreeNode.prototype.subNodes = function () {
        var _this = this;
        return (this.props.nodes || []).map(function (node) {
            if (node.items) {
                return (React.createElement(TreeNode, { key: "sub-" + node.id, nodes: node.items }));
            }
            return (React.createElement(Mui_1.default.ListItem, { button: true, key: node.id, onClick: function () { return _this.selectNode(node.id); } },
                React.createElement(Mui_1.default.ListItemText, { inset: true, primary: node.text })));
        });
    };
    return TreeNode;
}(React.Component));
exports.TreeNode = TreeNode;


/***/ }),

/***/ 551:
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
var Proxy_1 = __webpack_require__(58);
var Content = /** @class */ (function (_super) {
    __extends(Content, _super);
    function Content() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Content.prototype.render = function () {
        return (React.createElement("div", { className: 'Content' }, "content"));
    };
    return Content;
}(Proxy_1.default.Component));
exports.default = Content;


/***/ }),

/***/ 553:
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
var store_1 = __webpack_require__(61);
var Action = /** @class */ (function () {
    function Action() {
    }
    Action.authorize = function (obj) {
        return this.dispatch(function (state, _action) { state.login.authorized = !state.login.authorized; }, obj);
    };
    Action.grid = function (obj) {
        return this.dispatch(function (state, action) { state.grid.data = action.state; }, obj);
    };
    Action.gridChange = function (obj) {
        return this.dispatch(function (state, action) { state.grid.id = action.id; }, obj);
    };
    Action.openContent = function (obj) {
        return this.tabChange(obj);
    };
    Action.tabChange = function (obj) {
        return this.dispatch(function (_state, action) { return ({ tab: action.id }); }, obj);
    };
    Action.tree = function (obj) {
        return this.dispatch(function (_state, action) { return ({ tree: action.state }); }, obj);
    };
    Action.dispatch = function (type, obj) {
        store_1.store.dispatch(__assign({}, obj, { type: type }));
    };
    return Action;
}());
exports.Action = Action;
exports.default = (function (state, action) {
    if (typeof action.type == 'function') {
        var clone = __assign({}, state);
        return __assign({}, state, (action.type(clone, action) || clone));
    }
    return state;
});


/***/ }),

/***/ 58:
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
var react_redux_1 = __webpack_require__(59);
var index_1 = __webpack_require__(61);
var HttpProxy_1 = __webpack_require__(547);
var httpProxy = new HttpProxy_1.HttpProxy();
var Proxy;
(function (Proxy) {
    var Component = /** @class */ (function (_super) {
        __extends(Component, _super);
        function Component() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.dependencies = [];
            return _this;
        }
        Component.prototype.componentDidMount = function () {
            this.loadComponentData();
        };
        Component.prototype.componentDidUpdate = function (prevProps, _prevState) {
            var props = this.props;
            for (var i = 0; i < this.dependencies.length; ++i) {
                var key = this.dependencies[i];
                if (prevProps[key] !== props[key]) {
                    this.loadComponentData();
                    return;
                }
            }
        };
        // public componentWillReceiveProps(nextProps: any) {
        // }
        Component.prototype.load = function (_proxy, _store) {
            return;
        };
        Component.prototype.loadComponentData = function () {
            this.load(httpProxy.instance(), index_1.store);
        };
        return Component;
    }(React.Component));
    Proxy.Component = Component;
    function connect(component) {
        return function (fn) {
            return react_redux_1.connect(fn)(component);
        };
    }
    Proxy.connect = connect;
})(Proxy || (Proxy = {}));
exports.default = Proxy;


/***/ }),

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = __webpack_require__(83);
var Reducers_1 = __webpack_require__(553);
var store_1 = __webpack_require__(246);
exports.store = redux_1.createStore(Reducers_1.default, store_1.initialState);


/***/ }),

/***/ 62:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var material_ui_1 = __webpack_require__(132);
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
    Mui.Tab = material_ui_1.Tab;
    Mui.Table = material_ui_1.Table;
    Mui.Tabs = material_ui_1.Tabs;
    Mui.TableBody = material_ui_1.TableBody;
    Mui.TableCell = material_ui_1.TableCell;
    Mui.TableHead = material_ui_1.TableHead;
    Mui.TableRow = material_ui_1.TableRow;
    Mui.TextField = material_ui_1.TextField;
    Mui.Toolbar = material_ui_1.Toolbar;
    Mui.Typography = material_ui_1.Typography;
    return Mui;
}());
exports.default = Mui;


/***/ })

},[208]);