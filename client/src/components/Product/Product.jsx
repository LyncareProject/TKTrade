import './Product.css'

const Product = ({ product, testUrl })=>{
    return(
        <div>
            <img src={`${testUrl}/${ product.images[0] }`} alt="" />
            <p className='product_Tit'>{ product.nameEng }</p>
            <p>{ product.contentEng }</p>
            <p>{ product.content }</p>
        </div>
    )
}
export default Product