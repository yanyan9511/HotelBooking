"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

var DisplayHomepage = /*#__PURE__*/function (_React$Component) {
  _inherits(DisplayHomepage, _React$Component);

  var _super = _createSuper(DisplayHomepage);

  function DisplayHomepage() {
    _classCallCheck(this, DisplayHomepage);

    return _super.apply(this, arguments);
  }

  _createClass(DisplayHomepage, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
        className: "textstyle"
      }, "We are able to host maximum 25 guests. Current number of free slots are:"));
    }
  }]);

  return DisplayHomepage;
}(React.Component);

var CustomerRow = /*#__PURE__*/function (_React$Component2) {
  _inherits(CustomerRow, _React$Component2);

  var _super2 = _createSuper(CustomerRow);

  function CustomerRow() {
    _classCallCheck(this, CustomerRow);

    return _super2.apply(this, arguments);
  }

  _createClass(CustomerRow, [{
    key: "render",
    value: function render() {
      var customer = this.props.customer;
      return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, customer.sn_id), /*#__PURE__*/React.createElement("td", null, customer.name), /*#__PURE__*/React.createElement("td", null, customer.contact), /*#__PURE__*/React.createElement("td", null, customer.created.toDateString()));
    }
  }]);

  return CustomerRow;
}(React.Component);

var CustomerTable = /*#__PURE__*/function (_React$Component3) {
  _inherits(CustomerTable, _React$Component3);

  var _super3 = _createSuper(CustomerTable);

  function CustomerTable() {
    _classCallCheck(this, CustomerTable);

    return _super3.apply(this, arguments);
  }

  _createClass(CustomerTable, [{
    key: "render",
    value: function render() {
      var customerRows = this.props.customers.map(function (customer) {
        return /*#__PURE__*/React.createElement(CustomerRow, {
          key: customer.sn_id,
          customer: customer
        });
      });
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, "Cusrrent Reservations"), /*#__PURE__*/React.createElement("table", {
        className: "bordered-table"
      }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Customer ID"), /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Contact"), /*#__PURE__*/React.createElement("th", null, "Timestamp"))), /*#__PURE__*/React.createElement("tbody", null, customerRows)));
    }
  }]);

  return CustomerTable;
}(React.Component);

var RemoveCustomer = /*#__PURE__*/function (_React$Component4) {
  _inherits(RemoveCustomer, _React$Component4);

  var _super4 = _createSuper(RemoveCustomer);

  function RemoveCustomer() {
    var _this;

    _classCallCheck(this, RemoveCustomer);

    _this = _super4.call(this);
    _this.handleRemove = _this.handleRemove.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(RemoveCustomer, [{
    key: "handleRemove",
    value: function handleRemove(e) {
      e.preventDefault();
      var form = document.forms.CustomerAdd;
      var customer = {
        name: form.name.value,
        contact: form.contact.value
      };
      this.props.deleteCustomer(customer);
      form.name.value = "";
      form.contact.value = "";
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
        className: "removebutton",
        onClick: this.handleRemove
      }, "Remove"));
    }
  }]);

  return RemoveCustomer;
}(React.Component);

var AddCustomer = /*#__PURE__*/function (_React$Component5) {
  _inherits(AddCustomer, _React$Component5);

  var _super5 = _createSuper(AddCustomer);

  function AddCustomer() {
    var _this2;

    _classCallCheck(this, AddCustomer);

    _this2 = _super5.call(this);
    _this2.handleSubmit = _this2.handleSubmit.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  _createClass(AddCustomer, [{
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var form = document.forms.CustomerAdd;
      var customer = {
        name: form.name.value,
        contact: form.contact.value
      };
      this.props.createCustomer(customer);
      form.name.value = "";
      form.contact.value = "";
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, "Make/Cancel a reservation by submitting/removing your informaiton"), /*#__PURE__*/React.createElement("form", {
        name: "CustomerAdd",
        onSubmit: this.handleSubmit
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "name",
        placeholder: "Name",
        className: "input"
      }), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "contact",
        placeholder: "Contact",
        className: "input"
      }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
        className: "submitbutton"
      }, "Submit"))));
    }
  }]);

  return AddCustomer;
}(React.Component);

var DisplayFreeSlots = /*#__PURE__*/function (_React$Component6) {
  _inherits(DisplayFreeSlots, _React$Component6);

  var _super6 = _createSuper(DisplayFreeSlots);

  function DisplayFreeSlots() {
    _classCallCheck(this, DisplayFreeSlots);

    return _super6.apply(this, arguments);
  }

  _createClass(DisplayFreeSlots, [{
    key: "render",
    value: function render() {
      var number_slot = this.props.freeslot;
      console.log(number_slot);
      return /*#__PURE__*/React.createElement("div", {
        className: "number_style"
      }, number_slot);
    }
  }]);

  return DisplayFreeSlots;
}(React.Component);

var ErrorHandling = /*#__PURE__*/function (_React$Component7) {
  _inherits(ErrorHandling, _React$Component7);

  var _super7 = _createSuper(ErrorHandling);

  function ErrorHandling() {
    _classCallCheck(this, ErrorHandling);

    return _super7.apply(this, arguments);
  }

  _createClass(ErrorHandling, [{
    key: "render",
    value: function render() {
      var error = this.props.errorMsg;
      return /*#__PURE__*/React.createElement("div", {
        className: "error_style"
      }, error);
    }
  }]);

  return ErrorHandling;
}(React.Component);

