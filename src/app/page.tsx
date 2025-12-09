import { Hero } from "../components/Hero";
import { FeatureCards } from "../components/FeatureCards";

export default function Home() {
  return (
    <div className="bg-transparent">
      <Hero />
      <FeatureCards />
    </div>
  );
}
