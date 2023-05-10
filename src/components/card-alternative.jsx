import PropTypes from 'prop-types';

function CardAlternative(props) {
  //onClick={() => props.setSelected(props.name, props.value)}
  return <div className={`card-alternative ${props.isSelected ? 'selected' : ''}`} onClick={() => { props.setSelected(props.name, props.value) }} >
    <img src={props.img_src} alt={props.img_alt} />

  </div>
}
CardAlternative.propTypes = {
  img_src: PropTypes.string.isRequired,
  img_alt: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setSelected: PropTypes.setSelected,
  isSelected: PropTypes.bool
}

export default CardAlternative;