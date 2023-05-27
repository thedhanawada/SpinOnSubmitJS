/**
 * Resets the state of the button after loading is complete.
 *
 * @param {HTMLElement} button - The button that was clicked to submit the form.
 * @param {HTMLElement} spinner - The spinner element.
 * @param {HTMLElement} buttonLabel - The label of the button.
 * @param {boolean} hideLabelWhileLoading - Whether to hide the label while loading.
 */
function resetButton(button, spinner, buttonLabel, hideLabelWhileLoading) {
  spinner.style.display = "none";
  button.disabled = false;
  if (hideLabelWhileLoading) {
    buttonLabel.style.display = "inline";
  }

  const event = new CustomEvent('loadingFinished');
  button.dispatchEvent(event);
}

/**
 * Creates a button with a spinner that shows while the form is being submitted.
 *
 * @export
 * @param {string} buttonId - The ID of the button element.
 * @param {string} formId - The ID of the form element.
 * @param {function} onSubmit - The function to run when the form is submitted.
 * @param {function} [onError] - The function to run if an error occurs while submitting the form.
 * @param {string} [spinnerColor='black'] - The color of the spinner.
 * @param {string} [position='left'] - The position of the spinner relative to the label.
 * @param {boolean} [hideLabelWhileLoading=true] - Whether to hide the label while loading.
 */
export function createSpinnerButton(buttonId, formId, onSubmit, onError, spinnerColor = 'black', position = 'left', hideLabelWhileLoading = true) {
  if (!buttonId || !formId || typeof onSubmit !== 'function') {
    throw new Error('Missing or incorrect required parameters: buttonId, formId and onSubmit (function) are required.');
  }

  const button = document.getElementById(buttonId);
  if (!button) {
    console.error(`No element found with id ${buttonId}`);
    return;
  }

  const spinner = document.createElement('span');
  spinner.className = "loader";
  spinner.style.borderColor = `transparent ${spinnerColor} ${spinnerColor} ${spinnerColor}`;

  const buttonLabel = document.createElement('span');
  buttonLabel.textContent = button.textContent;
  buttonLabel.style.display = "inline";
  buttonLabel.className = "button-label";

  if (!hideLabelWhileLoading) {
    spinner.style.width = "10px";
    spinner.style.height = "10px";
    spinner.style.borderWidth = "2px";
    spinner.style.marginLeft = "5px";
  }

  button.textContent = "";
  
  const elements = position === 'right' ? [buttonLabel, spinner] : [spinner, buttonLabel];
  elements.forEach(element => button.appendChild(element));

  button.addEventListener('click', (e) => {
    e.preventDefault();

    const form = document.getElementById(formId);
    const data = Object.fromEntries(new FormData(form).entries());

    spinner.style.display = "inline-block";
    button.disabled = true;
    if (hideLabelWhileLoading) {
      buttonLabel.style.display = "none";
    }

    onSubmit(data)
      .then(() => resetButton(button, spinner, buttonLabel, hideLabelWhileLoading))
      .catch((error) => {
        resetButton(button, spinner, buttonLabel, hideLabelWhileLoading);
        onError?.(error);
      });
  });
}