import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const FooterSection = () => (
  <div className="footer-container">
    <ul className="contact-icons-container">
      <li className="contact-icon">
        <FaGoogle />
      </li>
      <li className="contact-icon">
        <FaTwitter />
      </li>
      <li className="contact-icon">
        <FaInstagram />
      </li>
      <li className="contact-icon">
        <FaYoutube />
      </li>
    </ul>
    <div className="contact-list">
      <p className="contact-text">Contact us</p>
      <p className="contact-number">8500960987</p>
    </div>
  </div>
)

export default FooterSection
