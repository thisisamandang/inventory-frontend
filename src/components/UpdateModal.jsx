import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { updateItem } from "../utils/APIRoutes";
function UpdateModal({
  setUpdationModal,
  updationCode,
  parsedData,
  updationCategory,
  updationItemNames,
  updationStocks,
  updationDesc,
}) {
  const inventory = localStorage.getItem("inventory");
  // eslint-disable-next-line no-redeclare
  var parsedData = JSON.parse(inventory);

  const [values, setValues] = useState({
    // id: parsedData._id,
    itemName: updationItemNames,
    category: updationCategory,
    itemCode: parsedData.itemCode,
    description: updationDesc,
    unit: parsedData.unit,
    stocks: updationStocks,
    low: parsedData.low,
  });

  // console.log("asd", updationItemNames);

  const handleChange = (event) => {
    setValues((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const code = ids;
    const { user, itemName, category, description, unit, stocks, low } = values;

    const datas = {
      UpdateditemName: itemName,
      UpdatedCategory: category,
      description: description,
      stocks: stocks,
    };

    const { data } = await axios.put(`${updateItem}/${updationCode}`, datas);

    if (data.status === false) {
      toast.error(data.msg);
    }
    // if (data.status === true) {
    //   try {
    //     localStorage.setItem("inventory", JSON.stringify(data.inventory));
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // }
    setUpdationModal(false);
  };

  return (
    <div>
      <div className="backdrop" />
      <div className="modal p-2">
        <h1>UPDATE DATA</h1>
        <div className="flex flex-1 ">
          <div className="flex-col w-1/2 flex md:flex-row  border-r p-6">
            <h3>General Detail</h3>
            <form onSubmit={(event) => handleSubmit(event)}>
              <input
                type="text"
                value={values.itemName}
                name="itemName"
                className="p-1 mt-5 outline-none border border-slate-400 rounded-md focus:border-blue-300"
                onChange={handleChange}
              />

              <select
                type="text"
                value={values.category}
                name="category"
                className="p-1 mt-5 w-auto outline-none  border-slate-400 border rounded-md focus:border-blue-300"
                onChange={(e) => handleChange(e)}
              >
                {Category.map((item) => {
                  return (
                    <option key={item} className=" text-black" value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
              <input
                type="number"
                value={values.itemCode}
                name="itemCode"
                className="disable p-1 mt-5 outline-none border bg-slate-200 border-slate-400 rounded-md focus:border-blue-300"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="text"
                value={values.description}
                name="description"
                className="p-1 mt-5 h-1/3 outline-none border border-slate-400 mb-2 rounded-md focus:border-blue-300"
                onChange={(e) => handleChange(e)}
              />
              <button
                className="p-2 border border-sky-600 text-sky-600 rounded-md mx-1 hover:text-white hover:bg-sky-600 transition-all duration-300 mt-4"
                type="submit"
              >
                Update
              </button>
            </form>
          </div>
          <div className="flex md:flex-row flex-col w-1/2 p-6 ">
            <h3 className="">Stock Details</h3>
            <form>
              <select
                type="text"
                name="unit"
                value={values.unit}
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
                value={values.stocks}
                name="stocks"
                className="p-1 mt-5 outline-none border rounded-md border-slate-400 focus:border-blue-300"
                onChange={(e) => handleChange(e)}
              />
            </form>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="p-2 border border-red-600 text-red-600 rounded-md mx-1 mb-2"
            onClick={() => {
              setUpdationModal(false);
            }}
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
}
const Category = ["Panel", "Invertor", "Wire", "MC4 Connector", "Other"];
const Unit = ["PIECES(PCS)", "UNITS", "NUMBERS(NOS)"];
export default UpdateModal;
