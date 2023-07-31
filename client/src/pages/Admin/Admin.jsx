
import { Link, Outlet } from "react-router-dom"
import './Admin.css'

const Admin = ({ mode, setMode })=>{

    return(
        <div className="Admin">
            <div className="Wrap">
                <div className="AdminControllBar">
                    <Link to='/admin/category' className={
                        mode === "category"
                        ? "Active"
                        : null
                    } onClick={()=>{
                        setMode("category")
                    }}>카테고리 관리</Link>
                    <Link to='/admin/product' className={
                        mode === "product"
                        ? "Active"
                        : null
                    } onClick={()=>{
                        setMode("product")
                    }}>상품 관리</Link>
                </div>
                <Outlet />
            </div>
        </div>
    )
}
export default Admin