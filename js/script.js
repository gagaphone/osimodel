
/* =========================================================
   OSI MODEL — LAYER INFORMATION
   ========================================================= */

const layerData = {

  7: {
    name: "Application Layer",

    description:
      "Provides network services and protocols used by applications to communicate over a network.",

    pdu: "Data (Application payload, such as an HTTP request or DNS query)",

    functions:
      "Provides network services for applications, including web browsing, email, file transfer, name resolution, and network management.",

    protocols:
      "HTTP, HTTPS, SMTP, IMAP, POP3, FTP, SFTP, DNS, DHCP, SNMP, SSH, Telnet",

    addressing:
      "Hostnames, domain names, URLs, email addresses, and application-specific identifiers.",

    devices:
      "Servers, browsers, email clients, proxies, application gateways, and network management systems.",

    fault:
      "Incorrect URLs, DNS resolution failures, incorrect application settings, unavailable services, authentication failures, or server-side errors.",

    example:
      "When you enter a website address in your browser, DNS resolves the domain name to an IP address and HTTP or HTTPS is used to request the webpage."
  },


  6: {
    name: "Presentation Layer",

    description:
      "Ensures that data is represented in a format that different systems can understand.",

    pdu: "Data (Data representation, encoding, or encryption)",

    functions:
      "Handles data translation, character encoding, serialization, encryption, decryption, and compression.",

    protocols:
      "TLS, ASCII, Unicode, EBCDIC, JPEG, GIF, MPEG, MP3, JSON, XML",

    addressing:
      "No independent network addressing. This layer focuses on data formats, character sets, serialization, and representation.",

    devices:
      "Software libraries, encryption components, encoding and compression software, and application frameworks.",

    fault:
      "Character encoding mismatches, incompatible data formats, corrupted or unsupported files, certificate problems, and encryption configuration errors.",

    example:
      "A system converts text into UTF-8, compresses an image, or encrypts application data using TLS. TLS is commonly associated with this layer conceptually, although its actual implementation spans the TCP/IP stack."
  },


  5: {
    name: "Session Layer",

    description:
      "Establishes, manages, coordinates, and terminates communication sessions between applications.",

    pdu: "Data (Session and dialogue context)",

    functions:
      "Handles session establishment, session maintenance, dialogue control, synchronization, checkpoints, and session termination.",

    protocols:
      "NetBIOS session services, RPC, SMB, NFS, and application-level session functions.",

    addressing:
      "Session identifiers, application session IDs, and logical conversation identifiers. There is no universal Session Layer address.",

    devices:
      "Applications, session-management software, RPC services, and systems that manage persistent application sessions.",

    fault:
      "Session timeouts, unexpected disconnections, failed authentication, expired session tokens, synchronization problems, and session limits.",

    example:
      "When a user signs in to an application, the application establishes a session and maintains it while the user interacts with the service. Modern TCP/IP applications often handle these functions directly rather than through a separate Session Layer."
  },


  4: {
    name: "Transport Layer",

    description:
      "Provides end-to-end communication between application processes running on different hosts.",

    pdu: "TCP Segment / UDP Datagram (Port numbers and, for TCP, sequencing and acknowledgement information)",

    functions:
      "Handles port addressing, segmentation, reassembly, connection management, reliability, sequencing, acknowledgements, retransmission, and flow control. TCP provides reliability, while UDP offers lower-overhead connectionless communication.",

    protocols:
      "TCP, UDP, SCTP, QUIC",

    addressing:
      "Port numbers identify application processes. Examples include TCP port 443 for HTTPS and UDP port 53 for DNS.",

    devices:
      "Stateful firewalls, Layer 4 load balancers, and systems that inspect or filter transport traffic.",

    fault:
      "Blocked ports, failed TCP handshakes, connection timeouts, packet loss, incorrect port numbers, and transport-level filtering. HTTP/1.1 and HTTP/2 commonly use TCP, while HTTP/3 uses QUIC over UDP.",

    example:
      "When a browser connects to a web server over HTTPS using TCP, the client and server establish a connection and exchange data reliably using sequencing, acknowledgements, and retransmissions."
  },


  3: {
    name: "Network Layer",

    description:
      "Provides logical addressing and determines how packets travel between different networks.",

    pdu: "Packet (Source and destination IP addresses)",

    functions:
      "Handles logical IP addressing, routing, path selection, packet forwarding, and fragmentation where supported.",

    protocols:
      "IP, ICMP, OSPF, EIGRP, RIP, BGP",

    addressing:
      "Logical IP addresses, including IPv4 (32-bit) and IPv6 (128-bit) addresses. Subnet masks and prefixes define network boundaries.",

    devices:
      "Routers, Layer 3 switches, and packet-filtering firewalls.",

    fault:
      "Missing routes, incorrect IP addresses, wrong subnet masks, invalid default gateways, routing loops, and unreachable destinations.",

    example:
      "When a computer sends a packet to a device on another network, its default gateway receives the packet and uses its routing table to determine the next hop."
  },


  2: {
    name: "Data Link Layer",

    description:
      "Transfers data across a local network link by organizing bits into frames.",

    pdu: "Frame (Link-layer addresses and frame-check information)",

    functions:
      "Handles framing, MAC addressing (Media Access Control) link-level error detection, VLAN handling, and LLC (Logical Link Control).",

    protocols:
      "Ethernet, Wi-Fi (IEEE 802.11), PPP, VLAN (IEEE 802.1Q), STP, LACP",

    addressing:
      "MAC addresses identify network interfaces on a local network link. Ethernet switches use MAC address tables to forward frames.",

    devices:
      "Switches, bridges, network adapters, wireless access points, and Layer 2 network devices.",

    fault:
      "VLAN mismatches, switching loops, incorrect MAC learning, damaged frames, duplex mismatches, and Layer 2 connectivity problems.",

    example:
      "When a computer sends an Ethernet frame, a switch examines the destination MAC address and uses its MAC address table to forward the frame through the appropriate port."
  },


  1: {
    name: "Physical Layer",

    description:
      "Transmits raw binary data as electrical, optical, or radio signals over a physical medium.",

    pdu: "Bits (1s and 0s), Signals represented as binary data",

    functions:
      "Handles signal transmission, bit timing, physical connections, media characteristics, connectors, transmission rates, and duplex modes.",

    protocols:
      "Ethernet physical standards, DSL, USB, fibre-optic standards, and wireless radio specifications.",

    addressing:
      "No logical or MAC addressing. Information is transmitted as physical signals representing bits.",

    devices:
      "Cables, connectors, hubs, repeaters, transceivers, antennas, and physical network interfaces.",

    fault:
      "Damaged cables, disconnected ports, faulty connectors, bad transceivers, wireless interference, and cable-length limitations.",

    example:
      "When an Ethernet cable is connected, electrical signals travel through its copper wires. A link light on the network port can indicate that a physical connection has been established."
  }

};

