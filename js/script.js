/* ==========================================
   OSI MODEL QUIZ
   ========================================== */

const quizQuestions = [
  {
    question: "What is encapsulation in the OSI model?",
    options: [
      "Removing all headers before transmission",
      "Adding layer-specific information as data moves down the stack",
      "Converting every packet into an IP address",
      "Encrypting all data at Layer 1"
    ],
    answer: 1,
    explanation:
      "Encapsulation adds headers and, where applicable, trailers as data travels down the sender's stack."
  },
  {
    question:
      "Which is a responsibility associated with the Presentation Layer?",
    options: [
      "Routing packets between networks",
      "Learning MAC addresses on a switch",
      "Data encoding, translation, compression, and encryption functions",
      "Transmitting electrical signals over a cable"
    ],
    answer: 2,
    explanation:
      "Layer 6 describes data representation and transformation functions. In modern networks, these may be handled by application software and protocols."
  },
  {
    question:
      "A remote server responds to ping, but its TCP service on port 443 cannot be reached. Which layer is a useful place to investigate?",
    options: [
      "Layer 1 — Physical",
      "Layer 2 — Data Link",
      "Layer 4 — Transport",
      "Layer 6 — Presentation"
    ],
    answer: 2,
    explanation:
      "A blocked port or failed TCP connection suggests investigating transport connectivity and firewall rules. A successful ping alone does not prove that every lower-layer function is working correctly."
  },
  {
    question: "How does the four-layer TCP/IP model differ from the OSI model?",
    options: [
      "It has seven layers with different names",
      "It groups OSI Session, Presentation, and Application functions into Application, and Physical and Data Link functions into Network Access",
      "It does not use IP addresses",
      "It replaces TCP and UDP with Ethernet"
    ],
    answer: 1,
    explanation:
      "The four-layer TCP/IP model groups functions that the OSI model describes in separate layers."
  },
  {
    question:
      "Which devices are primarily associated with the Data Link Layer?",
    options: [
      "Routers only",
      "DNS servers and browsers",
      "Switches and bridges",
      "Web applications"
    ],
    answer: 2,
    explanation:
      "Switches and bridges commonly forward frames using Layer 2 addressing information."
  },
  {
    question:
      "Which OSI layer provides network protocol services directly to applications?",
    options: [
      "Layer 1 — Physical",
      "Layer 3 — Network",
      "Layer 4 — Transport",
      "Layer 7 — Application"
    ],
    answer: 3,
    explanation:
      "The Application Layer includes network protocols such as HTTP, DNS, SMTP, and DHCP."
  },
  {
    question: "What is the main role of the Session Layer?",
    options: [
      "Establishing, managing, and terminating communication sessions",
      "Forwarding Ethernet frames between switch ports",
      "Choosing the best IP route",
      "Converting bits into radio signals"
    ],
    answer: 0,
    explanation:
      "The Session Layer describes session establishment, maintenance, dialogue coordination, and termination."
  },
  {
    question: "Which statement correctly compares TCP and UDP?",
    options: [
      "TCP is connectionless, while UDP guarantees delivery",
      "TCP provides reliable, connection-oriented transport; UDP is connectionless with lower protocol overhead",
      "Both operate only at the Physical Layer",
      "UDP always retransmits lost datagrams"
    ],
    answer: 1,
    explanation:
      "TCP provides sequencing, acknowledgements, and retransmission. UDP does not provide those delivery guarantees itself."
  },
  {
    question: "What is the primary function of the Physical Layer?",
    options: [
      "Resolving domain names",
      "Managing application sessions",
      "Transmitting raw bits through a physical medium",
      "Selecting routes based on IP addresses"
    ],
    answer: 2,
    explanation:
      "Layer 1 concerns physical media, signals, connectors, and bit transmission."
  },
  {
    question: "What is the primary function of the Network Layer?",
    options: [
      "Rendering web pages",
      "Managing keyboard input",
      "Compressing image files",
      "Logical addressing and routing packets between networks"
    ],
    answer: 3,
    explanation:
      "Layer 3 uses logical addresses such as IP addresses and supports packet routing between networks."
  }
];

const quizForm = document.getElementById("quiz-form");
const quizContainer = document.getElementById("quiz-questions");
const quizResult = document.getElementById("quiz-result");
const showAnswersButton = document.getElementById("show-answers");
const retakeQuizButton = document.getElementById("retake-quiz");

