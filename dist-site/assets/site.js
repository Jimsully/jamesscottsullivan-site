import {
  fieldNotePreviews,
  postAlbumCollections,
  portfolioGridItems,
  portfolioItems,
  printItems,
  roadTripAlbumChapterLinks,
  roadTripAlbumSections,
  roadTripAlbumStats,
} from "./content.js";

const body = document.body;
const navToggle = document.querySelector("[data-nav-toggle]");
const siteNav = document.querySelector("[data-site-nav]");
const yearSlot = document.querySelector("[data-year]");
const contactForm = document.querySelector("[data-contact-form]");
const formResult = document.querySelector("[data-form-result]");
const portfolioLightbox = document.querySelector("[data-portfolio-lightbox]");
const portfolioLightboxImage = document.querySelector("[data-portfolio-lightbox-image]");
const portfolioLightboxMeta = document.querySelector("[data-portfolio-lightbox-meta]");
const portfolioLightboxTitle = document.querySelector("[data-portfolio-lightbox-title]");
const portfolioLightboxCaption = document.querySelector("[data-portfolio-lightbox-caption]");
const portfolioLightboxClose = document.querySelector("[data-portfolio-lightbox-close]");
const portfolioLightboxPrev = document.querySelector("[data-portfolio-lightbox-prev]");
const portfolioLightboxNext = document.querySelector("[data-portfolio-lightbox-next]");
const chapterAlbumModal = document.querySelector("[data-chapter-album-modal]");
const chapterAlbumStage = document.querySelector("[data-chapter-album-stage]");
const chapterAlbumMeta = document.querySelector("[data-chapter-album-meta]");
const chapterAlbumTitle = document.querySelector("[data-chapter-album-title]");
const chapterAlbumCaption = document.querySelector("[data-chapter-album-caption]");
const chapterAlbumCount = document.querySelector("[data-chapter-album-count]");
const chapterAlbumClose = document.querySelector("[data-chapter-album-close]");
const chapterAlbumPrev = document.querySelector("[data-chapter-album-prev]");
const chapterAlbumNext = document.querySelector("[data-chapter-album-next]");
const printStoryModal = document.querySelector("[data-print-story-modal]");
const printStoryImage = document.querySelector("[data-print-story-image]");
const printStoryMeta = document.querySelector("[data-print-story-meta]");
const printStoryTitle = document.querySelector("[data-print-story-title]");
const printStoryDescription = document.querySelector("[data-print-story-description]");
const printStorySpecs = document.querySelector("[data-print-story-specs]");
const printStoryBody = document.querySelector("[data-print-story-body]");
const printStoryContact = document.querySelector("[data-print-story-contact]");
const printStoryClose = document.querySelector("[data-print-story-close]");
const printStoryLarge = document.querySelector("[data-print-story-large]");
const emailAddress = "James.Scott.Sullivan@gmail.com";
let albumAnchorHighlightTimer = null;
let activePortfolioLightboxIndex = null;
let lastPortfolioLightboxTrigger = null;
let activeChapterAlbumMedia = [];
let activeChapterAlbumIndex = null;
let lastChapterAlbumTrigger = null;
let activePrintStoryIndex = null;
let lastPrintStoryTrigger = null;
const roadTripAnchorRetryDelays = [120, 320, 700, 1400, 2400, 4200, 7000];
const storyActivitiesDataUrl = new URL("./data/activities.json", import.meta.url);
const storyActivitiesSiteRootUrl = new URL("../", import.meta.url);
const storyActivityRoutePreviewCache = new Map();
const storyActivityTypeLabels = {
  bike: "Bike",
  hike: "Hike",
  other: "Other",
  run: "Run",
  ski: "Ski",
  walk: "Walk",
};
const storyActivityDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});
const storyActivityDistanceFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});
const storyActivityElevationFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});
const storyActivityMetersPerMile = 1609.344;
const storyActivityFeetPerMeter = 3.28084;

