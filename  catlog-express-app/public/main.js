// console.log(`main.js working`)
document.querySelector('#updateButton').addEventListener('click', updateEntry)

async function updateEntry() {
    try {
        console.log(`update button clicked`)
        const response = await fetch('updateEntry', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: document.getElementsByName('name')[0].value,
                date: document.getElementsByName('date')[0].value,
                wetFoodBrand: document.getElementsByName('wetFoodBrand')[0].value,
                wetFoodRating: document.getElementsByName('wetFoodRating').value,
                wetFoodWeight: document.getElementsByName('wetFoodWeight')[0].value,
                dryFoodBrand: document.getElementsByName('dryFoodBrand')[0].value,
                dryFoodRating: document.getElementsByName('dryFoodRating').value,
                dryFoodWeight: document.getElementsByName('dryFoodWeight')[0].value,
                feedingNote: document.getElementsByName('feedingNote')[0].value,
                poopooNote: document.getElementsByName('poopooNote')[0].value,
                peepeeNote: document.getElementsByName('peepeeNote')[0].value,
                image: document.getElementsByName('image')[0].value,
                weight: document.getElementsByName('weight')[0].value,
                otherNote: document.getElementsByName('otherNote')[0].value,
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch(error) {
        console.log(error)
    }
}


document.querySelector('#deleteButton').addEventListener('click', deleteEntry)
async function deleteEntry() {
    const nameInput = document.querySelector('.nameToDelete')
    const dateInput = document.querySelector('.dateToDelete')
    try {
        console.log(`delete button clicked`)
        const response = await fetch('deleteEntry', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: nameInput.value,
                date: dateInput.value
            })
        })
        const data = await response.json()
        location.reload()
    } catch(error) {
        console.log(error)
    }
}

$(document).ready(function(){
    // Check Radio-box
    $(".wet-rating input:radio").attr("checked", false);

    $('.wet-rating input').click(function () {
        $(".wet-rating span").removeClass('checked');
        $(this).parent().addClass('checked');
    });

    $('input:radio').change(
      function(){
        var wetRating = this.value;
        // alert(userRating);
    }); 
});

$(document).ready(function(){
    // Check Radio-box
    $(".dry-rating input:radio").attr("checked", false);

    $('.dry-rating input').click(function () {
        $(".dry-rating span").removeClass('checked');
        $(this).parent().addClass('checked');
    });

    $('input:radio').change(
      function(){
        var dryRating = this.value;
        // alert(userRating);
    }); 
});

