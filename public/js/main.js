const playlists = document.querySelectorAll('.removeList')
const songs = document.querySelectorAll('.removeSong')

playlists.forEach(playlist => playlist.addEventListener('click', deletePlaylist))
songs.forEach(song => song.addEventListener('click', deleteSong))

async function deletePlaylist()
{
    const rTitle = this.parentNode.childNodes[1].textContent
    try{
        const response = await fetch('/deletePlaylist', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: rTitle
            })
        })

        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err)
    {
        console.error('Error removing song: ', err)
    }
}

async function deleteSong()
{
    //i don't think you can delete part of an array
    //try updating the existing array
    const rSong = this.parentNode.childNodes[0].textContent
    const rTitle = this.parentNode.parentNode.parentNode.childNodes[1].textContent
    try{
        const response = await fetch('/deleteSong', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: rTitle,
                song: rSong
            })
        })

        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err)
    {
        console.error('Error removing song: ', err)
    }
}