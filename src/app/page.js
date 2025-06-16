import Head from "next/head";

import CoreValues from "@/components/CoreValues";
import DealershipForm from "@/components/DealershipForm";
import HeroSection from "@/components/HeroSection";
import Image from "next/image";

export default function Home() {

  return (
   <div>

    <HeroSection/>
    <DealershipForm/>
    <CoreValues/>

   </div>
  );
}
