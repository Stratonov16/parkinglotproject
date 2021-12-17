let user_id = document.getElementById("user_id");
let data;
const url = "http://localhost:8080/api/users";
async function users() {
  response = await fetch(url);
  data = await response.json();
  let fn, ln, email, id, balance;
  console.log(data);

  for (let i = 0; i < data.length; i++) {
    if (data[i].email == localStorage.getItem("email")) {
      fn = data[i].firstName;
      ln = data[i].lastName;
      email = data[i].email;
      balance = data[i].balance;
      id = i + 1;
      console.log(fn + " " + ln);
    }
  }
  user_id.textContent = id;
  document.getElementById("name").textContent = fn + " " + ln;
  document.getElementById("email").textContent = email;
  document.getElementById("balance").textContent = parseInt(balance);
  document.getElementById("car_no").textContent =
    localStorage.getItem("car_no");
  document.getElementById("log_out").onclick = function () {
    localStorage.clear();
    window.location = "login.html";
  };
  document.getElementById("book").onclick = function () {
    window.location = "index.html";
  };
  history();

  function history() {
    let list = document.getElementById("history");
    let history;
    let user;
    let li_items = "";
    for (let i = 0; i < data.length; i++) {
      if (data[i].email == localStorage.getItem("email")) {
        user = data[i];
        break;
      }
    }
    console.log(user);
    history = user.bookings;
    history = history.split(",");
    history.pop();

    console.log(history);
    for (let i = 0; i < history.length; i++) {
      let each_booking = history[i].split("-");
      let li = `<li> Date -  ${each_booking[0]} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   Time - ${each_booking[1]}-${each_booking[2]} &nbsp;&nbsp;&nbsp;&nbsp;❌</li>`;
      li_items += li;
      list.innerHTML = li_items;
    }
  }
}
users();
