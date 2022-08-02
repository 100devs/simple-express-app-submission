const deleteLine = document.querySelectorAll('.fa-trash')
const editLine = document.querySelectorAll('.fa-pencil-alt')
const saveLine = document.querySelectorAll('.fa-save')

Array.from(deleteLine).forEach((element) => {
    element.addEventListener('click', deleteSession)
})

Array.from(editLine).forEach((element) => {
    element.addEventListener('click', editLineData)
})

Array.from(saveLine).forEach((element) => {
    element.addEventListener('click', editLineData)
})

async function deleteSession() {
    const date = this.parentNode.parentNode.childNodes[1].innerText
    const startTime = this.parentNode.parentNode.childNodes[3].innerText
    if (confirm("Are you sure you want to delete?")) {
        try {

            const response = await fetch('deleteSession', {
                method: 'delete',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'date': date,
                    'startTime': startTime
                })
            })
            const data = await response.json()
            console.log(data)
            location.reload()
        } catch (err) {
            console.log(err)
        }
    }

}

// Allows user to choose whether to include data from this session in the chart

async function editLineData() {

    if (this.classList.contains('fa-save')) {
        console.log('saving...')
        this.classList.remove('fa-save')
        this.classList.toggle('fa-pencil-alt')

    } else if (this.classList.contains('fa-pencil-alt')) {
        console.log('editing...')
        this.classList.remove('fa-pencil-alt')
        this.classList.toggle('fa-save')

    }
    const date = this.parentNode.parentNode.childNodes[1].innerText
    const startTime = this.parentNode.parentNode.childNodes[3].innerText
    const runTime = this.parentNode.parentNode.childNodes[5].innerText
    const distance = this.parentNode.parentNode.childNodes[7].innerText
    const avgHR = this.parentNode.parentNode.childNodes[9].innerText
    const cals = this.parentNode.parentNode.childNodes[11].innerText
    const notes = this.parentNode.parentNode.childNodes[13].innerText

    // console.log(`Date: ${date}, startTime: ${startTime}, runTime: ${runTime}`)
    // console.log(`Distance: ${distance}, avgHR: ${avgHR}, cals: ${cals}`)
    // console.log(`Notes: ${notes}`)
    // const bName = this.parentNode.childNodes[3].innerText
    // const tLikes = Number(this.parentNode.childNodes[5].innerText)
    // try {
    //     const response = await fetch('editData', {
    //         method: 'put',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //             'stageNameS': sName,
    //             'birthNameS': bName,
    //             'likesS': tLikes
    //         })
    //     })
    //     const data = await response.json()
    //     console.log(data)
    //     location.reload()

    // } catch (err) {
    //     console.log(err)
    // }
}