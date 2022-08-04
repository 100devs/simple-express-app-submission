# SimpleWorx

NOT ALL PAGES ARE FUNCTIONAL

This CRUD app allows an employee submit a new work order request, which will update on any device that has the app open, and allow a different employee to respond to, close, or delete the request.

Check it out! <a href="https://simpleworx-app.herokuapp.com/workOrders">simpleworx-app.herokuapp.com</a>

## How It Works
The employee can see a list of all the previously entered work orders. The user can click on any request, and more details will come up under the list. There is an option to sort by certain criteria or create a new work order request.

![workOrders](https://user-images.githubusercontent.com/102004658/182856584-9bfbe085-0e27-4b2c-b0b3-ae83aa102f96.png)

![workOrderDetail](https://user-images.githubusercontent.com/102004658/182856636-b838b67e-5607-4de8-b741-e9eba0ec1196.png)

![create](https://user-images.githubusercontent.com/102004658/182856673-05eda9b0-ff6d-4f71-818a-9fa20b4eae93.png)

## How It's Made
Tech Used: HTML, CSS, JavaScript, Node.js, Express, MongoDB, Mongoose, EJS, Pusher

The app features multiple navigation buttons on the left side of the page that can be used to go switch between different pages of the app. MongoDB is the database used to collect and store the information that is entered by the user. Pusher is used  when a new work order is created, responded to, closed, or deleted and will update every app that is opened on any device.

## Lessons Learned
Developing this app has showed me how the backend of a server is working and how to structure a server to listen for changes and send instant updates when one is made.



