/**
 * ADMIN PORTAL LOGIC (admin.js)
 * Sri Karavinan Tantra Peedam - Sacred Luxury Admin System
 */

const ADMIN_STATE = {
  activeTab: 'gallery',
  galleryConfig: {
    folderId: '',
    apiKey: '',
    overrides: {},
    hidden: [],
    lastUpdated: null
  },
  driveFiles: [],
  homamData: null,
  thoughtsData: null,
  feedbackData: null
};

// ============================================================================
// INITIALIZATION & AUTHENTICATION GATE
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  initTabs();
  initGalleryManager();
  initHomamManager();
  initThoughtsManager();
  initFeedbackManager();
  initSettingsManager();
});

function initAuth() {
  const loginModal = document.getElementById('loginGateModal');
  const appContainer = document.getElementById('adminApp');
  const passcodeInput = document.getElementById('adminPasscodeInput');
  const loginBtn = document.getElementById('adminLoginBtn');
  const errorMsg = document.getElementById('loginErrorMessage');
  const toggleEyeBtn = document.getElementById('togglePasscodeVisibilityBtn');
  const logoutBtn = document.getElementById('adminLogoutBtn');

  // Check existing session
  const isAuth = sessionStorage.getItem('karavinan_admin_auth') === 'true';
  if (isAuth) {
    if (loginModal) loginModal.style.display = 'none';
    if (appContainer) appContainer.style.display = 'flex';
  } else {
    if (loginModal) loginModal.style.display = 'flex';
    if (appContainer) appContainer.style.display = 'none';
    if (passcodeInput) passcodeInput.focus();
  }

  function handleLogin() {
    const entered = passcodeInput ? passcodeInput.value.trim() : '';
    const stored = localStorage.getItem('karavinan_admin_passcode') || 'karavinan2026';

    if (entered === stored) {
      sessionStorage.setItem('karavinan_admin_auth', 'true');
      if (errorMsg) errorMsg.style.display = 'none';
      if (loginModal) loginModal.style.display = 'none';
      if (appContainer) appContainer.style.display = 'flex';
      showToast('Welcome to Sanctum Admin Portal', true);
    } else {
      if (errorMsg) {
        errorMsg.textContent = 'Incorrect passcode. Please try again.';
        errorMsg.style.display = 'block';
      }
      if (passcodeInput) {
        passcodeInput.classList.add('error');
        setTimeout(() => passcodeInput.classList.remove('error'), 1000);
      }
    }
  }

  if (loginBtn) loginBtn.addEventListener('click', handleLogin);
  if (passcodeInput) {
    passcodeInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleLogin();
    });
  }

  if (toggleEyeBtn && passcodeInput) {
    toggleEyeBtn.addEventListener('click', () => {
      const isPwd = passcodeInput.type === 'password';
      passcodeInput.type = isPwd ? 'text' : 'password';
      toggleEyeBtn.textContent = isPwd ? '🔒' : '👁';
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('karavinan_admin_auth');
      location.reload();
    });
  }
}

// ============================================================================
// TAB NAVIGATION
// ============================================================================
function initTabs() {
  const tabs = document.querySelectorAll('.admin-nav-tab');
  const contents = document.querySelectorAll('.admin-tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      ADMIN_STATE.activeTab = target;

      tabs.forEach(t => t.classList.toggle('active', t === tab));
      contents.forEach(c => {
        c.classList.toggle('active', c.id === `tabContent${target.charAt(0).toUpperCase() + target.slice(1)}`);
      });
    });
  });
}

