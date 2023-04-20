import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useMemo } from 'react';
import Cart from '../../components/cart/cart';
import CartUnAuth from '../../components/cartUnAuth/cartUnAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faX, faChevronLeft, faChevronRight, faArrowLeft, faArrowRight, faStar } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '@auth0/nextjs-auth0/client';

const GyozaPorkChieves = () => {
  const router = useRouter();
  const pathName = router.pathname.split('-').slice(1).join('-');
  const flavors: { [key: string]: string } = useMemo(() => {
    return {
      'beef-&-cheese': '63efa8319010d97ce1747153',
      'chicken-&-cabbage': '63efa8b49010d97ce1747155',
      'pork-&-chieves': '63efa8d19010d97ce1747157',
      'veggie': '63efa9259010d97ce174715f',
    };
  }, []);
  const [product, setProduct] = useState({
    _id: '',
    name: '',
    price: 0,
    description: '',
    imageUrl: '',
    category: '',
    stripeId: '',
  });
  const [quantity, setQuantity] = useState(1);
  const [style, setStyle] = useState('pork-&-chieves');
  const [showModal, setShowModal] = useState(false);
  const { user } = useUser();
  const [gyozaId, setGyozaId] = useState('63efa8d19010d97ce1747157');
  const [flavorsHidden, setFlavorsHidden] = useState(true);
  const [hiddenTab, setHiddenTab] = useState<{ [key: number]: boolean }>({
    0: true,
    1: true,
    2: true,
    3: true,
  });
  const [showImageModal, setShowImageModal] = useState(false);
  const [mainImage, setMainImage] = useState('');
  const [modalMainImage, setModalMainImage] = useState('');
  const productImages = [
    product.imageUrl,
    "https://cdn.shopify.com/s/files/1/0042/3834/4321/products/steamer-xlb-cooked_6794ecb3-89a5-4c43-b05b-e24a5ccd4eb5_1308x.png?v=1679894378",
    "https://cdn.shopify.com/s/files/1/0042/3834/4321/products/Dumpling_da895546-4d79-4451-bca7-1ee347a8bf37_1308x.png?v=1679894496",
  ];

  // Get product
  useEffect(() => {
    (async () => {
      const element = window.document.getElementsByClassName('navbar_main')[0] as HTMLDivElement;
      element.style.backgroundColor = '#a9dde3';
      const results = await fetch(`/api/product?id=${gyozaId}`);
      const data = await results.json();
      setProduct(data);
      setMainImage(data.imageUrl);
      setModalMainImage(data.imageUrl);
    })();
  }, [gyozaId]);

  // Hide flavors when clicking outside of the flavors container
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const className = (e.target as HTMLSpanElement).getAttribute('className');
      if (className !== 'product_page_styles_wrapper' && flavorsHidden === false) {
        const element = window.document.getElementsByClassName('product_page_hidden_flavors')[0] as HTMLDivElement;
        const productsArrowUpDown = window.document.getElementsByClassName('svg_arrow_updown')[0] as HTMLDivElement;

        const parent = (e.target as HTMLSpanElement).closest('.product_page_styles_wrapper');
        if (!parent && flavorsHidden === false) {
          element.style.display = 'none';
          productsArrowUpDown.style.transform = '';
          setFlavorsHidden(true);
        }
      }
    };

    const options = { capture: true };
    const removeListener = window.addEventListener('click', handleOutsideClick, options);
    return () => window.removeEventListener('click', handleOutsideClick, options);
  }, [flavorsHidden]);

  // Handle removing overflow hidden from body when image modal is closed so that the user can scroll on current page
  useEffect(() => {
    if (!showModal) {
      const body = document.getElementsByTagName("body")[0];
      body.style.overflow = "";
    }
  }, [showImageModal]);

  // Handle showing all flavors
  const handleRenderFlavors = () => {
    const element = window.document.getElementsByClassName('product_page_hidden_flavors')[0] as HTMLDivElement;
    const productsArrowUpDown = window.document.getElementsByClassName('svg_arrow_updown')[0] as HTMLDivElement;
    if (flavorsHidden) {
      element.style.display = 'block';
      productsArrowUpDown.style.transform = 'rotate(180deg)';
      setFlavorsHidden(false);
    } else {
      element.style.display = 'none';
      productsArrowUpDown.style.transform = '';
      setFlavorsHidden(true);
    }
  };

  // Render info tabs
  const handleRenderInfoTabs = (index: number) => {
    const tabNames: { [key: number]: string } = {
      0: 'product_page_tab_howtomake_container',
      1: 'product_page_tab_highlight_container',
      2: 'product_page_tab_nutrition_container',
      3: 'product_page_tab_faqs_container',
    }
    const element = window.document.getElementsByClassName(tabNames[index])[0] as HTMLDivElement;
    const tabArrowUpDown = window.document.getElementsByClassName('product_page_tab_header_arrow')[index] as HTMLDivElement;
    if (hiddenTab[index]) {
      element.style.display = 'block';
      tabArrowUpDown.style.transform = 'rotate(180deg)';
      setHiddenTab((prevState) => ({
        ...prevState,
        [index]: false,
      }
      ));
    } else {
      element.style.display = 'none';
      tabArrowUpDown.style.transform = '';
      setHiddenTab((prevState) => ({
        ...prevState,
        [index]: true,
      }
      ));
    }
  };

  const handleSubtractQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleCartModal = () => {
    if (!showModal) {
      return null;
    } else if (showModal && user) {
      return <Cart onClose={() => setShowModal(false)} />
    } else {
      return <CartUnAuth onClose={() => setShowModal(false)} />
    }
  };

  const handleAddGyozaToCart = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (user) {
      fetch('/api/carts', {
        method: 'PUT',
        body: JSON.stringify({ product: product, quantity: quantity })
      }).then(() => {
        setShowModal(true);
      })
    } else {
      fetch('/api/guests', {
        method: 'PUT',
        body: JSON.stringify({ product: product, quantity: quantity })
      }).then(() => {
        setShowModal(true);
      })
    }
  };

  // Handle rendering images modal
  const handleImageModal = () => {
    if (!showImageModal) {
      return null;
    } else {
      const body = document.getElementsByTagName("body")[0];
      body.style.overflow = "hidden";
      

      const element = window.document.getElementsByClassName('image_modal_background_is_visible')[0] as HTMLDivElement;
      element.style.opacity = '1';
      element.style.display = 'block';
      return (
        <div className='product_page_images_modal'>
          <div className='product_page_images_modal_wrapper'>
            <div className='product_page_images_modal_container active'>
              <div className='product_page_images_modal_content'>
                <div className='product_page_images_modal_content_wrapper'>
                  <img className='product_page_images_modal_content_image' src={modalMainImage} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className='product_page_images_modal_close' onClick={handleImageModalClose}>
            <i><FontAwesomeIcon icon={faX}></FontAwesomeIcon></i>
          </div>
          <div className='product_page_images_modal_prev' onClick={handleImageModalPrev}>
            <i><FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon></i>
          </div>
          <div className='product_page_images_modal_next' onClick={handleImageModalNext}>
            <i><FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon></i>
          </div>
        </div>
      )
    }
  };

  // Handle image modal open
  const handleImageModalOpen = () => {
    if (window.innerWidth > 600) setShowImageModal(true);
  };

  // Handle image modal close
  const handleImageModalClose = () => {
    setShowImageModal(false);
    setModalMainImage(mainImage);
    const body = document.getElementsByTagName("body")[0];
    body.style.overflow = "";
    const element = window.document.getElementsByClassName('image_modal_background_is_visible')[0] as HTMLDivElement;
    element.style.opacity = '0';
    element.style.display = 'none';
  };

  // Handle image modal carousel next
  const handleImageModalNext = () => {
    let currentIndexOfImage = productImages.indexOf(modalMainImage);

    if (currentIndexOfImage + 1 >= productImages.length) {
      currentIndexOfImage = 0;
      setModalMainImage(productImages[currentIndexOfImage]);
    } else {
      setModalMainImage(productImages[currentIndexOfImage + 1]);
    };
  };

  // Handle image modal carousel previous
  const handleImageModalPrev = () => {
    let currentIndexOfImage = productImages.indexOf(modalMainImage);

    if (currentIndexOfImage - 1 < 0) {
      currentIndexOfImage = productImages.length - 1;
      setModalMainImage(productImages[currentIndexOfImage]);
    } else {
      setModalMainImage(productImages[currentIndexOfImage - 1]);
    };
  };

  // Handle changing main image
  const handleMainImageChange = (e: {
    [x: string]: any;
    preventDefault: () => void; 
  }) => {
    e.preventDefault();
    setMainImage(e.target.src);
    setModalMainImage(e.target.src);
  };

  // Handle image mobile carousel next
  const handleImageMobileNext = () => {
    let currentIndexOfImage = productImages.indexOf(mainImage);

    if (currentIndexOfImage + 1 >= productImages.length) {
      currentIndexOfImage = 0;
      setMainImage(productImages[currentIndexOfImage]);
    } else {
      setMainImage(productImages[currentIndexOfImage + 1]);
    };
  };

  // Handle image mobile carousel previous
  const handleImageMobilePrev = () => {
    let currentIndexOfImage = productImages.indexOf(mainImage);

    if (currentIndexOfImage - 1 < 0) {
      currentIndexOfImage = productImages.length - 1;
      setMainImage(productImages[currentIndexOfImage]);
    } else {
      setMainImage(productImages[currentIndexOfImage - 1]);
    };
  };

  return (
    <div className='product_page_main'>
      <div>
        <div className='product_page_wrapper'>
          <div className='product_page_container'>
            <div className='product_page_maincontent'>
              <div className='product_page_maincontent_breadcrumbs'>
                <Link href="/products">ALL PRODUCTS</Link>
                <span> &gt; </span>
                <Link href="/products/gyoza-beef-&-cheese">{product.category} (50 PC)</Link>
                <span> &gt; </span>
                <Link href={`/products/${product.category}-${pathName}`}>{product.name}</Link>
              </div>
              <div className='product_page_maincontent_wrapper'>
                <div className='product_page_maincontent_sideimages_wrapper'>
                  <div className='product_page_maincontent_sideimages_container'>
                    <div className='product_page_maincontent_sideimages_image_wrapper'>
                      <div className='product_page_maincontent_sideimages_image_container' onClick={handleMainImageChange}>
                        <img src={product.imageUrl} alt="" />
                      </div>
                      <div className='product_page_maincontent_sideimages_image_container' onClick={handleMainImageChange}>
                        <img src="https://cdn.shopify.com/s/files/1/0042/3834/4321/products/steamer-xlb-cooked_6794ecb3-89a5-4c43-b05b-e24a5ccd4eb5_1308x.png?v=1679894378" alt="" />
                      </div>
                      <div className='product_page_maincontent_sideimages_image_container' onClick={handleMainImageChange}>
                        <img src="https://cdn.shopify.com/s/files/1/0042/3834/4321/products/Dumpling_da895546-4d79-4451-bca7-1ee347a8bf37_1308x.png?v=1679894496" alt="" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='product_page_mainpicture_modal'>
                  <button className='product_page_mainpicture_modal_prev' onClick={handleImageMobilePrev}>
                    <i><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon></i>
                  </button>
                  <div>
                    <div className='product_page_mainpicture_container' onClick={handleImageModalOpen}>
                      <div className='product_page_mainpicture_image_wrapper'>
                        <div className='product_page_mainpicture_image_container'>
                          <img className='product_page_mainpicture_image' src={mainImage} alt="Main Image" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className='product_page_mainpicture_modal_next' onClick={handleImageMobileNext}>
                    <i><FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></i>
                  </button>
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
                        <Link className='product_page_info_header_reviews_container' href="">
                          <div className='products_page_product_rating_container'>
                            <div className='products_page_product_ratings'>
                              <div className='products_page_product_rating'>
                                <div className='product_page_product_rating_star'>
                                  <i><FontAwesomeIcon icon={faStar}></FontAwesomeIcon></i>
                                </div>
                                <div className='product_page_product_rating_star'>
                                  <i><FontAwesomeIcon icon={faStar}></FontAwesomeIcon></i>
                                </div>
                                <div className='product_page_product_rating_star'>
                                  <i><FontAwesomeIcon icon={faStar}></FontAwesomeIcon></i>
                                </div>
                                <div className='product_page_product_rating_star'>
                                  <i><FontAwesomeIcon icon={faStar}></FontAwesomeIcon></i>
                                </div>
                                <div className='product_page_product_rating_star'>
                                  <i><FontAwesomeIcon icon={faStar}></FontAwesomeIcon></i>
                                </div>
                              </div>
                            </div>
                          </div>
                          <span className='product_page_info_header_reviews_text'>
                            <span className='product_page_info_header_reviews_text_left'>3497 </span>
                            <span className='product_page_info_header_reviews_text_right'>Reviews</span>
                          </span>
                        </Link>
                      </div>
                      <div className='product_page_price_per'>Just $5.70 per meal</div>
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
                                        <Link className='product_page_hidden_flavor_container' href={`/products/gyoza-${flavor}`}>
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
                            <div className='product_page_input_quantity_remove' onClick={handleSubtractQuantity}>
                              <i><FontAwesomeIcon icon={faMinus}></FontAwesomeIcon></i>
                            </div>
                            <span className='product_page_input_quantity_amount'>{quantity}</span>
                            <div className='product_page_input_quantity_add' onClick={() => setQuantity(quantity + 1)}>
                              <i><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></i>
                            </div>
                          </div>
                        </div>
                        <div className='product_page_product_addtocart_button_wrapper'>
                          <button className='product_page_product_addtocart_button' onClick={handleAddGyozaToCart}>
                            <span>ADD TO CART</span>
                          </button>
                        </div>
                      </div>

                      <div className='product_page_payment_buttons_container'>
                        {/* <div className='product_page_googlepay_button_wrapper'>
                          <div className='product_page_googlepay_button_container'>
                            <div className='product_page_googlepay_button_info'>
                              <span className='product_page_googlepay_button_text'>Buy with </span>
                              <span className='product_page_googlepay_button_image'>
                                <img className='googlepay_image' src="/Google_Pay_Logo.png" alt="" />
                              </span>
                            </div>
                          </div>
                        </div> */}
                        <button></button>
                      </div>

                    </div>
                  </div>

                  <div className='product_page_product_description_images_container'>
                    <div>
                      <img src="https://cdn.shopify.com/s/files/1/0687/9045/2519/files/4.png?v=1675410709" alt="" />
                    </div>
                    <div>
                      <img src="https://cdn.shopify.com/s/files/1/0687/9045/2519/files/6.png?v=1675410708" alt="" />
                    </div>
                    <div>
                      <img src="https://cdn.shopify.com/s/files/1/0042/3834/4321/files/5.png?v=1676529631" alt="" />
                    </div>
                  </div>

                  <div className='product_page_product_description_container'>
                    <div>Our new limited-edition dumplings feature a rich beef filling with a savory
                      beef and creamy cheese. Enveloped in a tender dumpling skin, each bite
                      delivers the splendid flavors of our favorite comfort food - Cheese Burger -
                      minus the buns.
                    </div>
                  </div>

                  <div className='product_page_tabs_wrapper'>
                    <div>
                      <div className='product_page_tab' onClick={() => handleRenderInfoTabs(0)}>
                        <div className='product_page_tab_header'>
                          <p>HOW TO MAKE</p>
                          <div className='product_page_tab_header_arrow'></div>
                        </div>
                        <div className='product_page_tab_howtomake_container'>
                          <ul>
                            <li>
                              <img src="https://cdn.shopify.com/s/files/1/0042/3834/4321/files/water_boiling.svg?v=1663759606" alt="" />
                              In a large wok or pan, bring 2-3 inches of water to a rolling boil.
                            </li>
                            <li>
                              <img src="https://cdn.shopify.com/s/files/1/0042/3834/4321/files/place_dumplings.svg?v=1663759606" alt="" />
                              Place dumplings in lined steamer basket. Make sure to leave a 1 inch gap between dumplings.
                            </li>
                            <li>
                              <img src="https://cdn.shopify.com/s/files/1/0042/3834/4321/files/timer.svg?v=1663759605" alt="" />
                              Steam dumplings for 11 minutes (until internal temp. reaches 165°F).
                            </li>
                            <li>
                              <img src="https://cdn.shopify.com/s/files/1/0042/3834/4321/files/serve-dumplings.svg?v=1663759605" alt="" />
                              Remove from heat and rest, covered, for 2 minutes. Serve with your favorite sauces and enjoy!
                            </li>
                          </ul>
                          <div className='product_page_tab_info_video_container'>
                            <video src="">
                              <source />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        </div>
                      </div>
                      <div className='product_page_tab' onClick={() => handleRenderInfoTabs(1)}>
                        <div className='product_page_tab_header'>
                          <p>PRODUCT HIGHLIGHT</p>
                          <div className='product_page_tab_header_arrow'></div>
                        </div>
                        <div className='product_page_tab_highlight_container'>
                          <img src="https://cdn.shopify.com/s/files/1/0042/3834/4321/files/formatteddumpling-lifestyle3.png?v=1663979284" alt="" />
                          <b>MONDAKO FLOUR</b>
                          <p>Milled from a blend of premium northern winter and spring wheats, this flour helps create a supple, delicate dumpling skin.</p>
                          <b>FILLING</b>
                          <p>Ground beef is mixed with fresh aromatics including garlic and scallion, a blend of soy sauces and aged broad bean paste for a rich, umami-forward filling.</p>
                          <b>BROTH</b>
                          <p>The soup in this limited-edition soup dumpling is inspired by the deep, savory flavors of Taiwanese braised beef noodle soup—without the noodles.</p>
                        </div>
                      </div>
                      <div className='product_page_tab' onClick={() => handleRenderInfoTabs(2)}>
                        <div className='product_page_tab_header'>
                          <p>NUTRITION FACTS & INGREDIENTS</p>
                          <div className='product_page_tab_header_arrow'></div>
                        </div>
                        <div className='product_page_tab_nutrition_container'>
                          <b>Serving size</b>
                          <p>3 pieces (100g) - 17 servings per container</p>
                          <table>
                            <tbody>
                              <tr>
                                <td><b>Calories</b></td>
                                <td>140</td>
                                <td></td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <td><b>Total Fat</b></td>
                                <td>5g</td>
                                <td>6%</td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <td><span>Saturated Fat</span></td>
                                <td>1.5g</td>
                                <td>8%</td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <td><b>Cholesterol</b></td>
                                <td>15mg</td>
                                <td>5%</td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <td><b>Sodium</b></td>
                                <td>320mg</td>
                                <td>14%</td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <td><b>Total Carb</b></td>
                                <td>15mg</td>
                                <td>5%</td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <td><b>Protein</b></td>
                                <td>8g</td>
                                <td></td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <td><b>Dietary Fiber</b></td>
                                <td>1g</td>
                                <td>4%</td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <td><b>Calcium</b></td>
                                <td>7mg</td>
                                <td>0%</td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <td><b>Iron</b></td>
                                <td>2mg</td>
                                <td>10%</td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <td><b>Potassium</b></td>
                                <td>76mg</td>
                                <td>2%</td>
                              </tr>
                            </tbody>
                          </table>
                          <span className='product_page_tab_nutrition_daily_info'>* The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.</span>
                          <p className='product_page_tab_nutrition_product_ingredients_container'>
                            <b>INGREDIENTS: </b>
                            <br />
                            <b>[FILLING]: </b>
                            BEEF, WATER, BEAN PASTE, FERMENTED SOYBEAN PASTE, GELATIN, GREEN ONION, COOKING WINE, TOMATO PASTE, CONTAINS 2% OR LESS OF SOYBEAN OIL, BROWN SUGAR, SOY SAUCE, OYSTER SAUCE, CHICKEN BASE, GARLIC, GROUND GINGER, SESAME OIL, SPICES, WHITE PEPPER, NATURAL GARLIC EXTRACT, ONION FLAVOR, WHEY PROTEIN CONCENTRATE, EGG POWDER.
                            <br />
                            <b>[WRAPPER]: </b>
                            ENRICHED BLEACHED WHEAT FLOUR, WATER, SOYBEAN OIL, SALT.
                            <br />
                          </p>
                          <p className='product_page_tab_nutrition_product_ingredients_container'>
                            <b>ALLERGEN STATEMENT: </b>
                            CONTAINS EGG, MILK, SESAME, SOY, WHEAT, SHELLFISH, MOLLUSK
                          </p>
                        </div>
                      </div>
                      <div className='product_page_tab' onClick={() => handleRenderInfoTabs(3)}>
                        <div className='product_page_tab_header'>
                          <p>FAQS</p>
                          <div className='product_page_tab_header_arrow'></div>
                        </div>
                        <div className='product_page_tab_faqs_container'>
                          <b>HOW ARE YOUR PRODUCTS SHIPPED?</b>
                          Our dumplings are packaged with temperature-stabilizing dry ice and wrapped in an insulated liner. Your order is backed by our “Melt-Free Guarantee” — if there’s a delay in transit that affects the quality of your product, we’ll reship your order and make things right.
                          <b>DO I NEED TO DEFROST ANYTHING BEFORE COOKING?</b>
                          Nope! Our dumplings are designed and packaged specifically to be cooked straight from frozen, in just 11 minutes. It’s that easy.
                          <b>WHERE ARE YOUR PRODUCTS SOURCED FROM?</b>
                          All XCJ products are made locally in our manufacturing facilities located in Monterey Park, CA and Auburn, WA. All of our ingredients are sourced from the US, except for a handful of specialty items from China.
                          <b>ARE STEAMER LINERS INCLUDED?</b>
                          Yes, steamer liners are included inside every bag of dumplings! If you don’t see them right away, check the bottom of the bag—sometimes during packaging and shipping, they can get pushed down.
                          <b>HOW MUCH SPACE DOES IT TAKE IN MY FREEZER?</b>
                          9x12x4. An average freezer shelf can fit 8 bags.
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
        <div className='favorite_products'>
          <h4>OUR FAVORITES</h4>
          <div className='favorite_products_block'>
            <div className='favorite_products_item'>
              <Link href="">
                <div className='favorite_products_item_image_wrapper'>
                  <div className='favorite_products_item_image_container'>
                    <img src="https://cdn.shopify.com/s/files/1/0042/3834/4321/products/formattedtrio_2_295x.png?v=1669601795" alt="" />
                  </div>
                </div>
              </Link>
              <div className='favorite_products_item_content'>
                <p className='favorite_products_item_name'>KAITO SPECIAL SAUCES</p>
                <div className='favorite_products_item_price'>
                  <div className='favorite_products_item_price_current'>$24.95</div>
                  <div className='favorite_products_item_price_original'></div>
                </div>
                <Link className='favorite_products_item_button' href="">SHOP NOW</Link>
              </div>
            </div>
            <div className='favorite_products_item'>
              <Link href="">
                <div className='favorite_products_item_image_wrapper'>
                  <div className='favorite_products_item_image_container'>
                    <img src="https://cdn.shopify.com/s/files/1/0042/3834/4321/products/XCJSteamerShots_295x.png?v=1651605454" alt="" />
                  </div>
                </div>
              </Link>
              <div className='favorite_products_item_content'>
                <p className='favorite_products_item_name'>STEAMER BASKET</p>
                <div className='favorite_products_item_price'>
                  <div className='favorite_products_item_price_current'>$29.95</div>
                  <div className='favorite_products_item_price_original'></div>
                </div>
                <Link className='favorite_products_item_button' href="">SHOP NOW</Link>
              </div>
            </div>
            <div className='favorite_products_item'>
              <Link href="">
                <div className='favorite_products_item_image_wrapper'>
                  <div className='favorite_products_item_image_container'>
                    <img src="https://cdn.shopify.com/s/files/1/0042/3834/4321/products/bowl-profile2_295x.png?v=1669777702" alt="" />
                  </div>
                </div>
              </Link>
              <div className='favorite_products_item_content'>
                <p className='favorite_products_item_name'>DUMPLING BOWLS (2-PACK)</p>
                <div className='favorite_products_item_price'>
                  <div className='favorite_products_item_price_current'>12.95</div>
                  <div className='favorite_products_item_price_original'></div>
                </div>
                <Link className='favorite_products_item_button' href="">SHOP NOW</Link>
              </div>
            </div>
            <div className='favorite_products_item'>
              <Link href="">
                <div className='favorite_products_item_image_wrapper'>
                  <div className='favorite_products_item_image_container'>
                    <img src="https://cdn.shopify.com/s/files/1/0042/3834/4321/products/formattedCYB-3_1_295x.png?v=1663966317" alt="" />
                  </div>
                </div>
              </Link>
              <div className='favorite_products_item_content'>
                <p className='favorite_products_item_name'>KAITO NOODLES</p>
                <div className='favorite_products_item_price'>
                  <div className='favorite_products_item_price_current'>35.95</div>
                  <div className='favorite_products_item_price_original'>44.95</div>
                </div>
                <Link className='favorite_products_item_button' href="">SHOP NOW</Link>
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

      <div className='image_modal_background_is_visible'></div>
      {handleImageModal()}
      {handleCartModal()}
    </div>
  );
};

export default GyozaPorkChieves;