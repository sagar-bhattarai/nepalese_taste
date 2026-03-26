const Pagination = ({ page, setPage, overAllTotal, LIMIT }) => {

  const totalPagesCalculator = (total, limit) => {
    const pages = [];
    for (let x = 1; x <= Math.ceil(total / limit); x++) {
      pages.push(x);
    }
    return pages;
  };

  return (
    <div className="pagination py-5">
      <ul className="flex items-center gap-3 cursor-pointer ">
        <li
          className={`${page == 1 ? "text-gray-500" : "hover:text-primary"}`}
          onClick={page != 1 ? () => setPage(page - 1) : null}
        >
          {`<< `}Prev
        </li>
        {totalPagesCalculator(overAllTotal, LIMIT).map((pageNo) => (
          <li
            className={`${page == pageNo ? "text-primary" : "hover:text-primary"}`}
            key={pageNo}
            onClick={() => setPage(pageNo)}
          >
            {pageNo}
          </li>
        ))}
        <li
          className={`${page == Math.ceil(overAllTotal / LIMIT) ? "text-gray-500" : "hover:text-primary"}`}
          onClick={() =>
            page == Math.ceil(overAllTotal / LIMIT) ? null : setPage(page + 1)
          }
        >
          Next{` >>`}
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
