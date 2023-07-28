type Props = {
  id: string;
};

const FriendProfileComponent = ({ id }: Props) => {
  return (
    <div className="flex flex-col items-center border border-black rounded-md">
      <div className="text-center py-1.5">
        <h3 className="font-quicksand text-2xl font-bold">{id}</h3>
      </div>
      <div className="h-[1px] bg-black w-full"></div>
      <div className="w-full p-4">
        <div className="mt-4 space-y-3"></div>
      </div>
    </div>
  );
};

export default FriendProfileComponent;
