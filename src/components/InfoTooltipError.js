import imageSrc from '../images/icon-error.svg';
import InfoTooltip from './InfoTooltip';

function InfoTooltipErorr(props) {
  return (
    <InfoTooltip isOpen={props.isOpen} onClose={props.onClose} imageSrc={imageSrc} imageAlt="Ошибка" title="Что-то&nbsp;пошло&nbsp;не&nbsp;так! Попробуйте&nbsp;ещё раз." />
  )
}

export default InfoTooltipErorr;