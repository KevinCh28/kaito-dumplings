import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getProduct } from '../../utils/productApiUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

const DumplingsBeefCheese = () => {
  const router = useRouter();
  const productLinkRoute = router.query.productName;
  const flavors = {
    'beef-&-cheese': '63efa9419010d97ce1747161',
    'chicken-&-cabbage': '63efa96f9010d97ce1747163',
    'pork-&-chieves': '63efa8d89010d97ce1747159',
    'veggie': '63efa9119010d97ce174715c'
  };
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [style, setStyle] = useState('beef-&-cheese');
  const [hiddenStyle, setHiddenStyle] = useState(true);
  
  useEffect(() => {
    getProduct('63efa9419010d97ce1747161').then((res) => {
      setProduct(res.data);
    });
  }, []);

  const renderFlavors = () => {
    return Object.entries(flavors).map(([flavor, value]) => {
      if (flavor === product.name) {
        return <div key={flavor}>{flavor.split('-').join(' ').toUpperCase()}</div>
      } else {
        return (
          <div key={flavor}>
            <Link href={`/products/dumplings-${flavor}`}>
              {flavor.split('-').join(' ').toUpperCase()}
            </Link>
          </div>
        );
      }
    });
  };

  const handleSubtractQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
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
                <a href="/products/dumplings-beef-&-cheese">{product.category} (50 PC)</a>
                <span> &gt; </span>
                <a href={`/products/${productLinkRoute}`}>{product.name}</a>
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
                        <a className='product_page_info_header_reviews' href="">
                          STARS & REVIEWS
                        </a>
                      </div>
                      <div className='product_page_price_per'>Just $6.49 per meal</div>
                    </div>
                    <div>
                      <div></div>
                    </div>
                  </div>

                  <div>
                    <div>
                      <div>
                        <div>
                        </div>
                          <div className='product_page_style_header'>Style</div>
                          <div className='product_page_styles_wrapper'>
                            <div className='product_page_styles_container'>
                              <span>BEEF & CHEESE</span>
                              <button className='product_page_styles_arrow'>
                                <i><FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon></i>
                              </button>
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
                          <button className='product_page_product_addtocart_button'>
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

                  <div>
                    <div>
                      <div>
                        <p>HOW TO MAKE</p>
                        <div>
                          <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                          </ul>
                        </div>
                      </div>
                      <div>
                        <p>PRODUCT HIGHLIGHT</p>
                        <div>
                          <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                          </ul>
                        </div>
                      </div>
                      <div>
                        <p>NUTRITION FACTS & INGREDIENTS</p>
                        <div>
                          <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                          </ul>
                        </div>
                      </div>
                      <div>
                        <p>FAQS</p>
                        <div>
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

    </main>
  );
};

export default DumplingsBeefCheese;