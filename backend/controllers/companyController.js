const verifyToken = require('../middlewares/verifyToken')
const Company = require('../models/Company')
const User = require('../models/User')
const companyController = require('express').Router()

// get all companies
companyController.get('/getAll', async (req, res) => {
    try {
        const companies = await Company.find({}).populate("currentOwner", '-password')

        console.log(companies)

        return res.status(200).json(companies)
    } catch (error) {
        console.error(error)
    }
})

// get featured companies
companyController.get('/find/featured', async (req, res) => {
    try {
        const featuredcompanies = await Company.find({ featured: true }).populate("currentOwner", '-password')
        return res.status(200).json(featuredcompanies)
    } catch (error) {
        return res.status(500).json(error)
    }
})

// get all from types
companyController.get('/find', async (req, res) => {
    const type = req.query
    try {
        if(type){
            const companies = await Company.find(type).populate('currentOwner', '-password')
            return res.status(200).json(companies)
        } else {
            return res.status (500).json({msg: "No such type"})
        }
    } catch (error) {
        return res.status(500).json(error.message)  
    }     
})

// TODO FETCH TYPE OF companies. EX: {BEACH: 34, MOUNTAIN: 23}
companyController.get('/find/types', async(req, res) => {
    try {
        const burgerType = await Company.countDocuments({ type: 'burger' });
        const pizzaType = await Company.countDocuments({ type: 'pizza' });
        const gyroType = await Company.countDocuments({ type: 'gyro' });
        // const baridharaType = await Company.countDocuments({ type: 'baridhara' });
        // const mohakhaliType = await Company.countDocuments({ type: 'mohakhali' });
        // const mirpurType = await Company.countDocuments({ type: 'Mirpur' });
        // const mohakhaliType = await Company.countDocuments({ type: 'Mohakhali' });
        // const mohammadpurType = await Company.countDocuments({ type: 'Mohammadpur' });
        // const kakrailType = await Company.countDocuments({ type: 'Kakrail' });
        // const nayaPaltanType = await Company.countDocuments({ type: 'Naya_Paltan' });
        // const elephantRoadType = await Company.countDocuments({ type: 'Elephant_Road' });
        // const farmgateType = await Company.countDocuments({ type: 'Farmgate' });
        // const newMarketType = await Company.countDocuments({ type: 'New_Market' });
        // const shahbagType = await Company.countDocuments({ type: 'Shahbag' });
        // const motijheelType = await Company.countDocuments({ type: 'Motijheel' });
        // const pizzaDOHSType = await Company.countDocuments({ type: 'pizza_DOHS' });
        // const bashundharaRAType = await Company.countDocuments({ type: 'Bashundhara_RA' });
        // const khilgaonType = await Company.countDocuments({ type: 'Khilgaon' });
        // const malibaghType = await Company.countDocuments({ type: 'Malibagh' });
         return res.status(200).json({
            Burger: burgerType,
            Pizza: pizzaType,
            Gyro: gyroType,
            // Baridhara: baridharaType,
            // mohakhali: mohakhaliType
            // Mirpur: mirpurType,
            // Mohakhali: mohakhaliType,
            // Mohammadpur: mohammadpurType,
            // Kakrail: kakrailType,
            // Naya_Paltan: nayaPaltanType,
            // Elephant_Road: elephantRoadType,
            // Farmgate: farmgateType,
            // New_Market: newMarketType,
            // Shahbag: shahbagType,
            // Motijheel: motijheelType,
            // pizza_DOHS: pizzaDOHSType,
            // Bashundhara_RA: bashundharaRAType,
            // Khilgaon: khilgaonType,
            // Malibagh: malibaghType
        })
    } catch (error) {
        return res.status(500).json(error) 
    }
})
// fetch my foods
companyController.get('/find/my-companies', verifyToken, async (req, res) => {
    try {
        const companies = await Company.find({ currentOwner: req.user.id })

        return res.status(200).json(companies)
    } catch (error) {
        console.error(error)
    }
})

// fetch bookmarked yachts
companyController.get('/find/bookmarked-companies', verifyToken, async (req, res) => {
    try {
        const companies = await Company.find({ bookmarkedUsers: { $in: [req.user.id] } })

        return res.status(200).json(companies)
    } catch (error) {
        console.error(error)
    }
})

// TODO FETCH INDIVIDUAL Company
companyController.get('/find/:id', async (req, res) => {
    try {
        const company = await Company.findById(req.params.id).populate('currentOwner', '-password')

        if (!company) {
            throw new Error('No such Company with that id')
        } else {
            return res.status(200).json(company)
        }
    } catch (error) {
        return res.status(500).json(error)
    }
})


// create estate
companyController.post('/', verifyToken, async (req, res) => {
    try {
        const newCompany = await Company.create({ ...req.body, currentOwner: req.user.id })

        return res.status(201).json(newCompany)
    } catch (error) {
        return res.status(500).json(error)
    }
})

// update estate
companyController.put('/:id', verifyToken, async (req, res) => {
    try {
        const company = await Company.findById(req.params.id)
        
        if(company.currentOwner.toString() !== req.user.id.toString()) {
            console.log(company.currentOwner, req.user.id)
            throw new Error("You are not allowed to update other people's companies")
        } else {
            const updatedCompany = await Company.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            )
    
    
            return res.status(200).json(updatedCompany)
        }       
    } catch (error) {
        return res.status(500).json(error)
    }
})


companyController.put('/bookmark/:id', verifyToken, async (req, res) => {
    try {
        let Company = await Company.findById(req.params.id)
        if (Company.currentOwner.toString() === req.user.id) {
            throw new Error("You are not allowed to bookmark your project")
        }


        if (Company.bookmarkedUsers.includes(req.user.id)) {
            Company.bookmarkedUsers = Company.bookmarkedUsers.filter(id => id !== req.user.id)
            await Company.save()
        } else {
            Company.bookmarkedUsers.push(req.user.id)

            await Company.save()
        }

        return res.status(200).json(Company)
    } catch (error) {
        return res.status(500).json(error)
    }
})

// delete estate
companyController.delete('/:id', verifyToken, async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ error: "Company not found" });
        }
        if (company.currentOwner.toString() !== req.user.id.toString()) {
            return res.status(403).json({ error: "You are not allowed to delete other people's companies" });
        }
        await company.deleteOne();
        return res.status(200).json({ msg: "Successfully deleted Company" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = companyController