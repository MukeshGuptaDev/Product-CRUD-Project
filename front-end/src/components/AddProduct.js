import React from "react";

const AddProduct = () => {
    const [name , setName] = React.useState('');
    const [price , setPrice] = React.useState('');
    const [category , setCategory] = React.useState('');
    const [company , setCompany] = React.useState('');
    const [error , setError] = React.useState(false);
    const AddProduct =async () => {
        console.warn(name,price,category,company)
        if(!name || !price || !category || !company){

            setError(true);
            return false;

        }
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5000/add-product",{
            method : 'post',
            body:JSON.stringify({name,price,category,company,userId}),
            headers:{
                "Content-Type":"application/json"
            }
        });
        result = await result.json();
        console.warn(result);
        refreshProduct();
        
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
            <h1>Add Product</h1>
            <input type="text" placeholder="Enter product name" className="inputbox"
            value={name} onChange={(e)=>{setName(e.target.value)}}
            />
            {error && !name && <span className='invalid-input'>Enter valid name</span>}
            <input type="text" placeholder="Enter product price" className="inputbox"
            value={price} onChange={(e)=>{setPrice(e.target.value)}}
            />
            {error && !price && <span className='invalid-input'>Enter valid Price</span>}
            <input type="text" placeholder="Enter product category" className="inputbox"
            value={category} onChange={(e)=>{setCategory(e.target.value)}}
            />
            {error && !category && <span className='invalid-input'>Enter valid Category</span>}
            <input type="text" placeholder="Enter product company" className="inputbox"
            value={company} onChange={(e)=>{setCompany(e.target.value)}}
            />
            {error && !company && <span className='invalid-input'>Enter valid Company</span>}
            <button onClick={AddProduct} className="button">Add Product</button>
            <button onClick={refreshProduct} className="button">Reset</button>
        </div>
    )
        
}

export default AddProduct;