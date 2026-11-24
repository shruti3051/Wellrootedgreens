import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Mail, ArrowUpRight, Sprout, Leaf } from "lucide-react";
import LogoImg from "../../assets/images/logo.png";
import { FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";

import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      {/* Decorative glow */}
      <div className="footer-glow footer-glow-one"></div>
      <div className="footer-glow footer-glow-two"></div>

      <div className="footer-container">
        {/* =========================
            MAIN FOOTER
        ========================== */}

        <div className="footer-main">
          {/* BRAND */}

          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img
                src={LogoImg}
                alt="WellRooted Greens"
                className="footer-logo-image"
              />
            </Link>

            <p className="footer-brand-description">
              Naturally grown microgreens bringing freshness, nutrition and
              sustainable goodness from our growing space to your plate.
            </p>

            <div className="footer-location">
              <MapPin size={17} />
              <span>Viman Nagar, Pune</span>
            </div>
          </div>

          {/* EXPLORE */}

          <div className="footer-column">
            <h4>EXPLORE</h4>

            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/our-story">Our Story</Link>
            <Link to="/seed-to-plate">Seed to Plate</Link>
            <Link to="/learn">Learn</Link>
          </div>

          {/* SHOP */}

          <div className="footer-column">
            <h4>OUR GREENS</h4>

            <Link to="/shop">Broccoli</Link>
            <Link to="/shop">Radish</Link>
            <Link to="/shop">Sunflower</Link>
            <Link to="/shop">Pea Shoots</Link>
            <Link to="/shop">View All</Link>
          </div>

          {/* CONNECT */}

          <div className="footer-column footer-connect">
            <h4>LET'S CONNECT</h4>

            <a
              href="mailto:microgreenswellrooted@gmail.com"
              className="footer-contact-link"
            >
              <Mail size={16} />
              microgreenswellrooted@gmail.com
            </a>

            {/* Add WhatsApp number later */}
            <a href="#" className="footer-contact-link">
              <FaWhatsapp size={16} />
              WhatsApp Us
            </a>

            {/* SOCIAL */}

            <div className="footer-socials">
              <a
                href="https://www.instagram.com/wellrootedgreens"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram size={19} />
              </a>

              <a href="#" target="_blank" rel="noreferrer" aria-label="YouTube">
                <FaYoutube size={20} />
              </a>

              <a href="#" aria-label="WhatsApp">
                <FaWhatsapp size={19} />
              </a>
            </div>
          </div>
        </div>

        {/* =========================
            DELIVERY MESSAGE
        ========================== */}

        <div className="footer-delivery">
          <div>
            <Sprout size={18} />
            <span>Freshly harvested • Locally grown • Delivered in Pune</span>
          </div>

          <p>Free delivery on orders above ₹499</p>
        </div>

        {/* =========================
            BOTTOM
        ========================== */}

        <div className="footer-bottom">
          <p>© {currentYear} WellRootedGreens. All rights reserved.</p>

          <div className="footer-bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>

          <button
            className="footer-top-btn"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
