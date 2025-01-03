import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminContext from './Context/AdminContext'
import Fire from '../Fire'
const AdminRoutes = () => {
    const[data,setdata]=useState(null)
    const[loader,setloader]=useState(false)
    const navigate=useNavigate()
    useEffect(function (){
      setloader(true)
        const user=JSON.parse(localStorage.getItem("Users"))
        if(!user){
            alert("Unauthorised user")
            window.history.replaceState(null,null,"/Login")
            return navigate("/",{replace:true})
          }
          Fire.child("Blogs").child(user).on("value",function(snap){
            if(snap.val())  setdata(snap.val())
            else setdata(null)
          })
          setloader(false)
    },[])

  return (
    <div>
        <AdminContext.Provider  value={{"fetchdata":data,"loader":loader}} >
        <Outlet/>
        </AdminContext.Provider>
    </div>
  )
}

export default AdminRoutes