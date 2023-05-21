export function createSpinnerButton(buttonId, formId, onSubmit, onError, spinnerColor = 'black', spinnerTemplate = '', position = 'left') {
  if (!buttonId || !formId || !onSubmit || typeof onSubmit !== 'function') {
    throw new Error('Missing required parameters: buttonId, formId and onSubmit are required, and onSubmit must be a function.');
  }

  const button = document.getElementById(buttonId);
  if (!button) {
    throw new Error(`No element found with id ${buttonId}`);
  }

  const buttonText = button.textContent;
  
  button.innerHTML = `
    <style>
      .${buttonId}-loader {
        border: 4px solid #f3f3f3;
        border-top: 4px solid ${spinnerColor};
        border-radius: 50%;
        width: 20px;
        height: 20px;
        animation: spin 1s linear infinite;
        margin-right: 5px;
        display: none;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
    <span class="${buttonId}-loader"></span>
    <span>${buttonText}</span>
  `;

  const spinner = button.querySelector(`.${buttonId}-loader`);
  const buttonLabel = button.querySelector('span:last-child');
  
  if (position === 'right') {
    button.append(buttonLabel, spinner);
  }

  button.addEventListener('click', function(e) {
    e.preventDefault();
    
    const form = document.getElementById(formId);
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    spinner.style.display = "inline-block";
    button.disabled = true;
    buttonLabel.style.display = "none";

    onSubmit(data)
      .then(() => {
        spinner.style.display = "none";
        button.disabled = false;
        buttonLabel.style.display = "inline";
      })
      .catch((error) => {
        spinner.style.display = "none";
        button.disabled = false;
        buttonLabel.style.display = "inline";
        if (onError) {
          onError(error);
        } else {
          throw new Error(error);
        }
      });
  });
}