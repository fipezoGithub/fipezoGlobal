import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Categories from "../components/Categories";
import Bio from "../components/Bio";
import Featured from "../components/Featured";
import Footer from "@/components/Footer";
import VerifiedExplore from "@/components/VerifiedExplore";
import Register from "@/components/Register";
import FreelancerPoints from "@/components/FreelancerPoints";
import BoxSection from "@/components/BoxSection";
import VerifiedCompany from "@/components/VerifiedCompany";

export default function Index(props) {
  return (
    <div className="app">
      <Navbar
        color="white"
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <Header />
      <Categories />
      <div className="grey-container">
        <Bio />
      </div>
      <VerifiedExplore />
      <FreelancerPoints />
      <VerifiedCompany />
      <div className="color-container">
        <Register />
      </div>
      <BoxSection />
      <div className="grey-container">
        <Featured />
      </div>
      <Footer />
    </div>
  );
}
