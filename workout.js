document.addEventListener("DOMContentLoaded", function () {
    var generatePlanButton = document.getElementById("generatePlanButton");

    function generateWorkoutPlan(workoutType, bodyPart) {
        const exerciseDatabase = {
            cardio: {
                legs: ["Running", "Cycling", "Jump Rope", "High Knees", "Burpees", "Squat Jumps", "Box Jumps", "Mountain Climbers", "Jumping Jacks", "Stair Climbing", "Rowing", "Elliptical", "Kickboxing", "Swimming", "Sprinting", "Lunges", "Skater Jumps", "Agility Ladder Drills", "Calf Raises", "Tuck Jumps", "Bike Sprints", "Jumping Lunges", "Side Shuffles", "Step Ups", "Kettlebell Swings", "Ankle Hops", "Leg Press Machine", "Running in Place", "Hill Sprints"],
                arms: ["Jumping Jacks", "Boxing", "Punches", "Speed Bag", "Jump Rope", "Arm Circles", "Mountain Climbers", "Burpees", "Rowing", "Kickboxing", "Elliptical", "Swimming", "Push-ups", "Plank", "Running with Arm Swings", "Battle Ropes", "Boxing Mitt Work", "Tricep Dips", "Jumping Lunges with Arm Raise", "Dumbbell Punches", "Sprint with Arm Press", "Medicine Ball Slams", "Cross Punches", "Jumping Push-ups", "Plyometric Push-ups", "Box Jumps with Dumbbells", "Lateral Raises", "Renegade Rows", "Speed Skaters"],
                abs: ["Sit-ups", "Crunches", "Leg Raises", "Russian Twists", "Bicycle Crunches", "Plank", "Mountain Climbers", "Hanging Leg Raises", "Windshield Wipers", "Side Plank", "Reverse Crunches", "Toe Touches", "Hollow Body Hold", "Dragon Flags", "Plank Jacks", "Oblique Crunches", "V-ups", "Flutter Kicks", "Russian Twists with Medicine Ball", "Scissor Kicks", "Knee Tucks", "Plank Variations", "Mountain Climbers with Twist", "Bosu Ball Crunches", "Ab Rollouts", "Toe Taps", "Pulse Ups", "Plank to Knee Tap", "Lying Leg Raise Twists", "Side Plank with Hip Dips"],
                chest: ["Push-ups", "Bench Press", "Dumbbell Flyes", "Chest Dips", "Chest Press Machine", "Incline Push-ups", "Pec Deck Machine", "Push-up Variations", "Medicine Ball Chest Pass", "Plyometric Push-ups", "Diamond Push-ups", "Chest Squeeze Press", "Isometric Chest Squeeze", "Running with Chest Press", "Medicine Ball Slam with Chest Press", "Clapping Push-ups", "Chest Flyes with Resistance Bands", "Incline Bench Sprints", "Medicine Ball Push-up Variations", "Explosive Chest Press", "Plyo Box Push-ups", "Pec Deck Machine with Jump", "Medicine Ball Chest Throws", "Bosu Ball Push-ups", "Chest Press with Medicine Ball Slam", "Incline Bench Sprint with Dumbbells", "Single-Arm Chest Press", "Elevated Push-ups", "Medicine Ball Toss and Catch"],
                back: ["Pull-ups", "Lat Pulldowns", "Deadlifts", "Single-Arm Dumbbell Rows", "Bent Over Rows", "Face Pulls", "Renegade Rows", "T-Bar Rows", "Seated Cable Rows", "Superman Exercise", "Hyperextensions", "Reverse Flyes", "Single-Arm Lat Pulldowns", "Pull-up Variations", "Rowing Machine", "Wide Grip Pull-ups", "Cable Pulldowns", "Close Grip Pull-ups", "Lat Pulldowns with Resistance Bands", "Dumbbell Rowing", "Swiss Ball Hyperextensions", "Inverted Rows", "TRX Rows", "Pull-ups with Leg Raise", "Hammer Strength Rows", "Single-Arm Lat Pulldowns with Twist", "Machine Rowing", "Reverse Grip Bent Over Rows", "Lat Pulldowns with Twist", "Renegade Rows with Rotation", "Single-Arm Dumbbell Rows with Kickback"]

            },
            weightTraining: {
                legs: ["Squats", "Lunges", "Leg Press", "Deadlifts", "Calf Raises", "Leg Curls", "Box Step-Ups", "Kettlebell Swings", "Romanian Deadlifts", "Leg Extensions", "Hamstring Curls", "Bulgarian Split Squats", "Front Squats", "Step-Ups", "Sumo Squats", "Hack Squats", "Walking Lunges with Dumbbells", "Single-Leg Romanian Deadlifts", "Dumbbell Box Step-Ups", "Smith Machine Squats", "Seated Leg Press", "Calf Raises on Leg Press Machine", "Barbell Lunges", "Goblet Squats", "Reverse Lunges", "Smith Machine Lunges", "Dumbbell Deadlifts", "Hamstring Curl Machine", "Weighted Step-Ups"],
                arms: ["Bicep Curls", "Tricep Dips", "Hammer Curls", "Tricep Kickbacks", "Close-Grip Bench Press", "Dumbbell Bicep Curls", "Skull Crushers", "Preacher Curls", "Overhead Tricep Extension", "Barbell Curl", "Cable Tricep Pushdown", "Reverse Grip Curls", "Concentration Curls", "Zottman Curls", "Hammer Curl with Rope", "EZ Bar Curl", "Tricep Rope Pushdown", "Reverse Grip Tricep Pushdown", "Incline Dumbbell Curl", "Tricep Kickbacks with Cable", "Cable Hammer Curls", "Spider Curl", "Seated Tricep Press", "Close-Grip EZ Bar Curl", "Dumbbell Concentration Curl", "Lying Tricep Extension", "Reverse Preacher Curl", "Overhead Dumbbell Tricep Extension", "Cross Body Hammer Curl"],
                abs: ["Weighted Crunches", "Hanging Leg Raises", "Ab Rollout", "Russian Twists with Weight", "Decline Sit-ups", "Weighted Plank", "Cable Crunch", "Woodchoppers", "Dragon Flags", "Medicine Ball Russian Twists", "Side Plank with Rotation", "Leg Pull-In", "Landmine 180s", "Pallof Press", "Hanging Windshield Wipers", "Barbell Rollout", "Swiss Ball Crunch", "Kneeling Cable Crunch", "Captain's Chair Leg Raise", "Plate Twist", "Reverse Crunch", "Russian Twist on Decline Bench", "Cable Woodchopper", "V-Up", "Plank with Alternating Leg Raise", "Cable Rope Crunch", "Seated Russian Twist", "Decline Reverse Crunch", "Oblique Crunch on Stability Ball"],
                chest: ["Barbell Bench Press", "Incline Dumbbell Press", "Chest Flyes", "Decline Bench Press", "Dumbbell Pullover", "Machine Chest Press", "Push-up Variations", "Chest Dips", "Dumbbell Squeeze Press", "Incline Cable Flyes", "Medicine Ball Push-ups", "Isometric Chest Squeeze", "Plyometric Push-ups", "Chest Squeeze Press", "Dumbbell Bench Press", "Pec Deck Machine", "Chest Press Machine", "Dumbbell Flyes on Stability Ball", "Low Cable Crossover", "Incline Barbell Bench Press", "Smith Machine Bench Press", "Chest Flyes on Cable Machine", "Machine Chest Fly", "Reverse Grip Bench Press", "Dumbbell Hex Press", "Single-Arm Dumbbell Press", "Wide Grip Push-up", "Incline Dumbbell Flyes", "Decline Dumbbell Bench Press"],
                back: ["Deadlifts", "Pull-ups", "Lat Pulldowns", "Bent Over Rows", "Single-Arm Dumbbell Rows", "T-Bar Rows", "Face Pulls", "Renegade Rows", "Seated Cable Rows", "Hyperextensions", "Reverse Flyes", "Single-Arm Lat Pulldowns", "Barbell Shrugs", "Deadlift Variations", "Bent Over Barbell Rows", "Machine Lat Pulldown", "Cable Rows", "One-Arm Lat Pulldown", "Dumbbell Rows", "Wide Grip Lat Pulldowns", "Close Grip Lat Pulldowns", "Inverted Rows", "Kroc Rows", "Machine Rows", "Pendlay Rows", "Reverse Grip Bent Over Rows", "Seated Machine Rows", "Lat Pulldown with Bands", "Face Pulls with Rope", "Lawnmower Rows"]

            }
        };

        const availableExercises = exerciseDatabase[workoutType][bodyPart];

        // Randomly select 8-12 exercises
        const numExercises = Math.floor(Math.random() * (12 - 10 + 1)) + 10;
        const shuffledExercises = shuffleArray(availableExercises).slice(0, numExercises);

        return shuffledExercises;
    }

    function shuffleArray(array) {
        const shuffled = array.slice();
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    function displayWorkoutPlan() {
        var workoutType = document.getElementById("workoutType").value;
        var bodyPart = document.getElementById("bodyPart").value;

        var workoutPlan = generateWorkoutPlan(workoutType, bodyPart);

        var planContainer = document.getElementById("planContainer");
        planContainer.innerHTML = "";

        workoutPlan.forEach(function (exercise) {
            var exerciseElement = document.createElement("div");
            exerciseElement.innerHTML = `<strong>${exercise}</strong>`;
            planContainer.appendChild(exerciseElement);
        });
    }

    generatePlanButton.addEventListener("click", displayWorkoutPlan);
});
