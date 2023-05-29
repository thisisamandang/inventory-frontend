import React from "react";
import NavButton from "../components/NavButton";

import { useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
function Header() {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <header>
      <div className="flex flex-col fade-on-appear items-center justify-center space-x-2">
        <h1 className="text-2xl text-sky-600 mt-2 mb-1">BOOKS</h1>
      </div>
      {/* <hr /> */}
      <div className="hidden md:flex  md:col-span-3 mt-2 items-center justify-center rounded-md">
        <div className=" p-4 space-x-2">
          <NavButton
            title="Logout"
            icon={<HiOutlineLogout className="inline ml-2 h-4 w-4" />}
            onClick={logoutHandler}
          />
        </div>
      </div>
      <div className="flex flex-col  ml-auto  mr-3 mt-1 text-right">
        <span className="md:hidden">
          <NavButton
            title="Logout"
            icon={<HiOutlineLogout className="inline ml-2 h-4 w-4" />}
            onClick={logoutHandler}
          />
          {/* <HiOutlineLogout className="inline" /> */}
        </span>
      </div>
    </header>
  );
}

export default Header;
