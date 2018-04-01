webpackJsonp([0],{

/***/ 127:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __webpack_require__(128);
var Reducers_1 = __webpack_require__(84);
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
        Reducers_1.Action.authorize(state);
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

/***/ 209:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = __webpack_require__(60);
var store_1 = __webpack_require__(30);
var Main_1 = __webpack_require__(268);
var loader = document.getElementById('container-loader');
var parent = loader.parentNode;
if (parent) {
    parent.removeChild(loader);
}
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store_1.store },
    React.createElement(Main_1.default, null)), document.getElementById('app'));


/***/ }),

/***/ 247:
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
    content: {},
};


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
var react_redux_1 = __webpack_require__(60);
var HttpProxy_1 = __webpack_require__(249);
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
        Component.prototype.load = function (_proxy) {
            return;
        };
        Component.prototype.loadComponentData = function () {
            this.load(httpProxy.instance());
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
var core_1 = __webpack_require__(127);
var index_1 = __webpack_require__(30);
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

/***/ 268:
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
var Login_1 = __webpack_require__(269);
var Toolbar_1 = __webpack_require__(549);
var Grid_1 = __webpack_require__(550);
var Content_1 = __webpack_require__(553);
var store_1 = __webpack_require__(30);
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

/***/ 269:
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
var react_redux_1 = __webpack_require__(60);
var Auth_1 = __webpack_require__(270);
var mui_1 = __webpack_require__(50);
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
            React.createElement(mui_1.default.Dialog, { open: this.props.open, onClose: this.empty, "aria-labelledby": 'form-dialog-title', disableBackdropClick: true, disableEscapeKeyDown: true },
                React.createElement(mui_1.default.DialogTitle, { id: 'form-dialog-title' }, "Login"),
                React.createElement(mui_1.default.DialogContent, null,
                    React.createElement(mui_1.default.DialogContentText, null, "Please enter your credentials"),
                    React.createElement(mui_1.default.TextField, { autoFocus: true, margin: 'dense', id: 'name', label: 'Login', type: 'text', fullWidth: true, onChange: this.onChange, onKeyPress: this.catchReturn }),
                    React.createElement(mui_1.default.TextField, { margin: 'dense', id: 'password', label: 'Password', type: 'password', fullWidth: true, onChange: this.onChange, onKeyPress: this.catchReturn, inputRef: this.passwordField })),
                React.createElement(mui_1.default.DialogActions, null,
                    React.createElement(mui_1.default.Button, { onClick: this.handleLogin, color: 'primary' }, "Login")))));
    };
    Login.prototype.empty = function () {
        return;
    };
    return Login;
}(React.Component));
exports.default = react_redux_1.connect(function (state) { return ({ open: !state.login.authorized }); })(Login);


/***/ }),

/***/ 270:
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
        post.then(function () { return _this.setAuthorized(true); }, function (error) { return error; }); // bad auth does nothing
        return post;
    };
    return Auth;
}(core_1.Core));
exports.Auth = Auth;


/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = __webpack_require__(83);
var Reducers_1 = __webpack_require__(84);
var Store_1 = __webpack_require__(247);
exports.store = redux_1.createStore(Reducers_1.InitReducers, Store_1.initialState);
var Reducers_2 = __webpack_require__(84);
exports.Action = Reducers_2.Action;
var Proxy_1 = __webpack_require__(248);
exports.Proxy = Proxy_1.default;


/***/ }),

/***/ 50:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var material_ui_1 = __webpack_require__(134);
var Mui = /** @class */ (function () {
    function Mui() {
    }
    Mui.AppBar = material_ui_1.AppBar;
    Mui.Button = material_ui_1.Button;
    Mui.CircularProgress = material_ui_1.CircularProgress;
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
var store_1 = __webpack_require__(30);
var mui_1 = __webpack_require__(50);
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
        return (React.createElement(mui_1.default.AppBar, { position: 'static' },
            React.createElement(mui_1.default.Tabs, { value: this.props.tab, onChange: function (_evt, value) { return _this.selectTab(value); } },
                React.createElement(mui_1.default.Tab, { label: 'DJEM', value: 'grid' }),
                React.createElement(mui_1.default.Tab, { label: 'Item Two' }),
                React.createElement(mui_1.default.Tab, { label: 'Item Three' }))));
    };
    Toolbar.prototype.selectTab = function (id) {
        store_1.Action.tabChange(id);
    };
    return Toolbar;
}(store_1.Proxy.Component));
exports.default = store_1.Proxy.connect(Toolbar)(function (state) { return ({ tab: state.tab }); });


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
var store_1 = __webpack_require__(30);
var Tree_1 = __webpack_require__(551);
var mui_1 = __webpack_require__(50);
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
                React.createElement(mui_1.default.Table, null,
                    React.createElement(mui_1.default.TableHead, null,
                        React.createElement(mui_1.default.TableRow, null, this.gridHeader())),
                    React.createElement(mui_1.default.TableBody, null, this.gridRows())))));
    };
    Grid.prototype.load = function (proxy) {
        if (!this.props.id) {
            return;
        }
        proxy.post('grid', { tree: this.props.id }).then(function (response) {
            store_1.Action.grid(response.data);
        });
    };
    Grid.prototype.gridColumns = function () {
        return (((this.props.grid || {}).metaData || {}).columns || []);
    };
    Grid.prototype.gridHeader = function () {
        return this.gridColumns().map(function (column, index) {
            return (React.createElement(mui_1.default.TableCell, { key: index }, column.text));
        });
    };
    Grid.prototype.selectRow = function (item) {
        var doctype = item._doctype || this.props.tree.refs[this.props.id]._doctype;
        store_1.Action.openContent({ doctype: doctype, id: item.id });
    };
    Grid.prototype.gridRows = function () {
        var _this = this;
        var data = this.gridColumns();
        var items = ((this.props.grid || {}).items || []);
        var row = function (item, index) {
            return data.map(function (column, subindex) { return (React.createElement(mui_1.default.TableCell, { key: index + "-" + subindex, onClick: function () { return _this.selectRow(item); } }, item[column.dataIndex])); });
        };
        return items.map(function (item, index) {
            return (React.createElement(mui_1.default.TableRow, { key: index }, row(item, index)));
        });
    };
    return Grid;
}(store_1.Proxy.Component));
exports.default = store_1.Proxy.connect(Grid)(function (state) { return ({ id: state.grid.id, grid: state.grid.data, tree: state.tree }); });


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
var store_1 = __webpack_require__(30);
var TreeNode_1 = __webpack_require__(552);
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
            store_1.Action.tree({ refs: refs, data: response.data });
        });
    };
    return Tree;
}(store_1.Proxy.Component));
exports.default = store_1.Proxy.connect(Tree)(function (state) { return ({ tree: state.tree.data }); });


