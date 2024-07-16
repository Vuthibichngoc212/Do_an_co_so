import MenuBar from "../../components/organisms/Menu/menuBar";
import SlideScreen from "./SlideScreen/SlideScreen";
import AboutSection from "./AboutUs/AboutSection";
import SpecialMenu from "./SpecialMenu/SpecialMenu";
import Contact from "./Contact/Contact";
import Footer from "../../components/organisms/Footer/Footer";

const LandingPageScreen = () => {
  return (
    <>
      <MenuBar />
      <SlideScreen />
      <AboutSection />
      <SpecialMenu />
      <Contact />
      <Footer />
    </>
  );
};
export default LandingPageScreen;
