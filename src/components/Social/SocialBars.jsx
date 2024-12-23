import React from "react";
import { FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { MdOutlineRssFeed } from "react-icons/md";

const SocialBars = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-start my-2">Follow Us</h1>
      <div className="flex justify-start items-center gap-2">
        <div className="bg-black text-white h-12 w-12 text-4xl flex justify-center items-center">
        <FaXTwitter />
        </div>
        <div className="bg-[#3563C2] text-white h-12 w-12 text-4xl flex justify-center items-center">
        <FaFacebookF />
        </div>
        <div className="bg-gray-300 text-red-600 h-12 w-12 text-4xl flex justify-center items-center">
        <IoLogoYoutube />
        </div>
        <div className="bg-orange-600 h-12 w-12 text-4xl flex justify-center items-center">
        <MdOutlineRssFeed />
        </div>
      </div>
    </div>
  );
};

export default SocialBars;
