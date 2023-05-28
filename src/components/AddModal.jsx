import React, { useState, useEffect } from "react";
import { inventoryRoute } from "../utils/APIRoutes";
import { toast } from "react-hot-toast";
import axios from "axios";
function AddModal({ setModal }) {
  const [warning, setWarning] = useState(false);
  const handleWarning = (e) => {
    e.preventDefault();
    setWarning(!warning);
  };
  const id = localStorage.getItem("user");
  var parsedData = JSON.parse(id);
  const username = parsedData.username;
  const [values, setValues] = useState({
    user: username,
    itemName: "",
    category: "Panel",
    itemCode: "",
    description: "",
    unit: "",
    stocks: "",
    low: "",
  });
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {
      user,
      itemName,
      category,
      itemCode,
      description,
      unit,
      stocks,
      low,
    } = values;
    const { data } = await axios.post(inventoryRoute, {
      itemName,
      category,
      user,
      itemCode,
      description,
      unit,
      stocks,
      low,
    });

    if (data.status === false) {
      toast.error(data.msg);
    }
    if (data.status === true) {
      try {
        localStorage.setItem("inventory", JSON.stringify(data.inventory));
      } catch (error) {
        console.log(error.message);
      }
    }
    setModal(false);
  };

  return (
    <div>
      <div className="backdrop" />
      <div className="modal p-2">
        <h1>ADD NEW ITEM</h1>
        <div className="flex flex-1 ">
          <div className="flex-col w-1/2 flex md:flex-row  border-r p-6">
            <h3>General Detail</h3>
            <form onSubmit={(event) => handleSubmit(event)}>
              <input
                type="text"
                placeholder="Item Name"
                name="itemName"
                className="p-1 mt-5 outline-none border border-slate-400 rounded-md focus:border-blue-300"
                onChange={(e) => handleChange(e)}
              />
              <select
                type="text"
                placeholder="Category"
                name="category"
                className="p-1 mt-5 w-auto outline-none  border-slate-400 border rounded-md focus:border-blue-300"
                onChange={(e) => handleChange(e)}
              >
                {category.map((item) => {
                  return (
                    <option key={item} className=" text-black" value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
              <input
                type="number"
                placeholder="Item Code"
                name="itemCode"
                className="p-1 mt-5 outline-none border border-slate-400 rounded-md focus:border-blue-300"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="text"
                placeholder="Item Description"
                name="description"
                className="p-1 mt-5 h-1/3 outline-none border border-slate-400 mb-2 rounded-md focus:border-blue-300"
                onChange={(e) => handleChange(e)}
              />
              <button
                className="p-2 border border-sky-600 text-sky-600 rounded-md mx-1 hover:text-white hover:bg-sky-600 transition-all duration-300 mt-4"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="flex md:flex-row flex-col w-1/2 p-6 ">
            <h3 className="">Stock Details</h3>
            <form onSubmit={(event) => handleSubmit(event)}>
              <select
                type="text"
                name="unit"
                className="p-1 mt-5 w-auto outline-none border  border-slate-400 rounded-md focus:border-blue-300"
                onChange={(e) => handleChange(e)}
              >
                {Unit.map((item) => {
                  return (
                    <option key={item} className=" text-black" value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>

              <input
                type="number"
                placeholder="Opening Stocks"
                name="stocks"
                className="p-1 mt-5 outline-none border rounded-md border-slate-400 focus:border-blue-300"
                onChange={(e) => handleChange(e)}
              />
              <button
                className="mt-5 text-xs underline"
                onClick={handleWarning}
              >
                Enable Low Stock Warning?
              </button>
              {warning && (
                <input
                  type="number"
                  placeholder="Low Stock Units"
                  name="low"
                  className="  p-1 outline-none border border-slate-400 rounded-md focus:border-blue-300"
                  onChange={(e) => handleChange(e)}
                />
              )}
            </form>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="p-2 border border-red-600 text-red-600 rounded-md mx-1 mb-2"
            onClick={() => {
              setModal(false);
            }}
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
}
const category = ["Panel", "Invertor", "Wire", "MC4 Connector", "Other"];
const Unit = ["PIECES(PCS)", "UNITS", "NUMBERS(NOS)"];
export default AddModal;
