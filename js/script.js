"use strict";

/*
 * OSI Model Layers and Protocols
 * Update the data below to maintain the protocol reference.
 */

const layers = [
  {
    number: 1,
    name: "Physical",
    purpose:
      "Responsible for transmitting raw bits over a physical medium (like cables or wireless).",
    protocols: [
      ["Ethernet", "Physical layer standards, e.g., IEEE 802.3"],
      ["Wi-Fi", "Physical aspects of IEEE 802.11"],
      ["Bluetooth", ""],
      ["DSL", "Digital Subscriber Line"],
      ["ISDN", "Integrated Services Digital Network"],
      ["Optical Fiber", ""],
      ["Coaxial Cable", ""],
      ["Infrared Communication", ""],
      ["RS-232", "Serial Communication Standard"],
      ["SONET", "Synchronous Optical Network"],
      ["PON", "Passive Optical Network"]
    ]
  },
  {
    number: 2,
    name: "Data Link",
    purpose:
      "Handles reliable transmission of data frames between nodes.",
    protocols: [
      ["Ethernet", "IEEE 802.3"],
      ["Wi-Fi", "Data Link layer aspects of IEEE 802.11"],
      ["PPP", "Point-to-Point Protocol"],
      ["HDLC", "High-Level Data Link Control"],
      ["ARP", "Address Resolution Protocol"],
      ["RARP", "Reverse Address Resolution Protocol"],
      ["MPLS", "Multiprotocol Label Switching"],
      ["Frame Relay", ""],
      ["ATM", "Asynchronous Transfer Mode"],
      ["Token Ring", ""],
      ["FDDI", "Fiber Distributed Data Interface"],
      ["LLDP", "Link Layer Discovery Protocol"],
      ["VLAN", "Virtual Local Area Network, IEEE 802.1Q"]
    ]
  },
  {
    number: 3,
    name: "Network",
    purpose:
      "Manages routing, addressing, and packet forwarding.",
    protocols: [
      ["IP", "Internet Protocol - IPv4 and IPv6"],
      ["ICMP", "Internet Control Message Protocol"],
      ["IGMP", "Internet Group Management Protocol"],
      ["IPsec", "Internet Protocol Security"],
      ["RIP", "Routing Information Protocol"],
      ["OSPF", "Open Shortest Path First"],
      ["BGP", "Border Gateway Protocol"],
      ["EIGRP", "Enhanced Interior Gateway Routing Protocol"],
      ["IS-IS", "Intermediate System to Intermediate System"],
      ["GRE", "Generic Routing Encapsulation"],
      ["NAT", "Network Address Translation"]
    ]
  },
  {
    number: 4,
    name: "Transport",
    purpose:
      "Ensures reliable or best-effort transmission between hosts.",
    protocols: [
      ["TCP", "Transmission Control Protocol"],
      ["UDP", "User Datagram Protocol"],
      ["SCTP", "Stream Control Transmission Protocol"],
      ["DCCP", "Datagram Congestion Control Protocol"],
      ["RSVP", "Resource Reservation Protocol"],
      ["QUIC", "Quick UDP Internet Connections"],
      ["RTP", "Real-time Transport Protocol"]
    ]
  },
  {
    number: 5,
    name: "Session",
    purpose:
      "Manages sessions and connections between applications.",
    protocols: [
      ["NetBIOS", "Network Basic Input/Output System"],
      ["PPTP", "Point-to-Point Tunneling Protocol"],
      ["RPC", "Remote Procedure Call"],
      ["SOCKS", "Socket Secure"],
      ["TLS/SSL", "Transport Layer Security/Secure Sockets Layer"],
      ["AppleTalk Session Protocols", ""]
    ]
  },
  {
    number: 6,
    name: "Presentation",
    purpose:
      "Ensures data is in a usable format and handles encryption, compression, and translation.",
    protocols: [
      ["TLS/SSL", "Transport Layer Security/Secure Sockets Layer"],
      ["JPEG", "Image Compression"],
      ["GIF", "Image Format"],
      ["PNG", "Image Format"],
      ["MPEG", "Media Format"],
      ["MP3", "Media Format"],
      ["ASCII", "Character Encoding"],
      ["EBCDIC", "Character Encoding"],
      ["XML", "Data Serialization Format"],
      ["JSON", "Data Serialization Format"],
      ["XDR", "External Data Representation"],
      ["HTML", "Presentation Format"],
      ["CSS", "Presentation Format"]
    ]
  },
  {
    number: 7,
    name: "Application",
    purpose:
      "Provides services for end-user applications and network access.",
    protocols: [
      ["HTTP/HTTPS", "Hypertext Transfer Protocol"],
      ["FTP", "File Transfer Protocol"],
      ["SFTP", "Secure File Transfer Protocol"],
      ["SMTP", "Simple Mail Transfer Protocol"],
      ["IMAP", "Internet Message Access Protocol"],
      ["POP3", "Post Office Protocol v3"],
      ["DNS", "Domain Name System"],
      ["DHCP", "Dynamic Host Configuration Protocol"],
      ["SNMP", "Simple Network Management Protocol"],
      ["Telnet", ""],
      ["SSH", "Secure Shell"],
      ["LDAP", "Lightweight Directory Access Protocol"],
      ["NTP", "Network Time Protocol"],
      ["TFTP", "Trivial File Transfer Protocol"],
      ["WHOIS", ""],
      ["IRC", "Internet Relay Chat"]
    ]
  }
];

