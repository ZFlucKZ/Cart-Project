import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import db from './firebase';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true,
    };
  }

  componentDidMount() {
    const self = this;
    // Get a list of products from your database
    const getData = async function (db) {
      let productList;
      const productsCol = collection(db, 'products');

      // Query the Data
      // const queryPrice = query(productsCol, where('price', '>', 1));
      const orderByPrice = query(productsCol, orderBy('price', 'desc'));

      onSnapshot(orderByPrice, (snapshot) => {
        productList = snapshot.docs.map((doc) => {
          const data = doc.data();
          data['id'] = doc.id;
          return data;
        });

        self.setState({
          products: productList,
          loading: false,
        });
      });
    };
    getData(db);
  }

  handleIncreaseQuantity = (product) => {
    // console.log(product);
    const { products } = this.state;
    // console.log(products);
    const index = products.indexOf(product);

    const docRef = doc(db, 'products', products[index].id);
    // console.log(docRef);
    let data = {
      qty: products[index].qty + 1,
    };

    updateDoc(docRef, data);
  };

  handleDecreaseQuantity = (product) => {
    // console.log(product);
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }

    const docRef = doc(db, 'products', products[index].id);
    let data = {
      qty: products[index].qty - 1,
    };

    updateDoc(docRef, data);
  };

  handleDeleteProduct = (id) => {
    const docRef = doc(db, 'products', id);

    deleteDoc(docRef);
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

  addProduct = async () => {
    const productsCol = collection(db, 'products');
    const newProduct = await addDoc(productsCol, {
      title: 'Pen',
      price: 15,
      qty: 1,
      img: '',
    });
    // console.log(newProduct);
    return;
  };

  render() {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <button onClick={this.addProduct} style={{ padding: 20, fontSize: 20 }}>
          Add a Product
        </button>
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        {loading && <h1>Loading Products...</h1>}
        <div style={{ padding: 10, fontSize: 20 }}>
          TOTAL : {this.getCartTotal()}
        </div>
        ;
      </div>
    );
  }
}

export default App;
