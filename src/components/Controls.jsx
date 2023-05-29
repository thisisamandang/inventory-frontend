import React, { useState } from "react";
import AddModal from "./AddModal";
import InventoryContainer from "./InventoryContainer";

function Controls() {
  const [modal, setModal] = useState(false);
  const [lowStock, setLowStock] = useState(false);
  const handleNew = () => {
    setModal(true);
  };
  const handleLowStock = () => {
    setLowStock(!lowStock);
  };

  return (
    <>
      <div className="flex justify-center gap-6 mt-6  md:gap-6 fade-on-appear">
        {modal && <AddModal setModal={setModal}></AddModal>}
        <div
          className={`${
            lowStock && "bg-sky-600 text-white"
          } border border-sky-600 p-1 hover:bg-sky-600 transition-all duration-500 hover:text-white rounded-md text-sky-600`}
        >
          <button className="text-sm" onClick={handleLowStock}>
            SHOW LOW STOCK
          </button>
        </div>
        <div className="border py-1 px-2 bg-sky-600 rounded-md hover:bg-sky-600 text-white transition-all duration-500 font-semibold">
          <button className="text-sm " onClick={handleNew}>
            ADD NEW
          </button>
        </div>
        {/* <div className="border border-red-600 p-1 text-red-600">
          <button className="text-sm">DELETE SELECTED</button>
        </div> */}
      </div>
      <InventoryContainer modal={modal} lowStock={lowStock} />
    </>
  );
}

export default Controls;
