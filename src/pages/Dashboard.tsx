import Topbar from "../components/Topbar";
import Hero from "../components/Hero";
import KeyFeatures from "../sections/KeyFeatures";
import Timeline from "../sections/Timeline";
import Courses from "../sections/Courses";
import TestimonialsSection from "../sections/Testimonials";
import FeedbackSection from "../sections/Feedback";
import Footer from "./Footer";
const Dashboard = () => {
  return (
    <div className="dashboard overflow-clip">
      <Topbar />
      <div id="hero" className="h-screen w-full">
        <Hero />
      </div>
      <KeyFeatures />
      <div className="bg-gradient-to-r from-transparent via-stone-700 to-transparent h-[0.5px] mt-5 "></div>
      <Timeline />
      <div className="bg-gradient-to-r from-transparent via-stone-700 to-transparent h-[1px]   "></div>
      <Courses />
      <TestimonialsSection />
      <div className="bg-gradient-to-r from-transparent via-stone-700 to-transparent h-[1px]   "></div>
      <FeedbackSection />
      <div className="bg-gradient-to-r from-transparent via-stone-700 to-transparent h-[1px]   "></div>
      <Footer/>
    </div>
  );
};

export default Dashboard;