/* Render questions and choices safely into the page. */
function renderQuiz() {
  if (!quizForm || !quizContainer) {
    return;
  }

  const fragment = document.createDocumentFragment();

  quizQuestions.forEach((item, questionIndex) => {
    const fieldset = document.createElement("fieldset");
    fieldset.className = "quiz-question";

    const legend = document.createElement("legend");
    legend.textContent = `${questionIndex + 1}. ${item.question}`;
    fieldset.appendChild(legend);

    const optionsContainer = document.createElement("div");
    optionsContainer.className = "quiz-options";

    item.options.forEach((option, optionIndex) => {
      const label = document.createElement("label");
      label.className = "quiz-option";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${questionIndex}`;
      input.value = String(optionIndex);
      input.id = `quiz-${questionIndex}-option-${optionIndex}`;

      const text = document.createElement("span");
      text.textContent = option;

      label.append(input, text);
      optionsContainer.appendChild(label);
    });

    const feedback = document.createElement("p");
    feedback.id = `quiz-feedback-${questionIndex}`;
    feedback.className = "quiz-feedback";
    feedback.hidden = true;

    fieldset.append(optionsContainer, feedback);
    fragment.appendChild(fieldset);
  });

  quizContainer.replaceChildren(fragment);
}

/* Display feedback for each question. */
function displayQuizFeedback(revealAll = false) {
  let score = 0;
  let answered = 0;

  quizQuestions.forEach((item, questionIndex) => {
    const selected = quizForm.querySelector(
      `input[name="question-${questionIndex}"]:checked`
    );

    const feedback = document.getElementById(
      `quiz-feedback-${questionIndex}`
    );

    if (!feedback) {
      return;
    }

    feedback.hidden = true;
    feedback.classList.remove("is-correct", "is-incorrect");

    if (!revealAll && !selected) {
      feedback.textContent = "Choose an answer to complete this question.";
      feedback.hidden = false;
      feedback.classList.add("is-incorrect");
      return;
    }

    const isCorrect =
      selected && Number(selected.value) === item.answer;

    if (selected) {
      answered++;

      if (isCorrect) {
        score++;
      }
    }

    feedback.textContent = selected && isCorrect
      ? `Correct! ${item.explanation}`
      : `Correct answer: ${item.options[item.answer]}. ${item.explanation}`;

    feedback.classList.add(
      selected && !isCorrect ? "is-incorrect" : "is-correct"
    );
    feedback.hidden = false;
  });

  if (revealAll) {
    quizResult.textContent =
      "Answer key displayed. Review the explanations and try again.";
  } else {
    quizResult.textContent =
      `Your score: ${score} out of ${quizQuestions.length}. ` +
      `${answered} of ${quizQuestions.length} questions answered.`;
  }
}

/* Check the submitted answers. */
if (quizForm) {
  quizForm.addEventListener("submit", (event) => {
    event.preventDefault();
    displayQuizFeedback(false);
  });
}

/* Reveal correct answers and explanations. */
if (showAnswersButton) {
  showAnswersButton.addEventListener("click", () => {
    displayQuizFeedback(true);
  });
}

/* Clear responses to allow another attempt. */
if (retakeQuizButton && quizForm) {
  retakeQuizButton.addEventListener("click", () => {
    quizForm.reset();

    quizQuestions.forEach((_, questionIndex) => {
      const feedback = document.getElementById(
        `quiz-feedback-${questionIndex}`
      );

      if (feedback) {
        feedback.hidden = true;
        feedback.textContent = "";
        feedback.classList.remove("is-correct", "is-incorrect");
      }
    });

    quizResult.textContent = "";
  });
}

/* Initialize the quiz. */
renderQuiz();

/* troubleshooting section for all 7 OSI layers */
document.addEventListener("DOMContentLoaded", () => {
  const tabContainer = document.querySelector(".troubleshooting-tabs");

  if (!tabContainer) return;

  const tabs = Array.from(
    tabContainer.querySelectorAll('[role="tab"]')
  );

  const panels = Array.from(
    tabContainer.querySelectorAll('[role="tabpanel"]')
  );

  const previousButton = tabContainer.querySelector(
    ".troubleshooting-tabs__prev"
  );

  const nextButton = tabContainer.querySelector(
    ".troubleshooting-tabs__next"
  );

  const progress = tabContainer.querySelector(
    ".troubleshooting-tabs__progress"
  );

  let activeIndex = 0;

  function activateTab(index, moveFocus = false) {
    activeIndex = Math.max(
      0,
      Math.min(index, tabs.length - 1)
    );

    tabs.forEach((tab, i) => {
      const isActive = i === activeIndex;

      tab.classList.toggle("is-active", isActive);
      tab.setAttribute(
        "aria-selected",
        String(isActive)
      );
      tab.setAttribute(
        "tabindex",
        isActive ? "0" : "-1"
      );

      panels[i].classList.toggle(
        "is-active",
        isActive
      );

      panels[i].hidden = !isActive;
    });

    previousButton.disabled = activeIndex === 0;
    nextButton.disabled = activeIndex === tabs.length - 1;

    progress.textContent =
      `Layer ${activeIndex + 1} of ${tabs.length}`;

    if (moveFocus) {
      tabs[activeIndex].focus();
    }
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      activateTab(index);
    });

    tab.addEventListener("keydown", event => {
      let nextIndex = activeIndex;

      switch (event.key) {
        case "ArrowRight":
          nextIndex = (activeIndex + 1) % tabs.length;
          break;

        case "ArrowLeft":
          nextIndex =
            (activeIndex - 1 + tabs.length) % tabs.length;
          break;

        case "Home":
          nextIndex = 0;
          break;

        case "End":
          nextIndex = tabs.length - 1;
          break;

        default:
          return;
      }

      event.preventDefault();
      activateTab(nextIndex, true);
    });
  });

  previousButton.addEventListener("click", () => {
    activateTab(activeIndex - 1, true);
  });

  nextButton.addEventListener("click", () => {
    activateTab(activeIndex + 1, true);
  });

  activateTab(0);
});

<!-- TAB JAVASCRIPT -->


document.addEventListener("DOMContentLoaded", () => {

  const container = document.querySelector(".troubleshooting-tabs");

  if (!container) return;

  const tabs = Array.from(
    container.querySelectorAll('[role="tab"]')
  );

  const panels = Array.from(
    container.querySelectorAll('[role="tabpanel"]')
  );

  const previousButton = container.querySelector(
    ".troubleshooting-tabs__prev"
  );

  const nextButton = container.querySelector(
    ".troubleshooting-tabs__next"
  );

  const progress = container.querySelector(
    ".troubleshooting-tabs__progress"
  );

  let activeIndex = 0;

  function activateTab(index, moveFocus = false) {

    activeIndex = Math.max(
      0,
      Math.min(index, tabs.length - 1)
    );

    tabs.forEach((tab, i) => {

      const isActive = i === activeIndex;

      tab.classList.toggle("is-active", isActive);

      tab.setAttribute(
        "aria-selected",
        String(isActive)
      );

      tab.setAttribute(
        "tabindex",
        isActive ? "0" : "-1"
      );

      panels[i].classList.toggle(
        "is-active",
        isActive
      );

      panels[i].hidden = !isActive;

    });

    previousButton.disabled = activeIndex === 0;
    nextButton.disabled = activeIndex === tabs.length - 1;

    progress.textContent =
      `Layer ${activeIndex + 1} of ${tabs.length}`;

    if (moveFocus) {
      tabs[activeIndex].focus();
    }
  }

  tabs.forEach((tab, index) => {

    tab.addEventListener("click", () => {
      activateTab(index);
    });

    tab.addEventListener("keydown", event => {

      let nextIndex = activeIndex;

      switch (event.key) {

        case "ArrowRight":
          nextIndex = (activeIndex + 1) % tabs.length;
          break;

        case "ArrowLeft":
          nextIndex =
            (activeIndex - 1 + tabs.length) % tabs.length;
          break;

        case "Home":
          nextIndex = 0;
          break;

        case "End":
          nextIndex = tabs.length - 1;
          break;

        default:
          return;
      }

      event.preventDefault();
      activateTab(nextIndex, true);

    });

  });

  previousButton.addEventListener("click", () => {
    activateTab(activeIndex - 1, true);
  });

  nextButton.addEventListener("click", () => {
    activateTab(activeIndex + 1, true);
  });

  activateTab(0);

});
