document.addEventListener("DOMContentLoaded", function(){
    var calculateButton = document.getElementById("calculateButton");

    function calculateBMI() {
        var heightInput = document.getElementById("height");
        var weightInput = document.getElementById("weight");
        var resultOutput = document.getElementById("result");

        var h = parseFloat(heightInput.value);
        var w = parseFloat(weightInput.value);

        if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
            alert("Please enter valid positive numbers for height and weight.");
            return;
        }

        var bmiValue = w / (h * h);

        console.log(bmiValue);
        resultOutput.textContent = bmiValue.toFixed(2);
    }

    calculateButton.addEventListener("click", calculateBMI);
});


