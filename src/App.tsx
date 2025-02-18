
import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";

function App() {

  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
  }

  return (
    <main className="flex flex-col justify-center items-center">
      <p className=" font-bold text-3xl">{counter}</p>
      <Button onClick={increment}>
        +1
      </Button>
    </main>
  );
}

export default App;