function composeMailto(subject, lines) {
  const bodyText = lines.filter(Boolean).join("\n");
  return `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
}

function renderPortfolioGrid() {
  const grid = document.querySelector("[data-portfolio-grid]");
  if (!grid) {
    return;
  }

  grid.innerHTML = portfolioGridItems
    .map((item, index) => {
      const tags = [
        `<span class="tag">${item.series}</span>`,
        `<span class="tag">${item.location}</span>`,
        item.printReady ? `<span class="tag tag--accent">Print-ready</span>` : "",
      ]
        .filter(Boolean)
        .join("");

      return `
        <article class="portfolio-card card" data-filter-card="all ${item.filters.join(" ")}" data-portfolio-index="${index}" data-reveal>
          <div class="portfolio-card__media media-shell">
            <button
              class="portfolio-card__trigger"
              type="button"
              data-portfolio-open="${index}"
              aria-haspopup="dialog"
              aria-label="Open ${item.title} larger"
            >
              <img
                src="${item.image}"
                alt="${item.alt}"
                loading="${index < 6 ? "eager" : "lazy"}"
                decoding="async"
              />
            </button>
          </div>
          <div class="portfolio-card__body">
            <p class="card__kicker">${item.series} / ${item.location}</p>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <div class="tag-list">${tags}</div>
          </div>
        </article>
      `;
    })
    .join("");
}

function getVisiblePortfolioIndexes() {
  return Array.from(document.querySelectorAll(".portfolio-card"))
    .filter((card) => !card.classList.contains("is-hidden"))
    .map((card) => Number(card.dataset.portfolioIndex))
    .filter((index) => Number.isInteger(index));
}

function getPortfolioLightboxFocusableElements() {
  if (!portfolioLightbox || portfolioLightbox.hidden) {
    return [];
  }

  return Array.from(
    portfolioLightbox.querySelectorAll('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')
  ).filter((element) => !element.hasAttribute("hidden"));
}

function syncPortfolioLightboxNavigation(index) {
  if (!portfolioLightboxPrev || !portfolioLightboxNext) {
    return;
  }

  const visibleIndexes = getVisiblePortfolioIndexes();
  const currentPosition = visibleIndexes.indexOf(index);
  const previousIndex = currentPosition > 0 ? visibleIndexes[currentPosition - 1] : null;
  const nextIndex = currentPosition >= 0 && currentPosition < visibleIndexes.length - 1 ? visibleIndexes[currentPosition + 1] : null;

  portfolioLightboxPrev.disabled = previousIndex === null;
  portfolioLightboxPrev.dataset.portfolioIndex = previousIndex === null ? "" : String(previousIndex);
  portfolioLightboxNext.disabled = nextIndex === null;
  portfolioLightboxNext.dataset.portfolioIndex = nextIndex === null ? "" : String(nextIndex);
}

function updatePortfolioLightbox(index) {
  const item = portfolioGridItems[index];
  if (
    !item ||
    !portfolioLightboxImage ||
    !portfolioLightboxMeta ||
    !portfolioLightboxTitle ||
    !portfolioLightboxCaption
  ) {
    return false;
  }

  activePortfolioLightboxIndex = index;
  portfolioLightboxImage.src = item.image;
  portfolioLightboxImage.alt = item.alt;
  portfolioLightboxTitle.textContent = item.title;
  portfolioLightboxMeta.textContent = [item.location, item.series, item.printReady ? "Print-ready" : ""]
    .filter(Boolean)
    .join(" / ");
  portfolioLightboxCaption.textContent = item.description ?? "";
  portfolioLightboxCaption.hidden = !item.description;

  syncPortfolioLightboxNavigation(index);
  return true;
}

function closePortfolioLightbox({ restoreFocus = true } = {}) {
  if (!portfolioLightbox || portfolioLightbox.hidden) {
    return;
  }

  portfolioLightbox.hidden = true;
  body.classList.remove("portfolio-lightbox-open");
  activePortfolioLightboxIndex = null;

  if (restoreFocus && lastPortfolioLightboxTrigger instanceof HTMLElement) {
    lastPortfolioLightboxTrigger.focus();
  }
}

function openPortfolioLightbox(index, trigger = null) {
  if (!portfolioLightbox || !updatePortfolioLightbox(index)) {
    return;
  }

  lastPortfolioLightboxTrigger = trigger instanceof HTMLElement ? trigger : document.activeElement;
  portfolioLightbox.hidden = false;
  body.classList.add("portfolio-lightbox-open");

  window.requestAnimationFrame(() => {
    portfolioLightboxClose?.focus();
  });
}

function stepPortfolioLightbox(direction) {
  const control = direction < 0 ? portfolioLightboxPrev : portfolioLightboxNext;
  const rawIndex = control?.dataset.portfolioIndex;
  if (!rawIndex) {
    return;
  }

  const targetIndex = Number.parseInt(rawIndex, 10);
  if (Number.isNaN(targetIndex)) {
    return;
  }

  updatePortfolioLightbox(targetIndex);
}

function handlePortfolioLightboxKeydown(event) {
  if (!portfolioLightbox || portfolioLightbox.hidden) {
    return;
  }

  if (event.key === "Escape") {
    event.preventDefault();
    closePortfolioLightbox();
    return;
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    stepPortfolioLightbox(-1);
    return;
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    stepPortfolioLightbox(1);
    return;
  }

  if (event.key !== "Tab") {
    return;
  }

  const focusableElements = getPortfolioLightboxFocusableElements();
  if (focusableElements.length === 0) {
    event.preventDefault();
    return;
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
    return;
  }

  if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
}

function initializePortfolioLightbox() {
  const grid = document.querySelector("[data-portfolio-grid]");
  if (
    !grid ||
    !portfolioLightbox ||
    !portfolioLightboxClose ||
    !portfolioLightboxPrev ||
    !portfolioLightboxNext
  ) {
    return;
  }

  grid.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-portfolio-open]");
    if (!trigger) {
      return;
    }

    const index = Number(trigger.dataset.portfolioOpen);
    if (!Number.isInteger(index)) {
      return;
    }

    openPortfolioLightbox(index, trigger);
  });

  portfolioLightbox.addEventListener("click", (event) => {
    if (event.target === portfolioLightbox) {
      closePortfolioLightbox();
      return;
    }

    if (event.target.closest("[data-portfolio-lightbox-close]")) {
      closePortfolioLightbox();
      return;
    }

    if (event.target.closest("[data-portfolio-lightbox-prev]")) {
      stepPortfolioLightbox(-1);
      return;
    }

    if (event.target.closest("[data-portfolio-lightbox-next]")) {
      stepPortfolioLightbox(1);
    }
  });

  document.addEventListener("keydown", handlePortfolioLightboxKeydown);
}

function getChapterAlbumMedia(chapterId) {
  if (postAlbumCollections[chapterId]?.media?.length) {
    return postAlbumCollections[chapterId].media;
  }

  const section = roadTripAlbumSections.find((item) => item.id === chapterId);
  if (!section) {
    return [];
  }

  return section.groups.flatMap((group) => {
    const meta = [section.label, group.location, group.dateLabel].filter(Boolean).join(" / ");
    const videos = (group.videos ?? []).map((video) => ({
      type: "video",
      src: video.video,
      poster: video.poster,
      alt: video.ariaLabel,
      title: group.title,
      caption: group.note,
      meta,
    }));
    const images = (group.images ?? []).map((image) => ({
      type: "image",
      src: image.image,
      alt: image.alt,
      title: group.title,
      caption: group.note,
      meta,
    }));

    return [...videos, ...images];
  });
}

function getChapterAlbumFocusableElements() {
  if (!chapterAlbumModal || chapterAlbumModal.hidden) {
    return [];
  }

  return Array.from(
    chapterAlbumModal.querySelectorAll('button:not([disabled]), video[controls], [href], [tabindex]:not([tabindex="-1"])')
  ).filter((element) => !element.hasAttribute("hidden"));
}

function pauseChapterAlbumMedia() {
  chapterAlbumStage?.querySelectorAll("video").forEach((video) => {
    video.pause();
  });
}

function updateChapterAlbumModal(index) {
  const item = activeChapterAlbumMedia[index];
  if (
    !item ||
    !chapterAlbumStage ||
    !chapterAlbumMeta ||
    !chapterAlbumTitle ||
    !chapterAlbumCaption ||
    !chapterAlbumCount ||
    !chapterAlbumPrev ||
    !chapterAlbumNext
  ) {
    return false;
  }

  pauseChapterAlbumMedia();
  activeChapterAlbumIndex = index;
  chapterAlbumMeta.textContent = item.meta ?? "";
  chapterAlbumTitle.textContent = item.title ?? "Road Trip album";
  chapterAlbumCaption.textContent = item.caption ?? "";
  chapterAlbumCaption.hidden = !item.caption;
  chapterAlbumCount.textContent = `${index + 1} / ${activeChapterAlbumMedia.length}`;
  chapterAlbumPrev.disabled = index === 0;
  chapterAlbumNext.disabled = index === activeChapterAlbumMedia.length - 1;

  if (item.type === "video") {
    chapterAlbumStage.innerHTML = `
      <video controls preload="metadata" playsinline poster="${escapeHtml(item.poster)}" aria-label="${escapeHtml(item.alt)}">
        <source src="${escapeHtml(item.src)}" type="video/mp4" />
      </video>
    `;
  } else {
    chapterAlbumStage.innerHTML = `
      <img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt)}" loading="eager" decoding="async" />
    `;
  }

  return true;
}

function stepChapterAlbumModal(direction) {
  if (activeChapterAlbumIndex === null) {
    return;
  }

  const nextIndex = activeChapterAlbumIndex + direction;
  if (nextIndex < 0 || nextIndex >= activeChapterAlbumMedia.length) {
    return;
  }

  updateChapterAlbumModal(nextIndex);
}

function closeChapterAlbumModal({ restoreFocus = true } = {}) {
  if (!chapterAlbumModal || chapterAlbumModal.hidden) {
    return;
  }

  pauseChapterAlbumMedia();
  chapterAlbumModal.hidden = true;
  body.classList.remove("chapter-album-open");
  activeChapterAlbumMedia = [];
  activeChapterAlbumIndex = null;
  if (chapterAlbumStage) {
    chapterAlbumStage.innerHTML = "";
  }

  if (restoreFocus && lastChapterAlbumTrigger instanceof HTMLElement) {
    lastChapterAlbumTrigger.focus();
  }
}

function openChapterAlbumModal(chapterId, trigger = null) {
  if (!chapterAlbumModal) {
    return false;
  }

  const media = getChapterAlbumMedia(chapterId);
  if (media.length === 0) {
    return false;
  }

  activeChapterAlbumMedia = media;
  lastChapterAlbumTrigger = trigger instanceof HTMLElement ? trigger : document.activeElement;
  if (!updateChapterAlbumModal(0)) {
    return false;
  }

  chapterAlbumModal.hidden = false;
  body.classList.add("chapter-album-open");

  window.requestAnimationFrame(() => {
    chapterAlbumClose?.focus();
  });

  return true;
}

function handleChapterAlbumKeydown(event) {
  if (!chapterAlbumModal || chapterAlbumModal.hidden) {
    return;
  }

  if (event.key === "Escape") {
    event.preventDefault();
    closeChapterAlbumModal();
    return;
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    stepChapterAlbumModal(-1);
    return;
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    stepChapterAlbumModal(1);
    return;
  }

  if (event.key !== "Tab") {
    return;
  }

  const focusableElements = getChapterAlbumFocusableElements();
  if (focusableElements.length === 0) {
    event.preventDefault();
    return;
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
    return;
  }

  if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
}

function initializeChapterAlbumModal() {
  const triggers = Array.from(document.querySelectorAll("[data-chapter-album-open], [data-post-album-open]"));
  if (triggers.length === 0 || !chapterAlbumModal || !chapterAlbumClose || !chapterAlbumPrev || !chapterAlbumNext) {
    return;
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      const chapterId = trigger.dataset.chapterAlbumOpen ?? trigger.dataset.postAlbumOpen ?? "";
      if (openChapterAlbumModal(chapterId, trigger)) {
        event.preventDefault();
      }
    });
  });

  chapterAlbumModal.addEventListener("click", (event) => {
    if (event.target === chapterAlbumModal || event.target.closest("[data-chapter-album-close]")) {
      closeChapterAlbumModal();
      return;
    }

    if (event.target.closest("[data-chapter-album-prev]")) {
      stepChapterAlbumModal(-1);
      return;
    }

    if (event.target.closest("[data-chapter-album-next]")) {
      stepChapterAlbumModal(1);
    }
  });

  document.addEventListener("keydown", handleChapterAlbumKeydown);
}

function renderPrintGrid() {
  const grid = document.querySelector("[data-prints-grid]");
  if (!grid) {
    return;
  }

  const printLayoutClasses = {
    "ilya-peak": "print-card--lead",
    "streets-of-istanbul-print": "print-card--support-tall",
    "fools-spring": "print-card--support-left",
    "key-west-sunrise-print": "print-card--support-wide",
    "fresh-pond-circle-print": "print-card--quiet",
  };

  grid.innerHTML = printItems
    .map((item, index) => {
      const editionLabel = item.edition ? `${item.edition} edition` : "";
      const sizeLabel = Array.isArray(item.sizes) && item.sizes.length > 0 ? item.sizes.join(" / ") : "";
      const layoutClass = printLayoutClasses[item.id] ?? "";

      return `
        <article class="print-card ${layoutClass}" data-reveal>
          <div class="print-card__image media-shell">
            <img
              src="${item.thumbnailImage ?? item.image}"
              alt="${item.alt}"
              loading="eager"
              decoding="async"
            />
          </div>
          <p class="print-card__meta">In the collection</p>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <div class="tag-list">
            <span class="tag">${item.location}</span>
            ${editionLabel ? `<span class="tag tag--accent">${editionLabel}</span>` : ""}
            ${sizeLabel ? `<span class="tag">Sizes ${sizeLabel}</span>` : ""}
          </div>
          <div class="print-card__actions">
            <button
              class="button-ghost"
              type="button"
              data-print-story-open="${index}"
              aria-haspopup="dialog"
              aria-controls="print-story-modal"
              aria-label="Learn more about ${item.title}"
            >
              Learn more
            </button>
          </div>
        </article>
      `
    })
    .join("");
}

function getPrintStoryFocusableElements() {
  if (!printStoryModal || printStoryModal.hidden) {
    return [];
  }

  return Array.from(
    printStoryModal.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => !element.hasAttribute("hidden"));
}

function updatePrintStoryModal(index) {
  const item = printItems[index];
  if (
    !item ||
    !printStoryImage ||
    !printStoryMeta ||
    !printStoryTitle ||
    !printStoryDescription ||
    !printStorySpecs ||
    !printStoryBody ||
    !printStoryContact
  ) {
    return false;
  }

  activePrintStoryIndex = index;
  printStoryImage.alt = item.alt;
  printStoryTitle.textContent = item.title;
  printStoryDescription.textContent = item.description ?? "";
  printStoryDescription.hidden = !item.description;
  const editionLabel = item.edition ? `${item.edition} edition` : "";
  const sizeLabel = Array.isArray(item.sizes) && item.sizes.length > 0 ? item.sizes.join(" / ") : "";
  const specTags = [
    editionLabel ? `<span class="tag tag--accent">${editionLabel}</span>` : "",
    sizeLabel ? `<span class="tag">Suggested sizes ${sizeLabel}</span>` : "",
  ]
    .filter(Boolean)
    .join("");
  printStorySpecs.innerHTML = specTags;
  printStorySpecs.hidden = !specTags;

  const storyParagraphs = Array.isArray(item.story) ? item.story.filter(Boolean) : [];
  printStoryBody.innerHTML = storyParagraphs.map((paragraph) => `<p>${paragraph}</p>`).join("");
  printStoryBody.hidden = storyParagraphs.length === 0;

  const contactLines = [
    "Hi James,",
    "",
    `I'm interested in ${item.title}.`,
    "Please send current availability, size options, finish details, and pricing.",
    "",
    "Thanks,",
  ];
  printStoryContact.href = composeMailto(`Print inquiry: ${item.title}`, contactLines);
  if (printStoryLarge) {
    const hasLargePreview = Boolean(item.largePreviewImage);
    printStoryLarge.hidden = !hasLargePreview;
    printStoryLarge.disabled = !hasLargePreview;
    printStoryLarge.dataset.printLargeIndex = hasLargePreview ? String(index) : "";
    printStoryLarge.setAttribute("aria-expanded", "false");
  }

  setPrintStoryExpandedState(index, false);
  return true;
}

