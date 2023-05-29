import React from "react";
import Header from "../components/Header";

import { MdOutlineInventory } from "react-icons/md";
// import InventoryContainer from "../components/InventoryContainer";
import Controls from "../components/Controls";
function Books() {
  return (
    <>
      <Header />
      <div className="flex fade-on-appear justify-center items-center mt-10 md:mt-4">
        <p className="ml-4 pointer-events-none select-none">
          Inventory
          <MdOutlineInventory className="inline m-2" />
        </p>
      </div>
      <Controls />
      {/* <InventoryContainer /> */}
    </>
  );
}

export default Books;
