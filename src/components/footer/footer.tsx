import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTiktok } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer_wrapper">
        <div className="footer_container">
          <div className='footer_block'>
            <div>
              <div>
                <div className='footer_socials_icons'>
                  <Link href="">
                    <i className='footer_socials_icon'><FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon></i>
                  </Link>
                  <Link href="https://www.instagram.com/kaito.tea/">
                    <i className='footer_socials_icon'><FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon></i>
                  </Link>
                  <Link href="">
                    <i className='footer_socials_icon'><FontAwesomeIcon icon={faTiktok}></FontAwesomeIcon></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='footer_block'>
            <div className='footer_info_block'>
              <div className='footer_info_block_container'>
                <ul>
                  <li><Link href="">About Us</Link></li>
                  <li><Link href="">Careers</Link></li>
                  <li><Link href="/faq">FAQs</Link></li>
                  <li><Link href="">Terms of Service</Link></li>
                  <li><Link href="">Privacy Policy</Link></li>
                  <li><Link href="">Refund Policy</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};