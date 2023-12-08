import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { useState } from 'react'
import { arrPriceRanges } from '../../util/idxToPriceRange'
import classes from './companies.module.css'
import { useEffect } from 'react'
import { request } from '../../util/fetchAPI'
import CompanyCard from '../companyCard/CompanyCard'

const Companies = () => {
  const [allCompanies, setAllCompanies] = useState([])
  const [filteredCompanies, setFilteredCompanies] = useState([])
  const [state, setState] = useState(null)
  const query = (useLocation().search).slice(1) // slice(1) to remove "?"
  const arrQuery = query.split("&")
  const navigate = useNavigate()

  // fetch all properties
  useEffect(() => {
    const fetchAllCompanies = async () => {
      const data = await request(`/company/getAll`, 'GET')
      setAllCompanies(data)
    }
    fetchAllCompanies()
  }, [])

  // parsing query params
  useEffect(() => {
    if (arrQuery && allCompanies?.length > 0 && state === null) {
      let formattedQuery = {}
      arrQuery.forEach((option, idx) => {
        console.log(option)
        const key = option.split("=")[0]
        const value = option.split("=")[1]
        formattedQuery = { ...formattedQuery, [key]: value }
        if (idx === arrQuery.length - 1) {
          console.log(formattedQuery)
          setState(formattedQuery)
          handleSearch(formattedQuery)
        }
      })
    }
  }, [allCompanies, arrQuery])

  const handleState = (e) => {
    setState(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleSearch = (param = state) => {
    let options
    if (param?.nativeEvent) {
      options = state
    } else {
      options = param
    }

    const filteredCompanies = allCompanies.filter((company) => {
      if (
        company.type === options.type
      ) {
        return company
      }
    })
    console.log(options.type)
    const queryStr = `type=${options.type}`
    navigate(`/companies?${queryStr}`, { replace: true })
    console.log(queryStr)
    setFilteredCompanies(filteredCompanies)
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.options}>
          <select value={state?.type} name="Restaurant" onChange={handleState}>
            <option disabled>Select Restaurant</option>
            <option value='burger'>Burger</option>
            <option value='pizza'>Pizza</option>
            <option value='gyro'>Gyro</option>
          </select>
          {/* <select value={state?.priceRange} name="priceRange" onChange={handleState}>
            <option disabled>Select Price Range</option>
            <option value="0">0-100,000</option>
            <option value="1">100,000-200,000</option>
            <option value="2">200,000-300,000</option>
            <option value="3">300,000-400,000</option>
            <option value="4">400,000-500,000</option>
          </select> */}
          {/* <select value={state?.continent} name="continent" onChange={handleState}>
            <option disabled>Select Continent</option>
            <option value="0">Europe</option>
            <option value="1">Asia</option>
            <option value="2">Africa</option>
            <option value="3">South America</option>
            <option value="4">North America</option>
            <option value="5">Oceania</option>
          </select> */}
          <button className={classes.searchBtn}>
            <AiOutlineSearch className={classes.searchIcon} onClick={handleSearch} />
          </button>
        </div>
        {filteredCompanies?.length > 0 ?
          <>
            <div className={classes.titles}>
              <h5>Selected Restaurants</h5>
              <h2>Restaurants you may like</h2>
            </div>
            <div className={classes.properties}>
              {filteredCompanies.map((company) => (
                
                <CompanyCard key={company._id} company={company}/>
                
              ))}
              
            </div>
            
          </> : <h2 className={classes.noProperty}>We have no Restaurants with the specified options.</h2>}
      </div>
    </div>
  )
}

export default Companies