import { useState } from "react";
import "./App.css";
import Modal from "./components/modal";
import QuestionContainer from "./components/question-container";

function App() {
  const [gender, setGender] = useState("female");
  const [answers, setAnswers] = useState({});

  const [message, setMessage] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  function onClose() {
    setIsOpen(false);
  }

  function reset() {
    setAnswers({});
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function onGenderChange(selectedGender) {
    setAnswers({});
    setGender(selectedGender);
  }

  function onAvaliate() {
    setIsOpen(true);
    if (Object.keys(answers).length < 6) {
      setMessage("Você deve escolher pelo menos uma opção para cada pergunta");
      return;
    }
    for (let arr of Object.values(answers)) {
      if (arr.length == 0) {
        setMessage(
          "Você deve escolher pelo menos uma opção para cada pergunta"
        );
        return;
      }
    }

    let allAnswers = [];

    Object.values(answers).forEach((answer) => {
      allAnswers = allAnswers.concat(answer);
    });

    const map1 = new Map();
    map1.set("a", allAnswers.filter((el) => el == "a").length);
    map1.set("b", allAnswers.filter((el) => el == "b").length);
    map1.set("c", allAnswers.filter((el) => el == "c").length);
    map1.set("d", allAnswers.filter((el) => el == "d").length);
    map1.set("e", allAnswers.filter((el) => el == "e").length);
    map1.set("f", allAnswers.filter((el) => el == "f").length);
    map1.set("g", allAnswers.filter((el) => el == "g").length);

    const mapSort1 = Array.from(
      new Map([...map1.entries()].sort((a, b) => b[1] - a[1]))
    );

    let letters = ["a", "b", "c", "d", "e", "f", "g"];
    let styles = [
      "Romântico",
      "Elegante",
      "Clássico",
      "Dramático Urbano",
      "Criativo",
      "Casual/Esportivo",
      "Sexy",
    ];

    const primary = styles[letters.indexOf(mapSort1[0][0])];
    const second = styles[letters.indexOf(mapSort1[1][0])];
    const third = styles[letters.indexOf(mapSort1[2][0])];

    setMessage(
      `O seu estilo predominante é o ${primary} alternado entre o ${second} e o ${third}`
    );
  }

  function setSelected(question, alternative) {
    let arrayAnswers;

    if (answers[question] === undefined) {
      arrayAnswers = [alternative];
    } else if (answers[question].indexOf(alternative) !== -1) {
      answers[question].pop(alternative);
      arrayAnswers = [...answers[question]];
    } else {
      arrayAnswers = [...answers[question], alternative];
    }

    const newAnswers = {
      ...answers,
      [question]: arrayAnswers,
    };
    setAnswers(newAnswers);
  }

  return (
    <>
      <div className="container">
        <header>
          <h1>Qual seu estilo?</h1>
          <p>Descubra o seu estilo predominante!</p>
          <div>
            <button
              className={`${gender === "female" ? "inactive" : ""}`}
              onClick={(e) => {
                onGenderChange("female");
              }}
            >
              Feminino
            </button>
            <button
              className={`${gender === "male" ? "inactive" : ""}`}
              onClick={(e) => {
                onGenderChange("male");
              }}
            >
              Masculino
            </button>
          </div>
        </header>
        <QuestionContainer
          answers={answers}
          gender={gender}
          setSelected={setSelected}
        />
        <div className="avaliate">
          <button type="button" className="new" onClick={reset}>
            Nova Avaliação
          </button>
          <button type="button" onClick={onAvaliate}>
            Avaliar
          </button>
        </div>
      </div>
      <Modal onClose={onClose} open={isOpen}>
        <h3>{message}</h3>
      </Modal>
    </>
  );
}

export default App;
