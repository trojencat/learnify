import Topbar from "../components/Topbar";
import Hero from "../components/Hero";
import KeyFeatures from "../sections/KeyFeatures";
import Timeline from "../sections/Timeline";
import Courses from "../sections/Courses";
const Dashboard = () => {
  return (
    <div className="dashboard">
      <Topbar />
      <div id="hero" className="h-screen w-full">
        <Hero/>
      </div>
      <KeyFeatures />
      <div className="bg-gradient-to-r from-transparent via-stone-700 to-transparent h-[0.5px] mt-5 "></div>
      <Timeline/>
      <div className="bg-gradient-to-r from-transparent via-stone-700 to-transparent h-[1px]  mb-5 "></div>
      <Courses />
      <div className="h-screen"></div>
    </div>
  );
};

export default Dashboard;
