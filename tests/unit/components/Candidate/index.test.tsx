import React from "react";
import {render, screen} from "@testing-library/react";

import {Candidato} from "../../../../src/components/Candidato";
import {Candidate} from "../../../../src/types/candidate";

const candidate: Candidate = {
  name: "Santiago",
  comments: "Burro",
  id: "Santi",
  step: "Entrevista inicial",
};

const advance = vi.fn();

describe("Componente candidato", () => {
  // Snapshot
  test("Renderiza la informacion", () => {
    const {container} = render(<Candidato advance={advance} candidato={candidate} />);

    expect(container).toMatchSnapshot();
  });

  //OTRO TERMINO QUERY QSY
  test("Renderiza boton retroceder", () => {
    render(<Candidato advance={advance} candidato={{...candidate, step: "Entrevista técnica"}} />);

    const backButton = screen.getByRole("button", {name: "Retroceder proceso"});

    expect(backButton).toBeVisible();
  });

  test("No renderiza ultimo boton avanzar", () => {
    render(<Candidato advance={advance} candidato={{...candidate, step: "Rechazo"}} />);

    const advanceButton = screen.queryByRole("button", {name: "Avanzar proceso"});

    expect(advanceButton).not.toBeInTheDocument();
  });

  test("Advance recibe los parametros esperados", () => {
    render(<Candidato advance={advance} candidato={{...candidate, step: "Entrevista técnica"}} />);

    const advanceButton = screen.getByRole("button", {name: "Avanzar proceso"});
    const backButton = screen.getByRole("button", {name: "Retroceder proceso"});

    expect(advance).not.toHaveBeenCalled();

    advanceButton.click();
    expect(advance).toHaveBeenCalledWith(candidate.id, "avanzar");

    backButton.click();
    expect(advance).toHaveBeenCalledWith(candidate.id, "retroceder");
  });
});
