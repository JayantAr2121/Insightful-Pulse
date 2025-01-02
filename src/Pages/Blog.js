import React, { Suspense, useContext } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import ScrollToTop from '../Components/ScrollToTop'
import UserContext from './Context/UserContext'
const BlogComp = React.lazy(()=>import('../Components/BlogComponents/BlogComp'))

const Blog = () => {
  const{fetchalldata,loading}=useContext(UserContext)
  return (
    <div>
        <Header Blog={true} />
        { loading && <div className='preloaders'><div className="loaders"></div></div> }
        <Suspense fallback={<div className='preloaders'><div className="loaders"></div></div>}>
      
        <BlogComp data={fetchalldata} />
      </Suspense>
        <Footer/>
        <ScrollToTop/>
    </div>
  )
}

export default Blog