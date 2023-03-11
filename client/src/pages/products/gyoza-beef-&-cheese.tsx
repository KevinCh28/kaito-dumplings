import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getProduct } from '../../utils/productApiUtils';
import { increaseItemQuantity } from "../../utils/cartApiUtils";
import Cart from '../../components/cart/cart';
import { getCurrentUser } from '@/src/utils/sessionApiUtils';

const GyozaBeefCheese = () => {
  const router = useRouter();
  const pathName = router.pathname.split('-').slice(1).join('-');
  const flavors = {
    'beef-&-cheese': '63efa8319010d97ce1747153',
    'chicken-&-cabbage': '63efa8b49010d97ce1747155',
    'pork-&-chieves': '63efa8d19010d97ce1747157',
    'veggie': '63efa9259010d97ce174715f'
  };
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [style, setStyle] = useState('beef-&-cheese');
  const [hiddenStyle, setHiddenStyle] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({});
  const [gyozaId, setGyozaId] = useState('63efa8319010d97ce1747153');
  const [flavorsHidden, setFlavorsHidden] = useState(true);

  // Get current user
  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Get product
  useEffect(() => {
    getProduct(flavors[pathName]).then((res) => {
      setProduct(res.data);
    });
  }, []);

  // Render current flavor and all other flavors
  const handleRenderFlavors = () => {
    const element = window.document.getElementsByClassName('product_page_hidden_flavors')[0];
    const arrowUpDown = window.document.getElementsByClassName('svg_arrow_updown')[0];
    if (flavorsHidden) {
      element.style.display = 'block';
      arrowUpDown.style.transform = 'rotate(180deg)';
      setFlavorsHidden(false);
    } else {
      element.style.display = 'none';
      arrowUpDown.style.transform = '';
      setFlavorsHidden(true);
    }
  };

  const handleSubtractQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleCartModal = () => {
    if (!showModal) return null
    return (
      <Cart onClose={() => setShowModal(false)} />
    )
  };

  const handleAddGyozaToCart = (e: { preventDefault: () => void; target: { value: any; }; }) => {
    e.preventDefault();
    increaseItemQuantity(user._id, product, quantity)
      .then((res) => {
        setShowModal(true);
      })
      .catch((err) => {
        console.log(err);
      }
      );
  };

  return (
    <main className='product_page_main'>
      <div>
        <div className='product_page_wrapper'>
          <div className='product_page_container'>
            <div className='product_page_maincontent'>
              <div className='product_page_maincontent_breadcrumbs'>
                <a href="/products">ALL PRODUCTS</a>
                <span> &gt; </span>
                <a href="/products/gyoza-beef-&-cheese">{product.category} (50 PC)</a>
                <span> &gt; </span>
                <a href={`/products/${product.category}-${pathName}`}>{product.name}</a>
              </div>
              <div className='product_page_maincontent_wrapper'>
                <div className='product_page_maincontent_sideimages_wrapper'>
                  <div className='product_page_maincontent_sideimages_container'>
                    <div className='product_page_maincontent_sideimages_image_wrapper'>
                      <div className='product_page_maincontent_sideimages_image_container'>
                        <img src="https://cdn.shopify.com/s/files/1/0042/3834/4321/products/formattedbeef-xlb_2.png?v=1675392284" alt="" />
                      </div>
                      <div className='product_page_maincontent_sideimages_image_container'>
                        <img src="https://cdn.shopify.com/s/files/1/0042/3834/4321/products/beefXLB-wide_1.png?v=1675392284" alt="" />
                      </div>
                      <div className='product_page_maincontent_sideimages_image_container'>
                        <img src="https://cdn.shopify.com/s/files/1/0042/3834/4321/products/beefxlb-closeup_1.png?v=1675392284" alt="" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='product_page_mainpicture_modal'>
                  <div>
                    <div>
                      <a href="">
                        <div className='product_page_mainpicture_container'>
                          <div className='product_page_mainpicture_image_wrapper'>
                            <div className='product_page_mainpicture_image_container'>
                              <img className='product_page_mainpicture_image' src="https://cdn.shopify.com/s/files/1/0042/3834/4321/products/formattedbeef-xlb_2.png?v=1675392284" alt="" />
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>

                <div className='product_page_info_container'>
                  <div className='product_page_info_header_wrapper'>
                    <div>
                      <h2 className='product_page_info_header_container'>
                        {product.name}
                        <br />
                        {product.category} (50PC)
                      </h2>
                      <div className='product_page_info_header_info_container'>
                        <div className='product_page_info_header_price_container'>
                          <div className='roduct_page_info_header_price'>${product.price}</div>
                        </div>
                        <a className='product_page_info_header_reviews_container' href="">
                          <img src="" alt="STARS" />
                          <span className='product_page_info_header_reviews_text'>
                            <span className='product_page_info_header_reviews_text_left'>3497 </span>
                            <span className='product_page_info_header_reviews_text_right'>Reviews</span>
                          </span>
                        </a>
                      </div>
                      <div className='product_page_price_per'>Just $6.49 per meal</div>
                    </div>
                    <div className='product_page_description_wrapper'>
                      <div></div>
                    </div>
                  </div>

                  <div>
                    <div className='product_page_cart_info_container'>
                      <div>
                        <div className='product_page_cart_info_top_container'>
                          <div className='product_page_style_header'>Style</div>
                          <div className='product_page_styles_wrapper' onClick={handleRenderFlavors}>
                            <div className='product_page_styles_container'>
                              <span>{style.split('-').join(' ')}</span>
                              <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg" className='svg_arrow_updown'>
                                <path d="M7.29289 17.7071C7.68342 18.0976 8.31658 18.0976 8.70711 17.7071L15.0711 11.3431C15.4616 10.9526 15.4616 10.3195 15.0711 9.92893C14.6805 9.53841 14.0474 9.53841 13.6569 9.92893L8 15.5858L2.34315 9.92893C1.95262 9.53841 1.31946 9.53841 0.928932 9.92893C0.538407 10.3195 0.538407 10.9526 0.928932 11.3431L7.29289 17.7071ZM7 -3.95663e-08L7 17L9 17L9 3.95663e-08L7 -3.95663e-08Z" fill="#FF0303"></path>
                              </svg>
                            </div>
                            <ul className='product_page_hidden_flavors'>
                              {
                                Object.entries(flavors).map(([flavor, value]) => {
                                  if (Object.keys(product).length === 0) return null
                                  if (flavor.split('-').join(' ') !== product.name.toLowerCase()) {
                                    return (
                                      <div key={flavor}>
                                        <Link className='product_page_hidden_flavor_container' href={`/products/gyoza-${flavor}` }>
                                          {flavor.split('-').join(' ').toUpperCase()}
                                        </Link>
                                      </div>
                                    )
                                  }
                                })
                              }
                            </ul>
                          </div>

                        </div>
                        
                      </div>

                      <div className='product_page_input_information_container'>
                        <div className='product_page_input_quantity_container'>
                          <div className='product_page_input_quantity_header'>Quantity</div>
                          <div className='product_page_input_quantity_buttons'>
                            <div className='product_page_input_quantity_remove' onClick={handleSubtractQuantity}>-</div>
                            <span className='product_page_input_quantity_amount'>{quantity}</span>
                            <div className='product_page_input_quantity_add' onClick={() => setQuantity(quantity + 1)}>+</div>
                          </div>
                        </div>
                        <div className='product_page_product_addtocart_button_wrapper'>
                          <button className='product_page_product_addtocart_button' onClick={handleAddGyozaToCart}>
                            <span>ADD TO CART</span>
                          </button>
                        </div>
                      </div>

                      <div className='product_page_payment_buttons_container'>
                        <div className='product_page_shoppay_button_wrapper'>
                          <div className='product_page_shoppay_button_container'>
                            <div className='product_page_shoppay_button_info'>
                              <span className='product_page_shoppay_button_text'>Buy with </span>
                              <span className='product_page_shoppay_button_image'>
                                <img className='shoppay_image' src="/ShopPayWhite.png" alt="" />
                              </span>
                            </div>
                          </div>
                        </div>
                        <button></button>
                      </div>

                    </div>
                  </div>

                  <div className='product_page_product_description_container'>
                    <div>Our new limited-edition dumplings feature a rich beef filling with a savory
                      beef and creamy cheese. Enveloped in a tender dumpling skin, each bite
                      delivers the splendid flavors of our favorite comfort food - Cheese Burger -
                      minus the bun.
                    </div>
                  </div>

                  <div className='product_page_tabs_wrapper'>
                    <div>
                      <div className='product_page_tab'>
                        <p className='product_page_tab_header'>HOW TO MAKE</p>
                        <div className='product_page_tab_info_container'>
                          <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                          </ul>
                        </div>
                      </div>
                      <div className='product_page_tab'>
                        <p className='product_page_tab_header'>PRODUCT HIGHLIGHT</p>
                        <div className='product_page_tab_info_container'>
                          <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                          </ul>
                        </div>
                      </div>
                      <div className='product_page_tab'>
                        <p className='product_page_tab_header'>NUTRITION FACTS & INGREDIENTS</p>
                        <div className='product_page_tab_info_container'>
                          <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                          </ul>
                        </div>
                      </div>
                      <div className='product_page_tab'>
                        <p className='product_page_tab_header'>FAQS</p>
                        <div className='product_page_tab_info_container'>
                          <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                          </ul>
                          <div></div>
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

      <div>
        <div className='product_show_page_origin_container'>
          <div className='product_show_page_origin_info_container'>
            <div className='product_show_page_origin_content_container'>
              <h3 className='product_show_page_origin_content_header'>THE ORIGIN OF SOUP DUMPLINGS</h3>
              <div>
                <p className='product_show_page_origin_content_body'>
                  Soup dumplings (小笼包, Xiao Long Bao) originate in Shanghai, where they’re the stuff of legend: some focus on a royal Chinese emperor who traveled by river for a taste of these steamed delicacies; others involve an inventive chef looking to wow his guests with this new creation. While their true history may never be known, we can all agree on one thing: We love having soup dumplings ready at home in just 10 minutes!
                </p>
              </div>
            </div>
            <div className='product_show_page_origin_image_container'>
              <img className='product_show_page_origin_image' src="https://cdn.shopify.com/s/files/1/0042/3834/4321/files/Region-shanghai_480x.png?v=1663723126" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div>
          <h4>OUR FAVORITES</h4>
          <div>
            <div>
              <a href=""></a>
              <div>
                <p></p>
                <div>
                  <div></div>
                  <div></div>
                </div>
                <a href=""></a>
              </div>
            </div>
            <div>
              <a href=""></a>
              <div>
                <p></p>
                <div>
                  <div></div>
                  <div></div>
                </div>
                <a href=""></a>
              </div>
            </div>
            <div>
              <a href=""></a>
              <div>
                <p></p>
                <div>
                  <div></div>
                  <div></div>
                </div>
                <a href=""></a>
              </div>
            </div>
            <div>
              <a href=""></a>
              <div>
                <p></p>
                <div>
                  <div></div>
                  <div></div>
                </div>
                <a href=""></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div>
          <div>
            <div></div>
          </div>
        </div>
      </div>

      {handleCartModal()}
    </main>
  );
};

export default GyozaBeefCheese;