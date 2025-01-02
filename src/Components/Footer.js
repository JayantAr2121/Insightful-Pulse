import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
        <div className="container-fluid">
                    <div className="footer-wrap">
                        <div className="row align-items-center">
                            <div className="col-lg-4">
                                <p className="copyright-text">© <span>Insightful Pulse</span></p>
                            </div>
                            <div className="col-lg-4 text-center" />
                            <div className="col-lg-4">
                                <div className="footer-right">
                                  <Link to={'/Login'} > <button className="subscribe-btn" data-bs-toggle="modal" data-bs-target="#newsletter-popup">Sign
                                        in<i className="flaticon-right-arrow" /></button></Link>
                                    <p>Get all the latest posts delivered straight to your inbox.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    </div>
  )
}

export default Footer