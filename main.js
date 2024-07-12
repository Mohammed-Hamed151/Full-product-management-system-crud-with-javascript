// CRUDS

// get total function

// create  pro
// save localStorage
// clear

// read =show data
// count
// delete
// update
// search
// clean date

const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const createBtn = document.getElementById("create");
const tableBody = document.getElementById("tableBody");
const searchInput = document.getElementById("search");
const titleBtn = document.getElementById("TitleBtn");
const categoryBtn = document.getElementById("CategoryBtn");
const deleteAllBtn = document.getElementById("deleteAll");
const updateBtn = document.getElementById("updateBtn");
const deleteBtn = document.getElementById("deleteBtn");
const warnMessage = document.querySelector(".warnMessage");
let productArray;
let productIndex;
let searchType = "title";

if (localStorage.products != null) {
    productArray = JSON.parse(localStorage.products);
    showData();
    if (productArray.length > 1) {
        deleteAllBtn.style.display = "block";
        deleteAllBtn.innerHTML = `DeleteAll(${productArray.length})`;
    }
} else {
    productArray = [];
    tableBody.innerHTML = "";
    deleteAllBtn.style.display = "none";
}

createBtn.addEventListener("click", () => {
    if (createBtn.innerHTML === "Create") {
        if (
            title.value != "" &&
            price.value != "" &&
            taxes.value != "" &&
            ads.value != "" &&
            discount.value != "" &&
            category.value != "" &&
            total.innerHTML != ""
        ) {
            if (count.value == "" || count.value == 1) {
                createNumofEelement(1);
            } else {
                createNumofEelement(+count.value);
            }

            warnMessage.classList.remove("animated-warn");
            showData();
            clear();
        } else {
            ("please enter alll data");
            warnMessage.classList.add("animated-warn");
            warnMessage;
        }
    } else {
        productArray[productIndex].title = title.value;
        productArray[productIndex].price = price.value;
        productArray[productIndex].taxes = taxes.value;
        productArray[productIndex].ads = ads.value;
        productArray[productIndex].discount = discount.value;
        productArray[productIndex].category = category.value;
        productArray[productIndex].total = total.innerHTML;
        createBtn.innerHTML = "create";
        productIndex;
        productArray[productIndex];
        productArray;
        clear();
        getTotal();
        showData();
        localStorage.setItem("products", JSON.stringify(productArray));
    }
    if (productArray.length > 1) {
        deleteAllBtn.style.display = "block";
        deleteAllBtn.innerHTML = `DeleteAll(${productArray.length})`;
    }
    productArray.length;
});

// get tatal fuction
function getTotal() {
    if (price.value != "") {
        let totalvalue =
            +price.value + +ads.value + +taxes.value - +discount.value;
        total.innerHTML = totalvalue;
        total.style.backgroundColor = "#040";
    } else {
        total.style.backgroundColor = "#a00d02";
        total.innerHTML = "";
    }
}
function createNumofEelement(e) {
    for (i = 1; i <= e; i++) {
        let productData = {
            title: title.value,
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            category: category.value,
            total: total.innerHTML,
        };
        productArray.push(productData);
        productArray;
        localStorage.setItem("products", JSON.stringify(productArray));
    }
}
// clear function
function clear() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    category.value = "";
    total.innerHTML = "";
}

function showData() {
    tableBody.innerHTML = "";
    if (searchInput.value == "") {
        resultdata();
    } else {
        search();
    }
}
function resultdata() {
    productArray.forEach((pro, index) => {
        createRow(pro, index);
    });
}
function update(i) {
    productIndex = i;
    createBtn.innerHTML = "upDate";
    clear();
    title.value = productArray[i].title;
    price.value = productArray[i].price;
    taxes.value = productArray[i].taxes;
    ads.value = productArray[i].ads;
    category.value = productArray[i].category;
    getTotal();
}
function deleteOne(i) {
    productArray.splice(i, 1);
    productArray;
    localStorage.setItem("products", JSON.stringify(productArray));
    showData();
    if (productArray.length > 1) {
        deleteAllBtn.style.display = "block";
        deleteAllBtn.innerHTML = `DeleteAll(${productArray.length})`;
    } else {
        deleteAllBtn.style.display = "none";
        deleteAllBtn.innerHTML = ``;
    }
}

deleteAllBtn.addEventListener("click", () => {
    localStorage.clear();
    productArray = [];
    productArray;
    showData();
    getTotal();
    deleteAllBtn.style.display = "none";
});
titleBtn.addEventListener("click", () => {
    searchType = "title";
    searchInput.placeholder = "Search by Title";
});
categoryBtn.addEventListener("click", () => {
    searchType = "cateogry";
    searchInput.placeholder = "Search by Cateogry";
});
// function search 1 7

function search() {
    productArray.forEach((e, index) => {
        if (searchType === "title") {
            if (e.title.includes(searchInput.value)) {
                // (e);
                searchInput.value, "##", index, "##", e.title;
                createRow(e, index);
            }
        } else {
            if (e.category.includes(searchInput.value)) {
                // (e);
                searchInput.value, "##", index, "##", e.category;
                createRow(e, index);
            }
        }
    });
}

function createRow(e, index) {
    tableBody.innerHTML += `
    <tr>
    <td>${index + 1}</td>
    <td>${e.title}</td>
    <td>${e.price}</td>
    <td>${e.taxes}</td>
    <td>${e.ads}</td>
    <td>${e.discount}</td>
    <td>${e.total}</td>
    <td>${e.category}</td>
    <td><button id="updateBtn" onclick="update(${index})">Update</button></td>
    <td><button id="deleteBtn" onclick="deleteOne(${index})">delete</button></td>
    </tr>    
    `;
}
