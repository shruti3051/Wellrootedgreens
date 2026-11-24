import Hero from "../components/Hero/Hero";
import SeedJourney from "../components/SeedJourney/SeedJourney";
import Product from "../components/Product/Product";
import HomeExtraSections from "../components/Hero/HomeExtraSections";
import Footer from "../components/Footer/Footer";
function Home() {
  return (
    <>
      <Hero />
      <SeedJourney />
      <Product />
      <HomeExtraSections />
      <Footer />
    </>
  );
}

export default Home;
