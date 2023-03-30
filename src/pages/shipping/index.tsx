import { NextPage } from 'next';
import { useEffect } from 'react';

const Shipping: NextPage = () => {
  // Should move this to navbar component and use if statement for each page to change background color and title accordingly
  useEffect(() => {
    document.title = 'Kaito | Shipping Info';
    const element = window.document.getElementsByClassName('navbar_main')[0] as HTMLDivElement;
    element.style.backgroundColor = 'rgb(212, 255, 208)';
  }, []);

  return (
    <div className="shipping_page_container">
      <div className="shipping_banner_container">
        <h1 className="shipping_banner_header"><span>HOW DO YOUR DUMPLINGS STAY FROZEN?</span></h1>
        <div className="shipping_banner_image_wrapper">
          <div className="shipping_banner_image_container">
            <img className="shipping_banner_image" src="https://cdn.shopify.com/s/files/1/0042/3834/4321/files/delivery-pack_1512x.png?v=1613163602" alt="" />
          </div>
        </div>
      </div>

      <div className="shipping_info">
        <div className="shipping_info_wrapper">
          <div className="shipping_info_container">
            <h3 className="shipping_info_header">
              WHEN WILL MY DUMPLINGS 
              <br />
              ARRIVE?
            </h3>
            <div className="shipping_info_text">
              <p>We ship orders Mondays - Thursdays and we aim to ship out dumplings within 1-3 business days after your order is placed. This shipping setup ensures your dumplings remain safe and frozen while traveling with blocks of dry-ice!
                <br />
                <br />
              </p>
              <p>Once shipped, your dumplings will arrive fresh to your home within 2 days. If not, please reach out to us and our team will make things right.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="shipping_info_copy">
        <div className="shipping_info_wrapper">
          <div className="shipping_info_container">
            <h3 className="shipping_info_header">
              WHAT IS BEHIND THE SHIPPING COST?
            </h3>
            <div className="shipping_info_text">
              <p>Frozen shipping is expensive due to dry ice and insulated liner costs but we do a lot of work on our back end to bring the cost down and pass on savings to you!</p>
              <br />
              <p><strong>We work hard every day to bring down costs even more.</strong></p>
              <br />
              <p>We are proud to be able to offer free shipping on orders over $99 (whereas other frozen foods may charge $40+ per order or add it into product costs.) Not here.</p>
              <br />
              <p>For those interested, here is how we make it work logistically:</p>
              <br />
              <p><strong>1. </strong>All our dumplings are made fresh in each and every morning in our Seattle kitchen.</p>
              <br />
              <p><strong>2. </strong>We strategically ship dumplings to dumpling depots all around the country</p>
              <br />
              <p><strong>3. </strong>This allows us to offer cheap ground shipping to the majority of our customers instead of resorting to more expensive air shipping.</p>
              <br />
              <p><strong>4. </strong>Our product is typically made only a week before your order is made to maximize freshness!
                <br />
                <br />
                It typically costs us a fixed $35 for ground shipments but we are happy to pay the majority of costs on our end. In order to sustainably do this, we rely on our happy customers to spread the word instead of using a large marketing budget - please help us spread the word to your friends and family!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;