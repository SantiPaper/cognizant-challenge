import React, {FunctionComponent} from "react";

import {Candidate} from "../../types/candidate";

import style from "./index.module.scss";

type Props = {
  candidato: Candidate;
  advance: (id: string, action: "avanzar" | "retroceder") => void;
};

export const Candidato: FunctionComponent<Props> = ({candidato, advance}) => {
  return (
    <article className={style.containerCandidato}>
      <div>
        <h3>{candidato.name}</h3>
        <p>{candidato.comments}</p>
      </div>
      <div>
        {candidato.step !== "Entrevista inicial" && (
          <button
            aria-label="Retroceder proceso"
            onClick={() => advance(candidato.id, "retroceder")}
          >
            {"<"}
          </button>
        )}
        {candidato.step !== "Rechazo" && (
          <button aria-label="Avanzar proceso" onClick={() => advance(candidato.id, "avanzar")}>
            {">"}
          </button>
        )}
      </div>
    </article>
  );
};
