import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css';

const symptomsData = {
  "Fatigue": ["Iron", "Vitamin B12", "Vitamin D"],
  "Brittle nails": ["Iron", "Biotin"],
  "Hair loss": ["Iron", "Zinc", "Biotin"],
  "Dry skin": ["Vitamin A", "Vitamin D", "Omega-3 fatty acids"],
  "Muscle weakness": ["Vitamin D", "Magnesium", "Potassium"],
  "Poor night vision": ["Vitamin A"],
  "Bleeding gums": ["Vitamin C"],
  "Slow wound healing": ["Vitamin C", "Zinc"],
  "Bone pain": ["Vitamin D", "Calcium"],
  "Depression": ["Vitamin D", "Omega-3 fatty acids", "B vitamins"],
  "Mouth ulcers": ["Vitamin B12", "Iron", "Folate"],
  "Frequent infections": ["Vitamin C", "Vitamin D", "Zinc"],
  "Bruising easily": ["Vitamin C", "Vitamin K"],
  "Muscle cramps": ["Magnesium", "Potassium", "Calcium"],
  "Irregular heartbeat": ["Potassium", "Magnesium"],
  "Numbness or tingling": ["Vitamin B12", "Vitamin B6"],
  "Poor concentration": ["Iron", "Vitamin B12", "Omega-3 fatty acids"],
  "Restless leg syndrome": ["Iron"],
  "Weak bones": ["Vitamin D", "Calcium", "Vitamin K"],
  "Acne": ["Zinc", "Vitamin A", "Omega-3 fatty acids"],
  "Cold hands and feet": ["Iron", "Vitamin B12"]
};

const nutrientData = {
  "Iron": ["red meat", "spinach", "lentils"],
  "Vitamin B12": ["eggs", "milk", "cheese", "meat"],
  "Vitamin D": ["sunlight exposure", "fatty fish", "egg yolks"],
  "Biotin": ["eggs", "almonds", "sweet potatoes"],
  "Zinc": ["oysters", "beef", "pumpkin seeds"],
  "Vitamin A": ["sweet potatoes", "carrots", "spinach"],
  "Omega-3 fatty acids": ["fatty fish", "chia seeds", "walnuts"],
  "Magnesium": ["almonds", "spinach", "cashews"],
  "Potassium": ["bananas", "potatoes", "beans"],
  "Vitamin C": ["oranges", "strawberries", "bell peppers"],
  "Calcium": ["milk", "yogurt", "leafy greens"],
  "Folate": ["leafy greens", "legumes", "fortified grains"],
  "B vitamins": ["whole grains", "legumes", "nuts"],
  "Vitamin K": ["leafy greens", "broccoli", "Brussels sprouts"],
  "Vitamin B6": ["poultry", "fish", "potatoes"]
};

