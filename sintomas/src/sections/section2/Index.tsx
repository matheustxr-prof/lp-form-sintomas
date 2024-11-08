
import { Formulario } from "../../components/formulario/Index";


export default function Section2() {

    


    return (
        <section className="py-10 w-full min-h-[50vh]  bg-[#26074f] flex flex-col  items-center max-w-screen text-white">
            
            <div className="w-full flex flex-col items-center gap-10 mb-14 md:mb-20 px-8">
                <h2 className="text-[38px] md:text-5xl font-bold">Registros de sintomas nasais</h2>
                
                <Formulario />
               
                
            </div>

            
            
        </section>
    )
}