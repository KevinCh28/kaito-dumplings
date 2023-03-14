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
                <div className='footer_socials_text'>
                  <p></p>
                  <p>
                    Instagram
                    <br />
                    @kaitodumplings
                  </p>
                </div>
                <div className='footer_socials_icons'>
                  <a href="">
                    <i><FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon></i>
                  </a>
                  <a href="https://www.instagram.com/kaitobubbletea/">
                    <i><FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon></i>
                  </a>
                  <a href="">
                    <i><FontAwesomeIcon icon={faTiktok}></FontAwesomeIcon></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className='footer_block'></div>
          <div className='footer_block'>
            <div className='footer_info_block'>
              <div className='footer_info_block_header'>INFO</div>
              <div className='footer_info_block_container'>
                <ul>
                  <li><a href="">About Us</a></li>
                  <li><a href="">Careers</a></li>
                  <li><a href="/faq">FAQs</a></li>
                  <li><a href="">Terms of Service</a></li>
                  <li><a href="">Privacy Policy</a></li>
                  <li><a href="">Refund Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};