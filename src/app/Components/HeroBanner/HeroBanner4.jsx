"use client"
import Slider from "react-slick";
import parse from 'html-react-parser';
import Link from "next/link";
import Image from "next/image";

const HeroBanner4 = ({ subtitle, title, content, btnone, btnoneurl, btntwo, btntwourl, shape1 }) => {

  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1399,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
        }
      }, {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="hero4">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="main-heading">
              <span className="span">{subtitle}</span>
              <h1>{title}</h1>
              <p>{parse(content)}</p>

              <div className="space30"></div>
              <div className="buttons">
                <Link className="theme-btn5" href={btnoneurl}>{btnone} <span><i className="bi bi-arrow-right"></i></span></Link>
                <Link className="theme-btn6" href={btntwourl}>{btntwo} <span><i className="bi bi-arrow-right"></i></span></Link>
              </div>

              <div className="slider-area">
                <h3>TRUSTED BY LEADING BRAND</h3>
                <div className="logo-slider owl-carousel hero_gap_4">
                  <Slider {...settings}>
                    <div className="single-slider">
                      <Image src="/assets/custom/logo/img1.png" alt="img" width={94} height={24} />
                    </div>
                    <div className="single-slider">
                      <Image src="/assets/custom/logo/img2.png" alt="img" width={94} height={24} />
                    </div>
                    <div className="single-slider">
                      <Image src="/assets/custom/logo/img3.png" alt="img" width={94} height={24} />
                    </div>
                    <div className="single-slider">
                      <Image src="/assets/custom/logo/img4.png" alt="img" width={94} height={18} />
                    </div>
                  </Slider>
                </div>
              </div>
              <Image className="image-shape shape-animaiton3" src={shape1} alt="img" width={332} height={162} />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="main-image">
              <Image src="/assets/img/hero/hero4-img.png" alt="img" width={694} height={542} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner4;