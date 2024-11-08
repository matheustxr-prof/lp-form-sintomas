import { useRef, FormEvent, ChangeEvent, useState } from "react";
import { enviarEmail, propsFormData } from "../../../api/api";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export interface FormData {
  espirro: boolean;
  coceira: boolean;
  obstrucao: boolean;
  coriza: boolean;
}

export interface DayFormData extends FormData {
  data: string;
  recorrencia?: string; // Add this line
}

export const Formulario = () => {
  const daysOfWeek = [
    "2ª. feira",
    "3ª. feira",
    "4ª. feira",
    "5ª. feira",
    "6ª. feira",
    "Sábado",
    "Domingo",
  ];

  const initialFormData: FormData[] = daysOfWeek.map(() => ({
    espirro: false,
    coceira: false,
    obstrucao: false,
    coriza: false,
  }));

  const initialDayData: DayFormData[] = daysOfWeek.map(() => ({
    data: "",
    espirro: false,
    coceira: false,
    obstrucao: false,
    coriza: false,
  }));
  const [dayFormData, setDayFormData] = useState<DayFormData[]>(initialDayData);

  const [formData, setFormData] = useState<propsFormData[]>(initialFormData);

  const propostaFileRef = useRef<HTMLInputElement | null>(null);
  const initialRecurrenceStates: Record<string, string> = {};

  const [recurrenceStates, setRecurrenceStates] = useState(
    initialRecurrenceStates
  );

  const nomeRef = useRef<HTMLInputElement | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    dayIndex: number,
    symptom: keyof FormData
  ) => {
    const { checked } = e.target;
    setDayFormData((prevData) => {
      const newData = [...prevData];
      newData[dayIndex] = {
        ...newData[dayIndex],
        [symptom]: checked,
      };
      return newData;
    });
  };

  const handleDayChange = (
    e: ChangeEvent<HTMLInputElement>,
    dayIndex: number,
    field: keyof DayFormData
  ) => {
    const { checked, value } = e.target;

    setDayFormData((prevData) => {
      const newData = [...prevData];
      newData[dayIndex] = {
        ...newData[dayIndex],
        [field]: field === "recorrencia" ? value : checked, // Atualize o valor diretamente para a recorrência
      };
      return newData;
    });

    // Atualize também o FormData
    setFormData((prevData) => {
      const newFormData = [...prevData];
      newFormData[dayIndex] = {
        ...newFormData[dayIndex],
        [field]: checked,
      };
      return newFormData;
    });
  };

  const handleDateChange = (
    e: ChangeEvent<HTMLInputElement>,
    dayIndex: number
  ) => {
    const { value } = e.target;
    setDayFormData((prevData) => {
      const newData = [...prevData];
      newData[dayIndex] = {
        ...newData[dayIndex],
        data: value,
      };
      return newData;
    });
  };

  const symptomLabels = ["Espirros", "Coceira", "Obstrução", "Coriza"];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const selectedSymptoms: DayFormData[] = dayFormData
      .slice(0, daysCount)
      .map((dayData) => ({
        data: dayData.data,
        espirro: dayData.espirro,
        coceira: dayData.coceira,
        obstrucao: dayData.obstrucao,
        coriza: dayData.coriza,
        recorrencia: dayData.recorrencia,
      })
    );

    const formDataToSend = {
      nome: nomeRef.current?.value || "",
      sintomas: selectedSymptoms,
      recurrenceStates: recurrenceStates, // Inclua as recorrências aqui
    };

    try {
      await enviarEmail(formDataToSend);
    } catch (error) {
      console.error("Algo deu errado", error);
    } finally {
      setIsLoading(false);
    }
  };

  /*COMPONENTE DE NOVO DIA*/
  interface PropsNewDay {
    dayIndex: number;
    dayFormData: DayFormData;
    onDayChange: (
      e: ChangeEvent<HTMLInputElement>,
      dayIndex: number,
      field: keyof DayFormData
    ) => void;
  }
  function NewDay({ dayIndex, dayFormData, onDayChange }: PropsNewDay) {
    const idSuffix = dayIndex + 1;
    const symptomFields = ["espirro", "coceira", "obstrucao", "coriza"];
    const symptomLabels = ["Espirros", "Coceira", "Obstrução", "Coriza"];
    const recurrenceOptions = {
      ausentes: "Ausentes",
      ocasional: "Ocasional (até 5 p/ dia)",
      frequentes: "Frequentes (5-10 p/ dia)",
      muitoFrequentes: "Muito Frequentes (mais de 10 p/ dia)",
    };
    return (
      <>
        <div className="mt-5">
          <div className="w-full">
            <label className="" htmlFor={`data_${idSuffix}`}>
              Data:
            </label>
            <input
              type="date"
              id={`data_${idSuffix}`}
              name={`data_${idSuffix}`}
              value={dayFormData.data}
              onChange={(e) => handleDateChange(e, dayIndex)}
              required
              className="mb-5 h-[40px] w-full rounded text-black px-2"
            />
          </div>

          <div className="text-lg">
            <h2 className="text-xl font-semibold">
              Seleciona abaixo os sintomas que sentiu:
            </h2>

            <div className="mt-5 flex flex-wrap justify-center gap-5">
              {symptomFields.map((symptom, index) => (
                <div
                  className="w-full md:w-[280px] flex flex-col items-center border-2 bg-[#00000070] "
                  key={symptom}
                >
                  <div className="p-2 w-full flex justify-start border-b-2 bg-white text-sky-500 font-bold">
                    <label className="" htmlFor={`${symptom}_${idSuffix}`}>
                      {symptomLabels[index]}:
                    </label>
                    <input
                      type="checkbox"
                      id={`${symptom}_${idSuffix}`}
                      name={`${symptom}_${idSuffix}`}
                      checked={dayFormData[symptom as keyof FormData]}
                      onChange={(e) =>
                        onDayChange(e, dayIndex, symptom as keyof DayFormData)
                      }
                      className="ml-2 w-4"
                    />
                  </div>

                  <div className="w-full p-2">
                    <div className="">
                      <label
                        htmlFor={`recorrencia_${symptom}_${idSuffix}`}
                        className=""
                      >
                        Recorrência:
                      </label>
                    </div>

                    {Object.keys(recurrenceOptions).map((recurrenceOption) => (
                      <div
                        key={recurrenceOption}
                        className="flex items-center pl-1 "
                      >
                        <input
                          className="text-[16px]"
                          type="radio"
                          id={`recorrencia_${symptom}_${recurrenceOption}_${idSuffix}`}
                          name={`recorrencia_${dayIndex}_${symptom}`} // Use dayIndex and symptom in the name attribute
                          value={recurrenceOption}
                          checked={
                            recurrenceStates[`${dayIndex}_${symptom}`] ===
                            recurrenceOption
                          } // Compare with recurrenceStates[`${dayIndex}_${symptom}`]
                          onChange={(e) =>
                            setRecurrenceStates((prevState) => ({
                              ...prevState,
                              [`${dayIndex}_${symptom}`]: e.target.value,
                            }))
                          }
                        />
                        <label
                          htmlFor={`recorrencia_${symptom}_${recurrenceOption}_${idSuffix}`}
                          className="pl-1"
                        >
                          {
                            recurrenceOptions[
                              recurrenceOption as keyof typeof recurrenceOptions
                            ]
                          }
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
  const [daysCount, setDaysCount] = useState(1); // Estado para controlar o número de dias
  const handleAddDay = () => {
    setDaysCount((prevCount) => prevCount + 1);
  };

  return (
    <form
      onSubmit={handleSubmit}
      method="post"
      className="w-full md:max-w-[600px] flex flex-col"
    >
      <div className="w-full">
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          name="nome"
          required
          ref={nomeRef}
          className="mb-5 h-[40px] w-full rounded text-black px-2"
        />
      </div>
      {Array.from({ length: daysCount }).map(
        (_, index) =>
          dayFormData[index] && (
            <NewDay
              key={index.toString()}
              dayIndex={index}
              dayFormData={dayFormData[index]}
              onDayChange={handleDayChange}
            />
          )
      )}

      <Button
        type="button"
        onClick={handleAddDay}
        variant="outlined"
        className="bg-gray-200 hover:bg-gray-300 transition-colors duration-200 mt-4 mb-10"
      >
        Adicionar Dia
      </Button>

      <Button
        type="submit"
        variant="contained"
        className={
          isLoading
            ? "bg-slate-400"
            : "bg-[#e70000] hover:bg-[#f6a824] shadow-[0px_0px_20px_#e7004c] hover:shadow-[0px_0px_20px_#f6a824] transition-all duration-200 "
        }
        endIcon={<SendIcon />}
        disabled={isLoading}
      >
        Enviar
      </Button>
    </form>
  );
};
