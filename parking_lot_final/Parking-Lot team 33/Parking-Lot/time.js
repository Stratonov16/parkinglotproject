let from = document.getElementById("entryDate");
let to = document.getElementById("exitDate");
let entryTime, exitTime;
let avaliability = document.getElementById("btnOne");
avaliability.onclick = function () {
  entryTime = from.value;
  exitTime = to.value;
  localStorage.setItem("entryTime", entryTime);
  localStorage.setItem("exitTime", exitTime);
  let car_no = document.getElementById("licensePlate").value;
  localStorage.setItem("car_no", car_no);
  aval_slots();
};
function aval_slots() {
  window.location = "slots.html";
}