// ============================================================================
// TANTRA GALLERY (GOOGLE DRIVE) MANAGER - Workflow Step 4
// ============================================================================
async function initGalleryManager() {
  const folderInput = document.getElementById('driveFolderIdInput');
  const apiKeyInput = document.getElementById('driveApiKeyInput');
  const saveBtn = document.getElementById('saveDriveConfigBtn');
  const openFolderBtn = document.getElementById('openDriveFolderBtn');
  const refreshPreviewBtn = document.getElementById('refreshLivePreviewBtn');
  const saveAllOverridesBtn = document.getElementById('saveAllOverridesBtn');

  // Load existing config
  await loadGalleryConfig();

  if (folderInput) folderInput.value = ADMIN_STATE.galleryConfig.folderId || '';
  if (apiKeyInput) apiKeyInput.value = ADMIN_STATE.galleryConfig.apiKey || '';

  // Auto-clean Folder ID when pasting full Google Drive URL
  if (folderInput) {
    folderInput.addEventListener('input', () => {
      const val = folderInput.value.trim();
      const extracted = parseDriveFolderId(val);
      if (extracted !== val) {
        folderInput.value = extracted;
        showToast('Extracted Google Drive Folder ID automatically', true);
      }
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', async () => {
      ADMIN_STATE.galleryConfig.folderId = parseDriveFolderId(folderInput.value.trim());
      ADMIN_STATE.galleryConfig.apiKey = apiKeyInput.value.trim();
      ADMIN_STATE.galleryConfig.lastUpdated = new Date().toISOString();

      await persistGalleryConfig();
      showToast('Google Drive configuration saved successfully', true);

      // Trigger preview refresh
      fetchDrivePhotosAndRender();
    });
  }

  if (openFolderBtn) {
    openFolderBtn.addEventListener('click', () => {
      const folderId = parseDriveFolderId(folderInput ? folderInput.value.trim() : '');
      if (!folderId) {
        showToast('Please enter a Google Drive folder ID first', false);
        return;
      }
      window.open(`https://drive.google.com/drive/folders/${folderId}`, '_blank');
    });
  }

  if (refreshPreviewBtn) {
    refreshPreviewBtn.addEventListener('click', async () => {
      ADMIN_STATE.galleryConfig.folderId = parseDriveFolderId(folderInput ? folderInput.value.trim() : '');
      ADMIN_STATE.galleryConfig.apiKey = apiKeyInput ? apiKeyInput.value.trim() : '';
      ADMIN_STATE.galleryConfig.lastUpdated = new Date().toISOString();
      await persistGalleryConfig();
      fetchDrivePhotosAndRender();
    });
  }

  if (saveAllOverridesBtn) {
    saveAllOverridesBtn.addEventListener('click', async () => {
      await persistGalleryConfig();
      showToast('All image overrides saved successfully', true);
    });
  }

  // Initial preview render if config exists
  if (ADMIN_STATE.galleryConfig.folderId && ADMIN_STATE.galleryConfig.apiKey) {
    fetchDrivePhotosAndRender();
  }
}

function parseDriveFolderId(raw) {
  if (!raw) return '';
  // Check if full URL: https://drive.google.com/drive/folders/1ABCXYZ...?usp=sharing
  const match = raw.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) return match[1];

  // Check if id query param: ?id=1ABCXYZ...
  const matchParam = raw.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (matchParam && matchParam[1]) return matchParam[1];

  return raw.replace(/[^a-zA-Z0-9_-]/g, '');
}

async function loadGalleryConfig() {
  try {
    const res = await fetch('gallery_config.json?' + Date.now());
    if (res.ok) {
      const data = await res.json();
      ADMIN_STATE.galleryConfig = {
        folderId: data.folderId || '',
        apiKey: data.apiKey || '',
        overrides: data.overrides || {},
        hidden: Array.isArray(data.hidden) ? data.hidden : [],
        lastUpdated: data.lastUpdated || null
      };
      return;
    }
  } catch (err) {
    console.warn('Could not load gallery_config.json from server, checking local storage', err);
  }

  // Fallback to localStorage
  const saved = localStorage.getItem('karavinan_gallery_config');
  if (saved) {
    try {
      ADMIN_STATE.galleryConfig = JSON.parse(saved);
    } catch (e) {}
  }
}

