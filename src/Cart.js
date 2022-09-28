import React from 'react';
import CartItem from './CartItem';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [
        {
          price: 999,
          title: 'Phone',
          qty: 1,
          img: '',
        },
        {
          price: 99,
          title: 'Watch',
          qty: 10,
          img: '',
        },
        {
          price: 999,
          title: 'Mobile',
          qty: 4,
          img: '',
        },
      ],
    };
  }

  handleIncreaseQuantity = (product) => {
    // console.log(product);
    const { products } = this.state;
    const index = products.indexOf(product);

    products[index].qty += 1;

    this.setState({
      products,
    });
  };

  handleDecreaseQuantity = (product) => {
    // console.log(product);
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }

    products[index].qty -= 1;

    this.setState({
      products,
    });
  };

  render() {
    const { products } = this.state;
    return (
      <div className="cart">
        {products.map((product) => {
          return (
            <CartItem
              product={product}
              key={product.id}
              onIncreaseQuantity={this.handleIncreaseQuantity}
              onDecreaseQuantity={this.handleDecreaseQuantity}
            />
          );
        })}
      </div>
    );
  }
}

export default Cart;
