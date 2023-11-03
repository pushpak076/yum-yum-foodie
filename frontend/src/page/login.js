import React, { useState } from "react";
import loginSignupImage from "../assest/login-animation.gif";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  // console.log(data);
  const userData = useSelector(state => state);
  console.log(userData);

  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (email && password) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/login`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const resData = await fetchData.json();
      console.log(resData);
      
      toast(resData.message);
      if (resData.alert) {
        dispatch(loginRedux(resData));
        setTimeout(() => {
          navigate("/")
        }, 1000);
      }
      console.log(userData.user);
      
    } else {
      alert("Please enter required fields");
    }
  };
  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4">
        {/* <h1 className='text-center text-2xl font-bold'>Signup</h1> */}
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
          <img src={loginSignupImage} className="w-full" alt="" />
        </div>
        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlFor="password">Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
            <input
              type={"password"}
              id="password"
              name="password"
              className="w-full bg-slate-200 border-none outline-none"
              value={data.password}
              onChange={handleOnChange}
            />
          </div>

          <button className="max-w-[150px] m-auto w-full bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4">
            Login
          </button>
        </form>
        <p className="text-left text-sm mt-2">
          Don't have account ?{" "}
          <Link to={"/signup"} className="text-red-500 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
