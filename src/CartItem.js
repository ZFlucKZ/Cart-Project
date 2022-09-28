import React from 'react';
import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/fontawesome-free-solid';

fontawesome.library.add(faPlus, faMinus, faTrash);

class CartItem extends React.Component {
  render() {
    // console.log('this.props : ', this.props);
    const { price, title, qty } = this.props.product;
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
              onClick={() => this.props.onIncreaseQuantity(this.props.product)}
            />
            <FontAwesomeIcon
              icon="minus"
              className="action-icons"
              onClick={() => this.props.onDecreaseQuantity(this.props.product)}
            />
            <FontAwesomeIcon
              icon="trash"
              className="action-icons"
              onClick={() => this.props.onDeleteProduct(this.props.product.id)}
            />
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
