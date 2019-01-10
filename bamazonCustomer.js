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
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
 start();
});

//Function to print out products

 // function which prompts the user for what action they should take
 function start() {

  connection.query("SELECT * FROM products", function(err, result, fields) {
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
      .then(function(answer) {
        var chosenId = answer.choice - 1;
       // console.log("you chose item:" + chosenId);
       var chosenAmount = answer.quantity;
       console.log("the chosen amount is" + chosenAmount);
       console.log(result[chosenId].product_name);

       if (chosenAmount > result[chosenId].stock_quantity) {
         console.log("Insufficient Quantity");
       } else {
         console.log("Yay boy");
         var total = chosenAmount * result[chosenId].price;
         console.log("Your total is: $" + total);
       }
     //   var chosenItem;

        
          // result[chosenId].item_id === answer.choice) {
          //   chosenItem = result[i];
          //   console.log(chosenItem);
          //   console.log(result[i].product_name);
          // }
         // console.log(result[i].item_id);
          //if (result[i].item_id === chosenId) {
          //   chosenItem = result[i];
          // }
        
        
      })
    
    })
  }
