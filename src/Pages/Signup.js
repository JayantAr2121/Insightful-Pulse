import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Firebase, { auth } from "../Fire"
import Fire from '../Fire'

const Signup = () => {
  const [obj, setobj] = useState({})
  const [btndisable, setbtndisable] = useState(false)
  function nameset(e) {
    let name = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    setobj({ ...obj, [e.target.name]: name })
  }

  function set(e) {
    setobj({ ...obj, [e.target.name]: e.target.value })
  }
  function EmailCheck(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email)
  }
  async function save(e) {
    e.preventDefault()
    try {
      setbtndisable(true)
      if (!obj.Name || !obj.Email || !obj.Password || !obj.ConfPassword) return alert("Field is Empty")
      const response = EmailCheck(obj.Email)
      if (!response) return alert("Email is not valid")
      if (obj.Password !== obj.ConfPassword) return alert("Password not matched")
      const mainobj = {
        Name: obj.Name,
        Email: obj.Email
      }
      const result = await auth.createUserWithEmailAndPassword(obj.Email, obj.Password)
      setobj({})
      console.log(result.user.uid)
      Fire.child("Users").child(result.user.uid).set(mainobj, err => {
        if (err) return alert("Something Went Wrong. Try Again later.")
        else return alert("Account Created Successfully")
      })
    } catch (error) {
      console.log(error)
      return alert("Account related to this Email is already exist.")
    } finally {
      setbtndisable(false)
    }
  }
  return (
    <div className="login-wrap">
      <div className="login-bg">
        <a className="navbar-brand">
          <img className="logo-light" src="assets/img/logo-white.webp" alt="Image" />
          <img className="logo-dark" src="assets/img/logo-white.webp" alt="Image" />
        </a>
      </div>
      <div className="login-content">
        <Link to={'/'} className="link-one"><i className="ri-arrow-left-s-line" />Back</Link>
        <div className="login-form">
          <h3>Account SignUp</h3>
          <div className="alt-login">
            <a style={{ width: "100%" }} href="https://www.gmail.com/"><img src="assets/img/icons/google.svg" alt="Image" />Login With
              Google</a>
          </div>
          <div className="text-center">
            <span className="or-text">OR</span>
          </div>
          <form >
            <div className="form-group">
              <input value={obj.Name?obj.Name:""} name='Name' onChange={nameset} type="text" placeholder="Full Name" />
            </div>
            <div className="form-group">
              <input value={obj.Email?obj.Email:""} name='Email' onChange={set} type="email" placeholder="Email Address" />
            </div>
            <div className="form-group">
              <input value={obj.Password?obj.Password:""} name='Password' onChange={set} type="password" placeholder="Password" />
            </div>
            <div className="form-group">
              <input value={obj.ConfPassword?obj.ConfPassword:""} name='ConfPassword' onChange={set} type="password" placeholder="Confirm Password" />
            </div>
            <button disabled={btndisable} onClick={save} type="submit" className="btn-two w-100 d-block">Create Account</button>
            <p className="login-text">Already have an account?<Link to={'/Login'}>Login</Link></p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup