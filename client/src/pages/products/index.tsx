import Link from 'next/link';
import { useState, useEffect } from "react";
import { getProducts } from "../../utils/productApiUtils";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((res) => {
      setProducts(res);
    });
  }, []);

  const [ dumpling, setDumpling ] = useState({
    name: "Pork & Chieves",
    price: "$44.95",
    imageUrl: "",
    url: "/products/pork-&-chieves"
  });
  const [ gyoza, setGyoza ] = useState({
    name: "Gyoza",
    price: "$44.95",
    imageUrl: "",
    url: "/products/pork-&-chieves"
  });
  const [ sauces, setSauces ] = useState({
    name: "KAITO'S SPECIAL SAUCES",
    price: "$44.95",
    imageUrl: "",
    url: "/products/hot-chili-oil"
  });

  const handleDumplingClick = (e: {preventDefault: () => void; target: { innerText: string; }; }) => {
    e.preventDefault();
    const flavor = e.target.innerText;
    if (flavor === "PORK & CHIEVES") {
      setDumpling({
        name: "Pork & Chieves",
        price: "$44.95",
        imageUrl: "",
        url: "/products/pork-&-chieves"
      });
    } else if (flavor === "CHICKEN & CABBAGE") {
      setDumpling({
        name: "Chicken & Cabbage",
        price: "$44.95",
        imageUrl: "",
        url: "/products/chicken-&-cabbage"
      });
    } else if (flavor === "BEEF & CHEESE") {
      setDumpling({
        name: "Beef & Cheese",
        price: "$44.95",
        imageUrl: "",
        url: "/products/beef-&-cheese"
      });
    } else if (flavor === "VEGGIE (VEGAN)") {
      setDumpling({
        name: "Veggie (Vegan)",
        price: "$44.95",
        imageUrl: "",
        url: "/products/veggie"
      });
    }
  };

  const handleGyozaClick = (e: {preventDefault: () => void; target: { innerText: string; }; }) => {
    e.preventDefault();
    console.log(e)
    const flavor = e.target.innerText;
    if (flavor === "PORK & CHIEVES") {
      setGyoza({
        name: "Pork & Chieves",
        price: "$44.95",
        imageUrl: "",
        url: "/products/pork-&-chieves"
      });
    } else if (flavor === "CHICKEN & CABBAGE") {
      setGyoza({
        name: "Chicken & Cabbage",
        price: "$44.95",
        imageUrl: "",
        url: "/products/chicken-&-cabbage"
      });
    } else if (flavor === "BEEF & CHEESE") {
      setGyoza({
        name: "Beef & Cheese",
        price: "$44.95",
        imageUrl: "",
        url: "/products/beef-&-cheese"
      });
    } else if (flavor === "VEGGIE (VEGAN)") {
      setGyoza({
        name: "Veggie (Vegan)",
        price: "$44.95",
        imageUrl: "",
        url: "/products/veggie"
      });
    }
  };

  // return dumpling's name with underlined as a div and the rest with no underline
  const renderDumplingFlavors = () => {
    if (dumpling.name === "Pork & Chieves") {
      return (
        <div>
          <div onClick={handleDumplingClick}>BEEF & CHEESE</div>
          <div onClick={handleDumplingClick}>CHICKEN & CABBAGE</div>
          <div>PORK & CHIEVES!!!</div>
          <div onClick={handleDumplingClick}>VEGGIE (VEGAN)</div>
        </div>
      );
    } else if (dumpling.name === "Chicken & Cabbage") {
      return (
        <div>
          <div onClick={handleDumplingClick}>BEEF & CHEESE</div>
          <div>CHICKEN & CABBAGE!!!</div>
          <div onClick={handleDumplingClick}>PORK & CHIEVES</div>
          <div onClick={handleDumplingClick}>VEGGIE (VEGAN)</div>
        </div>
      );
    } else if (dumpling.name === "Beef & Cheese") {
      return (
        <div>
          <div>BEEF & CHEESE!!!</div>
          <div onClick={handleDumplingClick}>CHICKEN & CABBAGE</div>
          <div onClick={handleDumplingClick}>PORK & CHIEVES</div>
          <div onClick={handleDumplingClick}>VEGGIE (VEGAN)</div>
        </div>
      );
    } else {
      return (
        <div>
          <div onClick={handleDumplingClick}>BEEF & CHEESE</div>
          <div onClick={handleDumplingClick}>CHICKEN & CABBAGE</div>
          <div onClick={handleDumplingClick}>PORK & CHIEVES</div>
          <div>VEGGIE (VEGAN)!!!</div>
        </div>
      );
    }
  };

  const renderGyozaFlavors = () => {
    if (gyoza.name === "Pork & Chieves") {
      return (
        <div>
          <div onClick={handleGyozaClick}>BEEF & CHEESE</div>
          <div onClick={handleGyozaClick}>CHICKEN & CABBAGE</div>
          <div>PORK & CHIEVES!!!</div>
          <div onClick={handleGyozaClick}>VEGGIE (VEGAN)</div>
        </div>
      );
    } else if (gyoza.name === "Chicken & Cabbage") {
      return (
        <div>
          <div onClick={handleGyozaClick}>BEEF & CHEESE</div>
          <div>CHICKEN & CABBAGE!!!</div>
          <div onClick={handleGyozaClick}>PORK & CHIEVES</div>
          <div onClick={handleGyozaClick}>VEGGIE (VEGAN)</div>
        </div>
      );
    } else if (gyoza.name === "Beef & Cheese") {
      return (
        <div>
          <div>BEEF & CHEESE!!!</div>
          <div onClick={handleGyozaClick}>CHICKEN & CABBAGE</div>
          <div onClick={handleGyozaClick}>PORK & CHIEVES</div>
          <div onClick={handleGyozaClick}>VEGGIE (VEGAN)</div>
        </div>
      );
    } else {
      return (
        <div>
          <div onClick={handleGyozaClick}>BEEF & CHEESE</div>
          <div onClick={handleGyozaClick}>CHICKEN & CABBAGE</div>
          <div onClick={handleGyozaClick}>PORK & CHIEVES</div>
          <div>VEGGIE (VEGAN)!!!</div>
        </div>
      );
    }
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
        <div>
          <div>
            <h3><p>JOIN OUR VIP DUMPLING CLUB FOR DISCOUNTS</p></h3>
            <a href="">SUBSCRIBE FOR 10% OFF</a>
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

      <div>
        <div>
          <Link href={dumpling.url}>
            <img src={dumpling.imageUrl} alt={dumpling.name} />
          </Link>
        </div>
        <div>{dumpling.price}</div>
        <div><Link href={dumpling.url}>Dumplings (50 PC)</Link></div>
        <div>
          <ul>
            <li>50 Dumplings (Good for 6 Meals!)</li>
            <li>Ready in Just 11 Minutes</li>
            <li>Steamer Liners Included</li>
          </ul>
        </div>
        {renderDumplingFlavors()}
        <div>
          <div>5 STARS (3,908)</div>
        </div>
        <div>
          <div>ADD TO CART</div>
        </div>
      </div>

      <div>
        <div>
          <Link href={gyoza.url}>
            <img src={gyoza.imageUrl} alt={gyoza.name} />
          </Link>
        </div>
        <div>{gyoza.price}</div>
        <div><Link href={gyoza.url}>Gyoza (50 PC)</Link></div>
        <div>
          <ul>
            <li>50 Dumplings (Good for 6 Meals!)</li>
            <li>Ready in Just 11 Minutes</li>
          </ul>
        </div>
        {renderGyozaFlavors()}
        <div>
          <div>5 STARS (4,908)</div>
        </div>
        <div>
          <div>ADD TO CART</div>
        </div>
      </div>

      <div>
        <div>
          <Link href={sauces.url}>
            <img src={sauces.imageUrl} alt={sauces.name} />
          </Link>
        </div>
        <div>{sauces.price}</div>
        <div><Link href={sauces.url}>KAITO'S SPECIAL SAUCES</Link></div>
        <div>
          <ul>
            <li>5Choose from Kaito's 3 Signature Sauces (6.5oz. jars): Ginger & Scallion, Spicy Chili Crisp, Classic Black Vinegar</li>
            <li>Option: 1 Trio Sauce Set (All 3 Special Sauces)</li>
          </ul>
        </div>
        {}
        <div>
          <div>5 STARS (4,908)</div>
        </div>
        <div>
          <div>ADD TO CART</div>
        </div>
      </div>

    </main>
  );
};

export default Products;