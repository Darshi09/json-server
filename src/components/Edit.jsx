import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router';

const Edit = () => {
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
 async function handleUpdate(e) {
    e.preventDefault();
    await axios.put(`http://localhost:3000/products/${id}`,productdata)
    alert("update successfully")
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Update Page</h1>
      <form onSubmit={handleUpdate}>
        <img src={productdata.img} alt="" style={{ width: "250px", height: "300px" }} />

        <input
          type="text"
          placeholder="Enter your Product name"
          value={productdata.title}
          onChange={(e) =>
            setProductdata({ ...productdata, title: e.target.value })
          }
        />

        <input
          type="text"
          placeholder=" Enter your price "
          value={productdata.price}
          onChange={(e) =>
            setProductdata({ ...productdata, price: e.target.value })
          }
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Edit