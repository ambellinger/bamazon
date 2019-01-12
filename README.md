# Bamazon
Bamazon is a small, command line version of amazon.  Pulling from a mySQL database, Bamazon, offers an array of products for the user to choose from. After answering two simple prompts, the user can pick and purchase a product. Afterwhich, they are presented with the total and the database is updated.

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
The database must be created first. Once the database is created, the node application and the database must be connected. 

Once the connection is established, the program will run the function to start.

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
  // run the start function after the connection is made to prompt the user
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

If the amount that is chosen by the user, exceeds that of the amount in the database, the program alerts the user and the programs restarts.

```
if (chosenAmount > chosenProduct.stock_quantity) {
          console.log("Insufficient Quantity");
          start();
```

### Results - concert-this

![concert-this](images/liri-concert-this-image.PNG)

### Results - movie-this

![movie-this](images/liri-movie-this-image.PNG)

### Results - movie-this w/ Placeholder

![movie-this-placeholder](images/liri-movie-this-image-placeholder.PNG)

### Results - spotify-this-song

![spotify-this-song](images/liri-spotify-this-song-image.PNG)

### Results - spotify-this-song w/ Placeholder

![spotify-this-song=placeholder](images/liri-spotify-this-song-image-placeholder.PNG)

### Results - do-what-it-says
For the command "do-what-it-says", text written in the random.txt file is plugged into the Spotify function.

![do-what-it-says](images/liri-do-what-it-says.PNG)


## Challenges and Future Improvements
There were many challenges creating this project, particularlly working with the Spotify documentation. It was difficult understanding exactly what was needed to get it to run.

One challenge that remains to be solved is expanding the capabilies of the do-what-it-says function. As of right now, it is only recognizes the spotify-this-song command. I believe an if/else or switch statement will be necessary (the possible hows and what has already been tried can be found at the bottom of liri.js)

Commented out code that hasn't been deleted has been saved for this particular reason.

## Acknowlegments 
Although this is merely a homework assignment, I want to acknowledge the help I recieved from the TAs and from my fellow students especially Jenina who helped me understand the spotify API. :sparkles: