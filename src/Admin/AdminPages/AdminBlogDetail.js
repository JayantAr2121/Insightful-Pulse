import React, { Suspense, useContext, useEffect, useState } from 'react'
import AdminHeader from '../AdminComp/AdminHeader'
import AdminFooter from '../AdminComp/AdminFooter'
import AdminBlogDetailComp from '../AdminComp/AdminBlogDetailComp'
import { useNavigate } from 'react-router-dom'
import AdminContext from '../Context/AdminContext'

const AdminBlogDetail = () => {
  const navigate=useNavigate()
  const[data,setdata]=useState(null)
  const[Current,setCurrent]=useState(null)
  const {fetchdata,loader}=useContext(AdminContext)
  const [category, setcategory] = useState([])

  useEffect(()=>{
    if(fetchdata){
    const currentblog=JSON.parse(localStorage.getItem("CurrentBlog"))
    if(!currentblog) return navigate("/Blogs")
    if(!fetchdata[currentblog]) return navigate("/Blogs")
     const result=Object.keys(fetchdata).filter((key)=>key===currentblog)
     if(result.length===0) return navigate("/Blogs")
      setdata(fetchdata[currentblog]);
     setCurrent(currentblog)
    }
  },[fetchdata])

    useEffect(() => {
      if (fetchdata) {
        let response = Object.keys(fetchdata).map((key) => fetchdata[key].Category)
        let result = new Set(response)
        const array = [...result]
  
        const resultarray = Object.keys(fetchdata)
        let finalarray = []
        for (let i = 0; i < array.length; i++) {
          let newcate = array[i]
          let count = 0
          for (let j = 0; j < resultarray.length; j++) {
            if (fetchdata[resultarray[j]].Category == newcate) {
              count++
            }
            const objects = {
              Category: newcate,
              Times: count
            }
  
            finalarray.push(objects)
          }
        }
        setcategory(finalarray);
      }
  
  
    }, [fetchdata])
    
  return (
    <div>
        <AdminHeader/>
        <Suspense fallback={<div className='preloaders'><div className="loaders"></div></div>} >
        <AdminBlogDetailComp allData={fetchdata} current={Current} category={category} BlogData={data} />
        </Suspense>
          <AdminFooter/>
    </div>
  )
}

export default AdminBlogDetail
