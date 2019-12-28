document.addEventListener('DOMContentLoaded', function(){

    let hotdogsURL = `http://localhost:3000/hotdogs`

    getAllHotdogs();

    // list of condiments to select from
    let condimentArray = ["ketchup", "mustard", "onions", "jalapenos", "cream cheese", "hot sauce", "sauteed onions", "poppy seed bun", "relish", "dill pickle spear", "tomato slices", "pickled peppers", "celery salt", "all-beef hot dog", "Beyond Sausage Chicago Dog"]

    condimentArray.forEach(condiment => {
        createCondiment(condiment)
    })

    // create each condiment 
    function createCondiment(condiment){
        let condimentDiv = document.getElementById('condiment-list')
        let newCondimentDiv = document.createElement('div')
        let selectButton = document.createElement('input')
    
        let newCondiment = document.createElement('h6')
        newCondiment.textContent = condiment
        newCondimentDiv.className = "new-condiment-div"
        selectButton.type = 'radio'
    
        newCondimentDiv.appendChild(newCondiment)
        newCondimentDiv.appendChild(selectButton)
        condimentDiv.appendChild(newCondimentDiv)
    
        selectButton.addEventListener('click', function(){
            let ul = document.getElementById('new-hotdog-creation')
            let li = document.createElement('li')
    
            li.textContent = condiment
            ul.appendChild(li)
        })
    }

    // create list of all hotdogs
    function getAllHotdogs(){
        fetch(hotdogsURL)
        .then(resp => resp.json())
        .then(json => {
            json.forEach(hotdog => {
                createHotdog(hotdog.condiment)
            })
        })
    }
    
    // get list of ingredients
    document.getElementById('create-hotdog').addEventListener('click', function(event){
        let ingredientList = event.target.parentNode.querySelectorAll('li')
        let ingredientArray = []

        ingredientList.forEach(ingredient => {
            ingredientArray.push(ingredient.innerText)
        })

        let formattedData = ingredientArray.toString();
        postHotdog(formattedData);
        clearNewHotdog();
    })

    // clear new hotdog list of ingredients
    function clearNewHotdog(){
        let ul = document.getElementById('new-hotdog-creation')
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
          }
    }

    // create (POST) new hotdog
    function postHotdog(ingredients){
        fetch(hotdogsURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                condiment: ingredients,
                user_id: 1
            })
        })
        // .then(resp => console.log(resp))
        .catch(resp => console.log(resp))
        addHotdog(ingredients)
    }

    // create hotdog div
    function createHotdog(hotdog){
        let div = document.getElementById('all-hotdog-list')

        let newHotdogDiv = document.createElement('div')
        let newHotdogIngredients = document.createElement('p')

        newHotdogIngredients.textContent = hotdog
        let deleteButton = document.createElement('button')
        deleteButton.textContent = " X "

        newHotdogDiv.appendChild(newHotdogIngredients)
        newHotdogDiv.appendChild(deleteButton)
        div.appendChild(newHotdogDiv)

        deleteButton.addEventListener('click', event => deleteHotdog(event, hotdog))

        return newHotdogDiv;
    }

    // delete hotdog from database & remove from DOM
    function deleteHotdog(event, hotdog){
        fetch(`http://localhost:3000/hotdogs/${hotdog.id}`, {
            method: "DELETE"
        })
        
        let div = event.target.parentNode
        while (div.firstChild) {
            div.removeChild(div.firstChild);
          }
    }

    // add hotdog to DOM
    function addHotdog(hotdog){
        const hotdog_list = document.getElementById("all-hotdog-list")
        const div = createHotdog(hotdog)
        hotdog_list.appendChild(div)
    }






})





//*-----------STRETCH GOALS-------------*
//if user selects items for a special style of hot-dog, give yoda-fied life advice
// --> Seattle Dog, Chicago Dog, OR can you guess the Chicago Dog (or Chicago Red Hot) ingredients?
// Chicago Dog: hot dog is topped with yellow mustard, chopped white onions, bright green sweet pickle relish, a dill pickle spear, tomato slices or wedges, pickled sport peppers and a dash of celery salt;

// cannot create same hotdog twice

// separate homepage