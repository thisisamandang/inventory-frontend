import React from "react";
import HiOutlineLogout from "react-icons/hi";
function NavButton({ onClick, title, icon }) {
  return (
    <button
      onClick={onClick}
      className="
      border fade-on-appear hover:text-sky-600 hover:border-sky-500 transition duration-300 ease-in-out py-1 px-2 rounded"
    >
      {title}
      {icon}
    </button>
  );
}

export default NavButton;
