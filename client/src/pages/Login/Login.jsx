import { useState } from "react"
import { login } from '../../redux/user';
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { signin } from "../../service/userService"
import { useDispatch } from "react-redux"

const Login = ()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ input, setInput ] = useState({
        id : '',
        password : ''
    })
    const { id, password } = input
    const handleInput = (e)=>{
        setInput({
            ...input,
            [ e.target.name ] : e.target.value
        })
    }
    const loginBtn = ()=>{
        signin({ id, password })
            .then(result=>{
                if(result.data.message === 'InvaildID'){
                    return alert('아이디 오류')
                } else if(result.data.message === 'InvaildPassword'){
                    return alert('비밀번호 오류')
                } else {
                    dispatch(login({ isLogined : true }))
                    navigate('/admin')
                }
            }).catch(err => alert(err.message.message))
    }
    return(
        <div className="Login">
            <div className="Wrap">
                <label htmlFor="id">아이디</label>
                <input type="text" id="id" name="id" onChange={ handleInput }/>
                <label htmlFor="password">비밀번호</label>
                <input type="password" id="password" name="password" onChange={ handleInput }/>
                <button onClick={ loginBtn }>로그인</button>
            </div>
        </div>
    )
}
export default Login