async function persistGalleryConfig() {
  // Always update localStorage
  localStorage.setItem('karavinan_gallery_config', JSON.stringify(ADMIN_STATE.galleryConfig));

  // Clear public site cache so updates reflect immediately
  sessionStorage.removeItem('tantra_gallery_cache');

  // Attempt save to server backend
  try {
    const res = await fetch('/api/save-gallery-config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ADMIN_STATE.galleryConfig)
    });
    if (!res.ok) throw new Error('Server returned ' + res.status);
  } catch (err) {
    console.warn('Server save not available; config safely saved to browser storage', err);
  }
}

// ----------------------------------------------------------------------------
// FETCH DRIVE PHOTOS & RENDER PREVIEW (Workflow Step 3 & 4)
// ----------------------------------------------------------------------------
async function fetchDrivePhotosAndRender() {
  const container = document.getElementById('drivePreviewGrid');
  const statusText = document.getElementById('drivePreviewStatusText');
  const saveAllBtn = document.getElementById('saveAllOverridesBtn');

  if (!container) return;

  const { folderId, apiKey } = ADMIN_STATE.galleryConfig;

  if (!folderId) {
    if (statusText) statusText.textContent = 'Please specify a Google Drive Folder ID above.';
    container.innerHTML = `
      <div class="preview-empty-state">
        <p>No Folder ID provided. Paste your shared folder URL or ID above and click Save.</p>
      </div>
    `;
    if (saveAllBtn) saveAllBtn.style.display = 'none';
    return;
  }

  if (!apiKey) {
    if (statusText) statusText.textContent = 'A restricted Google Drive API key is required to stream live images.';
    container.innerHTML = `
      <div class="preview-empty-state">
        <p>Please enter your Google Drive API key above. Once entered, your live Drive images will load here.</p>
      </div>
    `;
    if (saveAllBtn) saveAllBtn.style.display = 'none';
    return;
  }

  if (statusText) statusText.textContent = 'Connecting to Google Drive API and loading photos...';
  container.innerHTML = `
    <div class="preview-empty-state">
      <p>✦ Contacting Google Drive Sanctum Gallery... ✦</p>
    </div>
  `;

  try {
    // Robust query: query all files in parent folder, filter images client-side to prevent mimeType indexing delay
    const q = encodeURIComponent(`'${folderId}' in parents and trashed=false`);
    const url = `https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name,description,mimeType)&orderBy=createdTime desc&pageSize=100&key=${apiKey}`;

    const res = await fetch(url);
    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      const msg = errJson.error ? errJson.error.message : `HTTP status ${res.status}`;
      throw new Error(msg);
    }

    const data = await res.json();
    const rawFiles = data.files || [];

    // Filter image files (by mimeType or extension)
    const files = rawFiles.filter(f => {
      if (f.mimeType && f.mimeType.startsWith('image/')) return true;
      return /\.(jpe?g|png|webp|gif|bmp|avif)$/i.test(f.name || '');
    });

    ADMIN_STATE.driveFiles = files;

    if (files.length === 0) {
      // Diagnostic check: Test folder metadata permission
      let accessDiagnosis = '';
      try {
        const checkUrl = `https://www.googleapis.com/drive/v3/files/${folderId}?fields=id,name,shared&key=${apiKey}`;
        const checkRes = await fetch(checkUrl);
        if (!checkRes.ok) {
          accessDiagnosis = `Google Drive returned error (${checkRes.status}). This usually indicates the folder is still set to "Restricted" and not accessible via public API Key.`;
        } else {
          const fMeta = await checkRes.json();
          if (fMeta.shared === false) {
            accessDiagnosis = `Folder "${fMeta.name || 'karavinan images'}" is currently private (shared: false).`;
          }
        }
      } catch (diagErr) {}

      if (statusText) {
        statusText.innerHTML = `<span style="color: #ffb347;">⚠️ Google Drive returned 0 files for this folder ID.</span>`;
      }

      container.innerHTML = `
        <div class="preview-empty-state" style="border-color: #F6D77A; text-align: left; padding: 2rem 2.25rem; max-width: 720px; margin: 0 auto;">
          <h4 style="color: var(--gold-primary); font-family: var(--font-heading); margin: 0 0 0.85rem; font-size: 1.15rem;">
            ✦ How to Make Your Google Drive Photos Appear:
          </h4>
          <p style="color: #FFF6DC; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.25rem;">
            Your folder contains files, but Google Drive requires the folder's <strong>General Access</strong> to be set to <strong>"Anyone with the link can view"</strong> so the API Key can read them:
          </p>
          <ol style="color: var(--cream); font-size: 0.9rem; line-height: 1.8; margin-left: 1.25rem; margin-bottom: 1.5rem;">
            <li>In Google Drive, click the arrow next to <strong>"karavinan images ▾"</strong> (or right-click the folder).</li>
            <li>Click <strong>Share</strong> &rarr; <strong>Share</strong>.</li>
            <li>Under <strong>General access</strong>, change <strong>"Restricted"</strong> to <strong>"Anyone with the link"</strong> (Role: <strong>Viewer</strong>).</li>
            <li>Click <strong>Done</strong>.</li>
            <li>Return here and click <button type="button" class="btn-gold" style="padding: 0.35rem 0.85rem; font-size: 0.8rem; margin: 0 4px;" onclick="document.getElementById('refreshLivePreviewBtn').click()">Refresh Live Preview</button>.</li>
          </ol>
          ${accessDiagnosis ? `<div style="background: rgba(179,20,27,0.25); border: 1px solid var(--receipt-red); padding: 0.75rem 1rem; border-radius: 4px; font-size: 0.85rem; color: #ffc2c5;"><strong>Diagnostic:</strong> ${accessDiagnosis}</div>` : ''}
        </div>
      `;
      if (saveAllBtn) saveAllBtn.style.display = 'none';
      return;
    }

    const hiddenCount = files.filter(f => ADMIN_STATE.galleryConfig.hidden.includes(f.id)).length;
    const activeCount = files.length - hiddenCount;

    if (statusText) {
      statusText.innerHTML = `Loaded <strong>${files.length}</strong> photo(s) from Drive — <strong>${activeCount}</strong> active on website, <strong>${hiddenCount}</strong> hidden.`;
    }
    if (saveAllBtn) saveAllBtn.style.display = 'inline-block';

    renderPreviewCards(files);
  } catch (err) {
    console.error('Drive API error:', err);
    if (statusText) statusText.textContent = 'Could not load photos from Google Drive.';
    container.innerHTML = `
      <div class="preview-empty-state" style="border-color: rgba(179, 20, 27, 0.5);">
        <p style="color: #ff9999; margin-bottom: 0.75rem;"><strong>Error connecting to Google Drive:</strong> ${err.message}</p>
        <p style="font-size: 0.85rem; max-width: 500px; margin: 0 auto; line-height: 1.6;">
          Ensure that your folder's share settings are set to <strong>"Anyone with the link can View"</strong>, and verify that your API key is enabled for the Google Drive API.
        </p>
      </div>
    `;
    if (saveAllBtn) saveAllBtn.style.display = 'none';
  }
}

