import React from 'react'
import classes from './companyCard.module.css'
import { FaBed, FaSquareFull } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import person from '../../assets/person.jpg'

const CompanyCard = ({ company }) => {
  const ownerProfileImg = company?.currentOwner?.profileImg

    return (
        <div key={company._id} className={classes.company}>
            <Link to={`/companyDetail/${company._id}`} className={classes.imgContainer}>
                <img src={`http://localhost:5000/images/${company?.img}`} alt="" />
            </Link>
            <div className={classes.details}>
                <div className={classes.priceAndOwner}>
                    <span className={classes.price}>$ {company.price}</span>
                    <img src={ownerProfileImg ? `http://localhost:5000/images/${ownerProfileImg}` : person} className={classes.owner} />
                </div>
                <div className={classes.moreDetails}>
                    <span>{company.beds} <FaBed className={classes.icon} /></span>
                    <span>{company.sqmeters} square meters<FaSquareFull className={classes.icon} /></span>
                </div>
                <div className={classes.desc}>
                    {company.desc}
                </div>
            </div>
        </div>
    )
}

export default CompanyCard