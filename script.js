let pgList = [
  {name:"Sparkle PG", area:"Nagpur", price:4000, roomtype:"single", gender:"girls", amenityTags:["AC","wifi"], rating:4, availabilityStatus:true},
  {name:"StayHome PG", area:"Nandanvan", price:3000, roomtype:"double", gender:"boys", amenityTags:["wifi"], rating:3.8, availabilityStatus:true},
  {name:"LightHouse PG", area:"Manish nagar", price:6000, roomtype:"triple", gender:"co-ed", amenityTags:["AC"], rating:4.5, availabilityStatus:false},
  {name:"HomeStay PG", area:"Civil Lines", price:5000, roomtype:"single", gender:"girls", amenityTags:["wifi"], rating:4, availabilityStatus:true},
  {name:"Raisoni PG", area:"Hingna", price:7000, roomtype:"double", gender:"boys", amenityTags:["AC"], rating:4.7, availabilityStatus:true},
  {name:"Priyadarshini PG", area:"Manewada", price:8000, roomtype:"triple", gender:"co-ed", amenityTags:["wifi"], rating:4.1, availabilityStatus:true},
  {name:"Girls PG", area:"Sadar", price:4500, roomtype:"single", gender:"girls", amenityTags:["AC"], rating:3.9, availabilityStatus:true},
  {name:"Crostino PG", area:"Hudkeshwar", price:5500, roomtype:"double", gender:"boys", amenityTags:["wifi"], rating:4.3, availabilityStatus:false}
];

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];


let container = document.getElementById("pgcontainer");
let priceslider = document.getElementById("pricefilter");
let pricevalue = document.getElementById("pricevalue");

let roomFilters = document.querySelectorAll(".roomfilter");
let genderFilters = document.querySelectorAll(".genderfilter");
let availabilityFilter = document.getElementById("availabilityfilter");
let sortOption = document.getElementById("sortoption");



let modal = document.getElementById("modal");
let closeModal = document.getElementById("closeModal");

let modalName = document.getElementById("modalName");
let modalArea = document.getElementById("modalArea");
let modalPrice = document.getElementById("modalPrice");
let modalAmenities = document.getElementById("modalAmenities");
let contactbtn = document.getElementById("contactbtn");

pricevalue.innerText = priceslider.value;

function applyFilter(){

  let maxprice = Number(priceslider.value);
  pricevalue.innerText = maxprice;


  let selectedRooms = [];
  roomFilters.forEach(function(cb){
    if(cb.checked){
      selectedRooms.push(cb.value);
    }
  });


  let selectedGender = "";
  genderFilters.forEach(function(g){
    if(g.checked){
      selectedGender = g.value;
    }
  });


  let filtered = [];

  for(let i=0; i<pgList.length; i++){

    let pg = pgList[i];

    let priceMatch = false;
    if(pg.price <= maxprice){
      priceMatch = true;
    }

    let roomMatch = false;
    if(selectedRooms.length === 0){
      roomMatch = true;
    }
    else if(selectedRooms.includes(pg.roomtype)){
      roomMatch = true;
    }

    let genderMatch = false;
    if(selectedGender === ""){
      genderMatch = true;
    }
    else if(pg.gender === selectedGender){
      genderMatch = true;
    }

    let availabilityMatch = false;
    if(!availabilityFilter.checked){
      availabilityMatch = true;
    }
    else if(pg.availabilityStatus === true){
      availabilityMatch = true;
    }

    if(priceMatch && roomMatch && genderMatch && availabilityMatch){
      filtered.push(pg);
    }
  }


  let sort = sortOption.value;

  if(sort === "low"){
    filtered.sort(function(a,b){
      return a.price - b.price;
    });
  }
  else if(sort === "high"){
    filtered.sort(function(a,b){
      return b.price - a.price;
    });
  }
  else if(sort === "rating"){
    filtered.sort(function(a,b){
      return b.rating - a.rating;
    });
  }

  renderpgs(filtered);
}



function renderpgs(list){

  container.innerHTML = "";

  for(let i=0; i<list.length; i++){

    let pg = list[i];

    let div = document.createElement("div");

 
    let heart = "&#9825;";
    if(favorites.includes(i)){
      heart = "&#10084;";
    }

    div.innerHTML = `
      <h3>${pg.name}</h3>
      <p>${pg.area}</p>
      <p>Rs ${pg.price}</p>
      <p>${pg.roomtype}</p>
      <p>${pg.gender}</p>
      <p>${pg.amenityTags}</p>
      <p><span class="heart" data-id=${i}>${heart}</span> ${pg.rating}</p>
      <p>${pg.availabilityStatus ? "Available" : "Not Available"}</p>
    `;


    div.onclick = function(){
      openModal(i);
    };

    container.appendChild(div);
  }
}


document.addEventListener("click", function(e){

  if(e.target.classList.contains("heart")){


    let id = Number(e.target.dataset.id);

    if(favorites.includes(id)){
      favorites = favorites.filter(function(f){
        return f !== id;
      });
      e.target.innerHTML = "&#9825;";
    }
    else{
      favorites.push(id);
      e.target.innerHTML = "C51104;";
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    updatecount();
  }

});



function openModal(id){

  let pg = pgList[id];

  modalName.innerText = pg.name;
  modalArea.innerText = pg.area;
  modalPrice.innerText = "Rs " + pg.price;
  modalAmenities.innerText = pg.amenityTags;
  

  modal.style.display = "block";
}

closeModal.onclick = function(){
  modal.style.display = "none";
};



function updatecount(){
  document.getElementById("favcount").innerText =
    "My favourites (" + favorites.length + ")";
}



priceslider.addEventListener("input", applyFilter);

roomFilters.forEach(function(cb){
  cb.addEventListener("change", applyFilter);
});

genderFilters.forEach(function(g){
  g.addEventListener("change", applyFilter);
});

availabilityFilter.addEventListener("change", applyFilter);

sortOption.addEventListener("change", applyFilter);



applyFilter();
updatecount();