var Hotelpage = /*#__PURE__*/function (_React$Component8) {
  _inherits(Hotelpage, _React$Component8);

  var _super8 = _createSuper(Hotelpage);

  function Hotelpage() {
    var _this3;

    _classCallCheck(this, Hotelpage);

    _this3 = _super8.call(this);
    _this3.state = {
      customers: [],
      freeslot: 25,
      errorMsg: ""
    };
    _this3.createCustomer = _this3.createCustomer.bind(_assertThisInitialized(_this3));
    _this3.deleteCustomer = _this3.deleteCustomer.bind(_assertThisInitialized(_this3));
    return _this3;
  }

  _createClass(Hotelpage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "loadData",
    value: function () {
      var _loadData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var query, response, body, result, num_guest;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = "query {\n      customerList {\n        sn_id name contact\n        created\n      }\n    }";
                _context.next = 3;
                return fetch('/graphql', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    query: query
                  })
                });

              case 3:
                response = _context.sent;
                _context.next = 6;
                return response.text();

              case 6:
                body = _context.sent;
                result = JSON.parse(body, jsonDateReviver);
                num_guest = result.data.customerList.length;
                this.setState({
                  customers: result.data.customerList,
                  freeslot: 25 - num_guest
                });

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadData() {
        return _loadData.apply(this, arguments);
      }

      return loadData;
    }()
  }, {
    key: "createCustomer",
    value: function () {
      var _createCustomer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(customer) {
        var newerrorMsg, query, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(this.state.customers.filter(function (e) {
                  return e.name === customer.name;
                }).length > 0)) {
                  _context2.next = 6;
                  break;
                }

                newerrorMsg = this.state.errorMsg;
                newerrorMsg = 'Sorry, guest already registered!';
                this.setState({
                  errorMsg: newerrorMsg
                });
                _context2.next = 26;
                break;

              case 6:
                if (!(customer.name == '')) {
                  _context2.next = 12;
                  break;
                }

                newerrorMsg = this.state.errorMsg;
                newerrorMsg = 'Sorry, cannot submit empty!';
                this.setState({
                  errorMsg: newerrorMsg
                });
                _context2.next = 26;
                break;

              case 12:
                if (!(this.state.customers.length >= 25)) {
                  _context2.next = 18;
                  break;
                }

                newerrorMsg = this.state.errorMsg;
                newerrorMsg = 'Sorry, no more slot!';
                this.setState({
                  errorMsg: newerrorMsg
                });
                _context2.next = 26;
                break;

              case 18:
                query = "mutation {\n            customerAdd(customer:{\n              name: \"".concat(customer.name, "\",\n              contact: \"").concat(customer.contact, "\",\n            }) {\n              sn_id\n            }\n          }");
                _context2.next = 21;
                return fetch('/graphql', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    query: query
                  })
                });

              case 21:
                response = _context2.sent;
                newerrorMsg = this.state.errorMsg;
                newerrorMsg = "Reservation successfully added!";
                this.setState({
                  errorMsg: newerrorMsg
                });
                this.loadData();

              case 26:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function createCustomer(_x) {
        return _createCustomer.apply(this, arguments);
      }

      return createCustomer;
    }()
  }, {
    key: "deleteCustomer",
    value: function () {
      var _deleteCustomer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(customer) {
        var query, newerrorMsg;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(this.state.customers.filter(function (e) {
                  return e.name === customer.name;
                }).length > 0)) {
                  _context3.next = 10;
                  break;
                }

                query = "mutation {\n        customerRemove(customer:{\n          name: \"".concat(customer.name, "\",\n          contact: \"").concat(customer.contact, "\",\n        }) {\n          sn_id\n        }\n      }");
                _context3.next = 4;
                return fetch('/graphql', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    query: query
                  })
                });

              case 4:
                newerrorMsg = this.state.errorMsg;
                newerrorMsg = "Entry successfully removed!";
                this.setState({
                  errorMsg: newerrorMsg
                });
                this.loadData();
                _context3.next = 13;
                break;

              case 10:
                newerrorMsg = this.state.errorMsg;
                newerrorMsg = "Sorry, entry not found!";
                this.setState({
                  errorMsg: newerrorMsg
                });

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function deleteCustomer(_x2) {
        return _deleteCustomer.apply(this, arguments);
      }

      return deleteCustomer;
    }()
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: "mainpage"
      }, /*#__PURE__*/React.createElement("h1", null, "Welcome to Hotel California!"), /*#__PURE__*/React.createElement(DisplayHomepage, null), /*#__PURE__*/React.createElement(DisplayFreeSlots, {
        freeslot: this.state.freeslot
      }), /*#__PURE__*/React.createElement(AddCustomer, {
        createCustomer: this.createCustomer
      }), /*#__PURE__*/React.createElement(RemoveCustomer, {
        deleteCustomer: this.deleteCustomer
      }), /*#__PURE__*/React.createElement(ErrorHandling, {
        errorMsg: this.state.errorMsg
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(CustomerTable, {
        customers: this.state.customers
      })));
    }
  }]);

  return Hotelpage;
}(React.Component);

var element = /*#__PURE__*/React.createElement(Hotelpage, null);
ReactDOM.render(element, document.getElementById('contents'));