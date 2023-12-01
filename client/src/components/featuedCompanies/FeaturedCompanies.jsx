import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { request } from '../../util/fetchAPI'
import img from '../../assets/womaneating.jpg'
import person from '../../assets/burger1.jpg'
import { Link } from 'react-router-dom'
import classes from "./featuredCompanies.module.css"
import { FaBed, FaSquareFull } from 'react-icons/fa'

const FeaturedCompanies = () => {
  const [featuredCompanies, setFeaturedCompanies] = useState([])
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await request('/company/find/featured', 'GET')
        console.log(data)
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
                  <span>{company?.beds} beds <FaBed className={classes.icon} /></span>
                  <span>{company?.sqfeet} square foots <FaSquareFull className={classes.icon} /></span>
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
