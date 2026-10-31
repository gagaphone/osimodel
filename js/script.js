
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

    pdu: "Data",

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

    pdu: "Data",

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

    pdu: "TCP Segment / UDP Datagram",

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

    pdu: "Packet",

    functions:
      "Handles logical IP addressing, routing, path selection, packet forwarding, and fragmentation where supported.",

    protocols:
      "IPv4, IPv6, ICMP, OSPF, EIGRP, RIP, BGP",

    addressing:
      "Logical IP addresses, including IPv4 and IPv6 addresses. Subnet masks and prefixes define network boundaries.",

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

    pdu: "Frame",

    functions:
      "Handles framing, MAC addressing, media access control, link-level error detection, VLAN handling, and logical link control (LLC).",

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

    pdu: "Bits (1s and 0s)",

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

    addressing: document.getElementById("layer-addressing"),

    devices: document.getElementById("layer-devices"),

    fault: document.getElementById("layer-fault"),

    example: document.getElementById("layer-example-text")

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
      elements.addressing,
      layer.addressing
    );

    updateContent(
      elements.devices,
      layer.devices
    );

    updateContent(
      elements.fault,
      layer.fault
    );

    updateContent(
      elements.example,
      layer.example
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
