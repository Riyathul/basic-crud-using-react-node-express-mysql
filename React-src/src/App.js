import {
  BrowserRouter as Router,
  Route, Routes
} from 'react-router-dom';
import { useState } from 'react';
import AddProduct from './product/add-product';
import ViewProduct from "./product/view-product";

function App() {
  const [product, setProduct] = useState({});

  // Handler in Parent for Siblings communication
  const productHandler = (productFromViewProduct) => {
    console.log(JSON.stringify(productFromViewProduct));
    setProduct(productFromViewProduct);
  }
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<ViewProduct productHandler={productHandler} />}></Route>
        <Route path='/add' element={<AddProduct product={product} />}></Route>
      </Routes>
    </Router>

  );
}

export default App;
