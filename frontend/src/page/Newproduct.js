import React, { useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import { toast } from "react-hot-toast";

const Newproduct = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    discription: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const uploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    // console.log(data);
    setData((prev) => {
      return {
        ...prev,
        image: data,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    const {name, category, price, discription} = data

    if(name && category && price && discription) {
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/uploadProduct`, {
        method : "POST",
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      });
      const fetchRes = await fetchData.json();
      console.log(fetchRes);
      toast(fetchRes.message)
      setData(() => {
        return {
          name: "",
          category: "",
          image: "",
          price: "",
          discription: "",
        }
      })
    }
    else {
      toast("Enter Required Field!")
    }
  };

  return (
    <div className="p-4">
      <form
        className="m-auto w-full max-w-md shadow flex flex-col p-3 bg-white"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="{text}"
          name="name"
          className="bg-slate-200 p-1 my-1"
          onChange={handleOnChange}
          value={data.name}
        />

        <label htmlFor="category">Category</label>
        <select
          className="bg-slate-200 p-1 my-1"
          id="category"
          name="category"
          onChange={handleOnChange}
          value={data.category}
        >
          <option value={"Other"}>Select Category</option>
          <option value={"fruits"}>Fruits</option>
          <option value={"vegetable"}>Vegetable</option>
          <option value={"ice cream"}>Ice-Cream</option>
          <option value={"dosa"}>Dosa</option>
          <option value={"pizza"}>Pizza</option>
          <option value={"rice"}>Rice</option>
          <option value={"cake"}>Cake</option>
          <option value={"burger"}>Burger</option>
          <option value={"panner"}>Panner</option>
          <option value={"sandwich"}>Sandwich</option>
        </select>

        <label htmlFor="image">
          Image
          <div className="h-40 w- full bg-slate-200 rounded flex items-center justify-center cursor-pointer">
            {data.image ? (
              <img src={data.image} alt="prodImg" className="h-full" />
            ) : (
              <span className="text-5xl">
                <BsCloudUpload />
              </span>
            )}

            <input
              type={"file"}
              accept="image/*"
              id="image"
              onChange={uploadImage}
              className="hidden"
            />
          </div>
        </label>
        <label htmlFor="price" className="my-1">
          Price
        </label>
        <input
          type="{text}"
          className="bg-slate-200 p-1 my-1"
          name="price"
          onChange={handleOnChange}
          value={data.price}
        />
        <label htmlFor="discription">Discription</label>
        <textarea
          rows={2}
          className="bg-slate-200 p-1 my-1 resize-none"
          name="discription"
          onChange={handleOnChange}
          value={data.discription}
        ></textarea>

        <button className="bg-red-500 hover:bg-red-600 text-white text-lg font-mediam my-2 drop-shadow">
          Save
        </button>
      </form>
    </div>
  );
};

export default Newproduct;
