/*Define variables for edit and delete icons*/
const deleteText = document.querySelectorAll('.fa-trash')
const editText = document.querySelectorAll('.fa-pen-to-square')
const createDoc = document.querySelectorAll('.fa-file-pen')

/*Add event listener to button that will submit the edit template form*/
//document.querySelector('#editTemplateButton').addEventListener('click', editTemplate)

/*Add event listeners to all delete icons*/
Array.from(deleteText).forEach((element) => {
    element.addEventListener('click', deleteTemplate)
})

/*Add event listeners to all edit icons*/
Array.from(editText).forEach((element) => {
    element.addEventListener('click', showTextForEditing)
})

Array.from(createDoc).forEach((element) => {
    element.addEventListener('click', showTextForCreating)
})

/*Request template in MongoDB be deleted*/
async function deleteTemplate() {
    const countyName = this.parentNode.childNodes[1].innerText
    const filingTier = this.parentNode.childNodes[3].innerText
    const templateId = this.parentNode.childNodes[5].innerText
    try {
        const res = await fetch(`deleteTemplate/${templateId}`, {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                '_id': templateId,
                'countyName': countyName,
                'filingTier': filingTier
            })
        })

        const data = await res.json()
        console.log(data)
        location.reload()

    } catch(err) {
        console.log(err)
    }
}

/*Request template data from MongoDB and populate it into the edit template form*/
    // document.querySelector('#editTemplate').classList.toggle('hidden')
    // document.querySelector('#addTemplate').classList.add('hidden')
async function showTextForEditing() {
    const countyName = this.parentNode.childNodes[1].innerText.toLowerCase();
    const filingTier = (this.parentNode.childNodes[3].innerText.toLowerCase() === 'small claims') ? 'sc' : (this.parentNode.childNodes[3].innerText.toLowerCase() === 'county civil') ? 'cc' : 'ca';

    try {
        const res = await fetch(`summons/${countyName}&${filingTier}`)
        const data = await res.json()
        document.querySelector('#currentlyEditing').innerText = `Currently Editing: ${data.stateName} ${data.countyName} ${data.tier}`
        document.querySelector('#editTemplate').action = `/updateTemplate/${data._id}?_method=PUT`
        document.querySelector('#mongoIdEditForm').value = data._id
        document.querySelector('#editState').value = data.stateName
        document.querySelector("#editCounty").value = data.countyName
        document.querySelector("#editTierSelect").value = data.tier
        tinymce.get('editTemplateArea').setContent(data.docText)
    } catch(err) {
        console.log(err)
    }
    
}

/*Request template data from MongoDB and populate it into the create template form*/
async function showTextForCreating() {
    const countyName = this.parentNode.childNodes[1].innerText.toLowerCase();
    const filingTier = (this.parentNode.childNodes[3].innerText.toLowerCase() === 'small claims') ? 'sc' : (this.parentNode.childNodes[3].innerText.toLowerCase() === 'county civil') ? 'cc' : 'ca';

    try {
        const res = await fetch(`summons/${countyName}&${filingTier}`)
        const data = await res.json()
        document.querySelector('#selectedTemplate').innerText = `Selected Template: ${data.stateName} ${data.countyName} ${data.tier}`
        //document.querySelector('#currentlyEditing').innerText = `Currently Editing: ${data.stateName} ${data.countyName} ${data.tier}`
        //document.querySelector('#editTemplate').action = `/updateTemplate/${data._id}?_method=PUT`
        // document.querySelector('#mongoIdEditForm').value = data._id
        // document.querySelector('#editState').value = data.stateName
        // document.querySelector("#editCounty").value = data.countyName
        // document.querySelector("#editTierSelect").value = data.tier
        tinymce.get('createDocArea').setContent(data.docText)
    } catch(err) {
        console.log(err)
    }
    
}

/*Request template in MongoDB be updated with data in edit template form*/
async function editTemplate() {
    // const countyName = this.parentNode.childNodes[1].innerText
    // const filingTier = this.parentNode.childNodes[3].innerText
    const templateId = this.parentNode.childNodes[5].innerText
    const editState = document.querySelector('#editState').value
    const editCounty = document.querySelector('#editState').value
    const editFilingTier = document.querySelector('#editTierSelect').value
    const editDocText = tinymce.get('editTemplateArea').getContent()
    try {
        const res = await fetch(`editTemplate/${templateId}`, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                '_id': templateId,
                'stateName': editState,
                'countyName': editCounty,
                'tier': editFilingTier,
                'docText': editDocText
            })
        })

        const data = await res.json()
        console.log(data)
        location.reload()

    }catch(err) {
        console.log(err)
    }
}

/*Expand instructions on TX cover letter page*/
document.querySelector('.fa-angle-down').addEventListener('click', showElement)
function showElement() {
    document.querySelector('.instructions').classList.toggle("hidden")
}

//Display forms -- isn't working, changed to multiple pages instead
// document.querySelector('#toggleAdd').addEventListener(click, 'displayAdd')
// document.querySelector('#toggleEdit').addEventListener(click, 'displayEdit')
// document.querySelector('#toggleCreate').addEventListener(click, 'displayCreate')

// function displayAdd() {
//     document.querySelector('#addTemplate').classList.toggle('hidden')
//     document.querySelector('#editTemplate').classList.add('hidden')
//     document.querySelector('#create-summons').classList.add('hidden')
// }

// function displayEdit() {
//     document.querySelector('#addTemplate').classList.add('hidden')
//     document.querySelector('#editTemplate').classList.toggle('hidden')
//     document.querySelector('#create-summons').classList.add('hidden')
// }

// function displayCreate() {
//     document.querySelector('#addTemplate').classList.add('hidden')
//     document.querySelector('#editTemplate').classList.add('hidden')
//     document.querySelector('#create-summons').classList.toggle('hidden')
// }


///////////////////////////////*PDFLIB TEST*/

document.querySelector('#pdfLibTestCreate').addEventListener('click', createPdf)
/*const { PDFDocument, rgb, degrees, StandardFonts } = PDFLib;

async function createPdf() {
    const pdfDoc = await PDFDocument.create()
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
    const summonsBody = 'This is a test for summonsssssssss'
    const page = pdfDoc.addPage()
    const { width, height } = page.getSize()
    page.setSize(841.89, 595.28)
    const fontSize = 30
    page.drawText(summonsBody, {
      x: 50,
      y: height - 4 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0.53, 0.71),
    })
  
    //fs.writeFileSync("./output.pdf", await page.save())
    
    const pdfBytes = await pdfDoc.save()
    fs.writeFile("output.pdf", pdfBytes, "utf8", (err, data) => {
        if (err) console.log(err);
        if (data) console.log(data);
    })
    //download(pdfBytes, "pdf-lib_creation_example.pdf", "application/pdf");
  }
*/
async function createPdf() {
    const pdfDoc = await PDFLib.PDFDocument.create();
      const page = pdfDoc.addPage([350, 400]);
      page.moveTo(110, 200);
      page.drawText('Hello World!');
      const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
      document.getElementById('pdf').src = pdfDataUri;
}