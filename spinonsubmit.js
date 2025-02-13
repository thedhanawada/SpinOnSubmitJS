function resetButton(button, spinner, buttonLabel, originalButtonContent, hideLabelWhileLoading, showLabel, successIcon, errorIcon, onLoadingFinished, errorOccurred = false, resetFormFunction) {
  spinner.style.display = "none";
  if (!errorOccurred) {
      button.disabled = false;
  }

  button.innerHTML = '';
  const contentContainer = document.createElement('span');
  contentContainer.className = 'button-content';
  
  if (typeof originalButtonContent === 'string') {
      buttonLabel.textContent = originalButtonContent;
  } else if (originalButtonContent instanceof DocumentFragment) {
      buttonLabel.innerHTML = '';
      buttonLabel.appendChild(originalButtonContent.cloneNode(true));
  }

  button.appendChild(contentContainer);
  contentContainer.appendChild(buttonLabel);
  if (successIcon) button.appendChild(successIcon);
  if (errorIcon) button.appendChild(errorIcon);

  if (showLabel) {
      buttonLabel.style.display = "inline";
  }

  button.removeAttribute('aria-busy');

  if (onLoadingFinished) {
      onLoadingFinished();
  }

  const event = new CustomEvent('loadingFinished', { detail: { error: errorOccurred } });
  button.dispatchEvent(event);

  if (errorOccurred && resetFormFunction) {
      resetFormFunction();
  }
}

// Main function to create enhanced submit buttons
export function createSpinnerButton(buttonId, formId, onSubmit, onError, spinnerOptions = {}) {
  if (!buttonId || !formId || typeof onSubmit !== 'function') {
      throw new Error('Missing or incorrect required parameters.');
  }

  const {
      spinnerColor = '',
      position = 'left',
      hideLabelWhileLoading = true,
      showLabel = true,
      loadingText,
      loadingHtml,
      onLoadingStart,
      onLoadingFinished,
      showSuccessState = false,
      showErrorState = false,
      successAnimation = 'checkmark',
      errorAnimation = 'shake',
      resetForm
  } = spinnerOptions;

  const button = document.getElementById(buttonId);
  const form = document.getElementById(formId);

  if (!button || !form) {
      console.error(`No element found with id ${buttonId} or ${formId}`);
      return;
  }

  const spinner = document.createElement('span');
  spinner.className = "loader";
  if (spinnerColor) {
      spinner.style.borderColor = `transparent ${spinnerColor} ${spinnerColor} ${spinnerColor}`;
  }

  const buttonLabel = document.createElement('span');
  buttonLabel.className = "button-label";
  buttonLabel.style.display = showLabel ? "inline" : "none";

  let originalButtonContent;
  if (button.childNodes.length > 0) {
      originalButtonContent = document.createDocumentFragment();
      button.childNodes.forEach(node => originalButtonContent.appendChild(node.cloneNode(true)));
  } else {
      originalButtonContent = button.textContent;
  }
  buttonLabel.textContent = button.textContent;

  button.textContent = "";
  const elements = position === 'right' ? [buttonLabel, spinner] : [spinner, buttonLabel];
  elements.forEach(element => button.appendChild(element));

  const successIcon = document.createElement('span');
  successIcon.className = 'sos-success-icon';
  successIcon.style.display = 'none';

  const errorIcon = document.createElement('span');
  errorIcon.className = 'sos-error-icon';
  errorIcon.style.display = 'none';

  button.appendChild(successIcon);
  button.appendChild(errorIcon);

  function enableButtonIfFormChanged() {
      button.disabled = false;
      button.classList.remove('shake');
      form.removeEventListener('input', enableButtonIfFormChanged);
  }

  button.addEventListener('click', (e) => {
      e.preventDefault();
      button.classList.remove('shake');

      const data = Object.fromEntries(new FormData(form).entries());

      button.disabled = true;
      spinner.style.display = "inline-block";
      button.setAttribute('aria-busy', 'true');
      
      if (onLoadingStart) {
          onLoadingStart();
      }

      if (loadingHtml) {
          buttonLabel.style.display = 'inline';
          buttonLabel.innerHTML = loadingHtml;
      } else if (loadingText) {
          buttonLabel.style.display = 'inline';
          buttonLabel.textContent = loadingText;
      } else if (hideLabelWhileLoading && showLabel) {
          buttonLabel.style.display = "none";
      }

      onSubmit(data)
          .then(() => {
              if (showSuccessState) {
                  spinner.style.display = 'none';
                  successIcon.style.display = 'inline-block';

                  if (successAnimation === 'checkmark') {
                      successIcon.classList.add('checkmark');
                  } else if (successAnimation === 'pulse') {
                      button.classList.add('pulse');
                  }

                  setTimeout(() => {
                      successIcon.classList.remove('checkmark');
                      button.classList.remove('pulse');
                      resetButton(button, spinner, buttonLabel, originalButtonContent, hideLabelWhileLoading, showLabel, successIcon, errorIcon, onLoadingFinished);
                  }, 1500);
              } else {
                  resetButton(button, spinner, buttonLabel, originalButtonContent, hideLabelWhileLoading, showLabel, successIcon, errorIcon, onLoadingFinished);
              }
          })
          .catch((error) => {
              if (showErrorState) {
                  spinner.style.display = 'none';
                  errorIcon.style.display = 'inline-block';

                  if (errorAnimation === 'shake') {
                      button.classList.add('shake');
                  } else if (errorAnimation === 'fade') {
                      button.classList.add('fade-out');
                  }

                  setTimeout(() => {
                      errorIcon.style.display = 'none';
                      resetButton(button, spinner, buttonLabel, originalButtonContent, hideLabelWhileLoading, showLabel, successIcon, errorIcon, onLoadingFinished, true, resetForm);
                      if (errorAnimation === "fade") {
                          button.classList.remove('fade-out');
                      }
                      form.addEventListener('input', enableButtonIfFormChanged);
                  }, 2500);
              } else {
                  resetButton(button, spinner, buttonLabel, originalButtonContent, hideLabelWhileLoading, showLabel, successIcon, errorIcon, onLoadingFinished, false, resetForm);
              }
              onError?.(error);
          });
  });
}