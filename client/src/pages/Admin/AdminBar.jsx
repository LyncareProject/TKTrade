import { useDispatch } from "react-redux"
import { logout } from "../../redux/user"
import { useNavigate } from "react-router-dom"
import './AdminBar.css'

const AdminBar = ()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const LogoutBtn = ()=>{
        navigate('/')
        dispatch(logout())
    }
    return(
        <div className="AdminBar" onClick={()=>{
            navigate('/admin')
        }}>
            <h2>관리자 페이지</h2>
            <button onClick={ LogoutBtn }>로그아웃</button>
        </div>
    )
}
export default AdminBar