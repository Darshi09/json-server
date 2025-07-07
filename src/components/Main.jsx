import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'


const Main = () => {
    const [data, setData] = useState([])
    const [productdata, setProductdata] = useState({ img: "", title: "", price: "" })
    const [search, setSearch] = useState("");
    const [filterData, setFilterData] = useState([]);

    async function getdata() {
        let res = await axios.get("http://localhost:3000/products")
        setData(res.data)
        setFilterData(res.data)
    }
    console.log(data)

    async function handledata(e) {
        e.preventDefault()
        if (productdata.img == "" && productdata.title == "" && productdata.price == "") {
            alert("Enter The data first")
            return
        }
        await axios.post("http://localhost:3000/products", productdata)
        setProductdata({ img: "", title: "", price: "" })
        getdata()
    }
    function handleAsc() {
        let sortData = filterData.sort((a, b) => a.price - b.price);
        setData([...sortData]);
    }
    function handleDes() {
        let sortData = filterData.sort((a, b) => b.price - a.price);
        setData([...sortData]);
    }
    function handleSelect(e) {
        let allData = data;
        if (e.target.value === "all") {
            setFilterData(allData);
            return;
        }
        let filterData = allData.filter((item) => item.category === e.target.value);
        setFilterData(filterData);
    }
    function handleSearch(e) {
        setSearch(e.target.value);

        let searchFilterData = data.filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase())
        );
        setFilterData(searchFilterData);
    }
    async function handlechange(id) {
        await axios.delete("http://localhost:3000/products/" + id)
        getdata()
    }
    useEffect(() => {
        getdata()
    }, [])


    return (
        <div>
            <h1>Products</h1>
            <div>
                <button onClick={handleAsc}>ascending</button>
                <button onClick={handleDes}>Descending</button>
                <select onChange={handleSelect} name="" id="">
                    <option value="all">All</option>
                    <option value="Girls">Girls</option>
                    <option value="Boys">Boys</option>
                </select>
                <input type="text" placeholder="Searching.." onChange={handleSearch} />
            </div>
            <form action="" style={{ margin: "10px" }} onSubmit={handledata}>
                product img: <input type="text" value={productdata.img} onChange={(e) => { setProductdata({ ...productdata, img: e.target.value }) }} /><br /><br />
                Product Name: <input type="text" value={productdata.title} onChange={(e) => { setProductdata({ ...productdata, title: e.target.value }) }} /><br /><br />
                Product Price: <input type="number" name="" id="" value={productdata.price} onChange={(e) => { setProductdata({ ...productdata, price: e.target.value }) }} /><br /><br />
                <button>Submit</button>
            </form>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", flexWrap: "wrap" }}>
                {filterData.map((item) => {
                    return <div key={item.id} style={{ border: "2px solid black", borderRadius: "10px", padding: "5px", width: "250px" }}>
                        <img src={item.img} alt="" style={{ width: "250px", height: "300px" }} />
                        <h2>Title: {item.title}</h2>
                        <p>Price: ${item.price}</p>
                        <p>Category: {item.category}</p>
                        <button onClick={() => { handlechange(item.id) }} >Delete</button>
                        <Link to={`/update/${item.id}`}><button>Edit</button></Link>
                        <Link to={`/view/${item.id}`}><button>View</button></Link>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Main