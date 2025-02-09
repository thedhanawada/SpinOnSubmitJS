/**
 * Resets the state of the button after loading is complete, and handles success/error states.
 *
 * @param {HTMLElement} button - The button that was clicked to submit the form.
 * @param {HTMLElement} spinner - The spinner element.
 * @param {HTMLElement} buttonLabel - The label of the button.
 * @param {string|HTMLElement} originalButtonContent - The original content of the button (text or HTML).
 * @param {boolean} hideLabelWhileLoading - Whether to hide the label while loading.
 * @param {boolean} showLabel - Whether to show the label initially.
 * @param {HTMLElement} [successIcon] - Success icon element.
 * @param {HTMLElement} [errorIcon] - Error icon element.
 * @param {function} [onLoadingFinished] - Callback function when loading finishes.
 */
function resetButton(button, spinner, buttonLabel, originalButtonContent, hideLabelWhileLoading, showLabel, successIcon, errorIcon, onLoadingFinished) {
  spinner.style.display = "none";
  button.disabled = false;

  // Restore original button content
  button.innerHTML = ''; // Clear button
  if (typeof originalButtonContent === 'string') {
      buttonLabel.textContent = originalButtonContent;
  } else {
      buttonLabel.appendChild(originalButtonContent.cloneNode(true)); // Clone HTML content
  }

  if (showLabel && (!hideLabelWhileLoading || !hideLabelWhileLoading)) { // Logic for showing label after reset, consider showLabel always overriding hideLabelWhileLoading if showLabel is true
      buttonLabel.style.display = "inline";
  } else if (!showLabel) {
      buttonLabel.style.display = "none"; // Keep hidden if showLabel is false
  } else if (!hideLabelWhileLoading && showLabel) { // Ensure label is visible if always shown
    buttonLabel.style.display = 'inline';
  }


  if (successIcon) successIcon.style.display = 'none';
  if (errorIcon) errorIcon.style.display = 'none';

  button.removeAttribute('aria-busy'); // Remove ARIA busy state

  if (onLoadingFinished) {
      onLoadingFinished();
  }

  const event = new CustomEvent('loadingFinished');
  button.dispatchEvent(event);
}