function setPrintStoryExpandedState(index, isExpanded) {
  const item = printItems[index];
  if (!item || !printStoryModal || !printStoryImage || !printStoryMeta || !printStoryLarge) {
    return;
  }

  const hasLargePreview = Boolean(item.largePreviewImage);
  const useExpandedPreview = isExpanded && hasLargePreview;
  const editionLabel = item.edition ? `${item.edition} edition` : "";
  const baseMeta = [item.location, editionLabel, "Watermarked preview"].filter(Boolean).join(" / ");
  const expandedMeta = [item.location, editionLabel, "Larger watermarked preview"].filter(Boolean).join(" / ");

  printStoryModal.classList.toggle("is-expanded", useExpandedPreview);
  printStoryImage.src = useExpandedPreview ? item.largePreviewImage : item.modalImage ?? item.image;
  printStoryMeta.textContent = useExpandedPreview ? expandedMeta : baseMeta;
  printStoryLarge.textContent = useExpandedPreview ? "Back to story view" : "View larger preview";
  printStoryLarge.setAttribute("aria-expanded", useExpandedPreview ? "true" : "false");
}

function closePrintStoryModal({ restoreFocus = true } = {}) {
  if (!printStoryModal || printStoryModal.hidden) {
    return;
  }

  printStoryModal.hidden = true;
  printStoryModal.classList.remove("is-expanded");
  body.classList.remove("print-story-open");
  activePrintStoryIndex = null;

  if (restoreFocus && lastPrintStoryTrigger instanceof HTMLElement) {
    lastPrintStoryTrigger.focus();
  }
}

