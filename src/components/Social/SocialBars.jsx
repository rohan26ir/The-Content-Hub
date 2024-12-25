import React from "react";
import { FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { MdOutlineRssFeed } from "react-icons/md";

const SocialBars = () => {
  const socialMedia = [
    { name: "Twitter", username:  "@the-content-hub" , icon: <FaXTwitter />, color: "bg-black", link: "#" },
    { name: "Facebook", username:  "@the-content-hub" , icon: <FaFacebookF />, color: "bg-[#3563C2]", link: "#" },
    { name: "YouTube", username:  "@the-content-hub" , icon: <IoLogoYoutube />, color: "bg-red-600 text-red-600", link: "#" },
    { name: "RSS Feed", username:  "@the-content-hub" , icon: <MdOutlineRssFeed />, color: "bg-orange-600", link: "#" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-start my-4">Follow Us</h1>
      <div className="flex flex-col gap-4">
        {socialMedia.map((social, index) => (
          <a
            key={index}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative overflow-hidden flex items-center gap-4 p-3 rounded-md shadow-lg hover:opacity-90 transition-all duration-300 group ${social.color}`}
          >
            {/* Icon and Name Container */}
            <div className="flex items-center gap-4 transition-all duration-300 group-hover:translate-x-full group-hover:opacity-0">
              <div className="text-3xl text-white">{social.icon}</div>
              <span className="text-lg font-semibold text-white">{social.name}</span>
            </div>
            {/* Only Username (Hidden by Default) */}
            <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              {social.username}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialBars;
