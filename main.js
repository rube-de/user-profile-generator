var url = "https://randomuser.me/api/";

var btn = document.querySelector("#btn");
btn.addEventListener("click", function() {
  fetch(url)
    .then(handleErrors)
    .then(parseJSON)
    .then(updateProfile)
    .catch(printError);
});

function handleErrors(request) {
  if (!request.ok) {
    throw Error(request.status);
  }
  return request;
}

function parseJSON(request) {
  return request.json().then(function(data){
    return data.results[0];
  });
}

function updateProfile(data) {
  var fullname = document.querySelector("#fullname");
  var username = document.querySelector("#username");
  var email = document.querySelector("#email");
  var city = document.querySelector("#city");
  var avatar = document.querySelector("#avatar");

  fullname.textContent = data.name.first.capitalize() + " " + data.name.last.capitalize();
  username.textContent = data.login.username;
  email.textContent = data.email;
  city.textContent = data.location.city.capitalize();
  avatar.src = data.picture.medium;
};

function printError(error){
  console.log(error);
}


String.prototype.capitalize = function(lower) {
    return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};