const recommendationsData = {
  "Iron": {
    diet: "Include iron-rich foods in your diet, such as lean red meat, poultry, fish, beans, and fortified cereals.",
    exercise: "Moderate-intensity aerobic exercises can help improve iron absorption.",
    other: "Consider cooking in cast iron pots and pans. Avoid drinking tea or coffee with meals."
  },
  "Vitamin B12": {
    diet: "Consume B12-rich foods like eggs, dairy products, fish, and fortified plant-based milk.",
    exercise: "Regular, moderate exercise can help improve B12 absorption and utilization in the body.",
    other: "If you're vegan, consider B12-fortified nutritional yeast or supplements."
  },
  "Vitamin D": {
    diet: "Include fatty fish, egg yolks, and fortified foods in your diet.",
    exercise: "Engage in outdoor activities to get natural sunlight. Weight-bearing exercises can help improve vitamin D utilization.",
    other: "Spend 15-20 minutes in sunlight a few times a week, but always protect your skin from overexposure."
  },
  "Biotin": {
    diet: "Include biotin-rich foods like eggs, nuts, and sweet potatoes in your diet.",
    exercise: "Regular exercise can help improve overall nutrient absorption, including biotin.",
    other: "Avoid consuming raw egg whites in large quantities, as they can interfere with biotin absorption."
  },
  "Zinc": {
    diet: "Consume zinc-rich foods such as oysters, beef, and pumpkin seeds.",
    exercise: "Moderate exercise can help improve zinc absorption and utilization.",
    other: "Be cautious with high-dose zinc supplements as they can interfere with copper absorption."
  },
  "Vitamin A": {
    diet: "Eat foods rich in vitamin A or beta-carotene, such as sweet potatoes, carrots, and spinach.",
    exercise: "Regular exercise can help improve overall nutrient absorption and utilization.",
    other: "If you smoke, consider quitting as smoking can interfere with vitamin A absorption."
  },
  "Omega-3 fatty acids": {
    diet: "Include fatty fish, chia seeds, and walnuts in your diet.",
    exercise: "Regular aerobic exercise can help improve the body's ability to use omega-3 fatty acids.",
    other: "Consider fish oil supplements if you don't consume fish regularly."
  },
  "Magnesium": {
    diet: "Incorporate magnesium-rich foods like almonds, spinach, and cashews into your diet.",
    exercise: "Regular exercise, especially strength training, can help improve magnesium utilization in the body.",
    other: "Reduce consumption of alcohol and carbonated drinks, as they can interfere with magnesium absorption."
  },
  "Potassium": {
    diet: "Include potassium-rich foods like bananas, potatoes, and beans in your meals.",
    exercise: "Regular aerobic exercise can help maintain healthy potassium levels.",
    other: "Be cautious with salt substitutes as they often contain high levels of potassium."
  },
  "Vitamin C": {
    diet: "Consume a variety of fruits and vegetables, especially citrus fruits, bell peppers, and strawberries.",
    exercise: "Regular, moderate exercise can help improve overall nutrient absorption and immune function.",
    other: "Avoid overcooking vegetables as it can destroy vitamin C. Try to eat some raw fruits and vegetables daily."
  },
  "Calcium": {
    diet: "Include calcium-rich foods like dairy products, leafy greens, and fortified plant-based milk in your diet.",
    exercise: "Weight-bearing exercises and strength training can help improve bone density and calcium utilization.",
    other: "Ensure adequate vitamin D intake as it's crucial for calcium absorption."
  },
  "Folate": {
    diet: "Consume folate-rich foods like leafy greens, legumes, and fortified grains.",
    exercise: "Regular, moderate exercise can help improve overall nutrient absorption and utilization.",
    other: "If pregnant or planning to become pregnant, a folic acid supplement is often recommended."
  },
  "B vitamins": {
    diet: "Include a variety of whole grains, legumes, and nuts in your diet.",
    exercise: "Regular exercise can help improve B vitamin utilization in the body.",
    other: "Consider a B-complex supplement if you follow a restricted diet."
  },
  "Vitamin K": {
    diet: "Incorporate leafy greens, broccoli, and Brussels sprouts into your meals.",
    exercise: "Regular physical activity can help improve overall nutrient absorption and bone health.",
    other: "Be cautious if you're on blood-thinning medications, as vitamin K can interfere with their effectiveness."
  },
  "Vitamin B6": {
    diet: "Include poultry, fish, potatoes, and non-citrus fruits in your diet.",
    exercise: "Regular exercise can help improve overall vitamin absorption and utilization.",
    other: "Avoid excessive alcohol consumption, as it can interfere with B6 absorption."
  }
};

