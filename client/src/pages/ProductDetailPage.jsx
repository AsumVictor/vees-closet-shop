import React from "react";
import styles from "../styles/styles";
import {DesktopImageView} from '../components/imageView/DesktopImageView.jsx'

function ProductDetailPage() {
  return (
    <div className={`${styles.section} flex flex-col`}>
      <div className="w-full 800px:grid grid-cols-2 mt-10 ">
        <div className="w-full py-1 bg-red-500">
            <DesktopImageView />
        </div>
        <div className="bg-blue-400 w-full py-1"></div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
