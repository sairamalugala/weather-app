/*fetch('http://puzzle.mead.io/puzzle').then((res)=>{
    res.json().then((res)=>{
        console.log(res);
    })
})*/

/*fetch('/weather?address="!"').then((body)=>{
    body.json().then((data)=>{
        if(data.hasOwnProperty('error')){
            console.error(data.error);
        }else{
            console.log(data.temperature);
            console.log(data.location)
        }
    })
})*/

const weatherForm = document.querySelector('form');
const msg1 = document.querySelector('#message-1');
const msg2 = document.querySelector('#message-2');

weatherForm.onsubmit=function(e){
    e.preventDefault();
    msg1.textContent='';
    msg2.textContent='Loading...';
    let address = this.querySelector('input').value.trim();
    if(address.length==0){
        msg1.textContent="Please enter address to search.";
    }
    fetch('/weather?address="'+address+'"').then((body)=>{
        body.json().then((data)=>{ 
            if(data.hasOwnProperty('error')){
                msg1.textContent=data.error;
                msg2.textContent='';
            }else{
                msg1.textContent='';
                msg2.textContent=`location: ${data.location}, temperature: ${data.temperature}F, forecast: ${data.forecast} \n minimum temperature: ${data.temperatureMin} \n max temperature: ${data.temperatureMax}`
            }
        })
    })
}
