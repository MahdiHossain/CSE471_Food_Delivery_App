import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import classes from './hero.module.css'

const Hero = () => {
  const [type, setType] = useState("burger")
  const [priceRange, setPriceRange] = useState("0")
  const navigate = useNavigate()

  // TODO here or somewhere home(fetching properties)

  const handleSearch = () => {
    // navigating to properties
    navigate(`/companies?type=${type}`)
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Craving for delicious food?</h2>
        <h5>Search the best selection of restaurants</h5>
        <div className={classes.options}>
          <select onChange={(e) => setType(e.target.value)}>
            <option disabled>Select Area</option>
            <option value='burger'>Burger</option>
            <option value='pizza'>Pizza</option>
            <option value='gyro'>Gyro</option>
          </select>

          <AiOutlineSearch className={classes.searchIcon} onClick={handleSearch} />
        </div>
      </div>
    </div>
  )
}

export default Hero