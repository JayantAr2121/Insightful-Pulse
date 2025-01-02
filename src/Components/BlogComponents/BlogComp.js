import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../Pages/Context/UserContext'

const BlogComp = (props) => {
  const{fetchalldata} = useContext(UserContext)
  const [category, setcategory] = useState([])
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
  return (
  <div className="sports-wrap ptb-100">
  <div className="container">
    <div className="row gx-55 gx-5">
      <div className="col-lg-8">
        <div className="row justify-content-center">
          {
            props?.data?.map((obj,index)=>{
              if(index<=5)
              return(
                <div key={index} className="col-xl-6 col-lg-6 col-md-6">
                <div className="news-card-thirteen">
                  <div className="news-card-img">
                    <img src={obj?.HeadingImage?.url?obj?.HeadingImage?.url:"assets/img/news/politics/politics-7.webp"} alt="Iamge" />
                    <a className="news-cat">{obj?.Category}</a>
                  </div>
                  <div className="news-card-info">
                    <h3><a>{obj.Title}</a></h3>
                    <ul className="news-metainfo list-style">
                      <li><i className="fi fi-rr-calendar-minus" /><a >{getDate(obj.Date)}</a></li>
                      <li><i className="fi fi-rr-user" />{obj.Author}</li>
                    </ul>
                  </div>
                </div>
              </div>
              )
            })
          }
        </div>
      </div>
      <div className="col-lg-4">
        <div className="sidebar">
          <div className="sidebar-widget">
            <h3 className="sidebar-widget-title">Categories</h3>
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
            <h3 className="sidebar-widget-title">Recent Posts</h3>
            <div className="pp-post-wrap">
              {
                props?.data?.map((obj,index)=>{
                  if(index<=7){
                    return(
                      <div key={index} className="news-card-one">
                      <div className="news-card-img">
                        <img src={obj?.HeadingImage.url?obj?.HeadingImage?.url:"assets/img/news/news-thumb-4.webp"} alt="Image" />
                      </div>
                      <div className="news-card-info">
                        <h3><a >{obj.Title}</a>
                        </h3>
                        <ul className="news-metainfo list-style">
                          <li><i className="fi fi-rr-calendar-minus" /><a >{getDate(obj.Date)}</a></li>
                        </ul>
                      </div>
                    </div>
                        )}
                })
              
             }
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  )
}

export default BlogComp