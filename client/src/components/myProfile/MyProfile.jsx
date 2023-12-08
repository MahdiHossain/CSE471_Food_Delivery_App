import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { FaHamburger, FaClock } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { request } from '../../util/fetchAPI'
import person from '../../assets/person.jpg'
import classes from './myProfile.module.css'
import { logout } from '../../redux/authSlice'

const MyProfile = () => {
    const { user, token } = useSelector((state) => state.auth)
    const [listedCompanies, setListedCompanies] = useState([])
    const [bookmarkedCompanies, setBookmarkedCompanies] = useState([])
    const [activeBtn, setActiveBtn] = useState(0)
    const [deleteModal, setDeleteModal] = useState(false)
    const [error, setError] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        const fetchListedCompanies = async () => {
            try {
                const options = {
                    Authorization: `Bearer ${token}`
                }
                const data = await request(`/company/find/my-companies`, 'GET', options)
                setListedCompanies(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchListedCompanies()
    }, [])

    useEffect(() => {
        const fetchBookmarkedCompanies = async () => {
            try {
                const options = {
                    Authorization: `Bearer ${token}`
                }
                const data = await request(`/company/find/bookmarked-companies`, 'GET', options)
                setBookmarkedCompanies(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchBookmarkedCompanies()
    }, [])

    const handleDeleteProfile = async () => {
        try {
            const options = {
                Authorization: `Bearer ${token}`
            }
            await request(`/user/:id`, 'GET', options)
            dispatch(logout())
            navigate('/signin')
        } catch (error) {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 2500)
        }
    }


    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.profile}>
                    <div className={classes.updateDeleteControls}>
                        <Link className={classes.updateBtn} to={`/update-profile`}>Update Profile</Link>
                        {deleteModal && (
                            <div className={classes.deleteModal}>
                                <button onClick={handleDeleteProfile}>Yes</button>
                                <button onClick={() => setDeleteModal(prev => !prev)}>No</button>
                            </div>
                        )}
                        <button onClick={() => setDeleteModal(prev => !prev)} className={classes.deleteBtn}>Delete Profile</button>
                    </div>
                    <img className={classes.userProfileImg} src={user?.profileImg ? `http://localhost:5000/images/${user?.profileImg}` : person} />
                    <div className={classes.userData}>
                        <h3>{user?.username}</h3>
                        <h4>{user?.email}</h4>
                    </div>
                </div>
                <div className={classes.buttons}>
                    <button className={`${classes.button} ${activeBtn === 0 && classes.active}`} onClick={() => setActiveBtn(prev => 0)}>
                        Listed companies
                    </button>
                    <button className={`${classes.button} ${activeBtn === 2 && classes.active}`} onClick={() => setActiveBtn(prev => 2)}>
                        Bookmarked companies
                    </button>

                </div>
                <div className={classes.catalog}>
                    {activeBtn === 0 && (
                        <>
                            {listedCompanies?.length > 0 && <h2 className={classes.title}>Listed Companies</h2>}
                            <div className={classes.companies}>
                                {listedCompanies?.length > 0 ? listedCompanies?.map((listedProperty) => (
                                    <div key={listedProperty._id} className={classes.company}>
                                        <Link to={`/companyDetail/${listedProperty._id}`} className={classes.imgContainer}>
                                            <img src={`http://localhost:5000/images/${listedProperty?.img}`} alt="" />
                                        </Link>
                                        <div className={classes.details}>
                                            <div className={classes.priceAndOwner}>
                                                <span className={classes.price}>$ {listedProperty.price}</span>
                                                <img src={user?.profileImg ? `http://localhost:5000/images/${user?.profileImg}` : person} className={classes.owner} />
                                            </div>
                                            <div className={classes.moreDetails}>
                                                <span>{listedProperty?.rating} <FaClock className={classes.icon} /></span>
                                                <span>{listedProperty?.review} sq. meters<FaHamburger className={classes.icon} /></span>
                                            </div>
                                            <div className={classes.desc}>
                                                {listedProperty?.decs}
                                            </div>
                                        </div>
                                    </div>
                                )) : <h2 className={classes.noListed}>You have no listed companies</h2>}
                            </div>
                        </>
                    )}
                    {activeBtn === 2 && (
                        <>
                            {bookmarkedCompanies?.length > 0 && <h2 className={classes.title}>Bookmarked Companies</h2>}
                            <div className={classes.companies}>
                                {bookmarkedCompanies?.length > 0 ? bookmarkedCompanies?.map((bookmarkedProperty) => (
                                    <div key={bookmarkedProperty._id} className={classes.company}>
                                        <Link to={`/companyDetail/${bookmarkedProperty._id}`} className={classes.imgContainer}>
                                            <img src={`http://localhost:5000/images/${bookmarkedProperty?.img}`} alt="" />
                                        </Link>
                                        <div className={classes.details}>
                                            <div className={classes.priceAndOwner}>
                                                <span className={classes.price}>$ {bookmarkedProperty.price}</span>
                                                <img src={person} className={classes.owner} />
                                            </div>
                                            <div className={classes.moreDetails}>
                                                <span>{bookmarkedProperty?.beds} <FaClock className={classes.icon} /></span>
                                                <span>{bookmarkedProperty?.sqmeters} sq. meters<FaHamburger className={classes.icon} /></span>
                                            </div>
                                            <div className={classes.desc}>
                                                {bookmarkedProperty?.decs}
                                            </div>
                                        </div>
                                    </div>
                                )) : <h2 className={classes.noListed}>You have no bookmarked companies</h2>}
                            </div>
                        </>
                    )}
                </div>
                {error && (
                    <div className={classes.error}>
                        There was an error!
                    </div>
                )}
            </div>
        </div>
    )
}

// 0 - Listed Companies
export default MyProfile