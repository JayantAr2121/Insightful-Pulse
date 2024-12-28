import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Fire, {storage} from '../../Fire'
const BlogComponent = (props) => {
  const navigate = useNavigate()
  const[btndisable,setbtndisable]=useState(false)
  const[loader,setloader]=useState(false) 
  function getDate(date) {
    if (!date) return '----'
    const d = new Date(date)
    const monthName = d.toLocaleString('default', { month: 'long' });
    return (`${d.getDate()} ${monthName}, ${d.getFullYear()}`)
  }

  function openBlog(key) {
    console.log(key)
    localStorage.setItem("CurrentBlog", JSON.stringify(key))
    navigate("/AdminBlogDetail")
  }
async  function Delete(key){
    try{
      setbtndisable(true)
      setloader(true)
      const User=JSON.parse(localStorage.getItem("Users"))
      if(!User) return alert("Unauthorized User")
      if(props?.data[key]?.Images){
          for(let i=0;i<props?.data[key]?.Images.length;i++){
            await storage.child(props.data[key].Images[i].paths).delete()        
          }      
        }
      await storage.child(props?.data[key]?.HeadingImage.path).delete()
      Fire.child(`Blogs/${User}/${key}`).remove(err=>{
        if(err) return alert("Something went wrong. Try again later")
        else return alert("Deleted Successfully")
      })
    }
    catch(error)
    {
      return alert("Something went wrong. Try again later")
    }finally{
      setbtndisable(false)
      setloader(false)
    }
  }
  return (
    <div className="sports-wrap ptb-100">
      {
      loader && <div className="preloaders">
        <div className="loaders"></div>
      </div>
    }
      <div className="container">
        <div className="row gx-55 gx-5">
          <div className="col-lg-8">
            <div className="row justify-content-center">
              {
                props?.data && Object.keys(props?.data)?.map((key, index) => {
                  console.log(props?.data[key]?.HeadingImage)
                  return (
                    <div key={index} className="col-xl-6 col-lg-6 col-md-6">
                      <div className="news-card-thirteen">
                        <div className="news-card-img">
                          <img onClick={() => openBlog(key)} src={props?.data[key]?.HeadingImage?.url} alt="Iamge" />
                          <a className="news-cat">{props?.data[key]?.Category} </a>
                        </div>
                        <div className="news-card-info">
                          <h3><a onClick={() => openBlog(key)} >{props?.data[key]?.Title}</a></h3>
                          <ul className="news-metainfo list-style">
                            <li><i className="fi fi-rr-calendar-minus" /><a >{getDate(props?.data[key]?.Date)}</a></li>
                            <li><i className="fi fi-rr-user" />{props?.data[key]?.Author}</li>
                            <li><button disabled={btndisable} className='btn btn-danger' onClick={()=>Delete(key)}>Delete</button></li>
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
              <div className="sidebar-widget-two">
                <form action="#" className="search-box-widget">
                  <input type="search" placeholder="Search" />
                  <button type="submit">
                    <i className="fi fi-rr-search" />
                  </button>
                </form>
              </div>
              <div className="sidebar-widget">
                <h3 className="sidebar-widget-title">Categories</h3>
                <ul className="category-widget list-style">
                                
                                {
                                    props?.category.map((obj,index)=><li key={index} ><a ><img src="assets/img/icons/arrow-right.svg" alt="Image" />{obj.Category}<span>({obj.Times})</span></a></li> )
                                }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogComponent
