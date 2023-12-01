import React from 'react'
import classes from "./popularCompanies.module.css"
import { Link } from 'react-router-dom'
import img1 from '../../assets/burger1.jpg'
import img2 from '../../assets/pizza1.jpg'
import img3 from '../../assets/gyros1.jpg'
import { useState } from 'react'
import { useEffect } from 'react'
import { request } from '../../util/fetchAPI'

const PopularCompanies= () => {
  // const [burgerRestaurants, setBurgerRestaurants] = useState(0)
  // const [pizzaRestaurants, setPizzaRestaurants] = useState(0)
  // const [gyroRestaurants, setGyroRestaurants] = useState(0)
  const [numCompanies, setNumCompanies] = useState({})
  useEffect(() => {
    const fetchComapnyNumbers = async() => {
      try {
         const data = await request('/company/find/types', 'GET')
         console.log(data)
         setNumCompanies(data)
        //  setBurgerRestaurants(data.burger)
        //  setPizzaRestaurants(data.pizza)
        //  setGyroRestaurants(data.gyro)
      } catch (error) {
        console.error(error)
      }
    }
    fetchComapnyNumbers()
  }, [])

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5>Different types of Restaurants</h5>
          <h2>Best categories of foods for you!</h2>
        </div>
        <div className={classes.restaurants}>
          <Link to={`/company/find?type=burger`} className={classes.restaurant}>
            <img src={img1} />
            <div className={classes.quantity}>{numCompanies?.Burger} restaurants</div>
            <h5>Burger restaurants</h5>
          </Link>
          <Link to={`/company/find?type=pizza`} className={classes.restaurant}>
            <img src={img2} />
            <div className={classes.quantity}>{numCompanies?.Pizza} restaurants</div>
            <h5>Pizza restaurants</h5>
          </Link>
          <Link to={`/company/find?type=gyro`} className={classes.restaurant}>
            <img src={img3} />
            <div className={classes.quantity}>{numCompanies?.Gyro} restaurants</div>
            <h5>Gyro restaurants</h5>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PopularCompanies
