let rowData = document.getElementById("rowData");
let sectionMeals = document.getElementById("sectionMeals");
let buttonSubmit;

$(document).ready(() => {
  SearchByName("").then(() => {
    $(".loadeng-screen").fadeOut(300);
    $("body").css("overflow", "visible");
    $(".inner-loading-screan").fadeOut(300);
  });
});

//side-nav
function openSiNav() {
  $(".side-nav-menu ").animate({ left: 0 }, 500);

  $(".open-close-icon").addClass("fa-x");
  $(".open-close-icon").removeClass("fa-align-justify");

  $(".linkes li").eq(0).animate({ top: 0 }, 600);
  $(".linkes li").eq(1).animate({ top: 0 }, 700);
  $(".linkes li").eq(2).animate({ top: 0 }, 800);
  $(".linkes li").eq(3).animate({ top: 0 }, 900);
  $(".linkes li").eq(4).animate({ top: 0 }, 1000);
}

function closeSideNav() {
  let boxWidth = $(".side-nav-menu .nav-tab").outerWidth();
  $(".side-nav-menu ").animate({ left: -boxWidth }, 300);
  $(".open-close-icon").removeClass("fa-x");
  $(".open-close-icon").addClass("fa-align-justify");
  $(".linkes li").animate({ top: 300 }, 300);
}
closeSideNav();
$(".side-nav-menu i.open-close-icon ").click(() => {
  if ($(".side-nav-menu ").css("left") == "0px") {
    closeSideNav();
  } else {
    openSiNav();
  }
});

//<-----meals----->

function displayMeals(arr) {
  let cartona = "";

  for (let i = 0; i < arr.length; i++) {
    cartona += ` <div class="col-md-3">
               <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class ="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                <div class="meal-layer position-absolute d-flex align-items-center text-black p-2 cursor-pointer">
                    <h3>${arr[i].strMeal}</h3>
                </div>
               </div>
      </div>`;
  }

  rowData.innerHTML = cartona;
}

//<-----end meals----->

// <-----Categories----->

async function getCategories() {
  rowData.innerHTML = "";

  $(".inner-loading-screan").fadeIn(300);

  sectionMeals.innerHTML = "";
  let respons = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  respons = await respons.json();

  displayCategories(respons.categories);

  $(".inner-loading-screan").fadeOut(300);
}

function displayCategories(arr) {
  let cartona = "";

  for (let i = 0; i < arr.length; i++) {
    cartona += ` <div class="col-md-3">
               <div onclick="getCategoriesMeals('${
                 arr[i].strCategory
               }')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class ="w-100" src="${
                  arr[i].strCategoryThumb
                }" alt="" srcset="">
                <div class="meal-layer position-absolute text-center text-black p-2 cursor-pointer">
                    <h3>${arr[i].strCategory}</h3>
                    <p>${arr[i].strCategoryDescription
                      .split(" ")
                      .slice(0, 20)
                      .join(" ")}</p>
                </div>
               </div>
      </div>`;
  }

  rowData.innerHTML = cartona;
}
// <-----end Categories----->

// <----Area----->

async function getArea() {
  rowData.innerHTML = "";
  $(".inner-loading-screan").fadeIn(300);

  sectionMeals.innerHTML = "";
  let respons = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  respons = await respons.json();
  displayArea(respons.meals);
  $(".inner-loading-screan").fadeOut(300);
}

function displayArea(arr) {
  let cartona = "";

  for (let i = 0; i < arr.length; i++) {
    cartona += ` <div class="col-md-3">
               <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                  <i class="fa-solid fa-house-laptop fa-4x"></i>
                  <h3>${arr[i].strArea}</h3>
               </div>
      </div>`;
  }

  rowData.innerHTML = cartona;
}

// <-----end Area----->

// <-----Ingredients----->

async function getIngredients() {
  rowData.innerHTML = "";
  $(".inner-loading-screan").fadeIn(300);
  sectionMeals.innerHTML = "";
  let respons = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  respons = await respons.json();
  console.log(respons.meals);

  displayIngredients(respons.meals.slice(0, 20));
  $(".inner-loading-screan").fadeOut(300);
}

