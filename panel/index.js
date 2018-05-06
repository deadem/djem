webpackJsonp([0],{

/***/ 135:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __webpack_require__(136);
var index_1 = __webpack_require__(31);
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
        index_1.Action.authorize(state);
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

/***/ 214:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Button_1 = __webpack_require__(570);
exports.Button = Button_1.Button;
var Checkbox_1 = __webpack_require__(571);
exports.Checkbox = Checkbox_1.Checkbox;
var Label_1 = __webpack_require__(572);
exports.Label = Label_1.Label;
var Layout_1 = __webpack_require__(47);
exports.Layout = Layout_1.Layout;
var StaticHtml_1 = __webpack_require__(573);
exports.StaticHtml = StaticHtml_1.StaticHtml;
var Text_1 = __webpack_require__(574);
exports.Text = Text_1.Text;
var UnknownWidget_1 = __webpack_require__(575);
exports.UnknownWidget = UnknownWidget_1.UnknownWidget;


/***/ }),

/***/ 215:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = __webpack_require__(64);
var store_1 = __webpack_require__(31);
var Main_1 = __webpack_require__(275);
var loader = document.getElementById('container-loader');
var parent = loader.parentNode;
if (parent) {
    parent.removeChild(loader);
}
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store_1.Store.get() },
    React.createElement(Main_1.default, null)), document.getElementById('app'));


/***/ }),

/***/ 252:
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
var react_redux_1 = __webpack_require__(64);
var HttpProxy_1 = __webpack_require__(253);
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
            this.load();
        };
        Component.prototype.componentDidUpdate = function (prevProps, _prevState) {
            var props = this.props;
            for (var i = 0; i < this.dependencies.length; ++i) {
                var key = this.dependencies[i];
                if (prevProps[key] !== props[key]) {
                    this.load();
                    return;
                }
            }
        };
        // public componentWillReceiveProps(nextProps: any) {
        // }
        Component.prototype.proxy = function () {
            return httpProxy.instance();
        };
        Component.prototype.load = function () {
            return;
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

/***/ 253:
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
var core_1 = __webpack_require__(135);
var index_1 = __webpack_require__(31);
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
                var stopWatch = index_1.Store.get().subscribe(function () {
                    var state = index_1.Store.get().getState();
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

/***/ 272:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = __webpack_require__(88);
var State_1 = __webpack_require__(273);
var Store = /** @class */ (function () {
    function Store() {
        this.store = redux_1.createStore(Store.init, State_1.initialState);
    }
    Store.init = function (state, action) {
        if (typeof action.type == 'function') {
            return action.type(state);
        }
        return state;
    };
    Store.prototype.get = function () {
        return this.store;
    };
    // dispatch helper
    Store.prototype.dispatch = function (type) {
        this.store.dispatch({ type: type });
    };
    return Store;
}());
exports.Store = Store;


/***/ }),

/***/ 273:
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
    tabs: [{ name: 'DJEM', id: 'grid' }],
    content: {},
};


/***/ }),

/***/ 274:
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
var Actions = /** @class */ (function () {
    function Actions(store) {
        this.store = store;
    }
    Actions.prototype.authorize = function (authorized) {
        return this.store.dispatch(function (state) { return (__assign({}, state, { login: __assign({}, state.login, { authorized: authorized }) })); });
    };
    Actions.prototype.gridChange = function (id) {
        return this.store.dispatch(function (state) { return (__assign({}, state, { grid: __assign({}, state.grid, { id: id }) })); });
    };
    Actions.prototype.openContent = function (params) {
        return this.store.dispatch(function (state) {
            var id = params.doctype + "--" + params.id;
            return __assign({}, state, { content: __assign({}, state.content, (_a = {}, _a[id] = { params: params, data: {} }, _a)), tab: id, tabs: state.tabs.concat([{ name: params.name, id: id }]) });
            var _a;
        });
    };
    Actions.prototype.tabChange = function (tab) {
        return this.store.dispatch(function (state) { return (__assign({}, state, { tab: tab })); });
    };
    // load data
    Actions.prototype.grid = function (data) {
        return this.store.dispatch(function (state) { return (__assign({}, state, { grid: __assign({}, state.grid, { data: data }) })); });
    };
    Actions.prototype.tree = function (tree) {
        return this.store.dispatch(function (state) { return (__assign({}, state, { tree: tree })); });
    };
    Actions.prototype.content = function (id, data) {
        return this.store.dispatch(function (state) {
            return (__assign({}, state, { content: __assign({}, state.content, (_a = {}, _a[id] = __assign({}, state.content[id], { data: data }), _a)) }));
            var _a;
        });
    };
    return Actions;
}());
exports.Actions = Actions;


