import React from "react";
import { CiForkAndKnife } from "react-icons/ci";

const FilterProduct = ({ category, onclick, isActive }) => {
  return (
    <>
      <div onClick={onclick}>
        <div className={`text-3xl p-5 hover:bg-yellow-600 rounded-full cursor-pointer ${isActive ? "bg-red-600 text-white" : "bg-yellow-500"}`}>
          <CiForkAndKnife />
        </div>
        <p className="text-center font-medium my-1 capitalize">{category}</p>
      </div>
    </>
  );
};

export default FilterProduct;
