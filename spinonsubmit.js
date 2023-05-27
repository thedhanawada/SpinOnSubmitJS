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
 * @param {Object} config - Configuration for spinner button.
 */
export function createSpinnerButton(config) {
  const {
    buttonId,
    formId,
    onSubmit,
    onError = () => {},
    spinnerColor = 'black',
    position = 'left',
    hideLabelWhileLoading = true
  } = config;

  if (typeof buttonId !== 'string' || typeof formId !== 'string' || typeof onSubmit !== 'function') {
    throw new Error('Incorrect type for parameters: buttonId, formId should be string and onSubmit should be a function.');
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
        onError(error);
      });
  });

  // Listen for when the button is removed from the DOM
  button.addEventListener('DOMNodeRemoved', () => {
    // Remove spinner from DOM and stop its animation
    if(spinner.parentNode) {
      spinner.parentNode.removeChild(spinner);
    }
  });
}