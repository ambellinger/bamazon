var mysql = require("mysql");
var inquirer = require("inquirer");

// call once somewhere in the beginning of the app
//https://www.npmjs.com/package/console.table
const cTable = require('console.table');


// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "DNB63088",
  database: "bamazonDB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});


// function which prompts the user for what action they should take
function start() {

  connection.query("SELECT * FROM products", function (err, result, fields) {
    if (err) throw err;
    //console.log(result);
    console.table(result);

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

        //For loop
        for (var i = 0; i < result.length; i++) {
          if (result[i].item_id === parseInt(answer.choice)) {
            chosenProduct = result[i];
            console.log("This is the result:" + chosenProduct);
          }
        };

        console.log("NAME" + chosenProduct.product_name);

        var chosenId = answer.choice;

        var chosenAmount = answer.quantity;
        console.log("the chosen amount is" + chosenAmount);
        ;
        console.log("OLD" + chosenProduct.stock_quantity)
        if (chosenAmount > chosenProduct.stock_quantity) {
          console.log("Insufficient Quantity");
          start();
        } else {

          var total = chosenAmount * chosenProduct.price;
          console.log("Your total is: $" + total);
          console.log("The old stock is: " + chosenProduct.stock_quantity)
          var newStock = chosenProduct.stock_quantity - chosenAmount;
          console.log("Your new stock is:" + newStock)

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
              console.log("Stock quantity changed");
              start();
            }
          )
        }


      })

  })
}