/***/ }),

/***/ 275:
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
var Login_1 = __webpack_require__(276);
var Toolbar_1 = __webpack_require__(565);
var Grid_1 = __webpack_require__(566);
var Content_1 = __webpack_require__(569);
var store_1 = __webpack_require__(31);
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
            this.props.tab == 'grid' ? React.createElement(Grid_1.default, { id: '' }) : React.createElement(Content_1.default, { id: '' })));
    };
    return Main;
}(store_1.Proxy.Component));
exports.default = store_1.Proxy.connect(Main)(function (state) { return ({ tab: state.tab }); });


/***/ }),

/***/ 276:
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
var react_redux_1 = __webpack_require__(64);
var Auth_1 = __webpack_require__(277);
var Mui = __webpack_require__(32);
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
            React.createElement(Mui.Dialog, { open: this.props.open, onClose: this.empty, "aria-labelledby": 'form-dialog-title', disableBackdropClick: true, disableEscapeKeyDown: true },
                React.createElement(Mui.DialogTitle, { id: 'form-dialog-title' }, "Login"),
                React.createElement(Mui.DialogContent, null,
                    React.createElement(Mui.DialogContentText, null, "Please enter your credentials"),
                    React.createElement(Mui.TextField, { autoFocus: true, margin: 'dense', id: 'name', label: 'Login', type: 'text', fullWidth: true, onChange: this.onChange, onKeyPress: this.catchReturn }),
                    React.createElement(Mui.TextField, { margin: 'dense', id: 'password', label: 'Password', type: 'password', fullWidth: true, onChange: this.onChange, onKeyPress: this.catchReturn, inputRef: this.passwordField })),
                React.createElement(Mui.DialogActions, null,
                    React.createElement(Mui.Button, { onClick: this.handleLogin, color: 'primary' }, "Login")))));
    };
    Login.prototype.empty = function () {
        return;
    };
    return Login;
}(React.Component));
exports.default = react_redux_1.connect(function (state) { return ({ open: !state.login.authorized }); })(Login);


/***/ }),

/***/ 277:
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
var core_1 = __webpack_require__(135);
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

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Proxy_1 = __webpack_require__(252);
exports.Proxy = Proxy_1.default;
var Store_1 = __webpack_require__(272);
var actions_1 = __webpack_require__(274);
exports.Store = new Store_1.Store();
exports.Action = new actions_1.Actions(exports.Store);


