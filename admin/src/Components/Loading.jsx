import React from "react";
import loadingImg from "../../assets/loading.gif";

const Loading = () => {
  return (
    <div className="w-screen h-screen bg-gray-900/70 absolute left-0 top-0 flex justify-center items-center">
      <img className="w-16 h-16" src={loadingImg} alt="" />
    </div>
  );
};

export default Loading;
