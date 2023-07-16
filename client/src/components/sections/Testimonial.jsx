import React from "react";
import { TestimonialData } from "../../static/data";

function Testimonial() {
  return (
    <div className="w-full bg-white py-5">
      <>
        {/* Container for demo purpose */}
        <div className="container mx-auto md:px-6">
          <section className="mb-32 text-center">
            <h2 className="mb-12 mt-5 text-3xl font-bold">Testimonials</h2>
            <div className="grid gap-x-6 gap-y-14 md:grid-cols-3 mt-10 pt-5">
              {TestimonialData.map(({ fullname, avatar, message }, index) => {
                return (
                  <TestimonialCard
                  key={index}
                    message={message}
                    avatar={avatar}
                    fullname={fullname}
                  />
                );
              })}
            </div>
          </section>
        </div>
      </>
    </div>
  );
}

function TestimonialCard({ fullname, avatar, message }) {
  return (
    <div className="mb-0 flex flex-col items-center">
      <div className="mb-6 w-32 h-32 bg-gray-300 rounded-full flex justify-center">
        <img
          src={avatar}
          className="w-full h-full rounded-full shadow-lg dark:shadow-black/20"
        />
      </div>
      <h5 className="mb-2 text-lg font-bold text-wine_primary">{fullname}</h5>
      <p className="mb-4">
        {message?.slice(0, 100) + "..."}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 96 960 960"
          className="inline-block w-6"
        >
          <path
            fill="currentColor"
            d="M580 556h160V396H580v160Zm-360 0h160V396H220v160Zm406 220 80-160H520V336h280v288l-76 152h-98Zm-360 0 80-160H160V336h280v288l-76 152h-98Zm34-300Zm360 0Z"
          />
        </svg>
      </p>
      <ul className="mb-0 flex justify-center">
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 96 960 960"
            className="w-5 text-warning"
          >
            <path
              fill="currentColor"
              d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"
            />
          </svg>
        </li>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 96 960 960"
            className="w-5 text-warning"
          >
            <path
              fill="currentColor"
              d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"
            />
          </svg>
        </li>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 96 960 960"
            className="w-5 text-warning"
          >
            <path
              fill="currentColor"
              d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"
            />
          </svg>
        </li>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 96 960 960"
            className="w-5 text-warning"
          >
            <path
              fill="currentColor"
              d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"
            />
          </svg>
        </li>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 96 960 960"
            className="w-5 text-warning"
          >
            <path
              fill="currentColor"
              d="m323 851 157-94 157 95-42-178 138-120-182-16-71-168-71 167-182 16 138 120-42 178Zm-90 125 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z"
            />
          </svg>
        </li>
      </ul>
    </div>
  );
}

export default Testimonial;
