import Footer from './components/footer/Footer';
import Hero from './components/hero/Hero';
import Navbar from './components/navbar/Navbar';
import Newsletter from './components/newsletter/Newsletter';
import PopularCompanies from './components/popularCompanies/PopularCompanies';
import Signin from './components/signin/Signin';
import Signup from './components/signup/Signup';
import Companies from './components/companies/Companies';
// import { useSelector } from 'react-redux'
import CompanyDetail from './components/companyDetail/CompanyDetail';
import { useSelector } from 'react-redux'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import UpdateProfile from './components/updateProfile/UpdateProfile';
import MyProfile from './components/myProfile/MyProfile';
import EditCompany from './components/editCompany/EditCompany';

import './App.css';
import FeaturedCompanies from './components/featuedCompanies/FeaturedCompanies';
;

function App() {
  const { user } = useSelector((state) => state.auth)
  const url = useLocation().pathname

  useEffect(() => {
    url && window.scrollTo(0, 0)
  }, [url])

  return (
    <div>
      <Routes>
        <Route path='/' element={
          <>
            <Navbar />
            <Hero />
            <FeaturedCompanies />
            <PopularCompanies />
            <Newsletter />
            <Footer />
          </>
        } />

        <Route path='/companies' element={
          <>
            <Navbar />
            <Companies />
            <Footer />
          </>
        } />
        <Route path='/companyDetail/:id' element={
          <>
            <Navbar />
            <CompanyDetail />
            <Footer />

          </>
        } />
        <Route path='/editcompany/:id' element={
          user ?
            <>
              <Navbar />
              <EditCompany />
              <Footer />
            </>
            : <Navigate to='/signin' />
        } />
        <Route path='/my-profile' element={
          user ?
            <>
              <Navbar />
              <MyProfile />
              <Footer />
            </>
            : <Navigate to='/signin' />
        } />
        <Route path='/update-profile' element={
          user ?
            <>
              <Navbar />
              <UpdateProfile />
              <Footer />
            </>
            : <Navigate to='/signin' />
        } />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>


    </div>
  );
}

export default App;
