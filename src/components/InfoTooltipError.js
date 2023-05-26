import imageSrc from '../images/icon-error.svg';
import InfoTooltip from './InfoTooltip';

function InfoTooltipErorr(props) {
  return (
    <InfoTooltip isOpen={props.isOpen} onClose={props.onClose} imageSrc={imageSrc} imageAlt="Ошибка" title="Что-то пошло не так!&nbsp;Попробуйте ещё раз." />
  )
}

export default InfoTooltipErorr;