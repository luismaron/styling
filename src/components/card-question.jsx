import PropTypes from 'prop-types';
import CardAlternative from './card-alternative';

function CardQuestion(props) {
  return (
    <div className="card-question">
      <h2>{props.question.title}</h2>
      <div className="alternatives">
        {
          props.question.alternatives.map((alternative, index) => (

            <CardAlternative key={`${props.question.name}${index}`} img_alt={alternative.img_alt} img_src={`imgs/${alternative.img_src}`} name={props.question.name} value={alternative.value} setSelected={props.setSelected} isSelected={(props.answers[props.question.name] !== undefined && props.answers[props.question.name]?.indexOf(alternative.value) !== -1)} />
          ))
        }

      </div>
    </div>
  )
}
CardQuestion.propTypes = {
  question: PropTypes.object.isRequired,
  setSelected: PropTypes.func.isRequired,
  answers: PropTypes.object.isRequired
}

export default CardQuestion;