function renderPreviewCards(files) {
  const container = document.getElementById('drivePreviewGrid');
  if (!container) return;

  const { overrides, hidden } = ADMIN_STATE.galleryConfig;

  container.innerHTML = files.map(file => {
    const isHidden = hidden.includes(file.id);
    const override = overrides[file.id] || {};
    const defaultTitle = file.name.replace(/\.[^.]+$/, '');
    const defaultCaption = file.description || '';

    const currentTitle = override.title !== undefined ? override.title : defaultTitle;
    const currentCaption = override.caption !== undefined ? override.caption : defaultCaption;
    const imgSrc = `https://lh3.googleusercontent.com/d/${file.id}`;

    return `
      <div class="preview-card ${isHidden ? 'is-hidden' : ''}" id="previewCard_${file.id}">
        <div class="preview-thumb-wrap">
          <img src="${imgSrc}" alt="${defaultTitle}" class="preview-thumb" loading="lazy" onerror="this.src='assets/images/ka-crest.svg'">
          <span class="preview-badge-status ${isHidden ? 'badge-hidden' : 'badge-active'}" id="statusBadge_${file.id}">
            ${isHidden ? 'Hidden' : 'Active'}
          </span>
        </div>

        <div class="preview-details">
          <div class="preview-orig-title" title="${file.name}">
            File: <span>${file.name}</span>
          </div>

          <div class="override-group">
            <label for="titleOverride_${file.id}">Title Override (optional)</label>
            <input type="text" id="titleOverride_${file.id}" class="override-input" value="${escapeHtml(currentTitle)}" placeholder="Default: ${escapeHtml(defaultTitle)}">
          </div>

          <div class="override-group">
            <label for="captionOverride_${file.id}">Caption Override (optional)</label>
            <input type="text" id="captionOverride_${file.id}" class="override-input" value="${escapeHtml(currentCaption)}" placeholder="Default: ${escapeHtml(defaultCaption || 'None')}">
          </div>

          <label class="hide-toggle-row">
            <input type="checkbox" id="hideCheckbox_${file.id}" ${isHidden ? 'checked' : ''} onchange="toggleImageHidden('${file.id}')">
            <span>Hide this photo on public website</span>
          </label>

          <button type="button" class="preview-card-save-btn" onclick="saveSingleOverride('${file.id}')">
            Save Overrides
          </button>
        </div>
      </div>
    `;
  }).join('');
}

