const endpoint = "./DataMiniProject.json";
const foods = [];
const food = document.querySelector('.foodName');

fetch(endpoint)
.then(response => { return response.json() })
.then(data => foods.push(...data));

function findMatches(wordToMatch, foods) {
    return foods.filter(item => {
        const regex = new RegExp(wordToMatch, 'gi');
        return item.Name.match(regex);
    });
}

function displayMatches() {
    if(this.value !== "") {
        const matchArray = findMatches(this.value, foods);
        
        const html = matchArray.map(item => {
            const regex = new RegExp(this.value, 'gi');
            const itemName = item.Name.replace(regex, `<span class="hl">${this.value}</span>`);
            const calVal = item["Calories Per 100"];
            return `
            <li class="foodName" data-calories="${calVal}">
            <span>${itemName}</span>
            </li>
            `;
        }).join('');
        suggestions.innerHTML = html;
        const food = document.querySelectorAll('.foodName');
        // const calories = 
        food.forEach(f => f.addEventListener('click', pushFood));
    }
    else {
        const html = `<li class="foodName">Filter for a food item</li>`;
        suggestions.innerHTML = html;
    }
}

function pushFood(){
    var foodItem = this;
    var calVal = this.dataset.calories;
    var li = foodItem.cloneNode(true);
    li.classList.remove("foodName");
    
    var amt = document.createElement("input");
    amt.type = "number";
    li.appendChild(amt);
    
    var removeBtn = document.createElement("input");
    removeBtn.type = "button";
    removeBtn.value = "Remove";
    removeBtn.onclick = remove;
    li.appendChild(removeBtn);
    document.getElementById("list").appendChild(li);
}
function remove(e){
    var ele = e.target;
    ele.parentNode.remove();
}

function addCalories() {
    const listItems = document.querySelectorAll('#list li');
    let totalCalories = 0;
    
    listItems.forEach(item => {
        const calVal = parseFloat(item.dataset.calories);
        // console.log(calVal);
        const amt = parseFloat(item.querySelector('input[type="number"]').value) || 0;
        
        totalCalories += (calVal * amt) / 100; 
    });
    
    let val = document.querySelector('.addedCalories');
    val.value = totalCalories.toFixed(2);
}

const searchInput = document.querySelector('.food-search');
const suggestions = document.querySelector('.suggestions');
const apply = document.querySelector('.apply');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
// const li = getElementById("list");
apply.addEventListener('click', addCalories);
// food.addEventListener('click', pushFood);
