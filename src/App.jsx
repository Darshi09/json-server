import axios from 'axios'
import React, { useEffect, useState } from 'react'

const App = () => {
  
  const [data,setData] = useState([])
  const [productdata,setProductdata] = useState({img:"",title:"",price:""})


  async function getdata(){
    let res = await axios.get("http://localhost:3000/products")
    setData(res.data)
  }
  console.log(data)

  async function handledata(e){
    e.preventDefault()
    if(productdata.img == "" && productdata.title == "" && productdata.price == ""){
      alert("Enter The data first")
      return
    }
    axios.post("http://localhost:3000/products",productdata)
    setProductdata({img:"",title:"",price:""})
    getdata()
  }

  async function handlechange(id){
    await axios.delete("http://localhost:3000/products/"+id)
    getdata()
  }
  useEffect(()=>{
    getdata()
  },[])


  return (
    <div>
      <h1>Products</h1>
      <form action="" style={{margin:"10px"}} onSubmit={handledata}>
        product img: <input type="text" value={productdata.img} onChange={(e)=>{setProductdata({...productdata,img:e.target.value})}}/><br /><br />
        Product Name: <input type="text" value={productdata.title} onChange={(e)=>{setProductdata({...productdata,title:e.target.value})}}/><br /><br />
        Product Price: <input type="number" name="" id="" value={productdata.price} onChange={(e)=>{setProductdata({...productdata,price:e.target.value})}} /><br /><br />
        <button>Submit</button>
      </form>
      <div style={{display:"flex", alignItems:"center", justifyContent:"center",gap:"5px", flexWrap:"wrap"}}>
        {data.map((item)=>{
        return <div key={item.id} style={{border:"2px solid black",borderRadius:"10px", padding:"5px", width:"250px"}}>
            <img src={item.img} alt="" style={{width:"250px", height:"300px"}} />
            <h2>Title: {item.title}</h2>
            <p>Price: ${item.price}</p>
            <button onClick={()=>{handlechange(item.id)}} >Delete</button>
        </div>
      })}
      </div>
      </div>
  )
}

export default App