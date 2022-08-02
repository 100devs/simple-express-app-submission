const button = document.querySelector('#searchButton')

button.addEventListener('click', makeReq)

async function makeReq(){

    const input = document.querySelector('#searchInput')
    console.log(input)
    const res = await fetch(`https://pedal-boss.herokuapp.com/api/pedals/${input}`)
    const data = await res.json()
  
    console.log(data);
    document.querySelector("#pedalName").textContent = data.name
    document.querySelector("#pedalCode").textContent = data.code
    document.querySelector("#pedalType").textContent = data.type
    document.querySelector('#pedalRange').textContent = `${data.dateRange.start} – ${data.dateRange.stop}`
  }