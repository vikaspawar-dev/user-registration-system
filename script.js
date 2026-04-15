const form = document.getElementById("form");

const username = document.getElementById("username");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const pincode = document.getElementById("pincode");
const address = document.getElementById("address");

const password = document.getElementById("password");
const cpassword = document.getElementById("cpassword");

const fileInput = document.getElementById("fileInput");
const uploadBox = document.getElementById("uploadBox");
const preview = document.getElementById("preview");

/* IMAGE */
uploadBox.onclick = () => fileInput.click();

fileInput.onchange = () => {
    const reader = new FileReader();

    reader.onload = () => {
        preview.src = reader.result;
        preview.style.display = "block";
    };

    reader.readAsDataURL(fileInput.files[0]);
};

/* PASSWORD SHOW */
document.getElementById("togglePassword").onclick = () => {
    password.type = password.type === "password" ? "text" : "password";
};

/* STRENGTH */
const bar = document.getElementById("strengthBar");
const text = document.getElementById("strengthText");

password.addEventListener("input", () => {

    let val = password.value;
    let s = 0;

    if(val.length >= 6) s++;
    if(/[A-Z]/.test(val)) s++;
    if(/[0-9]/.test(val)) s++;
    if(/[@$!%*?&]/.test(val)) s++;

    bar.className = "strength-bar";

    if(val.length === 0){
        text.innerText = "";
        return;
    }

    if(s <= 1){
        bar.classList.add("weak");
        text.innerText = "Weak";
    }
    else if(s === 2 || s === 3){
        bar.classList.add("medium");
        text.innerText = "Medium";
    }
    else{
        bar.classList.add("strong");
        text.innerText = "Strong";
    }
});

/* CHECKLIST */
const len = document.getElementById("len");
const upper = document.getElementById("upper");
const number = document.getElementById("number");
const special = document.getElementById("special");

password.addEventListener("input", () => {

    let v = password.value;

    update(len, v.length >= 6);
    update(upper, /[A-Z]/.test(v));
    update(number, /[0-9]/.test(v));
    update(special, /[@$!%*?&]/.test(v));
});

function update(el, ok){
    if(ok){
        el.classList.add("valid");
        el.classList.remove("invalid");
    }else{
        el.classList.add("invalid");
        el.classList.remove("valid");
    }
}

/* SUBMIT */
form.addEventListener("submit", (e) => {
    e.preventDefault();

    if(password.value !== cpassword.value){
        alert("Password not match");
        return;
    }

    const reader = new FileReader();

    reader.onload = () => {

        const user = {
            id: Date.now(),
            name: username.value,
            email: email.value,
            phone: "+91 " + phone.value,
            pincode: pincode.value,
            address: address.value,
            image: preview.src
        };

        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(user);

        localStorage.setItem("users", JSON.stringify(users));

        window.location.href = "result.html";
    };

    reader.readAsDataURL(fileInput.files[0]);
});