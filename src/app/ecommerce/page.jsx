import React from "react";
import HeroBanner4 from "../Components/HeroBanner/HeroBanner4";
import About4 from "../Components/About/About4";
import Services4 from "../Components/Services/Services4";
import HowWork3 from "../Components/HowWork/HowWork3";
import Project3 from "../Components/Project/Project3";
import Pricing1 from "../Components/Pricing/Pricing1";
import Testimonial3 from "../Components/Testimonial/Testimonial3";
import Blog4 from "../Components/Blog/Blog4";
import Cta3 from "../Components/Cta/Cta3";

const page = () => {
  return (
    <div>
      <HeroBanner4
        subtitle="For Ambitious Store Owners"
        title="Reclaim Full Control Of Your Online Store"
        content="Reimagine your online store with infinite customization. Gain total control over your data, limitless design flexibility and endless features that standard e-commerce platforms just can't match."
        btnone="Contact Us"
        btnoneurl="/contact"
        btntwo="Know More"
        btntwourl="/service"
        shape1="/assets/img/shapes/hero4-image-shape.png"
      ></HeroBanner4>
      <About4
        image1="/images/ecomm2.png"
        image2="/images/ecomm3.png"
        image3="/images/ecomm4.png"
        shape1="/images/ecommshape.png"
        subTitle="About Us 👋"
        Title="Your Partners in Building Your Next Dream Store"
        content="Go beyond templates with Zynex Solutions. We craft high-performance, truly custom e-commerce stores. Achieve unparalleled design freedom, integrate the exact features you need, and own your platform for scalable growth and exceptional performance."
        expNum="4+"
        expCon="Years Experience"
        featurelist={[
          "True Design Freedom",
          "Unparalleled Features",
          "Lower Maintenance Costs",
        ]}
        btnName="Contact Us"
        btnUrl="/about"
      ></About4>
      <Services4></Services4>
      {/* <HowWork3></HowWork3> */}
      <Project3></Project3>
      {/* <Testimonial3></Testimonial3> */}
      <Pricing1></Pricing1>
      <Blog4></Blog4>
      <Cta3></Cta3>
    </div>
  );
};

export default page;
