document.addEventListener('DOMContentLoaded', function() {
const addressForm = document.querySelector("#address-form");
const cepInput = document.querySelector("#cep");
const ruaInput = document.querySelector("#rua");
const bairroInput = document.querySelector("#bairro");
const estadoInput = document.querySelector("#estado");
const latitudeInput = document.querySelector('#lat');
const longitudeInput = document.querySelector('#log');
const weatherInput = document.querySelector("#weather")

//validate cep input

cepInput.addEventListener("keypress", (e) => {
    
    const onlyNumbers = /[0-9]/;
    const key = String.fromCharCode(e.keyCode);

    if (!onlyNumbers.test(key)){
        e.preventDefault();
        return;
    }
})

//get adress event
cepInput.addEventListener("keyup", (e) =>{
    const inputValue = e.target.value;

    if (inputValue.length === 8){
        getAddress(inputValue);
    }
});

//get customer address from api
const getAddress = async (cep)=> {
   cep = cepInput.value; 

   cepInput.blur();

   const apiUrl = `http://viacep.com.br/ws/${cep}/json/`

   const responde = await fetch(apiUrl)

   const data = await responde.json();

   console.log(data);

   estadoInput.value = data.logradouro;
   bairroInput.value = data.bairro;
   ruaInput.value = data.localidade;

   
};

async function getPrevisao() {
    const lat = document.getElementById('lat').value;
    const long = document.getElementById('long').value;

    try { 
         const responde = await fetch( `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long},&hourly=temperature_2m,rain`);
         const data = await responde.json();
         console.log(data);
         document.getElementById('weather').innerHTML =  data;

         for (let index = 0; index < data.length; index++) {
          const element = data[index];
        
            document.getElementById('weather').innerHTML += `<div>${element.hourly.time} - ${element.hourly.temperature_2m}</div>`;

         }

          } catch (error) {
          alert(error.message);
         }
    
    
    
}

window.getAddress = getAddress;
window.getPrevisao = getPrevisao;
} );
