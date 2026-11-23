/* =========================================================
   BENTO UI PORTFOLIO INTERACTIVITY
   Author: Nguyễn Anh Đạt - MSSV: 125002177 - Lớp: 25CT114
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Theme Persistence (Light / Dark Mode)
  const themeBtn = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("nad_bento_theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  if (themeBtn) {
    themeBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";
    themeBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("nad_bento_theme", next);
      themeBtn.textContent = next === "dark" ? "☀️" : "🌙";
    });
  }

  // 2. Mobile Navigation Toggle
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  // 3. Highlight Active Navigation Link Automatically
  const currentFile = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentFile) {
      link.classList.add("active");
    }
  });

  // 4. Local Image Live Preview Helper (before replacing files in ảnh/)
  document.querySelectorAll(".local-img-input").forEach((input) => {
    input.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const targetId = input.getAttribute("data-target");
      const imgEl = document.getElementById(targetId);
      if (imgEl) {
        imgEl.src = URL.createObjectURL(file);
      }
    });
  });

  // 5. Portfolio Category Filtering (portfolio.html)
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      projectCards.forEach((card) => {
        const cat = card.getAttribute("data-category");
        if (filter === "all" || cat === filter) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // 6. Project Detail Modal (portfolio.html)
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalCategory = document.getElementById("modalCategory");
  const modalDesc = document.getElementById("modalDesc");
  const modalTech = document.getElementById("modalTech");
  const closeModalBtn = document.getElementById("closeModalBtn");

  document.querySelectorAll(".open-modal-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!modal) return;
      modalTitle.textContent = btn.getAttribute("data-title");
      modalCategory.textContent = btn.getAttribute("data-category-label");
      modalDesc.textContent = btn.getAttribute("data-desc");
      modalTech.innerHTML = "";
      const techs = (btn.getAttribute("data-tech") || "").split(",");
      techs.forEach((t) => {
        if (t.trim()) {
          const span = document.createElement("span");
          span.className = "chip";
          span.textContent = t.trim();
          modalTech.appendChild(span);
        }
      });
      modal.classList.add("open");
    });
  });

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener("click", () => modal.classList.remove("open"));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("open");
    });
  }

  // 7. Interactive Self-Audit Checklist (website-portfolio.html)
  const checkInputs = document.querySelectorAll(".audit-check");
  checkInputs.forEach((cb, idx) => {
    const key = "nad_audit_" + idx;
    if (localStorage.getItem(key) === "true") {
      cb.checked = true;
      cb.closest(".checklist-item")?.classList.add("checked");
    }
    cb.addEventListener("change", () => {
      localStorage.setItem(key, cb.checked);
      cb.closest(".checklist-item")?.classList.toggle("checked", cb.checked);
    });
  });
});
