const LETTER_STEPS = [
  {
    src: "brev1.png",
    alt: "Forseglet brev med vokssegl på et træbord.",
    instruction: "Tryk på brevet for at bryde seglet.",
    actionLabel: "Åbn brevet",
  },
  {
    src: "brev2.png",
    alt: "Brev med seglet brudt og invitationen kiggende frem.",
    instruction: "Tryk igen for at trække invitationen ud.",
    actionLabel: "Træk invitationen ud",
  },
  {
    src: "brev3.png",
    alt: "Invitationen er hevet helt frem og kan læses.",
    instruction: 'Invitationen er klar. Koden er "Nattenskonger". Læs den og gå videre til Old Barrel.',
    actionLabel: "Se invitationen igen",
  },
];

const initLetterExperience = () => {
  const letterImage = document.querySelector(".letter-image");
  const letterToggle = document.querySelector(".letter-toggle");
  const instructions = document.querySelector(".letter-instructions");
  const letterCta = document.querySelector(".letter-cta");

  if (!letterImage || !letterToggle || !instructions || !letterCta) {
    return;
  }

  const srLabel = letterToggle.querySelector(".sr-only");
  let currentStep = 0;

  const applyStep = (step) => {
    const details = LETTER_STEPS[step];
    const SUPABASE_URL = 'https://ilenzrfwfqnifqukrpgg.supabase.co';
    const BUCKET = 'old-barrel-images';
    letterImage.src = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${details.src.toLowerCase()}`;
    letterImage.alt = details.alt;
    instructions.textContent = details.instruction;
    if (srLabel) {
      srLabel.textContent = details.actionLabel;
    }

    if (step >= LETTER_STEPS.length - 1) {
      letterCta.classList.add("is-visible");
      letterCta.removeAttribute("aria-hidden");
      letterToggle.setAttribute("disabled", "true");
      letterToggle.setAttribute("aria-disabled", "true");
      letterToggle.classList.add("is-complete");
    } else {
      letterCta.classList.remove("is-visible");
      letterCta.setAttribute("aria-hidden", "true");
      letterToggle.removeAttribute("disabled");
      letterToggle.removeAttribute("aria-disabled");
      letterToggle.classList.remove("is-complete");
    }
  };

  letterToggle.addEventListener("click", () => {
    if (currentStep >= LETTER_STEPS.length - 1) {
      return;
    }
    currentStep += 1;
    applyStep(currentStep);
  });

  applyStep(currentStep);
};

initLetterExperience();
