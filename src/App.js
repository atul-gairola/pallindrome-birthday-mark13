import React, { useState } from "react";
import "./App.css";

function App() {
  const [birthdate, setBirthdate] = useState("");

  return (
    <div className="App">
      <header>
        <h1>Pallindrome Birthday</h1>
      </header>
      <main>
        <form>
          <label htmlFor="birthdate">Enter your birthdate</label>
          <input
            type="date"
            name="birthdate"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
          <button>Check</button>
        </form>
        <p></p>
      </main>
      <footer>
        Create with love by <a href="https://atulgairola.tech">Atul Gairola</a>
      </footer>
    </div>
  );
}

export default App;
