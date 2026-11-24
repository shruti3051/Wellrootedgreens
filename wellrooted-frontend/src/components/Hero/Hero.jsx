import React from "react";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <p className="hero-eyebrow">GROWN WITH PURPOSE. DELIVERED WITH CARE.</p>
        <h1>
          GROW WELL.
          <br />
          LIVE <span>ROOTED.</span>
        </h1>
        <p className="hero-description">
          Premium microgreens, grown locally in Pune
          <br />
          for a healthier you and a better tomorrow.
        </p>
        <div className="hero-buttons">
          <a
            href="https://www.youtube.com/redirect?event=channel_header&redir_token=QUZZTVljRXNXb0pDRndHcGpOc3hmYWlheDJoNnxBTl9pYzRjMVQxdmxkU1lTbVpKbi1OQ0wyQ1ZzRXNpbDdMdTcxdkFrTklwYnJvZThCWG9ySV9EM1dMSDhzSFlWemVqNXdfVXBScVEzcW9KLUR0WGhBWFJzYU83TldNdEhpM3Ny&q=https%3A%2F%2Fwww.instagram.com%2Fwellrootedgreens%3Figsh%3DMWU3bDgyMGhqaXNhYQ%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-one"
          >
            EXPLORE OUR GREENS 🌱
          </a>

          <a
            href="https://www.youtube.com/@wellrootedgreens"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-two"
          >
            WATCH OUR STORY ▶
          </a>
        </div>
      </div>
      <div className="hero-trust-cards">
        <div className="trust-item ">
          <span>🌱</span>
          <p>
            <strong>100% Fresh</strong>
            <br />
            Harvested daily
          </p>
        </div>

        <div className="trust-item ">
          <span>♢</span>
          <p>
            <strong>Pesticide Free</strong>
            <br />
            Safe & healthy
          </p>
        </div>

        <div className="trust-item ">
          <span>🌿</span>
          <p>
            <strong>Locally Grown</strong>
            <br />
            In Pune, for Pune
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
