
document.addEventListener("DOMContentLoaded", function() {
document.getElementById("myForm").addEventListener("submit", function(event) {
  });
});
 function takeVal(event) {
  console.log('takevalue')
    event.preventDefault(); // Prevent default form submission behavior
    if (validation()) {
        var name = document.querySelector('input[name="name"]').value;
        var email = document.querySelector('input[name="email"]').value;
        var phone = document.querySelector('input[name="phone"]').value;
        var password = document.querySelector('input[name="password"]').value;

        var formData = {
            name: name,
            email: email,
            phone: phone,
            password: password
        };
        console.log("Form data:", formData);
        postData(formData);
    }
}
 //post method
  function postData(formData) {
    console.log("post data:", formData); 
  // This is a POST request to the server (http://localhost:5000/form) using the Fetch API. 
  //It sends the form data as JSON in the request body.
    fetch("http://localhost:5000/form", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData) ,
   })
  .then((data) => {
     location.reload();//When this line is commented out the POST API is called.
    console.log(data);
      updateTable();// Fetch and update the table after submitting the form
     })
  .catch((error) => {
    console.log("Error:", error);
  });

}
//get method
//This function sends a GET request to the server to retrieve data and update the table with the 
//received data.
function updateTable() {
  fetch('http://localhost:5000/form/get', {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
  .then((response) => response.json())
  .then((data) => {
    console.log("Data received from server:", data);
    displayTableData(data);
  })
  .catch((error) => {
    console.log("Error:", error);
  });
}
//This function updates the HTML table with the data received from the server.
function displayTableData(data) {
  // Get the table body element
  let tbody = document.getElementById("table-body");
  // Clear existing rows in the table
  tbody.innerHTML = '';

  // Iterate through the data and update the table
  data.forEach((item, index) => {
    let mytable = `<tr>
      <td scope="col">${index + 1}</td>
      <td scope="col"><span id="name-${index}">${item.name}</span></td>
      <td scope="col"><span id="email-${index}">${item.email}</span></td>
      <td scope="col"><span id="phone-${index}">${item.phone}</span></td>
      <td>
        <button type="button" class="btn btn-danger" id="deleteButton" onclick="deleteUser('${item._id}')"><i class="fa-solid fa-trash"></i></button>
        <button type="button" class="btn btn-danger" id="updateButton" onclick="updateUserInCell('${item._id}', ${index})"><i class="fa-sharp fa-solid fa-pencil"></i></button>
        <button type="button" class="btn btn-danger" onclick="saveChanges('${item._id}', ${index})"><i class="fa fa-check-square" aria-hidden="true"></i></button>
      </td>
    </tr>`;
  
    // Append the new row to the table body
    tbody.innerHTML += mytable;
  });
}

document.addEventListener('DOMContentLoaded', updateTable);
async function deleteUser(id) {
    try {
      const response = await fetch(`http://localhost:5000/form/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        console.log("Data deleted from server:", await response.json());
        location.reload();
      } else {
        throw new Error('Network error');
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }
  //this line defines a JavaScript function named makeEditable. It takes one parameter called element,
function makeEditable(element) {
  element.contentEditable ="true" ;
  element.focus();
}
function updateUserInCell(id, index, formData) {
  // Get the table cell elements for name, email, and phone
  const nameCell = document.getElementById(`name-${index}`);
  const emailCell = document.getElementById(`email-${index}`);
  const phoneCell = document.getElementById(`phone-${index}`);
// Make table cells editable
   makeEditable(nameCell);
  makeEditable(emailCell);
  makeEditable(phoneCell);
}
//This function saves the changes made to user data directly in the table cell by sending a PUT request 
//to the server.
function saveChanges(id, index) {
  // Get the updated values from the table cell
  const name = document.getElementById(`name-${index}`).textContent.trim();
  const email = document.getElementById(`email-${index}`).textContent.trim();
  const phone = document.getElementById(`phone-${index}`).textContent.trim();
  // Construct an object with the updated data
  const updatedData = {
      name: name,
      email: email,
      phone: phone
  };
 // PUT request to update data on the server
  fetch(`http://localhost:5000/form/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData)
  })
  .then((res) => {
    if (!res.ok) {
        throw new Error("Network error");
    }
    return res.json();
})
.then((data) => {
    console.log("Data updated successfully:", data);
    })
.catch((error) => {
    console.log("Error:", error);
});
}
//validation function
function validation() {
  var nameInput = document.querySelector('input[name="name"]');
  var name = nameInput.value.trim();

  var emailInput = document.querySelector('input[name="email"]');
  var email = emailInput.value.trim();

  var phoneInput = document.querySelector('input[name="phone"]');
  var phone = phoneInput.value.trim();

  var passwordInput = document.querySelector('input[name="password"]');
  var password = passwordInput.value.trim();

  var isValid = true;

  // Validate name field
  if (!name) {
      nameInput.classList.remove("is-valid");
      nameInput.classList.add("is-invalid");
      document.getElementById("fname-validation").innerText =
          "Name field is required";
      isValid = false;
  } else if (name.length < 5) {
      nameInput.classList.remove("is-valid");
      nameInput.classList.add("is-invalid");
      document.getElementById("fname-validation").innerText =
          "Name must be at least 5 characters long";
      isValid = false;
  } else if (!/^[a-zA-Z ]+$/.test(name)) {
      nameInput.classList.remove("is-valid");
      nameInput.classList.add("is-invalid");
      document.getElementById("fname-validation").innerText =
          "Name must contain only letters";
      isValid = false;
  } else {
      nameInput.classList.remove("is-invalid");
      nameInput.classList.add("is-valid");
      document.getElementById("fname-validation").innerText = "";
  }

  // Validate email field
  if (!email) {
      emailInput.classList.remove("is-valid");
      emailInput.classList.add("is-invalid");
      document.getElementById("email-validation").innerText =
          "Email field is required";
      isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
      emailInput.classList.remove("is-valid");
      emailInput.classList.add("is-invalid");
      document.getElementById("email-validation").innerText =
          "Invalid email address";
      isValid = false;
  } else {
      emailInput.classList.remove("is-invalid");
      emailInput.classList.add("is-valid");
      document.getElementById("email-validation").innerText = "";
  }

  // Validate phone field
  if (!phone) {
      phoneInput.classList.remove("is-valid");
      phoneInput.classList.add("is-invalid");
      document.getElementById("phone-validation").innerText =
          "Phone number is required";
      isValid = false;
  } else {
      phoneInput.classList.remove("is-invalid");
      phoneInput.classList.add("is-valid");
      document.getElementById("phone-validation").innerText = "";
  }

  // Validate password field
  if (!password) {
      passwordInput.classList.remove("is-valid");
      passwordInput.classList.add("is-invalid");
      document.getElementById("password-validation").innerText =
          "Password is required";
      isValid = false;
  } else {
      passwordInput.classList.remove("is-invalid");
      passwordInput.classList.add("is-valid");
      document.getElementById("password-validation").innerText = "";
  }

  return isValid; // Return the overall validation status

}





    //Overall, this codebase implements a simple CRUD (Create, Read, Update, Delete) application using a 
    //frontend built with HTML, Bootstrap, and JavaScript, and a backend built with Node.js, Express.js, 
    //and MongoDB. It allows users to add, view, update, and delete form data. 
    //The form data is stored in a MongoDB database.
    
    