const mealPlannerData = {
  "Iron": ["Spinach and lentil soup", "Grilled chicken with broccoli", "Beef stir-fry with bell peppers"],
  "Vitamin B12": ["Scrambled eggs with cheese", "Grilled salmon with asparagus", "Greek yogurt parfait"],
  "Vitamin D": ["Fortified cereal with milk", "Tuna salad sandwich", "Mushroom and egg frittata"],
  "Biotin": ["Avocado toast with eggs", "Almonds and berries snack", "Sweet potato and black bean bowl"],
  "Zinc": ["Pumpkin seed trail mix", "Beef and vegetable stew", "Oyster po'boy sandwich"],
  "Vitamin A": ["Carrot and ginger soup", "Roasted sweet potato wedges", "Mango and spinach smoothie"],
  "Omega-3 fatty acids": ["Chia seed pudding", "Grilled mackerel with quinoa", "Walnut and strawberry salad"],
  "Magnesium": ["Spinach and almond salad", "Pumpkin seed crusted fish", "Dark chocolate and banana snack"],
  "Potassium": ["Banana smoothie bowl", "Baked potato with beans", "Coconut water and fruit salad"],
  "Vitamin C": ["Citrus fruit salad", "Bell pepper and hummus snack", "Strawberry and kiwi parfait"],
  "Calcium": ["Greek yogurt with almonds", "Sardine and avocado toast", "Kale and white bean soup"],
  "Folate": ["Lentil and spinach curry", "Asparagus and feta frittata", "Orange and leafy green salad"],
  "B vitamins": ["Whole grain avocado toast", "Chickpea and quinoa salad", "Almond and banana smoothie"],
  "Vitamin K": ["Kale and quinoa salad", "Broccoli and tofu stir-fry", "Brussels sprouts with garlic"],
  "Vitamin B6": ["Grilled chicken and potato salad", "Tuna and whole grain pasta", "Banana and almond butter smoothie"]
};

