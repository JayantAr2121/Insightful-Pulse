import React, { Suspense, useContext } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import UserContext from './Context/UserContext'
import ScrollToTop from '../Components/ScrollToTop'
const HomeLatestBlog = React.lazy(()=>import('../Components/HomeComponents/HomeLatestBlog'))
const HomeBlog = React.lazy(()=>import('../Components/HomeComponents/HomeBlog'))
const TrendingNow = React.lazy(()=>import('../Components/HomeComponents/TrendingNow'))
const HomeInstaSlider = React.lazy(()=>import('../Components/HomeComponents/HomeInstaSlider'))
const Home = () => {
    const{fetchImages,fetchalldata,loading}=useContext(UserContext)
    // console.log("APIKEY",process.env.REACT_APP_API_KEY)
// console.log("aa",process.env.REACT_APP_ANSH_API_KEY)
    return (
        <div>
            <Header Home={true} />
            { loading && <div className='preloaders'><div className="loaders"></div></div> }
            <Suspense fallback={<div className='preloaders'><div className="loaders"></div></div>}>
           
            {fetchalldata && fetchalldata.length>3 && <TrendingNow data={fetchalldata}/>}
</Suspense>
            <Suspense fallback={<div className='preloaders'><div className="loaders"></div></div>}>

            <HomeBlog data={fetchalldata} />

            </Suspense>
<Suspense fallback={<div className='preloaders'><div className="loaders"></div></div>}>

            <HomeLatestBlog data={fetchalldata} />
</Suspense>
<Suspense fallback={<div className='preloaders'><div className="loaders"></div></div>}>

            <HomeInstaSlider data={fetchImages} />

</Suspense>
            <Footer/>
            <ScrollToTop/>
            {/* <Newsletter/> */}
        </div>
    )
}
export default Home