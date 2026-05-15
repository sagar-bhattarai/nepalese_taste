
"use client";
import HeaderCatPage from "@/components/categoriesPages/HeaderCatPage";
import useCategoryProducts from "../../_hooks/useCategoryProducts";
import { usePathname } from 'next/navigation'

const storagePage = () => {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)
  const lastSegment = segments[segments.length - 1]

  const {
    products,
    page,
    setPage,
    handleSortChange,
    handleSearchByName,
  } = useCategoryProducts(lastSegment);

  return (
    <HeaderCatPage
      catPageProduct={products}
       catPageName={lastSegment}
      handleSearchByName={handleSearchByName}
      handleSortChange={handleSortChange}
      page={page}
      setPage={setPage}
    />
  );
};

export default storagePage;


