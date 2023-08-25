import './Sending.css'
const Sending = ({ sending })=>{
    return(
        <div className={
            !sending
            ? "Sending"
            : "SendingActive"
        }>
            <h3 className='SendingNotice'>Sending Email...</h3>
        </div>
    )
}
export default Sending