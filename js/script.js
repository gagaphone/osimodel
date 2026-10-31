
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
    question: "Which is a responsibility associated with the Presentation Layer?",
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


/* ==========================================
   QUIZ ELEMENT REFERENCES
   ========================================== */

const quizForm = document.getElementById("quiz-form");
const quizContainer = document.getElementById("quiz-questions");
const quizResult = document.getElementById("quiz-result");
const showAnswersButton = document.getElementById("show-answers");
const retakeQuizButton = document.getElementById("retake-quiz");


/* ==========================================
   RENDER QUIZ QUESTIONS
   ========================================== */

function renderQuiz() {
  if (!quizForm || !quizContainer) return;

  const fragment = document.createDocumentFragment();

  quizQuestions.forEach((item, questionIndex) => {
    const fieldset = document.createElement("fieldset");
    fieldset.className = "quiz-question";

    const legend = document.createElement("legend");
    legend.textContent = `${questionIndex + 1}. ${item.question}`;

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
    feedback.setAttribute("aria-live", "polite");

    fieldset.append(legend, optionsContainer, feedback);
    fragment.appendChild(fieldset);
  });

  quizContainer.replaceChildren(fragment);
}


/* ==========================================
   DISPLAY QUIZ FEEDBACK
   ========================================== */

function displayQuizFeedback(revealAll = false) {
  if (!quizForm) return;

  let score = 0;
  let answered = 0;

  quizQuestions.forEach((item, questionIndex) => {
    const selected = quizForm.querySelector(
      `input[name="question-${questionIndex}"]:checked`
    );

    const feedback = document.getElementById(
      `quiz-feedback-${questionIndex}`
    );

    if (!feedback) return;

    feedback.hidden = true;
    feedback.classList.remove("is-correct", "is-incorrect");

    if (!selected && !revealAll) {
      feedback.textContent =
        "Choose an answer to complete this question.";

      feedback.classList.add("is-incorrect");
      feedback.hidden = false;
      return;
    }

    const isCorrect =
      selected !== null &&
      Number(selected.value) === item.answer;

    if (selected) {
      answered++;
      if (isCorrect) score++;
    }

    if (isCorrect) {
      feedback.textContent = `Correct! ${item.explanation}`;
      feedback.classList.add("is-correct");
    } else {
      feedback.textContent =
        `Correct answer: ${item.options[item.answer]}. ${item.explanation}`;

      feedback.classList.add("is-incorrect");
    }

    feedback.hidden = false;
  });

  if (!quizResult) return;

  if (revealAll) {
    quizResult.textContent =
      "Answer key displayed. Review the explanations and try again.";
  } else {
    quizResult.textContent =
      `Your score: ${score} out of ${quizQuestions.length}. ` +
      `${answered} of ${quizQuestions.length} questions answered.`;
  }
}


/* ==========================================
   QUIZ EVENT LISTENERS
   ========================================== */

function initializeQuiz() {
  if (quizForm) {
    quizForm.addEventListener("submit", event => {
      event.preventDefault();
      displayQuizFeedback(false);
    });
  }

  if (showAnswersButton) {
    showAnswersButton.addEventListener("click", () => {
      displayQuizFeedback(true);
    });
  }

  if (retakeQuizButton && quizForm) {
    retakeQuizButton.addEventListener("click", () => {
      quizForm.reset();

      quizQuestions.forEach((_, questionIndex) => {
        const feedback = document.getElementById(
          `quiz-feedback-${questionIndex}`
        );

        if (!feedback) return;

        feedback.hidden = true;
        feedback.textContent = "";
        feedback.classList.remove("is-correct", "is-incorrect");
      });

      if (quizResult) {
        quizResult.textContent = "";
      }
    });
  }
}


/* ==========================================
   OSI LAYER INFORMATION
   ========================================== */

const layerData = {
  7: {
    name: "Application Layer",
    description:
      "Provides network services and protocols used by applications to communicate over a network.",
    pdu: "Data",
    functions:
      "Provides network services for applications, including web browsing, email, file transfer, and name resolution.",
    protocols: "HTTP, HTTPS, FTP, SMTP, DNS, DHCP, SSH",
    devices:
      "Servers, browsers, email clients, application gateways"
  },

  6: {
    name: "Presentation Layer",
    description:
      "Ensures that data is represented in a format that different systems can understand.",
    pdu: "Data",
    functions:
      "Data translation, character encoding, serialization, encryption, decryption, and compression.",
    protocols: "TLS, JPEG, MPEG, ASCII, Unicode, GIF, JSON, XML",
    devices:
      "Software libraries, encryption components, encoding and compression software"
  },

  5: {
    name: "Session Layer",
    description:
      "Establishes, manages, coordinates, and terminates communication sessions between applications.",
    pdu: "Data",
    functions:
      "Session establishment, session maintenance, dialogue control, synchronization, and session termination.",
    protocols: "NetBIOS, RPC, SMB, NFS",
    devices: "Applications and session-management software"
  },

  4: {
    name: "Transport Layer",
    description:
      "Provides end-to-end communication between application processes running on different hosts.",
    pdu: "Segment / Datagram",
    functions:
      "Port addressing, segmentation, reassembly, connection management, reliability, flow control, and error recovery.",
    protocols: "TCP, UDP, SCTP, QUIC",
    devices: "Stateful firewalls, Layer 4 load balancers"
  },

  3: {
    name: "Network Layer",
    description:
      "Provides logical addressing and determines how packets travel between different networks.",
    pdu: "Packet",
    functions:
      "Logical IP addressing, routing, path selection, packet forwarding, and fragmentation where supported.",
    protocols: "IPv4, IPv6, ICMP, OSPF, RIP, BGP",
    devices:
      "Routers, Layer 3 switches, packet-filtering firewalls"
  },

  2: {
    name: "Data Link Layer",
    description:
      "Transfers data across a local network link by organizing bits into frames.",
    pdu: "Frame",
    functions:
      "Framing, MAC addressing, media access control, link-level error detection, and VLAN handling.",
    protocols: "Ethernet, Wi-Fi, PPP, VLAN, STP, LACP",
    devices:
      "Switches, bridges, network adapters, wireless access points"
  },

  1: {
    name: "Physical Layer",
    description:
      "Transmits raw binary data as electrical, optical, or radio signals over a physical medium.",
    pdu: "Bits",
    functions:
      "Signal transmission, bit timing, physical connections, media characteristics, and transmission rates.",
    protocols:
      "Ethernet physical standards, DSL, USB, fibre-optic standards, radio",
    devices: "Cables, connectors, hubs, repeaters, transceivers"
  }
};


