"use client"
import Link from "next/link";
import Table from "@/components/admin/media/Table";
import Pagination from "@/components/admin/media/Pagination";
import { fetchAllMedias } from "@/apis/media.api";
import { useState, useEffect } from "react";

const mediaManagementPage = () => {
  const limit = 10;
  const [mediasData, setMediasData] = useState([]); 
  // const [cursor, setCursor] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  
  const loadMedias = async (reset = false) => {
    const res = await fetchAllMedias({
      page,
      search,
      // cursor: reset ? "" : cursor,
    });

    if (res?.result) {
      if (reset) {
        setMediasData(res.result);
      } else {
        setMediasData((prev) => [...prev, ...res.data]);
      }

      setCursor(res.nextCursor);
    }
  };


  useEffect(() => {
    // setCursor(null);
    setSearch("");
    loadMedias(true);
  }, [search, page]);

  return (
    <>
      <section className="">
        <div className=" mx-auto max-w-screen-2xl">
          <div className="relative overflow-hidde sm:rounded-lg">
            <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
              <div className="flex items-center justify-between w-full space-x-4">
                <div className="first flex gap-2">
                  <h5>
                    <span className="text-gray-500">Total Medias: </span>
                    <span className="dark:text-white">{mediasData?.total || "N/A"}</span>
                  </h5>
                  <h5>
                    <span className="text-gray-500">Trashed: </span>
                    <span className="dark:text-white">{mediasData?.active || "N/A"}</span>
                  </h5>
                </div>
                <div className="middle flex gap-2 flex-1 w-full">
                  <div className="flex items-center gap-2 px-1 flex-1  bg-[#07070729] border border-gray-300 rounded-lg focus:ring-primary focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 focus:ring focus:outline-none  dark:focus:ring-primary dark:focus:border-primary">
                    {/* <span className="text-gray-500">Search: </span> */}
                    <input onChange={(e)=>setSearch(e.target.value)} placeholder="Search" className="min-w-20 text-gray-900 text-sm cursor-pointer block w-full p-2.5 dark:placeholder-gray-400 dark:text-white outline-none border-none" />
                  </div>
                  <div className="flex items-center gap-2 px-1 bg-[#07070729] border border-gray-300 rounded-lg focus:ring-primary focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 focus:ring focus:outline-none  dark:focus:ring-primary dark:focus:border-primary">
                    <label className="text-gray-500">Sort: </label>
                    <select className="text-gray-900 bg-[#07070729] text-sm cursor-pointer block w-full p-2.5 dark:placeholder-gray-400 dark:text-white outline-none border-none">
                      <option>By A-Z</option>
                      <option>By Z-A</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2 px-1 bg-[#07070729] border border-gray-300 rounded-lg focus:ring-primary focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 focus:ring focus:outline-none  dark:focus:ring-primary dark:focus:border-primary">
                    <label className="text-gray-500">Filter: </label>
                    <select className="text-gray-900 text-sm cursor-pointer block w-full p-2.5 bg-[#07070729] dark:placeholder-gray-400 dark:text-white outline-none border-none">
                      <option>By size</option>
                      <option>By Type</option>
                      <option>By Video</option>
                      <option>By Image</option>
                    </select>
                  </div>
                </div>
                <div className="last flex flex-col space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                  <div className="border border-gray-100/8 hover:border-primary p-1.5 rounded-lg">
                    <Link className=" flex items-center  gap-2" href={"/media-management/add"}>
                      <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                      </svg>
                      Upload New Media
                    </Link>
                  </div>
                  <button type="button" className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                    <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    Export
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              {mediasData?.data && <Table medias={mediasData?.data} />}
            </div>
            <Pagination page={page} setPage={setPage} overAllTotal={mediasData?.total} LIMIT={limit} />
          </div>
        </div>
      </section>
    </>
  )
}

export default mediaManagementPage