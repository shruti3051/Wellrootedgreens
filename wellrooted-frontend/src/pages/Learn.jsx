import React, { useState } from "react";
import { ArrowRight, X, Leaf, Utensils, Sparkles, Sprout } from "lucide-react";

const microgreens = [
  {
    name: "Broccoli",
    category: "mild",
    flavour: "Mild • Fresh • Slightly earthy",
    speciality:
      "A popular everyday microgreen known for its mild flavour and naturally occurring glucosinolates.",
    highlights: ["Vitamin C", "Vitamin K", "Carotenoids", "Glucosinolates"],
    bestWith: ["Salads", "Sandwiches", "Bowls", "Smoothies"],
    accent: "01",
  },

  {
    name: "Sunflower",
    category: "mild",
    flavour: "Nutty • Fresh • Crunchy",
    speciality:
      "Loved for its larger leaves, crisp texture and mild nutty flavour, making it especially easy to add to everyday meals.",
    highlights: ["Protein", "Vitamin E", "Minerals", "Healthy plant compounds"],
    bestWith: ["Sandwiches", "Wraps", "Salads", "Bowls"],
    accent: "02",
  },

  {
    name: "Pea Shoots",
    category: "mild",
    flavour: "Sweet • Fresh • Pea-like",
    speciality:
      "Tender shoots with a naturally sweet flavour reminiscent of fresh peas and a delicate crunch.",
    highlights: ["Vitamin C", "Vitamin K", "Carotenoids", "Plant nutrients"],
    bestWith: ["Salads", "Stir-fries", "Pasta", "Garnishes"],
    accent: "03",
  },

  {
    name: "Pink Radish",
    category: "peppery",
    flavour: "Peppery • Crisp • Bold",
    speciality:
      "A colourful microgreen with a noticeable peppery kick that can bring both contrast and flavour to a plate.",
    highlights: [
      "Vitamin C",
      "Carotenoids",
      "Glucosinolates",
      "Plant compounds",
    ],
    bestWith: ["Sandwiches", "Salads", "Pasta", "Garnishes"],
    accent: "04",
  },

  {
    name: "Purple Radish",
    category: "peppery",
    flavour: "Peppery • Sharp • Fresh",
    speciality:
      "Known for its striking colour and radish-like bite, making it useful when a dish needs both visual contrast and stronger flavour.",
    highlights: ["Vitamin C", "Anthocyanin pigments", "Glucosinolates"],
    bestWith: ["Salads", "Tacos", "Sandwiches", "Plating"],
    accent: "05",
  },

  {
    name: "Mustard",
    category: "peppery",
    flavour: "Spicy • Mustardy • Bold",
    speciality:
      "One of the bolder microgreens, bringing a mustard-like heat that works especially well as a flavour accent.",
    highlights: ["Vitamin C", "Vitamin K", "Glucosinolates"],
    bestWith: ["Indian dishes", "Sandwiches", "Salads", "Garnishes"],
    accent: "06",
  },

  {
    name: "Red Amaranth",
    category: "earthy",
    flavour: "Mild • Earthy • Delicate",
    speciality:
      "Its vibrant red-purple colour makes red amaranth particularly attractive for premium plating and garnishing.",
    highlights: ["Plant pigments", "Vitamin C", "Carotenoids", "Minerals"],
    bestWith: ["Fine plating", "Salads", "Bowls", "Garnishes"],
    accent: "07",
  },

  {
    name: "Beetroot",
    category: "earthy",
    flavour: "Earthy • Mild • Slightly sweet",
    speciality:
      "Recognisable for its colourful stems and earthy character, adding both colour and texture to finished dishes.",
    highlights: ["Plant pigments", "Vitamin C", "Minerals", "Plant compounds"],
    bestWith: ["Salads", "Bowls", "Garnishes", "Plating"],
    accent: "08",
  },

  {
    name: "Kale",
    category: "mild",
    flavour: "Mild • Green • Fresh",
    speciality:
      "A tender brassica microgreen with a relatively gentle flavour, making it versatile for everyday meals.",
    highlights: ["Vitamin C", "Vitamin K", "Carotenoids", "Glucosinolates"],
    bestWith: ["Salads", "Smoothies", "Sandwiches", "Bowls"],
    accent: "09",
  },

  {
    name: "Fenugreek",
    category: "earthy",
    flavour: "Earthy • Distinctive • Slightly bitter",
    speciality:
      "Fenugreek microgreens have a distinctive flavour familiar to Indian cooking and can add character to savoury dishes.",
    highlights: ["Plant compounds", "Minerals", "Vitamins"],
    bestWith: ["Indian dishes", "Salads", "Parathas", "Garnishes"],
    accent: "10",
  },

  {
    name: "Basil",
    category: "aromatic",
    flavour: "Aromatic • Sweet • Herbal",
    speciality:
      "Basil microgreens deliver a concentrated herbal aroma in a small form, making them particularly useful as a finishing ingredient.",
    highlights: ["Aromatic plant compounds", "Vitamin K", "Plant pigments"],
    bestWith: ["Pasta", "Pizza", "Tomatoes", "Italian dishes"],
    accent: "11",
  },

  {
    name: "Coriander",
    category: "aromatic",
    flavour: "Citrusy • Herbal • Fresh",
    speciality:
      "Aromatic and distinctive, coriander microgreens work well where a small amount of fresh herbal flavour can transform the dish.",
    highlights: ["Vitamin K", "Vitamin C", "Carotenoids", "Plant compounds"],
    bestWith: ["Indian dishes", "Tacos", "Soups", "Garnishes"],
    accent: "12",
  },
];

