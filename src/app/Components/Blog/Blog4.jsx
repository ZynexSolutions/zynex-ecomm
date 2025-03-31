import Image from "next/image";
import Link from "next/link";

const Blog4 = () => {
  return (
    <div className="blog4 sp">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 m-auto text-center">
            <div className="heading4">
              <span
                className="span"
                data-aos="zoom-in-left"
                data-aos-duration="700"
              >
                Blog & News 👋
              </span>
              <h2 className="title tg-element-title">
                See Our Latest Blog & News
              </h2>
            </div>
          </div>
        </div>

        <div className="space30"></div>
        <div className="row">
          <div className="col-lg-6">
            <div
              className="blog4-box"
              data-aos="zoom-in-up"
              data-aos-duration="900"
            >
              <div className="image image-anime">
                <Image
                  src="/images/ecommblog1.png"
                  alt="img"
                  width={636}
                  height={457}
                />
              </div>
              <div className="heading4">
                <div className="tags">
                  <a href="#" className="date">
                    <Image
                      src="/assets/img/icons/date3.png"
                      alt="img"
                      width={20}
                      height={20}
                    />
                    Feb 10, 25
                  </a>
                  <a href="#" className="date outhor">
                    <Image
                      src="/assets/img/icons/blog-icon1.png"
                      alt="img"
                      width={16}
                      height={16}
                    />
                    Rahul B.
                  </a>
                </div>
                <h3>
                  <Link href="/blog/blog-details">
                    How AI is Revolutionizing Online Retail
                  </Link>
                </h3>
                <div className="space16"></div>
                <p>
                  The eCommerce industry is evolving at a breakneck pace, and
                  Artificial Intelligence (AI) is at the heart of this
                  transformation.
                </p>
                <div className="space16"></div>
                <Link href="/blog/blog-details" className="learn">
                  Read More{" "}
                  <span>
                    <i className="bi bi-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div
              className="blog4-box"
              data-aos="zoom-in-up"
              data-aos-duration="700"
            >
              <div className="image image-anime">
                <Image
                  src="/images/ecommblog2.png"
                  alt="img"
                  width={636}
                  height={457}
                />
              </div>
              <div className="heading4">
                <div className="tags">
                  <a href="#" className="date">
                    <Image
                      src="/assets/img/icons/date3.png"
                      alt="img"
                      width={20}
                      height={20}
                    />
                    Feb 16, 25
                  </a>
                  <a href="#" className="date outhor">
                    <Image
                      src="/assets/img/icons/blog-icon1.png"
                      alt="img"
                      width={16}
                      height={16}
                    />
                    Sabari H.
                  </a>
                </div>
                <h3>
                  <Link href="/blog/blog-details">
                    Why Medusa is better than Shopify?
                  </Link>
                </h3>
                <div className="space16"></div>
                <p>
                  In the fast-evolving world of e-commerce, the choice of
                  platform can make or break your online business.
                </p>
                <div className="space16"></div>
                <Link href="/blog/blog-details" className="learn">
                  Read More{" "}
                  <span>
                    <i className="bi bi-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog4;
