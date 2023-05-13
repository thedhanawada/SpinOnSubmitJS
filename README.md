# SpinOnSubmitJS

SpinOnSubmitJS is a lightweight JavaScript library that adds a loading spinner to your submit buttons, providing immediate feedback to your users when they submit a form.

## Installation

To install SpinOnSubmitJS, simply include the `spinOnSubmit.js` file in your project:

```html
<script src="path/to/spinOnSubmit.js"></script>
```

You can also use npm:

```bash
npm install spinonsubmitjs
```
## Usage

To use SpinOnSubmitJS, you need to call the createSpinnerButton function and pass in the ID of your form button, the ID of your form, and a function that handles form submission.

```javascript
createSpinnerButton('buttonId', 'formId', onSubmit);
```

Here's an example:

```javascript
window.onload = function() {
  createSpinnerButton('submitBtn', 'myForm', function(data) {
    // Handle form submission
    // Return a promise that resolves when the submission is done
  });
}
```

This will automatically add a loading spinner to your submit button when the form is submitted. The spinner will disappear when the form submission is complete.

## API
```javascript
createSpinnerButton(buttonId, formId, onSubmit)
```

- buttonId: The ID of the submit button to which the spinner should be added.
- formId: The ID of the form that should be handled.
- onSubmit: A function that takes the form data as an argument and handles form     submission. This function should return a promise that resolves when the form     submission is complete.

If you encounter any issues, please open an issue on the GitHub repository.