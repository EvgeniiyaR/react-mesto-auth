import imageSrc from '../images/icon-ok.svg';
import InfoTooltip from './InfoTooltip';

function InfoTooltipOk(props) {
  return (
    <InfoTooltip isOpen={props.isOpen} onClose={props.onClose} imageSrc={imageSrc} imageAlt="Успешно" title="Вы успешно зарегистрировались!" />
  )
}

export default InfoTooltipOk;