export default function Component() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [deficiencyResults, setDeficiencyResults] = useState([]);
  const [personalizedRecommendations, setPersonalizedRecommendations] = useState({});
  const [mealPlan, setMealPlan] = useState([]);
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("male");
  const [bmi, setBMI] = useState(null);
  const [waterIntake, setWaterIntake] = useState(0);
  const [sleepHours, setSleepHours] = useState(7);
  const [sleepQuality, setSleepQuality] = useState("average");
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [activeTab, setActiveTab] = useState("deficiency");
  const [stressLevel, setStressLevel] = useState(5);
  const [hydrationLog, setHydrationLog] = useState([]);
  const [nutritionLog, setNutritionLog] = useState([]);
  const [fitnessGoal, setFitnessGoal] = useState("");
  const [foodItem, setFoodItem] = useState("");
  const [calories, setCalories] = useState("");

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const analyzeDeficiencies = () => {
    if (selectedSymptoms.length === 0) {
      setDeficiencyResults(["Please select at least one symptom."]);
      setPersonalizedRecommendations({});
      return;
    }

    const potentialDeficiencies = new Set();
    selectedSymptoms.forEach(symptom => {
      symptomsData[symptom].forEach(nutrient => potentialDeficiencies.add(nutrient));
    });

    const results = Array.from(potentialDeficiencies).map(nutrient => 
      `${nutrient}: ${nutrientData[nutrient].join(', ')}`
    );

    setDeficiencyResults(results);

    const recommendations = {};
    potentialDeficiencies.forEach(nutrient => {
      if (recommendationsData[nutrient]) {
        recommendations[nutrient] = recommendationsData[nutrient];
      }
    });
    setPersonalizedRecommendations(recommendations);
  };

  const generateMealPlan = () => {
    const nutrients = Object.keys(personalizedRecommendations);
    const plan = nutrients.flatMap(nutrient => {
      const meals = mealPlannerData[nutrient] || [];
      return meals.slice(0, 2);
    });
    setMealPlan([...new Set(plan)]);
  };

  const calculateBMI = () => {
    if (!age || !height || !weight) {
      setBMI(null);
      return "Please fill in all fields.";
    }

    const ageNum = parseInt(age);
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    if (isNaN(ageNum) || isNaN(heightNum) || isNaN(weightNum)) {
      setBMI(null);
      return "Please enter valid numbers.";
    }

    if (ageNum < 2 || ageNum > 120) {
      setBMI(null);
      return "Please enter a valid age between 2 and 120.";
    }

    if (heightNum < 0.5 || heightNum > 2.5) {
      setBMI(null);
      return "Please enter a valid height in meters (between 0.5 and 2.5).";
    }

    if (weightNum < 10 || weightNum > 300) {
      setBMI(null);
      return "Please enter a valid weight in kilograms (between 10 and 300).";
    }

    const bmiValue = weightNum / (heightNum * heightNum);
    setBMI(parseFloat(bmiValue.toFixed(2)));
    return "";
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  const calculateWaterIntake = () => {
    if (!weight) {
      return "Please enter your weight in the BMI calculator first.";
    }
    const weightInKg = parseFloat(weight);
    const recommendedIntake = weightInKg * 0.033;
    return `Based on your weight, you should drink approximately ${recommendedIntake.toFixed(2)} liters of water per day.`;
  };

  const assessSleepQuality = () => {
    let assessment = "";
    if (sleepHours < 7) {
      assessment = "You may not be getting enough sleep. ";
    } else if (sleepHours > 9) {
      assessment = "You might be oversleeping. ";
    } else {
      assessment = "Your sleep duration is within the recommended  range. ";
    }

    switch (sleepQuality) {
      case "poor":
        assessment += "Consider improving your sleep environment and habits for better quality rest.";
        break;
      case "average":
        assessment += "There may be room for improvement in your sleep quality.";
        break;
      case "good":
        assessment += "You're experiencing good sleep quality. Keep up the good habits!";
        break;
    }

    return assessment;
  };

  const suggestActivityLevel = () => {
    switch (activityLevel) {
      case "sedentary":
        return "Try to incorporate more movement into your day. Start with short walks or gentle exercises.";
      case "light":
        return "Consider increasing your activity level. Aim for at least 150 minutes of moderate exercise per week.";
      case "moderate":
        return "You're doing well! Maintain this level of activity and consider adding some variety to your exercises.";
      case "very active":
        return "Great job staying active! Make sure to allow for proper rest and recovery between intense workouts.";
      default:
        return "";
    }
  };

  const assessStressLevel = () => {
    if (stressLevel <= 3) return "Your stress level is low. Keep up the good work!";
    if (stressLevel <= 7) return "Your stress level is moderate. Consider stress-management techniques.";
    return "Your stress level is high. It's important to find ways to reduce stress.";
  };

  const addWaterIntake = () => {
    const newLog = [...hydrationLog, { time: new Date(), amount: waterIntake }];
    setHydrationLog(newLog);
    setWaterIntake(0);
  };

  const addFoodItem = () => {
    if (foodItem && calories) {
      const newLog = [...nutritionLog, { item: foodItem, calories: parseInt(calories), time: new Date() }];
      setNutritionLog(newLog);
      setFoodItem("");
      setCalories("");
    }
  };

  const calculateTotalCalories = () => {
    const today = new Date().toDateString();
    return nutritionLog
      .filter(item => new Date(item.time).toDateString() === today)
      .reduce((total, item) => total + item.calories, 0);
  };

  useEffect(() => {
    localStorage.setItem('hydrationLog', JSON.stringify(hydrationLog));
    localStorage.setItem('nutritionLog', JSON.stringify(nutritionLog));
  }, [hydrationLog, nutritionLog]);

  useEffect(() => {
    const savedHydrationLog = JSON.parse(localStorage.getItem('hydrationLog')) || [];
    const savedNutritionLog = JSON.parse(localStorage.getItem('nutritionLog')) || [];
    setHydrationLog(savedHydrationLog);
    setNutritionLog(savedNutritionLog);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4">HealthPulse: Your Personal Health Analyzer and Wellness Tracker</h1>
      <p className="mb-6">Comprehensive health analysis and tracking tool</p>

      <div className="tab-buttons">
        <button
          className={`main-tab-button ${activeTab === 'deficiency' ? 'active' : ''}`}
          onClick={() => setActiveTab('deficiency')}
        >
          Nutrient Deficiency
        </button>
        <button
          className={`main-tab-button ${activeTab === 'bmi' ? 'active' : ''}`}
          onClick={() => setActiveTab('bmi')}
        >
          BMI Calculator
        </button>
        <button
          className={`main-tab-button ${activeTab === 'lifestyle' ? 'active' : ''}`}
          onClick={() => setActiveTab('lifestyle')}
        >
          Lifestyle Tracker
        </button>
        <button
          className={`main-tab-button ${activeTab === 'nutrition' ? 'active' : ''}`}
          onClick={() => setActiveTab('nutrition')}
        >
          Nutrition Log
        </button>
      </div>

      {activeTab === 'deficiency' && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Select your symptoms:</h2>
          <div className="symptom-grid">
            {Object.keys(symptomsData).map((symptom) => (
              <button
                key={symptom}
                className={`symptom-button ${selectedSymptoms.includes(symptom) ? 'active' : ''}`}
                onClick={() => toggleSymptom(symptom)}
              >
                {symptom}
              </button>
            ))}
          </div>
          <div className="center-button-container">
            <button
              className="center-button"
              onClick={analyzeDeficiencies}
            >
              Analyze Deficiencies
            </button>
          </div>
          {deficiencyResults.length > 0 && (
            <div className="mb-4 p-4 bg-gray-100 rounded">
              <h3 className="font-semibold mb-2">Potential Nutrient Deficiencies:</h3>
              <ul className="list-disc pl-5">
                {deficiencyResults.map((result, index) => (
                  <li key={index}>{result}</li>
                ))}
              </ul>
              {deficiencyResults[0] !== "Please select at least one symptom." && (
                <p className="text-sm mt-2">
                  Note: This analysis is based on common symptoms and should not be considered a medical diagnosis. Please consult with a healthcare professional for proper evaluation and treatment.
                </p>
              )}
            </div>
          )}
          {Object.keys(personalizedRecommendations).length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-2">Personalized Recommendations:</h3>
              {Object.entries(personalizedRecommendations).map(([nutrient, recommendations], index) => (
                <details key={index} className="mb-2">
                  <summary className="cursor-pointer font-semibold">{nutrient}</summary>
                  <div className="pl-4">
                    <p><strong>Dietary Advice:</strong> {recommendations.diet}</p>
                    <p><strong>Exercise Tips:</strong> {recommendations.exercise}</p>
                    <p><strong>Other Recommendations:</strong> {recommendations.other}</p>
                  </div>
                </details>
              ))}
              <button
                className="w-full bg-blue-500 text-white p-2 rounded mt-4"
                onClick={generateMealPlan}
              >
                Generate Meal Plan
              </button>
              {mealPlan.length > 0 && (
                <div className="mt-4 p-4 bg-gray-100 rounded">
                  <h4 className="font-semibold mb-2">Suggested Meals:</h4>
                  <ul className="list-disc pl-5">
                    {mealPlan.map((meal, index) => (
                      <li key={index}>{meal}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {activeTab === 'bmi' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">BMI Calculator</h2>
          <form onSubmit={(e) => { e.preventDefault(); const error = calculateBMI(); if (error) alert(error); }} className="space-y-4">
            <div>
              <label htmlFor="age" className="block mb-1">Age</label>
              <input
                id="age"
                type="number"
                className="w-full p-2 border rounded"
                placeholder="Enter your age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="2"
                max="120"
                required
              />
            </div>
            <div>
              <label htmlFor="height" className="block mb-1">Height (in meters)</label>
              <input
                id="height"
                type="number"
                className="w-full p-2 border rounded"
                placeholder="Enter your height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                min="0.5"
                max="2.5"
                step="0.01"
                required
              />
            </div>
            <div>
              <label htmlFor="weight" className="block mb-1">Weight (in kilograms)</label>
              <input
                id="weight"
                type="number"
                className="w-full p-2 border rounded"
                placeholder="Enter your weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                min="10"
                max="300"
                step="0.1"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Gender</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="male"
                    checked={gender === "male"}
                    onChange={() => setGender("male")}
                    className="mr-2"
                  />
                  Male
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="female"
                    checked={gender === "female"}
                    onChange={() => setGender("female")}
                    className="mr-2"
                  />
                  Female
                </label>
              </div>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Calculate BMI</button>
          </form>
          {bmi !== null && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <p className="font-semibold">Your BMI: {bmi}</p>
              <p>Category: {getBMICategory(bmi)}</p>
              <p className="text-sm mt-2">
                Note: BMI is not always an accurate indicator of health. Consult with a healthcare professional for a comprehensive assessment.
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'lifestyle' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Water Intake Calculator</h3>
            <p>{calculateWaterIntake()}</p>
            <div className="mt-2">
              <label htmlFor="water-intake" className="block mb-1">Track your daily water intake (in liters):</label>
              <input
                id="water-intake"
                type="number"
                className="w-full p-2 border rounded"
                value={waterIntake}
                onChange={(e) => setWaterIntake(parseFloat(e.target.value))}
                min="0"
                max="10"
                step="0.1"
              />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Sleep Quality Assessment</h3>
            <div className="space-y-2">
              <label htmlFor="sleep-hours" className="block mb-1">Hours of sleep per night:</label>
              <input
                id="sleep-hours"
                type="number"
                className="w-full p-2 border rounded"
                value={sleepHours}
                onChange={(e) => setSleepHours(parseInt(e.target.value))}
                min="0"
                max="24"
              />
              <label htmlFor="sleep-quality" className="block mb-1">Sleep quality:</label>
              <select
                id="sleep-quality"
                className="w-full p-2 border rounded"
                value={sleepQuality}
                onChange={(e) => setSleepQuality(e.target.value)}
              >
                <option value="poor">Poor</option>
                <option value="average">Average</option>
                <option value="good">Good</option>
              </select>
            </div>
            <p className="mt-2">{assessSleepQuality()}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Physical Activity Tracker</h3>
            <label htmlFor="activity-level" className="block mb-1">Activity level:</label>
            <select
              id="activity-level"
              className="w-full p-2 border rounded"
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
            >
              <option value="sedentary">Sedentary</option>
              <option value="light">Light</option>
              <option value="moderate">Moderate</option>
              <option value="very active">Very Active</option>
            </select>
            <p className="mt-2">{suggestActivityLevel()}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Stress Level Assessment</h3>
            <label htmlFor="stress-level" className="block mb-1">Rate your stress level (1-10):</label>
            <input
              id="stress-level"
              type="range"
              min="1"
              max="10"
              value={stressLevel}
              onChange={(e) => setStressLevel(parseInt(e.target.value))}
              className="w-full"
            />
            <p className="mt-2">{assessStressLevel()}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Hydration Tracker</h3>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={waterIntake}
                onChange={(e) => setWaterIntake(parseFloat(e.target.value))}
                min="0"
                step="0.1"
                className="w-20 p-2 border rounded"
              />
              <span>liters</span>
              <button
                onClick={addWaterIntake}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Log Water Intake
              </button>
            </div>
            <div className="mt-2">
              <h4 className="font-semibold">Today's Hydration Log:</h4>
              <ul>
                {hydrationLog
                  .filter(log => new Date(log.time).toDateString() === new Date().toDateString())
                  .map((log, index) => (
                    <li key={index}>
                      {new Date(log.time).toLocaleTimeString()}: {log.amount} liters
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Fitness Goal Setter</h3>
            <textarea
              value={fitnessGoal}
              onChange={(e) => setFitnessGoal(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your fitness goal here..."
            />
          </div>
        </div>
      )}

      {activeTab === 'nutrition' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Nutrition Log</h2>
          <div>
            <h3 className="text-xl font-semibold mb-2">Add Food Item</h3>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={foodItem}
                onChange={(e) => setFoodItem(e.target.value)}
                placeholder="Food item"
                className="w-1/2 p-2 border rounded"
              />
              <input
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="Calories"
                className="w-1/4 p-2 border rounded"
              />
              <button
                onClick={addFoodItem}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Today's Nutrition Log</h3>
            <ul>
              {nutritionLog
                .filter(log => new Date(log.time).toDateString() === new Date().toDateString())
                .map((log, index) => (
                  <li key={index}>
                    {log.item}: {log.calories} calories
                  </li>
                ))
              }
            </ul>
            <p className="mt-2 font-semibold">Total Calories: {calculateTotalCalories()}</p>
          </div>
        </div>
      )}
    </div>
  );
}