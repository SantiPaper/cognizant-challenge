export interface Candidate {
  id: string;
  name: string;
  comments: string;
  step: Step;
}

export type Step =
  | "Entrevista inicial"
  | "Entrevista técnica"
  | "Oferta"
  | "Asignación"
  | "Rechazo";
