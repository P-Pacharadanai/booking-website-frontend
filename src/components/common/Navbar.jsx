import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authentication";
import { userIcon, historyIcon, logoutIcon, menuIcon, xmarkIcon } from "../../assets";

function Navbar() {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { getUser, logout } = useAuth();

  const username = getUser()?.username;

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <nav className="font-prompt h-20 bg-white sm:drop-shadow-lg px-8 sm:px-20">
      <div className="max-w-[1440px] h-full mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl sm:text-3xl text-blue-500 font-bold select-none">
          BookMyDate
        </Link>
        <div className="relative hidden sm:flex items-center gap-3">
          <p className="text-gray-600 font-medium">{username}</p>
          <div
            onClick={toggleUserMenu}
            className="w-8 h-8 bg-gray-300 flex justify-center items-center rounded-full cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="w-4 h-full fill-white"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
          </div>
          {showUserMenu && (
            <div className="absolute top-10 right-0 w-52 text-gray-600 font-medium  bg-white border rounded-lg shadow-lg overflow-hidden select-none">
              <div className="flex items-center gap-3 hover:bg-gray-100 px-6 py-3 cursor-pointer">
                <img src={userIcon} alt="userIcon" className="w-3 h-full" />
                <p>Profile</p>
              </div>
              <div className="flex items-center gap-3 hover:bg-gray-100 px-6 py-3 cursor-pointer">
                <img src={historyIcon} alt="historyIcon" className="w-3 h-full" />
                <p>History</p>
              </div>
              <hr />
              <div
                onClick={logout}
                className="flex items-center gap-3 hover:bg-gray-100 px-6 py-3 cursor-pointer"
              >
                <img src={logoutIcon} alt="logoutIcon" className="w-3 h-full" />
                <p>Log out</p>
              </div>
            </div>
          )}
        </div>
        <div className="sm:hidden">
          <img
            onClick={toggleUserMenu}
            src={menuIcon}
            alt="menu-icon"
            className="w-6 cursor-pointer"
          />
          {showUserMenu && (
            <div className="fixed min-w-[375px] top-0 left-0 w-screen h-screen bg-black bg-opacity-30 z-10">
              <ul className="relative w-8/12 h-full flex flex-col justify-between bg-blue-500 pt-14 pb-6 ml-auto text-white font-medium select-none">
                <img
                  onClick={toggleUserMenu}
                  src={xmarkIcon}
                  alt="xmark-icon"
                  className="absolute w-5 top-5 right-5 cursor-pointer"
                />
                <div>
                  <li className="flex items-center px-6 gap-3">
                    <div className="w-6 h-6 bg-gray-300 flex justify-center items-center rounded-full cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        className="w-3 h-full fill-white"
                      >
                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                      </svg>
                    </div>
                    <p className="text-sm font-normal select-text">{username}</p>
                  </li>
                  <li className="flex items-center gap-3 hover:bg-blue-400 px-6 py-3 mt-3 cursor-pointer">
                    Profile
                  </li>
                  <li className="flex items-center gap-3 hover:bg-blue-400 px-6 py-3 cursor-pointer">
                    History
                  </li>
                </div>
                <li
                  onClick={logout}
                  className="flex items-center gap-3 hover:bg-blue-400 px-6 py-3 cursor-pointer"
                >
                  Log out
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