window.toggleImageHidden = function(fileId) {
  const checkbox = document.getElementById(`hideCheckbox_${fileId}`);
  const card = document.getElementById(`previewCard_${fileId}`);
  const badge = document.getElementById(`statusBadge_${fileId}`);
  if (!checkbox) return;

  const isHidden = checkbox.checked;
  const hiddenList = ADMIN_STATE.galleryConfig.hidden;

  if (isHidden) {
    if (!hiddenList.includes(fileId)) hiddenList.push(fileId);
  } else {
    ADMIN_STATE.galleryConfig.hidden = hiddenList.filter(id => id !== fileId);
  }

  if (card) card.classList.toggle('is-hidden', isHidden);
  if (badge) {
    badge.className = `preview-badge-status ${isHidden ? 'badge-hidden' : 'badge-active'}`;
    badge.textContent = isHidden ? 'Hidden' : 'Active';
  }
};

window.saveSingleOverride = async function(fileId) {
  const titleInput = document.getElementById(`titleOverride_${fileId}`);
  const captionInput = document.getElementById(`captionOverride_${fileId}`);
  const checkbox = document.getElementById(`hideCheckbox_${fileId}`);

  if (!ADMIN_STATE.galleryConfig.overrides) ADMIN_STATE.galleryConfig.overrides = {};

  const titleVal = titleInput ? titleInput.value.trim() : '';
  const captionVal = captionInput ? captionInput.value.trim() : '';

  ADMIN_STATE.galleryConfig.overrides[fileId] = {
    title: titleVal,
    caption: captionVal
  };

  if (checkbox) {
    const isHidden = checkbox.checked;
    const hiddenList = ADMIN_STATE.galleryConfig.hidden;
    if (isHidden && !hiddenList.includes(fileId)) hiddenList.push(fileId);
    if (!isHidden) ADMIN_STATE.galleryConfig.hidden = hiddenList.filter(id => id !== fileId);
  }

  await persistGalleryConfig();
  showToast('Image settings saved successfully', true);
};

