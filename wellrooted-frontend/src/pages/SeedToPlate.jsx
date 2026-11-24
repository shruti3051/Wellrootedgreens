import React from "react";
import { Link } from "react-router-dom";
import {
  Sprout,
  Droplets,
  Sun,
  Scissors,
  PackageCheck,
  Utensils,
  ArrowRight,
} from "lucide-react";

const stages = [
  {
    number: "01",
    title: "The Seed",
    subtitle: "WHERE EVERYTHING BEGINS",
    icon: Sprout,
    description:
      "Every tray begins with carefully selected seeds. This small beginning sets the foundation for everything that follows.",
    note: "Selected with care",
  },
  {
    number: "02",
    title: "Germination",
    subtitle: "THE QUIET BEGINNING",
    icon: Droplets,
    description:
      "The seeds are given the moisture and environment they need to begin germinating. Beneath the surface, roots emerge and the growing journey starts.",
    note: "Moisture • Time • Care",
  },
  {
    number: "03",
    title: "Growth",
    subtitle: "REACHING FOR THE LIGHT",
    icon: Sun,
    description:
      "Once germinated, the young greens are introduced to light and carefully monitored as their stems strengthen and leaves begin to open.",
    note: "Light • Water • Observation",
  },
  {
    number: "04",
    title: "Harvest",
    subtitle: "CUT AT THE RIGHT MOMENT",
    icon: Scissors,
    description:
      "When the greens reach the right stage, they are carefully harvested. Timing matters because freshness begins at the moment of harvest.",
    note: "Freshly harvested",
  },
  {
    number: "05",
    title: "Pack",
    subtitle: "FRESHNESS, PROTECTED",
    icon: PackageCheck,
    description:
      "After harvesting, the microgreens are prepared and packed carefully so they can make the short journey from our grow space to you.",
    note: "Handled with care",
  },
  {
    number: "06",
    title: "Your Plate",
    subtitle: "THE JOURNEY BECOMES YOURS",
    icon: Utensils,
    description:
      "The final step happens in your kitchen, café or restaurant — adding fresh microgreens to salads, sandwiches, bowls, pasta and everyday meals.",
    note: "Fresh • Simple • Delicious",
  },
];

function SeedToPlate() {
  return (
    <main className="seed-page">
      {/* HERO */}
      <section className="seed-page-hero">
        <div className="seed-page-hero-circle circle-one"></div>
        <div className="seed-page-hero-circle circle-two"></div>

        <div className="seed-page-hero-content">
          <p className="seed-page-eyebrow">FROM SEED TO PLATE</p>

          <h1>
            Grown with care.
            <span>Every step of the way.</span>
          </h1>

          <p className="seed-page-hero-description">
            Follow the journey of our microgreens — from a tiny seed to
            something fresh on your plate.
          </p>

          <div className="seed-page-hero-stages">
            <span>SEED</span>
            <i></i>
            <span>GROW</span>
            <i></i>
            <span>HARVEST</span>
            <i></i>
            <span>PLATE</span>
          </div>
        </div>

        <div className="seed-page-scroll">
          <span>FOLLOW THE JOURNEY</span>
          <div></div>
        </div>
      </section>

      {/* INTRO */}
      <section className="seed-intro">
        <div className="seed-container seed-intro-grid">
          <div>
            <p className="seed-section-label">THE PROCESS</p>

            <h2>
              Good things take
              <span> a little care.</span>
            </h2>
          </div>

          <div className="seed-intro-copy">
            <p>
              Growing microgreens may look simple, but every stage matters.
              Water, light, timing and attention all play a role in taking a
              seed from its first root to harvest.
            </p>

            <p>Here's how each tray makes its journey at WellRooted.</p>
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="seed-process">
        <div className="seed-container">
          <div className="seed-process-line"></div>

          {stages.map((stage, index) => {
            const Icon = stage.icon;

            return (
              <article
                className={`seed-stage ${
                  index % 2 === 0 ? "seed-stage-left" : "seed-stage-right"
                }`}
                key={stage.number}
              >
                <div className="seed-stage-content">
                  <span className="seed-stage-number">{stage.number}</span>

                  <p className="seed-stage-subtitle">{stage.subtitle}</p>

                  <h2>{stage.title}</h2>

                  <p className="seed-stage-description">{stage.description}</p>

                  <div className="seed-stage-note">
                    <span></span>
                    {stage.note}
                  </div>
                </div>

                <div className="seed-stage-center">
                  <div className="seed-stage-dot"></div>
                </div>

                <div className="seed-stage-visual">
                  <div className="seed-stage-icon">
                    <Icon size={55} strokeWidth={1.15} />
                  </div>

                  <span className="seed-stage-bg-number">{stage.number}</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* PROMISE */}
      <section className="seed-promise">
        <div className="seed-container">
          <div className="seed-promise-heading">
            <p className="seed-section-label">WHAT MATTERS TO US</p>

            <h2>
              Simple process.
              <span>Thoughtful growing.</span>
            </h2>
          </div>

          <div className="seed-promise-grid">
            <div className="seed-promise-item">
              <span>01</span>
              <h3>Small Batches</h3>
              <p>
                Growing in smaller batches helps us give each tray the attention
                it needs.
              </p>
            </div>

            <div className="seed-promise-item">
              <span>02</span>
              <h3>Careful Observation</h3>
              <p>
                We observe the greens throughout their growing cycle instead of
                treating every tray exactly the same.
              </p>
            </div>

            <div className="seed-promise-item">
              <span>03</span>
              <h3>Fresh Harvest</h3>
              <p>
                Our focus is keeping the journey between harvest and your plate
                as short as practical.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL */}
      <section className="seed-final">
        <div className="seed-final-icon">
          <Sprout size={38} strokeWidth={1.2} />
        </div>

        <p className="seed-section-label">THE FINAL STEP IS YOURS</p>

        <h2>
          From our trays
          <span> to your table.</span>
        </h2>

        <p>
          Explore our fresh microgreens and discover what you can add to your
          next meal.
        </p>

        <Link to="/shop" className="seed-shop-button">
          EXPLORE MICROGREENS
          <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  );
}

export default SeedToPlate;
