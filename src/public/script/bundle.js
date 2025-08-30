const searchBtn = document.querySelector(".search-box")


async function fecthData() {
    const url = "http://localhost:8080/list";
    try {
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }

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


if (searchBtn !== null ) {
    
    searchBtn.addEventListener("keyup", test) 
    
    function test(){
        fecthData().then((value) => 
        {
            if(searchBtn.value !== null && searchBtn.value !== "" && searchBtn.value.length !== 0) {
                 // Use the filtered list to generate HTML
                 const filteredList = value.filter((e1) => e1.toLowerCase().includes(searchBtn.value.toLowerCase()));
                 document.querySelector(".dataset").innerHTML = filteredList.map(item => `<li class = "dataset1" >${item}</li>`).join('');
                 
            }
            else {
                document.querySelector(".dataset").innerHTML = ""
            }
        })
        
    }
}