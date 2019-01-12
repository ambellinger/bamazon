var mysql = require("mysql");
var inquirer = require("inquirer");

//https://www.npmjs.com/package/console.table
const cTable = require('console.table');


// mySQL Connection to the database.
var connection = mysql.createConnection({
  host: "localhost",

  // Port
  port: 3306,

  // Username
  user: "root",

  // Password
  password: "DNB63088",
  database: "bamazonDB"
});

//Create a global variable to allow the user to exit the program
var quit = "";

// Connect to the mySQL Server and database
connection.connect(function (err) {
  if (err) throw err;
  // After the connection is made, start the program.
  start();
});


// Main program function
function start() {

  //Selects all the data in the products table (i.e. everything bamazon offers)
  connection.query("SELECT * FROM products", function (err, result, fields) {
    if (err) throw err;

    //Displaying the table if the user has not decided to leave. 
    if (quit != "q") {
      //utilizing the table NPM package to present a clear looking table without all the extra code.
      console.table(result);


      //Prompts
      inquirer
        .prompt([
          {
            name: "choice",
            message: "What is the ID of the item you would like to purchase? [Quit with Q]",
            type: "input"
          },
          {
            name: "quantity",
            type: "input",
            message: "How many would you like? [Quit with Q]"
          }
        ])
        .then(function (answer) {

          if (answer.choice.toLowerCase() === "q") {
            //Changes the variable to quit.
            quit = "q";
            //Quiting  ends the connection and returns quit
            connection.end();
            return quit;
          }

          //For loop that runs through all the ids in the database and compares them to the id selected by the user.
          for (var i = 0; i < result.length; i++) {
            if (result[i].item_id === parseInt(answer.choice)) {
              chosenProduct = result[i];
            }
          };

          //Saves the choices to a variable so that it can be used later to update database.
          var chosenId = answer.choice;
          var chosenAmount = answer.quantity;

          //Alert the user to the product they chose.
          console.log("NAME OF THE PRODUCT CHOSEN " + chosenProduct.product_name);
          console.log("-------------");

          //Alert the user to the amount they chose.
          console.log("THE AMOUNT YOU CHOSE:  " + chosenAmount);
          console.log("-------------");

          //Check to see if the amount they chose exceeds the amount in stock, if so, alert and restart program.
          if (chosenAmount > chosenProduct.stock_quantity) {
            console.log("Insufficient Quantity");
            start();

          } else {

            //Calcuate the total and alert customer.
            var total = chosenAmount * chosenProduct.price;
            console.log("Your total is: $" + total);
            console.log("-------------");
            // console.log("The old stock is: " + chosenProduct.stock_quantity)


            //Calculate the stock remaining
            var newStock = chosenProduct.stock_quantity - chosenAmount;
            // console.log("Your new stock is:" + newStock)


            //Update the database and then restart program.
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  stock_quantity: newStock
                },
                {
                  item_id: chosenId
                }
              ],
              function (error) {
                if (error) throw err;
                // console.log("Stock quantity changed");
                start();
              }
            )
          }
        })
    }
    // If the quit variable it q, the program will exit the recursion loop
    else {
      connection.end();
    }

  }

  )
}