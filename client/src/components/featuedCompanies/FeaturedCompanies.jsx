import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { request } from '../../util/fetchAPI'
import img from '../../assets/forkspoon.jpeg'
import person from '../../assets/person2.jpeg'
import { Link } from 'react-router-dom'
import classes from "./featuredCompanies.module.css"
import { FaHamburger, FaClock } from 'react-icons/fa'

const FeaturedCompanies = () => {
  const [featuredCompanies, setFeaturedCompanies] = useState([])
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await request('/company/find/featured', 'GET')
        setFeaturedCompanies(data)
      } catch (error) {
        console.error(error.message)
      }
    }
    fetchFeatured()
  }, [])
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.title}>
          <h5>Restaurants you may like</h5>
          <h2>Our featured Restaurants</h2>
        </div>
        <div className={classes.featuredCompanies}>
          {featuredCompanies?.map((company) => (
            <div key={company._id} className={classes.featuredCompany}>
              <Link to={`/companyDetail/${company._id}`} className={classes.imgContainer}>
                <img src={img} alt="" />
              </Link>
              <div className={classes.details}>
                <div className={classes.priceAndOwner}>
                  <span className={classes.price}>$ </span>
                  <img src={person} className={classes.owner} />
                </div>
                <div className={classes.moreDetails}>
                  
                  <span>{company?.rating} Location <FaHamburger className={classes.icon} /></span>
                  <span>{company?.review} <FaClock className={classes.icon} /></span>
                </div>
                <div className={classes.desc}>
                  {company?.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeaturedCompanies
