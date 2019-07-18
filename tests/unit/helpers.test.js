import {expect} from 'chai';
import { getFormattedPrice, formatMoney, formatNumber } from '../../src/helpers';

const eur = {
  code: "EUR",
  decimal: ",",
  precision: 2,
  symbol: "€",
  thousand: "."
}
const usd = {
  code: "USD",
  decimal: ".",
  precision: 2,
  symbol: "$",
  thousand: ","
}

const jpy = {
  code: "JPY",
  decimal: ".",
  precision: 0,
  symbol: "¥",
  thousand: ",",
}

describe('Helpers: getFormattedPrice', () => {
  it("should return 1.50", () => {
    const price = getFormattedPrice("1,5", usd);
    expect(price).to.equal("1.50");
  }) 

  it("should return 150.00", () => {
    const price = getFormattedPrice("150", usd);
    expect(price).to.equal("150.00");
  }) 

  it("should return 1.00", () => {
    const price = getFormattedPrice("1,000", usd);
    expect(price).to.equal("1.00");
  }) 

  it("should return 1,000.00", () => {
    const price = getFormattedPrice("1000", usd);
    expect(price).to.equal("1,000.00");
  }) 

  it("should return 12,030.51", () => {
    const price = getFormattedPrice("12,030.51", usd);
    expect(price).to.equal("12,030.51");
  }) 
  
  it("should return 12,030.51", () => {
    const price = getFormattedPrice("12asdasd,030.51", usd);
    expect(price).to.equal("12,030.51");
  }) 

  it("should return 1,50", () => {
    const price = getFormattedPrice("1.5", eur);
    expect(price).to.equal("1,50");
  }) 

  it("should return 150,00", () => {
    const price = getFormattedPrice("150", eur);
    expect(price).to.equal("150,00");
  }) 

  it("should return 1,00", () => {
    const price = getFormattedPrice("1.000", eur);
    expect(price).to.equal("1,00");
  }) 

  it("should return 1.000,00", () => {
    const price = getFormattedPrice("1000", eur);
    expect(price).to.equal("1.000,00");
  }) 
  
  it("should return 12.030,51", () => {
    const price = getFormattedPrice("12.030,51", eur);
    expect(price).to.equal("12.030,51");
  }) 

  it("should return 12.030,51", () => {
    const price = getFormattedPrice("12sadasd.030,51", eur);
    expect(price).to.equal("12.030,51");
  }) 

  it("should return 0,00", () => {
    const price = getFormattedPrice(",,223.54", eur);
    expect(price).to.equal("0,00");
  }) 

  it("should return 23,00", () => {
    const price = getFormattedPrice("0023", eur);
    expect(price).to.equal("23,00");
  }) 

  it("should return 1", () => {
    const price = getFormattedPrice("1.00", jpy);
    expect(price).to.equal("1");
  }) 

  it("should return 12,234,233", () => {
    const price = getFormattedPrice("12234233", jpy);
    expect(price).to.equal("12,234,233");
  }) 

  it("should return 1", () => {
    const price = getFormattedPrice("1.000,00", jpy);
    expect(price).to.equal("1");
  }) 
  
  it("should return 150", () => {
    const price = getFormattedPrice("1,50", jpy);
    expect(price).to.equal("150");
  }) 

  it("should return 12,031", () => {
    const price = getFormattedPrice("12asdasd,030.51", jpy);
    expect(price).to.equal("12,031");
  }) 
})

describe('Helpers: formatMoney', () => {
  it("Should get price formatted with symbol", () => {
    expect(formatMoney(10, usd)).to.equal("$10.00");
  })
})

describe('Helpers: formatNumber', () => {
  it("Should get price formatted with no symbol", () => {
    expect(formatNumber(10, usd)).to.equal("10.00");
  })
})
