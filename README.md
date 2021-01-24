## This project was  Simple Student Analytics used React & Nodejs and highcharts library .


### Proposed Solution
- Create a box and whisker chart to display
student marks for different subjects. Show
individual student mark as a dot inside box and
whisker chart. Refer the screenshot on right
hand side. ( dot is not in that chart, but you have
to show the dot inside each box and whisker
chart ). Dot should be filtered according to the filter selected, but the box values
should not be filtered. Please refer box and whisker chart wiki
here.https://www.statcan.gc.ca/edu/power-pouvoir/ch12/5214889-eng.htm

- Create a column chart with student marks for each subject. X-axis should
be subject and Y-axis should be marks. And also display a line chart in
the same chart to display overall subject average. 
- Create a graph(s) ( use any type of charting type ) to display student marks for all
the years. This chart should only be filtered by student filter as you are displaying
data for all the years. The idea of this graph is to represent the student progress
on each subject over the past years up to now. Use your own creativity and
imagination to achieve this task. X-axis should be Semester with year ( ex: 2018-
2). This graph should display student marks for all the subjects.


### Technologies​
- Frontend : ReactJS and highcharts chart library
- Backend Service: Node JS - Express
- Database: MongoDB, to check about mongodb [Mongodb doc ](https://docs.mongodb.com/manual/).
```
  const db = client.db("DataGenerationDB");
  db.collection("student").insertMany(data, function (err, res) {})
```
- Read more about [Highcharts](https://www.highcharts.com/)
### Getting statrt Mongodb

- Start work with mongodb check the [Instalation](https://docs.mongodb.com/manual/installation/)

### Install dependency and start server(node project/backend)
> `npm install nodemon -g`  Install [nodemon](https://www.npmjs.com/package/nodemon) globaly.<br>
> go to the server directory `cd server`<br>
> `npm install` Install dependency.<br>
> `node genarate_data.js` to Genarate <b>10million</b> data <br>
> `npm start ` start the server


### Install dependency and start client (react project/Frontend)
>  go to the client directory `cd client`<br>
> `npm install` Install dependency.<br>
> `npm start `
### Images
![alt text](https://github.com/sivatharan/Student-Management-Using-React-and-NodeJs/blob/master/images/q1.PNG)
![alt text](https://github.com/sivatharan/Student-Management-Using-React-and-NodeJs/blob/master/images/q2.PNG)
## Something Missing?

If you have ideas for more “How To” recipes that should be on this page, [let me know](https://github.com/sivatharan/Student-Management-Using-React-and-NodeJs/issues) or [contribute some!](https://github.com/sivatharan/Student-Management-Using-React-and-NodeJs/blob/master/README.md)