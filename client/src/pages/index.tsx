import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className="main_page_container">
      <div className="featured_product_container">
        <div className="featured_product_background_image">
          <div className="featured_product">
            <div className="featured_product_header">
              <h1>
                GRANDMA CALLED.
                <br />
                SHE WANTS HER
                <br />
                DUMPLINGS BACK.
              </h1>
              <ul className="featured_product_description">
                <li>Authentic Chinese soup dumplings</li>
                <li>Made fresh daily with high-quality ingredients</li>
                <li>Steams up in just 11 minutes at home</li>
              </ul>
              <div className="featured_product_button_container">
                <Link href="/products" className="featured_product_button_text">ORDER NOW</Link>
              </div>
            </div>
            <div className="featured_product_image_container">
              <img
                src="//cdn.shopify.com/s/files/1/0042/3834/4321/files/assets_bc154811e83d4532a4f4f57c9d96f6c3_a16e5f1e74a34f049e81832530bf9734.png?v=1670451362"
                alt="featured product image"
                className="featured_product_image"
                data-src="//cdn.shopify.com/s/files/1/0042/3834/4321/files/assets_bc154811e83d4532a4f4f57c9d96f6c3_a16e5f1e74a34f049e81832530bf9734.png?v=1670451362"
                data-widths="[180, 360, 480, 590, 720, 900, 1080, 1296, 1512, 1728, 2048]"
                data-sizes="auto"
                sizes="504px"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="top3_products_container">
        <h3>EASY, FAST, DELISH.</h3>
        <div className="product_carousel_container">
          <div className="product_carousel_cards">

            <div className="product_card_container">
              <div className='product_card_wrapper'>
                <div className="product_card_image">
                  <a href="/products/beef-&-cheese">
                    <div className='product_image_wrapper'>
                      <img src="https://cdn.shopify.com/s/files/1/0042/3834/4321/files/formattedbeef-xlb_2_590x.png?v=1675392214" alt="" />
                    </div>
                  </a>
                </div>
                
                <div className="product_card_info_container">
                  <div className='product_card_info_wrapper'>
                    <div className='product_card_info_column'>
                      <h3><a href="/products/beef-&-cheese">BEEF & CHEESE</a></h3>
                      <div className='product_review'>
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="47px" height="47px" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet">
                          <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" fill="#1b2137" stroke="none">
                            <path d="M229 398 l-24 -83 -98 -5 -98 -5 75 -54 c42 -30 76 -59 76 -66 0 -6 -11 -45 -25 -85 -14 -41 -24 -78 -23 -82 2 -4 36 18 75 48 l73 55 72 -55 c40 -30 74 -53 76 -51 2 2 -8 40 -22 85 -14 44 -26 84 -26 88 0 4 34 32 77 62 l76 55 -99 5 -99 5 -24 83 c-13 45 -27 82 -31 82 -4 0 -18 -37 -31 -82z"></path>
                          </g>
                        </svg>
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="47px" height="47px" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet">
                          <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" fill="#1b2137" stroke="none">
                            <path d="M229 398 l-24 -83 -98 -5 -98 -5 75 -54 c42 -30 76 -59 76 -66 0 -6 -11 -45 -25 -85 -14 -41 -24 -78 -23 -82 2 -4 36 18 75 48 l73 55 72 -55 c40 -30 74 -53 76 -51 2 2 -8 40 -22 85 -14 44 -26 84 -26 88 0 4 34 32 77 62 l76 55 -99 5 -99 5 -24 83 c-13 45 -27 82 -31 82 -4 0 -18 -37 -31 -82z"></path>
                          </g>
                        </svg>
                        
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="47px" height="47px" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet">
                          <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" fill="#1b2137" stroke="none">
                            <path d="M229 398 l-24 -83 -98 -5 -98 -5 75 -54 c42 -30 76 -59 76 -66 0 -6 -11 -45 -25 -85 -14 -41 -24 -78 -23 -82 2 -4 36 18 75 48 l73 55 72 -55 c40 -30 74 -53 76 -51 2 2 -8 40 -22 85 -14 44 -26 84 -26 88 0 4 34 32 77 62 l76 55 -99 5 -99 5 -24 83 c-13 45 -27 82 -31 82 -4 0 -18 -37 -31 -82z"></path>
                          </g>
                        </svg>
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="47px" height="47px" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet">
                          <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" fill="#1b2137" stroke="none">
                            <path d="M229 398 l-24 -83 -98 -5 -98 -5 75 -54 c42 -30 76 -59 76 -66 0 -6 -11 -45 -25 -85 -14 -41 -24 -78 -23 -82 2 -4 36 18 75 48 l73 55 72 -55 c40 -30 74 -53 76 -51 2 2 -8 40 -22 85 -14 44 -26 84 -26 88 0 4 34 32 77 62 l76 55 -99 5 -99 5 -24 83 c-13 45 -27 82 -31 82 -4 0 -18 -37 -31 -82z"></path>
                          </g>
                        </svg>
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="47px" height="47px" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet">
                          <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" fill="#1b2137" stroke="none">
                            <path d="M229 398 l-24 -83 -98 -5 -98 -5 75 -54 c42 -30 76 -59 76 -66 0 -6 -11 -45 -25 -85 -14 -41 -24 -78 -23 -82 2 -4 36 18 75 48 l73 55 72 -55 c40 -30 74 -53 76 -51 2 2 -8 40 -22 85 -14 44 -26 84 -26 88 0 4 34 32 77 62 l76 55 -99 5 -99 5 -24 83 c-13 45 -27 82 -31 82 -4 0 -18 -37 -31 -82z"></path>
                          </g>
                        </svg>
                      </div>
                      <div className='product_card_info_product_description'>
                        <p>Our new limited-edition Lunar New Year soup dumplings feature a rich beef filling with a savory and oh-so-slightly spicy beef broth.</p>
                      </div>
                      {/* <div className='product_card_info_variants'>
                        <div className='product_card_variants_container'>
                          <div className='product_card_variants_wrapper'>
                            <div className='product_card_variant'>
                              <button>BEEF & CHEESE,</button>
                            </div>
                            <div className='product_card_variant'>
                              <button>PORK & CHIEVES,</button>
                            </div>
                            <div className='product_card_variant'>
                              <button>CHICKEN & CABBAGE,</button>
                            </div>
                            <div className='product_card_variant'>
                              <button>and VEGE</button>
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>

                    <div className='product_card_price_and_button'>
                      <div className='product_card_price'>
                        <span>$44.95</span>
                      </div>
                      <a href="/products/pork-&-chieves" className='product_card_button'>
                        ORDER NOW
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="product_card_container">
              <div className='product_card_wrapper'>
                <div className="product_card_image">
                  <a href="/products/beef-&-cheese">
                    <div className='product_image_wrapper'>
                      <img src="https://cdn.shopify.com/s/files/1/0042/3834/4321/files/product-1_f30f9493-ef96-446c-8dc1-e3dfce797f30_360x.png?v=1664295187" alt="" />
                    </div>
                  </a>
                </div>
                
                <div className="product_card_info_container">
                  <div className='product_card_info_wrapper'>
                    <div className='product_card_info_column'>
                      <h3><a href="/products/beef-&-cheese">SOUP DUMPLINGS</a></h3>
                      <div className='product_review'>
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="47px" height="47px" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet">
                          <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" fill="#1b2137" stroke="none">
                            <path d="M229 398 l-24 -83 -98 -5 -98 -5 75 -54 c42 -30 76 -59 76 -66 0 -6 -11 -45 -25 -85 -14 -41 -24 -78 -23 -82 2 -4 36 18 75 48 l73 55 72 -55 c40 -30 74 -53 76 -51 2 2 -8 40 -22 85 -14 44 -26 84 -26 88 0 4 34 32 77 62 l76 55 -99 5 -99 5 -24 83 c-13 45 -27 82 -31 82 -4 0 -18 -37 -31 -82z"></path>
                          </g>
                        </svg>
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="47px" height="47px" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet">
                          <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" fill="#1b2137" stroke="none">
                            <path d="M229 398 l-24 -83 -98 -5 -98 -5 75 -54 c42 -30 76 -59 76 -66 0 -6 -11 -45 -25 -85 -14 -41 -24 -78 -23 -82 2 -4 36 18 75 48 l73 55 72 -55 c40 -30 74 -53 76 -51 2 2 -8 40 -22 85 -14 44 -26 84 -26 88 0 4 34 32 77 62 l76 55 -99 5 -99 5 -24 83 c-13 45 -27 82 -31 82 -4 0 -18 -37 -31 -82z"></path>
                          </g>
                        </svg>
                        
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="47px" height="47px" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet">
                          <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" fill="#1b2137" stroke="none">
                            <path d="M229 398 l-24 -83 -98 -5 -98 -5 75 -54 c42 -30 76 -59 76 -66 0 -6 -11 -45 -25 -85 -14 -41 -24 -78 -23 -82 2 -4 36 18 75 48 l73 55 72 -55 c40 -30 74 -53 76 -51 2 2 -8 40 -22 85 -14 44 -26 84 -26 88 0 4 34 32 77 62 l76 55 -99 5 -99 5 -24 83 c-13 45 -27 82 -31 82 -4 0 -18 -37 -31 -82z"></path>
                          </g>
                        </svg>
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="47px" height="47px" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet">
                          <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" fill="#1b2137" stroke="none">
                            <path d="M229 398 l-24 -83 -98 -5 -98 -5 75 -54 c42 -30 76 -59 76 -66 0 -6 -11 -45 -25 -85 -14 -41 -24 -78 -23 -82 2 -4 36 18 75 48 l73 55 72 -55 c40 -30 74 -53 76 -51 2 2 -8 40 -22 85 -14 44 -26 84 -26 88 0 4 34 32 77 62 l76 55 -99 5 -99 5 -24 83 c-13 45 -27 82 -31 82 -4 0 -18 -37 -31 -82z"></path>
                          </g>
                        </svg>
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="47px" height="47px" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet">
                          <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" fill="#1b2137" stroke="none">
                            <path d="M229 398 l-24 -83 -98 -5 -98 -5 75 -54 c42 -30 76 -59 76 -66 0 -6 -11 -45 -25 -85 -14 -41 -24 -78 -23 -82 2 -4 36 18 75 48 l73 55 72 -55 c40 -30 74 -53 76 -51 2 2 -8 40 -22 85 -14 44 -26 84 -26 88 0 4 34 32 77 62 l76 55 -99 5 -99 5 -24 83 c-13 45 -27 82 -31 82 -4 0 -18 -37 -31 -82z"></path>
                          </g>
                        </svg>
                      </div>
                      <div className='product_card_info_product_description'>
                        <p>Our new limited-edition Lunar New Year soup dumplings feature a rich beef filling with a savory and oh-so-slightly spicy beef broth.</p>
                      </div>
                    </div>

                    <div className='product_card_price_and_button'>
                      <div className='product_card_price'>
                        <span>$44.95</span>
                      </div>
                      <a href="/products/beef-&-cheese" className='product_card_button'>
                        PICK MY FLAVOR
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="product_card_container">
              <div className='product_card_wrapper'>
                <div className="product_card_image">
                  <a href="/products/beef-&-cheese">
                    <div className='product_image_wrapper'>
                      <img src="https://cdn.shopify.com/s/files/1/0042/3834/4321/files/formattedDDM-3_2_360x.png?v=1665654399" alt="" />
                    </div>
                  </a>
                </div>
                
                <div className="product_card_info_container">
                  <div className='product_card_info_wrapper'>
                    <div className='product_card_info_column'>
                      <h3><a href="/products/beef-&-cheese">NOODLES</a></h3>
                      <div className='product_review'>
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="47px" height="47px" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet">
                          <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" fill="#1b2137" stroke="none">
                            <path d="M229 398 l-24 -83 -98 -5 -98 -5 75 -54 c42 -30 76 -59 76 -66 0 -6 -11 -45 -25 -85 -14 -41 -24 -78 -23 -82 2 -4 36 18 75 48 l73 55 72 -55 c40 -30 74 -53 76 -51 2 2 -8 40 -22 85 -14 44 -26 84 -26 88 0 4 34 32 77 62 l76 55 -99 5 -99 5 -24 83 c-13 45 -27 82 -31 82 -4 0 -18 -37 -31 -82z"></path>
                          </g>
                        </svg>
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="47px" height="47px" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet">
                          <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" fill="#1b2137" stroke="none">
                            <path d="M229 398 l-24 -83 -98 -5 -98 -5 75 -54 c42 -30 76 -59 76 -66 0 -6 -11 -45 -25 -85 -14 -41 -24 -78 -23 -82 2 -4 36 18 75 48 l73 55 72 -55 c40 -30 74 -53 76 -51 2 2 -8 40 -22 85 -14 44 -26 84 -26 88 0 4 34 32 77 62 l76 55 -99 5 -99 5 -24 83 c-13 45 -27 82 -31 82 -4 0 -18 -37 -31 -82z"></path>
                          </g>
                        </svg>
                        
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="47px" height="47px" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet">
                          <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" fill="#1b2137" stroke="none">
                            <path d="M229 398 l-24 -83 -98 -5 -98 -5 75 -54 c42 -30 76 -59 76 -66 0 -6 -11 -45 -25 -85 -14 -41 -24 -78 -23 -82 2 -4 36 18 75 48 l73 55 72 -55 c40 -30 74 -53 76 -51 2 2 -8 40 -22 85 -14 44 -26 84 -26 88 0 4 34 32 77 62 l76 55 -99 5 -99 5 -24 83 c-13 45 -27 82 -31 82 -4 0 -18 -37 -31 -82z"></path>
                          </g>
                        </svg>
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="47px" height="47px" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet">
                          <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" fill="#1b2137" stroke="none">
                            <path d="M229 398 l-24 -83 -98 -5 -98 -5 75 -54 c42 -30 76 -59 76 -66 0 -6 -11 -45 -25 -85 -14 -41 -24 -78 -23 -82 2 -4 36 18 75 48 l73 55 72 -55 c40 -30 74 -53 76 -51 2 2 -8 40 -22 85 -14 44 -26 84 -26 88 0 4 34 32 77 62 l76 55 -99 5 -99 5 -24 83 c-13 45 -27 82 -31 82 -4 0 -18 -37 -31 -82z"></path>
                          </g>
                        </svg>
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="47px" height="47px" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet">
                          <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" fill="#1b2137" stroke="none">
                            <path d="M229 398 l-24 -83 -98 -5 -98 -5 75 -54 c42 -30 76 -59 76 -66 0 -6 -11 -45 -25 -85 -14 -41 -24 -78 -23 -82 2 -4 36 18 75 48 l73 55 72 -55 c40 -30 74 -53 76 -51 2 2 -8 40 -22 85 -14 44 -26 84 -26 88 0 4 34 32 77 62 l76 55 -99 5 -99 5 -24 83 c-13 45 -27 82 -31 82 -4 0 -18 -37 -31 -82z"></path>
                          </g>
                        </svg>
                      </div>
                      <div className='product_card_info_product_description'>
                        <p>Our new limited-edition Lunar New Year soup dumplings feature a rich beef filling with a savory and oh-so-slightly spicy beef broth.</p>
                      </div>
                    </div>

                    <div className='product_card_price_and_button'>
                      <div className='product_card_price'>
                        <span>$44.95</span>
                      </div>
                      <a href="/products/beef-&-cheese" className='product_card_button'>
                        PICK MY FLAVOR
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <a href="/products" className='shop_all_button'>
          <span>SHOP ALL PRODUCTS</span>
        </a>
      </div>

      <div className="shop-gyozas-block">
        <div className="shop-gyozas-image">
          IMAGE
        </div>
        <div className="shop-gyozas-info">
          <h3>Shop Gyoza</h3>
          <p>Product description</p>
          <button>SHOP GYOZAs</button>
        </div>
      </div>

      <div className="gif-shipping-description-block">
        <div className="gif-shipping-description">
          <h3>FREE GIFTS & SHIPPING</h3>
          GIF
        </div>
      </div>

      <div className="reviews-carousel-block">
        <div className="reviews-carousel">
          <div className="review-card">
            <div className="review-card-image">
              <a href="/products/beef-&-cheese">
                <div className='product_image_wrapper'>
                  <img src="https://cdn.shopify.com/s/files/1/0042/3834/4321/files/formattedbeef-xlb_2_590x.png?v=1675392214" alt="" />
                </div>
              </a>
            </div>
            <div className="review-card-info">
              <h4>Review Name</h4>
              <p>Review description</p>
            </div>
          </div>
          <div className="review-card">
            <div className="review-card-image">
              IMAGE
            </div>
            <div className="review-card-info">
              <h4>Review Name</h4>
              <p>Review description</p>
            </div>
          </div>
          <div className="review-card">
            <div className="review-card-image">
              IMAGE
            </div>
            <div className="review-card-info">
              <h4>Review Name</h4>
              <p>Review description</p>
            </div>
          </div>
          <div className="review-card">
            <div className="review-card-image">
              IMAGE
            </div>
            <div className="review-card-info">
              <h4>Review Name</h4>
              <p>Review description</p>
            </div>
          </div>
        </div>
      </div>

      <div className="featured-blog-post-block">
        <div className="featured-blog-post">
          <div className="featured-blog-post-image">
            IMAGE
          </div>
          <div className="featured-blog-post-info">
            <h3>Featured Blog Post</h3>
            <p>Blog post description</p>
            <Link href={''}>READ MORE</Link>
          </div>
        </div>
      </div>

      <div className="contact-us-block">
        <div className="contact-us">
          <h3>QUESTIONS, COMMENTS, FEEDBACK?</h3>
          <textarea placeholder="Name"></textarea>
          <textarea placeholder="Email"></textarea>
          <textarea placeholder="How's it going?"></textarea>
          <button>GET IN TOUCH</button>
        </div>
        <div className="contact-us-mage">
          IMAGE
        </div>
      </div>
    </div>
  );
};

export default Home;