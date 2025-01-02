import React from 'react'
import { useNavigate } from 'react-router-dom'


const Authorcomp = ({users}) => {
const navigate=useNavigate()
    return (
        <div>
            <div>
                <div className="container ptb-100">
                    <div className="row justify-content-center">
                        {
                             users && Object.keys(users)?.map((key,index)=>{

                                return(
                                    <div onClick={()=>{localStorage.setItem("Authors",JSON.stringify(key)); navigate("/AuthorDetails")}} key={index}  className="col-xxl-3 col-xl-4 col-lg-4 col-md-6">
                                    <div className="team-card">
                                        <div className="team-card-info">
                                        <h3 style={{fontSize:"15x"}}>{users[key]?.Name}</h3>
                            <span style={{fontSize:"13px"}}>{users[key]?.Email}</span>
                                        </div>
                                        <div className="team-card-img">
                                        <img loading='lazy' src={users[key]?.ProfileImage?.url?users[key]?.ProfileImage?.url:"assets/img/Bharat.png"} alt="Image" />
                                        </div>
                                    </div>
                                </div>
                                )
                             })
                      
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Authorcomp