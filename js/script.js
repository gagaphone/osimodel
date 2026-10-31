
/* =========================================================
   OSI MODEL — LAYER INFORMATION
   ========================================================= */

const layerData = {

  7: {
    name: "Application Layer",

    description:
      "Provides network services and protocols used by applications to communicate over a network.",

    pdu: "Data",

    functions:
      "Provides network services for applications, including web browsing, email, file transfer, and name resolution.",

    protocols:
      "HTTP, HTTPS, FTP, SMTP, DNS, DHCP, SSH",

    devices:
      "Servers, browsers, email clients, application gateways"
  },


  6: {
    name: "Presentation Layer",

    description:
      "Ensures that data is represented in a format that different systems can understand.",

    pdu: "Data",

    functions:
      "Handles data translation, character encoding, serialization, encryption, decryption, and compression.",

    protocols:
      "TLS, JPEG, MPEG, ASCII, Unicode, GIF, JSON, XML",

    devices:
      "Software libraries, encryption components, encoding and compression software"
  },


  5: {
    name: "Session Layer",

    description:
      "Establishes, manages, coordinates, and terminates communication sessions between applications.",

    pdu: "Data",

    functions:
      "Handles session establishment, session maintenance, dialogue control, synchronization, and session termination.",

    protocols:
      "NetBIOS, RPC, SMB, NFS",

    devices:
      "Applications and session-management software"
  },


  4: {
    name: "Transport Layer",

    description:
      "Provides end-to-end communication between application processes running on different hosts.",

    pdu: "Segment / Datagram",

    functions:
      "Handles port addressing, segmentation, reassembly, connection management, reliability, flow control, and error recovery.",

    protocols:
      "TCP, UDP, SCTP, QUIC",

    devices:
      "Stateful firewalls, Layer 4 load balancers"
  },


  3: {
    name: "Network Layer",

    description:
      "Provides logical addressing and determines how packets travel between different networks.",

    pdu: "Packet",

    functions:
      "Handles logical IP addressing, routing, path selection, packet forwarding, and fragmentation where supported.",

    protocols:
      "IPv4, IPv6, ICMP, OSPF, RIP, BGP",

    devices:
      "Routers, Layer 3 switches, packet-filtering firewalls"
  },


  2: {
    name: "Data Link Layer",

    description:
      "Transfers data across a local network link by organizing bits into frames.",

    pdu: "Frame",

    functions:
      "Handles framing, MAC addressing, media access control, link-level error detection, and VLAN handling.",

    protocols:
      "Ethernet, Wi-Fi, PPP, VLAN, STP, LACP",

    devices:
      "Switches, bridges, network adapters, wireless access points"
  },


  1: {
    name: "Physical Layer",

    description:
      "Transmits raw binary data as electrical, optical, or radio signals over a physical medium.",

    pdu: "Bits",

    functions:
      "Handles signal transmission, bit timing, physical connections, media characteristics, and transmission rates.",

    protocols:
      "Ethernet physical standards, DSL, USB, fibre-optic standards, radio",

    devices:
      "Cables, connectors, hubs, repeaters, transceivers"
  }

};


/* =========================================================
   INITIALIZE CLICKABLE OSI LAYERS
   ========================================================= */

function initializeLayerButtons() {

  const layerGrid = document.querySelector(".layer-grid");

  const layerContent = document.getElementById("layer-content");

  if (!layerGrid || !layerContent) {
    console.warn("OSI layer elements were not found.");
    return;
  }


  /* -----------------------------------------
     GET BUTTONS
     ----------------------------------------- */

  const layerCards = Array.from(
    layerGrid.querySelectorAll(".layer-card")
  );


  /* -----------------------------------------
     GET DYNAMIC CONTENT ELEMENTS
     ----------------------------------------- */

  const elements = {

    number: document.getElementById("layer-number"),

    name: document.getElementById("layer-name"),

    description: document.getElementById("layer-description"),

    pdu: document.getElementById("layer-pdu"),

    functions: document.getElementById("layer-functions"),

    protocols: document.getElementById("layer-protocols"),

    devices: document.getElementById("layer-devices")

  };


  /* -----------------------------------------
     UPDATE CONTENT FUNCTION
     ----------------------------------------- */

  function updateContent(element, value) {

    if (!element) return;

    element.textContent = value;

  }


  /* -----------------------------------------
     SELECT OSI LAYER
     ----------------------------------------- */

  function selectLayer(layerId) {

    const id = Number(layerId);

    const layer = layerData[id];

    // Stop if the selected layer does not exist.
    if (!layer) return;


    /* -----------------------------------------
       UPDATE ACTIVE BUTTON
       ----------------------------------------- */

    layerCards.forEach(card => {

      const isActive =
        Number(card.dataset.layer) === id;

      card.classList.toggle("active", isActive);

      card.setAttribute(
        "aria-pressed",
        String(isActive)
      );

    });


    /* -----------------------------------------
       UPDATE RIGHT-SIDE CONTENT
       ----------------------------------------- */

    updateContent(
      elements.number,
      `OSI MODEL — LAYER ${String(id).padStart(2, "0")}`
    );

    updateContent(
      elements.name,
      layer.name
    );

    updateContent(
      elements.description,
      layer.description
    );

    updateContent(
      elements.pdu,
      layer.pdu
    );

    updateContent(
      elements.functions,
      layer.functions
    );

    updateContent(
      elements.protocols,
      layer.protocols
    );

    updateContent(
      elements.devices,
      layer.devices
    );

  }


  /* -----------------------------------------
     CLICK EVENT
     ----------------------------------------- */

  layerGrid.addEventListener("click", event => {

    const card = event.target.closest(".layer-card");

    if (!card || !layerGrid.contains(card)) return;

    selectLayer(card.dataset.layer);

  });


  /* -----------------------------------------
     KEYBOARD NAVIGATION
     ----------------------------------------- */

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

          nextIndex =
            (index - 1 + layerCards.length) % layerCards.length;

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


  /* -----------------------------------------
     INITIAL ACTIVE LAYER
     ----------------------------------------- */

  const initialCard =

    layerCards.find(card =>
      card.getAttribute("aria-pressed") === "true"
    ) ||

    layerCards.find(card =>
      card.classList.contains("active")
    ) ||

    layerCards.find(card =>
      card.dataset.layer === "7"
    ) ||

    layerCards[0];


  if (initialCard) {

    selectLayer(initialCard.dataset.layer);

  }

}


/* =========================================================
   INITIALIZE OSI LAYER INTERACTION
   ========================================================= */

if (document.readyState === "loading") {

  document.addEventListener(
    "DOMContentLoaded",
    initializeLayerButtons
  );

} else {

  initializeLayerButtons();

}
