import React from "react";

function PulseLoader({classextnd}) {
  return (
    <div className={`${classextnd} w-full flex justify-center items-center h-[100vh]`}>
      <div className="pulse"></div>
    </div>
  );
}

export default PulseLoader;