/***/ }),

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var material_ui_1 = __webpack_require__(90);
function withStyles(styles) {
    return function (component) {
        return /** @class */ (function () {
            function class_1() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var func = material_ui_1.withStyles(styles(args[0]))(component);
                return new (func.bind.apply(func, [void 0].concat(args)))();
            }
            return class_1;
        }());
    };
}
exports.withStyles = withStyles;
var material_ui_2 = __webpack_require__(90);
exports.AppBar = material_ui_2.AppBar;
exports.Button = material_ui_2.Button;
exports.Checkbox = material_ui_2.Checkbox;
exports.CircularProgress = material_ui_2.CircularProgress;
exports.Dialog = material_ui_2.Dialog;
exports.DialogActions = material_ui_2.DialogActions;
exports.DialogContent = material_ui_2.DialogContent;
exports.DialogContentText = material_ui_2.DialogContentText;
exports.DialogTitle = material_ui_2.DialogTitle;
exports.FormControlLabel = material_ui_2.FormControlLabel;
exports.IconButton = material_ui_2.IconButton;
exports.List = material_ui_2.List;
exports.ListItem = material_ui_2.ListItem;
exports.ListItemIcon = material_ui_2.ListItemIcon;
exports.ListItemText = material_ui_2.ListItemText;
exports.Tab = material_ui_2.Tab;
exports.Table = material_ui_2.Table;
exports.Tabs = material_ui_2.Tabs;
exports.TableBody = material_ui_2.TableBody;
exports.TableCell = material_ui_2.TableCell;
exports.TableHead = material_ui_2.TableHead;
exports.TableRow = material_ui_2.TableRow;
exports.TextField = material_ui_2.TextField;
exports.Toolbar = material_ui_2.Toolbar;
exports.Typography = material_ui_2.Typography;


/***/ }),

/***/ 47:
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
var DJEM = __webpack_require__(214);
var Layout = /** @class */ (function (_super) {
    __extends(Layout, _super);
    function Layout(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.update = function () { return function (value) {
            _this.props.update(__assign({}, value));
        }; };
        _this.props = props;
        return _this;
    }
    Layout.prototype.render = function () {
        var item = this.props.item;
        // {JSON.stringify(item)}
        return (React.createElement("div", { className: this.className(item).concat(['djem-layout']).join(' '), style: this.styles(item) }, this.items(item.items)));
    };
    Layout.prototype.items = function (items) {
        var _this = this;
        var xtypes = {
            'djem.button': DJEM.Button,
            'djem.checkbox': DJEM.Checkbox,
            'djem.html': DJEM.UnknownWidget,
            'djem.image': DJEM.UnknownWidget,
            'djem.images': DJEM.UnknownWidget,
            'djem.label': DJEM.Label,
            'djem.staticHtml': DJEM.StaticHtml,
            'djem.tag': DJEM.UnknownWidget,
            'djem.text': DJEM.Text,
            'button': DJEM.Button,
            'label': DJEM.Label,
            'layout': DJEM.Layout,
        };
        return (items || []).map(function (item) {
            var xtype = xtypes[item.xtype];
            if (!xtype) {
                xtype = xtypes.layout;
            }
            return React.createElement(xtype, __assign({}, _this.props, { key: item.name, item: item, update: _this.update() }));
        });
    };
    Layout.prototype.className = function (item) {
        var className = [];
        if (item.autoScroll) {
            className.push('djem-layout-autoscroll');
        }
        var layout = item.layout;
        if (layout) {
            if (layout.align) {
                className.push("djem-layout-align-" + layout.align);
            }
            if (layout.type) {
                className.push("djem-layout-type-" + layout.type);
            }
        }
        return className;
    };
    Layout.prototype.styles = function (item) {
        return styleResolver(item, {
            flex: function (i) { return ({ flex: +i }); },
            height: function (i) { return ({ height: i, minHeight: i }); },
            width: true,
        });
    };
    return Layout;
}(React.Component));
exports.Layout = Layout;
var styleResolver = function (item, styleProps) {
    var styleList = {};
    for (var _i = 0, _a = Object.keys(item); _i < _a.length; _i++) {
        var prop = _a[_i];
        var resolver = styleProps[prop];
        if (resolver) {
            if (resolver === true) {
                styleList[prop] = item[prop];
            }
            else {
                styleList = __assign({}, styleList, resolver(item[prop]));
            }
        }
    }
    return styleList;
};
exports.styles = function (props) { return function (_theme) {
    return {
        root: __assign({}, styleResolver(props.item, {
            bgcolor: function (i) { return ({ 'background-color': i }); },
            color: true,
        }), { '&:hover': styleResolver(props.item, {
                bgcolor: function (i) { return ({ 'background-color': i }); },
            }) })
    };
}; };


