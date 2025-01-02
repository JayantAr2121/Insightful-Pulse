import React from 'react'
import Header from '../Components/Header'
import Privacycomp from '../Components/PrivacyComp/Privacycomp'
import Footer from '../Components/Footer'

const Privacy = () => {
  return (
    <div>
        <Header page={true} />
        <Privacycomp/>
        <Footer/>
    </div>
  )
}

export default Privacy