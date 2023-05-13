# SpinOnSubmitJS

SpinOnSubmitJS is a lightweight, easy-to-use JavaScript library that enhances form submission UX by providing a spinning loader inside submit buttons.

## Features
- Creates a spinner inside submit button upon form submission
- Disables the submit button while processing
- Hides the submit button text and shows the spinner during processing
- Easily customizable

## Installation

To use SpinOnSubmitJS in your project, include the JavaScript file in your HTML:

```html
<script type="module" src="path/to/spinOnSubmit.js"></script>
```

## Usage

Once you've included SpinOnSubmitJS in your project, you can use it as follows:

```javascript
window.onload = function() {
  SpinOnSubmitJS.createSpinnerButton('submitBtn', 'myForm', function(data) {
    // Add your asynchronous action here
    return new Promise(function(resolve) {
      setTimeout(function() {
        // Process your form data here
        alert("Submitted!\nFirst Name: " + data.firstName + "\nLast Name: " + data.lastName);
        resolve();
      }, 5000);
    });
  });
}
```

## Customization

All CSS related to the spinner and the submit button can be customized to fit your project's theme.


