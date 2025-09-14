import "../styles/style.css"

addElement()

function addElement() {
  // create a new div element for the navbar
  document.getElementById("button").innerHTML = '<ul><li><a href =' + '/' + ' aria-label = "Home">Home</a></li>'
                                                +'<li><a href =' + '/books' + '>Books</a></li>'
}

const widgetId = turnstile.render("#turnstile-container", {
  sitekey: "0x4AAAAAAB0kOyY0xu0gaHCA",
  callback: function (token) {
    console.log("Success:", token);
  },
});