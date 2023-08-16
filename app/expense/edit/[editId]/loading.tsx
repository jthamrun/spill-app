import { Skeleton } from "@mui/material";

export default function EditExpenseLoading() {
  return (
    <div className="px-10 py-5 flex flex-col overflow-auto m-auto space-y-5 min-[900px]:space-y-0 min-[900px]:space-x-10 min-[900px]:flex-row min-[900px]:justify-center h-[92vh]">
      <div className="flex flex-col min-[900px]:mx-0 space-y-4 self-center min-[900px]:self-auto">
        <div className="border border-black rounded-md">
          <div className="flex py-4 space-x-10 justify-center min-[900px]:px-16">
            <Skeleton width="40%" height={20} />
            <Skeleton width="40%" height={20} />
          </div>
          <div className="h-[1px] bg-black w-full"></div>
          <div className="py-6 flex space-x-10 justify-center min-[900px]:px-16">
            <Skeleton width="30%" height={20} />
            <Skeleton width="30%" height={20} />
          </div>
        </div>
      </div>

      <div className="h-full overflow-auto border border-black rounded-md space-y-4 p-4 m-auto">
        <Skeleton variant="rectangular" />
      </div>
    </div>
  );
}
