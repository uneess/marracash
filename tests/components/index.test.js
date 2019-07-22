import React from 'react';
import renderer from "react-test-renderer";
import PriceInput from '../../src';

describe("Price input component", () => {  
  test("Matches the snapshot", () => {
    const component = renderer.create(<PriceInput></PriceInput>, );
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot();
  });
  
  test("Has default props", () => {
    const Component = renderer.create(<PriceInput />);
    const testInstance = Component.root;

    const currency_object = {
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

    expect(testInstance.props.currency).toEqual(currency_object.currency);
    expect(testInstance.props.showSymbol).toEqual(currency_object.showSymbol);
    expect(testInstance.props.defaultValue).toEqual(currency_object.defaultValue);
    expect(testInstance.props.className).toEqual(currency_object.className);
    expect(testInstance.props.id).toEqual(currency_object.id);
    expect(testInstance.props.style).toEqual(currency_object.style);
  });

  test("Input to have formatted default value if passed", () => {
    const Component = renderer.create(<PriceInput defaultValue={1000} />);
    const testInstance = Component.root;

    expect(testInstance.findByType('input').props.value).toEqual("€10,00");
  })

  test("Input to have formatted default value if passed + showSymbol is false", () => {
    const Component = renderer.create(<PriceInput defaultValue={1000} showSymbol={false} />);
    const testInstance = Component.root;

    expect(testInstance.findByType('input').props.value).toEqual("10,00");
  })

  test("Ability to pass styles and classname props to input", () => {
    const Component = renderer.create(<PriceInput style={{borderRadius: 0}} className="price-input" />);
    const testInstance = Component.root;

    expect(testInstance.findByType('input').props.className).toEqual("price-input");
    expect(testInstance.findByType('input').props.style).toEqual({"borderRadius": 0});
  })

  test("Ability to override id", () => {
    const Component = renderer.create(<PriceInput id="overriden-id" />);
    const testInstance = Component.root;

    expect(testInstance.findByType('input').props.id).toEqual("overriden-id");
  })
});