const signupForm = document.querySelector(".internal");

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
    console.log(res);
    if (res.ok) console.log("SIGH UP SUCCESFULLY");
  } catch (err) {
    console.log(err);
  }
};

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
