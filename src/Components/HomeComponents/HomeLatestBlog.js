import React, { useContext, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'
import { Navigation,Autoplay } from 'swiper/modules';
import UserContext from '../../Pages/Context/UserContext';

const HomeLatestBlog = (props) => {
const{fetchalldata} = useContext(UserContext)
  const [category, setcategory] = useState([])

    console.log("latestBlog",props.data)
    function getDate(date) {
        if (!date) return '----'
        const d = new Date(date)
        const monthName = d.toLocaleString('default', { month: 'long' });
        return (`${d.getDate()} ${monthName}, ${d.getFullYear()}`)
    }
    useEffect(() => {
          if (fetchalldata) {
            let res = Object.keys(fetchalldata).map((key) => fetchalldata[key].Category)
            // console.log("res",res)
            let result = new Set(res)
            const array = [...result]
            
            const resultarray = Object.keys(fetchalldata)
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
      
      
        }, [fetchalldata])
        console.log("category",category)
    return (
    <div>
                <div className="latest-news pb-100">
                    <div className="container-fluid">
                        <div className="content-wrapper">
                            <div className="left-content">
                                <div className="row align-items-end mb-40">
                                    <div className="col-md-7">
                                        <h2 className="section-title">Latest Blogs<img className="section-title-img" src="assets/img/section-img.webp" alt="Image" /></h2>
                                    </div>
                                    <div className="col-md-5 text-md-end">
                                        <a href="business.html" className="link-one">View All News<i className="flaticon-right-arrow" /></a>
                                    </div>
                                </div>
                                <div className="row gx-5">
                                    <div className="col-xl-7">
                                        
                                        <div className="scrollscreen">
                                            {
                                                props?.data?.map((obj,index)=>{
                                                    return(
                                                        <div key={index} className="news-card-five">
                                                        <div className="news-card-img">
                                                            <img src={obj.HeadingImage?.url?obj.HeadingImage?.url:"assets/img/news/news-9.webp"} alt="Image" />
                                                            <a className="news-cat">{obj?.Category}</a>
                                                        </div>
                                                        <div className="news-card-info">
                                                            <h3><a>{obj?.Heading}</a></h3>
                                                            <p>{ obj.Description}</p>
                                                            <ul className="news-metainfo list-style">
                                                                <li><i className="fi fi-rr-calendar-minus" /><a>{getDate(obj?.Date)}</a></li>
                                                                <li><i className="fi fi-rr-user" />{obj.Author}</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="col-xl-5">
                                      
                                      {
                                            props?.data?.reverse().map((obj,index)=>{
                                                if(index<=1)
                                                return(
                                        <div className="news-card-two">
                                            <div className="news-card-img">
                                                <img src={obj.HeadingImage?.url?obj.HeadingImage?.url:"assets/img/news/news-17.webp"} alt="Image" />
                                                <a  className="news-cat">{obj.Category}</a>
                                            </div>
                                            <div className="news-card-info">
                                                <h3><a href="business-details.html">{obj.Title}</a></h3>
                                                <ul className="news-metainfo list-style">
                                                    <li><i className="fi fi-rr-calendar-minus" /><a >{getDate(obj?.Date)}</a></li>
                                                    <li><i className="fi fi-rr-user" />{obj.Author}</li>
                                                </ul>
                                            </div>
                                        </div>)
                                        
                                    })
                                        }   
                                    </div>
                                </div>
                            </div>
                            <div className="sidebar">
                                <div className="sidebar-widget">
                                    <h3 className="sidebar-widget-title">Explore Topics</h3>
                                    <ul className="category-widget list-style">
                 {
                    category && category?.map((obj,index)=>{
                        return(
                        <li><a ><i className="flaticon-right-arrow" />{obj.Category}<span>({obj.Times})</span></a></li>
                    )})
                                        
                }
                                    </ul>
                                </div>
                                <div className="sidebar-widget">
                                    <h3 className="sidebar-widget-title">Celebration</h3>
                                    <div className="featured-widget">
                                    <Swiper
      modules={[Navigation,Autoplay]}
      navigation={{
        nextEl: '.featured-next',
        prevEl: '.featured-prev',
      }}
      loop={true}
      autoplay={{
        delay: 1500,
        disableOnInteraction: false,
    }}
      spaceBetween={20}
      slidesPerView={1}
    >
 {
        props?.data.reverse().map((obj,index)=>{
                return(
                    <SwiperSlide>
        <div key={index} className="news-card-one">
          <div className="news-card-img">
            <img style={{height:"100px"}} src={obj?.HeadingImage?.url?obj?.HeadingImage?.url:"assets/img/news/news-thumb-1.webp"} alt="How Youth Viral Diseases May The Year 2023" />
          </div>
          <div className="news-card-info">
            <h3><a >{obj.Title}</a></h3>
            <ul className="news-metainfo list-style">
              <li><i className="fi fi-rr-calendar-minus" /><a>{getDate(obj.Date)}</a></li>
            </ul>
          </div>
        </div>
      </SwiperSlide>
                )
        })
      
}

      {/* Swiper navigation buttons */}
      <div className="featured-prev"><i className="flaticon-left-arrow" /></div>
      <div className="featured-next"><i className="flaticon-right-arrow" /></div>
    </Swiper>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    </div>
  )
}

export default HomeLatestBlog