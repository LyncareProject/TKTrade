import './Product.css'

const Product = ({ product, testUrl })=>{
    return(
        <div>
            <img src={`${testUrl}/${ product.images[0] }`} alt="" />
            <p className='product_Tit'>{ product.nameEng }</p>
        </div>
    )
}
export default Product