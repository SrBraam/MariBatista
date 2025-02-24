import React from "react";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import Courses from "../components/Courses";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import Newsletter from "../components/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Testimonials />
      {/* Pass the viewMode prop to the Courses component */}
      <Courses viewMode="slider" />{" "}
      {/* Display courses as blocks on the Home page */}
      <Pricing />
      <FAQ />
      <Newsletter />
    </>
  );
}
