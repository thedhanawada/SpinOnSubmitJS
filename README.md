# SpinOnSubmitJSSpinOnSubmitJS

SpinOnSubmitJS is a lightweight JavaScript library that provides an easy way to add a spinner to a submit button when performing asynchronous actions, such as form submissions. It simplifies the process of indicating loading state and disabling the button while waiting for the action to complete.
Installation

You can install SpinOnSubmitJS via npm:

```shell
npm install spinonsubmitjs
```

## Usage

To use SpinOnSubmitJS in your project, follow these steps:

- Include the library in your project:

```html

<script src="path/to/spinonsubmit.js"></script>
```

- Create a submit button element in your HTML form with an id attribute:

```html
<button id="submitBtn">Submit</button>
```

- Initialize SpinOnSubmitJS by calling the createSpinnerButton function:

```javascript
createSpinnerButton('submitBtn', 'myForm', onSubmit);
```
1.    The first argument is the id of the submit button.
2.    The second argument is the id of the form element.
3.    The third argument is a callback function that represents the asynchronous action to be performed when the button is clicked. This function should return a promise.

## Example:

```javascript
function onSubmit() {
  return new Promise(function(resolve) {
    // Perform your asynchronous action here
    // Call resolve() when the action is complete
  });
}
```

## Customize the spinner styles (optional):

You can customize the spinner styles by passing an optional spinnerStyles object as the fourth argument to createSpinnerButton. This object should contain CSS styles that will be applied to the spinner element.

### Example:

```javascript

    const spinnerStyles = {
      width: '24px',
      height: '24px',
      // Add any other custom styles here
    };

    createSpinnerButton('submitBtn', 'myForm', onSubmit, spinnerStyles);
```

You are good to go. Now, when the submit button is clicked, the spinner will be displayed, and the button will be disabled until the asynchronous action is complete.