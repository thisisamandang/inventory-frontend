import React, { useEffect, useState } from "react";
import axios from "axios";
import { getLowStock } from "../utils/APIRoutes";
import { AiOutlineWarning } from "react-icons/ai";
function LowStock({ user, lowStock }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getItems() {
      const data = await axios.get(`${getLowStock}/${user}`);
      setItems(data.data);
      // console.log(data);
      // if (data.status === true) {
      //   try {
      //     localStorage.setItem("inventory", JSON.stringify(data.inventory));
      //   } catch (error) {
      //     console.log(error.message);
      //   }
      // }
    }
    getItems();
    // setLoading(true);
  }, [lowStock, user]);
  const itemNames = items.map((item) => item.itemName);
  const category = items.map((item) => item.category);
  const code = items.map((item) => item.itemCode);
  const unit = items.map((item) => item.unit);
  const stocks = items.map((item) => item.stocks);
  const low = items.map((item) => item.low);
  const desc = items.map((item) => item.description);
  console.log(items);
  return (
    // <div>
    <>
      <div className="text-sm px-2 border">
        <p className="font-bold mb-4 ">Item Name</p>

        <div className="text-center p-4">
          {itemNames.map((itemName, index) => (
            <p className="py-2" key={index}>
              {itemName}
            </p>
          ))}
        </div>
      </div>
      <div className="text-sm px-2 border">
        <p className="font-bold  mb-4">Item Code</p>
        <div className="p-4">
          {code.map((code, index) => (
            <p className="py-2" key={index}>
              {code}
            </p>
          ))}
        </div>
      </div>
      <div className="text-sm px-2 border">
        <p className="font-bold  mb-4">Category</p>
        <div className="p-4">
          {category.map((category, index) => (
            <p className="py-2" key={index}>
              {category}
            </p>
          ))}
        </div>
      </div>

      <div className="text-sm px-2 border">
        <p className="font-bold  mb-4">Stock Qty.</p>
        <div className="p-4">
          {stocks.map((stock, index) => (
            <p className="py-2" key={index}>
              {stock}
            </p>
          ))}
          {unit.map((unit, index) => (
            <p className="py-2" key={index}>
              {unit}
            </p>
          ))}
        </div>
      </div>

      <div className="text-sm px-2 border">
        <p className="font-bold text-center mb-4">Low</p>
        <div className="p-4">
          {code.map((code, index) => (
            <div>
              <AiOutlineWarning
                key={index}
                className="py-2 text-red-600 peer h-8 w-8"
              />
            </div>
          ))}
        </div>
      </div>
    </>
    // </div>
  );
}

export default LowStock;
