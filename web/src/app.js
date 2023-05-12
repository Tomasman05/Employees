const doc = {
    tbody: document.querySelector('#tbody'),
    operatorButton: document.querySelector('#operatorButton'),
    showLoginButton: document.querySelector("#showLoginButton"),
    loginButton: document.querySelector("#loginButton"),
    userInput: document.querySelector("#user"),
    passInput: document.querySelector("#pass"),
    loginModal: new bootstrap.Modal("#loginModal"),
    table :document.querySelector("#table"),
    showOperatorBtn: document.querySelector("#showOperatorBtn"),
    idInput:document.querySelector("id"),
    nameInput:document.querySelector("name"),
    cityInput:document.querySelector("city"),
    salaryInput:document.querySelector("salary"),
}

const state = {
    employees: [],
    host: 'http://localhost:8000/api/',
    logedin: false,
    adding :true
}

window.addEventListener('load', () => {
    init()
})


function init() {
    doc.operatorButton.addEventListener('click', () => {
        startOperation();
    });
    doc.loginButton.addEventListener("click", ()=>{
        startLogin()
    })
    changeVisible()
    getEmployees()    
}

function startOperation() {
    console.log('működik')
    let employee = {
        
    }
}

function startLogin(){
    console.log("Azonosítás...")
    let userData = {
        name: doc.userInput.value,
        password: doc.passInput.value

    }
    login(userData)
}

function login (userData){
    let endpoint = "login"
    let url = state.host + endpoint
    let headers = {
        'Content-Type':'application/json'
    }
    fetch(url, {
        method: 'post',
        headers: headers,
        body: JSON.stringify(userData)
    })
    .then(response=> response.json())
    .then(result => {
        console.log(result)
        let token = result.token
        localStorage.setItem("token", result.token)
        localStorage.setItem("name", result.name)
        deleteInputs()
        doc.loginModal.hide()
        state.logedin = true
        changeVisible()
    })
    
}

function changeVisible(){
    state.logedin = checkLogedIn()
    if(state.logedin){
        doc.showLoginButton.classList.add("invisible")
        doc.showOperatorBtn.classList.remove("invisible")
        doc.table.classList.remove("invisible")
    }
    else{
        doc.showLoginButton.classList.remove("invisible")
        doc.showOperatorBtn.classList.add("invisible")
        doc.table.classList.add("invisible")
    }
}

function checkLogedIn(){
    if(localStorage.getItem('token')){
        return true
    }
    else {
        return false
    }
}

function getEmployees() {
    let endpoint = 'employees'
    let url = state.host + endpoint;
    fetch(url)
    .then(res => res.json())
    .then(res => {
        console.log(res)
        state.employees = res;
        renderTable()
    });
}

function renderTable() {
    var rows = '';
    state.employees.forEach(emp => {
        rows += `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.city}</td>
                <td>${emp.salary}</td>
            </tr>
        `
    });
    doc.tbody.innerHTML = rows;
}
function deleteInputs(){
    doc.userInput.value = ""
    doc.passInput.value = ""
}