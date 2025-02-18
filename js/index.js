// document.addEventListener("DOMContentLoaded",() => {
//     const monsterContainer = document.getElementById("monster-container")
//     const createMonsterDiv = document.getElementById("create-monster")
//     const fowardButton = document.getElementById("foward")
//     const backwardbutton = document.getElementById("back")

//     const currentPage = 1; //initialize the first page

//     function fetchMonsters(page){
//         const limit = 50;
//         fetch(`GET http://localhost:3000/monsters/?_limit=${limit}&_page=${currentPage}`)
//         .then(response => response.json())
//         .then(monsters => {
//             monsterContainer.innerHTML = "";
//             monsters.forEach(monster => {
//                 displayMonster(monster)
//             })
//         })
//         .catch(error => console.error("Error fetching data from the APi :",error))
//     }

//     // create a function to display the monsters
//     function displayMoster(){
//         const monsterDiv = document.createElement("div")
//         monsterDiv.innerHTML = `
//         <h2>Name : ${monster.name} </h2>
//         <h3> Age : ${monster.age} </h3>
//         <p> Description : ${monster.description} </p>
//         `
//         monsterContainer.appendChild(monsterDiv)
//     }

//     // create a form to add data to the monster database 
//     function createMonsterForm(){
//         const form = document.createElement("form")
//         form.innerHTML = `
//         <input type = "text" id = "name" placeholder = "name">
//         <input type = "number" id = "age" placeholder = "Age">
//         <input type = "description" id = "text" placeholder = "Description">
//         <button type = "submit"> Create Monster </button>
//         `

//         const name = document.getElementById("name").value;
//         const age = parseFloat(document.getElementById("age").value)
//         const description = document.getElementById("text")

//         if(name && age && description){
//             createMonster({name,age,description})
//             form.reset();
//         }else {
//             alert("Please fill all the fields")

//         }
//     }
//     createMonsterDiv.appendChild(form)

//     // function to create a new monster 
//     function createMonster(monsterData){
//         fetch("http://localhost:3000/monsters",{
//             method : "POST",
//             headers : {
//                 "content-type" : "application/json",
//                 Accept : "application/json",
//             },
//             body:JSON.stringify(monsterData)

//         })
//         .then(response => response.json())
//         .then(newMonster => {
//             displayMoster(newMonster)
//         })
//         .catch(error => console.error("Error creating a new monster :",error))
//     }

//     // Add an event listener to handle the the foward button 
//     fowardButton.addEventListener("click", () => {
//         currentPage++;
//         fetchMonsters(page)
//     })
//     // Add an event listener to handle the backward button
//     backwardbutton.addEventListener("click", () => {
//         currentPage--;
//         fetchMonsters(page)
//     })
//     // functions that will be loaded when the page initially loads 
//     fetchMonsters(page)
//     createMonsterForm()
// })

document.addEventListener('DOMContentLoaded', () => {
  const monsterContainer = document.getElementById('monster-container');
  const createMonsterDiv = document.getElementById('create-monster');
  const forwardButton = document.getElementById('forward');
  const backButton = document.getElementById('back');
  console.log("foward button selected :",forwardButton)
  console.log("backward button selected :",backButton)

  let currentPage = 1; // Track the current page of monsters

  // Function to fetch and display monsters
  function fetchMonsters(page) {
    const limit = 1001;
    fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`)
      .then(response => response.json())
      .then(monsters => {
        monsterContainer.innerHTML = ''; // Clear previous monsters
        monsters.forEach(monster => displayMonster(monster));
      })
      .catch(error => console.error('Error fetching monsters:', error));
  }

  // Function to display a single monster
  function displayMonster(monster) {
    const monsterDiv = document.createElement('div');
    monsterDiv.innerHTML = `
      <h2>${monster.name}</h2>
      <h4>Age: ${monster.age}</h4>
      <p>${monster.description}</p>
    `;
    monsterContainer.appendChild(monsterDiv);
  }

  // Function to create the "Create Monster" form
  function createMonsterForm() {
    const form = document.createElement('form');
    form.innerHTML = `
      <input type="text" id="name" placeholder="Name">
      <input type="number" id="age" placeholder="Age">
      <input type="text" id="description" placeholder="Description">
      <button type="submit">Create Monster</button>
    `;

    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent form submission

      const name = document.getElementById('name').value;
      const age = parseFloat(document.getElementById('age').value);
      const description = document.getElementById('description').value;

      if (name && age && description) {
        createMonster({ name, age, description });
        form.reset(); // Clear the form
      } else {
        alert('Please fill out all fields!');
      }
    });

    createMonsterDiv.appendChild(form);
  }

  // Function to create a new monster
  function createMonster(monsterData) {
    fetch('http://localhost:3000/monsters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(monsterData),
    })
      .then(response => response.json())
      .then(newMonster => {
        displayMonster(newMonster); // Display the new monster
      })
      .catch(error => console.error('Error creating monster:', error));
  }

  // Event listener for the "Forward" button
  forwardButton.addEventListener('click', () => {
    currentPage++;
    fetchMonsters(currentPage);
  });

  // Event listener for the "Back" button
  backButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      fetchMonsters(currentPage);
    }
  });

  // Initial setup
  fetchMonsters(currentPage); // Load the first 50 monsters
  createMonsterForm(); // Add the "Create Monster" form
});