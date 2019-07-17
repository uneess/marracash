import React, { Component } from 'react'
import accounting from 'accounting';
import './styles/index.css';

export default class componentName extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      price_value: 0,
      price_shown: "",
      editing: false,
    }
  }
  
  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {

  }

  handlePriceChange(e) {
    const { value } = e.target;
    const { decimalSepartor } = this.props;

    this.setState({
      price_value: accounting.unformat(value, decimalSepartor),
      price_shown: value
    })
  }

  render() {
    const { price_shown } = this.state;

    return (
      <div>
        <input onChange={this.handlePriceChange.bind(this)} value={price_shown}/>
      </div>
    )
  }
}
