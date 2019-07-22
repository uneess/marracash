import React, { Component } from 'react'
import accounting from 'accounting';
import PropTypes from 'prop-types';
import { getFormattedPrice } from './helpers';
import './styles/index.css'

export default class PriceInput extends Component {
  constructor(props, context) {
    super(props, context);

    const { defaultValue, showSymbol, currency } = props;

    this.state = {
      price_value: defaultValue,
      price_shown: getFormattedPrice(defaultValue, currency, showSymbol),
      editing: false,
    }

    this._handleFormatting = this._handleFormatting.bind(this);
  }

  UNSAFE_componentWillMount() {
    document.addEventListener('click', this._handleFormatting, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handleFormatting, false);
  }

  shouldComponentUpdate() {
    return true
  }

  _handleFormatting(e) {
    const { value } = this.input;

    // Value didn't change or the area clicked in is the same as input area will result in stopping the process
    if (this.input.contains(e.target)) return;

    const { currency, showSymbol } = this.props;
    const price_shown = getFormattedPrice(value, currency, showSymbol)

    if (value === price_shown) return;

    this.setState({
      price_shown
    })
  }

  handlePriceChange(e) {
    const { value } = e.target;
    const { currency: { decimal } } = this.props;

    const price_value = accounting.unformat(value, decimal);
    const price_shown = value;

    this.setState({
      price_value,
      price_shown
    });

    this.props.onChange(price_value * 100);
  }

  render() {
    const { price_shown } = this.state;
    const {
      className,
      style,
      id
    } = this.props;

    return (
      <div>
        <input
          style={style}
          className={className}
          id={id}
          ref={el => this.input = el}
          onChange={this.handlePriceChange.bind(this)}
          value={price_shown}
        />
      </div>
    )
  }
}

PriceInput.defaultProps = {
  onChange: () => {},
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
  style: {}
}

PriceInput.propTypes = {
  currency: PropTypes.object,
  onChange: PropTypes.func,
  showSymbol: PropTypes.bool,
  defaultValue: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
  id: PropTypes.string,
}