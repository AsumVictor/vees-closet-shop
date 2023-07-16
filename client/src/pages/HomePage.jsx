import HeroSection from "../components/sections/HeroSection";
import Categories from "../components/sections/Categories";
import NewArrival from "../components/sections/NewArrival";
import Testimonial from "../components/sections/Testimonial";
import Footer from "../components/sections/Footer";
import FAQPage from '../components/sections/FAQPage.jsx'

function HomePage() {
  return (
    <div className="w-full px-2">
      <HeroSection />
      <Categories />
      <NewArrival />
      <Testimonial />
    </div>
  );
}

export default HomePage;