function openPrintStoryModal(index, trigger = null) {
  if (!printStoryModal || !updatePrintStoryModal(index)) {
    return;
  }

  lastPrintStoryTrigger = trigger instanceof HTMLElement ? trigger : document.activeElement;
  printStoryModal.hidden = false;
  body.classList.add("print-story-open");

  window.requestAnimationFrame(() => {
    printStoryClose?.focus();
  });
}

function handlePrintStoryKeydown(event) {
  if (!printStoryModal || printStoryModal.hidden) {
    return;
  }

  if (event.key === "Escape") {
    event.preventDefault();
    closePrintStoryModal();
    return;
  }

  if (event.key !== "Tab") {
    return;
  }

  const focusableElements = getPrintStoryFocusableElements();
  if (focusableElements.length === 0) {
    event.preventDefault();
    return;
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
    return;
  }

  if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
}

function initializePrintStoryModal() {
  const grid = document.querySelector("[data-prints-grid]");
  if (!grid || !printStoryModal || !printStoryClose) {
    return;
  }

  grid.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-print-story-open]");
    if (!trigger) {
      return;
    }

    const index = Number.parseInt(trigger.dataset.printStoryOpen ?? "", 10);
    if (Number.isNaN(index)) {
      return;
    }

    openPrintStoryModal(index, trigger);
  });

  printStoryModal.addEventListener("click", (event) => {
    if (event.target === printStoryModal || event.target.closest("[data-print-story-close]")) {
      closePrintStoryModal();
    }
  });

  printStoryLarge?.addEventListener("click", () => {
    const rawIndex = printStoryLarge.dataset.printLargeIndex ?? "";
    const index = Number.parseInt(rawIndex, 10);
    if (Number.isNaN(index)) {
      return;
    }

    const isExpanded = printStoryModal.classList.contains("is-expanded");
    setPrintStoryExpandedState(index, !isExpanded);
  });

  document.addEventListener("keydown", handlePrintStoryKeydown);
}

