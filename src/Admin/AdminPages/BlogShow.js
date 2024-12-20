import React, { Suspense, useContext, useEffect, useState } from 'react'
import AdminHeader from '../AdminComp/AdminHeader'
import AdminFooter from '../AdminComp/AdminFooter'
import Context from '../Context/AdminContext'
const BlogComponent=React.lazy(()=>import('../AdminComp/BlogComponent'))
const BlogShow = () => {
  let { fetchdata, loader } = useContext(Context)
  const [category, setcategory] = useState([])
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
  console.log(category)
  return (
    <div>
      <AdminHeader Blog={"active"}  />
      <Suspense fallback={<div className="preloaders"><div className='loaders'></div></div>}>
      <BlogComponent category={category} data={fetchdata} load={loader} />
      </Suspense>
      <AdminFooter />
    </div>
  )
}

export default BlogShow
