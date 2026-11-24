import React from "react";
import { Link } from "react-router-dom";
import { Sprout, Leaf, MapPin, Heart, ArrowRight, Sun } from "lucide-react";

function OurStory() {
  return (
    <main className="our-story-page">
      <section className="story-hero">
        <div className="story-hero-glow story-glow-one"></div>
        <div className="story-hero-glow story-glow-two"></div>

        <div className="story-hero-content">
          <p className="story-eyebrow">OUR STORY</p>

          <h1>
            A SMALL FAMILY.
            <span>A BIG DREAM.</span>
          </h1>

          <p className="story-hero-description">
            WellRooted began with a simple belief — the food we eat every day
            should feel fresh, nourishing and connected to where it comes from.
          </p>

          <div className="story-hero-line">
            <span></span>
            <Sprout size={20} />
            <span></span>
          </div>
        </div>

        <div className="story-scroll-text">
          <span>OUR ROOTS</span>
          <div className="story-scroll-line"></div>
        </div>
      </section>

      <section className="story-origin-section">
        <div className="story-container story-origin-grid">
          <div className="story-origin-visual">
            <div className="story-number">01</div>

            <div className="story-visual-card">
              <div className="story-sprout-circle">
                <Sprout size={58} strokeWidth={1.2} />
              </div>

              <p>ROOTED IN WELLNESS</p>
            </div>
          </div>

          <div className="story-origin-content">
            <p className="story-section-label">WHERE IT STARTED</p>

            <h2>
              Better food shouldn't
              <span> feel complicated.</span>
            </h2>

            <p>
              We started WellRooted with a simple question: what if something
              small could make everyday food fresher, more colourful and more
              nourishing?
            </p>

            <p>
              That curiosity led us to microgreens — tiny greens grown with care
              and harvested young, when they are fresh, vibrant and ready to
              become part of everyday meals.
            </p>

            <p>
              What began small became something we wanted to share with homes,
              cafés and restaurants around Pune.
            </p>

            <div className="story-signature">
              <span></span>

              <div>
                <strong>WellRooted</strong>
                <p>Rooted in Wellness</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="story-philosophy-section">
        <div className="story-container">
          <div className="story-section-heading">
            <p className="story-section-label">OUR PHILOSOPHY</p>

            <h2>
              Small greens.
              <span> Thoughtful choices.</span>
            </h2>

            <p>
              We believe wellness doesn't always begin with a dramatic change.
              Sometimes it begins with one better choice on your plate.
            </p>
          </div>

          <div className="story-values-grid">
            <article className="story-value-card">
              <div className="story-value-number">01</div>

              <Leaf size={30} strokeWidth={1.4} />

              <h3>Fresh</h3>

              <p>
                Grown in small batches and harvested with freshness at the
                centre of everything we do.
              </p>
            </article>

            <article className="story-value-card">
              <div className="story-value-number">02</div>

              <MapPin size={30} strokeWidth={1.4} />

              <h3>Local</h3>

              <p>
                Grown close to the people we serve, helping shorten the journey
                between harvest and plate.
              </p>
            </article>

            <article className="story-value-card">
              <div className="story-value-number">03</div>

              <Heart size={30} strokeWidth={1.4} />

              <h3>Purposeful</h3>

              <p>
                Every tray is grown with intention — from the seed we sow to the
                greens we finally pack.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="story-journey-section">
        <div className="story-container story-journey-grid">
          <div className="story-journey-heading">
            <p className="story-section-label">OUR JOURNEY</p>

            <h2>
              Every big change
              <span> starts small.</span>
            </h2>

            <p>
              WellRooted is still growing — and that's part of our story. We're
              building it one tray, one harvest and one customer at a time.
            </p>
          </div>

          <div className="story-timeline">
            <div className="story-timeline-item">
              <div className="story-timeline-marker">
                <span></span>
              </div>

              <div>
                <span className="story-timeline-number">01</span>
                <h3>The Curiosity</h3>
                <p>
                  It started with learning how much potential could exist inside
                  something as small as a seed.
                </p>
              </div>
            </div>

            <div className="story-timeline-item">
              <div className="story-timeline-marker">
                <span></span>
              </div>

              <div>
                <span className="story-timeline-number">02</span>
                <h3>The First Tray</h3>
                <p>
                  Seeds, growing medium, water, light and patience. We started
                  experimenting, observing and learning from every tray.
                </p>
              </div>
            </div>

            <div className="story-timeline-item">
              <div className="story-timeline-marker">
                <span></span>
              </div>

              <div>
                <span className="story-timeline-number">03</span>
                <h3>WellRooted</h3>
                <p>
                  The idea became a brand built around freshness, thoughtful
                  growing and making microgreens easier to enjoy.
                </p>
              </div>
            </div>

            <div className="story-timeline-item">
              <div className="story-timeline-marker">
                <span></span>
              </div>

              <div>
                <span className="story-timeline-number">04</span>
                <h3>Still Growing</h3>
                <p>
                  Today, we're continuing to learn, improve and bring freshly
                  grown microgreens to more plates across Pune.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="story-local-section">
        <div className="story-local-background-text">PUNE</div>

        <div className="story-container story-local-content">
          <div className="story-local-icon">
            <MapPin size={28} />
          </div>

          <p className="story-section-label">GROWN CLOSE TO HOME</p>

          <h2>
            Rooted in
            <span> Pune.</span>
          </h2>

          <p>
            We grow locally because freshness matters. Keeping the journey from
            grow space to plate shorter allows us to focus on what WellRooted is
            really about — fresh greens, thoughtful growing and better everyday
            food.
          </p>

          <div className="story-local-details">
            <div>
              <strong>LOCAL</strong>
              <span>Grown in Pune</span>
            </div>

            <div className="story-local-divider"></div>

            <div>
              <strong>FRESH</strong>
              <span>Harvested with care</span>
            </div>

            <div className="story-local-divider"></div>

            <div>
              <strong>SMALL BATCH</strong>
              <span>Thoughtfully grown</span>
            </div>
          </div>
        </div>
      </section>

      <section className="story-cta-section">
        <div className="story-cta-icon">
          <Sun size={32} strokeWidth={1.3} />
        </div>

        <p className="story-section-label">FROM OUR ROOTS TO YOUR PLATE</p>

        <h2>
          Bring something
          <span> fresh </span>
          to your plate.
        </h2>

        <p>
          Discover our range of locally grown microgreens and find your
          favourite.
        </p>

        <Link to="/shop" className="story-shop-button">
          SHOP MICROGREENS
          <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  );
}

export default OurStory;
