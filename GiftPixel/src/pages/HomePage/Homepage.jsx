import Hero from "../LandingPage/Hero";
import StepsSection from "../LandingPage/StepsSection";
import FeaturesSection from "../LandingPage/FeaturesSection";
import PromiseCardSection from "../LandingPage/PromiseCardSection";
import AboutSection from "../LandingPage/AboutSection";
import Testimonials from "../LandingPage/Testimonials";

const Homepage = () => {
  return (
    <div>
      <Hero />
      <StepsSection />
      <FeaturesSection />
      <PromiseCardSection />
      <AboutSection />
      <Testimonials />
    </div>
  );
};

export default Homepage;
