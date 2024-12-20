import React from 'react'
import AddBlogComp from '../AdminComp/AddBlogComp'
import AdminHeader from '../AdminComp/AdminHeader'
import AdminFooter from '../AdminComp/AdminFooter'

const AddBlog = () => {
  return ( 
    <div>
        <AdminHeader AddBlog={"active"} />
        <AddBlogComp/>
        <AdminFooter/>
    </div>
  )
}

export default AddBlog