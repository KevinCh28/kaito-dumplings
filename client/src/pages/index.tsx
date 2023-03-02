import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className="main_page_container">
      <div className="featured_product_container">
        <div className="featured_product_background_image">
          <div className="featured_product">
            <div className="featured_product_header">
              <h1>
                GRANDMA CALLED.
                <br />
                SHE WANTS HER
                <br />
                DUMPLINGS BACK.
              </h1>
              <ul className="featured_product_description">
                <li>Authentic Chinese soup dumplings</li>
                <li>Made fresh daily with high-quality ingredients</li>
                <li>Steams up in just 11 minutes at home</li>
              </ul>
              <div className="featured_product_button_container">
                <Link href="/products" className="featured_product_button_text">ORDER NOW</Link>
              </div>
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

      <div className="why-purchase-block">
        <div className="why-purchase-images">
          <div className="why-purchase-image">
            IMAGE
          </div>
        </div>
        <div className="why-purchase-message">
          <h3>EASY, FAST, DELISH</h3>
        </div>
      </div>

      <div className="product-carousel-block">
        <div className="product-cards">
          <div className="product-card">
            <div className="product-card-image">
              IMAGE
            </div>
            <div className="product-card-info">
              <Link href={''}>Product Name</Link>
              <p>Product description</p>
              <Link href={''}>ORDER NOW</Link>
            </div>
          </div>
          <div className="product-card">
            <div className="product-card-image">
              IMAGE
            </div>
            <div className="product-card-info">
              <Link href={''}>Product Name</Link>
              <p>Product description</p>
              <Link href={''}>ORDER NOW</Link>
            </div>
          </div>
          <div className="product-card">
            <div className="product-card-image">
              IMAGE
            </div>
            <div className="product-card-info">
              <Link href={''}>Product Name</Link>
              <p>Product description</p>
              <Link href={''}>ORDER NOW</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="shop-all-product-block">
        <div className="shop-all-product-button">
          <button>SHOP ALL PRODUCTS</button>
        </div>
      </div>

      <div className="shop-gyozas-block">
        <div className="shop-gyozas-image">
          IMAGE
        </div>
        <div className="shop-gyozas-info">
          <h3>Shop Gyoza</h3>
          <p>Product description</p>
          <button>SHOP GYOZAs</button>
        </div>
      </div>

      <div className="gif-shipping-description-block">
        <div className="gif-shipping-description">
          <h3>FREE GIFTS & SHIPPING</h3>
          GIF
        </div>
      </div>

      <div className="reviews-carousel-block">
        <div className="reviews-carousel">
          <div className="review-card">
            <div className="review-card-image">
              IMAGE
            </div>
            <div className="review-card-info">
              <h4>Review Name</h4>
              <p>Review description</p>
            </div>
          </div>
          <div className="review-card">
            <div className="review-card-image">
              IMAGE
            </div>
            <div className="review-card-info">
              <h4>Review Name</h4>
              <p>Review description</p>
            </div>
          </div>
          <div className="review-card">
            <div className="review-card-image">
              IMAGE
            </div>
            <div className="review-card-info">
              <h4>Review Name</h4>
              <p>Review description</p>
            </div>
          </div>
          <div className="review-card">
            <div className="review-card-image">
              IMAGE
            </div>
            <div className="review-card-info">
              <h4>Review Name</h4>
              <p>Review description</p>
            </div>
          </div>
        </div>
      </div>

      <div className="featured-blog-post-block">
        <div className="featured-blog-post">
          <div className="featured-blog-post-image">
            IMAGE
          </div>
          <div className="featured-blog-post-info">
            <h3>Featured Blog Post</h3>
            <p>Blog post description</p>
            <Link href={''}>READ MORE</Link>
          </div>
        </div>
      </div>

      <div className="contact-us-block">
        <div className="contact-us">
          <h3>QUESTIONS, COMMENTS, FEEDBACK?</h3>
          <textarea placeholder="Name"></textarea>
          <textarea placeholder="Email"></textarea>
          <textarea placeholder="How's it going?"></textarea>
          <button>GET IN TOUCH</button>
        </div>
        <div className="contact-us-mage">
          IMAGE
        </div>
      </div>
    </div>
  );
};

export default Home;