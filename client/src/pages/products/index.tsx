import { useState } from "react";
import Link from 'next/link';

const Products = () => {
  const [ dumpling, setDumpling ] = useState({
    name: "Pork & Chieves",
    price: "$44.95",
    imageUrl: "",
    link: "/products/pork-&-chieves"
  });
  const [ gyoza, setGyoza ] = useState({
    name: "Gyoza",
    price: "$44.95",
    imageUrl: "",
    link: "/products/pork-&-chieves"
  });
  const [ sauces, setSauces ] = useState({
    name: "KAITO'S SPECIAL SAUCES",
    price: "$44.95",
    imageUrl: "",
    link: "/products/hot-chili-oil"
  });

  const handleDumplingClick = (e: {preventDefault: () => void; target: { innerText: string; }; }) => {
    e.preventDefault();
    console.log(e)
    const flavor = e.target.innerText;
    if (flavor === "PORK & CHIEVES") {
      setDumpling({
        name: "Pork & Chieves",
        price: "$44.95",
        imageUrl: "",
        link: "/products/pork-&-chieves"
      });
    } else if (flavor === "CHICKEN & CABBAGE") {
      setDumpling({
        name: "Chicken & Cabbage",
        price: "$44.95",
        imageUrl: "",
        link: "/products/chicken-&-cabbage"
      });
    } else if (flavor === "BEEF & CHEESE") {
      setDumpling({
        name: "Beef & Cheese",
        price: "$44.95",
        imageUrl: "",
        link: "/products/beef-&-cheese"
      });
    } else if (flavor === "VEGGIE (VEGAN)") {
      setDumpling({
        name: "Veggie (Vegan)",
        price: "$44.95",
        imageUrl: "",
        link: "/products/veggie"
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
        link: "/products/pork-&-chieves"
      });
    } else if (flavor === "CHICKEN & CABBAGE") {
      setGyoza({
        name: "Chicken & Cabbage",
        price: "$44.95",
        imageUrl: "",
        link: "/products/chicken-&-cabbage"
      });
    } else if (flavor === "BEEF & CHEESE") {
      setGyoza({
        name: "Beef & Cheese",
        price: "$44.95",
        imageUrl: "",
        link: "/products/beef-&-cheese"
      });
    } else if (flavor === "VEGGIE (VEGAN)") {
      setGyoza({
        name: "Veggie (Vegan)",
        price: "$44.95",
        imageUrl: "",
        link: "/products/veggie"
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
    <div>
      <h1>WE SHIP NATIONWIDE</h1>
      <div>
        <div>
          <Link href={dumpling.link}>
            <img src={dumpling.imageUrl} alt={dumpling.name} />
          </Link>
        </div>
        <div>{dumpling.price}</div>
        <div><Link href={dumpling.link}>Dumplings (50 PC)</Link></div>
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
          <Link href={gyoza.link}>
            <img src={gyoza.imageUrl} alt={gyoza.name} />
          </Link>
        </div>
        <div>{gyoza.price}</div>
        <div><Link href={gyoza.link}>Gyoza (50 PC)</Link></div>
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
          <Link href={sauces.link}>
            <img src={sauces.imageUrl} alt={sauces.name} />
          </Link>
        </div>
        <div>{sauces.price}</div>
        <div><Link href={sauces.link}>KAITO'S SPECIAL SAUCES</Link></div>
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

    </div>
  );
};

export default Products;