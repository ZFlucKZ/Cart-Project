import React from 'react';
import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/fontawesome-free-solid';

fontawesome.library.add(faPlus, faMinus, faTrash);

class CartItem extends React.Component {
  constructor() {
    super();
    this.state = {
      price: 999,
      title: 'Phone',
      qty: 1,
      img: '',
    };
  }

  increasedQuantity = () => {
    // this.state.qty += 1;
    // console.log('this', this.state);

    // setState form 1
    // this.setState({
    //   qty: this.state.qty + 1,
    // });

    // setState form 2
    this.setState((prevState) => {
      return {
        qty: prevState.qty + 1,
      };
    });
  };

  render() {
    const { price, title, qty } = this.state;
    return (
      <div className="cart-item">
        <div className="left-block">
          <img style={styles.image} />
        </div>
        <div className="right-block">
          <div style={{ fontSize: 25 }}>{title}</div>
          <div style={{ color: '#777' }}>{price} Bath</div>
          <div style={{ color: '#777' }}>Qty: {qty}</div>
          <div className="cart-item-actions">
            {/* Buttons */}
            <FontAwesomeIcon
              icon="plus"
              className="action-icons"
              onClick={this.increasedQuantity}
            />
            <FontAwesomeIcon icon="minus" className="action-icons" />
            <FontAwesomeIcon icon="trash" className="action-icons" />
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  image: {
    height: 110,
    width: 110,
    borderRadius: 4,
  },
};

export default CartItem;
