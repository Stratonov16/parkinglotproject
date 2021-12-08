const map1 = new Map();
let data;
let response;
map1.set(1, "a1");
map1.set(2, "b1");
map1.set(3, "c1");
map1.set(4, "d1");
map1.set(5, "e1");
map1.set(6, "f1");
map1.set(7, "a2");
map1.set(8, "b2");
map1.set(9, "c2");
map1.set(10, "d2");
map1.set(11, "e2");
map1.set(12, "f2");
map1.set(13, "a3");
map1.set(14, "b3");
map1.set(15, "c3");
map1.set(16, "d3");
map1.set(17, "e3");
map1.set(18, "f3");
map1.set(19, "a4");
map1.set(20, "b4");
map1.set(21, "c4");
map1.set(22, "d4");
map1.set(23, "e4");
map1.set(24, "f4");
map1.set(25, "a5");
map1.set(26, "b5");
map1.set(27, "c5");
map1.set(28, "d5");
map1.set(29, "e5");
map1.set(30, "f5");
map1.set(31, "a6");
map1.set(32, "b6");
map1.set(33, "c6");
map1.set(34, "d6");
map1.set(35, "e6");
map1.set(36, "f6");
for (let [index, id] of map1) {
  let slot_name = document.getElementById(id).textContent;
  document.getElementById(id).onmouseover = function () {
    document.getElementById(id).textContent = "25Rs";
    for (let [tindex, tid] of map1) {
      if (tindex == index) continue;
      else {
        document.getElementById(tid).style.opacity = 0.3;
      }
    }
  };
  document.getElementById(id).onmouseout = function () {
    document.getElementById(id).textContent = slot_name;
    for (let [tindex, tid] of map1) {
      if (tindex == index) continue;
      else {
        document.getElementById(tid).style.opacity = 1;
      }
    }
  };
}
let entryTime = localStorage.getItem("entryTime");

let exitTime = localStorage.getItem("exitTime");
console.log(entryTime + " " + exitTime + " times");

let h1, m1, h2, m2;
h1 = entryTime[0] + entryTime[1];
m1 = entryTime[3] + entryTime[4];
h2 = exitTime[0] + exitTime[1];
m2 = exitTime[3] + exitTime[4];
let h1curr, m1curr, h2curr, m2curr;

const url = "http://localhost:8080/api/slots";
async function slots() {
  response = await fetch(url);
  data = await response.json();
  for (let [index, id] of map1) {
    document.getElementById(id).onclick = () => {
      if (document.getElementById(id).style.backgroundColor == "green") {
        document.getElementById(id).style.backgroundColor = "#bada55";
        console.log("clicked");
      } else {
        document.getElementById(id).style.backgroundColor = "green";
      }
    };

    if (data[index - 1].status == 1) {
      if (data[index - 1].time == "open") {
        document.getElementById(id).style.backgroundColor = "green";
        continue;
      }
      if (data[index - 1].status == 1) {
        let time = data[index - 1].time;
        console.log(time + " this is the time in the db");
        h1curr = time[0] + time[1];
        m1curr = time[3] + time[4];
        h2curr = time[6] + time[7];
        m2curr = time[9] + time[10];
        console.log(h1curr + ":" + m1curr + "-" + h2curr + ":" + m2curr);
        if (
          (h1 < h1curr && m1 <= m1curr && h2 < h2curr && m2 <= m2curr) ||
          (h1 > h1curr && m1 >= m1curr && h2 > h2curr && m2 >= m2curr)
        ) {
          document.getElementById(id).style.backgroundColor = "green";
          // update time in db
          continue;
        } else {
          document.getElementById(id).style.backgroundColor = "red";
        }
      }
    }
    if (data[index - 1].status == 0)
      document.getElementById(id).style.backgroundColor = "red";
    if (data[index - 1].status == -1) {
      let new_id = id[1] + id[0].toUpperCase();
      //   console.log(data[index - 1].id);
      document.getElementById(new_id).disabled = true;
    }
    if (data[index - 1].status == -2)
      document.getElementById(id).style.visibility = "hidden";

    console.log(data[index - 1].status);
  }

  console.log(data);
}
slots();

document.getElementById("proceed").onclick = function getSelection() {
  console.log("here");
  for (let [index, id] of map1) {
    // console.log(document.getElementById(id).style.backgroundColor);
    if (
      document.getElementById(id).style.backgroundColor == "rgb(186, 218, 85)"
    ) {
      selection = id;
      console.log("id= " + selection);
      for (let [index, value] of map1) {
        if (map1.get(index) == selection) {
          selection = index;
          break;
        }
      }
      break;
    }
  }
  // main.js
  // let booking;
  // if(data[index - 1].time == "open")
  // {
  //   booking=
  // }
  // POST request using fetch()
  fetch(`http://localhost:8080/api/slots/${selection}`, {
    // Adding method type
    method: "PUT",

    // Adding body or contents to send
    body: JSON.stringify({
      status: "1",
      time: h1.toString() + ":" + m1 + "-" + h2.toString() + ":" + m2,
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
};
