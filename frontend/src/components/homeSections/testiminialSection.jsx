import { useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { BsFillStarFill } from "react-icons/bs";

function TestiminialSection() {
  const [current, setCurrent] = useState(1);

  const mockTestmonials = [
    {
      author: "Asum Victor",
      message:
        "Absolutely loved the variety of styles and sizes at this store! Found the perfect outfit for my friend's wedding. Highly recommend!",
      image: "https://avatars.githubusercontent.com/u/105683075?v=4",
    },
    {
      author: "Xi Asum Jin",
      message:
        "Great shopping experience! The staff was super helpful in finding the right jeans that fit me perfectly.",
      image: "https://avatars.githubusercontent.com/u/105683075?v=4",
    },
    {
      author: "Victor Asum",
      message:
        "I'm not a big shopper, but this store changed that. I left with more than I planned – the collection is just too tempting!",
      image: "https://avatars.githubusercontent.com/u/105683075?v=4",
    },
    {
      author: "Jin Xi Asum",
      message:
        "Awesome quality and affordable prices. Bought a couple of shirts and they've become my favorites. Will be back for more!",
      image: "https://avatars.githubusercontent.com/u/105683075?v=4",
    },
    {
      author: "Asum Jin",
      message:
        "Visited for the first time and I'm impressed. The atmosphere is welcoming, and the selection is trendy and comfortable.",
      image: "https://avatars.githubusercontent.com/u/105683075?v=4",
    },
    {
      author: "Victor Xi",
      message:
        "Big shoutout to the store for their excellent customer service. They went above and beyond to assist me in picking out an outfit for a special event.",
      image: "https://avatars.githubusercontent.com/u/105683075?v=4",
    },
    {
      author: "Jin Asum",
      message:
        "This store is a hidden gem. Found unique accessories that perfectly complemented my wardrobe. Can't wait to flaunt them!",
      image: "https://avatars.githubusercontent.com/u/105683075?v=4",
    },
    {
      author: "Asum Asum",
      message:
        "Finally, a store that caters to all sizes. It's refreshing to find stylish options that embrace diversity.",
      image: "https://avatars.githubusercontent.com/u/105683075?v=4",
    },
    {
      author: "Xi Victor",
      message:
        "I'm a regular shopper here. The consistent quality and fashionable choices keep me coming back. Two thumbs up!",
      image: "https://avatars.githubusercontent.com/u/105683075?v=4",
    },
    {
      author: "Victor Jin",
      message:
        "I'm not usually into shopping, but this store's minimalist aesthetic drew me in. I left with a sleek new look that I adore.",
      image: "https://avatars.githubusercontent.com/u/105683075?v=4",
    },
  ];

  const handlePlus = () => {
    if (current / mockTestmonials.length === 1) {
      setCurrent(1);
    } else {
      setCurrent((prev) => prev + 1);
    }
  };

  const handleMinus = () => {
    if (current === 1) {
      setCurrent(mockTestmonials.length);
    } else {
      setCurrent((prev) => prev - 1);
    }
  };

  return (
    <section className="py-10 w-full bg-deep-primary px-2">
      <h2 className="text-center text-xl text-white uppercase">Testimonials</h2>
      <h2 className="text-center text-7xl text-white mt-5 capitalize">
        Happy customers
      </h2>
      <p className="text-white mt-3 text-center">
        See what our happy customers are saying – their feedback speaks for
        itself.
      </p>
      <div className="w-full py-2 mt-20 relative">
        <div className="grid grid-cols-12">
          <div className="col-span-2 flex justify-center items-center">
            <button
              onClick={() => handleMinus()}
              type="button"
              className="flex justify-center items-center h-[1cm] w-[1cm] bg-white text-black"
            >
              <HiOutlineChevronLeft size={32} />
            </button>
          </div>
          <TestimonialCard
            message={mockTestmonials[current - 1].message}
            autor={mockTestmonials[current - 1].author}
            image={mockTestmonials[current - 1].image}
          />
          <div className="col-span-2 flex justify-center items-center">
            <button
              type="button"
              onClick={() => handlePlus()}
              className="flex justify-center items-center h-[1cm] w-[1cm] bg-white text-black"
            >
              <HiOutlineChevronRight size={32} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestiminialSection;

const TestimonialCard = ({ autor, message, image }) => {
  return (
    <div className=" col-span-8 grid grid-cols-12 gap-3">
      <div className=" col-span-full 650px:col-span-3 flex flex-col">
        <img
          src={image}
          alt="img"
          className="w-[160px] h-[160px] rounded-xl self-center"
        />
      </div>
      <div className="text-white col-span-full 650px:col-span-9">
        <div className="flex flex-row gap-1 px-2">
          <BsFillStarFill />
          <BsFillStarFill />
          <BsFillStarFill />
          <BsFillStarFill />
          <BsFillStarFill />
        </div>
        <p className="text-[17px] px-2 mt-2 text-slate-300">
          <span className="text-2">"</span>
          {message.trim(150) + "..."}
          <span className="text-2xl">"</span>
        </p>
        <p className="mt-3 text-primary-600">– {autor}</p>
      </div>
    </div>
  );
};
