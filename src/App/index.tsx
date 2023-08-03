import React, {useEffect, useState} from "react";

import api from "../api/index";
import {Candidate, Step} from "../types/candidate";
import {Column} from "../components/Column";

import styles from "./App.module.scss";

const steps: Step[] = [
  "Entrevista inicial",
  "Entrevista técnica",
  "Oferta",
  "Asignación",
  "Rechazo",
];

function App() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    api.candidates.list().then((data) => setCandidates(data));
  }, []);

  const addCandidate = (candidato: Candidate) => {
    setCandidates([...candidates, candidato]);
  };

  const advance = (id: Candidate["id"], action: "avanzar" | "retroceder") => {
    const candidateIndex = candidates.findIndex((candidate) => candidate.id === id)!;
    const candidate = candidates[candidateIndex];
    const indexStep = steps.indexOf(candidate.step);

    const step = action === "avanzar" ? steps[indexStep + 1] : steps[indexStep - 1];

    if (step) {
      const newCandidates = [...candidates];

      candidate.step = step;
      newCandidates[candidateIndex] = candidate;
      setCandidates(newCandidates);
    }
  };

  return (
    <main className={styles.main}>
      {steps.map((step) => (
        <Column
          key={step}
          addCandidate={addCandidate}
          advance={advance}
          candidatos={candidates.filter((candidate) => candidate.step === step)}
          showButton={step === "Entrevista inicial"}
          titulo={step}
        />
      ))}
    </main>
  );
}

export default App;
