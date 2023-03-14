import Image from 'next/image';
import { useState, useEffect, SyntheticEvent } from "react";
import { increaseItemQuantity } from "../../utils/cartApiUtils";
import { getCurrentUser } from '@/src/utils/sessionApiUtils';
import Cart from '../../components/cart/cart';
import { getProduct, getProducts } from "@/src/utils/productApiUtils";

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
  const [product1, setProduct1] = useState({
    _id: '',
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    category: '',
  });
  const [product2, setProduct2] = useState({
    _id: '',
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    category: '',
  });
  const [product3, setProduct3] = useState({
    _id: '',
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    category: '',
  });
  const [dumplingsId, setDumplingsId] = useState('63efa9419010d97ce1747161');
  const [gyozaId, setGyozaId] = useState('63efa8319010d97ce1747153');
  const [user, setUser] = useState({
    _id: '',
    email: '',
    firstName: '',
    lastName: '',
    cart: [],
  });

  // Get User
  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        const element = window.document.getElementsByClassName('navbar_main')[0] as HTMLDivElement;
        element.style.backgroundColor = 'rgb(27, 33, 55)';
        setUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Get Product 1
  useEffect(() => {
    getProduct(dumplingsId)
      .then((res) => {
        setProduct1(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dumplingsId]);

  // Get Product 2
  useEffect(() => {
    getProduct(dumplingsId)
      .then((res) => {
        setProduct2(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dumplingsId]);

  // Get Product 3
  useEffect(() => {
    getProduct(gyozaId)
      .then((res) => {
        setProduct3(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [gyozaId]);

  const handleAddDumplingsToCart = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    increaseItemQuantity(user._id, product2, 1)
      .then((res) => {
        setShowModal(true);
      })
      .catch((err) => {
        console.log(err);
      }
    );
  };

  const handleAddGyozaToCart = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    increaseItemQuantity(user._id, product3, 1)
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
      <Cart onClose={() => setShowModal(false)} />
    )
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
                    {/* FEATURED PRODUCTS, CURRENTLY DUMPLINGS */}
                    <div className='products_page_item_container'>
                      <div className='products_page_item_info_container'>
                        <div className='products_page_item_image_wrapper'>
                          <div className='products_page_item_image_container'>
                            <div className="products_page_item_image_content">
                              <Link href="/products/dumplings-beef-&-cheese">
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
                                  <Link href="/products/dumplings-beef-&-cheese">{product1.category} (50 PC)</Link>
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
                                        <img src="/star.png" alt="" />
                                      </div>
                                      <div className='products_page_product_rating_star'>
                                        <img src="/star.png" alt="" />
                                      </div>
                                      <div className='products_page_product_rating_star'>
                                        <img src="/star.png" alt="" />
                                      </div>
                                      <div className='products_page_product_rating_star'>
                                        <img src="/star.png" alt="" />
                                      </div>
                                      <div className='products_page_product_rating_star'>
                                        <img src="/star.png" alt="" />
                                      </div>
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
                                        <img src="/star.png" alt="" />
                                      </div>
                                      <div className='products_page_product_rating_star'>
                                        <img src="/star.png" alt="" />
                                      </div>
                                      <div className='products_page_product_rating_star'>
                                        <img src="/star.png" alt="" />
                                      </div>
                                      <div className='products_page_product_rating_star'>
                                        <img src="/star.png" alt="" />
                                      </div>
                                      <div className='products_page_product_rating_star'>
                                        <img src="/star.png" alt="" />
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
                                        <img src="/star.png" alt="" />
                                      </div>
                                      <div className='products_page_product_rating_star'>
                                        <img src="/star.png" alt="" />
                                      </div>
                                      <div className='products_page_product_rating_star'>
                                        <img src="/star.png" alt="" />
                                      </div>
                                      <div className='products_page_product_rating_star'>
                                        <img src="/star.png" alt="" />
                                      </div>
                                      <div className='products_page_product_rating_star'>
                                        <img src="/star.png" alt="" />
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

export default Products;