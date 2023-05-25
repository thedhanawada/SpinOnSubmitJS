[![npm version](https://img.shields.io/npm/v/spinonsubmitjs)](https://img.shields.io/npm/v/spinonsubmitjs)
[![npm](https://img.shields.io/npm/l/spinonsubmitjs?style=flat-square)](https://img.shields.io/npm/l/spinonsubmitjs?style=flat-square)
[![npm version](https://img.shields.io/bundlephobia/min/spinonsubmitjs)](https://img.shields.io/bundlephobia/min/spinonsubmitjs)
[![npm downloads](https://img.shields.io/npm/dm/spinonsubmitjs)](https://img.shields.io/npm/dm/spinonsubmitjs)

# SpinOnSubmitJS

SpinOnSubmitJS is a lightweight JavaScript library that provides an easy way to add a spinner to a submit button when performing asynchronous actions, such as form submissions. It simplifies the process of indicating loading state and disabling the button while waiting for the action to complete.
Installation

You can install SpinOnSubmitJS via npm:

```shell
npm install spinonsubmitjs
```

## Usage and Examples

Using **SpinOnSubmitJS** in your project is easy. Follow these steps:

1. Create a submit button element in your HTML form with a unique ID.
2. In your JavaScript file, import the `createSpinnerButton` function from the SpinOnSubmitJS library.
3. Call `createSpinnerButton`, passing in the following arguments:
   - The ID of your submit button
   - The ID of your form
   - A callback function representing the asynchronous action to be performed when the button is clicked. This callback receives the form data as its first argument, removing the need to manually gather the data.
   - An error callback function. This function will be called if your main callback throws an error or rejects a promise, allowing you to handle errors gracefully.
   - An options object that can contain the following properties:
     - `spinnerColor`: This sets the color of the default spinner.
     - `position`: This can be either 'left' or 'right', and sets the position of the spinner in relation to the button text.
     - `hideLabelWhileLoading`: This can be either true or false, and determines whether or not the button's text is hidden while the spinner is displayed.
4. Remember, the options object is an optional parameter. If you want the spinner with default configurations, you don't need to pass this argument.

Here's an example of how you might use `createSpinnerButton`:

```javascript
createSpinnerButton(
        'submitBtn',
        'myForm',
        function(data) {
          return new Promise(function(resolve, reject) {
            setTimeout(function() {
              var firstName = data.firstName;
              var lastName = data.lastName;
              if (firstName === '' || lastName === '') {
                reject('All fields must be filled!');
              } else {
                alert("Submitted!\nFirst Name: " + firstName + "\nLast Name: " + lastName);
                resolve();
              }
            }, 2000);
          });
        },
        function(error) {
          alert(error);
          console.error(error);
        },
        'white', // Spinner color
        'right',  // Spinner position
        true     // hideLabelWhileLoading
      );
```
This creates a button that, when clicked, gathers data from a form, displays a yellow spinner to the right of the button text, and pops up an alert with the form data. If any fields are empty, the function will reject with an error, and the error callback will alert the user. If the 'hideLabelWhileLoading' option is set to true, the button's label will be hidden while the spinner is displayed.

If you have any other questions or if there's anything else you'd like to change, feel free to ask!

## License

SpinOnSubmitJS is released under the [MIT license](https://github.com/thedhanawada/SpinOnSubmitJS/blob/main/LICENSE). This is a permissive open-source software license that allows for free use, modification, and distribution of the software without requiring payment or attribution.

The [MIT license](https://opensource.org/licenses/MIT) is a widely-used open-source software license that permits free use, modification, and distribution of the software without requiring payment or attribution. This means that anyone can use, modify, and distribute the software without having to pay or give credit to the original author.

Using an open-source license like the MIT license is important because it ensures that the software can be used and improved upon by as many people as possible. By releasing SpinOnSubmitJS under the MIT license, we hope to encourage others to use and contribute to the project, and to promote the wider adoption of open-source software in general.

We take the licensing of SpinOnSubmitJS seriously, and believe that it is a key part of the project's success. We encourage you to read the [license](https://github.com/thedhanawada/SpinOnSubmitJS/blob/main/LICENSE) in full before using or contributing to the project, and to abide by its terms in your use and distribution of the software. 