function renderFieldNotePreviews() {
  const container = document.querySelector("[data-note-previews]");
  if (!container) {
    return;
  }

  container.innerHTML = fieldNotePreviews
    .map(
      (item) => `
        <article class="story-card" data-reveal>
          <div class="story-card__thumb media-shell">
            <img src="${item.image}" alt="${item.alt}" loading="lazy" decoding="async" />
          </div>
          <p class="story-card__meta">${item.label}</p>
          <h3>${item.title}</h3>
          <p>${item.summary}</p>
        </article>
      `
    )
    .join("");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatStoryActivityDate(value) {
  if (!value) {
    return "";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  return storyActivityDateFormatter.format(parsed);
}

function shouldUseImperialStoryActivityUnits(chapterId) {
  return chapterId === "chapter-2";
}

function formatStoryActivityDistance(meters, { imperial = false } = {}) {
  if (!Number.isFinite(meters) || meters <= 0) {
    return null;
  }

  if (imperial) {
    return `${storyActivityDistanceFormatter.format(meters / storyActivityMetersPerMile)} mi`;
  }

  return `${storyActivityDistanceFormatter.format(meters / 1000)} km`;
}

function formatStoryActivityElevation(meters, { imperial = false } = {}) {
  if (!Number.isFinite(meters) || meters <= 0) {
    return null;
  }

  if (imperial) {
    return `${storyActivityElevationFormatter.format(meters * storyActivityFeetPerMeter)} ft`;
  }

  return `${storyActivityElevationFormatter.format(meters)} m`;
}

function sampleStoryRouteCoordinates(coordinates, maxPoints = 180) {
  if (!Array.isArray(coordinates) || coordinates.length <= maxPoints) {
    return coordinates ?? [];
  }

  const sampled = [];
  const lastIndex = coordinates.length - 1;

  for (let sampleIndex = 0; sampleIndex < maxPoints; sampleIndex += 1) {
    const sourceIndex = Math.round((sampleIndex * lastIndex) / (maxPoints - 1));
    const candidate = coordinates[sourceIndex];
    if (!candidate) {
      continue;
    }

    const previous = sampled[sampled.length - 1];
    if (previous && previous[0] === candidate[0] && previous[1] === candidate[1]) {
      continue;
    }

    sampled.push(candidate);
  }

  return sampled;
}

function extractStoryRouteCoordinates(routeGeoJson) {
  if (!routeGeoJson || !Array.isArray(routeGeoJson.features)) {
    return [];
  }

  for (const feature of routeGeoJson.features) {
    if (feature?.geometry?.type !== "LineString" || !Array.isArray(feature.geometry.coordinates)) {
      continue;
    }

    return feature.geometry.coordinates.filter(
      (coordinate) =>
        Array.isArray(coordinate) &&
        coordinate.length >= 2 &&
        Number.isFinite(coordinate[0]) &&
        Number.isFinite(coordinate[1])
    );
  }

  return [];
}

function buildStoryRoutePreviewMarkup(routeGeoJson) {
  const coordinates = sampleStoryRouteCoordinates(extractStoryRouteCoordinates(routeGeoJson));
  if (coordinates.length < 2) {
    return "";
  }

  const width = 160;
  const height = 112;
  const padding = 14;
  const longitudes = coordinates.map((coordinate) => coordinate[0]);
  const latitudes = coordinates.map((coordinate) => coordinate[1]);
  const minLon = Math.min(...longitudes);
  const maxLon = Math.max(...longitudes);
  const minLat = Math.min(...latitudes);
  const maxLat = Math.max(...latitudes);
  const lonRange = maxLon - minLon;
  const latRange = maxLat - minLat;
  const drawableWidth = width - padding * 2;
  const drawableHeight = height - padding * 2;

  const projectPoint = ([lon, lat]) => {
    const x = lonRange === 0 ? width / 2 : padding + ((lon - minLon) / lonRange) * drawableWidth;
    const y = latRange === 0 ? height / 2 : padding + (1 - (lat - minLat) / latRange) * drawableHeight;
    return [Number(x.toFixed(2)), Number(y.toFixed(2))];
  };

  const projectedPoints = coordinates.map(projectPoint);
  const pathData = projectedPoints.map(([x, y], index) => `${index === 0 ? "M" : "L"}${x} ${y}`).join(" ");
  const [startX, startY] = projectedPoints[0];
  const [endX, endY] = projectedPoints[projectedPoints.length - 1];

  return `
    <div class="story-route-preview" aria-hidden="true">
      <svg viewBox="0 0 ${width} ${height}" focusable="false">
        <path class="story-route-preview__path story-route-preview__path--shadow" d="${pathData}" />
        <path class="story-route-preview__path" d="${pathData}" />
        <circle class="story-route-preview__point story-route-preview__point--start" cx="${startX}" cy="${startY}" r="4" />
        <circle class="story-route-preview__point story-route-preview__point--end" cx="${endX}" cy="${endY}" r="4" />
      </svg>
      <span class="story-route-preview__label">Route sketch</span>
    </div>
  `;
}

async function loadStoryRoutePreviewMarkup(routePath) {
  if (!routePath) {
    return "";
  }

  const resolvedRouteUrl = new URL(routePath, storyActivitiesSiteRootUrl);

  if (!storyActivityRoutePreviewCache.has(resolvedRouteUrl.href)) {
    storyActivityRoutePreviewCache.set(
      resolvedRouteUrl.href,
      (async () => {
        try {
          const response = await fetch(resolvedRouteUrl);
          if (!response.ok) {
            throw new Error(`Unable to load route preview: ${resolvedRouteUrl.pathname}`);
          }

          const routeGeoJson = await response.json();
          return buildStoryRoutePreviewMarkup(routeGeoJson);
        } catch (error) {
          console.warn(error);
          return "";
        }
      })()
    );
  }

  return storyActivityRoutePreviewCache.get(resolvedRouteUrl.href);
}

async function buildStoryActivityCardMarkup(activity, options = {}) {
  const { imperialUnits = false } = options;
  const routeMarkup =
    activity?.hasRoute && activity?.routeGeoJson
      ? await loadStoryRoutePreviewMarkup(activity.routeGeoJson)
      : "";
  const distanceLabel = formatStoryActivityDistance(Number(activity?.distanceMeters), {
    imperial: imperialUnits,
  });
  const elevationLabel = formatStoryActivityElevation(Number(activity?.elevationGainMeters), {
    imperial: imperialUnits,
  });
  const activityTypeLabel = storyActivityTypeLabels[activity?.activityType] ?? storyActivityTypeLabels.other;
  const activityDateLabel = formatStoryActivityDate(activity?.startTime ?? activity?.startTimeUtc);
  const statsMarkup = [
    distanceLabel
      ? `
        <div class="story-activity-card__stat">
          <dt>Distance</dt>
          <dd>${escapeHtml(distanceLabel)}</dd>
        </div>
      `
      : "",
    elevationLabel
      ? `
        <div class="story-activity-card__stat">
          <dt>Elevation gain</dt>
          <dd>${escapeHtml(elevationLabel)}</dd>
        </div>
      `
      : "",
  ]
    .filter(Boolean)
    .join("");

  return `
    <article class="story-activity-card${routeMarkup ? " story-activity-card--with-route" : ""}">
      <div class="story-activity-card__copy">
        <div class="story-activity-card__meta">
          <span>${escapeHtml(activityTypeLabel)}</span>
          <span>${escapeHtml(activityDateLabel)}</span>
        </div>
        <h3>${escapeHtml(activity?.title ?? "Untitled activity")}</h3>
        ${statsMarkup ? `<dl class="story-activity-card__stats">${statsMarkup}</dl>` : ""}
      </div>
      ${routeMarkup}
    </article>
  `;
}

function filterStoryActivitiesByChapter(activities, chapterId) {
  if (!chapterId) {
    return [];
  }

  return activities
    .filter(
      (activity) =>
        activity?.match?.chapterId === chapterId &&
        activity?.review?.suggestedAction === "show"
    )
    .sort((left, right) => {
      const leftTime = new Date(left?.startTime ?? left?.startTimeUtc ?? 0).getTime();
      const rightTime = new Date(right?.startTime ?? right?.startTimeUtc ?? 0).getTime();
      return leftTime - rightTime;
    });
}

async function renderStoryActivityCallouts() {
  const containers = Array.from(document.querySelectorAll("[data-story-activities][data-story-activities-chapter]"));
  if (containers.length === 0) {
    return;
  }

  let activities = [];

  try {
    const response = await fetch(storyActivitiesDataUrl);
    if (!response.ok) {
      throw new Error(`Unable to load activity data: ${storyActivitiesDataUrl.pathname}`);
    }

    const data = await response.json();
    activities = Array.isArray(data?.activities) ? data.activities : [];
  } catch (error) {
    console.warn(error);
    return;
  }

  await Promise.all(
    containers.map(async (container) => {
      const chapterId = container.dataset.storyActivitiesChapter ?? "";
      const note = container.dataset.storyActivitiesNote ?? "A few logged outings that help place the chapter on the ground.";
      const chapterActivities = filterStoryActivitiesByChapter(activities, chapterId);
      const imperialUnits = shouldUseImperialStoryActivityUnits(chapterId);

      if (chapterActivities.length === 0) {
        container.hidden = true;
        return;
      }

      const cardsMarkup = (
        await Promise.all(
          chapterActivities.map((activity) =>
            buildStoryActivityCardMarkup(activity, {
              imperialUnits,
            })
          )
        )
      ).join("");

      container.innerHTML = `
        <div class="story-activity-band__head">
          <p class="story-activity-band__eyebrow">On this stretch</p>
          <h2>Quiet miles, kept in the margins.</h2>
          <p class="story-activity-band__intro">${escapeHtml(note)}</p>
        </div>
        <div class="story-activity-grid">
          ${cardsMarkup}
        </div>
      `;
      container.hidden = false;
    })
  );
}

const roadTripAlbumFlowRecipes = [
  ["single", "pair-stagger", "single", "pair"],
  ["single", "pair", "pair-stagger", "single"],
  ["single", "pair-stagger", "pair", "single"],
  ["pair", "single", "pair-stagger", "single"],
];

function buildRoadTripAlbumFlowRows(images, seed) {
  const recipe = roadTripAlbumFlowRecipes[seed % roadTripAlbumFlowRecipes.length];
  const rows = [];
  let index = 0;
  let step = 0;

  while (index < images.length) {
    const remaining = images.length - index;
    const token = recipe[step % recipe.length];

    if ((token === "pair" || token === "pair-stagger") && remaining >= 2) {
      rows.push({
        layout: token,
        images: images.slice(index, index + 2),
      });
      index += 2;
    } else {
      rows.push({
        layout: "single",
        images: [images[index]],
      });
      index += 1;
    }

    step += 1;
  }

  return rows;
}

function renderRoadTripAlbum() {
  const nav = document.querySelector("[data-road-trip-album-nav]");
  const container = document.querySelector("[data-road-trip-album]");
  const stats = document.querySelector("[data-road-trip-album-stats]");

  if (!nav && !container && !stats) {
    return;
  }

  if (stats) {
    stats.innerHTML = `
      <span class="tag">${roadTripAlbumStats.chapterCount} chapters</span>
      <span class="tag">${roadTripAlbumStats.imageCount} photos</span>
    `;
  }

  if (nav) {
    nav.innerHTML = roadTripAlbumChapterLinks
      .map(
        (chapter) => `
          <a class="album-jump-link" href="#${chapter.id}">
            <strong>${chapter.label}</strong>
            <span>${chapter.title}</span>
            <small>${chapter.imageCount} photos</small>
          </a>
        `
      )
      .join("");
  }

  if (!container) {
    return;
  }

  container.innerHTML = roadTripAlbumSections
    .map(
      (section, sectionIndex) => `
        <section class="album-section" id="${section.id}" data-album-section="${section.id}">
          <div class="album-section__head">
            <div>
              <p class="card__kicker">${section.label}</p>
              <h2>${section.title}</h2>
              <p class="section__intro">${section.summary}</p>
            </div>
            <div class="album-section__meta">
              <span class="tag">${section.dateRange}</span>
              <span class="tag">${section.route}</span>
              <span class="tag">${section.imageCount} photos</span>
            </div>
          </div>

          <div class="album-day-stack">
            ${section.groups
              .map(
                (group, groupIndex) => `
                  <article class="album-day" id="${group.id}">
                    <div class="album-day__head">
                      <div>
                        <p class="card__kicker">${group.dateLabel}</p>
                        <h3>${group.title}</h3>
                      </div>
                      <div class="album-day__meta">
                        <span class="tag">${group.location}</span>
                        <span class="tag">${group.imageCount} photos</span>
                      </div>
                    </div>
                    <p class="album-day__summary">${group.note}</p>
                    <div class="album-flow">
                      ${group.videos
                        .map(
                          (video) => `
                            <div class="album-flow__row album-flow__row--video">
                              <figure class="album-video">
                                <video controls preload="metadata" playsinline poster="${video.poster}" aria-label="${video.ariaLabel}">
                                  <source src="${video.video}" type="video/mp4" />
                                </video>
                              </figure>
                            </div>
                          `
                        )
                        .join("")}
                      ${buildRoadTripAlbumFlowRows(group.images, sectionIndex + groupIndex)
                        .map(
                          (row, rowIndex) => `
                            <div class="album-flow__row album-flow__row--${row.layout}">
                              ${row.images
                                .map(
                                  (image, imageIndex) => `
                                    <figure class="album-photo">
                                      <img
                                        src="${image.image}"
                                        alt="${image.alt}"
                                        loading="${
                                          sectionIndex === 0 && groupIndex === 0 && rowIndex === 0 && imageIndex < 2
                                            ? "eager"
                                            : "lazy"
                                        }"
                                        decoding="async"
                                      />
                                    </figure>
                                  `
                                )
                                .join("")}
                            </div>
                          `
                        )
                        .join("")}
                    </div>
                  </article>
                `
              )
              .join("")}
          </div>

          <nav class="album-section-nav" aria-label="${section.label} navigation">
            <a class="album-section-nav__item" href="blog.html#road-trip-series">
              <small>Back</small>
              <strong>Back to chapters</strong>
            </a>
            ${
              section.previousSectionId
                ? `
                  <a class="album-section-nav__item" href="#${section.previousSectionId}">
                    <small>Previous</small>
                    <strong>${section.previousSectionLabel}</strong>
                  </a>
                `
                : `
                  <span class="album-section-nav__item album-section-nav__item--disabled" aria-disabled="true">
                    <small>Previous</small>
                    <strong>Start of the trip</strong>
                  </span>
                `
            }
            ${
              section.nextSectionId
                ? `
                  <a class="album-section-nav__item" href="#${section.nextSectionId}">
                    <small>Next</small>
                    <strong>${section.nextSectionLabel}</strong>
                  </a>
                `
                : `
                  <span class="album-section-nav__item album-section-nav__item--disabled" aria-disabled="true">
                    <small>Next</small>
                    <strong>End of the album</strong>
                  </span>
                `
            }
            <a class="album-section-nav__item" href="#top">
              <small>Top</small>
              <strong>Top of album</strong>
            </a>
          </nav>
        </section>
      `
    )
    .join("");
}

function getStickyScrollOffset() {
  const header = document.querySelector(".site-header");
  return (header?.getBoundingClientRect().height ?? 0) + 18;
}

function resolveRoadTripAlbumTarget(targetId) {
  if (!targetId) {
    return null;
  }

  const exactTarget = document.getElementById(targetId);
  if (exactTarget) {
    return exactTarget;
  }

  const parentSection =
    roadTripAlbumSections.find((section) => section.groups.some((group) => group.id === targetId)) ??
    roadTripAlbumSections.find((section) => targetId.startsWith(`${section.id}-`));

  if (!parentSection) {
    return null;
  }

  return document.getElementById(parentSection.id);
}

function highlightRoadTripAlbumTarget(target) {
  if (!target) {
    return;
  }

  document
    .querySelectorAll(".album-section.is-anchor-active, .album-day.is-anchor-active")
    .forEach((item) => item.classList.remove("is-anchor-active"));

  const highlightTarget =
    target.closest(".album-day") ?? target.closest(".album-section") ?? (target.matches(".album-section, .album-day") ? target : null);

  if (!highlightTarget) {
    return;
  }

  highlightTarget.classList.add("is-anchor-active");

  window.clearTimeout(albumAnchorHighlightTimer);
  albumAnchorHighlightTimer = window.setTimeout(() => {
    highlightTarget.classList.remove("is-anchor-active");
  }, 1800);
}

function syncRoadTripAlbumDebugState(requestedId, target, delay = 120) {
  if (body.dataset.page !== "road-trip-album" || !target) {
    return;
  }

  window.setTimeout(() => {
    body.dataset.albumAnchorRequested = requestedId;
    body.dataset.albumAnchorResolved = target.id;
    body.dataset.albumAnchorTop = String(Math.round(target.getBoundingClientRect().top));
    body.dataset.albumAnchorScrollY = String(Math.round(window.scrollY));
    body.dataset.albumAnchorHasContent = String(Boolean(target.querySelector("h2, h3, img")));
  }, delay);
}

function keepRoadTripAlbumTargetInView(requestedId, target, attempt = 0) {
  if (body.dataset.page !== "road-trip-album" || !target) {
    return;
  }

  const delay = roadTripAnchorRetryDelays[attempt];
  if (delay === undefined) {
    return;
  }

  window.setTimeout(() => {
    const desiredTop = getStickyScrollOffset();
    const currentTop = target.getBoundingClientRect().top;
    const shouldRetry = currentTop > desiredTop + 160 || currentTop < 0;

    if (shouldRetry) {
      const top = Math.max(window.scrollY + currentTop - desiredTop, 0);
      window.scrollTo({
        top,
        behavior: "auto",
      });
    }

    syncRoadTripAlbumDebugState(requestedId, target, 20);

    if (shouldRetry) {
      keepRoadTripAlbumTargetInView(requestedId, target, attempt + 1);
    }
  }, delay);
}

function scrollToRoadTripAlbumTarget(rawHash, options = {}) {
  if (body.dataset.page !== "road-trip-album" || !rawHash) {
    return false;
  }

  const targetId = decodeURIComponent(rawHash.replace(/^#/, ""));
  if (!targetId) {
    return false;
  }

  const fallbackSection =
    roadTripAlbumSections.find((section) => section.id === targetId) ??
    roadTripAlbumSections.find((section) => section.groups.some((group) => group.id === targetId)) ??
    roadTripAlbumSections.find((section) => targetId.startsWith(`${section.id}-`)) ??
    null;

  const target = resolveRoadTripAlbumTarget(targetId) ?? (fallbackSection ? document.getElementById(fallbackSection.id) : null);

  if (!target) {
    return false;
  }

  const top = Math.max(window.scrollY + target.getBoundingClientRect().top - getStickyScrollOffset(), 0);
  window.scrollTo({
    top,
    behavior: options.behavior ?? "smooth",
  });

  highlightRoadTripAlbumTarget(target);
  syncRoadTripAlbumDebugState(targetId, target, options.behavior === "smooth" ? 450 : 120);
  keepRoadTripAlbumTargetInView(targetId, target);

  if (options.updateHistory) {
    const nextUrl = new URL(window.location.href);
    nextUrl.hash = target.id;
    window.history.pushState(null, "", nextUrl);
  } else if (window.location.hash !== `#${target.id}`) {
    const nextUrl = new URL(window.location.href);
    nextUrl.hash = target.id;
    window.history.replaceState(null, "", nextUrl);
  }

  return true;
}

function initializeRoadTripAlbumNavigation() {
  if (body.dataset.page !== "road-trip-album") {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get("debugAnchors") === "1") {
    body.dataset.debugAlbumAnchors = "true";
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") {
        return;
      }

      const didScroll = scrollToRoadTripAlbumTarget(hash, {
        behavior: "smooth",
        updateHistory: true,
      });

      if (didScroll) {
        event.preventDefault();
      }
    });
  });

  if (window.location.hash) {
    window.requestAnimationFrame(() => {
      scrollToRoadTripAlbumTarget(window.location.hash, {
        behavior: "auto",
        updateHistory: false,
      });
    });
  }

  window.addEventListener("load", () => {
    if (!window.location.hash) {
      return;
    }

    scrollToRoadTripAlbumTarget(window.location.hash, {
      behavior: "auto",
      updateHistory: false,
    });
  });

  window.addEventListener("hashchange", () => {
    scrollToRoadTripAlbumTarget(window.location.hash, {
      behavior: "auto",
      updateHistory: false,
    });
  });
}

