import type { NextPage } from 'next';
import Link from 'next/link';
import Navbar from '../components/nav/navbar';
import { useState, useEffect } from 'react';
import { getCurrentUser } from '../utils/sessionApiUtils';

const Home: NextPage = () => {
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState({ role: 'Customer' });

    useEffect(() => {
      (
        async () => {
          try {
            const response = await getCurrentUser();
            setUser(response);
            setAuth(true);
          } catch (err) {
            console.log(err);
            setAuth(false);
          }
        }
      )();
    }, []);

  return (
    <>
    <Navbar auth={auth} role={user.role}></Navbar>
    <div className="page">Kaito Home Page
      <div className="featured-product-block">
        <div className="featured-product">
          <div className="featured-product-image">
            IMAGE
          </div>
          <div className="featured-product-info">
            <h2>Featured Product</h2>
            <p>Product description</p>
            <p>Product description</p>
            <p>Product description</p>
          </div>
          <div className="featured-product-button">
            <button>ORDER NOW</button>
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
    </>
  );
};

export default Home;