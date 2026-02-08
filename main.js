let ingredients = [];
let currentServings = 1;

const ingredientForm = document.getElementById("ingredientForm");
const servingsInput = document.getElementById("servings");
const errorDisplay = document.getElementById("error");
const ingredientListDiv = document.getElementById("ingredients");
const printAreaDiv = document.getElementById("printArea");

const navLinks = {
    'nav-home': 'home',
    'nav-recipes': 'recipes',
    'nav-about': 'about'
};

Object.keys(navLinks).forEach(linkId => {
    document.getElementById(linkId).addEventListener('click', () => {
        showSection(navLinks[linkId]);
    });
});

function showSection(sectionId) {
    document.querySelectorAll("section").forEach(sec => {
        sec.classList.remove("active");
    });
    document.getElementById(sectionId).classList.add("active");
    console.log(`Switched to section: ${sectionId}`);
}

ingredientForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const name = document.getElementById("name").value.trim();
    const amountValue = document.getElementById("amount").value;
    const amount = parseFloat(amountValue);
    const unit = document.getElementById("unit").value;

    if (!name || isNaN(amount) || amount <= 0) {
        errorDisplay.textContent = "Please enter a valid name and amount.";
        return;
    }

    errorDisplay.textContent = "";
    
   
    const newIngredient = {
        id: Date.now(),
        name: name,
        amount: amount,
        unit: unit
    };

    ingredients.push(newIngredient);
    renderRecipe();
    ingredientForm.reset();
});

function updateServings() {
    const newServings = parseInt(servingsInput.value);
    
    if (isNaN(newServings) || newServings <= 0) {
        alert("Please enter a valid number of servings (minimum 1).");
        return;
    }

    const factor = newServings / currentServings;
    
    ingredients = ingredients.map(item => ({
        ...item,
        amount: parseFloat((item.amount * factor).toFixed(2))
    }));

    currentServings = newServings;
    renderRecipe();
}


function renderRecipe() {
    ingredientListDiv.innerHTML = "";
    printAreaDiv.innerHTML = "";

    if (ingredients.length === 0) {
        ingredientListDiv.innerHTML = "<em>No ingredients added yet.</em>";
        printAreaDiv.innerHTML = "<em>List is empty.</em>";
        return;
    }

    ingredients.forEach((item, index) => {
       
        const itemElement = document.createElement("div");
        itemElement.style.marginBottom = "10px";
        itemElement.innerHTML = `
            <strong>${item.name}</strong>: ${item.amount} ${item.unit} 
            <button onclick="removeIngredient(${index})" 
                    style="padding:2px 8px; background:#d32f2f; margin-left:10px;">X</button>
        `;
        ingredientListDiv.appendChild(itemElement);
   
        const printLine = document.createElement("p");
        printLine.textContent = `• ${item.amount} ${item.unit} of ${item.name}`;
        printAreaDiv.appendChild(printLine);
    });
}

function removeIngredient(index) {
    ingredients.splice(index, 1);
    renderRecipe();
}

function clearAll() {
    if (confirm("Are you sure you want to clear the entire list?")) {
        ingredients = [];
        currentServings = 1;
        servingsInput.value = 1;
        renderRecipe();
    }
}
document.getElementById("updateServingsBtn").addEventListener("click", updateServings);