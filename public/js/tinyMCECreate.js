const alachuacc = fetch("https://legal-docs-generator.herokuapp.com/summons/alachua&cc").then(response => response.json())

tinymce.init({
    selector: '#createDocArea',
    plugins:'fullscreen pagebreak searchreplace table print template',
    toolbar: 'template print',
    min_height: '50vh',
    width: '85vw',
    toolbar_sticky: true,
    autosave_restore_when_empty:true,
    templates: [
        {
            title: "FL Small Claims Summons",
            description: "Use to populate case style and servee info for a small claims FL summons.",
            content: "<p>CASE NO: {$case_num}</p>"+"<p>{$plaintiff_name}<br>Plaintiff,</p>"+"<p>vs.<br><br>{$defendant_name}<br>Defendant(s).<br><br></p>"+"<p><b>{$summons_prefix} NOTICE TO APPEAR FOR PRETRIAL CONFERENCE/MEDIATION</b><br>STATE OF FLORIDA - NOTICE TO PLAINTIFF(S) AND DEFENDANT(S):</p>"+"{$servee_name}<br>{$servee_street}<br>{$servee_city}, {$servee_state} {$servee_zip}"
        },
        {
            title: "FL County Civil/Circuit Summons",
            description: "Use to populate case style and servee info for a 20-day FL summons.",
            content: "<p>CASE NO: {$case_num}</p>"+"<p>{$plaintiff_name}<br>Plaintiff,</p>"+"<p>vs.<br><br>{$defendant_name}<br>Defendant(s).<br><br></p>"+"<p><b>{$summons_prefix} NOTICE TO APPEAR FOR PRETRIAL CONFERENCE/MEDIATION</b><br>STATE OF FLORIDA - NOTICE TO PLAINTIFF(S) AND DEFENDANT(S):</p>"+"{$servee_name}<br>{$servee_street}<br>{$servee_city}, {$servee_state} {$servee_zip}"
        },
        {
            title: "test external template",
            description: "testing",
            url: "/templates/test.html"
        },
        {
            title: "Replacement FL Small Claims Summons",
            description: "Replaces selected text to insert case style and servee info for a small claims FL summons.",
            content: "<p>CASE NO: <span class='replace-case-no'></span></p>"+"<p><span class='replace-plaintiff-name'></span><br>Plaintiff,</p>"+"<p>vs.<br>{$defendant_name}<br>Defendant(s).<br><br></p>"+"<p><b>{$alias_title} NOTICE TO APPEAR FOR PRETRIAL CONFERENCE/MEDIATION</b><br>STATE OF FLORIDA - NOTICE TO PLAINTIFF(S) AND DEFENDANT(S):</p>"+"{$servee_name}<br>{$servee_street}<br>{$servee_city}, {$servee_state} {$servee_zip}"
        }
    ],

    // template_selected_content_classes: "replace-case-no replace-plaintiff-name"

    template_replace_values: {
        plaintiff_name: getPlaintiffName,
        defendant_name: getDefendantName,
        case_num: getCaseNumber,
        summons_prefix: getSummonsPrefix,
        servee_name: getServeeName,
        servee_street: getServeeStreet,
        servee_city: getServeeCity,
        servee_state: getServeeState,
        servee_zip: getServeeZip
    }
});

function getTemplate() {
    // const countyName = document.querySelector('#createSumCountyName').value
    // const filingTier = document.querySelector('#createSumFileTier').value
    return fetch(`https://legal-docs-generator.herokuapp.com/summons/alachua&cc`).then(data => data.json()).then(data=>data.docText)
   
}

function getPlaintiffName() {
    return document.querySelector('#plaintiffName').value
}

function getDefendantName() {
    return document.querySelector('#defendantName').value
}

function getCaseNumber() {
    return document.querySelector('#caseNum').value
}

function getServeeName() {
    return document.querySelector('#serveeName').value
}

function getServeeStreet() {
    return document.querySelector('#serveeStreet').value
}

function getServeeCity() {
    return document.querySelector('#serveeCity').value
}

function getServeeState() {
    return document.querySelector('#serveeState').value
}

function getServeeZip() {
    return document.querySelector('#serveeZip').value
}

function getSummonsPrefix() {
    return document.querySelector('#summonsPrefix').value.toUpperCase()
}