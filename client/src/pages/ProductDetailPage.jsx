import React from "react";
import styles from "../styles/styles";
import DesktopImageView from '../components/imageView/DesktopImageView'
import MobileImageView from '../components/imageView/MobileImageView'


function ProductDetailPage() {
  return (
    <div className={`${styles.section} flex flex-col`}>
      <div className="w-full 800px:grid grid-cols-2 mt-10 ">
        <div className="w-full py-1">
            <DesktopImageView />
            <MobileImageView />
        </div>
        <div className="bg-blue-400 w-full py-1"></div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
