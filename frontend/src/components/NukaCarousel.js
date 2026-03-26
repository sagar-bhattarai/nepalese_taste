import { Carousel } from 'nuka-carousel';
import Image from 'next/image';
import banner1 from "../../public/banner/banner1.jpg"
import banner2 from "../../public/banner/banner2.jpg"
import banner3 from "../../public/banner/banner3.jpg"
import banner4 from "../../public/banner/banner4.jpg"

const NukaCarousel = () => {

  function CarouselImage({ img, title }) {
    return (
      <div className="min-w-[100%] max-h-[370px] relative">
        <Image className='h-full w-full object-cover' src={img} alt="image"  height={300} width={1000}/>
        <div className="text-4xl text-blue-400 bg-amber-950 opacity-50 text-center absolute bottom-0 right-0 left-0 m-auto">{title}</div>
      </div>
    );
  }
  return (
    <Carousel autoplay={true} autoplayInterval={3000} wrapMode="wrap" showArrows={true} showDots={false} className=" mx-auto w-[100%]">
      
      {/* <CarouselImage title="content 1" img="https://inspiresupermarket.com:8082//DynamicContentType/F-5/F1-5-2.2..jpg" />
      <CarouselImage title="content 2" img="https://eu.dookan.com/cdn/shop/files/Blog_Banners_2160_x_600_px_2_4f74f1cc-09a0-4fa8-9020-3c945c0c07b1.png?v=1729673825&width=2160" />
      <CarouselImage title="content 3" img="https://indiamarkt.com/cdn/shop/files/ro-site-banner-3.jpg?v=1702940387&width=3840" />
      <CarouselImage title="content 4" img="https://southernsupermarket.com/cdn/shop/files/Media.jpg?v=1744886159" /> */}
      
      <CarouselImage title="content 2" img={banner2} />
      <CarouselImage title="content 1" img={banner1} />
      <CarouselImage title="content 3" img={banner3} />
      <CarouselImage title="content 4" img={banner4} /> 

    </Carousel>
  );
};

export default NukaCarousel;