document.querySelector('button').addEventListener('click', async function(){
    document.querySelector('ul').innerHTML = "";
    const name = document.querySelector('input').value;
    console.log(name);
    const res = await fetch(`/searchTenant/${name}`);
    const el = await res.json();
    if(el){
        let due = 5000+(Number(el.flattype[0])*500)+(el.peopleno*500);
        document.querySelector('ul').innerHTML+=`<li><span>flatno: ${el.flatno}</span><br>
            <span>parkingno: ${el.parkingno}</span><br>
            <span>fullname:${el.fullname}</span><br>
            <span>peopleno:${el.peopleno}</span><br>
            <span>petsno:${el.petsno}</span><br>
            <span>sqfeet:${el.sqfeet}</span><br>
            <span>flattype:${el.flattype}</span><br><br><br><br>
            <h1>BILL AMOUNT DUE: ${due}<br><br></li>`
        }
        else{
            document.querySelector('ul').innerHTML+='No data found! Sorry!';
        }
});