/***/ }),

/***/ 565:
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
var store_1 = __webpack_require__(31);
var Mui = __webpack_require__(32);
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
        return (React.createElement(Mui.AppBar, { position: 'static' },
            React.createElement(Mui.Tabs, { value: this.props.tab, onChange: function (_evt, value) { return _this.selectTab(value); } }, this.tabs())));
    };
    Toolbar.prototype.selectTab = function (id) {
        store_1.Action.tabChange(id);
    };
    Toolbar.prototype.tabs = function () {
        return (this.props.tabs || []).map(function (tab) {
            return (React.createElement(Mui.Tab, { label: tab.name, value: tab.id, key: tab.id }));
        });
    };
    return Toolbar;
}(store_1.Proxy.Component));
exports.default = store_1.Proxy.connect(Toolbar)(function (state) { return ({ tab: state.tab, tabs: state.tabs }); });


/***/ }),

/***/ 566:
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
var store_1 = __webpack_require__(31);
var Tree_1 = __webpack_require__(567);
var Mui = __webpack_require__(32);
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
                React.createElement(Mui.Table, null,
                    React.createElement(Mui.TableHead, null,
                        React.createElement(Mui.TableRow, null, this.gridHeader())),
                    React.createElement(Mui.TableBody, null, this.gridRows())))));
    };
    Grid.prototype.load = function () {
        if (!this.props.id) {
            return;
        }
        this.proxy().post('grid', { tree: this.props.id }).then(function (response) {
            store_1.Action.grid(response.data);
        });
    };
    Grid.prototype.gridColumns = function () {
        return (((this.props.grid || {}).metaData || {}).columns || []);
    };
    Grid.prototype.gridHeader = function () {
        return this.gridColumns().map(function (column, index) {
            return (React.createElement(Mui.TableCell, { key: index }, column.text));
        });
    };
    Grid.prototype.selectRow = function (item) {
        var doctype = item._doctype || this.props.tree.refs[this.props.id]._doctype;
        store_1.Action.openContent({ doctype: doctype, id: item.id, name: item.name });
    };
    Grid.prototype.gridRows = function () {
        var _this = this;
        var data = this.gridColumns();
        var items = ((this.props.grid || {}).items || []);
        var row = function (item, index) {
            return data.map(function (column, subindex) { return (React.createElement(Mui.TableCell, { key: index + "-" + subindex, onClick: function () { return _this.selectRow(item); } }, item[column.dataIndex])); });
        };
        return items.map(function (item, index) {
            return (React.createElement(Mui.TableRow, { key: index }, row(item, index)));
        });
    };
    return Grid;
}(store_1.Proxy.Component));
exports.default = store_1.Proxy.connect(Grid)(function (state) { return ({ id: state.grid.id, grid: state.grid.data, tree: state.tree }); });


/***/ }),

/***/ 567:
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
var store_1 = __webpack_require__(31);
var TreeNode_1 = __webpack_require__(568);
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
    Tree.prototype.load = function () {
        this.proxy().post('tree', {}).then(function (response) {
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
            store_1.Action.tree({ refs: refs, data: response.data });
        });
    };
    return Tree;
}(store_1.Proxy.Component));
exports.default = store_1.Proxy.connect(Tree)(function (state) { return ({ tree: state.tree.data }); });


/***/ }),

/***/ 568:
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
var store_1 = __webpack_require__(31);
var Mui = __webpack_require__(32);
var TreeNode = /** @class */ (function (_super) {
    __extends(TreeNode, _super);
    function TreeNode(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.props = props;
        return _this;
    }
    TreeNode.prototype.render = function () {
        return (React.createElement(Mui.List, null, this.subNodes()));
    };
    TreeNode.prototype.selectNode = function (id) {
        store_1.Action.gridChange(id);
    };
    TreeNode.prototype.subNodes = function () {
        var _this = this;
        return (this.props.nodes || []).map(function (node) {
            if (node.items) {
                return (React.createElement(TreeNode, { key: "sub-" + node.id, nodes: node.items }));
            }
            return (React.createElement(Mui.ListItem, { button: true, key: node.id, onClick: function () { return _this.selectNode(node.id); } },
                React.createElement(Mui.ListItemText, { inset: true, primary: node.text })));
        });
    };
    return TreeNode;
}(React.Component));
exports.TreeNode = TreeNode;


