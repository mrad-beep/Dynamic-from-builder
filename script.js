
let fields = [];

function addField() {

    let type = document.getElementById("fieldType").value;

     let label = prompt("Enter field label");

    let options = [];

    if(type === "dropdown" || type === "checkbox" || type === "radio"){

        let optionInput = prompt("Enter options separated by comma\nExample: BCA,MCA,BTech");

        options = optionInput.split(",");
    }
    

    let field = {
        type: type,
        label: label,
        options: options
    };

    fields.push(field);

    displayFields();
    generateForm();
}

function displayFields(){

    let container = document.getElementById("fields");

    container.innerHTML = "";

    fields.forEach(field => {

        container.innerHTML += `<p>${field.label} (${field.type})</p>`;

    });
}


function generateForm(){

    let formArea = document.getElementById("generatedForm");

    formArea.innerHTML = "";

    fields.forEach((field,index)=>{

        if(field.type === "text"){

            formArea.innerHTML += `
            <label>${field.label}</label><br>
            <input type="text" name="field${index}" required><br><br>
            `;
        }

        if(field.type === "dropdown"){

            let optionsHTML = "";

            field.options.forEach(opt=>{
                optionsHTML += `<option value="${opt}">${opt}</option>`;
            });

            
           
            formArea.innerHTML += `
            <label>${field.label}</label><br>
            <select name="field${index}">
                ${optionsHTML}
            </select><br><br>
            `;
        }

        if(field.type === "checkbox"){

             let optionsHTML = "";

             field.options.forEach(opt=>{
                optionsHTML += `<input type="checkbox" name="field${index}" value="${opt}"> ${opt} `;
            });

          
            formArea.innerHTML += `
            <label>${field.label}</label><br>
            ${optionsHTML}
            <br><br>
            `;
        }

        if(field.type === "radio"){

            let optionsHTML = "";

            field.options.forEach(opt=>{
                optionsHTML += `<input type="radio" name="field${index}" value="${opt}"> ${opt} `;
            });

           
             formArea.innerHTML += `
            <label>${field.label}</label><br>
            ${optionsHTML}
            <br><br>
            `;
        }

    });

}

/*document.getElementById("userForm").addEventListener("submit", function(e){

    e.preventDefault();

    let formData = new FormData(this);
    let data = {};

    formData.forEach((value,key)=>{
        data[key] = value;
    });

    // SHOW RESPONSE IN TABLE
    displayResponse(data);

    // CLEAR FORM
    this.reset();

});*/
document.getElementById("userForm").addEventListener("submit", async function(e){

    e.preventDefault();

    let formData = new FormData(this);
    let data = {};

    formData.forEach((value,key)=>{
        data[key] = value;
    });

    // Show on page
    displayResponse(data);

    // Send to backend
    await fetch("http://localhost:3000/submit-form",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    });

    alert("Form Submitted Successfully");

    this.reset();

});





function displayResponse(data){

    let table = document.getElementById("responseTable");

    let row = document.createElement("tr");
    /*let row = "<tr>";*/

    fields.forEach((field,index)=>{

        let value = data["field"+index] || "";

       /* row += `<td><b>${field.label}</b>: ${value}</td>`;*/
       let cell = document.createElement("td");
       // cell.innerHTML = `<b>${field.label}</b>: ${value}`;

         cell.innerHTML = "<b>"+field.label+"</b>: "+value;
        row.appendChild(cell);


    });
   
    let deleteCell = document.createElement("td");

    //let deleteBtn = document.createElement("button");

    let btn = document.createElement("button");
    btn.textContent = "Delete";
    
     btn.onclick = function(){
        row.remove();
    };
    //deleteBtn.innerText = "Delete";

    /*deleteBtn.onclick = function(){
        row.remove();
    };*/

   // deleteCell.appendChild(deleteBtn);

    //row.appendChild(deleteCell);
    deleteCell.appendChild(btn);
    row.appendChild(deleteCell);

    table.appendChild(row);

}

   
document.addEventListener("DOMContentLoaded", function(){

    const toggle = document.getElementById("themeToggle");

    toggle.addEventListener("click", function(){

        document.body.classList.toggle("dark");

    });

});


async function loadResponses(){

const response = await fetch("http://localhost:3000/responses");

const data = await response.json();

console.log(data);

}

loadResponses();

/*document.getElementById("userForm").addEventListener("submit", async function(e){

e.preventDefault();

const formData = new FormData(this);
let data = {};

formData.forEach((value,key)=>{
data[key] = value;
});

await fetch("/submit-form",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify(data)
});

alert("Form Submitted Successfully");

});*/


/*document.getElementById("userForm").addEventListener("submit", async function(e){

e.preventDefault();

const formData = new FormData(this);

let data = {};

formData.forEach((value, key) => {
data[key] = value;
});

try{

const response = await fetch("/submit-form",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify(data)
});

const result = await response.text();

alert(result);

}catch(error){
console.error(error);
alert("Error submitting form");
}

});*/