/* =========================================================
   OSI MODEL — APPLICATION INITIALIZATION
   ========================================================= */

(function () {
  "use strict";

  /* =======================================================
     SHARED HELPERS
     ======================================================= */

  function setText(element, value) {
    if (element && value !== undefined && value !== null) {
      element.textContent = value;
    }
  }

  function getLayerNumber(card) {
    return Number(card.dataset.layer);
  }

  /* =======================================================
     OSI LAYER INFORMATION
     ======================================================= */

  function initializeLayerButtons() {
    const layerGrid = document.querySelector(".layer-grid");
    const layerContent = document.getElementById("layer-content");

    if (!layerGrid || !layerContent) {
      console.warn(
        "OSI layer overview not found; skipping layer initialization."
      );
      return;
    }

    const layerCards = Array.from(
      layerGrid.querySelectorAll(".layer-card[data-layer]")
    );

    if (!layerCards.length) {
      console.warn("No OSI layer cards found.");
      return;
    }

    const elements = {
      number: document.getElementById("layer-number"),
      name: document.getElementById("layer-name"),
      description: document.getElementById("layer-description"),
      pdu: document.getElementById("layer-pdu"),
      functions: document.getElementById("layer-functions"),
      protocols: document.getElementById("layer-protocols"),
      addressing: document.getElementById("layer-addressing"),
      devices: document.getElementById("layer-devices"),
      fault: document.getElementById("layer-fault"),
      example: document.getElementById("layer-example-text")
    };

    /* -----------------------------------------
       PROTOCOL GROUPS
       ----------------------------------------- */

    function updateProtocols(id, layer) {
      const element = elements.protocols;

      if (!element) return;

      if (id === 7) {
        element.replaceChildren();

        const groups = [
          ["Web", "HTTP, HTTPS"],
          ["Email", "SMTP, IMAP, POP3"],
          [
            "Other Protocols",
            "FTP, SFTP, DNS, DHCP, SNMP, SSH, Telnet"
          ]
        ];

        groups.forEach(([heading, description]) => {
          const group = document.createElement("div");
          group.className = "protocol-group";

          const strong = document.createElement("strong");
          strong.textContent = heading;

          const span = document.createElement("span");
          span.textContent = description;

          group.append(strong, span);
          element.appendChild(group);
        });

      } else if (id === 6) {
        element.replaceChildren();

        const groups = [
          ["Encoding", "ASCII, Unicode, EBCDIC"],
          ["Data Formats", "JSON, XML, JPEG, GIF, MPEG, MP3"]
        ];

        groups.forEach(([heading, description]) => {
          const group = document.createElement("div");
          group.className = "protocol-group";

          const strong = document.createElement("strong");
          strong.textContent = heading;

          const span = document.createElement("span");
          span.textContent = description;

          group.append(strong, span);
          element.appendChild(group);
        });

      } else {
        setText(element, layer.protocols);
      }
    }

    /* -----------------------------------------
       SELECT A LAYER
       ----------------------------------------- */

    function selectLayer(layerId) {
      const id = Number(layerId);
      const layer = layerData[id];

      if (!layer) return;

      layerCards.forEach(card => {
        const active = getLayerNumber(card) === id;

        card.classList.toggle("active", active);
        card.setAttribute("aria-pressed", String(active));
      });

      setText(
        elements.number,
        `OSI MODEL — LAYER ${String(id).padStart(2, "0")}`
      );

      setText(elements.name, layer.name);
      setText(elements.description, layer.description);
      setText(elements.pdu, layer.pdu);
      setText(elements.functions, layer.functions);

      updateProtocols(id, layer);

      setText(elements.addressing, layer.addressing);
      setText(elements.devices, layer.devices);
      setText(elements.fault, layer.fault);
      setText(elements.example, layer.example);
    }

    /* -----------------------------------------
       CARD CLICK HANDLER
       ----------------------------------------- */

    layerGrid.addEventListener("click", event => {
      const target = event.target;

      if (!(target instanceof Element)) return;

      const card = target.closest(".layer-card[data-layer]");

      if (!card || !layerGrid.contains(card)) return;

      selectLayer(card.dataset.layer);
    });

    /* -----------------------------------------
       KEYBOARD NAVIGATION
       ----------------------------------------- */

    layerCards.forEach((card, index) => {
      card.addEventListener("keydown", event => {
        let nextIndex;

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
       INITIAL SELECTION
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

  /* =======================================================
     GENERIC TAB INITIALIZER
     ======================================================= */

  function initializeTabGroup(tabContainer) {
    if (tabContainer.dataset.tabsInitialized === "true") {
      return;
    }

    /*
     * Supported button patterns:
     *   <button role="tab" aria-controls="panel-id">
     *   <button data-tab-target="#panel-id">
     *   <button data-tab="panel-id">
     *
     * For data-tab, the value can be either an element ID
     * or a CSS selector.
     */

    const tabButtons = Array.from(
      tabContainer.querySelectorAll(
        '[role="tab"], [data-tab-target], button[data-tab]'
      )
    );

    if (!tabButtons.length) return;

    function getPanel(button) {
      const target =
        button.getAttribute("data-tab-target") ||
        button.getAttribute("aria-controls") ||
        button.getAttribute("data-tab");

      if (!target) return null;

      // Prefer an ID lookup for simple ID values.
      if (/^[A-Za-z][\w:.-]*$/.test(target)) {
        const byId = document.getElementById(target);
        if (byId) return byId;
      }

      try {
        return document.querySelector(target);
      } catch {
        return null;
      }
    }

    const pairs = tabButtons
      .map(button => ({
        button,
        panel: getPanel(button)
      }))
      .filter(pair => pair.panel);

    if (!pairs.length) {
      console.warn(
        "Tab buttons were found, but no matching panels were found.",
        tabContainer
      );
      return;
    }

    function activateTab(selectedButton, moveFocus = false) {
      pairs.forEach(({ button, panel }) => {
        const active = button === selectedButton;

        button.classList.toggle("active", active);
        button.setAttribute("aria-selected", String(active));

        if (button.hasAttribute("role")) {
          button.setAttribute("tabindex", active ? "0" : "-1");
        }

        panel.hidden = !active;
        panel.classList.toggle("active", active);
      });

      if (moveFocus) {
        selectedButton.focus();
      }
    }

    /* Click to activate a tab. */

    tabContainer.addEventListener("click", event => {
      const target = event.target;

      if (!(target instanceof Element)) return;

      const button = target.closest(
        '[role="tab"], [data-tab-target], button[data-tab]'
      );

      if (!button || !tabContainer.contains(button)) return;

      if (!pairs.some(pair => pair.button === button)) return;

      event.preventDefault();
      activateTab(button);
    });

    /* Keyboard navigation for tabs. */

    tabButtons.forEach((button, index) => {
      button.addEventListener("keydown", event => {
        let nextIndex;

        switch (event.key) {
          case "ArrowRight":
          case "ArrowDown":
            nextIndex = (index + 1) % tabButtons.length;
            break;

          case "ArrowLeft":
          case "ArrowUp":
            nextIndex =
              (index - 1 + tabButtons.length) % tabButtons.length;
            break;

          case "Home":
            nextIndex = 0;
            break;

          case "End":
            nextIndex = tabButtons.length - 1;
            break;

          default:
            return;
        }

        const nextButton = tabButtons[nextIndex];

        if (!pairs.some(pair => pair.button === nextButton)) return;

        event.preventDefault();
        activateTab(nextButton, true);
      });
    });

    /* Keep the existing active tab where possible. */

    const initialPair =
      pairs.find(({ button }) =>
        button.getAttribute("aria-selected") === "true"
      ) ||
      pairs.find(({ button }) =>
        button.classList.contains("active")
      ) ||
      pairs[0];

    activateTab(initialPair.button);

    tabContainer.dataset.tabsInitialized = "true";
  }

  /* =======================================================
     FIND TROUBLESHOOTING AND QUIZ TAB GROUPS
     ======================================================= */

  function initializeTabs() {
    const tabContainers = new Set();

    /*
     * Standard accessible tab groups.
     */
    document.querySelectorAll('[role="tablist"]').forEach(container => {
      tabContainers.add(container);
    });

    /*
     * Common custom tab wrappers.
     * These are included only when they contain recognizable
     * tab buttons, to avoid capturing unrelated controls.
     */
    const wrapperSelectors = [
      ".troubleshooting-tabs",
      ".quiz-tabs",
      ".tab-container",
      ".tabs",
      "[data-tabs]"
    ];

    wrapperSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(container => {
        if (
          container.querySelector(
            '[role="tab"], [data-tab-target], button[data-tab]'
          )
        ) {
          tabContainers.add(container);
        }
      });
    });

    tabContainers.forEach(initializeTabGroup);
  }

  /* =======================================================
     INITIALIZE APPLICATION FEATURES
     ======================================================= */

  function initializeApp() {
    initializeLayerButtons();
    initializeTabs();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeApp, {
      once: true
    });
  } else {
    initializeApp();
  }

})();
