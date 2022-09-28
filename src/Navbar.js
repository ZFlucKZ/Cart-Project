import React from 'react';
import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/fontawesome-free-solid';

fontawesome.library.add(faCartPlus);

const Navbar = (props) => {
  // console.log(props);
  return (
    <div style={styles.nav}>
      <div style={styles.cartIconContainer}>
        <FontAwesomeIcon icon="cart-plus" style={styles.cartIcon} />
        <span style={styles.cartCount}>{props.count}</span>
      </div>
    </div>
  );
};

const styles = {
  nav: {
    height: 70,
    background: '#4267b2',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cartIcon: {
    height: 32,
    marginRight: 20,
  },
  cartIconContainer: {
    position: 'relative',
  },
  cartCount: {
    background: 'yellow',
    borderRadius: '50%',
    padding: '4px 8px',
    position: 'absolute',
    right: 0,
    top: -9,
  },
};

export default Navbar;