/***/ }),

/***/ 552:
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
var store_1 = __webpack_require__(30);
var mui_1 = __webpack_require__(50);
var TreeNode = /** @class */ (function (_super) {
    __extends(TreeNode, _super);
    function TreeNode(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.props = props;
        return _this;
    }
    TreeNode.prototype.render = function () {
        return (React.createElement(mui_1.default.List, null, this.subNodes()));
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
            return (React.createElement(mui_1.default.ListItem, { button: true, key: node.id, onClick: function () { return _this.selectNode(node.id); } },
                React.createElement(mui_1.default.ListItemText, { inset: true, primary: node.text })));
        });
    };
    return TreeNode;
}(React.Component));
exports.TreeNode = TreeNode;


/***/ }),

/***/ 553:
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
var store_1 = __webpack_require__(30);
var fields_1 = __webpack_require__(554);
var mui_1 = __webpack_require__(50);
var Content = /** @class */ (function (_super) {
    __extends(Content, _super);
    function Content(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.props = props;
        return _this;
    }
    Content.prototype.render = function () {
        var content = this.props.content;
        if (!content || !content.data || !content.data.view) {
            return (React.createElement("div", { className: 'center' },
                React.createElement(mui_1.default.CircularProgress, { size: 128, thickness: 2 })));
        }
        return (React.createElement("div", { className: 'Content' },
            JSON.stringify(content.data),
            React.createElement(fields_1.default.Layout, { item: content.data.view })));
    };
    Content.prototype.load = function (proxy) {
        var _this = this;
        if (!this.props.content || !this.props.content.params) {
            return;
        }
        var params = this.props.content.params;
        proxy.post('content/get', { raw: true, _doctype: params.doctype, id: params.id }).then(function (response) {
            store_1.Action.content(_this.props.id, response.data);
        });
    };
    return Content;
}(store_1.Proxy.Component));
exports.default = store_1.Proxy.connect(Content)(function (state) { return ({ id: state.tab, content: state.content[state.tab || ''] }); });


/***/ }),

/***/ 554:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Layout_1 = __webpack_require__(555);
var DJEM = /** @class */ (function () {
    function DJEM() {
    }
    DJEM.Layout = Layout_1.default;
    return DJEM;
}());
exports.default = DJEM;


/***/ }),

/***/ 555:
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
var Layout = /** @class */ (function (_super) {
    __extends(Layout, _super);
    function Layout(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.props = props;
        return _this;
    }
    Layout.prototype.render = function () {
        var item = this.props.item;
        return (React.createElement("div", { className: this.className(item).concat(['djem-layout']).join(' '), style: this.styles(item) }, JSON.stringify(item)));
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
        var styles = {};
        if (item.flex) {
            styles.flex = +item.flex;
        }
        return styles;
    };
    return Layout;
}(React.Component));
exports.default = Layout;


/***/ }),

/***/ 84:
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
var store_1 = __webpack_require__(30);
var Action = /** @class */ (function () {
    function Action() {
    }
    Action.authorize = function (authorized) {
        return this.dispatch(function (state) { return (__assign({}, state, { login: __assign({}, state.login, { authorized: authorized }) })); });
    };
    Action.gridChange = function (id) {
        return this.dispatch(function (state) { return (__assign({}, state, { grid: __assign({}, state.grid, { id: id }) })); });
    };
    Action.openContent = function (params) {
        return this.dispatch(function (state) {
            var id = params.doctype + "--" + params.id;
            return __assign({}, state, { content: __assign({}, state.content, (_a = {}, _a[id] = { params: params, data: {} }, _a)), tab: id });
            var _a;
        });
    };
    Action.tabChange = function (tab) {
        return this.dispatch(function (state) { return (__assign({}, state, { tab: tab })); });
    };
    // load data
    Action.grid = function (data) {
        return this.dispatch(function (state) { return (__assign({}, state, { grid: __assign({}, state.grid, { data: data }) })); });
    };
    Action.tree = function (tree) {
        return this.dispatch(function (state) { return (__assign({}, state, { tree: tree })); });
    };
    Action.content = function (id, data) {
        return this.dispatch(function (state) {
            return (__assign({}, state, { content: __assign({}, state.content, (_a = {}, _a[id] = __assign({}, state.content[id], { data: data }), _a)) }));
            var _a;
        });
    };
    // dispatch helper
    Action.dispatch = function (type) {
        store_1.store.dispatch({ type: type });
    };
    return Action;
}());
exports.Action = Action;
function InitReducers(state, action) {
    if (typeof action.type == 'function') {
        return action.type(state);
    }
    return state;
}
exports.InitReducers = InitReducers;


/***/ })

},[209]);