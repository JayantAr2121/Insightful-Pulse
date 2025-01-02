import React from 'react'
import Header from '../Components/Header'
import TermsComp from '../Components/TermsAndCondition/TermsComp'
import Footer from '../Components/Footer'
import ScrollToTop from '../Components/ScrollToTop'
const TermsandCondition = () => {
  return (
    <div>
        <Header page={true} />
        <TermsComp/>
        <Footer/>
        <ScrollToTop/>
    </div>
  )
}

export default TermsandCondition