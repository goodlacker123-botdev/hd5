import CurtainReveal from "@/components/CurtainReveal";

const CurtainPreview = () => {
  const handleComplete = () => {
    // Reset instead of redirecting for preview purposes
    window.location.reload();
  };

  return <CurtainReveal onComplete={handleComplete} />;
};

export default CurtainPreview;
