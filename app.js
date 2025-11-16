const PASSWORD = "nattenskonger";
const normalizePassword = (value = "") =>
  String(value).trim().toLocaleLowerCase();
const NORMALIZED_PASSWORD = normalizePassword(PASSWORD);

const initDoorInteractions = () => {
  const doorPhoto = document.querySelector(".door-photo");
  const doorCaption = document.querySelector(".door-caption");
  const doorForm = document.querySelector(".door-form");
  const passwordInput = doorForm ? doorForm.querySelector(".door-form__input") : null;
  const submitButton = doorForm ? doorForm.querySelector(".door-form__submit") : null;
  const closeButton = document.querySelector(".door-close");
  const feedback = document.querySelector(".door-feedback");
  const doorLink = doorPhoto ? doorPhoto.querySelector(".door-photo__link") : null;

  if (!doorPhoto || !doorCaption || !doorForm || !passwordInput || !closeButton || !feedback || !doorLink) {
    return;
  }

  const setDoorState = (isOpen) => {
    doorPhoto.classList.toggle("is-open", isOpen);
    doorPhoto.classList.toggle("is-clickable", isOpen);
    closeButton.hidden = !isOpen;
    doorLink.hidden = !isOpen;
    doorLink.setAttribute("aria-hidden", isOpen ? "false" : "true");
    doorCaption.textContent = isOpen ? "Velkommen! Døren står åben." : "";
  };

  const setFeedback = (message, options) => {
    const settings = Object.assign({ isError: false, clear: false }, options);

    if (settings.clear) {
      feedback.textContent = "";
      feedback.classList.remove("is-error");
      return;
    }

    feedback.textContent = message;
    if (settings.isError) {
      feedback.classList.add("is-error");
    } else {
      feedback.classList.remove("is-error");
    }
  };

  const triggerDeniedAnimation = () => {
    doorPhoto.classList.remove("is-denied");
    // Force reflow so the animation retriggers even if run back-to-back.
    void doorPhoto.offsetWidth;
    doorPhoto.classList.add("is-denied");
    window.setTimeout(() => {
      doorPhoto.classList.remove("is-denied");
    }, 600);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const normalizedAttempt = normalizePassword(passwordInput.value);

    if (!normalizedAttempt.length) {
      setFeedback("Indtast et kodeord for at prøve igen.", { isError: true });
      triggerDeniedAnimation();
      passwordInput.focus();
      return;
    }

    if (normalizedAttempt === NORMALIZED_PASSWORD) {
      setDoorState(true);
      setFeedback("Du kender den hemmelige kode. Kom indenfor!");
      passwordInput.value = "";
      if (submitButton) {
        submitButton.setAttribute("disabled", "true");
        window.setTimeout(() => submitButton.removeAttribute("disabled"), 300);
      }
      closeButton.focus();
    } else {
      setDoorState(false);
      setFeedback("Det var ikke den rigtige kode. Prøv igen.", { isError: true });
      triggerDeniedAnimation();
      passwordInput.focus();
      passwordInput.select();
    }
  };

  const handleClose = () => {
    setDoorState(false);
    setFeedback("Døren er låst igen. Indtast koden for at åbne.");
    passwordInput.focus();
  };

  const handleKeyControls = (event) => {
    if (event.key === "Escape" && doorPhoto.classList.contains("is-open")) {
      handleClose();
    }
  };

  setDoorState(false);
  setFeedback("Døren er låst. Indtast koden for at åbne.");

  doorForm.addEventListener("submit", handleSubmit);
  closeButton.addEventListener("click", handleClose);
  document.addEventListener("keydown", handleKeyControls);
};

initDoorInteractions();
