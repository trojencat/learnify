import Topbar from "../components/Topbar";
import Hero from "../components/Hero";
import KeyFeatures from "../sections/KeyFeatures";
const Dashboard = () => {
  return (
    <div className="dashboard">
      <Topbar />
      <div id="hero" className="h-screen w-full">
        <Hero/>
      </div>
      <KeyFeatures />
      <div className="h-screen"></div>
    </div>
  );
};

export default Dashboard;
