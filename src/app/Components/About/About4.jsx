import Image from "next/image";
import Link from "next/link";

const About4 = ({ image1, image2, image3, shape1, subTitle, Title, content, expNum, expCon, featurelist, btnName, btnUrl }) => {
    return (
        <div className="about4 sp">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="images">
                            <div className="img1 shape-animaiton4">
                                <Image src="/assets/img/bg/about3-bg.png" alt="img" width={571} height={521} />
                            </div>
                            <div className="img2" data-aos="zoom-out" data-aos-duration="800">
                                <Image src={image1} alt="img" width={247} height={247} />
                            </div>
                            <div className="img3" data-aos="zoom-out" data-aos-duration="1000">
                                <Image src={image2} alt="img" width={400} height={390} />
                            </div>
                            <div className="img4" data-aos="zoom-out" data-aos-duration="1200">
                                <Image src={image3} alt="img" width={270} height={322} />
                            </div>
                            <div className="img5" data-aos="flip-left" data-aos-duration="800">
                                <Image src={shape1} alt="img" width={178} height={174} />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="heading4">
                            <span className="span" data-aos="zoom-in-left" data-aos-duration="700">{subTitle}</span>
                            <h2 className="title tg-element-title">{Title}</h2>
                            <div className="space16"></div>
                            <p data-aos="fade-left" data-aos-duration="700">{content} </p>

                            <div className="space30"></div>
                            <div className="row align-items-center">
                                <div className="col-md-4">
                                    <div className="counter-box" data-aos="fade-left" data-aos-duration="900">
                                        <h3>{expNum}</h3>
                                        <p>{expCon}</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <ul className="list" data-aos="fade-left" data-aos-duration="800">
                                        {featurelist?.map((item, index) => (
                                            <li key={index}><span><i className="bi bi-check-lg"></i></span> {item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="space30"></div>
                            <div className="" data-aos="fade-left" data-aos-duration="1100">
                                <Link className="theme-btn5" href={btnUrl}>{btnName} <span><i className="bi bi-arrow-right"></i></span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About4;