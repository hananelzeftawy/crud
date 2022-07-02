var nameInp = document.getElementById("productName");
var categorInp = document.getElementById("productCategory");
var priceInp = document.getElementById("productPrice");
var descInp = document.getElementById("productDescription");
var table = document.getElementById("myTable");
var tableBody = document.getElementById("tableBody");
var updateBtn = document.getElementById("updateBtn");
var addBtn = document.getElementById("addBtn");
var searchInp = document.getElementById("searchInput");
var closeBtn = document.getElementById("close");
var inputs = document.querySelectorAll(".user-input");
var validateMsg = document.querySelectorAll(".validate");

// Argument Variable
var x = 1;

var productList = [];


// Get Local Storage Products
getFromLocal();

// Displaying Local Storage Products
displayProducts();



//------------------------Main Functions------------------------

// Add
function addProduct() {
  if (validate()) {
    addToList();
    addToLocal();
    displayProducts();
    clearForm();
  }
}

// Add To List 
function addToList() {
  var product = {
    productName: nameInp.value,
    productCategory: categorInp.value,
    productPrice: priceInp.value,
    productDescription: descInp.value,
  };
  productList.push(product);
}

// Validation

function validate () {
  var a = true;
  for (var i = 0; i < inputs.length; i++) {
    validateMsg[i].style.opacity = "0"
    if (inputs[i].value == "") {
      validateMsg[i].style.opacity = "1";
      a = false;
    }
  }
  return a;

}

// Display
function displayProducts() {
  var trs = '';

  for (var i = 0; i < productList.length; i++) {
    trs +=
      `
    <tr>
    <td>${i}</td>
    <td>${productList[i].productName}</td>
    <td>${productList[i].productCategory}</td>
    <td>${productList[i].productPrice}</td>
    <td>${productList[i].productDescription}</td>
    <td>
      <button class="btn btn-secondary" onclick = "updateForm(${i})"">
        <i class="fas fa-edit" ></i>
      </button>
    </td>
    <td>
      <button class="btn btn-danger" id = "" onclick="clearProduct(${i})">
        <i class="fas fa-trash"></i>
      </button>
    </td>
   
  </tr>`

    tableBody.innerHTML = trs;
    addToLocal();

  }
}

// Clear
function clearProduct(x) {


  productList.splice(x, 1);
  tableBody.innerHTML = "";
  addToLocal();
  displayProducts();
  switchBtn("toAdd");
  hideCloseBtn();

}

// Update Form
function updateForm(_x) {
  x = _x;
  nameInp.value = productList[x].productName;
  categorInp.value = productList[x].productCategory;
  priceInp.value = productList[x].productPrice;
  descInp.value = productList[x].productDescription;

  closeBtn.style.display = "inline";
  switchBtn("toUpdate");
}

// Update Product
function updateProduct() {

  if(validate()) {
    productList[x].productName = nameInp.value;
    productList[x].productCategory = categorInp.value;
    productList[x].productDescription = descInp.value;
    productList[x].productPrice = priceInp.value;
  
    displayProducts();
  
    switchBtn("toAdd");
  }



}


// Search
function searchProduct() {
  var highlighted;
  var trs = '';
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].productName.toLowerCase().includes(searchInp.value.toLowerCase())) {
      var index =productList[i].productName.toLowerCase().indexOf(searchInp.value.toLowerCase());
      var searchLength = searchInp.value.length;
      //Hilight Text When Search Input Has A String Value
      if(searchInp.value != ""){
        highlighted = highlightText(i, index, searchLength);
      } else {
        highlighted = productList[i].productName;
      }
      trs +=
        `
      <tr>
      <td>${i}</td>
      <td>${highlighted}</td>
      <td>${productList[i].productCategory}</td>
      <td>${productList[i].productPrice}</td>
      <td>${productList[i].productDescription}</td>
      <td>
        <button class="btn btn-secondary" onclick = "updateForm(${i})"">
          <i class="fas fa-edit" ></i>
        </button>
      </td>
      <td>
        <button class="btn btn-danger" id = "" onclick="clearProduct(${i})">
          <i class="fas fa-trash"></i>
        </button>
      </td>
     
    </tr>`
    }
  }
  tableBody.innerHTML = trs;
}

//--------------------------Support Functions-------------------------

// Add To Local Storage
function addToLocal() {
  localStorage.setItem("allProducts", JSON.stringify(productList));
}

// Get From Local Storage
function getFromLocal() {
  var x = localStorage.getItem("allProducts");

  if (x == null) {
    productList = [];
  } else {
    productList = JSON.parse(x);
  }
}

// Clear Form
function clearForm() {
  nameInp.value = "";
  categorInp.value = "";
  priceInp.value = "";
  descInp.value = "";
}

// Switch Buttons
function switchBtn(x) {
  if (x == "toUpdate") {
    updateBtn.style.display = "inline-block";
    addBtn.style.display = "none";
  }
  if (x == "toAdd") {
    updateBtn.style.display = "none";
    addBtn.style.display = "inline-block"
  }
}

// HighLight Search Text
function highlightText(i, index, length) {
  var x =   `${productList[i].productName.slice(0, index)}<span class='highlight'>${productList[i].productName.slice(index, index + length)}</span>${productList[i].productName.slice(index + length)}`
  return x;

}

// Hide Close Button While clicking
function hideCloseBtn() {
  closeBtn.style.display = "none";
}