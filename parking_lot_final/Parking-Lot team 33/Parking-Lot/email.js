function sendmail(params) {
  var tempparams = {
    from_name: document.getElementById("fromname").value,
    to_name: document.getElementById("toname").value,
    message: document.getElementById("msg").value,
  };
  emailjs
    .send("service_2gflhka", "template_irbl71m", tempparams)
    .then(function (res) {
      console.log("success", res.status);
    });
}
