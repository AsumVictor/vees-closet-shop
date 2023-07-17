import styles from "../../styles/styles";

function Pagination({ currentPage, totalPage, nextAction, prevAction }) {
  return (
    <div
      className={`${styles.section} ${styles.noramlFlex} gap-5 py-2 justify-center`}
    >
      <button
        className={`px-2 py-1 bg-wine_primary text-white rounded-md hover:bg-wine_secondary ${
          currentPage > 1 ? "visible" : "invisible"
        }`}
        onClick={prevAction}
      >
        Previous page
      </button>
      <div className="text-[17px]">
        <span className=" font-bold text-wine_primary">{currentPage}</span>
        <span className="font-semibold">/{totalPage}</span>
      </div>
      <button
        className={`px-2 py-1 bg-wine_primary text-white rounded-md hover:bg-wine_secondary ${
          currentPage / totalPage !== 1 ? "visible" : "invisible"
        }`}
        onClick={nextAction}
      >
        Next page
      </button>
    </div>
  );
}

export default Pagination;
