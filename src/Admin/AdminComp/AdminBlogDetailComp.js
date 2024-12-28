import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AdminBlogDetailComp = (props) => {
    const navigate =useNavigate()
    // console.log(props?.BlogData)
    console.log(props.fun,"previous",props.previous,"next",props.next)
    function getDate(date) {
        if (!date) return '----'
        const d = new Date(date)
        const monthName = d.toLocaleString('default', { month: 'long' });
        return (`${d.getDate()} ${monthName}, ${d.getFullYear()}`)
    }
    function getTime(date) {
        if (!date) return '----'
        const d = new Date(date)
        return (`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`)
    }
    function openblog(key){
        localStorage.setItem("CurrentBlog",JSON.stringify(key))
        navigate("/AdminBlogDetail",{replace:true})
        props.fun(key)
    }

    return (
        <div className="news-details-wrap ptb-100">
            <div className="container">
                <div className="row gx-55 gx-5">
                    <div className="col-lg-8">
                        <article>
                            <div className="news-img">
                                <img src={props?.BlogData?.HeadingImage?.url} alt="Image" />
                                <a className="news-cat">{props?.BlogData?.Category}</a>
                            </div>
                            <ul className="news-metainfo list-style">
                                <li><i className="fi fi-rr-user" /><a>{props?.BlogData?.Author}</a></li>
                                <li><i className="fi fi-rr-calendar-minus" /><a href="">{getDate(props?.BlogData?.Date)}</a></li>
                                <li><i className="fi fi-rr-clock-three" />{getTime(props?.BlogData?.Date)}</li>
                            </ul>
                            <div className="news-para">
                                <h1>{props?.BlogData?.Heading} </h1>
                                <p>{props?.BlogData?.Description}</p>
                            </div>
                            <div className="row">
                                {
                                    props?.BlogData?.Images?.map((obj, index) => {
                                        return (
                                            <div key={index} className="col-md-6">
                                                <div className="news-img">
                                                    <img src={obj.urls} alt="Image" />
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                            <div className="news-para">

                                {
                                    props?.BlogData?.SubHeadingsData?.map((obj, index) => {
                                        return (
                                            <div key={index} >
                                                <h5>{obj.Sub_Heading}</h5>
                                                <p>{obj.Sub_Heading_Description}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </article>
                        <div className="post-pagination">
                        {props?.previous?<a  onClick={()=>openblog(props?.previous)} className="prev-post" >
                                <span>PREVIOUS</span>
                                <h6>{props?.allData[props?.previous]?.Title}</h6>
                            </a>:<a></a>}
                            {props?.next?<a onClick={()=>openblog(props.next)} className="next-post" >
                                <span>NEXT</span>
                                <h6>{props?.allData[props?.next]?.Title}</h6>
                            </a>:<a></a>}
                        </div>
                        <h3 className="comment-box-title">3 Comments</h3>
                        <div className="comment-item-wrap">
                            <div className="comment-item">
                                <div className="comment-author-img">
                                    <img src="assets/img/author/author-thumb-1.webp" alt="Image" />
                                </div>
                                <div className="comment-author-wrap">
                                    <div className="comment-author-info">
                                        <div className="row align-items-start">
                                            <div className="col-md-9 col-sm-12 col-12 order-md-1 order-sm-1 order-1">
                                                <div className="comment-author-name">
                                                    <h5>Killian Mider</h5>
                                                    <span className="comment-date">Jul 22, 2024 | 7:10 PM</span>
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-sm-12 col-12 text-md-end order-md-2 order-sm-3 order-3">
                                                <a href="#cmt-form" className="reply-btn">Reply</a>
                                            </div>
                                            <div className="col-md-12 col-sm-12 col-12 order-md-3 order-sm-2 order-2">
                                                <div className="comment-text">
                                                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                                                        sed diam nonumy eirmod tempor invidunt ut labore et dolore
                                                        magna aliquyam.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="comment-item reply">
                                <div className="comment-author-img">
                                    <img src="assets/img/author/author-thumb-2.webp" alt="Image" />
                                </div>
                                <div className="comment-author-wrap">
                                    <div className="comment-author-info">
                                        <div className="row align-items-start">
                                            <div className="col-md-9 col-sm-12 col-12 order-md-1 order-sm-1 order-1">
                                                <div className="comment-author-name">
                                                    <h5>Everly Leah </h5>
                                                    <span className="comment-date">Jul 23, 2024 | 7:10 PM</span>
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-sm-12 col-12 text-md-end order-md-2 order-sm-3 order-3">
                                                <a href="#cmt-form" className="reply-btn">Reply</a>
                                            </div>
                                            <div className="col-md-12 col-sm-12 col-12 order-md-3 order-sm-2 order-2">
                                                <div className="comment-text">
                                                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                                                        sed diam nonumy eirmod tempor invidunt ut labore et dolore
                                                        magna aliquyam erat.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="comment-item">
                                <div className="comment-author-img">
                                    <img src="assets/img/author/author-thumb-3.webp" alt="Image" />
                                </div>
                                <div className="comment-author-wrap">
                                    <div className="comment-author-info">
                                        <div className="row align-items-start">
                                            <div className="col-md-9 col-sm-12 col-12 order-md-1 order-sm-1 order-1">
                                                <div className="comment-author-name">
                                                    <h5>Michel Ohio</h5>
                                                    <span className="comment-date">Jun 14, 2024 | 7:10 PM</span>
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-sm-12 col-12 text-md-end order-md-2 order-sm-3 order-3">
                                                <a href="#cmt-form" className="reply-btn">Reply</a>
                                            </div>
                                            <div className="col-md-12 col-sm-12 col-12 order-md-3 order-sm-2 order-2">
                                                <div className="comment-text">
                                                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                                                        sed diam nonumy eirmod tempor invidunt ut labore et dolore
                                                        magna aliquyam.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="cmt-form">
                            <div className="mb-30">
                                <h3 className="comment-box-title">Leave A Comment</h3>
                                <p>Your email address will not be published. Required fields are marked.</p>
                            </div>
                            <form action="#" className="comment-form">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" name="name" id="name" required placeholder="Name*" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="email" name="email" id="email" required placeholder="Email Address*" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <textarea name="messages" id="messages" cols={30} rows={10} placeholder="Please Enter Your Comment Here" defaultValue={""} />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-check checkbox">
                                            <input className="form-check-input" type="checkbox" id="test_2" />
                                            <label className="form-check-label" htmlFor="test_2">
                                                Save my info for the next time I commnet.
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-3">
                                        <button className="btn-two">Post A Comment<i className="flaticon-right-arrow" /></button>
                                    </div>
                                </div>
                            </form>
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
                                        props?.category.map((obj, index) => <li key={index} ><a ><img src="assets/img/icons/arrow-right.svg" alt="Image" />{obj.Category}<span>({obj.Times})</span></a></li>)
                                    }
                                </ul>
                            </div>
                            <div className="sidebar-widget">
                                <h3 className="sidebar-widget-title">Recent Posts</h3>
                                <div className="pp-post-wrap">
                                    {
                                        (props?.allData && props?.current) ? Object.keys(props.allData).reverse().map((key, index) => {
                                            if (key !== props.current && index<10 ) {
                                                return (
                                                    <div key={index} className="news-card-one">
                                                        <div className="news-card-img">
                                                            <img style={{height:"70px",width:"70px"}} src={props?.allData[key]?.HeadingImage?.url} alt="Image" />
                                                        </div>
                                                        <div className="news-card-info">
                                                            <h3><a href="business-details.html">{props?.allData[key]?.Title}</a>
                                                            </h3>
                                                            <ul className="news-metainfo list-style">
                                                                <li><i className="fi fi-rr-calendar-minus" /><a href="news-by-date.html">{getDate(props?.allData[key].Date)}</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        }) : ""

                                    }
                                </div>
                            </div>
                            <div className="sidebar-widget">
                                <h3 className="sidebar-widget-title">Popular Tags</h3>
                                <ul className="tag-list list-style">
                                    {
                                        props?.BlogData?.Tags.split(",")?.map((value, index) => <li key={index} ><Link >{value}</Link></li>)
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

export default AdminBlogDetailComp
