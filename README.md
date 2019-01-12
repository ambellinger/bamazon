# Bamazon
Bamazon is a small, command line version of amazon.  Pulling from a mySQL database, Bamazon offers an array of products for the user to choose from. After answering two simple prompts, the user can pick and purchase a product. After which, they are presented with the total they owe. The database is then updated with the remaining stock.

## Technologies Used
* Javascript
* node.JS
* mySQL
* mySQL Workbench
* mySQL (NPM install)
* inquirer (NPM install)
* console.table (NPM install)


## APIs Used
* none

## Prerequisites
* NPM install (See Tech Used section above)

## How Does It Work?
Once the database is created, the node application and the database must be connected. 

After the connection is established, the program will run the function to start.

``` 
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "$$$$$",
  database: "bamazonDB"
});

connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made 
  start();
});


```



The user is then presented with the products available in the database

``` 
 connection.query("SELECT * FROM products", function (err, result, fields) {
    if (err) throw err;
    //console.log(result);
    console.table(result);
```
### Beginning the Program

![beginning-program](\images\bamazon_beginning_program.PNG)


Inquirer (NPM) is then used to save the user's input. 

```
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

```

The program then saves these choices and then compares their answers to the information stored in the database. 

```
.then(function (answer) {

        //For loop
        for (var i = 0; i < result.length; i++) {
          if (result[i].item_id === parseInt(answer.choice)) {
            chosenProduct = result[i];
            console.log("This is the result:" + chosenProduct);
          }
        };

```

The price is calculated by multiplying the amount given by the user and the price saved in the database.

```
 var total = chosenAmount * chosenProduct.price;
 console.log("Your total is: $" + total);
```

The database is then updated with the new amounts

```
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
```

### Purchasing

![purchasing-1-object](\images\bamazon_purchasing1.PNG)

### Purchasing multiple

![purchasing-multiple-objects](\images\bamazon_purchasing2.PNG)

If the amount that is chosen by the user, exceeds that of the amount in the database, the program alerts the user and the programs restarts.

```
if (chosenAmount > chosenProduct.stock_quantity) {
          console.log("Insufficient Quantity");
          start();
```

### Insufficient Quantity

![insufficient-quantity](\images\bamazon_insufficent_quantity.PNG)


The user can exit the program by selecting the letter q.

### Quitting

![quiting](\images\bamazon_quiting_program.PNG)

## Challenges and Future Improvements
Creating and populating the database using mySQL was rather easy. However, the application became harder to develop once the user's input had to be compared with the information stored within the database. 

As of right now, there are bugs remaning in the exiting of the application. Q must be selected in the first prompt; if an item is selected but then the user tries to exit on the second prompt, an error is thrown. In addition, what functionality the app has to exit is a bit awkward and could use some fine tuning. 

## Acknowlegments 
I want to recognize Phil's contribution to the exiting portion of the application. 