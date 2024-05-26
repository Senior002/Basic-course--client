import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./Student.css"
import URL from "../../config"
function Student() {
    const navigator = useNavigate()
    const [modal, setModal] = useState("d-none")
    const [student, setStudent] = useState([])
    const [payment, setPayment]= useState({
        date: "",
        price: 0
    })
    const Back = () => {
        localStorage.setItem("student", "")
        navigator("/group")
    }

    useEffect(() => {
        const foo = () => {
            setStudent([JSON.parse(localStorage.getItem('student'))])
        }
        foo()
    }, [])

    const Delete = (id) => {
        axios.delete(`${URL}/student/${id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((res) => {
                alert("DELETED Student")
                Back()
            })
            .catch((err) => {
                if (err?.response?.status == 403) {
                    alert(err)
                }
            })
    }

    const changeHandler = (e) => {
        setPayment({...payment, [e.target.name]:e.target.value})
    }
    const modalFunction = () =>{
        if(modal == "d-none"){
            setModal("mod")
        }else{
            setModal("d-none")
        }
    }

    const SubmitForm = async (e)=>{
        e.preventDefault()
            await axios.put(`${URL}/student/${student[0]._id}`, payment, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then((res) => {
                    setPayment({
                        date: "",
                        price: ""
                    })
                    modalFunction()
                })
                .catch((err) => {
                    if (err?.response?.status == 403) {
                        alert(err)
                    }
                })
    }

    
    return (
        <>
            <h1 onClick={() => Back()}>Ortga</h1>
            <h1>Student page</h1>
            {
                student.map((item, index) => {
                    return (
                        <div className="row" key={index}>
                            <div className="card col-md-3">
                                <img className="student_image" src="" alt="" />
                                <h3>fullname : {item?.fullname}</h3>
                                <p>phone : {item?.phone}</p>
                                <p>group : {item?.group?.name}</p>
                                <div className="d-flex">
                                    <button className="btn btn-primary m-1">Edit</button>
                                    <button className="btn btn-danger m-1" onClick={()=>Delete(item._id)}>Delete</button>
                                    <button className="btn btn-success m-1" onClick={()=>modalFunction()}>Payment</button>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="row">
                                    {
                                        item?.payment?.map((elem, indexx) => {
                                                return(
                                                    <div className="col-md-3 card bg-primary text-white m-1" key={indexx}>
                                                        <h4>
                                                            Vaqti: {elem.date}</h4>
                                                        <h4>Summa: {elem.price} so'm</h4>
                                                    </div>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                        </div>
                    )
                })
            }
            <div className={modal}>
                <>
                <form onSubmit={SubmitForm}>
                    <select 
                        name="date"
                        className="form-select m-2"
                        value={payment.date}
                        onChange={changeHandler}
                    >
                        <option value="Yanvar">Yanvar</option>
                        <option value="Fevral">Fevral</option>
                        <option value="Mart">Mart</option>
                        <option value="Aprel">Aprel</option>
                        <option value="May">May</option>
                        <option value="Iyun">Iyun</option>
                        <option value="Iyul">Iyul</option>
                        <option value="Avgust">Avgust</option>
                        <option value="Sentyabr">Sentyabr</option>
                        <option value="Oktyabr">Oktyabr</option>
                        <option value="Noyabr">Noyabr</option>
                        <option value="Dekabr">Dekabr</option>
                    </select>
                    <input 
                        className="form-control m-2" 
                        type="number" 
                        name="price" 
                        placeholder="price" 
                        value={payment.price} onChange={changeHandler} />
                    <button className="btn btn-primary" >AddPayment</button>
                </form>
                </>
            </div>
        </>
    )
}

export default Student