import React from 'react';
import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/fontawesome-free-solid';

fontawesome.library.add(faPlus, faMinus, faTrash);

const CartItem = (props) => {
  // console.log('props : ', props);
  const { price, title, qty } = props.product;
  const { product, onIncreaseQuantity, onDecreaseQuantity, onDeleteProduct } =
    props;
  return (
    <div className="cart-item">
      <div className="left-block">
        <img style={styles.image} src={product.img} />
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
            onClick={() => onIncreaseQuantity(product)}
          />
          <FontAwesomeIcon
            icon="minus"
            className="action-icons"
            onClick={() => onDecreaseQuantity(product)}
          />
          <FontAwesomeIcon
            icon="trash"
            className="action-icons"
            onClick={() => onDeleteProduct(product.id)}
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  image: {
    height: 110,
    width: 110,
    borderRadius: 4,
    background: '#ccc',
  },
};

export default CartItem;
