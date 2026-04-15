let users = JSON.parse(localStorage.getItem("users")) || [];

const userList = document.getElementById("userList");

function showUsers(){

    userList.innerHTML = "";

    users.forEach(u => {
        userList.innerHTML += `
        <div class="card">
            <img src="${u.image}" width="80">
            <h3>${u.name}</h3>
            <p>${u.email}</p>
            <p>${u.phone}</p>
            <p>${u.address}</p>
            <p>${u.city}</p>

            <button onclick="deleteUser(${u.id})">Delete</button>
        </div>
        `;
    });
}

showUsers();

function deleteUser(id){
    users = users.filter(u => u.id !== id);
    localStorage.setItem("users", JSON.stringify(users));
    showUsers();
}