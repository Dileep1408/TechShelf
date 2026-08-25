// ==========================================
// ALL PUBLIC RESOURCES
// ==========================================

let allResources = [];

// ==========================================
// LOAD RESOURCES
// ==========================================

async function loadResources() {
  const resourceList = document.getElementById("resource-list");

  if (!resourceList) {
    return;
  }

  try {
    resourceList.innerHTML = "<p>Loading resources...</p>";

    const response = await fetch(
      "https://techshelf-backend.onrender.com/api/resources",
    );

    if (!response.ok) {
      throw new Error("Failed to load resources.");
    }

    allResources = await response.json();

    displayResources(allResources);
  } catch (error) {
    console.error("LOAD RESOURCES ERROR:", error);

    resourceList.innerHTML = `
            <p>
                Unable to load resources.
            </p>
        `;
  }
}

// ==========================================
// DISPLAY RESOURCES
// ==========================================

function displayResources(resources) {
  const resourceList = document.getElementById("resource-list");

  if (!resourceList) {
    return;
  }

  resourceList.innerHTML = "";

  if (resources.length === 0) {
    resourceList.innerHTML = `
            <p>
                No resources found.
            </p>
        `;

    return;
  }

  resources.forEach(function (resource) {
    const card = document.createElement("article");

    card.className = "card";

    card.innerHTML = `

                <h3>
                    ${escapeHTML(resource.title)}
                </h3>

                <p>
                    <strong>Category:</strong>
                    ${escapeHTML(resource.category)}
                </p>

                <p>
                    ${escapeHTML(resource.note)}
                </p>

                <p>
                    <strong>Added by:</strong>
                    ${escapeHTML(resource.created_by)}
                </p>

                <a
                    href="${escapeHTML(resource.link)}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Open Resource
                </a>

            `;

    resourceList.appendChild(card);
  });
}

// ==========================================
// SEARCH RESOURCES
// ==========================================

function searchResources() {
  const searchInput = document.getElementById("public-resource-search");

  if (!searchInput) {
    return;
  }

  const searchText = searchInput.value.toLowerCase().trim();

  const filteredResources = allResources.filter(function (resource) {
    const title = (resource.title || "").toLowerCase();

    const category = (resource.category || "").toLowerCase();

    const note = (resource.note || "").toLowerCase();

    return (
      title.includes(searchText) ||
      category.includes(searchText) ||
      note.includes(searchText)
    );
  });

  displayResources(filteredResources);
}

// ==========================================
// SEARCH INPUT
// ==========================================

const searchInput = document.getElementById("public-resource-search");

if (searchInput) {
  searchInput.addEventListener("input", searchResources);
}

// ==========================================
// HTML ESCAPING
// ==========================================

function escapeHTML(value) {
  const div = document.createElement("div");

  div.textContent = value ?? "";

  return div.innerHTML;
}

// ==========================================
// INITIAL LOAD
// ==========================================

loadResources();
