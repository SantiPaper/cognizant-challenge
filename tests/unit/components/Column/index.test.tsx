import React from "react";
import {render, screen, act} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {Candidate} from "../../../../src/types/candidate";
import {Column} from "../../../../src/components/Column";

vi.mock("uuid", () => {
  return {
    v4: () => "abc123",
  };
});

const candidates: Candidate[] = [
  {
    name: "Santiago",
    comments: "Burro",
    id: "Santi",
    step: "Entrevista inicial",
  },
  {
    name: "Emiliano",
    comments: "Crack",
    id: "Emi",
    step: "Entrevista inicial",
  },
];

const advance = () => {};

const addCandidate = vi.fn();

describe("Componente column", () => {
  const user = userEvent.setup();

  test("Se rendenderizan todos los participantes", () => {
    const {container} = render(
      <Column
        addCandidate={addCandidate}
        advance={advance}
        candidatos={candidates}
        titulo="Entrevista inicial"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("Si no hay participante renderiza texto alternativo", () => {
    render(
      <Column
        addCandidate={addCandidate}
        advance={advance}
        candidatos={[]}
        titulo="Entrevista técnica"
      />,
    );

    const noMatchCandidates = screen.getByText("No hay candidatos");

    expect(noMatchCandidates).toBeInTheDocument();
  });

  /*  test("Llega bien el titulo", () => {
    render(
      <Column
        addCandidate={addCandidate}
        advance={advance}
        candidatos={[]}
        titulo="Entrevista técnica"
      />,
    );

    const title = screen.getByRole("heading", {name: "Entrevista técnica"}); 

    expect(title).toBeVisible();
  });
  */

  test("Renderiza el boton del form solo en entrevista inicial", () => {
    render(
      <Column
        addCandidate={addCandidate}
        advance={advance}
        candidatos={candidates}
        titulo="Entrevista técnica"
      />,
    );
    const formButton = screen.queryByRole("button", {name: "Agregar candidato"});

    expect(formButton).not.toBeInTheDocument();
  });

  test("El boton agregar candidato funciona", () => {
    render(
      <Column
        addCandidate={addCandidate}
        advance={advance}
        candidatos={candidates}
        titulo="Entrevista inicial"
      />,
    );
    const addButton = screen.getByRole("button", {name: "Agregar candidato"});

    act(() => addButton.click());

    const form = screen.getByRole("form");

    expect(form).toBeVisible();

    act(() => addButton.click());
    expect(form).not.toBeInTheDocument();
  });

  test("Funciona el formulario", async () => {
    render(
      <Column
        addCandidate={addCandidate}
        advance={advance}
        candidatos={candidates}
        titulo="Entrevista inicial"
      />,
    );
    const showFormButton = screen.getByRole("button", {name: "Agregar candidato"});

    act(() => showFormButton.click());

    const inputName = screen.getByRole("textbox", {name: "Nombre"});
    const inputComment = screen.getByRole("textbox", {name: "Algun comentario"});
    const sendFormButton = screen.getByRole("button", {name: "Agregar"});

    sendFormButton.click();

    expect(addCandidate).not.toHaveBeenCalled();

    await user.type(inputName, "Gonzalo");
    await user.type(inputComment, "Medio pelo");

    sendFormButton.click();

    expect(addCandidate).toHaveBeenCalledWith({
      name: "Gonzalo",
      comments: "Medio pelo",
      step: "Entrevista inicial",
      id: "abc123",
    });
  });
});
