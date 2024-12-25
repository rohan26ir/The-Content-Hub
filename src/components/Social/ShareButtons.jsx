import React from "react";
import { FaFacebookF, FaTelegram, FaWhatsapp, FaXTwitter } from "react-icons/fa6";

const ShareButtons = ({ id }) => {
  const url = `http://localhost:5173/blog/${id}`; // URL to share
  const message = "Check out this amazing link!"; // Custom message for platforms that support it
  
  const socialLinks = [
    {
      name: "Facebook",
      icon: <FaFacebookF />,
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: "bg-blue-600",
    },
    {
      name: "Twitter",
      icon: <FaXTwitter />,
      link: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`,
      color: "bg-blue-400",
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp />,
      link: `https://api.whatsapp.com/send?text=${encodeURIComponent(message + " " + url)}`,
      color: "bg-green-500",
    },
    {
      name: "Telegram",
      icon: <FaTelegram />,
      link: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`,
      color: "bg-blue-500",
    },
  ];

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold text-center mb-4">Share This Page</h3>
      <div className="flex justify-center gap-4">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center w-12 h-12 rounded-full text-white shadow-md hover:opacity-90 transition duration-300 ${social.color}`}
            title={`Share on ${social.name}`}
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ShareButtons;
