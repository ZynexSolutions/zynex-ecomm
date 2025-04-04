import Link from 'next/link';
// import data from '../../Data/home4/services4.json';
import SectionTitle2 from '../Common/SectionTitle2';
import parse from 'html-react-parser';
import Image from 'next/image';

const data = [
    {
        "icon": "/assets/custom/icons/icon1.png",
        "title": "Complete Design <br/> Flexibility",
        "desc": "Unlock actionable insights and drive informed decision-making with our advanced",
        "btnLink": "/service/service-details",
        "addClass": "service4-box"
    },
    {
        "icon": "/assets/custom/icons/icon2.png",
        "title": "Comprehensive <br/>Dashboard",
        "desc": "Harness the power of the cloud with our robust cloud computing solutions.",
        "btnLink": "/service/service-details",
        "addClass": "service4-box"
    },
    {
        "icon": "/assets/custom/icons/icon3.png",
        "title": "POS & Multi Channel <br/> Selling",
        "desc": "Unlock actionable insights and drive informed decision-making with our advanced",
        "btnLink": "/service/service-details",
        "addClass": "service4-box"
    },
    {
        "icon": "/assets/custom/icons/icon4.png",
        "title": "Currency Localization & Multi Region Support",
        "desc": "Navigate the complexities of the digital landscape with confidence with our IT.",
        "btnLink": "/service/service-details",
        "addClass": "service4-box"
    },
    // {
    //     "icon": "/assets/img/icons/service4-icon3.png",
    //     "title": "Automation Triggers<br/><br/>",
    //     "desc": "Protect your business from evolving cyber threats and ensure compliance.",
    //     "btnLink": "/service/service-details",
    //     "addClass": "service4-box"
    // },
    // {
    //   "icon": "/assets/img/icons/service4-icon1.png",
    //   "title": "Payment Gateway <br/> Integration",
    //   "desc": "Unlock actionable insights and drive informed decision-making with our advanced",
    //   "btnLink": "/service/service-details",
    //   "addClass": "service4-box"
    // },
    // {
    //   "icon": "/assets/img/icons/service4-icon1.png",
    //   "title": "Advanced Promotions Engine",
    //   "desc": "Unlock actionable insights and drive informed decision-making with our advanced",
    //   "btnLink": "/service/service-details",
    //   "addClass": "service4-box"
    // },
    // {
    //   "icon": "/assets/img/icons/service4-icon1.png",
    //   "title": "Easy Social Logins<br/><br/>",
    //   "desc": "Unlock actionable insights and drive informed decision-making with our advanced",
    //   "btnLink": "/service/service-details",
    //   "addClass": "service4-box"
    // }
]

const Services4 = () => {
    return (
        <div className="service4 sp">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 m-auto text-center">
                        <div className="heading4">
                            <SectionTitle2
                                SubTitle="Tailored For You ✨"
                                Title="Powerful Features that Standard Platforms Just Can't Match"
                            ></SectionTitle2>
                        </div>
                    </div>
                </div>

                <div className="space30"></div>
                <div className="row">
                    {data.map((item, i) => (
                        <div key={i} className="col-lg-3 col-md-6" data-aos="zoom-in-up" data-aos-duration="800">
                            <div className={item.addClass}>
                                <div className="icon">
                                    <Image src={item.icon} alt="img" width={40} height={40} />
                                </div>
                                <div className="heading4">
                                    <h4><Link href={item.btnLink}>{parse(item.title)}</Link></h4>
                                    <div className="space16"></div>
                                    <p>{item.desc} </p>
                                    <div className="space16"></div>
                                    <Link href={item.btnLink} className="learn-btn">Read More <span><i className="bi bi-arrow-right"></i></span></Link>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

                <div className="space40"></div>
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="" data-aos="zoom-in-up" data-aos-duration="700">
                            <Link className="theme-btn5" href="/service">More Services <span><i className="bi bi-arrow-right"></i></span></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services4;