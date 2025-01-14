import React from "react";
import TestimonialSlider from "../../components/TestimonialSlider";


const testimonialsData = [
  {
    text: "What I love most about this platform is its simplicity and effectiveness. It makes complex processes easy to handle, saving me time and effort. It’s truly a game-changer in my day-to-day activities!",
    name: "Mercy Okereke",
    image:
      "https://res.cloudinary.com/dqbbm0guw/image/upload/v1736598509/african-woman-successful-entrepreneur-wearing-glasses-face-portrait_1_1_eecgr3.png",
  },
  {
    text: "This platform has completely transformed how I manage my daily tasks. The intuitive design makes navigation seamless, and the features are exactly what I needed. I can't imagine going back to my old system!",
    name: "Adeleke Sodiq",
    image:
      "https://res.cloudinary.com/dqbbm0guw/image/upload/v1736598510/african-woman-successful-entrepreneur-wearing-glasses-face-portrait_1_teb7bd.png",
  },
  {
    text: "From the moment I started using this platform, it felt like a perfect fit. Everything is intuitive, and the tools are tailored to make life easier. It’s not just functional but also enjoyable to use!",
    name: "Harris Jane",
    image:
      "https://res.cloudinary.com/dqbbm0guw/image/upload/v1736598501/R_3_1_fmctna.png",
  },
  
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <TestimonialSlider testimonials={testimonialsData} />
    </section>
  );
};

export default Testimonials;
