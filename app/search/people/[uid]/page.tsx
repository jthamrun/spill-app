"use client";
import { useParams } from "next/navigation";
import PersonProfileComponent from "../../../../components/SearchPeople/PersonProfileComponent";

const PersonProfilePage = () => {
  const params = useParams()!;

  return (
    <div className="h-[92vh] px-10 py-5 grid overflow-auto md:max-w-2xl xl:max-w-3xl m-auto">
      <PersonProfileComponent id={params.uid as string} />
    </div>
  );
};

export default PersonProfilePage;
