import { useState } from 'react';
import questions from './data/questions'
import './App.css'
import CardQuestion from './components/card-question'
import Modal from './components/modal';

function App() {
  const [answers, setAnswers] = useState({});
  const [primaryStyle, setPrimaryStyle] = useState('');
  const [secondStyle, setSecondStyle] = useState('');
  const [thirdStyle, setThirdStyle] = useState('');

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

    let allAnswers = [];

    Object.values(answers).forEach(answer => {
      allAnswers = allAnswers.concat(answer);
    })

    console.log(allAnswers);
    const map1 = new Map()
    map1.set('a', allAnswers.filter(el => el == 'a').length);
    map1.set('b', allAnswers.filter(el => el == 'b').length);
    map1.set('c', allAnswers.filter(el => el == 'c').length);
    map1.set('d', allAnswers.filter(el => el == 'd').length);
    map1.set('e', allAnswers.filter(el => el == 'e').length);
    map1.set('f', allAnswers.filter(el => el == 'f').length);
    map1.set('g', allAnswers.filter(el => el == 'g').length);

    const mapSort1 = Array.from(new Map([...map1.entries()].sort((a, b) => b[1] - a[1])));
    console.log(mapSort1);



    let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    let styles = ['Romântico', 'Elegante', 'Clássico', 'Dramático Urbano', 'Criativo',
      'Casual/Esportivo', 'Sexy'];

    setPrimaryStyle(styles[letters.indexOf(mapSort1[0][0])]);
    setSecondStyle(styles[letters.indexOf(mapSort1[1][0])]);
    setThirdStyle(styles[letters.indexOf(mapSort1[2][0])]);
  }

  function setSelected(question, alternative) {
    let arrayAnswers;

    if (answers[question] === undefined) {
      arrayAnswers = [alternative]
    } else if (answers[question].indexOf(alternative) !== -1) {
      answers[question].pop(alternative);
      arrayAnswers = [...answers[question]]
    } else {
      arrayAnswers = [...answers[question], alternative]
    }

    const newAnswers = {
      ...answers,
      [question]: arrayAnswers
    }
    setAnswers(newAnswers);
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
        <h3>O seu estilo predominante é o {primaryStyle} alternado entre o {secondStyle} e o {thirdStyle}</h3>
      </Modal>
    </>
  )
}

export default App
