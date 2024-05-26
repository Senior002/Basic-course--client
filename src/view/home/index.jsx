import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../../component/navbar/Navbar'
import "./index.css"
import URL from '../../config'
function Home (){
    const [refreshKey, setRefreshKey] = useState(0);
    const [status , setStatus] = useState(0)
    const [ modal, setModal ] = useState( 'd-none' )
    const [ data, setData ] = useState({
        title: "",
        desc: "",
        _id: ""
    })

    const [ subjects, setSubjects ] = useState( [] )

    const submit = async ( e ) =>    {
        e.preventDefault()
        if(status == 0 ){
            delete data?._id
            await axios.post( `${URL}/subject`, data, {
                headers: {
                    authorization: `Bearer ${ localStorage.getItem( "token" ) }`
                }
                })
                .then( ( res ) => {
                    setRefreshKey(oldKey => oldKey +1)
                    setData({title: "", desc: "", _id:""})
                } )
                .catch( ( err ) =>{
                    if ( err?.response?.status == 403 ){
                        alert( err )
                    }
                } )
        }else {
            await axios.put( `${URL}/subject/${data?._id}`, data, {
                headers: {
                    authorization: `Bearer ${ localStorage.getItem( "token" ) }`
                }
            } )
                .then( ( res ) => {
                    setRefreshKey(oldKey => oldKey +1)
                    setStatus(0)
                    setData({title: "", desc: "", _id:""})
                } )
                .catch( ( err ) =>{
                    if ( err?.response?.status == 403 )
                    {
                        alert( err )
                    }
                } )
        }
    }
    const changeHandler = ( e ) =>    {
        setData( { ...data, [ e.target.name ]: e.target.value } )
    }

    const modalFunction = () =>    {
        if ( modal == "d-none" ){
            setModal( "login_content text-center" )
        } else {
            setModal( "d-none" )
        }
    }
    const Delete = (id) => {
        axios.delete( `${URL}/subject/${id}`, {
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

    useEffect( () => {
        const foo = async () =>  {
            await axios.get( `${URL}/subject`, {
                headers: {
                    authorization: `Bearer ${ localStorage.getItem( "token" ) }`
                }
            } )
                .then( ( res ) =>
                {
                    setSubjects( res.data )
                } )
                .catch( ( err ) =>
                {
                    if ( err?.response?.status == 403 )
                    {
                        alert( err )
                    }
                } )
        }
        foo()
    }, [refreshKey] )

   

    const editSubject = (item) => {
        setData({
            title : item.title,
            desc: item.desc,
            _id: item._id
        })
        setStatus(1)
        modalFunction()
    }

    return (
        <>
            <Navbar />
            <div className="row justify-content-end">
                <div className="col-md-4">
                <button className='btn btn-primary' onClick={ modalFunction }>
                +AddSubject
            </button>
                </div>
            </div>
            <div className={ modal }>
                <button className='btn btn-dark' onClick={ modalFunction }>x</button>
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-md-4">
                        <h1>Subject</h1>
                        <form className="text-center" onSubmit={submit}>
                            <input
                                type="text"
                                className="form-control my-3"
                                placeholder="title"
                                name="title"
                                value={ data.title }
                                onChange={ changeHandler }
                            />
                            <input
                                type="desc"
                                className="form-control my-3"
                                placeholder="desc"
                                name="desc"
                                value={ data.desc }
                                onChange={ changeHandler }
                            />
                            <button className="btn btn-primary" onClick={ modalFunction }>AddSubject</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="row">
                {
                    subjects.map( ( item, index ) => {
                        return(
                            <div className="col-md-2" key={index}>
                            <div className="card text-center">
                                <h1>{item.title}</h1>
                                <p>{item.desc}</p>
                                <div className='d-flex text-center'>
                                    <button className='btn btn-success mx-5' onClick={()=>editSubject(item)}>edit</button>
                                    <button className='btn btn-danger' onClick={()=>Delete(item._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                        )

                    } )
                }
            </div>
        </>
    )
}

export default Home