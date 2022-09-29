import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
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
      var productList;
      const productsCol = collection(db, 'products');
      onSnapshot(productsCol, (snapshot) => {
        productList = snapshot.docs.map((doc) => {
          const data = doc.data();
          data['id'] = doc.id;
          return data;
        });
        console.log(productList);
        self.setState({
          products: productList,
          loading: false,
        });
      });
    };
    getData(db);
    // getData(db).then((data) => {
    //   console.log(data);
    //   this.setState({
    //     products: data,
    //     loading: false,
    //   });
    // });
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
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
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
