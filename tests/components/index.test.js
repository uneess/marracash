import React from 'react';
import renderer from "react-test-renderer";
import Marracash from '../../src';

describe("Price input component", () => {
  test("Matches the snapshot", () => {
    const component = renderer.create(<Marracash></Marracash>, );
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot();
  });
  
  test("Has default props", () => {
    const Component = renderer.create(<Marracash />);
    const testInstance = Component.root;

    const currency_object = {
      onChange: () => {},
      disabled: false,
      currency: {
        decimal: ",",
        thousand: ".",
        symbol: "€",
        precision: 2
      },
      showSymbol: true,
      defaultValue: 0,
      className: "vx-price-input",
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
    const Component = renderer.create(<Marracash defaultValue={1000} />);
    const testInstance = Component.root;

    expect(testInstance.findByType('input').props.value).toEqual("€10,00");
  })

  test("Input to have formatted default value if passed + showSymbol is false", () => {
    const Component = renderer.create(<Marracash defaultValue={1000} showSymbol={false} />);
    const testInstance = Component.root;

    expect(testInstance.findByType('input').props.value).toEqual("10,00");
  })

  test("Ability to pass styles and classname props to input", () => {
    const Component = renderer.create(<Marracash style={{borderRadius: 0}} className="price-input" />);
    const testInstance = Component.root;

    expect(testInstance.findByType('input').props.className).toEqual("price-input");
    expect(testInstance.findByType('input').props.style).toEqual({"borderRadius": 0});
  })

  test("Ability to override id", () => {
    const Component = renderer.create(<Marracash id="overriden-id" />);
    const testInstance = Component.root;

    expect(testInstance.findByType('input').props.id).toEqual("overriden-id");
  })

  test("Add placeholder", () => {
    const Component = renderer.create(<Marracash placeholder="Add value" />);
    const testInstance = Component.root;

    expect(testInstance.findByType('input').props.placeholder).toEqual("Add value");
  })

  test("Input to have disabled set to false", () => {
    const Component = renderer.create(<Marracash />);
    const testInstance = Component.root;

    expect(testInstance.findByType('input').props.disabled).toEqual(false);
  })

  test("Input to have disabled set to true", () => {
    const Component = renderer.create(<Marracash disabled={true} />);
    const testInstance = Component.root;

    expect(testInstance.findByType('input').props.disabled).toEqual(true);
  })

  test("Make sure disabled input doesn't accept user key input", () => {
    const Component = renderer.create(<Marracash disabled={true} defaultValue={1000}/>);
    const testInstance = Component.root;

    testInstance.findByType('input').props.onChange({ target: { value: "9"}});

    expect(testInstance.findByType('input').props.value).toEqual("€10,00");
  })

  test("Make sure enabled input accepts user key input", () => {
    const Component = renderer.create(<Marracash defaultValue={1000}/>);
    const testInstance = Component.root;

    testInstance.findByType('input').props.onChange({ target: { value: "9"}});

    expect(testInstance.findByType('input').props.value).toEqual("9");
  })
});
