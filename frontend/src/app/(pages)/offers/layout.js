import Banner from "@/components/products/Banner";

const productLayout = ({ children }) => {
  return (
    <div className="dark:bg-[#0e041a] bg-[#f8f8ff] "> {/* <div className="container mx-auto bg-gray-100"> */}
      <Banner />
      {children}
    </div>
  )
}

export default productLayout