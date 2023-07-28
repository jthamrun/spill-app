"use client";
import { usePathname } from "next/navigation";
import PersonProfileComponent from "../../../../components/SearchPeople/PersonProfileComponent";
import { useEffect, useState } from "react";

const PersonProfilePage = () => {
  const pathname = usePathname()!;
  const [id, setID] = useState("");

  useEffect(() => {
     setID(pathname.split("/").pop() as string)
  }, [pathname])

  return (
    <div className="h-[72vh] px-10 py-5 grid overflow-auto md:max-w-2xl xl:max-w-3xl m-auto">
      <PersonProfileComponent id={id} />
    </div>
  );
};

export default PersonProfilePage;
