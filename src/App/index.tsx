import React from "react";

import styles from "./App.module.scss";

function App() {
  return (
    <main className={styles.main}>
      <div className={styles.column}>
        <h2>Entrevista inicial</h2>
        <p>No hay candidatos</p>
        <button>Agregar candidato</button>
      </div>
      <div className={styles.column}>
        <h2>Entrevista técnica</h2>
        <p>No hay candidatos</p>
      </div>
      <div className={styles.column}>
        <h2>Oferta</h2>
        <p>No hay candidatos</p>
      </div>
      <div className={styles.column}>
        <h2>Asignación</h2>
        <p>No hay candidatos</p>
      </div>
      <div className={styles.column}>
        <h2>Rechazo</h2>
        <p>No hay candidatos</p>
      </div>
    </main>
  );
}

export default App;
