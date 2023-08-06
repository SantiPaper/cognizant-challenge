import type {Candidate, Step} from "../../types/candidate";

import React, {FormEvent, FunctionComponent, useState} from "react";
import {v4} from "uuid";

import {Candidato} from "../Candidato";

import style from "./index.module.scss";

type Props = {
  candidatos: Candidate[];
  titulo: Step;
  advance: (id: string, action: "avanzar" | "retroceder") => void;
  addCandidate: (candidato: Candidate) => void;
};

export const Column: FunctionComponent<Props> = ({candidatos, titulo, advance, addCandidate}) => {
  const [showForm, setShowForm] = useState(false);

  const crearCandidato = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newCandidate = Object.fromEntries(formData.entries());

    newCandidate.id = v4();
    newCandidate.step = "Entrevista inicial";

    addCandidate(newCandidate as unknown as Candidate);
  };

  return (
    <div className={style.column}>
      <h2>{titulo}</h2>

      {candidatos.length > 0 ? (
        candidatos.map((candidato) => (
          <Candidato key={candidato.id} advance={advance} candidato={candidato} />
        ))
      ) : (
        <p>No hay candidatos</p>
      )}

      {titulo === "Entrevista inicial" && (
        <button
          onClick={() => {
            setShowForm(!showForm);
          }}
        >
          Agregar candidato
        </button>
      )}
      {showForm && (
        <form className={style.container__form} onSubmit={crearCandidato}>
          <label htmlFor="nombre">Nombre</label>
          <input required id="nombre" name="name" type="text" />

          <label htmlFor="comentario">Algún comentario</label>
          <input id="comentario" name="comments" type="text" />

          <button>Agregar</button>
        </form>
      )}
    </div>
  );
};
