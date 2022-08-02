const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000
let bmi, category, objToJson
app.use(cors())


function bmiCategory(bmi) {
    if (bmi < 16) {
        return category = 'Underweight - Severe Thinness'
    } else if (bmi < 17) {
        return category = 'Underweight - Moderate Thinness'
    } else if (bmi < 18.5) {
        return category = 'Underweight - Mild Thinness'
    } else if (bmi < 25) {
        return category = 'Normal'
    } else if (bmi < 29.9) {
        return category = 'Overweight - Pre Obese'
    } else if (bmi < 34.9) {
        return category = 'Overweight - Class I'
    } else if (bmi < 39.9) {
        return category = 'Overweight - Class II'
    } else if (bmi > 40) {
        return category = 'Overweight - Class III'
    }

}


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
app.use(express.static(__dirname + '/public'))


app.get('/api/:heightInches/:weightLbs/:heightMetric/:weightMetric', (req, res) => {
    const heightInches = Number(req.params.heightInches)
    const weightLbs = Number(req.params.weightLbs)
    const heightMetric = Number(req.params.heightMetric)
    const weightMetric = Number(req.params.weightMetric)

    if (heightInches != 0 && weightLbs != 0) {
        bmi = 703 * Number(weightLbs) / Number(Math.pow(heightInches, 2))
        category = bmiCategory(bmi)
        objToJson = {
            bmi: bmi.toFixed(2),
            category: category
        }
        res.json(objToJson)
    } else if (heightMetric != 0 && weightMetric != 0) {
        bmi = Number(weightMetric / Math.pow(heightMetric / 100, 2))
        category = bmiCategory(bmi)
        objToJson = {
            bmi: bmi.toFixed(2),
            category: category
        }
        res.json(objToJson)
    } else {
        objToJson = {
            bmi: "Please enter valid information"
        }
        res.json(objToJson)
    }
})




app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is running on PORT ${PORT}!`)
})