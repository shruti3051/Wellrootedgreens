import React from "react";
import {
  SprayCan,
  ShieldCheck,
  HeartPulse,
  Sprout,
  MapPin,
  Droplets,
  Recycle,
  Sun,
  HandHeart,
  ArrowRight,
  Play,
} from "lucide-react";

import "./HomeExtraSections.css";

// Replace these with your actual images
import storyMain from "../../assets/images/story-main.png";
import storyTop from "../../assets/images/story-top.png";
import storyBottom from "../../assets/images/story-bottom.png";

const HomeExtraSections = () => {
  const trustItems = [
    {
      icon: SprayCan,
      title: "Pesticide Free",
      text: "Safe for your family",
    },
    {
      icon: ShieldCheck,
      title: "Chemical Free",
      text: "100% natural growing",
    },
    {
      icon: HeartPulse,
      title: "Rich in Nutrients",
      text: "4–40x more nutrients",
    },
    {
      icon: Sprout,
      title: "Sustainable",
      text: "Good for you & planet",
    },
    {
      icon: MapPin,
      title: "Locally Grown",
      text: "Farm fresh in Pune",
    },
  ];

  const planetItems = [
    {
      icon: Droplets,
      title: "Uses 90% Less Water",
      text: "Than mature vegetables",
    },
    {
      icon: Recycle,
      title: "Reduces Carbon Footprint",
      text: "Locally grown, less transport",
    },
    {
      icon: Sun,
      title: "Zero Food Miles",
      text: "Harvested near you",
    },
    {
      icon: HandHeart,
      title: "Supports Local Farmers",
      text: "Strengthening our community",
    },
  ];

  return (
    <section className="home-extra">
      {/* =====================================
          1. TRUST / BENEFITS STRIP
      ====================================== */}

      <div className="trust-strip">
        {trustItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <div className="trust-items" key={index}>
              <div className="trust-icon">
                <Icon size={24} strokeWidth={1.5} />
              </div>

              <div>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* =====================================
          2. OUR STORY
      ====================================== */}

      <section className="home-story">
        <div className="story-content">
          <span className="story-eyebrow">
            <Sprout size={14} />
            OUR STORY
          </span>

          <h2>
            A Small Family.
            <br />
            <span>A Big Dream.</span>
          </h2>

          <p>
            WellRooted is a family-run microgreens farm in Pune. We believe that
            real food doesn't need chemicals, just care, patience and the right
            environment.
          </p>

          <p>Every tray we grow is a step towards a healthier community.</p>

          <a href="/our-story" className="story-button">
            READ OUR STORY
            <ArrowRight size={15} />
          </a>
        </div>

        <div className="story-gallery">
          <div className="story-main-image">
            <img src={storyMain} alt="Fresh WellRooted microgreens" />

            <button className="story-play" aria-label="Play our story video">
              <Play size={20} fill="currentColor" />
            </button>
          </div>

          <div className="story-side-images">
            <img src={storyTop} alt="Microgreens growing at WellRooted" />

            <img src={storyBottom} alt="Freshly harvested microgreens" />
          </div>
        </div>

        {/* Decorative plant */}
        <div className="story-leaf">
          <Sprout size={95} strokeWidth={0.7} />
        </div>
      </section>

      {/* =====================================
          3. GOOD FOR YOU / PLANET
      ====================================== */}

      <section className="planet-section">
        <div className="planet-overlay"></div>

        <div className="planet-content">
          <div className="planet-heading">
            <h2>
              Good for You.
              <br />
              Good for the Planet.
            </h2>
          </div>

          <div className="planet-benefits">
            {planetItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <div className="planet-item" key={index}>
                  <Icon className="planet-icon" size={30} strokeWidth={1.3} />

                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </section>
  );
};

export default HomeExtraSections;
