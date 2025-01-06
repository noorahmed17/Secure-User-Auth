const signupForm = document.querySelector(".internal");
const signinForm = document.querySelector(".signinForm");

const showAlert = (msg, type) => {
  const existingAlert = document.querySelector(".alert");
  if (existingAlert) {
    existingAlert.remove();
  }

  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.innerHTML = `${msg}`;
  document.body.appendChild(alert);
};

const signup = async (formData) => {
  const url = "/secure-auth/users/signup";
  try {
    const res = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log(data);
    if (data.status === "success") {
      showAlert("You have successfully Signup", "success");
      window.setTimeout(() => {
        window.location.assign("/");
      }, 1500);
    } else {
      showAlert(data.message, "error");
    }
  } catch (err) {
    console.log(err);
    showAlert("An error occurred, Please try again.", "error");
  }
};

const signin = async (formData) => {
  const url = "/secure-auth/users/signin";
  try {
    const res = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
    if (data.status === "success") {
      showAlert("You have succesfully Loggedin", "success");
      window.setTimeout(() => {
        window.location.assign("/");
      }, 1500);
    } else {
      showAlert(data.message, "error");
    }
  } catch (err) {
    console.log(err);
    showAlert("An error occurred, Please try again.", "error");
  }
};

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = {
      username: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      passwordConfirm: document.getElementById("confirmPassword").value,
    };

    signup(formData);
  });
}

if (signinForm) {
  signinForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };
    signin(formData);
  });
}
