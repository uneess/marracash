import accounting from 'accounting';

export const formatMoney = (price, { symbol, precision, thousand, decimal }) => {
  return accounting.formatMoney(price, symbol, precision, thousand, decimal);
}

export const formatNumber = (price, { precision, thousand, decimal }) => {
  return accounting.formatNumber(price, precision, thousand, decimal);
}

export const getFormattedPrice = (price, currency, show_symbol) => {
  const { decimal, precision } = currency;
  
  if (!price && price !== 0) return;
  if (typeof price === "number") price = price.toString();

  let is_formatted;
  if (precision === 0) {
    is_formatted = price.includes(".") || price.includes(",");
  } else {
    is_formatted = price.includes(".") && price.includes(",");
  }

  const unformatted_price = is_formatted ? accounting.unformat(price.replace(/-/g, ""), decimal) : price.replace(`,`, `.`).replace(/-/g, "");

  return show_symbol ? formatMoney(unformatted_price, currency) : formatNumber(unformatted_price, currency)
}