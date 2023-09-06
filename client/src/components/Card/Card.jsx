import './Card.css'
import testUrl from '../../service/testURL'

const Card = ({ product })=>{
    return(
        <a href={`/product/${ product._id }`} className='Card'>
            <div className='CardImgWrap'>
                <img src={`${testUrl}/${ product.images[0] }`} alt="" />
            </div>
            <div className='CardContentsWrap'>
                { product.nameEng }
            </div>
        </a>
    )
}
export default Card