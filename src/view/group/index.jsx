import axios from "axios";
import { useState, useEffect } from 'react';
import URL from '../../config'
import Navbar from "../../component/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import "./index.css"
function Group() {
    const navigator = useNavigate()
    const [data, setData] = useState({
        date: "",
        teacher: "",
        price: "",
        name: ""
    })
    // fanlarni saqlash uchun
    const [teachers, setTeachers] = useState([])
    // bu edit yoki postni aniqlash uchun
    const [status, setStatus] = useState(0)
    // bazada ozgarish bolganda useEffectni qayta ishlatish uchun
    const [refreshKey, setRefreshKey] = useState(0);
    const [refreshKey2, setRefreshKey2] = useState(0);
    // modalni ochib berkitish uchun
    const [modal, setModal] = useState('d-none')
    // o'qtuvchilarni saqlash uchun
    const [group, setGroup] = useState([])
    // o'quvchilar royhati
    const [students, setStudents] = useState([])
    // oquvchi qoshish
    const [studentData, setStudentData] = useState({
        fullname: '',
        phone: '',
        group: ''
    })

    const [tablesmod , setTablesmod] = useState('d-none')
    
    const [studentModal, setStudentModal] = useState('d-none')


    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const changeHandlerStudent = (e) => {
        setStudentData({ ...studentData, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        const demo = () => {
            axios.get(`${URL}/teacher`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then((res) => {
                    setTeachers(res.data)
                })
                .catch((err) => {
                    alert(err)
                });

            axios.get(`${URL}/group`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then((res) => {
                    setGroup(res.data)
                })
                .catch((err) => {
                    alert(err)
                });
        }
        demo()
    }, [refreshKey])

    const submit = async (e) => {
        e.preventDefault()
        if (status == 0) {
            delete data?._id
            await axios.post(`${URL}/group`, data, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then((res) => {
                    setRefreshKey(oldKey => oldKey + 1)
                    setData({
                        date: "",
                        teacher: "",
                        price: "",
                        name: "",
                        _id: ""
                    })
                })
                .catch((err) => {
                    if (err?.response?.status == 403) {
                        alert(err)
                    }
                })
        } else {
            await axios.put(`${URL}/group/${data?._id}`, data, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then((res) => {
                    setRefreshKey(oldKey => oldKey + 1)
                    setStatus(0)
                    setData({
                        date: "",
                        teacher: "",
                        price: "",
                        name: "",
                        _id: ""
                    })
                })
                .catch((err) => {
                    if (err?.response?.status == 403) {
                        alert(err)
                    }
                })
        }
    }


    const addGroup = (id) => {
        studentData.group = id
        axios.get(`${URL}/student/groups/${id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((res) => {
                setStudents(res.data)
            })
            .catch((err) => {
                alert(err)
            });
            tables()
    }

    const submitStudent = async (e) => {
        e.preventDefault()
            await axios.post(`${URL}/student`, studentData, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then((res) => {
                    studentData.fullname = ""
                    studentData.phone = ""
                    addGroup(studentData.group)                
                })
                .catch((err) => {
                    if (err?.response?.status == 403) {
                        alert(err)
                    }
                })
        } 

    const modalFunction = () => {
        if (modal == "d-none") {
            setModal("login_form text-center")
        } else {
            setModal("d-none")
        }
    }

    const studentModalFunction = () => {
        if (studentModal === "d-none") {
            setStudentModal("login_form text-center")
        } else {
            setStudentModal("d-none")
        }
    }


    const DeleteGroup = (id) => {
        axios.delete(`${URL}/group/${id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((res) => {
                alert("DELETED Subject")
                setRefreshKey(oldKey => oldKey + 1)
            })
            .catch((err) => {
                if (err?.response?.status == 403) {
                    alert(err)
                }
            })
    }

    const tables = () => {
        setTablesmod('container')
    }

    const EditStudent = (item)=>{
        localStorage.setItem("student", JSON.stringify(item))
        navigator("/student")
    }

    
    
    return (
        <>
            <Navbar />
            <div className="row container">
                <div className="col-md-12 text-end">
                    <button className="btn btn-primary" onClick={() => modalFunction()}>+AddGroup</button>
                </div>
                <div className={modal}>
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-4 text-end">
                            <button className="btn btn-dark" onClick={() => modalFunction()}>X</button>
                            <form onSubmit={submit}>
                                <input
                                    type="text"
                                    className="form-control m-2"
                                    name="name"
                                    value={data.name}
                                    onChange={changeHandler}
                                    placeholder="Group name"
                                />
                                <input
                                    type="text"
                                    className="form-control m-2"
                                    name="date"
                                    value={data.date}
                                    onChange={changeHandler}
                                    placeholder="date"
                                />
                                <input
                                    type="number"
                                    className="form-control m-2"
                                    name="price"
                                    value={data.price}
                                    onChange={changeHandler}
                                    placeholder="price"
                                />
                                <select
                                    name="teacher"
                                    value={data.teacher}
                                    onChange={changeHandler}
                                    className="form-select m-2"
                                    defaultValue={teachers[0]?._id}
                                >
                                    <option value="">O'qtuvchini tanlang</option>
                                    {
                                        teachers.map((item, index) => {
                                            return (
                                                <option value={item._id} key={index}>{item.fullname}</option>
                                            )
                                        })
                                    }

                                </select>
                                <button className="btn btn-primary" onClick={() => modalFunction()}>SEND</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="row">
                        {group.map((item, index) => {
                            return (
                                <div
                                    className="card col-md-1 m-2 bg-primary text-white gruppa"
                                    key={index}
                                    onClick={() => addGroup(item._id)}
                                >
                                    {item.name}
                                </div>
                            )
                        })}
                    </div>
                    <div className={tablesmod}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">FullName</th>
                                    <th scope="col">Phone</th>
                                    <th> </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    students.map((item, index)=>{
                                        return(
                                            <tr key={index}>
                                            <th scope="row">{index+1}</th>
                                            <td>{item.fullname}</td>
                                            <td>{item.phone}</td>
                                            <td className="btn btn-danger" onClick={()=> EditStudent(item)}>X</td>
                                        </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                        <button className="btn btn-primary m-3" onClick={()=>studentModalFunction()}>+AddStudents</button>
                        <button className="btn btn-danger m-3" onClick={()=>DeleteGroup(studentData.group)}>DeleteGroup</button>
                    </div>
                    <div className={studentModal}>
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-4 text-end">
                                <button className="btn btn-dark" onClick={() => studentModalFunction()}>X</button>
                                <form onSubmit={submitStudent}>
                                    <input
                                        type="text"
                                        className="form-control m-2"
                                        name="fullname"
                                        value={studentData.fullname}
                                        onChange={changeHandlerStudent}
                                        placeholder="fullname"
                                    />
                                    <input
                                        type="text"
                                        className="form-control m-2"
                                        name="phone"
                                        value={studentData.phone}
                                        onChange={changeHandlerStudent}
                                        placeholder="phone"
                                    /> 
                                    <button className="btn btn-primary" onClick={() => studentModalFunction()}>SEND</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Group