function displayIngredients(arr) {
  let cartona = "";

  for (let i = 0; i < arr.length; i++) {
    cartona += ` <div class="col-md-3">
               <div onclick="getIngredientsMeals('${
                 arr[i].strIngredient
               }')" class="rounded-2 text-center cursor-pointer">
                  <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                  <h3>${arr[i].strIngredient}</h3>
                  <p>${arr[i].strDescription
                    .split(" ")
                    .slice(0, 20)
                    .join(" ")}</p>
               </div>
      </div>`;
  }

  rowData.innerHTML = cartona;
}

// <-----end Ingredients----->

//<-----getCategoriesMeals----->

async function getCategoriesMeals(Category) {
  rowData.innerHTML = "";
  $(".inner-loading-screan").fadeIn(300);
  let respons = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${Category}`
  );
  respons = await respons.json();

  displayMeals(respons.meals.slice(0, 20));
  $(".inner-loading-screan").fadeOut(300);
}

//<-----getAreaMeals----->

async function getAreaMeals(area) {
  rowData.innerHTML = "";
  $(".inner-loading-screan").fadeIn(500);
  let respons = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  respons = await respons.json();

  displayMeals(respons.meals.slice(0, 20));
  $(".inner-loading-screan").fadeOut(300);
}

async function getIngredientsMeals(ingredients) {
  rowData.innerHTML = "";
  $(".inner-loading-screan").fadeIn(500);
  let respons = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
  );
  respons = await respons.json();

  displayMeals(respons.meals.slice(0, 20));
  $(".inner-loading-screan").fadeOut(300);
}

async function getMealDetails(mealId) {
  closeSideNav();
  rowData.innerHTML = "";
  $(".inner-loading-screan").fadeIn(300);

  sectionMeals.innerHTML = "";
  let respons = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  respons = await respons.json();
  console.log(respons.meals[0]);

  displayMealDetals(respons.meals[0]);

  $(".inner-loading-screan").fadeOut(300);
}

function displayMealDetals(meal) {
  $(".inner-loading-screan").fadeIn(500);
  sectionMeals.innerHTML = "";
  let Ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      Ingredients += `<li class="alert alert-info m-2 p-1"> ${
        meal[`strMeasure${i}`]
      }</li>`;
    }
  }

  let Tags = meal.strTags?.split(",");
  if (!Tags) Tags = [];

  let tagsStr = "";

  for (let i = 0; i < Tags.length; i++) {
    tagsStr += `  <li class="alert alert-danger m-2 p-1">${Tags[i]}</li>`;
  }

  let cartona = `
   <div class="col-md-4">
  <img class="w-100 rounded-2" src="${meal.strMealThumb}" alt="" />
  <h3>${meal.strMeal}</h3>
</div>
<div class="col-md-8">
  <h2>Instructions</h2>
  <p>
    ${meal.strInstructions}
  </p>
  <h3><span class="fw-bold">Area :</span>${meal.strArea}</h3>
  <h3><span class="fw-bold">Category : </span>${meal.strCategory}</h3>
  <h3>Recipes :</h3>
  <ul class="list-unstyled d-flex g-3 flex-wrap ">
    ${Ingredients}
  </ul>
  <h3>Tags :</h3>
  <ul class="list-unstyled d-flex g-3 flex-wrap ">
    ${tagsStr}
  </ul>
  
    <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
    <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
  

</div>

  `;
  rowData.innerHTML = cartona;
}

function SearchInput() {
  $(".inner-loading-screan").fadeIn(500);
  sectionMeals.innerHTML = `
  
  
        <div class="row py-4">
            <div class="col-md-6">
                <input onkeyup="SearchByName(this.value)" class="form-control bg-transparent  text-white" type="text" placeholder="search By Name">
            </div>
            <div class="col-md-6">
                <input onkeyup="SearchByFirstletter(this.value)" maxlength="1" class="form-control bg-transparent  text-white" type="text" placeholder="search By First Litter">
            </div>
        </div>
    
  
  `;

  rowData.innerHTML = "";
  $(".inner-loading-screan").fadeOut(500);
}

async function SearchByName(term) {
  $(".inner-loading-screan").fadeIn(500);
  let respons = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  respons = await respons.json();

  respons.meals ? displayMeals(respons.meals) : displayMeals([]);
  $(".inner-loading-screan").fadeOut(500);
}

async function SearchByFirstletter(term) {
  $(".inner-loading-screan").fadeIn(500);
  term == "" ? (term = "a") : "";
  let respons = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  respons = await respons.json();

  respons.meals ? displayMeals(respons.meals) : displayMeals([]);
  $(".inner-loading-screan").fadeOut(500);
}

function showContactUs() {
  rowData.innerHTML = `

     <div class="ContactUs vh-100 d-flex justify-content-center align-items-center">
          <div class="container w-75 text-center">
              <div class="row g-4">
                  <div class="col-md-6">
                  <input id="nameInput" onkeyup="inputsValidation()" class="form-control " type="text"  placeholder="Enter Your Name">
                   
                  <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                      Special characters and numbers not allowed
                  </div>
                  
                  </div>
                  <div class="col-md-6">
                      <input id="emailInput" onkeyup="inputsValidation()" class="form-control" type="Email"  placeholder="Enter Your Email">
                  
                      <div id="emailAlert" class="alert alert-danger w-100 mt-2  d-none">
                        Email not valid *exemple@hhhh.mmmmm
                      </div>


                    </div>
                  <div class="col-md-6">
                      <input id="phoneInput" onkeyup="inputsValidation()" class="form-control" type="text"  placeholder="Enter Your phone">
                  
                      <div id="phoneAlert" class="alert alert-danger w-100 mt-2  d-none">
                        Enter valid Phone Number
                    </div>
                  
                  
                    </div>
                  <div class="col-md-6">
                      <input id="ageInput" onkeyup="inputsValidation()" class="form-control" type="namber"  placeholder="Enter Your Age">
                      
                      <div id="ageAlert" class="alert alert-danger w-100 mt-2  d-none">
                        Enter valid age
                      </div>
                  
                  
                    </div>
                  <div class="col-md-6">
                      <input id="passwordInput" onkeyup="inputsValidation()" class="form-control" type="password"  placeholder="Enter Your password">
                  
                      <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid password *Minimum eight characters, at least one letter and one number:*
                    </div>
                  
                    </div>
                  <div class="col-md-6">
                      <input id="repassowerInput" onkeyup="inputsValidation()" class="form-control" type="namber"  placeholder="Repassower">
                     
                      <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid repassword 
                    </div>
                 
                  </div>
              </div>
              <button  id = "buttonSubmit" disabled class="btn btn-outline-danger mt-3">submit</button>
  
          </div>
      </div>
  `
  buttonSubmit = document.getElementById("buttonSubmit");

  document.getElementById("nameInput").addEventListener("focus",()=>{
    nameInpuClick = true;
  });
  document.getElementById("emailInput").addEventListener("focus",()=>{
    emailInputClick = true;
  });
  document.getElementById("phoneInput").addEventListener("focus",()=>{
    phoneInputClick = true;
  });
  document.getElementById("ageInput").addEventListener("focus",()=>{
    ageInputClick = true;
  });
  document.getElementById("passwordInput").addEventListener("focus",()=>{
    passwordInputClick = true;
  });
  document.getElementById("repassowerInput").addEventListener("focus",()=> {
    repasswordInputClick = true;
  });
}




let nameInpuClick = false;
let emailInputClick = false;
let phoneInputClick = false;
let ageInputClick = false;
let passwordInputClick = false;
let repasswordInputClick = false;





function inputsValidation() {
  if (nameInpuClick) {
    if (nameValidation()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (emailInputClick) {
    if (emailValidation()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (phoneInputClick) {
    if (phoneValidation()) {
      document
        .getElementById("phoneInput")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("phoneInput")
        .classList.replace("d-none", "d-block");
    }
  }

  if (ageInputClick) {
    if (ageValidation()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (passwordInputClick) {
    if (passwordValidation()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (repasswordInputClick) {
    if (repasswordValidation()) {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    buttonSubmit.removeAttribute("disabled");
  } else {
    buttonSubmit.setAttribute("disabled",true);
  }
}

function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailInput").value
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phoneInput").value
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageInput").value
  );
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("passwordInput").value
  );
}

function repasswordValidation() {
  return (
    document.getElementById("repassowerInput").value ==
    document.getElementById("passwordInput").value
  );
}
