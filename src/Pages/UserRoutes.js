import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Fire from '../Fire'
import UserContext from './Context/UserContext'
import { useState } from 'react'
const UserRoutes = () => {
    const [state,setstate]=useState([])
    const[alldata,setalldata]=useState([])
    const [Images,setImages]=useState([])
    const[loading,setloading]=useState(false)
const[users,setusers]=useState({})
    useEffect(()=>{
      setloading(true)
        Fire.child("Blogs").on("value",function(snap){
            if(snap.val())
            {
                let array=[]
                Object.keys(snap.val()).map(function(user){
                    Object.keys(snap.val()[user]).map(function(key){
                      if(snap.val()[user][key].Status==="Active"){
                        const object=snap.val()[user][key]
                        object.BlogKey=key
                        object.User=user
                        array.push(object)
                      }
                    })
                })
                setalldata(array)
                array.sort((a,b)=>b.Date-a.Date)
                const newarray=array.slice(0,12)
                setstate(newarray)
                let resultingarray=[]
                newarray.map((obj)=>{
                  if(obj.Images){
                    resultingarray=[...resultingarray,...obj.Images]
                  }
                })
                const myarray= resultingarray.slice(0,15)
                setImages(myarray);
            }
            else{
                setstate([])
                setImages([])
                setalldata([])
            }
        })
        Fire.child("Users").on("value",function(snap){
          if(snap.val()) return setusers(snap.val())
          else return setusers({})
        })
        setTimeout(()=>setloading(false),2000)
    },[])
  return (
    <div>
        <UserContext.Provider value={{"fetchalldata":state,"fetchImages":Images,"users":users,"loading":loading,"alldata":alldata}} >
        <Outlet  />
        </UserContext.Provider>
    </div>
  )
}

export default UserRoutes