import React from "react";
import {getByRole, render, screen, waitFor} from "@testing-library/react";

import App from "../../../../src/App";
import {Candidate} from "../../../../src/types/candidate";
import api from "../../../../src/api";

const mockedCandidates: Candidate[] = [
  {
    id: "goncy",
    name: "Gonzalo Pozzo",
    step: "Entrevista técnica",
    comments: "Medio pelo",
  },
  {
    id: "doe",
    name: "John Doe",
    step: "Entrevista inicial",
    comments: "",
  },
];

describe("Componente App", () => {
  const apiSpy = vi
    .spyOn(api.candidates, "list")
    .mockImplementation(() => Promise.resolve(mockedCandidates));
  const setItemSpy = vi.spyOn(localStorage, "setItem");

  test("Se renderiza correctamente", () => {
    const {container} = render(<App />);

    expect(container).toMatchSnapshot();
  });

  test("Setea localStorage", async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByRole("heading", {name: "Gonzalo Pozzo"})));
    await waitFor(() =>
      expect(setItemSpy).toHaveBeenCalledWith("candidates", JSON.stringify(mockedCandidates)),
    );
  });
});
