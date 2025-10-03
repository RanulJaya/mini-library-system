const searchBtn = document.querySelector(".search-box")
const submitBtn = document.getElementById("submit-value")


// fetch data from the port
async function fecthData() {
    const url = "http://localhost:8080/list";
    try {
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }
        
        // await conection and add the all titles to a list
        const result = await response.json();
        var titles = new Array()
        
        for (let index = 0; index < result.length; index++) {
            titles.push(result[index]['title'])
        }

        return titles

    } catch (error) {
        console.error(error.message);
    }
}


// fetch data from the port this time the whole list
async function fecthDatalist() {
    const url = "http://localhost:8080/list";
    try {
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }

        // await conection and add the all titles to a list
        const result = await response.json();
        var titles = new Array()
        
        for (let index = 0; index < result.length; index++) {
            titles.push(result[index])
        }

        return titles

    } catch (error) {
        console.error(error.message);
    }
}

// check if the button is null otherwise it will error out
if (searchBtn !== null ) {
    
    searchBtn.addEventListener("keyup", test) 
    
    function test(){
        fecthData().then((value) => 
        {
            if(searchBtn.value !== null && searchBtn.value !== "" && searchBtn.value.length !== 0) {
                 
                // Use the filtered list to generate HTML
                 const filteredList = value.filter((e1) => e1.toLowerCase().includes(searchBtn.value.toLowerCase()));
                 document.querySelector(".dataset").innerHTML = filteredList.map(item => `<li class = "${item}" id="dataset1" > <a href="#" onclick="return false">${item}</a></li>`).join('');

                // check the search and add . to the titles when clicked
                const refClick = []
                
                //iterate through the index and replace it to a list
                for (let index = 0; index < value.length; index++) {
                    refClick[index] = document.querySelector("#dataset1." +value[index].replaceAll(' ', '.')) 
                }

                // iterate through the list when the ref has been clicked and show the content on the web
                for (let i = 0; i < refClick.length; i++) {
                    if(refClick[i] !== null)
                    {
                        refClick[i].addEventListener("click", function(){
                            fecthDatalist().then((val) => {
                                document.querySelector('.isbn').textContent = val[i]['isbn']
                        })
                            document.querySelector('.title').textContent =  refClick[i].querySelector('a').textContent
                        })
                    }
                }
                
            }
            else {
                // empty the text on web when the search is empty
                document.querySelector(".dataset").innerHTML = ""
                document.querySelector('.title').textContent = ""
                document.querySelector('.isbn').textContent = ""
            }
        })
        
    }
}

// submit button text
submitBtn.addEventListener("click", async function(){

    // init values
    const titleValue = document.getElementById('book-name-id').value
    const authorValue = document.getElementById('author-id').value
    const genreValue = document.getElementById('genre-id').value
    const yearValue = document.getElementById('year-id').value
    const ISBNValue = document.getElementById('isbn-id').value

    // ajax requests
    var request =  $.ajax({
        url:"/api",
        method:"POST",
        data: {title: titleValue, author: authorValue, genre: genreValue, year: yearValue, isbn: ISBNValue},
        dataType: "json"
    })

    // if successful, then print completed
    request.done(function(msg){
        console.log("Completed")
    })

    //  if fail, then send reason for fail
    request.fail(function( jqXHR, textStatus ) {
    console.log( "Request failed: " + textStatus );
    });
})

