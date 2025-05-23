import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home from "@/components/layout/Home/home";
import AboutUS from "@/components/layout/AboutUS/AboutUS";
import Features from "@/components/layout/Features/Features";
import HowToUse from "@/components/layout/HowToUse/HowToUse";
import ContactPage from "@/components/layout/ContactUS/ContactUs";

const home = () => {
  return (
    <div className="bg-gray-900 text-white ">
      <Navbar />
      <Home />
      <AboutUS />
      <Features />
      <HowToUse />
      <ContactPage />
      <Footer />
    </div>
  );
};

export default home;
