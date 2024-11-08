import axios from "axios";
import { DayFormData } from "../src/components/formulario/Index";

export const api = axios.create({
    baseURL: "https://backend-elisangela.onrender.com",
});

export interface propsFormData {
    espirro: boolean;
    coceira: boolean;
    obstrucao: boolean;
    coriza: boolean;
}



export const enviarEmail = async (formData: { nome: string; sintomas: propsFormData[]; recurrenceStates: Record<string, string>; }) => {
    try {
        const response = await api.post("/send", formData);

        if (response.status === 200) {
            window.alert("Email enviado com sucesso!");
        } else {
            window.alert("Falha ao enviar o email. Por favor, tente novamente.");
        }

        return response.data;

    } catch (error: any) {
        window.alert("Falha ao enviar o email. Por favor, tente novamente.");
        throw new Error("Erro" + error.message);
    }
};

