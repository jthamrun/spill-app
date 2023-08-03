const EditExpenseComponent = () => {
  return (
    <div className="px-10 py-5 flex flex-col overflow-auto m-auto space-y-5 md:space-y-0 md:space-x-10 md:flex-row md:justify-center h-[92vh]">
      <div className="mx-10 md:mx-0 border border-black rounded-md md:self-start">
        <div className="flex py-4 space-x-10 justify-center md:px-14">
          <h1 className="font-quicksand font-bold">BCDwaudiwaidjwiaj</h1>
          <p>08/02/2023</p>
        </div>

        <div className="h-[1px] bg-black w-full"></div>
        <div className="py-6 flex py-4 space-x-10 justify-center md:px-14">
          <p className="font-quicksand font-bold">$123.43</p>
          <p className="font-quicksand font-medium">
            <span className="font-bold">11</span>Friends
          </p>
        </div>
      </div>
      <div className="h-full overflow-auto border border-black rounded-md space-y-4 p-4 md:min-w-[30%]">
        <div className="flex items-center p-2 h-10 w-full rounded-md pace-x-2 border border-black focus-within:ring-1 focus-within:ring-black"></div>
      </div>
    </div>
  );
};

export default EditExpenseComponent;