// ============================================================================
// HOMAM SCHEDULE MANAGER (schedule.json)
// ============================================================================
async function initHomamManager() {
  const container = document.getElementById('homamListContainer');
  if (!container) return;

  try {
    const res = await fetch('schedule.json?' + Date.now());
    if (!res.ok) throw new Error('Failed to load schedule.json');
    ADMIN_STATE.homamData = await res.json();
    renderHomamManagerList();
  } catch (err) {
    container.innerHTML = `<p class="admin-error-text">Could not load schedule.json: ${err.message}</p>`;
  }
}

function renderHomamManagerList() {
  const container = document.getElementById('homamListContainer');
  if (!container || !ADMIN_STATE.homamData) return;

  const upcoming = ADMIN_STATE.homamData.upcoming || [];
  const past = ADMIN_STATE.homamData.past || [];

  container.innerHTML = `
    <h4 style="color: var(--gold-primary); margin: 0 0 1rem; font-family: var(--font-heading);">✦ Upcoming Ceremonies (${upcoming.length})</h4>
    ${upcoming.map(item => renderHomamItemRow(item, 'upcoming')).join('')}
    
    <h4 style="color: var(--gold-primary); margin: 2rem 0 1rem; font-family: var(--font-heading);">✦ Completed Ceremonies (${past.length})</h4>
    ${past.map(item => renderHomamItemRow(item, 'past')).join('')}
  `;
}

function renderHomamItemRow(item, category) {
  return `
    <div class="admin-item-row">
      <div class="admin-item-info">
        <div class="admin-item-title">${escapeHtml(item.name)} <span style="font-size: 0.8rem; color: var(--gold-secondary);">(${escapeHtml(item.deity)})</span></div>
        <div class="admin-item-meta">
          📅 ${escapeHtml(item.display_date)} &nbsp;|&nbsp; ⏰ ${escapeHtml(item.time)} &nbsp;|&nbsp; 📍 ${escapeHtml(item.venue)}
        </div>
      </div>
      <div class="admin-item-actions">
        <button class="btn-item-action" onclick="toggleVirtualSankalpam(${item.id}, '${category}')">
          ${item.sankalpam_available ? '✓ Virtual Available' : 'Concluded'}
        </button>
      </div>
    </div>
  `;
}

window.toggleVirtualSankalpam = async function(id, category) {
  if (!ADMIN_STATE.homamData || !ADMIN_STATE.homamData[category]) return;
  const item = ADMIN_STATE.homamData[category].find(h => h.id === id);
  if (item) {
    item.sankalpam_available = !item.sankalpam_available;
    renderHomamManagerList();
    await saveJsonFile('schedule.json', ADMIN_STATE.homamData);
    showToast(`Updated "${item.name}" sankalpam availability`, true);
  }
};

// ============================================================================
// DAILY THOUGHTS MANAGER (thoughts.json)
// ============================================================================
async function initThoughtsManager() {
  const container = document.getElementById('thoughtsListContainer');
  if (!container) return;

  try {
    const res = await fetch('thoughts.json?' + Date.now());
    if (!res.ok) throw new Error('Failed to load thoughts.json');
    ADMIN_STATE.thoughtsData = await res.json();
    renderThoughtsManagerList();
  } catch (err) {
    container.innerHTML = `<p class="admin-error-text">Could not load thoughts.json: ${err.message}</p>`;
  }
}

function renderThoughtsManagerList() {
  const container = document.getElementById('thoughtsListContainer');
  if (!container || !ADMIN_STATE.thoughtsData) return;

  const list = ADMIN_STATE.thoughtsData.thoughts || [];

  container.innerHTML = `
    <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.25rem;">
      Showing ${list.length} sacred mantras rotating daily.
    </p>
    ${list.slice(0, 15).map(item => `
      <div class="admin-item-row">
        <div class="admin-item-info">
          <div class="admin-item-title" style="font-family: inherit; font-size: 1.15rem; color: #FFF6DC;">${escapeHtml(item.mantra)}</div>
          <div class="admin-item-meta" style="color: var(--gold-primary);">✦ ${escapeHtml(item.theme)}</div>
          <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.35rem;">${escapeHtml(item.meaning.slice(0, 110))}...</div>
        </div>
        <div class="admin-item-actions">
          <span style="font-size: 0.8rem; color: var(--gold-secondary);">Day #${item.day}</span>
        </div>
      </div>
    `).join('')}
  `;
}

