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

Using **SpinOnSubmitJS** in your project is straightforward. Follow these steps:

## Usage and Examples

Using SpinOnSubmitJS in your project is straightforward. Follow these steps:

1. Create a submit button element in your HTML form with a unique ID.

2. In your JavaScript file, import the `createSpinnerButton` function from the SpinOnSubmitJS library.

    `import { createSpinnerButton } from 'spinonsubmitjs';`

3. Call `createSpinnerButton`, passing in the ID of your submit button, the ID of your form, and a callback function that represents the asynchronous action to be performed when the button is clicked. The callback now also receives the form data as its first argument, so you no longer need to manually gather the data.

    `createSpinnerButton('submitBtn', 'myForm', function(data) {
      // Perform your asynchronous operation here
    });`

4. You can also pass an error callback as a fourth argument. This function will be called if your main callback throws an error or rejects a promise, allowing you to handle errors gracefully.

    `createSpinnerButton('submitBtn', 'myForm', function(data) {
      // Perform your asynchronous operation here
    }, function(error) {
      // Handle any errors here
    });`

5. The fifth argument is `spinnerOptions`, which is an optional object that can have the following properties:

   - **color**: This sets the color of the default spinner. If you're providing a custom spinner template, this will be ignored.
   - **template**: This allows you to provide a custom spinner. This should be a string of HTML. If you provide this, the color option will be ignored.
   - **position**: This can be either 'left' or 'right', and sets the position of the spinner in relation to the button text.

    ```javascript
	createSpinnerButton('submitBtn', 'myForm', function(data) {
      // Perform your asynchronous operation here
    }, function(error) {
      // Handle any errors here
    }, {
      color: 'red',  
      template: '<span class="custom-spinner"></span>', 
      position: 'right'
    });
	```

Remember, `spinnerOptions` is an optional parameter. If you want the spinner with default configurations, you don't need to pass this argument.

### Example 1: Basic Usage
```javascript 
<script type="module">
  import { createSpinnerButton } from './spinonsubmit.js';

  window.onload = function() {
    createSpinnerButton(
      'submitBtn',
      'myForm',
      function(data) {
        // Simulate an asynchronous action
        return new Promise(function(resolve) {
          setTimeout(resolve, 5000);
        });
      }
    );
  }
</script>

<form id="myForm">
  <button id="submitBtn">Submit</button>
</form>
  ```    

### Example 2: Using a Custom Spinner Color
```javascript   
<script type="module">
  import { createSpinnerButton } from './spinonsubmit.js';

  window.onload = function() {
    createSpinnerButton(
      'submitBtn',
      'myForm',
      function(data) {
        // Simulate an asynchronous action
        return new Promise(function(resolve) {
          setTimeout(resolve, 5000);
        });
      },
      null,
      {
        color: 'red',
      }
    );
  }
</script>

<form id="myForm">
  <button id="submitBtn">Submit</button>
</form>
```

### Example 3: Using a Custom Spinner Template
```javascript 
<script type="module">
  import { createSpinnerButton } from './spinonsubmit.js';

  window.onload = function() {
    const customSpinner = '<span class="custom-spinner"></span>';

    createSpinnerButton(
      'submitBtn',
      'myForm',
      function(data) {
        // Simulate an asynchronous action
        return new Promise(function(resolve) {
          setTimeout(resolve, 5000);
        });
      },
      null,
      {
        template: customSpinner,
      }
    );
  }
</script>

<form id="myForm">
  <button id="submitBtn">Submit</button>
</form>
```

### Example 4: Setting the Spinner Position
```javascript
<script type="module">
  import { createSpinnerButton } from './spinonsubmit.js';

  window.onload = function() {
    createSpinnerButton(
      'submitBtn',
      'myForm',
      function(data) {
        // Simulate an asynchronous action
        return new Promise(function(resolve) {
          setTimeout(resolve, 5000);
        });
      },
      null,
      {
        position: 'right',
      }
    );
  }
</script>

<form id="myForm">
  <button id="submitBtn">Submit</button>
</form>
```

Remember to replace './spinonsubmit.js' with the path to the SpinOnSubmitJS library in your project.

You are good to go. Now, when the submit button is clicked, the spinner will be displayed, and the button will be disabled until the asynchronous action is complete.

## License

SpinOnSubmitJS is released under the [MIT license](https://github.com/thedhanawada/SpinOnSubmitJS/blob/main/LICENSE). This is a permissive open-source software license that allows for free use, modification, and distribution of the software without requiring payment or attribution.

The [MIT license](https://opensource.org/licenses/MIT) is a widely-used open-source software license that permits free use, modification, and distribution of the software without requiring payment or attribution. This means that anyone can use, modify, and distribute the software without having to pay or give credit to the original author.

Using an open-source license like the MIT license is important because it ensures that the software can be used and improved upon by as many people as possible. By releasing SpinOnSubmitJS under the MIT license, we hope to encourage others to use and contribute to the project, and to promote the wider adoption of open-source software in general.

We take the licensing of SpinOnSubmitJS seriously, and believe that it is a key part of the project's success. We encourage you to read the [license](https://github.com/thedhanawada/SpinOnSubmitJS/blob/main/LICENSE) in full before using or contributing to the project, and to abide by its terms in your use and distribution of the software. 
