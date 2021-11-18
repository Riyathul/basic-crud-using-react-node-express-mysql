import { useNavigate } from "react-router-dom";
import '../App.css';
import { useState, useEffect } from 'react';
import { CONSTANTS } from '../Constants';

function ViewProduct(props) {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    // Fetch all available products from DB
    useEffect(() => {
        let isMounted = true;
        fetch(
            CONSTANTS.BASE_URL + "/getProducts")
            .then((res) => res.json())
            .then((json) => {
                if (isMounted)
                    setProducts(json);
            })
        return () => { isMounted = false };
    });

    // call parent handler and Navigate to add new product screen
    function goToNewProduct() {
        props.productHandler({});
        navigate('/add');
    }

    // call parent handler and Navigate to update product screen
    function updateProduct(product) {
        props.productHandler(product);
        navigate('/add');
    }

    // Returns readable date format - DD/MM/YYYY
    function getFormattedDate(dateStr) {
        const date = new Date(dateStr);
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    }
    return (

        <div className="App">
            <h1>Available Products</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID </th>
                        <th>Name </th>
                        <th>Price</th>
                        <th>Created On</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        products.map((product, index) => (
                            <tr key={product.id}>
                                <td>{index + 1}</td>
                                <td><span style={{ cursor: 'pointer', textDecorationLine: 'underline' }} onClick={() => updateProduct(product)}>{product.name}</span></td>
                                <td>{product.price}</td>
                                <td>{getFormattedDate(product.created_on)}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className="btn-div">
                {/* <button><Link to="/add">Add New Product</Link></button> */}
                <button onClick={goToNewProduct}>Add New Product</button>
            </div>
        </div>

    );
}

export default ViewProduct;
