document.querySelector('#calculate-BMI').addEventListener('click', makeReq)
const reset = document.querySelector('.reset')


reset.addEventListener('click', siteReload)

function siteReload(){
  window.location.reload();
}


let hide = document.querySelectorAll('input[type="radio"]')


hide.forEach((item) => {
  item.addEventListener('click', hideDiv)
})

function hideDiv() {
  if (document.querySelector('#metric-button').checked) {
    document.querySelector('.standard').classList.add('dissappear')
    document.querySelector('.metric').classList.remove('dissappear')

  } else if (document.querySelector('#standard-button').checked) {
    document.querySelector('.metric').classList.add('dissappear')
    document.querySelector('.standard').classList.remove('dissappear')
  }
}


if (document.querySelector('#metric-button').checked) {
  document.querySelector('.standard').classList.add('dissappear')
  document.querySelector('.metric').classList.remove('dissappear')
}

async function makeReq() {

  let heightMetric = Number(document.querySelector("#height-cms").value)
  let weightMetric = Number(document.querySelector("#weight-kgs").value)
  let heightFeet = Number(document.querySelector("#height-feet").value)
  let heightInches = Number(document.querySelector("#height-inches").value) + Number(heightFeet) * 12
  let weightLbs = Number(document.querySelector("#weight-lbs").value)
  let res
  let data

  if (document.querySelector('#metric-button').checked) {
      heightInches = 0
      weightLbs = 0
      res = await fetch(`/api/${heightInches}/${weightLbs}/${heightMetric}/${weightMetric}`)
      data = await res.json()


  } else if (document.querySelector('#standard-button').checked) {
      heightMetric = 0
      weightMetric = 0
      res = await fetch(`/api/${heightInches}/${weightLbs}/${heightMetric}/${weightMetric}`)
      data = await res.json()

  }

  if (data.bmi != 'Please enter valid information') {
    document.querySelector('#BMI-VALUE').textContent = `BMI : ${data.bmi}`
    document.querySelector("#BMI-CATEGORY").textContent = `Category : ${data.category}`

  } else {
    document.querySelector('#BMI-VALUE').textContent = data.bmi
    document.querySelector("#BMI-CATEGORY").textContent = ""
  }


}