/* Flatten the layer data for easier searching and filtering. */
const entries = layers.flatMap((layer) =>
  layer.protocols.map(([protocol, description]) => ({
    number: layer.number,
    name: layer.name,
    purpose: layer.purpose,
    protocol,
    description
  }))
);

/* Page controls */
const tableBody = document.getElementById("protocol-rows");
const searchInput = document.getElementById("search-input");
const layerFilter = document.getElementById("layer-filter");
const resultCount = document.getElementById("result-count");
const emptyState = document.getElementById("empty-state");
const resetButton = document.getElementById("reset-filters");
const protocolTotal = document.getElementById("protocol-total");

/* Display the number of entries automatically. */
protocolTotal.textContent = String(entries.length);

/* Safely create a regular table cell. */
function createCell(value, className = "") {
  const cell = document.createElement("td");

  if (className) {
    cell.className = className;
  }

  cell.textContent = value || "—";
  return cell;
}

/* Build a single row from an entry. */
function createRow(entry) {
  const row = document.createElement("tr");

  const numberCell = document.createElement("td");
  const badge = document.createElement("span");

  badge.className = "layer-number";
  badge.textContent = String(entry.number);
  numberCell.appendChild(badge);

  const layerCell = createCell(entry.name, "layer-name");
  const purposeCell = createCell(entry.purpose);
  const protocolCell = document.createElement("td");
  const protocolName = document.createElement("strong");

  protocolName.textContent = entry.protocol;
  protocolCell.appendChild(protocolName);

  const descriptionCell = createCell(entry.description);

  row.append(
    numberCell,
    layerCell,
    purposeCell,
    protocolCell,
    descriptionCell
  );

  return row;
}

/* Apply the search phrase and selected-layer filter. */
function renderTable() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedLayer = layerFilter.value;

  const filteredEntries = entries.filter((entry) => {
    const searchableText = [
      entry.number,
      entry.name,
      entry.purpose,
      entry.protocol,
      entry.description
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      query === "" || searchableText.includes(query);

    const matchesLayer =
      selectedLayer === "" ||
      String(entry.number) === selectedLayer;

    return matchesSearch && matchesLayer;
  });

  const fragment = document.createDocumentFragment();

  filteredEntries.forEach((entry) => {
    fragment.appendChild(createRow(entry));
  });

  tableBody.replaceChildren(fragment);

  resultCount.textContent =
    `Showing ${filteredEntries.length} of ${entries.length} entries`;

  emptyState.hidden = filteredEntries.length !== 0;
}

/* Search as the user types. */
searchInput.addEventListener("input", renderTable);

/* Refilter when a layer is selected. */
layerFilter.addEventListener("change", renderTable);

/* Reset every filter. */
resetButton.addEventListener("click", () => {
  searchInput.value = "";
  layerFilter.value = "";

  renderTable();
  searchInput.focus();
});

/* Render all entries on page load. */
renderTable();
