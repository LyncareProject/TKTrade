import { useEffect, useState } from "react";
import { readCategory } from "../../service/categoryService";
import "./ProductList.css";
import { findAllProduct } from "../../service/productService";
import Card from "../../components/Card/Card";
import { useLocation } from "react-router-dom";
import testUrl from "../../service/testURL";

const ProductList = () => {
  const { state } = useLocation();
  const [loading, setLoading] = useState(true);
  const [mainCategory, setMainCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [checkedCategory, setCheckedCategory] = useState("");

  const handleChecked = (name) => {
    setCheckedCategory(name);
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const fetchCategory = await readCategory();
      const fetchProducts = await findAllProduct();
      if (state) {
        await setCheckedCategory(state);
      }
      setMainCategory(fetchCategory.data);
      setProducts(fetchProducts.data);
    };
    fetchData();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (checkedCategory) {
      const filter = products.filter(
        (product) => product.category === checkedCategory
      );
      return setFilteredData(filter);
    }
  }, [checkedCategory]);

  return (
    <div className="ProductList">
      <div className={!checkedCategory ? null : "Wrap" }>
        <div className={checkedCategory ? "ControlBar" : "ControlBarNone"}>
          <div className="ControlTitle">CATEGORY</div>
          <div className="Category" onClick={()=>{
                        setCheckedCategory('')
                    }}>ALL</div>
          {mainCategory.map((a, i) => (
            <div key={i}>
              <div
                className={
                  a.category === checkedCategory
                    ? "Category CategoryActive"
                    : "Category"
                }
                onClick={() => {
                  handleChecked(a.category);
                }}
              >
                {a.category}
              </div>
            </div>
          ))}
        </div>
        <div className="Products">
          {loading 
          ? null 
          : (
            <div className="ProductsWrap">
              {!checkedCategory ? (
                <>
                  <div className="CategoryProductWrap">
                    {mainCategory.map((a, index) => (
                      <div className="MainCategoryList" key={index} 
                      onClick={() => {
                          handleChecked(a.category);
                        }}
                      >
                        <div className="CardImgWrap">
                        <img src={`${ testUrl }/${ a.images }`} alt="" />
                        </div>
                        {a.category}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {filteredData.map((product, index) => (
                    <div className="CardWrap" key={index}>
                      <Card product={product} />
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;