import axios  from "axios";
import {useState, useEffect} from 'react';
import URL from '../../config'
import Navbar from "../../component/navbar/Navbar";

function Teacher(){
    const [data , setData] = useState({
        fullname: "",
        phone: "",
        address: "",
        age: "",
        password: "",
        subject: "",
        desc: "",
        role: "teacher"
    })
    // fanlarni saqlash uchun
    const [subjects, setSubjects] = useState([])
    // bu edit yoki postni aniqlash uchun
    const [status , setStatus] = useState(0)
    // bazada ozgarish bolganda useEffectni qayta ishlatish uchun
    const [refreshKey, setRefreshKey] = useState(0);
    // modalni ochib berkitish uchun
    const [ modal, setModal ] = useState( 'd-none' )
    // o'qtuvchilarni saqlash uchun
    const [teacher, setTeacher] = useState([])

    const changeHandler = ( e ) =>    {
        setData( { ...data, [ e.target.name ]: e.target.value } )
    }

    useEffect(()=>{
        const demo = () =>{
            axios.get(`${URL}/subject`,{
                headers: {
                    authorization: `Bearer ${ localStorage.getItem( "token" ) }`
                }
            })
            .then((res)=>{
                setSubjects(res.data)
            })
            .catch((err)=>{
                alert(err)
            });

            axios.get(`${URL}/teacher`,{
                headers: {
                    authorization: `Bearer ${ localStorage.getItem( "token" ) }`
                }
            })
            .then((res)=>{
                setTeacher(res.data)
            })
            .catch((err)=>{
                alert(err)
            });
        }
        demo()
    },[refreshKey])

    const submit = async ( e ) =>    {
        e.preventDefault()
        if(status == 0 ){
            delete data?._id
            await axios.post( `${URL}/teacher`, data, {
                headers: {
                    authorization: `Bearer ${ localStorage.getItem( "token" ) }`
                }
                })
                .then( ( res ) => {
                    setRefreshKey(oldKey => oldKey +1)
                    setData({
                        fullname: "",
                        phone: "",
                        address: "",
                        age: "",
                        password: "",
                        subject: "",
                        desc: "",
                        role: "teacher",
                        _id: ""
                    })
                } )
                .catch( ( err ) =>{
                    if ( err?.response?.status == 403 ){
                        alert( err )
                    }
                } )
        }else {
            await axios.put( `${URL}/teacher/${data?._id}`, data, {
                headers: {
                    authorization: `Bearer ${ localStorage.getItem( "token" ) }`
                }
            } )
                .then( ( res ) => {
                    setRefreshKey(oldKey => oldKey +1)
                    setStatus(0)
                    setData({
                        fullname: "",
                        phone: "",
                        address: "",
                        age: "",
                        password: "",
                        subject: "",
                        desc: "",
                        role: "teacher",
                        _id: ""
                    })
                } )
                .catch( ( err ) =>{
                    if ( err?.response?.status == 403 ){
                        alert( err )
                    }
                } )
        }
    }

    const modalFunction = () =>    {
        if ( modal == "d-none" ){
            setModal( "login_form text-center" )
        } else {
            setModal( "d-none" )
        }
    }

    const editSubject = (item) => {
        setData({
            fullname: item.fullname,
            phone: item.phone,
            address: item.address,
            age: item.age,
            password: item.password,
            subject: item.subject,
            desc: item.desc,
            role: "teacher",
            _id: item._id
        })
        setStatus(1)
        modalFunction()
    }

    const Delete = (id) => {
        axios.delete( `${URL}/teacher/${id}`, {
           headers: {
               authorization: `Bearer ${ localStorage.getItem( "token" ) }`
           }
       } )
           .then( ( res ) =>{
               alert("DELETED Subject")
               setRefreshKey(oldKey => oldKey +1)
           } )
           .catch( ( err ) =>{
               if ( err?.response?.status == 403 ){
                   alert( err )
               }
           } )
   }

    return(
        <>
            <Navbar/>
            <div className="row container">
                <div className="col-md-12 text-end">
                    <button className="btn btn-primary" onClick={()=> modalFunction()}>+AddTeacher</button>
                </div>
                <div className={modal}>
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-4 text-end">
                            <button className="btn btn-dark" onClick={()=> modalFunction()}>X</button>
                            <form onSubmit={submit}>
                                <input 
                                    type="text"
                                    className="form-control m-2"
                                    name="fullname" 
                                    value={data.fullname}
                                    onChange={changeHandler}
                                    placeholder="Fullname"
                                />
                                <input 
                                    type="text"
                                    className="form-control m-2"
                                    name="phone" 
                                    value={data.phone}
                                    onChange={changeHandler}
                                    placeholder="phone"
                                />
                                <input 
                                    type="text"
                                    className="form-control m-2"
                                    name="address" 
                                    value={data.address}
                                    onChange={changeHandler}
                                    placeholder="address"
                                />
                                <input 
                                    type="number"
                                    className="form-control m-2"
                                    name="age" 
                                    value={data.age}
                                    onChange={changeHandler}
                                    placeholder="age"
                                />
                                <input 
                                    type="password"
                                    className="form-control m-2"
                                    name="password" 
                                    value={data.password}
                                    onChange={changeHandler}
                                    placeholder="password"
                                />
                                <input 
                                    type="text"
                                    className="form-control m-2"
                                    name="desc" 
                                    value={data.desc}
                                    onChange={changeHandler}
                                    placeholder="desc"
                                />
                                <select 
                                    name="subject" 
                                    value={data.subject}
                                    onChange={changeHandler} 
                                    className="form-select m-2"
                                >
                                    {
                                        subjects.map((item, index)=>{
                                            return(
                                                <option value={item._id} key={index}>{item.title}</option>
                                            )
                                        })
                                    }
                                    
                                </select>
                                <button className="btn btn-primary">SEND</button>
                            </form>
                        </div>
                    </div>
                </div>
                    {teacher.map((item, index)=>{
                        return(
                            <div className="card col-md-3 m-2" key={index}>
                                <h3>{item.fullname}</h3>
                                <p>{item.phone}</p>
                                <p>{item.address}</p>
                                <p>{item.age}</p>
                                <p>{item.password}</p>
                                <p>{item.desc}</p>
                                <p>{item.subject.title}</p>
                                <button className='btn btn-success mx-5' onClick={()=>editSubject(item)}>edit</button>
                                    <button className='btn btn-danger' onClick={()=>Delete(item._id)}>Delete</button>
                            </div>
                        )
                    })}
            </div>
        </>
    )
}

export default Teacher