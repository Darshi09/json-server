import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';

const View = () => {
    const [productdata, setProductdata] = useState({ img: "", title: "", price: "" })
    const { id } = useParams(); // id get from params

    async function getData() {
        try {
            let res = await axios.get(`http://localhost:3000/products/${id}`);
            console.log(res.data);
            setProductdata(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <>
            <div key={productdata.id} style={{ border: "2px solid black", borderRadius: "10px", padding: "5px", width: "250px" }}>
                <img src={productdata.img} alt="" style={{ width: "250px", height: "300px" }} />
                <h2>Title: {productdata.title}</h2>
                <p>Price: ${productdata.price}</p>
                <button>Buy Now</button>
                <button>Add To Cart</button>
            </div>
        </>
    )
}

export default View