function initializeFilters() {
  const filterButtons = Array.from(document.querySelectorAll("[data-filter-button]"));
  const filterCards = Array.from(document.querySelectorAll("[data-filter-card]"));
  const filterEmpty = document.querySelector("[data-filter-empty]");

  if (filterButtons.length === 0 || filterCards.length === 0) {
    return;
  }

  const updateFilter = (target) => {
    let visibleCount = 0;

    filterCards.forEach((card) => {
      const categories = (card.dataset.filterCard ?? "").split(" ");
      const isVisible = target === "all" || categories.includes(target);
      card.classList.toggle("is-hidden", !isVisible);
      if (isVisible) {
        visibleCount += 1;
      }
    });

    if (filterEmpty) {
      filterEmpty.hidden = visibleCount > 0;
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.filterButton ?? "all";
      filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      updateFilter(target);
    });
  });

  updateFilter("all");
}

function initializeRevealObserver() {
  const revealItems = document.querySelectorAll("[data-reveal]");

  if (!("IntersectionObserver" in window) || revealItems.length === 0) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

renderPortfolioGrid();
renderPrintGrid();
renderFieldNotePreviews();
renderRoadTripAlbum();
renderStoryActivityCallouts();

if (yearSlot) {
  yearSlot.textContent = new Date().getFullYear();
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    body.classList.toggle("nav-open", !expanded);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      body.classList.remove("nav-open");
    });
  });
}

initializeFilters();
initializePortfolioLightbox();
initializeChapterAlbumModal();
initializePrintStoryModal();
initializeRevealObserver();
initializeRoadTripAlbumNavigation();

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const projectType = String(formData.get("projectType") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email || !message) {
      if (formResult) {
        formResult.textContent = "Fill in your name, email, and message first.";
      }
      return;
    }

    const normalizedProjectType = projectType.toLowerCase().endsWith("inquiry")
      ? projectType
      : `${projectType} inquiry`;
    const subject = projectType ? `${normalizedProjectType} from ${name}` : `Portfolio inquiry from ${name}`;
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      projectType ? `Project type: ${projectType}` : "",
      "",
      message,
    ];

    window.location.href = composeMailto(subject, bodyLines);

    if (formResult) {
      formResult.textContent = "Your email app should open with the draft ready to go.";
    }
  });
}
