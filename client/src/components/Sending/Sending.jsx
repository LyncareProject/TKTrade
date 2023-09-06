import './Sending.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const Sending = ({ sending })=>{
    return(
        <div className={
            !sending
            ? "Sending"
            : "SendingActive"
        }>
            <h3 className='SendingNotice'>Sending Email <FontAwesomeIcon icon={ faPaperPlane } /></h3>
        </div>
    )
}
export default Sending