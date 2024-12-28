import React, { Suspense, useContext, useEffect, useState } from 'react'
import AdminHeader from '../AdminComp/AdminHeader'
import AdminFooter from '../AdminComp/AdminFooter'
import AdminBlogDetailComp from '../AdminComp/AdminBlogDetailComp'
import { useNavigate } from 'react-router-dom'
import AdminContext from '../Context/AdminContext'

const AdminBlogDetail = () => {
  const navigate=useNavigate()
  const[data,setdata]=useState(null)
  const[Current,setCurrent]=useState(JSON.parse(localStorage.getItem("CurrentBlog")))
  const[NextBlog,setNextBlog]=useState(null)
  const[PreviousBlog,setPreviousBlog]=useState(null)
  const {fetchdata,loader}=useContext(AdminContext)
  const [category, setcategory] = useState([])

  useEffect(()=>{
    if(fetchdata){
    
    if(!Current) return navigate("/Blogs")
    if(!fetchdata[Current]) return navigate("/Blogs")
    const result=Object.keys(fetchdata).filter((key)=>key===Current)
    if(result.length===0) return navigate("/Blogs")
      setdata(fetchdata[Current]);
    const arr=Object.keys(fetchdata)

    

    let currentIndex=null
    for( let i=0;i<arr.length;i++){
        if(arr[i]===Current){
          currentIndex=i
          break;
        }
    }
    
    const Next=currentIndex+1
    const Previous=currentIndex-1
    if(Next<arr.length) setNextBlog(arr[Next])
      else setNextBlog(null)
      if(Previous>-1) setPreviousBlog(arr[Previous]) 
      else setPreviousBlog(null) 
    }
  },[fetchdata,Current])
    useEffect(() => {
      if (fetchdata) {
        let res = Object.keys(fetchdata).map((key) => fetchdata[key].Category)
        // console.log("res",res)
        let result = new Set(res)
        const array = [...result]
        
        const resultarray = Object.keys(fetchdata)
        let finalarray = []
        for (let i = 0; i < array.length; i++) {
          let newcate = array[i]
          let count = 0
          for (let j = 0; j < res.length; j++) {
            if (res[j] == newcate) {
              count++
            } 
          }
          const objects = {
            Category: newcate,
            Times: count
          }
  
          finalarray.push(objects)
        }
        setcategory(finalarray);
      }
  
  
    }, [fetchdata])
    
  return (
    <div>
        <AdminHeader/>
        <Suspense fallback={<div className='preloaders'><div className="loaders"></div></div>} >
        <AdminBlogDetailComp fun={setCurrent} next={NextBlog} previous={PreviousBlog}  allData={fetchdata} current={Current} category={category} BlogData={data} />
        </Suspense>
          <AdminFooter/>
    </div>
  )
}

export default AdminBlogDetail
