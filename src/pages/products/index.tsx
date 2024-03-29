
import Link from 'next/link';
import { InferGetStaticPropsType } from 'next';
import { useState, useEffect, SyntheticEvent } from "react";
import Cart from '../../components/cart/cart';
import CartUnAuth from '../../components/cartUnAuth/cartUnAuth';
import { useUser } from '@auth0/nextjs-auth0/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import getStaticProps from '@lib/productsStaticProps';
export { getStaticProps };

const ProductsPage = ({ products }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const dumplings = {
    'beef-&-cheese': '63efa9419010d97ce1747161',
    'chicken-&-cabbage': '63efa96f9010d97ce1747163',
    'pork-&-chieves': '63efa8d89010d97ce1747159',
    'veggie': '63efa9119010d97ce174715c',
  }
  const gyoza = {
    'beef-&-cheese': '63efa8319010d97ce1747153',
    'chicken-&-cabbage': '63efa8b49010d97ce1747155',
    'pork-&-chieves': '63efa8d19010d97ce1747157',
    'veggie': '63efa9259010d97ce174715f',
  }
  const sauce = {
    'sauce-bundle': '642c4a3d1ffe19a54330e8c1',
    'xo-sauce': '642c4a6d1ffe19a54330e8c2',
    'hot-chili-oil': '642c4aae1ffe19a54330e8c5',
    'black-vinegar': '642c4a901ffe19a54330e8c4',
  }
  const [showModal, setShowModal] = useState(false);
  const [product1, setProduct1] = useState(products[10]);
  const [product2, setProduct2] = useState(products[6]);
  const [product3, setProduct3] = useState(products[0]);
  const [dumplingsId, setDumplingsId] = useState('63efa9419010d97ce1747161');
  const [gyozaId, setGyozaId] = useState('63efa8319010d97ce1747153');
  const [sauceId, setSauceId] = useState('642c4a3d1ffe19a54330e8c1');
  const { user } = useUser();

  // Gets selected products
  useEffect(() => {
    const sauceIndex = products.findIndex((product: { _id: string; }) => product._id === sauceId);
    const dumplingIndex = products.findIndex((product: { _id: string; }) => product._id === dumplingsId);
    const gyozaIndex = products.findIndex((product: { _id: string; }) => product._id === gyozaId);
    const matchedProduct1 = products[sauceIndex];
    const matchedProduct2 = products[dumplingIndex];
    const matchedProduct3 = products[gyozaIndex];

    setProduct1(matchedProduct1);
    setProduct2(matchedProduct2);
    setProduct3(matchedProduct3);
  }, [products]);

  // Update Product1
  useEffect(() => {
    const sauceIndex = products.findIndex((product: { _id: string; }) => product._id === sauceId);
    const matchedProduct = products[sauceIndex];
    setProduct1(matchedProduct);
  }, [sauceId]);

  // Update Product2
  useEffect(() => {
    const dumplingIndex = products.findIndex((product: { _id: string; }) => product._id === dumplingsId);
    const matchedProduct = products[dumplingIndex];
    setProduct2(matchedProduct);
  }, [dumplingsId]);

  // Update Product3
  useEffect(() => {
    const gyozaIndex = products.findIndex((product: { _id: string; }) => product._id === gyozaId);
    const matchedProduct = products[gyozaIndex];
    setProduct3(matchedProduct);
  }, [gyozaId]);

  // Handles add sauce to cart
  const handleAddSaucesToCart = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (user) {
      fetch('/api/carts', {
        method: 'PUT',
        body: JSON.stringify({ product: product1, quantity: 1 })
      }).then(() => {
        setShowModal(true);
      })
    } else {
      fetch('/api/guests', {
        method: 'PUT',
        body: JSON.stringify({ product: product1, quantity: 1 })
      }).then(() => {
        setShowModal(true);
      })
    }
  };

  // Handles add dumpling to cart
  const handleAddDumplingsToCart = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (user) {
      fetch('/api/carts', {
        method: 'PUT',
        body: JSON.stringify({ product: product2, quantity: 1 })
      }).then(() => {
        setShowModal(true);
      })
    } else {
      fetch('/api/guests', {
        method: 'PUT',
        body: JSON.stringify({ product: product2, quantity: 1 })
      }).then(() => {
        setShowModal(true);
      })
    }
  };

  // Handles add gyoza to cart
  const handleAddGyozaToCart = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (user) {
      fetch('/api/carts', {
        method: 'PUT',
        body: JSON.stringify({ product: product3, quantity: 1 })
      }).then(() => {
        setShowModal(true);
      })
    } else {
      fetch('/api/guests', {
        method: 'PUT',
        body: JSON.stringify({ product: product3, quantity: 1 })
      }).then(() => {
        setShowModal(true);
      })
    }
  };

  // Hide cart when clicking outside of the carts container
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const className = (e.target as HTMLSpanElement).getAttribute('className');
      if (className !== 'modal_container' && showModal === true) {

        const parent = (e.target as HTMLSpanElement).closest('.modal_container');
        if (!parent && showModal === true) {
          setShowModal(false);
        }
      }
    };

    const options = { capture: true };
    const removeListener = window.addEventListener('click', handleOutsideClick, options);
    return () => window.removeEventListener('click', handleOutsideClick, options);
  }, [showModal]);

  // Handles show/hide cart modal
  const handleCartModal = () => {
    if (!showModal) {
      return null;
    } else if (showModal && user) {
      return <Cart onClose={() => setShowModal(false)} />
    } else {
      return <CartUnAuth onClose={() => setShowModal(false)} />
    }
  };

  // Render sauce buttons that are selected or not
  const handleSauceButtons = () => {
    return Object.entries(sauce).map(([name, id]) => {
      if (sauceId === id) {
        return (
          <div className="products_page_item_flavor" key={id}>
            <span className="products_page_item_flavor_text_selected" key={id}>{(name.split('-').join(' ')).toUpperCase()}</span>
          </div>
        );
      } else {
        return (
          <div className="products_page_item_flavor" onClick={handleSauceChange} key={id}>
            <span className="products_page_item_flavor_text_unselected" key={id} id={id}>{(name.split('-').join(' ')).toUpperCase()}</span>
          </div>
        );
      }
    });
  };

  // Handle sauce button click
  const handleSauceChange = (e: SyntheticEvent) => {
    e.preventDefault();
    const key = (e.target as HTMLSpanElement).getAttribute('id');
    setSauceId(key as string);
  };

  // Render gyoza buttons that are selected or not
  const handleGyozaButtons = () => {
    return Object.entries(gyoza).map(([name, id]) => {
      if (gyozaId === id) {
        return (
          <div className="products_page_item_flavor" key={id}>
            <span className="products_page_item_flavor_text_selected" key={id}>{(name.split('-').join(' ')).toUpperCase()}</span>
          </div>
        );
      } else {
        return (
          <div className="products_page_item_flavor" onClick={handleGyozaChange} key={id}>
            <span className="products_page_item_flavor_text_unselected" key={id} id={id}>{(name.split('-').join(' ')).toUpperCase()}</span>
          </div>
        );
      }
    });
  };

  // Handle gyoza button click
  const handleGyozaChange = (e: SyntheticEvent) => {
    e.preventDefault();
    const key = (e.target as HTMLSpanElement).getAttribute('id');
    setGyozaId(key as string);
  };

  // Render dumpling buttons that are selected or not
  const handleDumplingButtons = () => {
    return Object.entries(dumplings).map(([name, id]) => {
      if (dumplingsId === id) {
        return (
          <div className="products_page_item_flavor" key={id}>
            <span className="products_page_item_flavor_text_selected" key={id}>{(name.split('-').join(' ')).toUpperCase()}</span>
          </div>
        );
      } else {
        return (
          <div className="products_page_item_flavor" onClick={handleDumplingChange} key={id}>
            <span className="products_page_item_flavor_text_unselected" key={id} id={id}>{(name.split('-').join(' ')).toUpperCase()}</span>
          </div>
        );
      }
    });
  };

  // Handle dumpling button click
  const handleDumplingChange = (e: SyntheticEvent) => {
    e.preventDefault();
    const key = (e.target as HTMLSpanElement).getAttribute('id');
    setDumplingsId(key as string);
  };

  return (
    <main className='products_page_main'>
      <div className='products_page_products_wrapper'>
        <div className='products_page_products_container'>
          <h1 className='title_with_rounds'><span>WE SHIP NATIONWIDE</span></h1>
          <div className='title_with_mini_images'>
            <div className='title_with_mini_images_container'>
              <div className='title_with_mini_image_container'>
                <div className='title_with_mini_image'>
                  <img src="https://cdn.shopify.com/s/files/1/0042/3834/4321/files/chef-crafted.png?v=1677475404" alt="" />
                </div>
                <div className='title_with_mini_image_text'>
                  <h5>CHEF-CRAFTED</h5>
                </div>
              </div>
              <div className='title_with_mini_image_container'>
                <div className='title_with_mini_image'>
                  <img src="https://cdn.shopify.com/s/files/1/0042/3834/4321/files/Star_10_Stroke.png?v=1677475405" alt="" />
                </div>
                <div className='title_with_mini_image_text'>
                  <h5>
                    5000+
                    <br />
                    5-STAR REVIEWS
                  </h5>
                </div>
              </div>
              <div className='title_with_mini_image_container'>
                <div className='title_with_mini_image'>
                  <img src="https://cdn.shopify.com/s/files/1/0042/3834/4321/files/mfg.png?v=1677475404" alt="" />
                </div>
                <div className='title_with_mini_image_text'>
                  <h5>
                    MELT-FREE
                    <br />
                    GUARANTEE
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className='products_page_items_wrapper'>
            <div className='products_page_items_container'>
              <div className='products_page_items_column_wrapper'>
                <div className='products_page_items_column_container'>
                  <div className='products_page_item_wrapper'>
                    {/* SAUCES */}
                    <div className='products_page_item_container'>
                      <div className='products_page_item_info_container'>
                        <div className='products_page_item_image_wrapper'>
                          <div className='products_page_item_image_container'>
                            <div className="products_page_item_image_content">
                              <Link href="/products/sauces-sauce-bundle">
                                <img className="products_page_item_image" src={product1.imageUrl} alt="" />
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className='products_page_item_text_wrapper'>
                          <div className="products_page_item_text_container">
                            <div className='products_page_item_details_wrapper'>
                              <div className='products_page_item_details_container'>
                                <div className='products_page_item_price_container'>
                                  <span className='products_page_item_price'>${product1.price}</span>
                                </div>
                                <h3 className='products_page_item_name'>
                                  <Link href="/products/sauces-sauce-bundle">KAITO SAUCES</Link>
                                </h3>
                                <div>
                                  <ul className='products_page_item_descriptions'>
                                    <li className='products_page_item_description'>
                                      <p>Choose from 3 Kaito Signature Sauces (6.5oz. jars):</p>
                                      <p>XO Sauce, Hot Chili Oil, Black Vinegar</p>
                                    </li>
                                    <li className='products_page_item_description'>
                                      <p>Option: 1 Sauce Bundle Set (All 3 House Made Sauces)</p>
                                    </li>
                                  </ul>
                                </div>

                                <div className="products_page_item_flavors">
                                  <div className="products_page_item_flavors_wrapper">
                                    <div className="products_page_item_flavors_container">
                                      {handleSauceButtons()}
                                    </div>
                                  </div>
                                </div>

                                <div className='products_page_product_rating_container'>
                                  <div className='products_page_product_ratings'>
                                    <div className='products_page_product_rating'>
                                      <div className='products_page_product_rating_star'>
                                        <i><FontAwesomeIcon icon={faStar}></FontAwesomeIcon></i>
                                      </div>
                                      <div className='products_page_product_rating_star'>
                                        <i><FontAwesomeIcon icon={faStar}></FontAwesomeIcon></i>
                                      </div>
                                      <div className='products_page_product_rating_star'>
                                        <i><FontAwesomeIcon icon={faStar}></FontAwesomeIcon></i>
                                      </div>
                                      <div className='products_page_product_rating_star'>
                                        <i><FontAwesomeIcon icon={faStar}></FontAwesomeIcon></i>
                                      </div>
                                      <div className='products_page_product_rating_star'>
                                        <i><FontAwesomeIcon icon={faStar}></FontAwesomeIcon></i>
                                      </div>
                                      <span className='products_page_product_rating_amount'>(1555)</span>
                                    </div>
                                  </div>
                                </div>

                              </div>
                              <div className='products_page_add_button_container'>
                                <button className='products_page_add_button' onClick={handleAddSaucesToCart}>
                                  <span>ADD TO CART</span>
                                  <span>
                                    <div>
                                      <div></div>
                                    </div>
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* DUMPLINGS */}
                    <div className='products_page_item_container'>
                      <div className='products_page_item_info_container'>
                        <div className='products_page_item_image_wrapper'>
                          <div className='products_page_item_image_container'>
                            <div className="products_page_item_image_content">
                              <Link href="/products/dumplings-beef-&-cheese">
                                <img className="products_page_item_image" src={product2.imageUrl} alt="" />
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className='products_page_item_text_wrapper'>
                          <div className="products_page_item_text_container">
                            <div className='products_page_item_details_wrapper'>
                              <div className='products_page_item_details_container'>
                                <div className='products_page_item_price_container'>
                                  <span className='products_page_item_price'>${product2.price}</span>
                                </div>
                                <h3 className='products_page_item_name'>
                                  <Link href="/products/dumplings-beef-&-cheese">{product2.category} (50 PC)</Link>
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

                                <div className="products_page_item_flavors">
                                  <div className="products_page_item_flavors_wrapper">
                                    <div className="products_page_item_flavors_container">
                                      {handleDumplingButtons()}
                                    </div>
                                  </div>
                                </div>

                                <div className='products_page_product_rating_container'>
                                  <div className='products_page_product_ratings'>
                                    <div className='products_page_product_rating'>
                                      <div className='products_page_product_rating_star'>
                                        <i><FontAwesomeIcon icon={faStar}></FontAwesomeIcon></i>
                                      </div>
                                      <div className='products_page_product_rating_star'>
                                        <i><FontAwesomeIcon icon={faStar}></FontAwesomeIcon></i>
                                      </div>
                                      <div className='products_page_product_rating_star'>
                                        <i><FontAwesomeIcon icon={faStar}></FontAwesomeIcon></i>
                                      </div>
                                      <div className='products_page_product_rating_star'>
                                        <i><FontAwesomeIcon icon={faStar}></FontAwesomeIcon></i>
                                      </div>
                                      <div className='products_page_product_rating_star'>
                                        <i><FontAwesomeIcon icon={faStar}></FontAwesomeIcon></i>
                                      </div>
                                      <span className='products_page_product_rating_amount'>(2018)</span>
                                    </div>
                                  </div>
                                </div>

                              </div>
                              <div className='products_page_add_button_container'>
                                <button className='products_page_add_button __className_b17307' onClick={handleAddDumplingsToCart}>
                                  <span>ADD TO CART</span>
                                  <span>
                                    <div>
                                      <div></div>
                                    </div>
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* GYOZAS */}
                    <div className='products_page_item_container'>
                      <div className='products_page_item_info_container'>
                        <div className='products_page_item_image_wrapper'>
                          <div className='products_page_item_image_container'>
                            <div className="products_page_item_image_content">
                              <Link href="/products/dumplings-beef-&-cheese">
                                <img className="products_page_item_image" src={product3.imageUrl} alt="" />
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className='products_page_item_text_wrapper'>
                          <div className="products_page_item_text_container">
                            <div className='products_page_item_details_wrapper'>
                              <div className='products_page_item_details_container'>
                                <div className='products_page_item_price_container'>
                                  <span className='products_page_item_price'>${product3.price}</span>
                                </div>
                                <h3 className='products_page_item_name'>
                                  <Link href="/products/gyoza-beef-&-cheese">{product3.category} (50 PC)</Link>
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
                                
                                <div className="products_page_item_flavors">
                                  <div className="products_page_item_flavors_wrapper">
                                    <div className="products_page_item_flavors_container">
                                      {handleGyozaButtons()}
                                    </div>
                                  </div>
                                </div>

                                <div className='products_page_product_rating_container'>
                                  <div className='products_page_product_ratings'>
                                    <div className='products_page_product_rating'>
                                      <div className='products_page_product_rating_star'>
                                        <i><FontAwesomeIcon icon={faStar}></FontAwesomeIcon></i>
                                      </div>
                                      <div className='products_page_product_rating_star'>
                                        <i><FontAwesomeIcon icon={faStar}></FontAwesomeIcon></i>
                                      </div>
                                      <div className='products_page_product_rating_star'>
                                        <i><FontAwesomeIcon icon={faStar}></FontAwesomeIcon></i>
                                      </div>
                                      <div className='products_page_product_rating_star'>
                                        <i><FontAwesomeIcon icon={faStar}></FontAwesomeIcon></i>
                                      </div>
                                      <div className='products_page_product_rating_star'>
                                        <i><FontAwesomeIcon icon={faStar}></FontAwesomeIcon></i>
                                      </div>
                                      <span className='products_page_product_rating_amount'>(1987)</span>
                                    </div>
                                  </div>
                                </div>

                              </div>
                              <div className='products_page_add_button_container'>
                                <button className='products_page_add_button __className_b17307' onClick={handleAddGyozaToCart}>
                                  <span>ADD TO CART</span>
                                  <span>
                                    <div>
                                      <div></div>
                                    </div>
                                  </span>
                                </button>
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
          </div>
        </div>
      </div>

      <div className='products_page_subscribe_container'>
        <div className='products_page_subscribe'>
          <div>
            <h3><p className='products_page_subscribe_content'>
              JOIN OUR VIP DUMPLING CLUB FOR DISCOUNTS
            </p></h3>
            <Link href="/subsciption" className='products_page_subscribe_button'>SUBSCRIBE FOR 10% OFF</Link>
          </div>
        </div>
      </div>

      <div className='products_page_socialmedia_container'>
        <div>
          <div><Link href=""></Link></div>
          <div><Link href=""></Link></div>
          <div><Link href=""></Link></div>
          <div><Link href=""></Link></div>
          <div><Link href=""></Link></div>
        </div>
      </div>
      {handleCartModal()}
    </main>
  );
};

export default ProductsPage;