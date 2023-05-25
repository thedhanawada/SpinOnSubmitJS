function resetButton(button, spinner, buttonLabel, hideLabelWhileLoading) {
  spinner.style.display = "none";
  button.disabled = false;
  if (hideLabelWhileLoading) {
    buttonLabel.style.display = "inline";
  }
}

export function createSpinnerButton(buttonId, formId, onSubmit, onError,
                                    spinnerColor = 'black', position = 'left',
                                    hideLabelWhileLoading = true) {
  if (!buttonId || !formId || !onSubmit) {
    throw new Error(
        'Missing required parameters: buttonId, formId and onSubmit are required.');
  }

  const button = document.getElementById(buttonId);
  if (!button) {
    console.error(`No element found with id ${buttonId}`);
    return;
  }

  const spinner = document.createElement('span');
  spinner.className = "loader";
  spinner.style.borderColor =
      `transparent ${spinnerColor} ${spinnerColor} ${spinnerColor}`;

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

  const elements = position === 'right' ? [ buttonLabel, spinner ]
                                        : [ spinner, buttonLabel ];
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
        .then(() => resetButton(button, spinner, buttonLabel,
                                hideLabelWhileLoading))
        .catch((error) => {
          resetButton(button, spinner, buttonLabel, hideLabelWhileLoading);
          onError?.(error);
        });
  });
}