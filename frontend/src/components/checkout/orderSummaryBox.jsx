import React from "react";

function OrderSummaryBoxInfo({ children, title, icon }) {
  return (
    <div className="w-full relative py-3">
      <div className="w-full h-[1cm] py-2 relative flex flex-row items-center gap-2">
        <div className="h-[0.1cm] w-[2cm] bg-deep-primary rounded-3xl"></div>
        <h3 className="text-xl font-semibold text-deep-primary">{title}</h3>
        <div className="h-[1cm] w-[1cm] bg-deep-primary absolute top-0 -left-5 rounded-full flex justify-center items-center">
          {icon}
        </div>
      </div>
      {children}
    </div>
  );
}

export default OrderSummaryBoxInfo;
