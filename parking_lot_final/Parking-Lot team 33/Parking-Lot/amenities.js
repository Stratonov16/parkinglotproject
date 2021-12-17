let proceed = document.getElementById("lastProceed");

let modify = document.getElementById("modify");
modify.onclick = function () {
  window.location = "slots.html";
};
let washing = document.getElementById("washing");
let cleaning = document.getElementById("cleaning");
let repairing = document.getElementById("repairing");
let puncture = document.getElementById("puncture");
let entryTime = localStorage.getItem("booking_time");
let entryTime_hr = entryTime[0] + entryTime[1];
let entryTime_min = entryTime[3] + entryTime[4];
if (entryTime_hr >= 19 && entryTime_min != "00") {
  window.alert("Extra sevices only valid till 9PM");
  washing.disabled = true;
  cleaning.disabled = true;
  repairing.disabled = true;
  puncture.disabled = true;
}

proceed.onclick = function () {
  if (washing.checked) {
    localStorage.setItem("washing", "true");
  }
  if (!washing.checked) {
    localStorage.setItem("washing", "false");
  }

  if (cleaning.checked) {
    localStorage.setItem("cleaning", "true");
  }
  if (!cleaning.checked) {
    localStorage.setItem("cleaning", "false");
  }
  if (repairing.checked) {
    localStorage.setItem("repairing", "true");
  }
  if (!repairing.checked) {
    localStorage.setItem("repairing", "false");
  }
  if (puncture.checked) {
    localStorage.setItem("puncture", "true");
  }
  if (!puncture.checked) {
    localStorage.setItem("puncture", "false");
  }

  const url = "http://localhost:8080/api/users";
  async function getData() {
    let user_info;
    response = await fetch(url);
    user_info = await response.json();
    let curr_user;
    let user_id;
    let past_bookings;
    let amt = 0;
    if (localStorage.getItem("cleaning") == "true") {
      //services.textContent += "Cleaning, ";
      amt += 100;
    }
    if (localStorage.getItem("repairing") == "true") {
      //services.textContent += "Repairing, ";
      amt += 100;
    }
    if (localStorage.getItem("washing") == "true") {
      //services.textContent += "Washing, ";
      amt += 100;
    }
    if (localStorage.getItem("puncture") == "true") {
      //services.textContent += "Puncture";
      amt += 100;
    }
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

    past_bookings = past_bookings.split(",");
    console.log(past_bookings + "hi");
    past_bookings.pop();
    if (past_bookings.length > 2) amt *= 0.75;
    localStorage.setItem("amt", amt);

    window.location = "confirmation.html";
  }
  getData();
};
