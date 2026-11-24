import { useEffect, useState } from "react";
import "./SeedJourney.css";

import seedImg from "../../assets/images/hero-page/seed.png";
import germinationImg from "../../assets/images/hero-page/germenation.png";
import growthImg from "../../assets/images/hero-page/growth.png";
import harvestImg from "../../assets/images/hero-page/harvest.png";
import packImg from "../../assets/images/hero-page/pack.png";
import plateImg from "../../assets/images/hero-page/plate.png";

function SeedJourney() {
  const stages = [
    {
      id: 1,
      number: "01",
      title: "SEED",
      description: "Selected seeds, full of potential.",
      image: seedImg,
    },
    {
      id: 2,
      number: "02",
      title: "GERMINATION",
      description: "Roots emerge and the journey begins.",
      image: germinationImg,
    },
    {
      id: 3,
      number: "03",
      title: "GROWTH",
      description: "Nourished naturally as they reach for light.",
      image: growthImg,
    },
    {
      id: 4,
      number: "04",
      title: "HARVEST",
      description: "Harvested carefully at peak freshness.",
      image: harvestImg,
    },
    {
      id: 5,
      number: "05",
      title: "PACK",
      description: "Packed with care to preserve freshness.",
      image: packImg,
    },
    {
      id: 6,
      number: "06",
      title: "YOUR PLATE",
      description: "Fresh nutrition, ready for your table.",
      image: plateImg,
    },
  ];

  const [activeStage, setActiveStage] = useState(1);

  useEffect(() => {
    const stageElements = document.querySelectorAll(".journey-stage");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveStage(Number(entry.target.dataset.stage));
          }
        });
      },
      {
        root: null,

        rootMargin: "-40% 0px -40% 0px",

        threshold: 0,
      },
    );

    stageElements.forEach((stage) => {
      observer.observe(stage);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="seed-journey">
      <div className="journey-heading">
        <p className="journey-eyebrow">🌱 OUR JOURNEY</p>

        <h2>
          From Seed <span>to Your Plate</span>
        </h2>

        <p className="journey-description">
          Grown locally with care, from carefully selected seeds to fresh
          microgreens on your plate.
        </p>
      </div>

      <div className="journey-container">
        {/* LEFT — SCROLLING STAGES */}

        <div className="journey-stages">
          {stages.map((stage) => (
            <div
              key={stage.id}
              data-stage={stage.id}
              className={`journey-stage ${
                activeStage === stage.id ? "active" : ""
              }`}
            >
              <span className="stage-number">{stage.number}</span>
              <div className="stage-content">
                <div className="stage-text">
                  <h3>{stage.title}</h3>

                  <p>{stage.description}</p>
                </div>

                {/* MOBILE ONLY */}
                <div className="mobile-stage-image">
                  <img src={stage.image} alt={stage.title} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT — STICKY REAL IMAGES */}

        <div className="journey-visual">
          <div className="journey-image-container">
            {stages.map((stage) => (
              <img
                key={stage.id}
                src={stage.image}
                alt={stage.title}
                className={`journey-image ${
                  activeStage === stage.id ? "active" : ""
                }`}
              />
            ))}

            <div className="image-label">
              <span>{String(activeStage).padStart(2, "0")}</span>

              <p>{stages.find((stage) => stage.id === activeStage)?.title}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SeedJourney;

// import { useEffect, useState } from "react";
// import "./SeedJourney.css";
// function SeedJourney() {
//   const stages = [
//     {
//       id: 1,
//       title: "SEED",
//       description: "Selected seeds",
//     },
//     {
//       id: 2,
//       title: "GERMINATION",
//       description: "The journey begins",
//     },
//     {
//       id: 3,
//       title: "GROWTH",
//       description: "Nourished naturally",
//     },
//     {
//       id: 4,
//       title: "HARVEST",
//       description: "At peak freshness",
//     },
//     {
//       id: 5,
//       title: "PACK",
//       description: "Hygienically packed",
//     },
//     {
//       id: 6,
//       title: "YOUR PLATE",
//       description: "Nutrition on your table",
//     },
//   ];
//   const [activeStage, setActiveStage] = useState(1);
//   useEffect(() => {
//     const stageElements = document.querySelectorAll(".journey-stage");

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const stageNumber = Number(entry.target.dataset.stage);

//             setActiveStage(stageNumber);
//           }
//         });
//       },
//       {
//         threshold: 0.6,
//       },
//     );

//     stageElements.forEach((stage) => {
//       observer.observe(stage);
//     });

//     return () => {
//       observer.disconnect();
//     };
//   }, []);

//   return (
//     <section className="seed-journey">
//       <p>🌱 OUR JOURNEY</p>

//       <h2>From Seed to Your Plate</h2>

//       <div className="journey-container">
//         <div className="journey-stages">
//           {stages.map((stage) => (
//             <div
//               className={`journey-stage ${
//                 activeStage === stage.id ? "active" : ""
//               }`}
//               key={stage.id}
//               data-stage={stage.id}
//             >
//               <span>0{stage.id}</span>

//               <h3>{stage.title}</h3>

//               <p>{stage.description}</p>
//             </div>
//           ))}
//         </div>

//         <div className="journey-visual">
//           <h3 className="stage-debug">Active Stage: {activeStage}</h3>
//           <div className={`plant-scene stage-${activeStage}`}>

//             <div className="scene-glow"></div>
//             <div className="seed"></div>
//             <div className="stem"></div>
//             <div className="leaf leaf-left"></div>
//             <div className="leaf leaf-right"></div>
//             <div className="soil-line"></div>
//             <div className="roots">
//               <div className="root root-main"></div>
//               <div className="root root-left"></div>
//               <div className="root root-right"></div>
//             </div>
//             <div className="microgreen-bed">
//               {Array.from({ length: 9 }).map((_, index) => (
//                 <div
//                   className="microgreen"
//                   key={index}
//                   style={{ "--i": index }}
//                 >
//                   <div className="micro-stem"></div>

//                   <div className="micro-leaf micro-leaf-left"></div>
//                   <div className="micro-leaf micro-leaf-right"></div>
//                 </div>
//               ))}
//             </div>
//             <div className="harvest-cutter">
//               <div className="cutter-blade"></div>
//               <div className="cutter-handle"></div>
//             </div>
//             <div className="product-pack">
//               <div className="pack-window">
//                 <span>🌱</span>
//                 <span>🌱</span>
//                 <span>🌱</span>
//               </div>

//               <div className="pack-label">
//                 <strong>WELLROOTED</strong>
//                 <small>ROOTED IN WELLNESS</small>
//               </div>
//             </div>
//             <div className="plate-scene">
//               <div className="plate">
//                 <div className="plate-inner">
//                   <div className="plate-greens">
//                     <span>🌱</span>
//                     <span>🌿</span>
//                     <span>🌱</span>
//                     <span>🌿</span>
//                   </div>
//                 </div>
//               </div>

//               <p className="plate-message">Fresh nutrition, ready to enjoy.</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default SeedJourney;
