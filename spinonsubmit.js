function resetButton(button, spinner, buttonLabel) {
  spinner.style.display = "none";
  button.disabled = false;
  buttonLabel.style.display = "inline";
}

export function createSpinnerButton(buttonId, formId, onSubmit, onError, spinnerColor = 'black', position = 'left') {
  if (!buttonId || !formId || !onSubmit) {
    throw new Error('Missing required parameters: buttonId, formId and onSubmit are required.');
  }

  const button = document.getElementById(buttonId);
  if (!button) {
    console.error(`No element found with id ${buttonId}`);
    return;
  }

  const spinner = document.createElement('span');
  spinner.className = "loader";
  spinner.style.borderColor = 'transparent ' + spinnerColor + ' ' + spinnerColor + ' ' + spinnerColor;
  
  const buttonText = button.innerHTML;
  
  button.innerHTML = "";

  const buttonLabel = document.createElement('span');
  buttonLabel.textContent = buttonText;
  buttonLabel.style.display = "inline";
  
  if (position === 'right') {
    button.appendChild(buttonLabel);
    button.appendChild(spinner);
  } else {
    button.appendChild(spinner);
    button.appendChild(buttonLabel);
  }
  
  button.addEventListener('click', (e) => {
    e.preventDefault();
    
    const form = document.getElementById(formId);
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    spinner.style.display = "inline-block";
    button.disabled = true;
    buttonLabel.style.display = "none";

    onSubmit(data)
      .then(() => resetButton(button, spinner, buttonLabel))
      .catch((error) => {
        resetButton(button, spinner, buttonLabel);
        if (onError) {
          onError(error);
        } else {
          console.error(error);
        }
      });
  });
}