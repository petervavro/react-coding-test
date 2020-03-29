# React Coding Test (Typescript, React)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Requirements:

* You must submit a GitHub public repository with all the code and its GitHub Pages link
with the working app in production. We will take into account the commits and
messages.
* Must develop using TypeScript.
* Must use only functional components with hooks, no classes.
* The test consists of 3 separate parts, each should work under a different path in the
same app using React Router.
* The root path must show your name and a link to each part.
* If the user inputs a non existing path the app should show a 404 page.
* The UX and UI design of the app will be taken into account.
* Use best practices and comment on what you see necessary. Use the README file to
write any extra information about your submission.

## Tasks: 

### 1. Input components (path: /focusable-input)

You must create 2 components: a TextInput component that renders an input element in the
DOM and accepts a ref that is forwarded to that input element, and a FocusableTextInput
component that uses the TextInput component and adds the following functionality:
* The component should receive an optional boolean prop named focused .
* When the focused prop is changed from false to true, and the input is not focused, it
should receive the focus.
* If on mounting the focused prop is true, the input should receive the focus.
* The app should include a way to see these conditions in action.

### 2. Voting List (path: /voting-list/:candidates)
You must create a voting app that automatically creates a list of candidates with the length
specified in the route path parameter (candidates). Each candidate must have the following
properties generated randomly:
* firstname (string)
* lastname (string)
* age (number, must be an adult)
* slogan (string, a random placeholder sentence with 10 words)
* votes (number, between 0 and 10)

The interface must show this list with all the info using an unordered list, including a way to vote
each candidate up or down. The app shouldn’t let a candidate have less than 0 or more than 20
votes. The app must show the list sorted by votes first and then by age, descending, without
altering the original array.
The interface should highlight the last candidate updated (voted up or down) as well as the total
vote count. It should also have a link to recreate the list with a random candidates count.

### 3. Register Form (path: /register-form)
You must create a register form that has 3 fields: username, email and phone number. Each of
these fields is required and has the following conditions:
* Username: The user can input any character, but is only valid if it’s alphanumeric,
without spaces or any special characters. It must be between 4 and 20 characters long
(included). It must be automatically transformed to lowercase.
* Email: It must be a valid email format.
* Phone number: It must start with a number between 300 and 320 (included). The field
should only let the user input numeric characters. The phone must be auto formatted
with parentheses and spaces like (300) 123 1233 so the user can easily read it, but the
data must be saved as integer.

Each field should let the user know its error state, with a specific message for each condition.
(the message should be something like “The username must be at least 4 characters long”, not
something generic like “This field has an error”). This state must be visible only if the field has
been touched, but not while the user is typing for the first time, and must disappear if the
condition is cleared.

The form should only be submitted if all fields are valid and should let the user know that it is
being sent. The form data must be sent to the server http://sgaviria.com in the route
/api/1/front-dev/ (mandatory trailing slash) using the post method. The request must contain a
header with the name “Tranqui-FrontendDeveloper” and the value should be your full name
using camel case. The data must be sent as form-urlencoded using the variable names
username , email and phone_number.

This endpoint has 3 possible responses (randomized).
* A successful response with a true status should send the user to another page with a welcome message.
* A successful response with a false status should show an error message in the form, using the string sent in the ‘error’ property of the response.
* A failed request should show an error message like “We are having some troubles with our service right now, please try again later.”
Remember to use component composition and best practices.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

To learn Typescript, check out the [Typescript documentation](https://www.typescriptlang.org/).

To learn MATERIAL-UI, check out the [MATERIAL-UI](https://material-ui.com/).


