const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});
function details() {
  console.log("hi");
  window.location = "index.html";
}

sign_up.onclick = function () {
  let sign_up = document.getElementById("sign_up");
  let fn = document.getElementById("fn");
  let ln = document.getElementById("ln");
  let email = document.getElementById("email_id");
  let pass = document.getElementById("password");
  let first_name = fn.value;
  let last_name = ln.value;
  let email_address = email.value;
  let password = pass.value;
  fetch(`http://localhost:8080/api/users`, {
    // Adding method type
    method: "POST",

    // Adding body or contents to send
    body: JSON.stringify({
      email: email_address,
      firstName: first_name,
      lastName: last_name,
      password: password,
      balance: 500,
      bookings: "",
    }),

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    // Converting to JSON
    .then((response) => response.json())

    // Displaying results to console
    .then((json) => console.log(json));

  alert("sign up successful");
};

let sign_in = document.getElementById("sign_in");
sign_in.onclick = function () {
  let data;
  const url = "http://localhost:8080/api/users";
  async function users() {
    response = await fetch(url);
    data = await response.json();
    // console.log(data);
    let login_email = document.getElementById("login_email");
    let login_password = document.getElementById("login_password");
    let flag = false;

    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);
      console.log("cbeuwbwebws");
      if (
        data[i].email == login_email.value &&
        data[i].password == login_password.value
      ) {
        if (login_email.value == "admin@admin") {
          window.location = "admin-dashboard.html";
          flag = true;
          break;
        }

        console.log("here");
        flag = true;
        let email_sign_in = document.getElementById("login_email").value;
        localStorage.setItem("email", email_sign_in);
        // let otp = Math.random();
        // otp = String(otp);
        // otp = otp[2] + otp[3] + otp[4] + otp[5] + otp[6] + otp[7];
        // localStorage.setItem("otp", otp);
        // Email.send({
        //   Host: "smtp.gmail.com",
        //   Username: "parkwithus70@gmail.com",
        //   Password: "parking@123",
        //   To: localStorage.getItem("email"),
        //   From: "parkwithus70@gmail.com",
        //   Subject: "OTP",
        //   Body: `Your OTP is ${otp}`,
        // }).then((message) => alert("OTP Sent to your registered email id"));
        // alert("OTP Sent to your registered email id");
        // window.location = "otp_verifiction.html";
        break;
      }
    }
    if (!flag) {
      alert("enter valid email or password");
    } else {
      sendMail();
      changeLoc();
    }
  }

  users();

  function sendMail() {
    let otp = Math.random();
    otp = String(otp);
    otp = otp[2] + otp[3] + otp[4] + otp[5] + otp[6] + otp[7];
    localStorage.setItem("otp", otp);
    Email.send({
      Host: "smtp.gmail.com",
      Username: "parkwithus70@gmail.com",
      Password: "parking@123",
      To: localStorage.getItem("email"),
      From: "parkwithus70@gmail.com",
      Subject: "OTP",
      Body: `Your OTP is ${otp}`,
    }).then((message) => alert("OTP Sent to your registered email id"));
  }
  function changeLoc() {
    setTimeout(function () {
      window.location = "otp_verifiction.html";
    }, 1000);
  }
};
