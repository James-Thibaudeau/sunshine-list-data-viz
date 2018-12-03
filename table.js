let tableBody = document.querySelector("tbody");

function rowClick(e) { 
    if (e.target === this) {
        console.log(e.target.value)
    } else {
        console.log(e.target.parentNode.value)
       
    }
}

data.map(d => {    
    let employee = document.createElement("tr");
    let name = document.createElement("td");
    let position = document.createElement("td");
    let salary = document.createElement("td");
    let change = document.createElement("td");

    name.innerText = d.full_name;
    position.innerText = d.position;
    salary.innerText = "$"+ parseFloat(d.total).toFixed(2);
    change.innerText = (d.change_percentage === "None" ? "---" : ("%"+ d.change_percentage)); 

    employee.appendChild(name);
    employee.appendChild(position);
    employee.appendChild(salary);
    employee.appendChild(change);

    employee.value = d.full_name;

    employee.addEventListener("click", rowClick, true);

    tableBody.appendChild(employee)
});