/**
* Creates a button with a spinner that shows while the form is being submitted, with enhanced features.
*
* @export
* @param {string} buttonId - The ID of the button element.
* @param {string} formId - The ID of the form element.
* @param {function} onSubmit - The function to run when the form is submitted (must return a Promise).
* @param {function} [onError] - The function to run if an error occurs while submitting the form.
* @param {object} [spinnerOptions] - An object containing options for the spinner and button behavior.
* @param {string} [spinnerOptions.spinnerColor=''] - The color of the spinner (will use CSS variable if empty).
* @param {string} [spinnerOptions.position='left'] - The position of the spinner relative to the label ('left' or 'right').
* @param {boolean} [spinnerOptions.hideLabelWhileLoading=true] - Whether to hide the label while loading (default: `true`).
* @param {boolean} [spinnerOptions.showLabel=true] - Whether to show the label initially (default: `true`).
* @param {string} [spinnerOptions.loadingText] - Optional text to display instead of the label during loading.
* @param {string} [spinnerOptions.loadingHtml] - Optional HTML to display instead of the label during loading. Overrides `loadingText`.
* @param {function} [spinnerOptions.onLoadingStart] - Callback function called when loading starts.
* @param {function} [spinnerOptions.onLoadingFinished] - Callback function called when loading finishes (success or error).
* @param {boolean} [spinnerOptions.showSuccessState=false] - Whether to show a success icon briefly on successful submission.
* @param {boolean} [spinnerOptions.showErrorState=false] - Whether to show an error icon briefly on submission error.
*/
export function createSpinnerButton(buttonId, formId, onSubmit, onError, spinnerOptions = {}) {
  if (!buttonId || !formId || typeof onSubmit !== 'function') {
      throw new Error('Missing or incorrect required parameters: buttonId, formId and onSubmit (function) are required.');
  }

  const {
      spinnerColor = '', // Default spinner color is now handled by CSS variable primarily
      position = 'left',
      hideLabelWhileLoading = true,
      showLabel = true,
      loadingText,
      loadingHtml,
      onLoadingStart,
      onLoadingFinished,
      showSuccessState = false,
      showErrorState = false
  } = spinnerOptions;

  const button = document.getElementById(buttonId);
  if (!button) {
      console.error(`No element found with id ${buttonId}`);
      return;
  }

  const spinner = document.createElement('span');
  spinner.className = "loader";
  if (spinnerColor) { // Only set inline style if spinnerColor is provided, otherwise rely on CSS variable
    spinner.style.borderColor = `transparent ${spinnerColor} ${spinnerColor} ${spinnerColor}`;
  }
  spinner.style.width = `var(--sos-spinner-size, 20px)`; // Use CSS variable for size
  spinner.style.height = `var(--sos-spinner-size, 20px)`; // Use CSS variable for size


  const buttonLabel = document.createElement('span');
  buttonLabel.className = "button-label";
  buttonLabel.style.display = showLabel ? "inline" : "none";


  let originalButtonContent; // Store original content for reset
  if (button.childNodes.length > 0) {
      originalButtonContent = document.createDocumentFragment();
      button.childNodes.forEach(node => {
          originalButtonContent.appendChild(node.cloneNode(true)); // Clone all child nodes
      });
  } else {
      originalButtonContent = button.textContent; // Fallback to textContent if no child nodes
  }
  buttonLabel.textContent = button.textContent; // Initial label text


  if (!hideLabelWhileLoading && showLabel) {
      spinner.style.width = "10px";
      spinner.style.height = "10px";
      spinner.style.borderWidth = "2px";
      spinner.style.marginLeft = "5px";
  } else if (!showLabel) {
      spinner.style.marginLeft = "0";
      spinner.style.marginRight = "0";
  }


  button.textContent = ""; // Clear initial button text - content will be managed by buttonLabel and spinner

  const elements = position === 'right' ? [buttonLabel, spinner] : [spinner, buttonLabel];
  elements.forEach(element => button.appendChild(element));


  // Success and Error Icons (create upfront and hide initially)
  const successIcon = document.createElement('span');
  successIcon.className = 'sos-success-icon';
  successIcon.style.display = 'none';

  const errorIcon = document.createElement('span');
  errorIcon.className = 'sos-error-icon';
  errorIcon.style.display = 'none';

  button.appendChild(successIcon);
  button.appendChild(errorIcon);


  button.addEventListener('click', (e) => {
      e.preventDefault();

      const form = document.getElementById(formId);
      const data = Object.fromEntries(new FormData(form).entries());

      button.disabled = true;
      spinner.style.display = "inline-block";
      button.setAttribute('aria-busy', 'true'); // Set ARIA busy state for accessibility
      if (onLoadingStart) {
          onLoadingStart(); // Call onLoadingStart callback
      }


      // Handle loading text/html
      if (loadingHtml) {
          buttonLabel.style.display = 'inline'; // Ensure label container is visible to hold HTML
          buttonLabel.innerHTML = loadingHtml;
      } else if (loadingText) {
          buttonLabel.style.display = 'inline'; // Ensure label container is visible to hold text
          buttonLabel.textContent = loadingText;
      } else if (hideLabelWhileLoading && showLabel) { // Only hide label if no loading text/html and hideLabelWhileLoading is true
          buttonLabel.style.display = "none";
      }


      onSubmit(data)
          .then(() => {
              if (showSuccessState) {
                  spinner.style.display = 'none'; // Hide spinner immediately
                  successIcon.style.display = 'inline-block'; // Show success icon
                  setTimeout(() => { // Briefly show success icon then reset
                      resetButton(button, spinner, buttonLabel, originalButtonContent, hideLabelWhileLoading, showLabel, successIcon, errorIcon, onLoadingFinished);
                  }, 1500); // Adjust timeout as needed (e.g., 1500ms = 1.5 seconds)
              } else {
                  resetButton(button, spinner, buttonLabel, originalButtonContent, hideLabelWhileLoading, showLabel, successIcon, errorIcon, onLoadingFinished); // Reset immediately if no success state
              }
          })
          .catch((error) => {
              if (showErrorState) {
                  spinner.style.display = 'none'; // Hide spinner immediately
                  errorIcon.style.display = 'inline-block'; // Show error icon
                  setTimeout(() => { // Briefly show error icon then reset
                      resetButton(button, spinner, buttonLabel, originalButtonContent, hideLabelWhileLoading, showLabel, successIcon, errorIcon, onLoadingFinished);
                  }, 2500); // Error state shown slightly longer (e.g., 2.5 seconds)
              } else {
                  resetButton(button, spinner, buttonLabel, originalButtonContent, hideLabelWhileLoading, showLabel, successIcon, errorIcon, onLoadingFinished); // Reset immediately if no error state
              }
              onError?.(error);
          });
  });
}