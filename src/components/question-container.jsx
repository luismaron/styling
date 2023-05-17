import PropTypes from "prop-types";
import CardQuestion from "./card-question";
import { useEffect, useState } from "react";
import { questionsFemale, questionsMale } from "../data/questions";

function QuestionContainer(props) {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    if (props.gender === "female") {
      setQuestions(questionsFemale);
    } else {
      setQuestions(questionsMale);
    }
  }, [props.gender]);
  return questions.map((question, index) => {
    return (
      <CardQuestion
        question={question}
        key={index}
        setSelected={props.setSelected}
        answers={props.answers}
      />
    );
  });
}
QuestionContainer.propTypes = {
  gender: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
  answers: PropTypes.object.isRequired,
};

export default QuestionContainer;