/* ==========================================
   OSI LAYER BUTTONS
   ========================================== */

function initializeLayerButtons() {
  const layerGrid = document.querySelector(".layer-grid");

  if (!layerGrid) {
    console.warn("OSI layers: .layer-grid was not found.");
    return;
  }

  const layerCards = Array.from(
    layerGrid.querySelectorAll(".layer-card")
  );

  const elements = {
    number: document.getElementById("layer-number"),
    name: document.getElementById("layer-name"),
    description: document.getElementById("layer-description"),
    pdu: document.getElementById("layer-pdu"),
    functions: document.getElementById("layer-functions"),
    protocols: document.getElementById("layer-protocols"),
    devices: document.getElementById("layer-devices")
  };

  function updateText(element, value) {
    if (element) {
      element.textContent = value;
    }
  }

  function selectLayer(layerId) {
    const id = Number(layerId);
    const layer = layerData[id];

    if (!layer) {
      console.warn(`OSI layers: Invalid layer number "${layerId}".`);
      return;
    }

    // Update selected button appearance and accessibility.
    layerCards.forEach(card => {
      const isSelected = Number(card.dataset.layer) === id;

      card.classList.toggle("is-active", isSelected);
      card.classList.toggle("active", isSelected);
      card.setAttribute("aria-pressed", String(isSelected));
    });

    // Update the right-side content.
    updateText(elements.number, `OSI MODEL — LAYER ${id}`);
    updateText(elements.name, layer.name);
    updateText(elements.description, layer.description);
    updateText(elements.pdu, layer.pdu);
    updateText(elements.functions, layer.functions);
    updateText(elements.protocols, layer.protocols);
    updateText(elements.devices, layer.devices);
  }

  // Event delegation: clicks on any layer card are handled here.
  layerGrid.addEventListener("click", event => {
    const card = event.target.closest(".layer-card");

    if (!card || !layerGrid.contains(card)) return;

    selectLayer(card.dataset.layer);
  });

  // Keyboard support for the layer buttons.
  layerCards.forEach((card, index) => {
    card.addEventListener("keydown", event => {
      let nextIndex = index;

      switch (event.key) {
        case "ArrowDown":
        case "ArrowRight":
          nextIndex = (index + 1) % layerCards.length;
          break;

        case "ArrowUp":
        case "ArrowLeft":
          nextIndex = (index - 1 + layerCards.length) % layerCards.length;
          break;

        case "Home":
          nextIndex = 0;
          break;

        case "End":
          nextIndex = layerCards.length - 1;
          break;

        default:
          return;
      }

      event.preventDefault();

      const nextCard = layerCards[nextIndex];
      selectLayer(nextCard.dataset.layer);
      nextCard.focus();
    });
  });

  // Select the initially active card, or Layer 7 by default.
  const initialCard =
    layerCards.find(card => card.classList.contains("active")) ||
    layerCards.find(card => card.classList.contains("is-active")) ||
    layerCards.find(card => card.dataset.layer === "7") ||
    layerCards[0];

  if (initialCard) {
    selectLayer(initialCard.dataset.layer);
  }
}


/* ==========================================
   TROUBLESHOOTING TABS
   ========================================== */

function initializeTroubleshootingTabs() {
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

  if (
    !tabs.length ||
    tabs.length !== panels.length ||
    !previousButton ||
    !nextButton ||
    !progress
  ) {
    console.warn(
      "Troubleshooting tabs: Required HTML elements are missing or mismatched."
    );
    return;
  }

  const associationsValid = tabs.every((tab, index) => {
    const panelId = tab.getAttribute("aria-controls");
    const tabId = tab.id;

    return (
      tabId &&
      panelId &&
      panels[index].id === panelId &&
      panels[index].getAttribute("aria-labelledby") === tabId
    );
  });

  if (!associationsValid) {
    console.warn(
      "Troubleshooting tabs: Check tab IDs, aria-controls, and aria-labelledby."
    );
    return;
  }

  let activeIndex = 0;

  function activateTab(index, moveFocus = false) {
    activeIndex = Math.max(0, Math.min(index, tabs.length - 1));

    tabs.forEach((tab, i) => {
      const isActive = i === activeIndex;

      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.setAttribute("tabindex", isActive ? "0" : "-1");

      panels[i].classList.toggle("is-active", isActive);
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
          nextIndex = (activeIndex - 1 + tabs.length) % tabs.length;
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
}


/* ==========================================
   INITIALIZE APPLICATION
   ========================================== */

function initializeApp() {
  renderQuiz();
  initializeQuiz();
  initializeLayerButtons();
  initializeTroubleshootingTabs();
}

// Works whether this script loads before or after DOMContentLoaded.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}
