import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import accounting from "accounting";
import { getFormattedPrice } from "./helpers";
import useDebounce from "./helpers/useDebounce";
import "./styles/index.css";

function Marracash(props) {
  const {
    className,
    style,
    placeholder,
    defaultValue,
    currency,
    showSymbol
  } = props;
  const [price_shown, setPriceShown] = useState(
    getFormattedPrice(defaultValue, currency, showSymbol)
  );

  const debouncedSearchTerm = useDebounce(price_shown, 1000);
  const getReturnedPrice = (val, decimal) => {
    if (!val) return 0;
    return parseFloat((accounting.unformat(val, decimal) * 100).toFixed(2));
  };

  const _handleFormatting = () => {
    const { currency, showSymbol, allowEmpty } = props;

    let value = price_shown;

    if (!allowEmpty && !value && value !== 0) {
      value = 0;
    }

    const newPriceShown = getFormattedPrice(value, currency, showSymbol);

    if (value === newPriceShown) return;

    setPriceShown(newPriceShown);
  };

  const handlePriceChange = value => {
    const { currency } = props;

    props.onChange(getReturnedPrice(value, currency.decimal));
  };

  const isPriceFormatted = v => {
    const newPrice = getFormattedPrice(
      accounting.unformat(v, currency.decimal),
      currency,
      showSymbol
    );

    return {
      isFormatted: v.includes(currency.symbol),
      reformat: newPrice !== v
    };
  };

  useEffect(() => {
    const { isFormatted, reformat } = isPriceFormatted(debouncedSearchTerm);

    if (!isFormatted || reformat) {
      _handleFormatting(
        reformat
          ? getReturnedPrice(debouncedSearchTerm, currency.decimal)
          : null
      );
    } else {
      handlePriceChange(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      style={style}
      placeholder={placeholder}
      className={className}
      onChange={({ target: { value } }) => setPriceShown(value)}
      value={price_shown}
    />
  );
}

Marracash.defaultProps = {
  onChange: () => {},
  currency: {
    decimal: ",",
    thousand: ".",
    symbol: "€",
    precision: 2
  },
  showSymbol: true,
  defaultValue: 0,
  className: "vx-price-input",
  style: {},
  placeholder: "",
  allowEmpty: true
};

Marracash.propTypes = {
  currency: PropTypes.object,
  onChange: PropTypes.func,
  showSymbol: PropTypes.bool,
  defaultValue: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  allowEmpty: PropTypes.bool
};

export default Marracash;
