# SpinOnSubmitJS

[![npm version](https://img.shields.io/npm/v/spinonsubmitjs)](https://img.shields.io/npm/v/spinonsubmitjs)
[![npm](https://img.shields.io/npm/l/spinonsubmitjs?style=flat-square)](https://img.shields.io/npm/l/spinonsubmitjs?style=flat-square)
[![npm version](https://img.shields.io/bundlephobia/min/spinonsubmitjs)](https://img.shields.io/bundlephobia/min/spinonsubmitjs)
[![npm downloads](https://img.shields.io/npm/dm/spinonsubmitjs)](https://img.shields.io/npm/dm/spinonsubmitjs)

SpinOnSubmitJS is a lightweight JavaScript library that enhances form submission buttons with loading indicators, success/error states, and animations. It provides an intuitive way to handle asynchronous actions while providing visual feedback to users.

## Installation

Install via npm:

```shell
npm install spinonsubmitjs
```

## Features

SpinOnSubmitJS includes:

* Loading spinner with customizable appearance
* Success and error states with icons
* Multiple animation options (checkmark, pulse, shake, fade)
* Custom loading text/HTML support
* Automatic form reset capability
* Flexible positioning and styling
* CSS variables for easy theming
* ARIA attributes for accessibility

## Usage

### 1. Import the library:

```javascript
import { createSpinnerButton } from 'spinonsubmitjs';
```

### 2. Create a button and form in your HTML:

```html
<form id="myForm">
   <input type="text" name="firstName" />
   <input type="text" name="lastName" />
   <button id="submitBtn">Submit</button>
</form>
```

### 3. Initialize the button:

```javascript
createSpinnerButton(
   'submitBtn',
   'myForm',
   async (data) => {
       // Your submission logic here
       await submitData(data);
   },
   (error) => {
       console.error('Submission failed:', error);
   },
   {
       spinnerColor: '#3498db',
       position: 'right',
       hideLabelWhileLoading: true,
       showSuccessState: true,
       successAnimation: 'checkmark',
       showErrorState: true,
       errorAnimation: 'shake',
       loadingText: 'Submitting...',
       resetForm: true,
       onLoadingStart: () => console.log('Loading started'),
       onLoadingFinished: () => console.log('Loading finished')
   }
);
```

## Configuration Options

The `spinnerOptions` object accepts the following properties:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| spinnerColor | string | '' | Color of the spinner |
| position | string | 'left' | Position of spinner ('left' or 'right') |
| hideLabelWhileLoading | boolean | true | Hide button text during loading |
| showLabel | boolean | true | Show button label |
| loadingText | string | undefined | Text to show during loading |
| loadingHtml | string | undefined | HTML to show during loading |
| showSuccessState | boolean | false | Show success icon after completion |
| showErrorState | boolean | false | Show error icon on failure |
| successAnimation | string | 'checkmark' | Success animation type ('checkmark' or 'pulse') |
| errorAnimation | string | 'shake' | Error animation type ('shake' or 'fade') |
| resetForm | boolean | false | Reset form after error |
| onLoadingStart | function | undefined | Callback when loading starts |
| onLoadingFinished | function | undefined | Callback when loading ends |

## Styling

The library includes CSS variables for easy customization:

```css
:root {
   --sos-spinner-size: 20px;
   --sos-spinner-border-color-light: #f3f3f3;
   --sos-spinner-border-top-color: #3498db;
   --sos-spinner-margin-right: 5px;
   --sos-icon-size: 20px;
   --sos-icon-stroke: 3px;
   --color-success: green;
   --color-danger: red;
}
```

## Events

The button emits a 'loadingFinished' event when the submission process completes:

```javascript
button.addEventListener('loadingFinished', (event) => {
   const hasError = event.detail.error;
   console.log('Loading finished with error:', hasError);
});
```

## Examples

Here's a complete example showing various features:

```javascript
createSpinnerButton(
   'submitBtn',
   'myForm',
   (data) => {
       return new Promise((resolve, reject) => {
           setTimeout(() => {
               if (data.firstName && data.lastName) {
                   resolve();
               } else {
                   reject('All fields must be filled!');
               }
           }, 2000);
       });
   },
   (error) => {
       console.error('Error:', error);
   },
   {
       spinnerColor: '#3498db',
       position: 'right',
       hideLabelWhileLoading: true,
       showSuccessState: true,
       successAnimation: 'checkmark',
       loadingText: 'Processing...',
       onLoadingFinished: () => {
           console.log('Form submission completed');
       }
   }
);
```

## License

SpinOnSubmitJS is released under the [MIT license](https://github.com/thedhanawada/SpinOnSubmitJS/blob/main/LICENSE). You are free to use, modify, and distribute this software for any purpose, commercial or non-commercial, with proper attribution.

---

For more information, visit our [GitHub repository](https://github.com/thedhanawada/SpinOnSubmitJS).
```