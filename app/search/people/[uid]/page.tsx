"use client";
import { useParams } from "next/navigation";
import PersonProfileComponent from "../../../../components/SearchPeople/PersonProfileComponent";
import { useEffect, useState } from "react";

const PersonProfilePage = () => {
  const params = useParams()!;
  const [id, setID] = useState("");

  useEffect(() => {
    setID(params.uid as string);
  }, [params]);

  return (
    <div className="h-[92vh] px-10 py-5 grid overflow-auto md:max-w-2xl xl:max-w-3xl m-auto">
      <PersonProfileComponent id={id} />
    </div>
  );
};

export default PersonProfilePage;
