// ==========================================
// MEMBER INFORMATION
// ==========================================

const token = localStorage.getItem("techshelfToken");

const memberData = localStorage.getItem("techshelfMember");

const member = memberData ? JSON.parse(memberData) : null;

// ==========================================
// ADD RESOURCE
// ==========================================

const resourceForm = document.getElementById("resource-form");

if (resourceForm) {
  resourceForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();

    const category = document.getElementById("category").value.trim();

    const link = document.getElementById("link").value.trim();

    const note = document.getElementById("note").value.trim();

    const message = document.getElementById("resource-message");

    try {
      const response = await fetch(
        "https://techshelf-backend.onrender.com/api/resources",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            title,
            category,
            link,
            note,
          }),
        },
      );

      const data = await response.json();

      if (response.status === 401 || response.status === 403) {
        logout();

        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to add resource");
      }

      message.textContent = "Resource added successfully!";

      resourceForm.reset();

      await loadMyResources();
    } catch (error) {
      console.error("ADD RESOURCE ERROR:", error);

      message.textContent = error.message;
    }
  });
}

// ==========================================
// LOAD MY RESOURCES
// ==========================================

async function loadMyResources() {
  const container = document.getElementById("member-resource-list");

  if (!container) {
    return;
  }

  if (!member || !member.username) {
    container.innerHTML = "<p>Member information not found.</p>";

    return;
  }

  try {
    const response = await fetch(
      "https://techshelf-backend.onrender.com/api/resources",
    );

    if (!response.ok) {
      throw new Error("Could not load resources.");
    }

    const resources = await response.json();

    const myResources = resources.filter(function (resource) {
      return resource.created_by === member.username;
    });

    container.innerHTML = "";

    if (myResources.length === 0) {
      container.innerHTML = "<p>You have not added any resources yet.</p>";

      return;
    }

    myResources.forEach(function (resource) {
      createResourceCard(resource, container);
    });
  } catch (error) {
    console.error("LOAD RESOURCE ERROR:", error);

    container.innerHTML = "<p>Unable to load resources.</p>";
  }
}

// ==========================================
// CREATE RESOURCE CARD
// ==========================================

function createResourceCard(resource, container) {
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

        <a
            href="${escapeHTML(resource.link)}"
            target="_blank"
            rel="noopener noreferrer"
        >
            Open Resource
        </a>

        <div class="resource-actions">

            <button class="edit-button">
                Edit
            </button>

            <button class="delete-button">
                Delete
            </button>

        </div>

    `;

  container.appendChild(card);

  // ==========================================
  // EDIT BUTTON
  // ==========================================

  const editButton = card.querySelector(".edit-button");

  editButton.addEventListener("click", function () {
    editResource(resource);
  });

  // ==========================================
  // DELETE BUTTON
  // ==========================================

  const deleteButton = card.querySelector(".delete-button");

  deleteButton.addEventListener("click", function () {
    deleteResource(resource.id);
  });
}

// ==========================================
// EDIT RESOURCE
// ==========================================

async function editResource(resource) {
  const title = prompt("Resource title:", resource.title);

  if (title === null) {
    return;
  }

  const category = prompt("Category:", resource.category);

  if (category === null) {
    return;
  }

  const link = prompt("Resource link:", resource.link);

  if (link === null) {
    return;
  }

  const note = prompt("Short note:", resource.note);

  if (note === null) {
    return;
  }

  try {
    const response = await fetch(
      `https://techshelf-backend.onrender.com/api/resources/${resource.id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          title: title.trim(),
          category: category.trim(),
          link: link.trim(),
          note: note.trim(),
        }),
      },
    );

    const data = await response.json();

    if (response.status === 401 || response.status === 403) {
      logout();

      return;
    }

    if (!response.ok) {
      throw new Error(data.message || "Failed to update resource");
    }

    alert("Resource updated successfully!");

    await loadMyResources();
  } catch (error) {
    console.error("EDIT RESOURCE ERROR:", error);

    alert(error.message);
  }
}

// ==========================================
// DELETE RESOURCE
// ==========================================

async function deleteResource(id) {
  const confirmed = confirm("Are you sure you want to delete this resource?");

  if (!confirmed) {
    return;
  }

  try {
    const response = await fetch(
      `https://techshelf-backend.onrender.com/api/resources/${id}`,
      {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();

    if (response.status === 401 || response.status === 403) {
      logout();

      return;
    }

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete resource");
    }

    alert("Resource deleted successfully!");

    await loadMyResources();
  } catch (error) {
    console.error("DELETE RESOURCE ERROR:", error);

    alert(error.message);
  }
}

// ==========================================
// LOGOUT
// ==========================================

const logoutButton = document.getElementById("logout-button");

if (logoutButton) {
  logoutButton.addEventListener("click", logout);
}

function logout() {
  localStorage.removeItem("techshelfToken");

  localStorage.removeItem("techshelfMember");

  window.location.href = "login.html";
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

loadMyResources();
