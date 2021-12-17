let selection = localStorage.getItem("selection");
let booking_time = localStorage.getItem("booking_time");
let in_time = document.getElementById("in-time");
let out_time = document.getElementById("out-time");
let services = document.getElementById("services");
let cost = document.getElementById("cost");
// let amt = 25;
if (localStorage.getItem("cleaning") == "true") {
  services.textContent += "Cleaning, ";
  //amt += 100;
}
if (localStorage.getItem("repairing") == "true") {
  services.textContent += "Repairing, ";
  //amt += 100;
}
if (localStorage.getItem("washing") == "true") {
  services.textContent += "Washing, ";
  //amt += 100;
}
if (localStorage.getItem("puncture") == "true") {
  services.textContent += "Puncture";
  //amt += 100;
}

in_time.textContent =
  booking_time[0] +
  booking_time[1] +
  booking_time[2] +
  booking_time[3] +
  booking_time[4];
out_time.textContent =
  booking_time[6] +
  booking_time[7] +
  booking_time[8] +
  booking_time[9] +
  booking_time[10];
console.log(booking_time);
console.log(selection);
let old_booking = localStorage.getItem("old_bookings");
console.log(old_booking);
let selected_slot = localStorage.getItem("selected_slot");
cost.textContent += localStorage.getItem("amt");

let new_bookings = old_booking.toString() + booking_time.toString() + ",";
console.log(new_bookings);
document.getElementById("slot_name").textContent = selected_slot;
let confirm_btn = document.getElementById("confirm_booking");
confirm_btn.onclick = function () {
  fetch(`http://localhost:8080/api/slots/${selection}`, {
    // Adding method type
    method: "PUT",

    // Adding body or contents to send
    body: JSON.stringify({
      status: "1",
      time: new_bookings,
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

  // localStorage.clear();
  //window.location = "index.html";
  const url = "http://localhost:8080/api/users";
  async function update_user() {
    let user_info;
    response = await fetch(url);
    user_info = await response.json();
    let curr_user;
    let user_id;
    let past_bookings;
    for (let i = 0; i < user_info.length; i++) {
      console.log(user_id);
      if (user_info[i].email == localStorage.getItem("email")) {
        curr_user = user_info[i];
        user_id = i + 1;
        console.log(curr_user);
        past_bookings = user_info[i].bookings;
        break;
      }
    }
    console.log(
      curr_user.email,
      curr_user.firstName,
      curr_user.lastName,
      "HI",
      curr_user.bookings
    );
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    // past_bookings = past_bookings.split(",");
    // console.log(past_bookings + "hi");
    // past_bookings.pop();
    // if (past_bookings.length > 2) amt *= 0.75;

    let fullDate = `${day}/${month}/${year}`;
    fetch(`http://localhost:8080/api/users/${user_id}`, {
      // Adding method type
      method: "PUT",

      // Adding body or contents to send
      body: JSON.stringify({
        email: curr_user.email,
        firstName: curr_user.firstName,
        lastName: curr_user.lastName,
        password: curr_user.password,
        balance:
          parseInt(curr_user.balance) - parseInt(localStorage.getItem("amt")),
        bookings: curr_user.bookings + (fullDate + "-" + booking_time) + ",",
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
  }
  update_user();
  sendBill();

  function sendBill() {
    Email.send({
      Host: "smtp.gmail.com",
      Username: "parkwithus70@gmail.com",
      Password: "parking@123",
      To: localStorage.getItem("email"),
      From: "parkwithus70@gmail.com",
      Subject: "Bill",
      Body: `Slot alloted-${localStorage.getItem("selected_slot")}, \n
      Booking-Time - ${localStorage.getItem("booking_time")}, \n
      Services Selected - ${document.getElementById("services").textContent}, \n
      Total Bill- ${document.getElementById("cost").textContent} \n`,
    }).then((message) =>
      alert("Booking Confirmed Check your email for the final Recipt")
    );
    setTimeout(() => {
      changeLoc();
    }, 2000);
  }
  function changeLoc() {
    window.location = "profile-user.html";
  }
};
