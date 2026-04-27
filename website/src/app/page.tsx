import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import SolutionOverview from "@/components/sections/SolutionOverview";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import CaseStudySection from "@/components/sections/CaseStudySection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "An Hà - Giải pháp Tem Chống Hàng Giả hàng đầu Việt Nam",
  description:
    "Bảo vệ thương hiệu với tem QR Code, Hologram 3D, Serial Number. 500+ doanh nghiệp tin dùng. Giảm 94% hàng giả trong 6 tháng.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <SolutionOverview />
      <HowItWorksSection />
      <CaseStudySection />
      <CTASection />
    </>
  );
}
