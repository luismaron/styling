import { useState } from 'react';
import questions from './data/questions'
import './App.css'
import CardQuestion from './components/card-question'
import Modal from './components/modal';

function App() {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState('');

  const [isOpen, setIsOpen] = useState(false);

  function onClose() {
    setIsOpen(false)
  }

  function reset() {
    setAnswers({});
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  function onAvaliate() {
    setIsOpen(true)
    let countA = 0;
    let countB = 0;
    let countC = 0;
    let countD = 0;
    let countE = 0;
    let countF = 0;
    let countG = 0;

    Object.values(answers).forEach(answer => {
      if (answer === 'a') countA++;
      else if (answer === 'b') countB++;
      else if (answer === 'c') countC++;
      else if (answer === 'd') countD++;
      else if (answer === 'e') countE++;
      else if (answer === 'f') countF++;
      else if (answer === 'g') countG++;
    })
    const arr = Array.of(countA, countB, countC, countD, countE, countF, countG);
    const biggest = Math.max(countA, countB, countC, countD, countE, countF, countG)
    const index = arr.indexOf(biggest);
    let styles = ['Romântico', 'Elegante', 'Clássico', 'Dramático Urbano', 'Criativo',
      'Casual/Esportivo', 'Sexy'];

    const style = styles[index];

    setResult(style);
  }

  function setSelected(question, alternative) {
    const newAnswers = {
      ...answers,
      [question]: alternative,
    }
    setAnswers(newAnswers)
  }
  return (
    <>
      <div className="container">
        <header>
          <h1>Qual seu estilo?</h1>
          <p>Descubra o seu estilo predominante!</p>
        </header>
        {
          questions.map((question, index) => {
            return <CardQuestion question={question} key={index} setSelected={setSelected} answers={answers} />
          }
          )
        }
        <div className='avaliate'>
          <button type='button' className='new' onClick={reset}>Nova Avaliação</button>
          <button type='button' onClick={onAvaliate}>Avaliar</button>
        </div>

      </div >
      <Modal onClose={onClose} open={isOpen} >
        <h3>O seu estilo é: {result}</h3>
      </Modal>
    </>
  )
}

export default App
