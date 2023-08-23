import React from "react";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="py-10 bg-deep-primary grid grid-cols-1 500px:grid-cols-2 800px:grid-cols-4 gap-2 gap-y-10 px-2 800px:px-5">
      <div className="py-2 flex flex-col items-center">
        <Link
          to={"/"}
          className="text-white underline text-4xl font-semibold flex flex-row"
        >
          Vees Closet
        </Link>
        <p className="mt-8 text-white text-center">
          At Vees Closet, we empower self-expression through style. Our diverse
          collection of high-quality, trendsetting apparel embraces
          individuality. With exceptional service and inclusivity, we create an
          inspiring shopping haven. Join us in redefining fashion's role –
          enhancing confidence and self-expression.
        </p>
        <button className="underline text-blue-600">Staff</button>
      </div>

      <div className="py-2 flex flex-col items-center">
        <h2 className="border-l-2 pl-2 underline text-xl text-white flex flex-row">
          Shop Policy
        </h2>
        <ul className="mt-8 flex flex-col gap-2">
          <Link to={"/"} className="underline text-white">
            Privacy Policy
          </Link>
          <Link to={"/"} className="underline text-white">
            Return Policy
          </Link>
          <Link to={"/"} className="underline text-white">
            Shipping Policy
          </Link>
          <Link to={"/"} className="underline text-white">
            Term of use
          </Link>
        </ul>
      </div>

      <div className="py-2 flex flex-col items-center">
        <h2 className="border-l-2 pl-2 underline text-xl text-white flex flex-row">
          Useful links
        </h2>
        <ul className="mt-8 flex flex-col gap-2">
          <Link to={"/"} className="underline text-white">
            Shop
          </Link>
          <Link to={"/"} className="underline text-white">
            Products
          </Link>
          <Link to={"/"} className="underline text-white">
            Best price
          </Link>
          <Link to={"/"} className="underline text-white">
            For men
          </Link>
          <Link to={"/"} className="underline text-white">
            For women
          </Link>
        </ul>
      </div>

      <div className="py-2 flex flex-col items-center">
        <h2 className="border-l-2 pl-2 underline text-xl text-white flex flex-row">
          Contacts info
        </h2>
        <ul className="mt-8 flex flex-col gap-2">
          <p className="px-2 900px:px-5 text-white">
            123 Fifth Avenue, XXXXXXXX, KSI 12004. Ghana.
          </p>
          <p className="px-2 900px:px-5 text-white">Email: xxxxxx@xxx.xxx</p>
          <p className="px-2 900px:px-5 text-white">Phone: +233XXXXXXXXXX</p>
          <div className="flex flex-row gap-6 justify-center text-white text-xl mt-5">
            <a href="#">
              <BsFacebook />
            </a>
            <a href="#">
              <BsInstagram />
            </a>
            <a href="#">
              <BsTwitter />
            </a>
          </div>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
