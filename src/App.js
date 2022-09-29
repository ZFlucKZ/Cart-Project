import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBUZY9UVI57gMOTBMYi17BAFv5SYVDJ_8s',
  authDomain: 'cart-project-aa4f9.firebaseapp.com',
  databaseURL:
    'https://cart-project-aa4f9-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'cart-project-aa4f9',
  storageBucket: 'cart-project-aa4f9.appspot.com',
  messagingSenderId: '392074555845',
  appId: '1:392074555845:web:79686a846d5340e3b25bac',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    // Get a list of cities from your database
    const getData = async function (db) {
      const productsCol = collection(db, 'products');
      const productSnapshot = await getDocs(productsCol);
      const productList = productSnapshot.docs.map((doc) => {
        const data = doc.data();
        data['id'] = doc.id;
        return data;
      });
      // console.log(productList);
      return productList;
    };

    getData(db).then((data) =>
      this.setState({
        products: data,
      })
    );
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

  handleDeleteProduct = (id) => {
    const { products } = this.state;

    const items = products.filter((product) => product.id !== id);

    this.setState({
      products: items,
    });
  };

  getCartCount = () => {
    const { products } = this.state;
    let count = 0;

    products.forEach((product) => (count += product.qty));
    return count;
  };

  getCartTotal = () => {
    const { products } = this.state;
    let total = 0;

    products.forEach((product) => (total += product.qty * product.price));
    return total;
  };

  render() {
    const { products } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        <div>TOTAL : {this.getCartTotal()}</div>;
      </div>
    );
  }
}

export default App;
