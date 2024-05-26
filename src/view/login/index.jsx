import axios from "axios"
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import URL from "../../config"
function Login(){
    const navigator = useNavigate()
    const [data , setData] = useState({
        phone: "",
        password: ""
    })

    const [user , setUser] = useState(true)

    const submit = async (e)=> {
        if(user == true){
            e.preventDefault()
        await  axios.post(`${URL}/auth/admin`, data)
        .then((res)=> {
            localStorage.setItem("token", res.data.jwt_key)
            navigator("/subject")
        })
        .catch((err)=> {
            if(err?.response?.status == 403){
                alert("Phone/password false")
            }
        })
        }else {
            e.preventDefault()
        await  axios.post(`${URL}/auth/boss`, data)
        .then((res)=> {
            localStorage.setItem("token", res.data.jwt_key)
            navigator("/chart")
        })
        .catch((err)=> {
            if(err?.response?.status == 403){
                alert("Phone/password false")
            }
        })
        }
    }
    const changeHandler = (e)=>{
        setData({...data , [e.target.name]:e.target.value})
        console.log(data)
    }

    return(
        <>
            <div className="login_content">
                <div className="row d-flex justify-content-center align-items-center">
                
                    <div className="col-md-4">
                    <h1>Login</h1>
                        <select 
                            className="form-select" 
                            name=""
                            onChange={(e)=>{
                                console.log(e.target.value)
                                setUser(e.target.value)
                            }}    
                        >
                            <option value="true">Admin</option>
                            <option value="false">Boss</option>
                        </select>
                        <form className="text-center" onSubmit={submit}>
                            <input 
                                type="text" 
                                className="form-control my-3"
                                placeholder="phone ex: 990010101"
                                name="phone"
                                value={data.phone}
                                onChange={changeHandler}
                            />
                            <input 
                                type="password" 
                                className="form-control my-3"
                                placeholder="password"
                                name="password"
                                value={data.password}
                                onChange={changeHandler}
                            />
                            <button className="btn btn-primary">LOGIN</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login