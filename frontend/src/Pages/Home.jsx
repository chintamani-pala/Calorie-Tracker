import FeaturesSection from "../Components/Home/Features";
import Footer from "../Components/Home/Footer";
import CTASection from "../Components/Home/GetStarted";
import HeroSection from "../Components/Home/HeroSection";
import Navbar from "../Components/Home/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;
