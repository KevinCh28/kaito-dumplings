import { useState, useEffect } from "react";
import { increaseItemQuantity } from "../../utils/cartApiUtils";
import { getCurrentUser } from '@/src/utils/sessionApiUtils';
import Modal from '../../components/modal/modal';
import Cart from '../../components/cart/cart';

const Products = () => {
  const dumplings = {
    'beef-&-cheese': '63efa9419010d97ce1747161',
    'chicken-&-cabbage': '63efa96f9010d97ce1747163',
    'pork-&-chieves': '63efa8d89010d97ce1747159',
    'veggie': '63efa9119010d97ce174715c'
  }
  const gyoza = {
    'beef-&-cheese': '63efa8319010d97ce1747153',
    'chicken-&-cabbage': '63efa8b49010d97ce1747155',
    'pork-&-chieves': '63efa8d19010d97ce1747157',
    'veggie': '63efa9259010d97ce174715f'
  }
  const [showModal, setShowModal] = useState(false);
  const [dumplingsId, setDumplingsId] = useState('63efa9419010d97ce1747161');
  const [gyozaId, setGyozaId] = useState('63efa8319010d97ce1747153');
  const [user, setUser] = useState({});

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAddDumplingsToCart = (e: { preventDefault: () => void; target: { value: any; }; }) => {
    e.preventDefault();
    increaseItemQuantity(user._id, dumplingsId)
      .then((res) => {
        setShowModal(true);
      })
      .catch((err) => {
        console.log(err);
      }
    );
  };

  const handleAddGyozaToCart = (e: { preventDefault: () => void; target: { value: any; }; }) => {
    e.preventDefault();
    increaseItemQuantity(user._id, gyozaId)
      .then((res) => {
        setShowModal(true);
      })
      .catch((err) => {
        console.log(err);
      }
      );
  };

  const handleCartModal = () => {
    if (!showModal) return null
    return (
      <Modal onClose={() => setShowModal(false)} >
        <Cart userId={user._id} />
      </Modal>
    )
  };

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
                                  <a href="/products/beef-&-cheese">DUMPLINGS (50 PC)</a>
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
                                <button className='products_page_add_button' onClick={handleAddDumplingsToCart}>
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
                                  <a href="/products/dumplings-beef-&-cheese">DUMPLINGS (50 PC)</a>
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
                                <button className='products_page_add_button' onClick={handleAddDumplingsToCart}>
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
                                  <a href="/products/dumplings-beef-&-cheese">GYOZAS (50 PC)</a>
                                </h3>
                                <div>
                                  <ul className='products_page_item_descriptions'>
                                    <li className='products_page_item_description'>
                                      <p>50 Gyozas (Good for 6 Meals!)</p>
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
                                <button className='products_page_add_button' onClick={handleAddGyozaToCart}>
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
      {handleCartModal()}
    </main>
  );
};

export default Products;