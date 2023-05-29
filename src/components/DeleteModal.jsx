import React from "react";
import { deleteitem } from "../utils/APIRoutes";
import axios from "axios";
function DeleteModal({ setDeleteModal, deletionCode }) {
  const deleteHandler = async () => {
    const code = deletionCode;
    setDeleteModal(false);
    const { data } = await axios.post(deleteitem, { code });
  };
  return (
    <div>
      <div className="backdrop" />
      <div className="modal p-2 fade-on-appear">
        <p className="mb-4 p-4 text-center">
          Are you sure you want to Delete this entry?
        </p>
        <div className="flex justify-center mt-4 gap-6">
          <button
            className=" text-red-600 px-6 py-3 rounded-lg border border-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 font-semibold"
            onClick={deleteHandler}
          >
            Yes
          </button>
          <button
            className=" text-green-600 px-6 py-3 rounded-lg border border-green-600 hover:bg-green-600 hover:text-white transition-all duration-300 font-semibold"
            onClick={() => {
              setDeleteModal(false);
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
