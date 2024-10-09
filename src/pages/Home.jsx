import Benefits from "../components/Benefits";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <section className='bg-black'>
      <Navbar />
      <Hero />
      <Features />
      <Benefits />
      <Footer />
    </section>
  );
};

export default Home;
