import { RocketLaunchIcon } from "@heroicons/react/20/solid";
import { CircularProgress } from "@mui/material";

const LoadingComponent = () => {
  return (
    <div className="font-quicksand font-semibold fixed top-0 left-0 w-screen h-screen bg-white flex flex-col justify-center items-center z-50">
      <div className="relative">
        <CircularProgress size={60} sx={{ color: "green" }} />
        <RocketLaunchIcon className="absolute w-7 h-7 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-base-green" />
      </div>
      <p className="mt-3">Hang on tight!</p>
    </div>
  );
};

export default LoadingComponent;