const filters = ["all", "mild", "peppery", "earthy", "aromatic"];

function Learn() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedGreen, setSelectedGreen] = useState(null);

  const filteredGreens =
    activeFilter === "all"
      ? microgreens
      : microgreens.filter((green) => green.category === activeFilter);

  return (
    <main className="learn-page">
      {/* HERO */}

      <section className="learn-hero">
        <div className="learn-hero-circle learn-circle-one"></div>
        <div className="learn-hero-circle learn-circle-two"></div>

        <div className="learn-hero-content">
          <p className="learn-eyebrow">LEARN</p>

          <h1>
            SMALL GREENS.
            <span>A LOT TO DISCOVER.</span>
          </h1>

          <p>
            Not all microgreens are the same. Discover their flavours, character
            and what makes each variety unique.
          </p>

          <div className="learn-hero-icon">
            <Sprout size={28} strokeWidth={1.3} />
          </div>
        </div>
      </section>

      {/* INTRO */}

      <section className="learn-intro">
        <div className="learn-container learn-intro-grid">
          <div>
            <p className="learn-section-label">KNOW YOUR GREENS</p>

            <h2>
              Find the green
              <span> for your plate.</span>
            </h2>
          </div>

          <div className="learn-intro-copy">
            <p>
              Some microgreens are mild and crunchy. Others are peppery, earthy
              or intensely aromatic.
            </p>

            <p>
              Explore each variety to understand its flavour, speciality and
              some of the easiest ways to use it.
            </p>
          </div>
        </div>
      </section>

      {/* LIBRARY */}

      <section className="learn-library">
        <div className="learn-container">
          <div className="learn-library-header">
            <div>
              <p className="learn-section-label">MICROGREEN LIBRARY</p>

              <h2>Explore the varieties.</h2>
            </div>

            <div className="learn-filters">
              {filters.map((filter) => (
                <button
                  type="button"
                  key={filter}
                  className={
                    activeFilter === filter
                      ? "learn-filter active"
                      : "learn-filter"
                  }
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="learn-grid">
            {filteredGreens.map((green) => (
              <article
                className="learn-card"
                key={green.name}
                onClick={() => setSelectedGreen(green)}
              >
                <div className="learn-card-visual">
                  <span className="learn-card-number">{green.accent}</span>

                  <div className="learn-card-icon">
                    <Leaf size={43} strokeWidth={1.15} />
                  </div>
                </div>

                <div className="learn-card-content">
                  <span className="learn-card-category">{green.category}</span>

                  <h3>{green.name}</h3>

                  <p className="learn-card-flavour">{green.flavour}</p>

                  <p className="learn-card-speciality">{green.speciality}</p>

                  <button
                    type="button"
                    className="learn-explore"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedGreen(green);
                    }}
                  >
                    EXPLORE
                    <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}

      {selectedGreen && (
        <div
          className="learn-modal-overlay"
          onClick={() => setSelectedGreen(null)}
        >
          <div
            className="learn-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="learn-modal-close"
              onClick={() => setSelectedGreen(null)}
            >
              <X size={21} />
            </button>

            <div className="learn-modal-top">
              <div className="learn-modal-number">{selectedGreen.accent}</div>

              <div className="learn-modal-icon">
                <Leaf size={55} strokeWidth={1.1} />
              </div>
            </div>

            <p className="learn-section-label">KNOW YOUR GREENS</p>

            <h2>{selectedGreen.name}</h2>

            <p className="learn-modal-flavour">{selectedGreen.flavour}</p>

            <div className="learn-modal-section">
              <div className="learn-modal-section-title">
                <Sparkles size={19} />

                <h3>What makes it special?</h3>
              </div>

              <p>{selectedGreen.speciality}</p>
            </div>

            <div className="learn-modal-info-grid">
              <div className="learn-modal-info">
                <div className="learn-modal-section-title">
                  <Leaf size={18} />

                  <h3>Nutrition highlights</h3>
                </div>

                <div className="learn-tags">
                  {selectedGreen.highlights.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>

              <div className="learn-modal-info">
                <div className="learn-modal-section-title">
                  <Utensils size={18} />

                  <h3>Try it with</h3>
                </div>

                <div className="learn-tags">
                  {selectedGreen.bestWith.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Learn;
