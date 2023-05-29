import React, { useEffect, useState } from "react";
import { getInventory } from "../utils/APIRoutes";
import axios from "axios";
import { BsPencil } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";

function InventoryContainer({ modal, lowStock }) {
  const [items, setItems] = useState([]);
  const [updationModal, setUpdationModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updationCategory, setUpdationCategory] = useState();
  const [updationItemNames, setUpdationitemNames] = useState();
  const [updationStocks, setUpdationStocks] = useState();
  const [updationDesc, setUpdationDesc] = useState();
  const [updationCode, setUpdationCode] = useState();
  const [deletionCode, setDeletionCode] = useState();
  const id = localStorage.getItem("user");
  var parsedData = JSON.parse(id);
  const user = parsedData.username;
  const deleteInfo = (code) => {
    setDeletionCode(code);
    setDeleteModal(true);
  };

  const updationInfo = (code, category, itemNames, stocks, desc) => {
    setUpdationCode(code);
    setUpdationCategory(category);
    setUpdationitemNames(itemNames);
    setUpdationStocks(stocks);
    setUpdationDesc(desc);
    setUpdationModal(true);
    console.log(itemNames);
  };
  // console.log("Updation Code", updationCode);
  // const [Loading, setLoading] = useState(false);
  useEffect(() => {
    async function getItems() {
      const data = await axios.get(`${getInventory}/${user}`);
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
  }, [modal, user, deleteModal, updationModal]);
  // console.log(items);

  const itemNames = items.map((item) => item.itemName);
  const category = items.map((item) => item.category);
  const code = items.map((item) => item.itemCode);
  const unit = items.map((item) => item.unit);
  const stocks = items.map((item) => item.stocks);
  const low = items.map((item) => item.low);
  const desc = items.map((item) => item.description);
  // const lowvstock = stocks.map((element, index) => {
  //   if (element < low[index]) {
  //     return true;
  //   }
  // });

  // console.log(itemName);
  // console.log(lowvstock);
  // if (Loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="flex mt-8 md:justify-center md:mr-10 mx-3">
      {deleteModal && (
        <DeleteModal
          setDeleteModal={setDeleteModal}
          deletionCode={deletionCode}
        ></DeleteModal>
      )}
      {updationModal && (
        <UpdateModal
          setUpdationModal={setUpdationModal}
          updationCode={updationCode}
          parsedData={parsedData}
          items={items}
          updationCategory={updationCategory}
          updationItemNames={updationItemNames}
          updationStocks={updationStocks}
          updationDesc={updationDesc}
        ></UpdateModal>
      )}
      <div className="text-sm px-2 border ">
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
        <p className="font-bold  mb-4">Actions</p>
        <div className="p-4">
          {code.map((code, index) => (
            <p className="py-2" key={index}>
              <BsPencil
                className="inline mr-3 h-4 w-4 cursor-pointer"
                onClick={() => {
                  updationInfo(
                    code,
                    category[index],
                    itemNames[index],
                    stocks[index],
                    desc[index]
                  );
                }}
              />
              <RiDeleteBin6Line
                className="inline ml-3 h-4 w-4 text-red-600 cursor-pointer"
                onClick={() => deleteInfo(code)}
              />
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InventoryContainer;
