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
## Usage and Examples

Using SpinOnSubmitJS in your project is straightforward. Follow these steps:

- Create a submit button element in your HTML form with a unique ID.
- In your JavaScript file, import the `createSpinnerButton` function from the SpinOnSubmitJS library.
- Call `createSpinnerButton`, passing in the ID of your submit button, the ID of your form, and a callback function that represents the asynchronous action to be performed when the button is clicked. The callback now also receives the form data as its first argument, so you no longer need to manually gather the data.
- You can also pass an error callback as a fourth argument. This function will be called if your main callback throws an error or rejects a promise, allowing you to handle errors gracefully.
- Optionally, you can also pass a fifth argument to `createSpinnerButton` to customize the spinner's styles. This should be an object where the keys are CSS property names and the values are the desired styles.

#### Example 1: Basic Usage

### Example 1: Basic Usage

    
        import { createSpinnerButton } from 'spinonsubmitjs';
    
        createSpinnerButton('submitBtn1', 'myForm1', (data) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              alert(`Submitted!\nFirst Name: ${data.firstName}\nLast Name: ${data.lastName}`);
              resolve();
            }, 2000);
          });
        });
      

### Example 2: With Error Handling

    
        import { createSpinnerButton } from 'spinonsubmitjs';
    
        createSpinnerButton(
          'submitBtn2', 
          'myForm2', 
          (data) => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                if (data.firstName === '') {
                  reject('First name is required!');
                } else {
                  alert(`Submitted!\nFirst Name: ${data.firstName}\nLast Name: ${data.lastName}`);
                  resolve();
                }
              }, 2000);
            });
          }, 
          (error) => {
            alert(`Error: ${error}`);
          }
        );
      

### Example 3: With Custom Styles

    
        import { createSpinnerButton } from 'spinonsubmitjs';
    
        createSpinnerButton(
          'submitBtn3', 
          'myForm3', 
          (data) => {
            return new Promise((resolve) => {
              setTimeout(() => {
                alert(`Submitted!\nFirst Name: ${data.firstName}\nLast Name: ${data.lastName}`);
                resolve();
              }, 2000);
            });
          },
          null,
          {
            backgroundColor: 'green',
            borderRadius: '50%',
            color: 'white'
          }
        );

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

## License

SpinOnSubmitJS is released under the [MIT license](https://github.com/thedhanawada/SpinOnSubmitJS/blob/main/LICENSE). This is a permissive open-source software license that allows for free use, modification, and distribution of the software without requiring payment or attribution.

The [MIT license](https://opensource.org/licenses/MIT) is a widely-used open-source software license that permits free use, modification, and distribution of the software without requiring payment or attribution. This means that anyone can use, modify, and distribute the software without having to pay or give credit to the original author.

Using an open-source license like the MIT license is important because it ensures that the software can be used and improved upon by as many people as possible. By releasing SpinOnSubmitJS under the MIT license, we hope to encourage others to use and contribute to the project, and to promote the wider adoption of open-source software in general.

We take the licensing of SpinOnSubmitJS seriously, and believe that it is a key part of the project's success. We encourage you to read the [license](https://github.com/thedhanawada/SpinOnSubmitJS/blob/main/LICENSE) in full before using or contributing to the project, and to abide by its terms in your use and distribution of the software. 
