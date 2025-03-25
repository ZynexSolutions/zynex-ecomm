import React from 'react';
import HeroBanner4 from '../Components/HeroBanner/HeroBanner4';
import About4 from '../Components/About/About4';
import Services4 from '../Components/Services/Services4';
import HowWork3 from '../Components/HowWork/HowWork3';
import Project3 from '../Components/Project/Project3';
import Pricing1 from '../Components/Pricing/Pricing1';
import Testimonial3 from '../Components/Testimonial/Testimonial3';
import Blog4 from '../Components/Blog/Blog4';
import Cta3 from '../Components/Cta/Cta3';

const page = () => {
    return (
        <div>
            <HeroBanner4
                subtitle="Hi, We are Zynex Solutions"
                title="Reclaim Full Control Of Your Online Store"
                content="Reimagine your online store with infinite customization. Gain total control over your data, limitless design flexibility and endless features that standard e-commerce platforms just can't match."
                btnone="Contact Us"
                btnoneurl="/contact"
                btntwo="Know More"
                btntwourl="/service"
                shape1="/assets/img/shapes/hero4-image-shape.png"
            ></HeroBanner4>
            <About4
                image1="/assets/img/about/about4-img1.png"
                image2="/assets/img/about/about4-img2.png"
                image3="/assets/img/about/about4-img3.png"
                shape1="/assets/img/shapes/about3-shape1.png"
                subTitle="About Us 👋"
                Title="Innovative IT Solutions For Modern Businesses"
                content="Our journey began with a vision to empower businesses of all sizes with cutting-edge technology solutions tailored to their unique needs. Our team of experienced professionals brings together a diverse range"
                expNum="25"
                expCon="Years Experience"
                featurelist={[
                    "Tech Solution",
                    "It Consulting",
                    "Cyber Security",
                ]}
                btnName="Read More"
                btnUrl="/about"
            ></About4>
            <Services4></Services4>
            <HowWork3></HowWork3>
            <Project3></Project3>
            <Pricing1></Pricing1>
            <Testimonial3></Testimonial3>
            <Blog4></Blog4>
            <Cta3></Cta3>
        </div>
    );
};

export default page;
