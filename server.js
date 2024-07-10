// server.js
const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const Person = require("./models/person");

// Create a new person
const createPerson = () => {
  const person = new Person({
    name: "John Doe",
    age: 30,
    favoriteFoods: ["Pizza", "Burger"],
  });

  try {
    person.save();
    console.log("Person saved:", person);
  } catch (err) {
    if (err) return console.error(err);
  }
};

// Create multiple people
const createManyPeople = () => {
  const arrayOfPeople = [
    { name: "Alice", age: 25, favoriteFoods: ["Salad", "Pasta"] },
    { name: "Bob", age: 28, favoriteFoods: ["Steak", "Fries"] },
    { name: "Charlie", age: 35, favoriteFoods: ["Sushi", "Ramen"] },
  ];

  try {
    const listOfPeople = Person.create(arrayOfPeople);
    console.log("Person created:", listOfPeople);
  } catch (err) {
    if (err) return console.error(err);
  }
};

const findPeopleByName = async (name) => {
  try {
    const person = await Person.find({ name });
    console.log("People found by name:", person);
  } catch (err) {
    if (err) return console.error(err);
  }
};

// Find one person by favorite food
const findOneByFood = async (food) => {
  try {
    const personByFavFood = await Person.findOne({ favoriteFoods: food });
    console.log("People found by name:", personByFavFood);
  } catch (err) {
    if (err) return console.error(err);
  }
};

// Find a person by ID
const findPersonById = async (personId) => {
  try {
    const person = await Person.findById({ _id: personId });
    console.log("Person found by ID:", person);
  } catch (err) {
    if (err) return console.error(err);
  }
};

// Update a person by adding a favorite food
const addFavoriteFood = async (personId, food) => {
  try {
    const updatedPerson = await Person.findById({ _id: personId });
    updatedPerson.favoriteFoods.push(food);
    updatedPerson.save();
    console.log("person updated", updatedPerson);
  } catch (err) {
    if (err) return console.error(err);
  }
};

// Update a person's age
const updatePersonAge = async (personName, age) => {
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { name: personName },
      { age },
      { new: true }
    );
    console.log("Person updated:", updatedPerson);
  } catch (err) {
    if (err) return console.error(err);
  }
};

// Delete a person by ID
const deletePersonById = async (personId) => {
  try {
    const removedPerson = await Person.findByIdAndDelete(personId);
    console.log("Person found by ID:", removedPerson);
  } catch (err) {
    if (err) return console.error(err);
  }
};

// Delete all people named "Mary"
const deletePeopleByName = async (name) => {
  try {
    const person = await Person.deleteOne({ name });
    console.log("People removed:", result);
  } catch (err) {
    if (err) return console.error(err);
  }
};

// Find people who like burritos
const findPeopleWhoLikeBurritos = async () => {
  try {
    const people = await Person.find({ favoriteFoods: "burritos" })
      .sort("name")
      .limit(2)
      .select("-age")
      .exec();
    console.log("People who like burritos:", people);
  } catch (err) {
    if (err) return console.error(err);
  }
};

// Execute functions to test
createPerson();
createManyPeople();
findPeopleByName("Alice");
findOneByFood("Pasta");
findPersonById("668ef82634e5fe8bf6212d34");
addFavoriteFood("668eef24f972bd95ac9495a3", "hamburger");
updatePersonAge("Alice", 20);
deletePersonById("668eedebc9b333498aa04fd5");
deletePeopleByName("Mary");
findPeopleWhoLikeBurritos();
