"use strict";function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(exports,"__esModule",{value:!0});var React=require("react"),React__default=_interopDefault(React),PropTypes=_interopDefault(require("prop-types"));function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),e}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _possibleConstructorReturn(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?_assertThisInitialized(e):t}function createCommonjsModule(e,t){return e(t={exports:{}},t.exports),t.exports}var accounting=createCommonjsModule(function(e,t){!function(r,n){var o={version:"0.4.1",settings:{currency:{symbol:"$",format:"%s%v",decimal:".",thousand:",",precision:2,grouping:3},number:{precision:0,grouping:3,thousand:",",decimal:"."}}},a=Array.prototype.map,i=Array.isArray,u=Object.prototype.toString;function c(e){return!!(""===e||e&&e.charCodeAt&&e.substr)}function s(e){return i?i(e):"[object Array]"===u.call(e)}function l(e){return e&&"[object Object]"===u.call(e)}function p(e,t){var r;for(r in e=e||{},t=t||{})t.hasOwnProperty(r)&&null==e[r]&&(e[r]=t[r]);return e}function f(e,t,r){var n,o,i=[];if(!e)return i;if(a&&e.map===a)return e.map(t,r);for(n=0,o=e.length;n<o;n++)i[n]=t.call(r,e[n],n,e);return i}function m(e,t){return e=Math.round(Math.abs(e)),isNaN(e)?t:e}function h(e){var t=o.settings.currency.format;return"function"==typeof e&&(e=e()),c(e)&&e.match("%v")?{pos:e,neg:e.replace("-","").replace("%v","-%v"),zero:e}:e&&e.pos&&e.pos.match("%v")?e:c(t)?o.settings.currency.format={pos:t,neg:t.replace("%v","-%v"),zero:t}:t}var d=o.unformat=o.parse=function(e,t){if(s(e))return f(e,function(e){return d(e,t)});if("number"==typeof(e=e||0))return e;t=t||o.settings.number.decimal;var r=new RegExp("[^0-9-"+t+"]",["g"]),n=parseFloat((""+e).replace(/\((.*)\)/,"-$1").replace(r,"").replace(t,"."));return isNaN(n)?0:n},y=o.toFixed=function(e,t){t=m(t,o.settings.number.precision);var r=Math.pow(10,t);return(Math.round(o.unformat(e)*r)/r).toFixed(t)},g=o.formatNumber=o.format=function(e,t,r,n){if(s(e))return f(e,function(e){return g(e,t,r,n)});e=d(e);var a=p(l(t)?t:{precision:t,thousand:r,decimal:n},o.settings.number),i=m(a.precision),u=e<0?"-":"",c=parseInt(y(Math.abs(e||0),i),10)+"",h=c.length>3?c.length%3:0;return u+(h?c.substr(0,h)+a.thousand:"")+c.substr(h).replace(/(\d{3})(?=\d)/g,"$1"+a.thousand)+(i?a.decimal+y(Math.abs(e),i).split(".")[1]:"")},b=o.formatMoney=function(e,t,r,n,a,i){if(s(e))return f(e,function(e){return b(e,t,r,n,a,i)});e=d(e);var u=p(l(t)?t:{symbol:t,precision:r,thousand:n,decimal:a,format:i},o.settings.currency),c=h(u.format);return(e>0?c.pos:e<0?c.neg:c.zero).replace("%s",u.symbol).replace("%v",g(Math.abs(e),m(u.precision),u.thousand,u.decimal))};o.formatColumn=function(e,t,r,n,a,i){if(!e)return[];var u=p(l(t)?t:{symbol:t,precision:r,thousand:n,decimal:a,format:i},o.settings.currency),y=h(u.format),b=y.pos.indexOf("%s")<y.pos.indexOf("%v"),v=0,_=f(e,function(e,t){if(s(e))return o.formatColumn(e,u);var r=((e=d(e))>0?y.pos:e<0?y.neg:y.zero).replace("%s",u.symbol).replace("%v",g(Math.abs(e),m(u.precision),u.thousand,u.decimal));return r.length>v&&(v=r.length),r});return f(_,function(e,t){return c(e)&&e.length<v?b?e.replace(u.symbol,u.symbol+new Array(v-e.length+1).join(" ")):new Array(v-e.length+1).join(" ")+e:e})},e.exports&&(t=e.exports=o),t.accounting=o}()}),accounting_1=accounting.accounting,formatMoney=function(e,t){var r=t.symbol,n=t.precision,o=t.thousand,a=t.decimal;return accounting.formatMoney(e,r,n,o,a)},formatNumber=function(e,t){var r=t.precision,n=t.thousand,o=t.decimal;return accounting.formatNumber(e,r,n,o)},getFormattedPrice=function(e,t,r){var n=t.decimal,o=t.precision;if(e||0===e){"number"==typeof e&&(e=e.toString());var a=(0===o?e.includes(".")||e.includes(","):e.includes(".")&&e.includes(","))?accounting.unformat(e.replace(/-/g,""),n):e.replace(",",".").replace(/-/g,"");return r?formatMoney(a,t):formatNumber(a,t)}},isNumber=function(e){return!isNaN(parseInt(e))},PriceInput=function(e){function t(e,r){var n;_classCallCheck(this,t),n=_possibleConstructorReturn(this,_getPrototypeOf(t).call(this,e,r));var o=e.defaultValue,a=e.showSymbol,i=e.currency,u=isNumber(o)?o/100:0;return n.state={price_value:u,price_shown:getFormattedPrice(u,i,a),editing:!1},n._handleFormatting=n._handleFormatting.bind(_assertThisInitialized(n)),n}return _inherits(t,React.Component),_createClass(t,[{key:"UNSAFE_componentWillMount",value:function(){document.addEventListener("click",this._handleFormatting,!1)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("click",this._handleFormatting,!1)}},{key:"UNSAFE_componentWillReceiveProps",value:function(e){e.defaultValue||isNumber(e.defaultValue)||this.setState({price_value:0,price_shown:""})}},{key:"_handleFormatting",value:function(e){var t=this.input.value;if(!this.input.contains(e.target)){var r=this.props,n=r.currency,o=r.showSymbol;r.allowEmpty||t||0===t||(t=0);var a=getFormattedPrice(t,n,o);t!==a&&this.setState({price_shown:a})}}},{key:"handlePriceChange",value:function(e){var t=e.target.value,r=this.props.currency,n=accounting.unformat(t,r.decimal),o=t;this.setState({price_value:n,price_shown:o}),this.props.onChange(100*n)}},{key:"render",value:function(){var e=this,t=this.state.price_shown,r=this.props,n=r.className,o=r.style,a=r.id,i=r.placeholder;return React__default.createElement("input",{style:o,placeholder:i,className:n,id:a,ref:function(t){return e.input=t},onChange:this.handlePriceChange.bind(this),value:t})}}]),t}();PriceInput.defaultProps={onChange:function(){},currency:{decimal:",",thousand:".",symbol:"€",precision:2},showSymbol:!0,defaultValue:0,className:"",id:"vx-price-input",style:{},placeholder:"",allowEmpty:!0},PriceInput.propTypes={currency:PropTypes.object,onChange:PropTypes.func,showSymbol:PropTypes.bool,defaultValue:PropTypes.number,className:PropTypes.string,style:PropTypes.object,id:PropTypes.string,placeholder:PropTypes.string,allowEmpty:PropTypes.bool},exports.default=PriceInput;
