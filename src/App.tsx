import { FiTrash, FiEdit } from "react-icons/fi";
import dayjs from "dayjs";
import { useEffect, useState, useRef, FormEvent } from "react";
import { api } from "./services/api";
import Swal from "sweetalert2";

dayjs.locale("pt-br");

interface Musicosprops {
  id: string;
  name: string;
  email: string;
  status: boolean;
  instrument: string;
  birth_at: Date;
}

export default function App() {
  const [musicos, setMusicos] = useState<Musicosprops[]>([]);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const instrumentRef = useRef<HTMLInputElement | null>(null);
  const birthRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    loadMusicos();
  }, []);

  async function loadMusicos() {
    const response = await api.get("/musicos");

    setMusicos(response.data);
  }

  function excluiMusico(id: string) {
    Swal.fire({
      title: "Excluir cadastro?",
      text: "Você excluirá permanentemente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, excluir!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Excluído!",
          text: "Cadastro excluído com sucesso!",
          icon: "success",
        });

        try {
          await api.delete("/musicos", {
            params: {
              id: id,
            },
          });

          const allMusicos = musicos.filter((musico) => musico.id !== id);
          setMusicos(allMusicos);
        } catch (error) {
          console.log(error);
        }
      }
    });
  }

  async function submeteFormulario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !nameRef.current?.value ||
      !emailRef.current?.value ||
      !instrumentRef.current?.value ||
      !birthRef.current?.value
    )
      return;

    //tratando a data:
    const birthDateValue = birthRef.current?.value ?? "";

    const birthDate = new Date(birthDateValue);

    const formattedBirthDate = birthDate.toISOString();

    const response = await api.post("/musicos", {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      instrument: instrumentRef.current?.value,
      birth_at: formattedBirthDate,
    });

    if (response) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Cadastro realizado com sucesso!",
        showConfirmButton: false,
        timer: 3000,
      });
    }

    // retorna o músico adicionado recentemente(na tela)
    setMusicos((allMusicos) => [...allMusicos, response.data]);

    //para limpar os campos após o cadastro
    nameRef.current.value = "";
    emailRef.current.value = "";
    instrumentRef.current.value = "";
    birthRef.current.value = "";
  }

  return (
    <div className="flex justify-center px-4 w-full min-h-screen bg-sky-950 text-sky-200">
      <main className="my-10 w-full lg:max-w-5xl">
        <h1 className="font-medium text-4xl">Cadastro de músicos</h1>

        <form
          className="flex flex-col my-6 w-full"
          onSubmit={submeteFormulario}
        >
          <label className="font-medium">Nome:</label>
          <input
            type="text"
            placeholder="Digite o nome"
            className="w-full mb-5 p-2 rounded text-sky-950 font-medium"
            ref={nameRef}
            required
          />

          <label className="font-medium">Email:</label>
          <input
            type="email"
            placeholder="Digite o e-mail"
            className="w-full mb-5 p-2 rounded text-sky-950 font-medium"
            ref={emailRef}
            required
          />

          <label className="font-medium">Instrumento:</label>
          <input
            type="text"
            placeholder="Digite o instrumento"
            className="w-full mb-5 p-2 rounded text-sky-950 font-medium"
            ref={instrumentRef}
            required
          />

          <label className="font-medium">Data de nascimento:</label>
          <input
            type="date"
            className="mb-5 p-2 rounded text-sky-950 font-medium max-w-96"
            ref={birthRef}
            required
          />

          <input
            type="submit"
            value="Cadastrar"
            className="max-w-96 mb-5 mt-5 p-2 rounded bg-sky-200 text-sky-950 font-medium cursor-pointer hover:bg-sky-400 duration-150"
          />
        </form>

        <section className="flex flex-col">
          <h1 className="font-medium text-4xl my-9">Músicos cadastrados</h1>
          {/* <label className="font-medium">Selecione por Naipe:</label>
          <select
            name="naipes"
            id="naipes"
            className="w-full mb-5 p-2 rounded text-sky-950 font-medium max-w-96"
          >
            <option value="todos">Todos</option>
            <option value="cordas">Cordas</option>
            <option value="madeiras">Madeiras</option>
            <option value="metais">Metais</option>
            <option value="basePercussao">Base e percussão</option>
          </select> */}

          {musicos.map((musico) => {
            return (
              <article
                key={musico.id}
                className="w-full my-3 bg-sky-100 text-sky-900 text-lg font-medium rounded p-2 relative hover:scale-105 duration-150"
              >
                <p>
                  <span>Nome:</span> {musico.name}
                </p>
                <p>
                  <span>Email:</span> {musico.email}
                </p>
                <p>
                  <span>Instrumento:</span> {musico.instrument}
                </p>
                <p>
                  <span>Data de Nascimento: </span>
                  {dayjs(musico.birth_at).format("DD/MM/YYYY")}
                </p>
                <button
                  className="bg-red-600 text-sky-200 p-2 rounded-lg hover:bg-red-800 absolute right-0 -top-4"
                  onClick={() => excluiMusico(musico.id)}
                >
                  <FiTrash size={18} />
                </button>
                <button className="bg-amber-400 text-sky-950 p-2 rounded-lg hover:bg-amber-500 absolute right-9 -top-4">
                  <FiEdit size={18} />
                </button>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
}
