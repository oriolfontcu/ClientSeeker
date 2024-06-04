import { Loader2 } from "lucide-react";

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <Loader2 className="mr-2 h-8 w-8 animate-spin text-white" />
    </div>
  );
};

export default LoadingOverlay;
