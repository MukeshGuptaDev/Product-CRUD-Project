import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false);
    const params = useParams();

    useEffect(() => {
        
        getProductDetails();
    },[])

    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const UpdateProduct = async () => {
        console.warn(name, price, category, company);
        let result = fetch(`http://localhost:5000/product/${params.id}`,{
            method:'put',
            body: JSON.stringify({name, price, category, company}), 
            headers:{
                'Content-Type' : "application/json"
            }
        })

        result = (await result).json();
        console.warn(result);
       
        //refreshProduct();


    }

    // const handleNameChange = (e) => {
    //     setName(e.target.value);
    //     if (e.target.value.trim() === '') {
    //         setNameError('Please enter a name'); // Set error message
    //     } else {
    //         setNameError(''); // Clear error message if name is not empty
    //     }
    // }

    const refreshProduct = () => {
        setName('');
        setPrice('');
        setCategory('');
        setCompany('');
        setError(false);
    }

    return (
        <div className='product'>
            <h1>Update Product</h1>
            <input type="text" placeholder="Enter product name" className="inputbox"
                value={name} onChange={(e) => { setName(e.target.value) }}
            />

            <input type="text" placeholder="Enter product price" className="inputbox"
                value={price} onChange={(e) => { setPrice(e.target.value) }}
            />

            <input type="text" placeholder="Enter product category" className="inputbox"
                value={category} onChange={(e) => { setCategory(e.target.value) }}
            />

            <input type="text" placeholder="Enter product company" className="inputbox"
                value={company} onChange={(e) => { setCompany(e.target.value) }}
            />

            <button onClick={UpdateProduct} className="button">Update Product</button>
            {/* <button onClick={refreshProduct} className="button">Reset</button> */}
        </div>
    )

}

export default UpdateProduct;