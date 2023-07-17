import styles from "../../styles/styles";
import ProductCard from "../products/ProductCard";

function Products({productsData}) {
  
if(productsData.length === 0){
    return (
        <div className="w-full flex justify-center py-20 text-xl">
            No products found
        </div>
    )
}

  return (
    <div className={`${styles.section} pb-20 flex flex-col`}>
      <div className=" flex flex-row justify-center flex-wrap gap-x-5 800px:grid 800px:grid-cols-3 1300px:grid-cols-4 gap-5">
        {productsData &&
          productsData.map(({ title, price, image }) => (
            <ProductCard title={title} price={price} image={image} />
          ))}
      </div>
    </div>
  );
}

export default Products;
