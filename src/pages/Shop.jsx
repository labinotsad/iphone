import { useState } from "react";
import Benefits1 from "../components/Benefits1";
import Footer from "../components/Footer";
import Slider from "../components/Slider";

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <section className='bg-black'>
      <Slider />
      <Benefits1 searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Footer />
    </section>
  );
};

export default Shop;
