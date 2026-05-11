"use client"
const Pagination = ({ page, setPage, overAllTotal, LIMIT }) => {




    //  it is now only used in customer dashboard




    const totalPagesCalculator = (total, limit) => {
        const pages = [];
        for (let x = 1; x <= Math.ceil(total / limit); x++) {
            pages.push(x);
        }
        return pages;
    };

    return (
       <nav className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Showing
                <span className="font-semibold text-gray-900 dark:text-white"> 1 - {LIMIT > overAllTotal ? overAllTotal : LIMIT } </span>
                of
                <span className="font-semibold text-gray-900 dark:text-white"> {overAllTotal}</span>
            </span>
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
        </nav>
    );
};

export default Pagination;
