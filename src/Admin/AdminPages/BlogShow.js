import React, { useContext } from 'react'
import AdminHeader from '../AdminComp/AdminHeader'
import AdminFooter from '../AdminComp/AdminFooter'
import BlogComponent from '../AdminComp/BlogComponent'
import Context from '../Context/AdminContext'

const BlogShow = () => {
let {fetchdata}=useContext(Context)
  console.log(fetchdata)
return (
    <div>
      <AdminHeader/>
      <BlogComponent/>
      <AdminFooter/>
    </div>
  )
}

export default BlogShow
