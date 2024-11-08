
import imgWpp from '../../assets/whatsapp.png'

export default function Whatsapp(){
    return (
        <div className='fixed left-5 bottom-5 z-50 animate-bounce'>
            <a href="https://wa.me/5534999353532?text=Olá, vim através do site, gostaria de agendar uma consulta com a Dra. Elisângela!" target='_blank' className=' '>
                <img src={imgWpp} alt='icone whatsapp' className='w-[54px] h-[54px] ' />
            </a>
        </div>
    )
}