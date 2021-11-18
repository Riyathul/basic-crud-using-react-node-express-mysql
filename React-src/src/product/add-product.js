import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CONSTANTS } from '../Constants';

function AddProduct(props) {
    const navigate = useNavigate();
    const [fields, setFields] = useState({});

    // Set Fields based on props 
    useEffect(() => {
        if (JSON.stringify(props['product']) !== JSON.stringify({})) {
            setFields(props['product']);
        }
    }, [props]);

    // navigate to home screen
    function goToViewProduct() {
        navigate("/");
    }

    // Change Handler for setting properties dynamically
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFields(values => ({ ...values, [name]: value }))
    }

    // Add New / Update existing product in DB
    const addProduct = (event) => {
        console.log(fields);
        if (fields['name'] && fields['price']) {
            var restUrl = "";
            var method = "";
            if (fields['id']) {
                restUrl = "/updateProduct";
                method = "PUT";
            } else {
                restUrl = "/addProduct";
                method = "POST";
            }
            fetch(CONSTANTS.BASE_URL + restUrl, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fields)
            })
                .then((res) => res.json())
                .then(data => {
                    alert(JSON.stringify(data));
                    goToViewProduct();
                }).catch(err => { console.log(err) })
        } else {
            alert("Please fill the form");
        }
        event.preventDefault();
    }

    // Delete a product in DB using primary id
    function deleteProduct(event) {
        fetch(CONSTANTS.BASE_URL + '/deleteProduct/' + fields['id'], {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then(data => {
                alert(JSON.stringify(data));
                goToViewProduct();
            }).catch(err => { console.log(err) })
        event.preventDefault();
    }

    return (
        <div className="App">
            <h1>Add Product component</h1>

            <div style={{ marginTop: "40px" }}>
                <form>
                    <label>Name
                        <input className="custom-input"
                            type="text"
                            name="name"
                            value={fields.name || ""}
                            onChange={handleChange}
                        />
                    </label><br />
                    <label>Price:
                        <input className="custom-input"
                            type="number"
                            name="price"
                            value={fields.price || ""}
                            onChange={handleChange}
                        />
                    </label><br />
                    <div>
                        <button onClick={goToViewProduct}>Back</button>
                        {JSON.stringify(props.product) === JSON.stringify({}) ? '' : <button onClick={deleteProduct}>Delete</button>}
                        <button onClick={addProduct}>{JSON.stringify(props.product) === JSON.stringify({}) ? 'Submit' : 'Update'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddProduct