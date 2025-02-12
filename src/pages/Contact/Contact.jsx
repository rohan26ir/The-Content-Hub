import React, { useContext, useRef } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { FaFacebook, FaTwitter, FaLinkedin, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
    const { darkMode } = useContext(AuthContext);

    // Dark mode styles
    const titleMode = darkMode ? "text-white" : "text-black";
    const textMode = darkMode ? "text-gray-300" : "text-gray-700";
    const inputMode = darkMode ? "bg-gray-300 text-black" : "bg-white";
    const cardMode = darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700";

    const formRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Show SweetAlert2 notification
        Swal.fire({
            title: 'Thank You!',
            text: 'Your message has been sent successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
        }).then(() => {
            // Reset the form
            if (formRef.current) {
                formRef.current.reset();
            }
        });
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className={`text-4xl font-bold text-center mb-8 ${titleMode}`}>Contact Us</h1>

                

                {/* Contact Form */}
                <div className={`${textMode} shadow-lg p-8 rounded-lg`}>
                    <p className="text-lg mb-6">
                        Fill out the form below, and we’ll get back to you as soon as possible.
                    </p>
                    <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className={`${inputMode} mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                placeholder="Your Name"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className={`${inputMode} mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                placeholder="your.email@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                className={`${inputMode} mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                placeholder="Your message..."
                                required
                            ></textarea>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-md text-sm font-medium text-black hover:bg-[#155E75] bg-[#F3F4F6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>

                {/* Contact Details Section */}
                <div className={`my-8 p-6 rounded-lg shadow-md ${cardMode}`}>
                    <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
                    <p className="mb-4">We’d love to hear from you! Reach out through the form or use the details below.</p>
                    <div className="space-y-4">
                        <p className="flex items-center"><FaEnvelope className="mr-2 text-indigo-500" /> Email: contact@contacthub.com</p>
                        <p className="flex items-center"><FaPhoneAlt className="mr-2 text-green-500" /> Phone: +123 456 7890</p>
                        <p className="flex items-center"><FaMapMarkerAlt className="mr-2 text-red-500" /> Address: 1216 Mirpur, Dhaka, Bangladesh</p>
                    </div>

                    {/* Social Media Links */}
                    <div className="flex space-x-4 mt-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-2xl hover:opacity-75">
                            <FaFacebook />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 text-2xl hover:opacity-75">
                            <FaTwitter />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 text-2xl hover:opacity-75">
                            <FaLinkedin />
                        </a>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Contact;
