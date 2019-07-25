import React, { Component } from 'react'
import accounting from 'accounting';
import PropTypes from 'prop-types';
import { getFormattedPrice } from './helpers';
import { isNumber } from './helpers/utils';
import './styles/index.css'

export default class PriceInput extends Component {
  constructor(props, context) {
    super(props, context);

    const { defaultValue, showSymbol, currency } = props;
    const value = isNumber(defaultValue) ? defaultValue / 100 : 0;

    this.state = {
      price_value: value,
      price_shown: getFormattedPrice(value, currency, showSymbol),
      editing: false,
    }

    this._handleFormatting = this._handleFormatting.bind(this);
  }

  UNSAFE_componentWillMount() {
    // listening for a click outside the input
    document.addEventListener('click', this._handleFormatting, false);
  }

  componentWillUnmount() {
    // Unregistering event listener
    document.removeEventListener('click', this._handleFormatting, false);
  }

  UNSAFE_componentWillReceiveProps(newProps){
    if (!newProps.defaultValue && !isNumber(newProps.defaultValue)) {
      this.setState({
        price_value: 0,
        price_shown: ''
      })
    }
  }

  _handleFormatting(e) {
    let { value } = this.input;
    // Value didn't change or the area clicked in is the same as input area will result in stopping the process
    if (this.input.contains(e.target)) return;

    const { currency, showSymbol, allowEmpty } = this.props;

    if (!allowEmpty && !value && value !== 0){
      value = 0;
    }

    const price_shown = getFormattedPrice(value, currency, showSymbol)

    if (value === price_shown) return;

    this.setState({
      price_shown
    })
  }

  handlePriceChange(e) {
    // Price value gets unformated and updated in the state
    // Price_shown remains if not empty
    // AllowEmpty === true and value is '' will result in empty input value 
    // AllowEmpty === true and value is ' ' will result in $0.00 after clicking outside the input

    const { value } = e.target;
    const { currency } = this.props;

    const price_value = accounting.unformat(value, currency.decimal);
    const price_shown = value;

    this.setState({
      price_value,
      price_shown
    });

    // send event via prop
    this.props.onChange(price_value * 100);
  }

  render() {
    const { price_shown } = this.state;
    const {
      className,
      style,
      id,
      placeholder
    } = this.props;

    return <input
      style={style}
      placeholder={placeholder}
      className={className}
      id={id}
      ref={el => this.input = el}
      onChange={this.handlePriceChange.bind(this)}
      value={price_shown}
    />
  }
}

PriceInput.defaultProps = {
  onChange: () => { },
  currency: {
    decimal: ",",
    thousand: ".",
    symbol: "€",
    precision: 2
  },
  showSymbol: true,
  defaultValue: 0,
  className: "",
  id: "vx-price-input",
  style: {},
  placeholder: "",
  allowEmpty: true
}

PriceInput.propTypes = {
  currency: PropTypes.object,
  onChange: PropTypes.func,
  showSymbol: PropTypes.bool,
  defaultValue: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  allowEmpty: PropTypes.bool,
}