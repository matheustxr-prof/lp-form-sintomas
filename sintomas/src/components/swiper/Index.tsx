
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import modules
import { Pagination } from "swiper";


interface SliderProps{
    slideContent: Array<string | JSX.Element>;
    slideCount: number;
}

export default function Slider({ slideContent }:SliderProps) {
    return(
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            }}
            pagination={{
            clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper w-[90%] lg:w-[70%] max-w-[1000px] rounded"
        >
            {slideContent.map((content, index:number) => (
                <SwiperSlide key={index} className='w-full h-full flex justify-center items-center py-10 px-5 bg-gradient-to-r from-[#02898660] from-0% via-[#917bad90] via-50% to-[#02898660] to-90% '>
                    {content}
                </SwiperSlide>
            ))}
        </Swiper>
    )
}


/* arrays que precisma estar na pagina onde o swiper vai ser chamado contendo o conteudo dos sliders

const slideContent = [
    'Texto do Slide 1', 
    'Texto do Slide 2', 
    'Texto do Slide 3', 
    <Image key={1} src={import da imagem} alt="imagem tiago tessmann" className="w-auto h-[300px]"/>
];
        
const slideCount = slideContent.length;

o coponente será chamado assim:
<Slider
    slideContent= {slideContent}
    slideCount= {slideCount}
/>
*/