import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Fire from '../../Fire'
const AuthorDetailsComp = ({data,blogs,category}) => {
  const navigate=useNavigate()
  const[number,setnumber]=useState(0)
  function getDate(date) {
    if (!date) return '----'
    const d = new Date(date)
    const monthName = d.toLocaleString('default', { month: 'long' });
    return (`${d.getDate()} ${monthName}, ${d.getFullYear()}`)
}

useEffect(()=>{
  const token=JSON.parse(localStorage.getItem("Authors"))
  if(!token) return setnumber(0)
  Fire.child(`Comments/${token}`).on("value",function(snap){
    if(snap.val()){
      let result=0
      Object.keys(snap.val()).map(key=>{
        result=result+Object.keys(snap.val()[key]).length
      })
      setnumber(result)
    }
    else return setnumber(0)
  })
},[])
function getComments(key){
  let value=0
  const token=JSON.parse(localStorage.getItem("Authors"))
  if(!token) return value=0
  Fire.child(`Comments/${token}/${key}`).on("value",function(snap){
    if(snap.val()) return value=Object.keys(snap.val()).length
  })
  return value
}
  return (
    <div>
      <div className="author-wrap">
    <div className="container">
      <div className="author-box">
        <div className="author-img">
        <img loading='lazy' alt="Image" src={data?.ProfileImage?.url?data?.ProfileImage?.url:"assets/img/author/single-author.jpg"} />
        </div>
        <div style={{marginLeft:"100px"}} className="author-info">
        <h4>{data?.Name}</h4>
        <h5>{data?.Email}</h5>
          <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered
            alteration in some form, by injected humour, or ran domised words which don't look even slightly
            believable.</p>
          <div className="author-profile">
            <div className="author-stat">
            {blogs && <span>{Object.keys(blogs).length} Blogs</span>}
              <span>{number} Comments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
      <div className="popular-news-three ptb-100">
    <div className="container">
      <div className="row gx-5">
        <div className="col-lg-8">
          <div className="section-title-two mb-40">
            <h2>Posts</h2>
          </div>
          <div className="popular-news-wrap">
            {
               blogs && Object.keys(blogs).reverse().map((key,index)=>{
                console.log("BlogKLey",key,index)
               return(
              <div  key={index} className="news-card-five">
              <div onClick={()=>{localStorage.setItem("BlogDetails",JSON.stringify(key)); navigate("/BlogDetails")}} className="news-card-img">
              <img style={{height:"180px"}} loading='lazy' src={blogs[key]?.HeadingImage?.url?blogs[key]?.HeadingImage.url:"assets/img/news/news-70.webp"} alt="Image" />
              <a href="#" className="news-cat">{blogs[key]?.Category}</a>
              </div>
              <div className="news-card-info">
              <h3><a onClick={()=>{localStorage.setItem("BlogDetails",JSON.stringify(key)); navigate("/BlogDetails")}} href="#">{blogs[key]?.Title}</a></h3>
              <p>{blogs[key]?.Description?.slice(0,100)}</p>
                <ul className="news-metainfo list-style">
                  <li className="author">
                    <span className="author-img">
                    <img src={data?.ProfileImage?.url?data?.ProfileImage?.url:"assets/img/Bharat.png"} alt="Image" />
                    </span>
                    <a href="#">{blogs[key]?.Author}</a>
                  </li>
                  <li><i className="fi fi-rr-calendar-minus"/><a href="#">{getDate(blogs[key]?.Date)}</a></li>
                  <li><i className="fi fi-rr-clock-three"/>{getComments(key)}  Comments</li>
                </ul>
              </div>
            </div>)
               })  
        
          }
          </div>
          <ul className="page-nav list-style text-center mt-5">
            <li><a href="#"><i className="flaticon-arrow-left" /></a></li>
            <li><a className="active" href="#">01</a></li>
            <li><a href="#">02</a></li>
            <li><a href="#">03</a></li>
            <li><a href="#"><i className="flaticon-arrow-right" /></a></li>
          </ul>
        </div>
        <div className="col-lg-4">
          <div className="sidebar">
            <div className="sidebar-widget">
              <h3 className="sidebar-widget-title">Explore Topics</h3>
              <ul className="category-widget list-style">
              {
                  category && category?.map((obj,index)=><li key={index}><a><img src="assets/img/icons/arrow-right.svg" alt="Image" />{obj.Category}<span>({obj.Times})</span></a></li>)
                }
              </ul>
            </div>
            <div className="sidebar-widget-two">
              <div className="contact-widget">
                <img src="assets/img/contact-bg.svg" alt="Image" className="contact-shape" />
                <a href="" className="logo">
                  <img className="logo-light" src="assets/img/logo.webp" alt="Image" />
                  <img className="logo-dark" src="assets/img/logo-white.webp" alt="Image" />
                </a>
                <p>Mauris mattis auctor cursus. Phasellus iso tellus tellus, imperdiet ut imperdiet eu,
                  noiaculis a sem Donec vehicula luctus nunc in laoreet Aliquam</p>
                <ul className="social-profile list-style">
                  <li><a href="https://www.fb.com/" target="_blank"><i className="flaticon-facebook-1" /></a></li>
                  <li><a href="https://www.twitter.com/" target="_blank"><i className="flaticon-twitter-1" /></a></li>
                  <li><a href="https://www.instagram.com/" target="_blank"><i className="flaticon-instagram-2" /></a></li>
                  <li><a href="https://www.linkedin.com/" target="_blank"><i className="flaticon-linkedin" /></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
  )
}

export default AuthorDetailsComp