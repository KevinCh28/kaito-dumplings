import Link from 'next/link';
import { useState, useEffect } from "react";
import { getProducts } from "../../utils/productApiUtils";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [dumplings, setDumplings] = useState([]);
  const [gyozas, setGyozas] = useState([]);

  useEffect(() => {
    getProducts().then((res) => {
      setProducts(res);
    });
  }, []);

  useEffect(() => {
    setDumplings(products.filter((product) => product.category === "dumplings"));
    setGyozas(products.filter((product) => product.category === "gyoza"));
  }, [products]);

  return (
    <main className='products_page_main'>
      <div className='products_page_products_wrapper'>
        <div className='products_page_products_container'>
          <h1><span>WE SHIP NATIONWIDE</span></h1>
          <div className='products_page_items_wrapper'>
            <div className='products_page_items_container'>
              <div className='products_page_items_column_wrapper'>
                <div className='products_page_items_column_container'>

                  <div className='products_page_item_wrapper'>
                    <div className='products_page_item_container'>
                      <div className='products_page_item_info_container'>
                        <div className='products_page_item_image_wrapper'>
                          <div>
                            <div className='products_page_item_image'>
                              <a href="">
                                <img src="" alt="" />
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className='products_page_item_text_wrapper'>
                          <form action="post">
                            <input type="hidden" />
                            <div className='products_page_item_details_wrapper'>
                              <div className='products_page_item_details_container'>
                                <div className='products_page_item_price_container'>
                                  <span className='products_page_item_price'>$44.95</span>
                                </div>
                                <h3 className='products_page_item_name'>
                                  <a href="/products/beef-&-cheese">DUMPLINGS</a>
                                </h3>
                                <div>
                                  <ul className='products_page_item_descriptions'>
                                    <li className='products_page_item_description'>
                                      <p>50 Dumplings (Good for 6 Meals!)</p>
                                    </li>
                                    <li className='products_page_item_description'>
                                      <p>Ready in Just 11 Minutes</p>
                                    </li>
                                    <li className='products_page_item_description'>
                                      <p>Steamer Liners Included</p>
                                    </li>
                                  </ul>
                                </div>

                              <div>
                                <div>
                                  <div>
                                    <div>
                                      <input type="hidden" />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className='products_page_product_rating_container'>
                                <div className='products_page_product_ratings'>
                                  <div className='products_page_product_rating'>
                                    <svg className='products_page_product_rating_star'><use></use></svg>
                                    <svg className='products_page_product_rating_star'><use></use></svg>
                                    <svg className='products_page_product_rating_star'><use></use></svg>
                                    <svg className='products_page_product_rating_star'><use></use></svg>
                                    <svg className='products_page_product_rating_star'><use></use></svg>
                                    <span className='products_page_product_rating_amount'>(2018)</span>
                                  </div>
                                </div>
                              </div>

                              </div>
                              <div className='products_page_add_button_container'>
                                <button className='products_page_add_button'>
                                  <span>ADD TO CART</span>
                                  <span>
                                    <div>
                                      <div></div>
                                    </div>
                                  </span>
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='products_page_subscribe_container'>
        <div className='products_page_subscribe'>
          <div>
            <h3><p className='products_page_subscribe_content'>
              JOIN OUR VIP DUMPLING CLUB FOR DISCOUNTS
            </p></h3>
            <a href="/subsciption" className='products_page_subscribe_button'>SUBSCRIBE FOR 10% OFF</a>
          </div>
        </div>
      </div>

      <div className='products_page_socialmedia_container'>
        <div>
          <div><a href=""></a></div>
          <div><a href=""></a></div>
          <div><a href=""></a></div>
          <div><a href=""></a></div>
          <div><a href=""></a></div>
        </div>
      </div>
    </main>
  );
};

export default Products;