/***/ }),

/***/ 569:
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
var store_1 = __webpack_require__(31);
var DJEM = __webpack_require__(214);
var Mui = __webpack_require__(32);
var Content = /** @class */ (function (_super) {
    __extends(Content, _super);
    // public dependencies = [ 'id' ];
    function Content(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = { data: {} };
        _this.update = function () { return function (value) {
            var data = __assign({}, _this.state.data, value);
            _this.setState({ data: data });
            console.log(data);
        }; };
        _this.save = function () { return function () {
            if (!_this.props.content) {
                return;
            }
            var params = _this.props.content.params;
            var data = __assign({}, _this.props.content.data.data, _this.state.data);
            _this.proxy().post('content/set', __assign({}, data, { _doctype: params.doctype, id: params.id })).then(function (response) {
                store_1.Action.content(_this.props.id, response.data.metaData);
            });
        }; };
        _this.props = props;
        return _this;
    }
    Content.prototype.render = function () {
        var content = this.props.content;
        if (!content || !content.data || !content.data.view) {
            return (React.createElement("div", { className: 'center' },
                React.createElement(Mui.CircularProgress, { size: 128, thickness: 2 })));
        }
        var inject = function (node) {
            if (!content) {
                return;
            }
            new Function(content.data.code).bind(node)();
        };
        return (React.createElement("div", { className: 'Content', ref: function (el) { return el && inject(el); } },
            React.createElement("div", { className: 'Content-save-button' },
                React.createElement("button", { onClick: this.save() }, "Save")),
            React.createElement(DJEM.Layout, { key: this.props.id, data: content.data.data || {}, item: content.data.view, update: this.update() })));
    };
    Content.prototype.load = function () {
        var _this = this;
        if (!this.props.content || !this.props.content.params) {
            return;
        }
        var params = this.props.content.params;
        this.proxy().post('content/get', { raw: true, _doctype: params.doctype, id: params.id }).then(function (response) {
            store_1.Action.content(_this.props.id, response.data);
        });
    };
    return Content;
}(store_1.Proxy.Component));
exports.default = store_1.Proxy.connect(Content)(function (state) { return ({ id: state.tab, content: state.content[state.tab || ''] }); });


/***/ }),

/***/ 570:
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
var Layout_1 = __webpack_require__(47);
var Mui = __webpack_require__(32);
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.props = props;
        return _this;
    }
    Button.prototype.render = function () {
        var props = this.props;
        var item = props.item;
        var classes = this.props.classes;
        return (React.createElement("div", { className: this.className(item).concat(['djem-widget', 'djem-button']).join(' '), style: this.styles(item) },
            React.createElement(Mui.Button, { id: item.name, variant: 'raised', fullWidth: true, className: ['fullHeight', classes.root].join(' '), color: 'inherit' }, item.text)));
    };
    return Button;
}(Layout_1.Layout));
var withStyles = Mui.withStyles(Layout_1.styles)(Button);
exports.Button = withStyles;


/***/ }),

