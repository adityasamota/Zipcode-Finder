const num = document.getElementById('inputnum');
const res = document.getElementById('result');
const c = document.getElementById('country');
const re = document.getElementById('remove');

res.addEventListener('click',getLocation);

function getLocation(){
    const zip = num.value;
    const cy = c.value;
    fetch(`http://api.zippopotam.us/${cy}/${zip}`)
    
    .then(response => {
        if(response.status != 200){
            document.querySelector('.output').innerHTML=`<div class="flow-text"> Enter a valid zipcode or country code</div>`;
            throw Error(response.status.Text);
        }
        else{
            return response.json();
        }
        })
        
    .then(data => {
        let op = '';
        data.places.forEach(place => {
            op += `
            <div class="row">
                <div class="col s12">
                    <div class="card grey lighten-4">
                        <div class="card-title center grey lighten-2">Location Info</div>
                        <div class="card-content">
                        <ul>
                        <li class="flow-text">City:${place
                        ['place name']}</li>
                        <li class="flow-text">State:${place
                        ['state']}</li>
                        <li class="flow-text">Longitude:${place
                        ['longitude']}</li>
                        <li class="flow-text">Latitude:${place
                        ['latitude']}</li>
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
            `;
        });
        document.querySelector('.output').innerHTML= op;
    
    })
    
    .catch(err => console.log(err));
    // e.preventDefault();
}

re.addEventListener('click',removeInfo);

function removeInfo(){
    document.querySelector('.output').innerHTML = '';
}