// ============================================================================
// DEVOTEE TESTIMONIALS MANAGER (feedback.json)
// ============================================================================
async function initFeedbackManager() {
  const container = document.getElementById('feedbackListContainer');
  if (!container) return;

  try {
    const res = await fetch('feedback.json?' + Date.now());
    if (!res.ok) throw new Error('Failed to load feedback.json');
    ADMIN_STATE.feedbackData = await res.json();
    renderFeedbackManagerList();
  } catch (err) {
    container.innerHTML = `<p class="admin-error-text">Could not load feedback.json: ${err.message}</p>`;
  }
}

function renderFeedbackManagerList() {
  const container = document.getElementById('feedbackListContainer');
  if (!container || !ADMIN_STATE.feedbackData) return;

  const list = ADMIN_STATE.feedbackData.testimonials || [];

  container.innerHTML = `
    <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.25rem;">
      Showing ${list.length} approved devotee testimonials displayed on the website.
    </p>
    ${list.map(item => `
      <div class="admin-item-row">
        <div class="admin-item-info">
          <div class="admin-item-title">${escapeHtml(item.devotee)} <span style="font-size: 0.8rem; color: var(--text-muted);">(${escapeHtml(item.location)})</span></div>
          <div class="admin-item-meta" style="color: var(--gold-secondary); margin-bottom: 0.3rem;">✦ ${escapeHtml(item.service_received)}</div>
          <div style="font-size: 0.88rem; color: #FFF6DC; font-style: italic;">"${escapeHtml(item.feedback.slice(0, 120))}..."</div>
        </div>
        <div class="admin-item-actions">
          <span style="color: var(--gold-primary); font-size: 0.85rem;">★ ${item.rating}/5</span>
        </div>
      </div>
    `).join('')}
  `;
}

// ============================================================================
// SETTINGS & PASSCODE MANAGER
// ============================================================================
function initSettingsManager() {
  const newPasscode = document.getElementById('newPasscodeInput');
  const confirmPasscode = document.getElementById('confirmPasscodeInput');
  const saveBtn = document.getElementById('saveNewPasscodeBtn');

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const p1 = newPasscode ? newPasscode.value.trim() : '';
      const p2 = confirmPasscode ? confirmPasscode.value.trim() : '';

      if (p1.length < 6) {
        showToast('Passcode must be at least 6 characters long', false);
        return;
      }
      if (p1 !== p2) {
        showToast('Passcodes do not match', false);
        return;
      }

      localStorage.setItem('karavinan_admin_passcode', p1);
      if (newPasscode) newPasscode.value = '';
      if (confirmPasscode) confirmPasscode.value = '';
      showToast('Admin security passcode updated successfully', true);
    });
  }
}

// ============================================================================
// UTILITY FUNCTIONS & TOAST
// ============================================================================
async function saveJsonFile(filename, data) {
  try {
    const res = await fetch('/api/save-json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename, data })
    });
    if (!res.ok) throw new Error('Server returned ' + res.status);
    return true;
  } catch (err) {
    console.warn(`Server file save failed for ${filename}, storing in localStorage`, err);
    localStorage.setItem(`karavinan_file_${filename}`, JSON.stringify(data));
    return false;
  }
}

function showToast(message, isSuccess = true) {
  const toast = document.getElementById('adminToast');
  if (!toast) return;

  toast.textContent = message;
  toast.className = `admin-toast ${isSuccess ? 'success' : 'error'}`;
  toast.style.display = 'block';

  setTimeout(() => {
    toast.style.display = 'none';
  }, 3500);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