/***/ 571:
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
var Layout_1 = __webpack_require__(47);
var Mui = __webpack_require__(32);
var Checkbox = /** @class */ (function (_super) {
    __extends(Checkbox, _super);
    function Checkbox(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            value: ''
        };
        _this.onChange = function () { return function (event) {
            var value = !!event.target.checked;
            _this.setState({ value: value });
            _this.props.update((_a = {}, _a[_this.props.item.name] = value, _a));
            var _a;
        }; };
        _this.state = {
            value: props.data[props.item.name]
        };
        _this.props = props;
        return _this;
    }
    Checkbox.prototype.render = function () {
        var props = this.props;
        var item = props.item;
        return (React.createElement("div", { className: this.className(item).concat(['djem-widget', 'djem-checkbox']).join(' '), style: this.styles(item) },
            React.createElement(Mui.FormControlLabel, { control: React.createElement(Mui.Checkbox, { value: 'on', id: item.name, checked: this.state.value, onChange: this.onChange() }), label: item.boxLabel })));
    };
    return Checkbox;
}(Layout_1.Layout));
exports.Checkbox = Checkbox;


/***/ }),

/***/ 572:
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
var Layout_1 = __webpack_require__(47);
var Mui = __webpack_require__(32);
var Label = /** @class */ (function (_super) {
    __extends(Label, _super);
    function Label(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.props = props;
        return _this;
    }
    Label.prototype.render = function () {
        var props = this.props;
        var item = props.item;
        var classes = this.props.classes;
        return (React.createElement("div", { className: this.className(item).concat(['djem-widget', 'djem-label']).join(' '), style: this.styles(item) },
            React.createElement(Mui.Typography, { id: item.name, className: ['fullHeight', classes.root].join(' ') }, item.text)));
    };
    return Label;
}(Layout_1.Layout));
var withStyles = Mui.withStyles(Layout_1.styles)(Label);
exports.Label = withStyles;


/***/ }),

/***/ 573:
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
var Layout_1 = __webpack_require__(47);
var StaticHtml = /** @class */ (function (_super) {
    __extends(StaticHtml, _super);
    function StaticHtml(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.props = props;
        return _this;
    }
    StaticHtml.prototype.render = function () {
        var props = this.props;
        var item = props.item;
        return (React.createElement("div", { id: item.name, className: this.className(item).concat(['djem-widget', 'djem-static-html']).join(' '), style: this.styles(item), dangerouslySetInnerHTML: { __html: item.html } }));
    };
    return StaticHtml;
}(Layout_1.Layout));
exports.StaticHtml = StaticHtml;


/***/ }),

/***/ 574:
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
var Layout_1 = __webpack_require__(47);
var Mui = __webpack_require__(32);
var Text = /** @class */ (function (_super) {
    __extends(Text, _super);
    function Text(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            value: ''
        };
        _this.onChange = function () { return function (event) {
            var value = event.target.value;
            _this.setState({ value: value });
            _this.props.update((_a = {}, _a[_this.props.item.name] = value, _a));
            var _a;
        }; };
        _this.state = {
            value: props.data[props.item.name]
        };
        _this.props = props;
        return _this;
    }
    Text.prototype.render = function () {
        var props = this.props;
        var item = props.item;
        return (React.createElement("div", { className: this.className(item).concat(['djem-widget', 'djem-text']).join(' '), style: this.styles(item) },
            React.createElement(Mui.TextField, { id: item.name, label: item.fieldLabel, fullWidth: true, value: this.state.value, onChange: this.onChange() })));
    };
    return Text;
}(Layout_1.Layout));
exports.Text = Text;


/***/ }),

/***/ 575:
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
var Layout_1 = __webpack_require__(47);
var UnknownWidget = /** @class */ (function (_super) {
    __extends(UnknownWidget, _super);
    function UnknownWidget(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.props = props;
        return _this;
    }
    UnknownWidget.prototype.render = function () {
        var item = this.props.item;
        return (React.createElement("div", { className: this.className(item).concat(['djem-widget', 'djem-widget-border']).join(' '), style: this.styles(item) },
            "UnknownWidget (",
            item.xtype,
            ")",
            this.items(item.items)));
    };
    UnknownWidget.prototype.styles = function (item) {
        return __assign({}, _super.prototype.styles.call(this, item), { border: '1px dotted red' });
    };
    return UnknownWidget;
}(Layout_1.Layout));
exports.UnknownWidget = UnknownWidget;


/***/ })

},[215]);