import React, { ReactNode } from "react";
import { MdOutlineVideocamOff } from "react-icons/md";

const NoResults = ({
  text,
  icon = <MdOutlineVideocamOff />,
}: {
  text: string;
  icon: ReactNode;
}) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <p className="text-8xl">{icon}</p>
      <p className="text-2xl text-center">{text}</p>
    </div>
  );
};

export default NoResults;
