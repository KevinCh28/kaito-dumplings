import type { NextPage } from 'next';
import Link from 'next/link';

import { useState } from 'react';

const Home: NextPage = () => {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formQuestion, setFormQuestion] = useState('');

  const handleChange = (e: { target: { name: string; value: string; } }) => {
    const { name, value } = e.target;

    switch (name) {
      case 'formName':
        setFormName(value);
        break;
      case 'formEmail':
        setFormEmail(value);
        break;
      case 'formQuestion':
        setFormQuestion(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="main_page_container">
      <div className="featured_product_container">
        <div className="featured_product_background_image">
          <div className="featured_product">
            <div className="featured_product_header">
              <h1>
                {`GRANDMA CALLED.`}
                <br />
                SHE WANTS HER
                <br />
                {`DUMPLINGS BACK.`}
              </h1>
              <ul className="featured_product_description">
                <li>Authentic Chinese soup dumplings</li>
                <li>Made fresh daily with high-quality ingredients</li>
                <li>Steams up in just 11 minutes at home</li>
              </ul>
              <Link href="/products" className="featured_product_button_container">
                <span className="featured_product_button_text">ORDER NOW</span>
              </Link>
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
        <h3>{`EASY, FAST, DELISH.`}</h3>
        <div className="product_carousel_container">
          <div className="product_carousel_cards">

            <div className="product_card_container">
              <div className='product_card_wrapper'>
                <div className="product_card_image">
                  <Link href="products/dumplings-beef-&-cheese">
                    <div className='product_image_wrapper'>
                      <img src="https://cdn.shopify.com/s/files/1/0042/3834/4321/files/formattedbeef-xlb_2_590x.png?v=1675392214" alt="" />
                    </div>
                  </Link>
                </div>
                
                <div className="product_card_info_container">
                  <div className='product_card_info_wrapper'>
                    <div className='product_card_info_column'>
                      <h3><Link href="products/dumplings-beef-&-cheese">{`BEEF & CHEESE`}</Link></h3>
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
                        <p>{`Our new limited-edition Lunar New Year soup dumplings feature a rich beef filling with a savory and oh-so-slightly spicy beef broth.`}</p>
                      </div>
                    </div>

                    <div className='product_card_price_and_button'>
                      <div className='product_card_price'>
                        <span>{`$44.95`}</span>
                      </div>
                      <Link href="products/dumplings-beef-&-cheese" className='product_card_button'>
                        ORDER NOW
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="product_card_container">
              <div className='product_card_wrapper'>
                <div className="product_card_image">
                  <Link href="products/dumplings-beef-&-cheese">
                    <div className='product_image_wrapper'>
                      <img src="https://cdn.shopify.com/s/files/1/0042/3834/4321/files/product-1_f30f9493-ef96-446c-8dc1-e3dfce797f30_360x.png?v=1664295187" alt="" />
                    </div>
                  </Link>
                </div>
                
                <div className="product_card_info_container">
                  <div className='product_card_info_wrapper'>
                    <div className='product_card_info_column'>
                      <h3><Link href="products/dumplings-beef-&-cheese">SOUP DUMPLINGS</Link></h3>
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
                        <p>{`Our new limited-edition Lunar New Year soup dumplings feature a rich beef filling with a savory and oh-so-slightly spicy beef broth.`}</p>
                      </div>
                    </div>

                    <div className='product_card_price_and_button'>
                      <div className='product_card_price'>
                        <span>$44.95</span>
                      </div>
                      <Link href="products/dumplings-beef-&-cheese" className='product_card_button'>
                        PICK MY FLAVOR
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="product_card_container">
              <div className='product_card_wrapper'>
                <div className="product_card_image">
                  <Link href="products/dumplings-beef-&-cheese">
                    <div className='product_image_wrapper'>
                      <img src="https://cdn.shopify.com/s/files/1/0042/3834/4321/files/formattedDDM-3_2_360x.png?v=1665654399" alt="" />
                    </div>
                  </Link>
                </div>
                
                <div className="product_card_info_container">
                  <div className='product_card_info_wrapper'>
                    <div className='product_card_info_column'>
                      <h3><Link href="products/dumplings-beef-&-cheese">NOODLES</Link></h3>
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
                        <p>{`Our new limited-edition Lunar New Year soup dumplings feature a rich beef filling with a savory and oh-so-slightly spicy beef broth.`}</p>
                      </div>
                    </div>

                    <div className='product_card_price_and_button'>
                      <div className='product_card_price'>
                        <span>$44.95</span>
                      </div>
                      <Link href="/products/dumplings-beef-&-cheese" className='product_card_button'>
                        PICK MY FLAVOR
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Link href="/products" className='shop_all_button'>
          <span>SHOP ALL PRODUCTS</span>
        </Link>
      </div>

      <div className="shop_gyozas_container">
        <section>
          <div className='shop_gyoza_image_container'>
            <Link href="/products/gyoza-beef-&-cheese">
              <img src="https://cdn.shopify.com/s/files/1/0042/3834/4321/files/topdown-edited_2_bcefcd16-4d37-494e-afd9-86a87317b0df_720x_1_1512x.jpg?v=1665763652" alt="gyozas" />
            </Link>
            <div className="shop_gyozas_info_container">
              <div className='shop_gyoza_info_wrapper'>
                <img src="https://cdn.shopify.com/s/files/1/0042/3834/4321/files/Group_9_1a01c87c-f83a-4cc8-b48e-24d01839df03_180x.png?v=1664992473" alt="image new" />
                <p>CHINESE DUMPLINGS</p>
                <h3>{`ENJOY THE FLAVORS OF SHANGHAI, SICHUAN & BEIJING`}</h3>
                <Link href="/products/dumplings-beef-&-cheese">SHOP DUMPLINGS</Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className='shipping_container'>
        <div className='shipping_description_container'>
          <div className='shipping_description_wrapper'>
            <div className='shipping_descrpition_text'>
              <h2>SHIPPED FROZEN TO YOUR DOOR</h2>
              <p>{`Made daily and shipped directly to your door. Enjoy our melt-free guarantee!`}</p>
            </div>
            <div className='shipping_description_gif'>
              <img src="https://cdn.shopify.com/s/files/1/0042/3834/4321/files/mila2.gif?v=1673460859" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className='reviews_carousel_container'>
        <div className='reviews_carousel_wrapper'>
          <div className='reviews_carousel_info_container'>

            <div className='reviews_carousel_header'>
              <p>{`DON'T JUST TAKE OUR WORD FOR IT`}</p>
            </div>

            <div className='reviews_carousel_cards_stars'>
              <div>
                <div className='reviews_carousel_cards_stars_wrapper'>
                  <div className='reviews_carousel_stars'>
                    <div>
                      <svg className="reviews_carousel_star" version="1.0" xmlns="http://www.w3.org/2000/svg" width="47px" height="47px" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" fill="#ffb900" stroke="none">
                          <path d="M229 398 l-24 -83 -98 -5 -98 -5 75 -54 c42 -30 76 -59 76 -66 0 -6 -11 -45 -25 -85 -14 -41 -24 -78 -23 -82 2 -4 36 18 75 48 l73 55 72 -55 c40 -30 74 -53 76 -51 2 2 -8 40 -22 85 -14 44 -26 84 -26 88 0 4 34 32 77 62 l76 55 -99 5 -99 5 -24 83 c-13 45 -27 82 -31 82 -4 0 -18 -37 -31 -82z"></path>
                        </g>
                      </svg>
                      <svg className="reviews_carousel_star" version="1.0" xmlns="http://www.w3.org/2000/svg" width="47px" height="47px" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" fill="#ffb900" stroke="none">
                          <path d="M229 398 l-24 -83 -98 -5 -98 -5 75 -54 c42 -30 76 -59 76 -66 0 -6 -11 -45 -25 -85 -14 -41 -24 -78 -23 -82 2 -4 36 18 75 48 l73 55 72 -55 c40 -30 74 -53 76 -51 2 2 -8 40 -22 85 -14 44 -26 84 -26 88 0 4 34 32 77 62 l76 55 -99 5 -99 5 -24 83 c-13 45 -27 82 -31 82 -4 0 -18 -37 -31 -82z"></path>
                        </g>
                      </svg>
                      <svg className="reviews_carousel_star" version="1.0" xmlns="http://www.w3.org/2000/svg" width="47px" height="47px" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" fill="#ffb900" stroke="none">
                          <path d="M229 398 l-24 -83 -98 -5 -98 -5 75 -54 c42 -30 76 -59 76 -66 0 -6 -11 -45 -25 -85 -14 -41 -24 -78 -23 -82 2 -4 36 18 75 48 l73 55 72 -55 c40 -30 74 -53 76 -51 2 2 -8 40 -22 85 -14 44 -26 84 -26 88 0 4 34 32 77 62 l76 55 -99 5 -99 5 -24 83 c-13 45 -27 82 -31 82 -4 0 -18 -37 -31 -82z"></path>
                        </g>
                      </svg>
                      <svg className="reviews_carousel_star" version="1.0" xmlns="http://www.w3.org/2000/svg" width="47px" height="47px" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" fill="#ffb900" stroke="none">
                          <path d="M229 398 l-24 -83 -98 -5 -98 -5 75 -54 c42 -30 76 -59 76 -66 0 -6 -11 -45 -25 -85 -14 -41 -24 -78 -23 -82 2 -4 36 18 75 48 l73 55 72 -55 c40 -30 74 -53 76 -51 2 2 -8 40 -22 85 -14 44 -26 84 -26 88 0 4 34 32 77 62 l76 55 -99 5 -99 5 -24 83 c-13 45 -27 82 -31 82 -4 0 -18 -37 -31 -82z"></path>
                        </g>
                      </svg>
                      <svg className="reviews_carousel_star" version="1.0" xmlns="http://www.w3.org/2000/svg" width="47px" height="47px" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" fill="#ffb900" stroke="none">
                          <path d="M229 398 l-24 -83 -98 -5 -98 -5 75 -54 c42 -30 76 -59 76 -66 0 -6 -11 -45 -25 -85 -14 -41 -24 -78 -23 -82 2 -4 36 18 75 48 l73 55 72 -55 c40 -30 74 -53 76 -51 2 2 -8 40 -22 85 -14 44 -26 84 -26 88 0 4 34 32 77 62 l76 55 -99 5 -99 5 -24 83 c-13 45 -27 82 -31 82 -4 0 -18 -37 -31 -82z"></path>
                        </g>
                      </svg>
                      <span className='total_review_amount'>
                        (6,866)
                      </span>
                    </div>
                  </div>
                  <span className='five_star_reviews'>
                    {`5-STAR REVIEWS`}
                  </span>
                </div>
              </div>
            </div>

            <div className='reviews_carousel_cards_container'>
              <div>
                <div className='reviews_carousel_cards_container_height'>
                  <div>
                    <div className='reviews_carousel_cards_wrapper'>
                      <div className='reviews_carousel_cards'>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="featured-blog-post-block">
        <div className="featured-blog-post">
          <div className="featured-blog-post-image">
            <div>
              <div>BLOG IMAGE</div>
              <div>
                <div>
                  <div>
                    <div>
                      <p>NOTE FROM THE FOUNDERS</p>
                    </div>
                    <div>
                      <p></p>
                      <Link href="">OUR STORY</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact_us_container">
        <div className="contact_us_wrapper">
          <div className='contact_us_form_container'>
            <div className='contact_us_form_header'>
              <h3>{`QUESTIONS, COMMENTS, FEEDBACK?`}</h3>
            </div>
            <form className='contact_us_form'>
              <input type="text" placeholder='Name' value={formName} onChange={handleChange}/>
              <input type="email" placeholder='Email' value={formEmail} onChange={handleChange}/>
              <input type="text" placeholder='What can we do for you?' value={formQuestion} onChange={handleChange}/>
              <button type="submit">GET IN TOUCH</button>
            </form>
          </div>
          <div className='contact_us_image_container'>
            <div className='contact_us_image1'>
              <img src="https://cdn.shopify.com/s/files/1/0042/3834/4321/files/baby-alt-min_590x.png?v=1658852252" alt="" />
            </div>
            <div className='contact_us_image2'>
              <img src="https://cdn.shopify.com/s/files/1/0042/3834/4321/files/background-image-2_360x.png?v=1613163280" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;