import './Product.css'

const Product = ({ product, testUrl })=>{
    return(
        <div>
            <img src={`${testUrl}/${ product.images[0] }`} alt="" />
            <p className='product_Tit'>{ product.nameEng }</p>
            <p>{ product.content }</p>
            <p>{ product.contentEng }</p>
        </div>
    )
}
export default Product