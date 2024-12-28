import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Fire from '../Fire'
import UserContext from './Context/UserContext'
import { useState } from 'react'
const UserRoutes = () => {
    const [state,setstate]=useState([])
    const [Images,setImages]=useState([])
    useEffect(()=>{

        Fire.child("Blogs").on("value",function(snap){
            if(snap.val())
            {
                let array=[]
                Object.keys(snap.val()).map(function(user){
                    Object.keys(snap.val()[user]).map(function(key){
                        const object=snap.val()[user][key]
                        object.User=user
                        array.push(object)
                    })
                })
                setstate(array)
                array.sort((a,b)=>b.Date-a.Date)
                const newarray=array.slice(0,10)
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
            }
        })
    },[])
  return (
    <div>
        <UserContext.Provider value={{"fetchalldata":state,"fetchImages":Images}} >
        <Outlet  />
        </UserContext.Provider>
    </div>
  )
}

export default UserRoutes