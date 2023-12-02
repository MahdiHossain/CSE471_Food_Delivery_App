import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { request } from '../../util/fetchAPI'
import { AiOutlineFileImage } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import classes from './editCompany.module.css'

const EditCompany = () => {
    const { id } = useParams()
    const { token } = useSelector((state) => state.auth)
    const [companyDetails, setCompanyDetails] = useState(null)
    const [photo, setPhoto] = useState(null)
    const [initialPhoto, setInitialPhoto] = useState(null)
    const [error, setError] = useState(false)
    const [emptyFields, setEmptyFields] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCompanyDetails = async () => {
            try {
                const data = await request(`/company/find/${id}`, 'GET')
                setCompanyDetails(data)
                setPhoto(data.img)
                setInitialPhoto(data.img)
            } catch (error) {
                console.error(error)
            }
        }
        fetchCompanyDetails()
    }, [id])

    const handleState = (e) => {
        setCompanyDetails(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleUpdate = async (e) => {
        e.preventDefault()

        let filename = initialPhoto
        if (photo && photo !== initialPhoto) {
            const formData = new FormData()
            filename = crypto.randomUUID() + photo.name
            formData.append('filename', filename)
            formData.append('image', photo)

            const options = {
                "Authorization": `Bearer ${token}`,
            }

            await request("/upload/image", 'POST', options, formData, true)
        }


        try {
            if (Object.values(companyDetails).some((v) => v === '')) {
                setEmptyFields(true)
                setTimeout(() => {
                    setEmptyFields(false)
                }, 2500)
                return
            }


            const options = {
                "Authorization": `Bearer ${token}`,
                "Content-Type": 'application/json'
            }

            await request(`/company/${id}`, 'PUT', options, { ...companyDetails, img: filename })
            navigate(`/companyDetail/${id}`)

        } catch (error) {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 2500);
        }
    }



    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <h2>Edit Company</h2>
                <form onSubmit={handleUpdate}>
                    <input value={companyDetails?.title} type="text" placeholder='Title' name="title" onChange={handleState} />
                    <select required name='type' onChange={handleState}>
                        <option disabled>Select Area</option>
                        <option value='burger'>Burger</option>
                        <option value='pizza'>Pizza</option>
                        <option value='gyro'>Gyro</option>
                    </select>
                    <input value={companyDetails?.desc} type="text" placeholder='Desc' name="desc" onChange={handleState} />
                    <input value={companyDetails?.price} type="number" placeholder='Price' name="price" onChange={handleState} />
                    <input value={companyDetails?.sqmeters} type="text" placeholder='Location' name="Location" onChange={handleState} />
                    <input value={companyDetails?.beds} type="text" placeholder='Schedule' name="Schedule" step={1} min={1} onChange={handleState} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '50%' }}>
                        <label htmlFor='photo'>Company picture <AiOutlineFileImage /></label>
                        <input
                            type="file"
                            id='photo'
                            style={{ display: 'none' }}
                            onChange={(e) => setPhoto(e.target.files[0])}
                        />
                        {photo && <p>{photo.name}</p>}
                    </div>
                    <button type='submit'>Edit</button>
                </form>
                {error && (
                    <div className={classes.error}>
                        There was an error editing the listing! Try again.
                    </div>
                )}
                {emptyFields && (
                    <div className={classes.error}>
                        All fields must be filled!
                    </div>
                )}
            </div>
        </div>
    )
}

export default EditCompany