

import elisangela from '../../assets/elisangela.webp'
import logo from '../../assets/logo.png'
import Botao from '../../components/button/Index'


export default function Section1() {
    return(
        <section className="w-full min-h-screen pt-[60px] md:px-[5%] bg-gradient-to-b lg:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#917bad] via-[#393d81] md:via-40% to-[#26074f] md:to-70%">
            <div className='flex flex-col lg:flex-row md:justify-center md:items-center'>
                <img src={elisangela} alt="" className='w-full  md:max-w-lg lg:max-w-xl '/>
                <div className='w-full px-5 md:px-0 flex flex-col items-center md:w-[60%] max-w-[600px] md:justify-center'>
                    <div className='w-full flex flex-col'>
                        <img src={logo} alt="" className='mb-5'/>
                        {/*<span className='w-full text-[20px] font-normal text-center  text-white border-[2px] rounded-xl'>Agende sua consulta</span>*/}
                    </div>
                    <h2 className='mt-4 font-semibold text-white text-center md:text-start mb-10 md:text-[28px]'>Melhorando a vida dos alérgicos e ajudando famílias no cuidado de suas crianças de forma prática.</h2>
                    <Botao>
                        Chamar no WhatsApp
                    </Botao>
                </div>
            </div>
        </section>
    )
}