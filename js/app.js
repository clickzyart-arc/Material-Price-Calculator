/**
 * Material Price Master & Quotation Suite Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements - Navigation
  const tabButtons = document.querySelectorAll('.nav-tab');
  const tabContents = document.querySelectorAll('.tab-content');
  const rateCardCountBadge = document.getElementById('rateCardCountBadge');
  const savedQuoteCountBadge = document.getElementById('savedQuoteCountBadge');

  // DOM Elements - Calculator Controls
  const materialCategorySelect = document.getElementById('materialCategorySelect');
  const thicknessSelect = document.getElementById('thicknessSelect');
  const specPrinting = document.getElementById('specPrinting');
  const specLamination = document.getElementById('specLamination');
  const specMaterial = document.getElementById('specMaterial');
  const specVarnish = document.getElementById('specVarnish');
  const specBaseTotal = document.getElementById('specBaseTotal');

  // Unit Toggle
  const unitInchesBtn = document.getElementById('unitInchesBtn');
  const unitFeetBtn = document.getElementById('unitFeetBtn');
  const currentUnitLabel = document.getElementById('currentUnitLabel');
  const unitSymbols = document.querySelectorAll('.unit-symbol');

  // Dimensions
  const widthInput = document.getElementById('widthInput');
  const heightInput = document.getElementById('heightInput');

  // Dimension Preview Metrics
  const displayAreaSqFt = document.getElementById('displayAreaSqFt');
  const displayAreaLabel = document.getElementById('displayAreaLabel');
  const displayPerimeterInches = document.getElementById('displayPerimeterInches');
  const displayAspect = document.getElementById('displayAspect');

  // Extras
  const holesCard = document.getElementById('holesCard');
  const holesToggle = document.getElementById('holesToggle');
  const holesInputContainer = document.getElementById('holesInputContainer');
  const holesCountInput = document.getElementById('holesCountInput');
  const holesRateInput = document.getElementById('holesRateInput');

  const frameCard = document.getElementById('frameCard');
  const frameToggle = document.getElementById('frameToggle');
  const frameInputContainer = document.getElementById('frameInputContainer');
  const frameCustomRateCheck = document.getElementById('frameCustomRateCheck');
  const frameCustomRateLabel = document.getElementById('frameCustomRateLabel');
  const frameRateLockTag = document.getElementById('frameRateLockTag');
  const frameRateInput = document.getElementById('frameRateInput');
  const frameWastageInput = document.getElementById('frameWastageInput');
  const frameTotalPreview = document.getElementById('frameTotalPreview');

  const stretchingCard = document.getElementById('stretchingCard');
  const stretchingToggle = document.getElementById('stretchingToggle');
  const stretchingInputContainer = document.getElementById('stretchingInputContainer');
  const stretchingRateInput = document.getElementById('stretchingRateInput');
  const stretchingMarginInput = document.getElementById('stretchingMarginInput');
  const stretchingTotalPreview = document.getElementById('stretchingTotalPreview');
  const stretchingCalcSqFt = document.getElementById('stretchingCalcSqFt');
  const stretchingCalcRate = document.getElementById('stretchingCalcRate');
  const stretchingCalcTotal = document.getElementById('stretchingCalcTotal');
  const stretchingFormulaNote = document.getElementById('stretchingFormulaNote');

  // Price Override Accordion
  const priceOverrideToggle = document.getElementById('priceOverrideToggle');
  const priceOverridePanel = document.getElementById('priceOverridePanel');
  const overrideChevron = document.getElementById('overrideChevron');
  const overridePrinting = document.getElementById('overridePrinting');
  const overrideLamination = document.getElementById('overrideLamination');
  const overrideMaterial = document.getElementById('overrideMaterial');
  const overrideVarnish = document.getElementById('overrideVarnish');
  const resetOverrideBtn = document.getElementById('resetOverrideBtn');

  // Live Price Breakdown (Right Column)
  const heroTotalPrice = document.getElementById('heroTotalPrice');
  const heroRateDetail = document.getElementById('heroRateDetail');
  const breakdownAreaText = document.getElementById('breakdownAreaText');
  const breakdownBaseRate = document.getElementById('breakdownBaseRate');
  const breakdownAreaCost = document.getElementById('breakdownAreaCost');
  const breakdownHolesRow = document.getElementById('breakdownHolesRow');
  const breakdownHolesDetail = document.getElementById('breakdownHolesDetail');
  const breakdownHolesCost = document.getElementById('breakdownHolesCost');
  const breakdownFrameRow = document.getElementById('breakdownFrameRow');
  const breakdownFrameDetail = document.getElementById('breakdownFrameDetail');
  const breakdownFrameCost = document.getElementById('breakdownFrameCost');
  const breakdownStretchingRow = document.getElementById('breakdownStretchingRow');
  const breakdownStretchingDetail = document.getElementById('breakdownStretchingDetail');
  const breakdownStretchingCost = document.getElementById('breakdownStretchingCost');
  const breakdownUnitTotal = document.getElementById('breakdownUnitTotal');

  // Quotation Basket Elements
  const addToBasketBtn = document.getElementById('addToBasketBtn');
  const resetCalcBtn = document.getElementById('resetCalcBtn');
  const basketCountBadge = document.getElementById('basketCountBadge');
  const basketItemsList = document.getElementById('basketItemsList');
  const basketSummaryBox = document.getElementById('basketSummaryBox');
  const basketGrandTotal = document.getElementById('basketGrandTotal');
  const customerNameInput = document.getElementById('customerNameInput');
  const customerPhoneInput = document.getElementById('customerPhoneInput');
  const generateQuoteBtn = document.getElementById('generateQuoteBtn');
  const saveQuoteBtn = document.getElementById('saveQuoteBtn');
  const clearBasketBtn = document.getElementById('clearBasketBtn');

  // Rate Master Table Elements
  const masterRateTableBody = document.getElementById('masterRateTableBody');
  const rateSearchInput = document.getElementById('rateSearchInput');
  const rateCategoryFilter = document.getElementById('rateCategoryFilter');
  const addNewMaterialBtn = document.getElementById('addNewMaterialBtn');
  const saveRatesBtn = document.getElementById('saveRatesBtn');
  const resetRatesBtn = document.getElementById('resetRatesBtn');
  const exportRatesBtn = document.getElementById('exportRatesBtn');
  const importRatesInput = document.getElementById('importRatesInput');

  // Material Modal Elements
  const materialModal = document.getElementById('materialModal');
  const closeMaterialModalBtn = document.getElementById('closeMaterialModalBtn');
  const cancelMaterialModalBtn = document.getElementById('cancelMaterialModalBtn');
  const materialForm = document.getElementById('materialForm');
  const materialModalId = document.getElementById('materialModalId');
  const materialModalHeadingText = document.getElementById('materialModalHeadingText');
  const materialModalSubmitText = document.getElementById('materialModalSubmitText');
  const materialModalCategory = document.getElementById('materialModalCategory');
  const materialCategoryDatalist = document.getElementById('materialCategoryDatalist');
  const materialModalThickness = document.getElementById('materialModalThickness');
  const materialModalPrinting = document.getElementById('materialModalPrinting');
  const materialModalLamination = document.getElementById('materialModalLamination');
  const materialModalMaterialPrice = document.getElementById('materialModalMaterialPrice');
  const materialModalVarnish = document.getElementById('materialModalVarnish');
  const materialModalBaseTotalPreview = document.getElementById('materialModalBaseTotalPreview');
  const materialModalFrame = document.getElementById('materialModalFrame');
  const materialModalHoleRate = document.getElementById('materialModalHoleRate');
  const materialModalStretchingRate = document.getElementById('materialModalStretchingRate');
  const materialModalNotes = document.getElementById('materialModalNotes');

  // Auth Elements
  const headerRoleBadge = document.getElementById('headerRoleBadge');
  const btnHeaderAuth = document.getElementById('btnHeaderAuth');
  const adminNoticeBanner = document.getElementById('adminNoticeBanner');
  const bannerNoticeIcon = document.getElementById('bannerNoticeIcon');
  const bannerNoticeHeading = document.getElementById('bannerNoticeHeading');
  const bannerNoticeText = document.getElementById('bannerNoticeText');
  const btnBannerLogin = document.getElementById('btnBannerLogin');

  // Admin Login Modal Elements
  const adminLoginModal = document.getElementById('adminLoginModal');
  const closeAdminLoginModalBtn = document.getElementById('closeAdminLoginModalBtn');
  const cancelAdminLoginBtn = document.getElementById('cancelAdminLoginBtn');
  const adminLoginForm = document.getElementById('adminLoginForm');
  const adminLoginError = document.getElementById('adminLoginError');
  const adminLoginErrorText = document.getElementById('adminLoginErrorText');
  const adminEmailInput = document.getElementById('adminEmailInput');
  const adminPasswordInput = document.getElementById('adminPasswordInput');
  const btnTogglePassword = document.getElementById('btnTogglePassword');
  const togglePasswordIcon = document.getElementById('togglePasswordIcon');

  // History Elements
  const savedQuotesContainer = document.getElementById('savedQuotesContainer');
  const clearAllHistoryBtn = document.getElementById('clearAllHistoryBtn');

  // Modal Elements
  const quotationModal = document.getElementById('quotationModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const printSlipBtn = document.getElementById('printSlipBtn');
  const sheetQuoteNum = document.getElementById('sheetQuoteNum');
  const sheetDate = document.getElementById('sheetDate');
  const sheetCustomerName = document.getElementById('sheetCustomerName');
  const sheetCustomerPhone = document.getElementById('sheetCustomerPhone');
  const sheetTableBody = document.getElementById('sheetTableBody');
  const sheetSubtotal = document.getElementById('sheetSubtotal');
  const sheetGrandTotal = document.getElementById('sheetGrandTotal');

  // Toast Container
  const toastContainer = document.getElementById('toastContainer');

  // =========================================================================
  // APP STATE, AUTH & STORAGE KEYS
  // =========================================================================
  const ADMIN_CREDENTIALS = {
    email: 'admin@calculator.clickzy',
    password: 'Clickzy@0850'
  };
  const STORAGE_KEY_AUTH = 'calc_admin_auth_v1';

  function isAdminLoggedIn() {
    return localStorage.getItem(STORAGE_KEY_AUTH) === 'true';
  }

  function setAdminLoggedIn(isLoggedIn) {
    if (isLoggedIn) {
      localStorage.setItem(STORAGE_KEY_AUTH, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEY_AUTH);
    }
    updateAuthUI();
  }

  function updateAuthUI() {
    const isAdmin = isAdminLoggedIn();

    if (isAdmin) {
      document.body.classList.remove('role-employee');
      document.body.classList.add('role-admin');

      headerRoleBadge.className = 'role-badge admin';
      headerRoleBadge.innerHTML = '<i class="fa-solid fa-shield-halved"></i> <span>Admin</span>';
      btnHeaderAuth.className = 'btn btn-danger btn-sm btn-auth';
      btnHeaderAuth.innerHTML = '<i class="fa-solid fa-right-from-bracket"></i> <span>Logout</span>';
      btnHeaderAuth.title = 'Logout from Administrator mode';

      adminNoticeBanner.className = 'admin-notice-banner admin-banner';
      bannerNoticeIcon.className = 'fa-solid fa-shield-halved';
      bannerNoticeHeading.textContent = 'Administrator Mode Active';
      bannerNoticeText.textContent = 'You have full permissions to edit rates, add materials, delete items, and backup/restore data.';
      btnBannerLogin.style.display = 'none';

      addNewMaterialBtn.style.display = 'inline-flex';
      saveRatesBtn.style.display = 'inline-flex';
      resetRatesBtn.style.display = 'inline-flex';
      if (importRatesInput && importRatesInput.parentElement) {
        importRatesInput.parentElement.style.display = 'inline-flex';
      }

      // Unlock calculator rate price inputs for admin
      const ratePriceInputs = document.querySelectorAll('.rate-price-input');
      const rateLockTags = document.querySelectorAll('.rate-lock-tag');
      const overrideEmployeeMsg = document.getElementById('overrideEmployeeMsg');
      const overrideAdminBadge = document.getElementById('overrideAdminBadge');
      const resetOverrideBtn = document.getElementById('resetOverrideBtn');

      ratePriceInputs.forEach(inp => {
        inp.disabled = false;
        inp.removeAttribute('readonly');
        inp.removeAttribute('tabindex');
        inp.classList.remove('rate-locked');
      });
      rateLockTags.forEach(tag => {
        tag.className = 'rate-lock-tag admin-unlocked';
        tag.innerHTML = '<i class="fa-solid fa-lock-open"></i> Editable';
        tag.title = 'Rate unlocked (Administrator mode)';
      });
      if (overrideEmployeeMsg) overrideEmployeeMsg.style.display = 'none';
      if (overrideAdminBadge) {
        overrideAdminBadge.innerHTML = '<i class="fa-solid fa-lock-open"></i> Admin Active';
        overrideAdminBadge.className = 'admin-only-badge admin-unlocked';
      }
      if (resetOverrideBtn) resetOverrideBtn.disabled = false;
    } else {
      document.body.classList.remove('role-admin');
      document.body.classList.add('role-employee');

      headerRoleBadge.className = 'role-badge employee';
      headerRoleBadge.innerHTML = '<i class="fa-solid fa-user"></i> <span>Employee</span>';
      btnHeaderAuth.className = 'btn btn-secondary btn-sm btn-auth';
      btnHeaderAuth.innerHTML = '<i class="fa-solid fa-lock"></i> <span>Admin Login</span>';
      btnHeaderAuth.title = 'Login as Administrator';

      adminNoticeBanner.className = 'admin-notice-banner employee-banner';
      bannerNoticeIcon.className = 'fa-solid fa-lock';
      bannerNoticeHeading.textContent = 'Rate Card Locked (Employee Mode)';
      bannerNoticeText.textContent = 'You can view and search rates. Logging in as Administrator is required to edit rates, add new items, or delete materials.';
      btnBannerLogin.style.display = 'inline-flex';

      addNewMaterialBtn.style.display = 'none';
      saveRatesBtn.style.display = 'none';
      resetRatesBtn.style.display = 'none';
      if (importRatesInput && importRatesInput.parentElement) {
        importRatesInput.parentElement.style.display = 'none';
      }

      // Lock calculator rate price inputs for employee (strictly view only)
      const ratePriceInputs = document.querySelectorAll('.rate-price-input');
      const rateLockTags = document.querySelectorAll('.rate-lock-tag');
      const overrideEmployeeMsg = document.getElementById('overrideEmployeeMsg');
      const overrideAdminBadge = document.getElementById('overrideAdminBadge');
      const resetOverrideBtn = document.getElementById('resetOverrideBtn');

      ratePriceInputs.forEach(inp => {
        inp.disabled = true;
        inp.setAttribute('readonly', 'true');
        inp.setAttribute('tabindex', '-1');
        inp.classList.add('rate-locked');
      });
      rateLockTags.forEach(tag => {
        tag.className = 'rate-lock-tag';
        tag.innerHTML = '<i class="fa-solid fa-lock"></i> Fixed';
        tag.title = 'Fixed rate (Only Administrator can modify)';
      });
      if (overrideEmployeeMsg) overrideEmployeeMsg.style.display = 'flex';
      if (overrideAdminBadge) {
        overrideAdminBadge.innerHTML = '<i class="fa-solid fa-lock"></i> Admin Only';
        overrideAdminBadge.className = 'admin-only-badge';
      }
      if (resetOverrideBtn) resetOverrideBtn.disabled = true;
      if (typeof updateFrameRateLockState === 'function') updateFrameRateLockState();
    }

    renderMasterRateTable();
    if (typeof calculateLivePrice === 'function') {
      calculateLivePrice();
    }
  }

  function openAdminLoginModal() {
    adminLoginForm.reset();
    adminLoginError.style.display = 'none';
    adminPasswordInput.type = 'password';
    togglePasswordIcon.className = 'fa-solid fa-eye';
    adminEmailInput.value = 'admin@calculator.clickzy';
    adminLoginModal.classList.add('open');
    setTimeout(() => {
      adminPasswordInput.focus();
    }, 100);
  }

  function closeAdminLoginModal() {
    adminLoginModal.classList.remove('open');
    adminLoginForm.reset();
    adminLoginError.style.display = 'none';
  }

  function handleAdminLoginFormSubmit(e) {
    e.preventDefault();
    const email = (adminEmailInput.value || '').trim().toLowerCase();
    const password = (adminPasswordInput.value || '').trim();

    if (email === ADMIN_CREDENTIALS.email.toLowerCase() && password === ADMIN_CREDENTIALS.password) {
      setAdminLoggedIn(true);
      closeAdminLoginModal();
      showToast('Welcome, Administrator! Rate Card Master and price editing are now unlocked.', 'success');
    } else {
      adminLoginError.style.display = 'flex';
      adminLoginErrorText.textContent = 'Invalid administrator email or password.';
      adminPasswordInput.value = '';
      adminPasswordInput.focus();
    }
  }

  const STORAGE_KEY_FRAME_WASTAGE = "print_calc_frame_wastage_v2";

  function getSavedFrameWastage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FRAME_WASTAGE);
      if (saved !== null && saved !== '' && !isNaN(parseFloat(saved))) {
        return parseFloat(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return 6;
  }

  function saveFrameWastage(val) {
    try {
      localStorage.setItem(STORAGE_KEY_FRAME_WASTAGE, val);
    } catch (e) {
      console.error(e);
    }
  }

  let currentUnit = 'feet'; // Default: 'feet' (Inches optional)
  let currentCalculation = {};
  let quotationBasket = [];

  // =========================================================================
  // INITIALIZATION
  // =========================================================================
  function init() {
    setupTabNavigation();
    populateCategoryDropdown();
    populateCategoryFilterInMaster();
    updateAuthUI();
    renderMasterRateTable();
    updateBadges();
    renderSavedQuotes();
    renderThemeStudio();

    // Restore saved frame wastage preference
    frameWastageInput.value = getSavedFrameWastage();

    // Select initial category and variant
    if (materialCategorySelect.options.length > 0) {
      materialCategorySelect.selectedIndex = 0;
      handleCategoryChange();
    }

    attachEventListeners();
    calculateLivePrice();
  }

  // =========================================================================
  // TAB NAVIGATION
  // =========================================================================
  function setupTabNavigation() {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        tabButtons.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');

        if (targetTab === 'calculator') {
          document.getElementById('viewCalculator').classList.add('active');
        } else if (targetTab === 'price-master') {
          document.getElementById('viewPriceMaster').classList.add('active');
          renderMasterRateTable();
        } else if (targetTab === 'quote-history') {
          document.getElementById('viewHistory').classList.add('active');
          renderSavedQuotes();
        } else if (targetTab === 'theme-studio') {
          document.getElementById('viewThemeStudio').classList.add('active');
          renderThemeStudio();
        }
      });
    });
  }

  // =========================================================================
  // CASCADING DROPDOWNS: CATEGORY -> THICKNESS / VARIANT
  // =========================================================================
  function populateCategoryDropdown() {
    const categories = window.materialDataManager.getCategories();
    materialCategorySelect.innerHTML = '';

    categories.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat;
      materialCategorySelect.appendChild(opt);
    });
  }

  function handleCategoryChange() {
    const selectedCategory = materialCategorySelect.value;
    const variants = window.materialDataManager.getVariantsByCategory(selectedCategory);

    thicknessSelect.innerHTML = '';
    variants.forEach(variant => {
      const opt = document.createElement('option');
      opt.value = variant.id;
      opt.textContent = variant.thickness;
      thicknessSelect.appendChild(opt);
    });

    handleVariantChange();
  }

  function handleVariantChange() {
    const selectedId = thicknessSelect.value;
    const item = window.materialDataManager.getItemById(selectedId);
    if (!item) return;

    // Update Material Spec Banner
    const baseTotal = (item.printing || 0) + (item.lamination || 0) + (item.materialPrice || 0) + (item.varnish || 0);
    specPrinting.textContent = `₹${item.printing || 0}`;
    specLamination.textContent = `₹${item.lamination || 0}`;
    specMaterial.textContent = `₹${item.materialPrice || 0}`;
    specVarnish.textContent = `₹${item.varnish || 0}`;
    specBaseTotal.textContent = `₹${baseTotal}`;

    // Clear override inputs
    overridePrinting.value = '';
    overrideLamination.value = '';
    overrideMaterial.value = '';
    overrideVarnish.value = '';
    overridePrinting.placeholder = item.printing || 0;
    overrideLamination.placeholder = item.lamination || 0;
    overrideMaterial.placeholder = item.materialPrice || 0;
    overrideVarnish.placeholder = item.varnish || 0;

    // Smart Defaults for Extras according to Excel
    // Holes OFF by default for all materials (user requirement)
    holesToggle.checked = false;
    if (item.defaultHoleRate > 0) {
      holesRateInput.value = item.defaultHoleRate;
    } else {
      holesRateInput.value = 100;
    }
    updateHolesUI();

    // If material specifies Frame (e.g. ACP, WPVC, Canvas):
    if (item.framePerInch > 0) {
      frameToggle.checked = true;
      frameRateInput.value = item.framePerInch;
      // Preserve user-selected wastage
      if (!frameWastageInput.value || isNaN(parseFloat(frameWastageInput.value))) {
        frameWastageInput.value = getSavedFrameWastage();
      }
    } else {
      frameToggle.checked = false;
      frameRateInput.value = 5;
    }
    if (frameCustomRateCheck) frameCustomRateCheck.checked = false;
    updateFrameUI();

    // If material specifies stretching (e.g. Canvas Stretching Round):
    if (item.defaultStretchingRate > 0) {
      stretchingToggle.checked = true;
      stretchingRateInput.value = item.defaultStretchingRate;
    } else {
      stretchingToggle.checked = false;
      stretchingRateInput.value = 220;
    }
    if (stretchingMarginInput) stretchingMarginInput.value = 2;
    updateStretchingUI();

    calculateLivePrice();
  }

  // =========================================================================
  // UNIT TOGGLE (INCHES vs FEET)
  // =========================================================================
  function setUnit(unit) {
    if (currentUnit === unit) return;
    const oldUnit = currentUnit;
    currentUnit = unit;

    const w = parseFloat(widthInput.value) || 0;
    const h = parseFloat(heightInput.value) || 0;

    if (unit === 'feet') {
      unitInchesBtn.classList.remove('active');
      unitFeetBtn.classList.add('active');
      currentUnitLabel.textContent = "Dimensions in Feet (W × H)";
      unitSymbols.forEach(el => el.textContent = 'ft');

      // Convert inches to feet for user convenience
      if (oldUnit === 'inches' && w > 0 && h > 0) {
        widthInput.value = (w / 12).toFixed(2);
        heightInput.value = (h / 12).toFixed(2);
      }
    } else {
      unitFeetBtn.classList.remove('active');
      unitInchesBtn.classList.add('active');
      currentUnitLabel.textContent = "Dimensions in Inches (W × H ÷ 144)";
      unitSymbols.forEach(el => el.textContent = 'in');

      // Convert feet to inches
      if (oldUnit === 'feet' && w > 0 && h > 0) {
        widthInput.value = Math.round(w * 12);
        heightInput.value = Math.round(h * 12);
      }
    }

    calculateLivePrice();
  }

  // =========================================================================
  // EXTRAS UI TOGGLE HELPERS
  // =========================================================================
  function updateHolesUI() {
    if (holesToggle.checked) {
      holesCard.classList.add('active');
      holesInputContainer.style.opacity = '1';
      holesInputContainer.style.pointerEvents = 'auto';
    } else {
      holesCard.classList.remove('active');
      holesInputContainer.style.opacity = '0.5';
      holesInputContainer.style.pointerEvents = 'none';
    }
  }

  function updateFrameRateLockState() {
    const isAdmin = isAdminLoggedIn();
    const isCustomAllowed = !!(frameCustomRateCheck && frameCustomRateCheck.checked);

    if (isAdmin || isCustomAllowed) {
      frameRateInput.disabled = false;
      frameRateInput.removeAttribute('readonly');
      frameRateInput.removeAttribute('tabindex');
      frameRateInput.classList.remove('rate-locked');
      frameRateInput.classList.add('custom-rate-enabled');
      if (frameRateLockTag) {
        if (isAdmin) {
          frameRateLockTag.className = 'rate-lock-tag admin-unlocked';
          frameRateLockTag.innerHTML = '<i class="fa-solid fa-lock-open"></i> Editable';
          frameRateLockTag.title = 'Rate unlocked (Administrator mode)';
        } else {
          frameRateLockTag.className = 'rate-lock-tag custom-unlocked';
          frameRateLockTag.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Custom';
          frameRateLockTag.title = 'Custom frame rate enabled by employee';
        }
      }
      if (frameCustomRateLabel) {
        frameCustomRateLabel.classList.add('active');
      }
    } else {
      frameRateInput.disabled = true;
      frameRateInput.setAttribute('readonly', 'true');
      frameRateInput.setAttribute('tabindex', '-1');
      frameRateInput.classList.add('rate-locked');
      frameRateInput.classList.remove('custom-rate-enabled');
      if (frameRateLockTag) {
        frameRateLockTag.className = 'rate-lock-tag';
        frameRateLockTag.innerHTML = '<i class="fa-solid fa-lock"></i> Fixed';
        frameRateLockTag.title = 'Fixed rate (Check "Custom Rate" to edit)';
      }
      if (frameCustomRateLabel) {
        frameCustomRateLabel.classList.remove('active');
      }
      // Reset to default rate if not custom
      const selectedId = thicknessSelect ? thicknessSelect.value : null;
      const item = selectedId ? window.materialDataManager.getItemById(selectedId) : null;
      const defaultRate = (item && item.framePerInch > 0) ? item.framePerInch : 5;
      frameRateInput.value = defaultRate;
    }
  }

  function updateFrameUI() {
    if (frameToggle.checked) {
      frameCard.classList.add('active');
      frameInputContainer.style.opacity = '1';
      frameInputContainer.style.pointerEvents = 'auto';
    } else {
      frameCard.classList.remove('active');
      frameInputContainer.style.opacity = '0.5';
      frameInputContainer.style.pointerEvents = 'none';
    }
    updateFrameRateLockState();
  }

  function updateStretchingUI() {
    if (stretchingToggle.checked) {
      stretchingCard.classList.add('active');
      stretchingInputContainer.style.opacity = '1';
      stretchingInputContainer.style.pointerEvents = 'auto';
      if (!stretchingRateInput.value || parseFloat(stretchingRateInput.value) <= 0) {
        stretchingRateInput.value = 220;
      }
      if (!stretchingMarginInput.value || parseFloat(stretchingMarginInput.value) < 0) {
        stretchingMarginInput.value = 2;
      }
    } else {
      stretchingCard.classList.remove('active');
      stretchingInputContainer.style.opacity = '0.5';
      stretchingInputContainer.style.pointerEvents = 'none';
    }
  }

  // =========================================================================
  // BILLABLE SQUARE FOOT RULE (SQUARE FOOT SLAB CALCULATION ENGINE)
  // =========================================================================
  // Rules:
  // - If fractional sq.ft is > 0 and <= 0.50 (e.g. 6.20 sq.ft) -> calculate for X.50 (e.g. 6.50 sq.ft)
  // - If fractional sq.ft is > 0.50 (e.g. 6.65 sq.ft) -> calculate for full square foot X+1.00 (e.g. 7.00 sq.ft)
  // - Exact integer remains exact integer
  function getBillableSqFt(actualSqFt) {
    if (actualSqFt <= 0) return 0;
    const rounded = Math.round(actualSqFt * 100) / 100;
    const baseInteger = Math.floor(rounded);
    const frac = Math.round((rounded - baseInteger) * 100) / 100;

    if (frac === 0) {
      return baseInteger;
    } else if (frac <= 0.50) {
      return baseInteger + 0.50;
    } else {
      return baseInteger + 1.00;
    }
  }
  window.getBillableSqFt = getBillableSqFt;

  // =========================================================================
  // CORE CALCULATION ENGINE
  // =========================================================================
  function calculateLivePrice() {
    const selectedId = thicknessSelect.value;
    const item = window.materialDataManager.getItemById(selectedId);
    if (!item) return;

    const width = Math.max(0.01, parseFloat(widthInput.value) || 0);
    const height = Math.max(0.01, parseFloat(heightInput.value) || 0);

    // 1. Calculate Square Footage & Perimeter Running Inches
    let actualSqFt = 0;
    let perimeterInches = 0;
    let widthInches = 0;
    let heightInches = 0;

    if (currentUnit === 'inches') {
      widthInches = width;
      heightInches = height;
    } else {
      widthInches = width * 12;
      heightInches = height * 12;
    }

    // Artwork perimeter (used for frame border)
    perimeterInches = 2 * (widthInches + heightInches);

    // Stretching Margin / Depth (adds margin on all 4 sides: left, right, top, bottom)
    let stretchingMargin = 0;
    if (stretchingToggle.checked) {
      stretchingMargin = Math.max(0, parseFloat(stretchingMarginInput.value) || 0);
    }

    // Gross dimensions for canvas print & wrap
    const grossWidthInches = widthInches + (2 * stretchingMargin);
    const grossHeightInches = heightInches + (2 * stretchingMargin);
    actualSqFt = (grossWidthInches * grossHeightInches) / 144;

    // Billable Square Foot Rule for price calculation
    const billableSqFt = getBillableSqFt(actualSqFt);
    const sqFt = billableSqFt;

    // Display Dimension visualizer metrics
    displayAreaSqFt.textContent = billableSqFt.toFixed(2);
    if (displayAreaLabel) {
      if (stretchingToggle.checked && stretchingMargin > 0) {
        displayAreaLabel.innerHTML = `Total Sq. Feet <span style="font-size: 0.68rem; color: var(--accent-emerald); display: block; font-weight: 500;">(Incl. +${stretchingMargin}″ all 4 sides • Act: ${actualSqFt.toFixed(2)})</span>`;
      } else if (Math.abs(billableSqFt - actualSqFt) > 0.001) {
        displayAreaLabel.innerHTML = `Total Sq. Feet <span style="font-size: 0.68rem; color: var(--accent-amber); display: block; font-weight: 500;">(Act: ${actualSqFt.toFixed(2)})</span>`;
      } else {
        displayAreaLabel.textContent = 'Total Sq. Feet';
      }
    }
    displayPerimeterInches.textContent = perimeterInches.toFixed(1);
    
    // Compute simplified aspect ratio for visual aid
    const gcd = (a, b) => b < 0.001 ? a : gcd(b, Math.floor(a % b));
    const simpleAspect = `${(width / (gcd(width, height) || 1)).toFixed(0)} : ${(height / (gcd(width, height) || 1)).toFixed(0)}`;
    displayAspect.textContent = simpleAspect.length < 8 ? simpleAspect : `${(width/height).toFixed(2)} : 1`;

    // 2. Base Rates (Checking Overrides - Admin Only)
    const isAdmin = isAdminLoggedIn();
    const printRate = (isAdmin && overridePrinting.value !== '') ? (parseFloat(overridePrinting.value) || 0) : (item.printing || 0);
    const laminationRate = (isAdmin && overrideLamination.value !== '') ? (parseFloat(overrideLamination.value) || 0) : (item.lamination || 0);
    const materialRate = (isAdmin && overrideMaterial.value !== '') ? (parseFloat(overrideMaterial.value) || 0) : (item.materialPrice || 0);
    const varnishRate = (isAdmin && overrideVarnish.value !== '') ? (parseFloat(overrideVarnish.value) || 0) : (item.varnish || 0);

    const baseRatePerSqFt = printRate + laminationRate + materialRate + varnishRate;
    const areaCost = sqFt * baseRatePerSqFt;

    // 3. Extra Charges
    let holesCost = 0;
    let holesCount = 0;
    let holesRate = 0;
    const defaultHoleRate = (item.defaultHoleRate && item.defaultHoleRate > 0) ? item.defaultHoleRate : 100;
    if (holesToggle.checked) {
      holesCount = Math.max(0, parseInt(holesCountInput.value, 10) || 0);
      holesRate = isAdmin ? (Math.max(0, parseFloat(holesRateInput.value)) || defaultHoleRate) : defaultHoleRate;
      holesRateInput.value = holesRate;
      holesCost = holesCount * holesRate;
    }

    let frameCost = 0;
    let frameRate = 0;
    let frameWastage = 0;
    let totalFrameInches = 0;
    const defaultFrameRate = (item.framePerInch && item.framePerInch > 0) ? item.framePerInch : 5;
    const isCustomFrameAllowed = !!((frameCustomRateCheck && frameCustomRateCheck.checked) || isAdmin);

    if (frameToggle.checked) {
      if (isCustomFrameAllowed) {
        const parsedFrameRate = parseFloat(frameRateInput.value);
        frameRate = (!isNaN(parsedFrameRate) && parsedFrameRate >= 0) ? parsedFrameRate : defaultFrameRate;
      } else {
        frameRate = defaultFrameRate;
        frameRateInput.value = defaultFrameRate;
      }
      frameWastage = Math.max(0, parseFloat(frameWastageInput.value) || 0);
      totalFrameInches = perimeterInches + frameWastage;
      frameCost = totalFrameInches * frameRate;
      frameTotalPreview.textContent = `₹${frameCost.toFixed(2)}`;
    } else {
      frameTotalPreview.textContent = `₹0.00`;
    }

    let stretchingCost = 0;
    let stretchingRate = 0;
    const defaultStretchingRate = (item.defaultStretchingRate && item.defaultStretchingRate > 0) ? item.defaultStretchingRate : 220;
    const parsedStretchingRate = parseFloat(stretchingRateInput.value);
    stretchingRate = isAdmin ? ((!isNaN(parsedStretchingRate) && parsedStretchingRate >= 0) ? parsedStretchingRate : defaultStretchingRate) : defaultStretchingRate;
    stretchingRateInput.value = stretchingRate;
    const calculatedStretchingTotal = sqFt * stretchingRate;

    if (stretchingToggle.checked) {
      // Stretching total = total square feet * stretching price
      stretchingCost = calculatedStretchingTotal;

      if (stretchingTotalPreview) {
        stretchingTotalPreview.textContent = `₹${stretchingCost.toFixed(2)}`;
      }
      if (stretchingCalcSqFt) stretchingCalcSqFt.textContent = sqFt.toFixed(2);
      if (stretchingCalcRate) stretchingCalcRate.textContent = stretchingRate.toString();
      if (stretchingCalcTotal) stretchingCalcTotal.textContent = stretchingCost.toFixed(2);
      if (stretchingFormulaNote) {
        stretchingFormulaNote.innerHTML = `
          <div style="display: flex; flex-direction: column; gap: 3px;">
            <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px;">
              <span><i class="fa-solid fa-circle-check" style="color: var(--accent-emerald);"></i> <strong>${sqFt.toFixed(2)}</strong> Sq.Ft &times; <strong>₹${stretchingRate}</strong> = <strong style="color: var(--accent-emerald); font-size: 0.85rem;">₹${stretchingCost.toFixed(2)}</strong></span>
              <span style="font-size: 0.68rem; color: var(--accent-emerald); font-weight: 700; background: rgba(16, 185, 129, 0.15); padding: 2px 6px; border-radius: 4px; white-space: nowrap;">Added in Final Bill</span>
            </div>
            ${stretchingMargin > 0 ? `
            <div style="font-size: 0.68rem; color: var(--text-muted); display: flex; justify-content: space-between; align-items: center;">
              <span>Artwork: ${widthInches.toFixed(1)}&times;${heightInches.toFixed(1)}″ (+${stretchingMargin}″ all 4 sides) &rarr; <strong>${grossWidthInches.toFixed(1)}&times;${grossHeightInches.toFixed(1)}″</strong></span>
              <span style="color: var(--accent-emerald); font-weight: 600;">+${(2*stretchingMargin).toFixed(1)}″ W & H</span>
            </div>` : ''}
          </div>
        `;
      }
    } else {
      if (stretchingTotalPreview) {
        stretchingTotalPreview.textContent = `₹0.00`;
      }
      if (stretchingCalcSqFt) stretchingCalcSqFt.textContent = sqFt.toFixed(2);
      if (stretchingCalcRate) stretchingCalcRate.textContent = stretchingRate.toString();
      if (stretchingCalcTotal) stretchingCalcTotal.textContent = `0.00`;
      if (stretchingFormulaNote) {
        stretchingFormulaNote.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px; color: var(--text-muted);">
            <span>${sqFt.toFixed(2)} Sq.Ft &times; ₹${stretchingRate} = ₹${calculatedStretchingTotal.toFixed(2)}</span>
            <span style="font-size: 0.68rem; color: var(--text-dim); background: rgba(255, 255, 255, 0.05); padding: 2px 6px; border-radius: 4px; white-space: nowrap;">Switch ON to add</span>
          </div>
        `;
      }
    }

    // 4. Totals (Final Bill = Base Area Cost + Holes Cost + Frame Cost + Stretching Cost)
    const unitTotal = areaCost + holesCost + frameCost + stretchingCost;
    const grandTotal = unitTotal;

    // Cache current calculation state
    currentCalculation = {
      materialId: item.id,
      category: item.category,
      thickness: item.thickness,
      unit: currentUnit,
      width,
      height,
      widthInches,
      heightInches,
      grossWidthInches,
      grossHeightInches,
      actualSqFt,
      billableSqFt,
      sqFt: billableSqFt,
      perimeterInches,
      printRate,
      laminationRate,
      materialRate,
      varnishRate,
      baseRatePerSqFt,
      areaCost,
      holesEnabled: holesToggle.checked,
      holesCount,
      holesRate,
      holesCost,
      frameEnabled: frameToggle.checked,
      frameRate,
      frameCustomRate: isCustomFrameAllowed && frameRate !== defaultFrameRate,
      frameWastage,
      totalFrameInches,
      frameCost,
      stretchingEnabled: stretchingToggle.checked,
      stretchingMargin,
      stretchingRate,
      stretchingCost,
      unitTotal,
      grandTotal
    };

    // 5. Update UI Breakdown (Right Column)
    heroTotalPrice.textContent = `₹${Math.round(grandTotal).toLocaleString('en-IN')}`;
    if (stretchingToggle.checked && stretchingCost > 0) {
      heroRateDetail.textContent = `@ ₹${baseRatePerSqFt.toFixed(2)} / Sq.Ft base + ₹${Math.round(stretchingCost)} stretching`;
    } else {
      heroRateDetail.textContent = `@ ₹${baseRatePerSqFt.toFixed(2)} / Sq.Ft base`;
    }

    if (stretchingToggle.checked && stretchingMargin > 0) {
      breakdownAreaText.textContent = `${billableSqFt.toFixed(2)} Sq. Ft (Artwork: ${widthInches.toFixed(1)}×${heightInches.toFixed(1)}″ + ${stretchingMargin}″ all 4 sides = ${grossWidthInches.toFixed(1)}×${grossHeightInches.toFixed(1)}″ • Act: ${actualSqFt.toFixed(2)})`;
    } else if (Math.abs(billableSqFt - actualSqFt) > 0.001) {
      breakdownAreaText.textContent = `${billableSqFt.toFixed(2)} Sq. Ft (Actual: ${actualSqFt.toFixed(2)} • ${width} × ${height} ${currentUnit})`;
    } else {
      breakdownAreaText.textContent = `${billableSqFt.toFixed(2)} Sq. Ft (${width} × ${height} ${currentUnit})`;
    }
    breakdownBaseRate.textContent = `₹${baseRatePerSqFt.toFixed(2)}`;
    breakdownAreaCost.textContent = `₹${areaCost.toFixed(2)}`;

    // Holes row
    if (holesToggle.checked && holesCount > 0) {
      breakdownHolesRow.style.display = 'table-row';
      breakdownHolesDetail.textContent = `${holesCount} × ₹${holesRate}`;
      breakdownHolesCost.textContent = `₹${holesCost.toFixed(2)}`;
    } else {
      breakdownHolesRow.style.display = 'none';
    }

    // Frame row
    if (frameToggle.checked && frameCost > 0) {
      breakdownFrameRow.style.display = 'table-row';
      const frameRateLabel = (isCustomFrameAllowed && frameRate !== defaultFrameRate) ? `₹${frameRate} (Custom)` : `₹${frameRate}`;
      if (frameWastage > 0) {
        breakdownFrameDetail.textContent = `${perimeterInches.toFixed(1)} in + ${frameWastage} in waste (${totalFrameInches.toFixed(1)} in) × ${frameRateLabel}`;
      } else {
        breakdownFrameDetail.textContent = `${perimeterInches.toFixed(1)} in × ${frameRateLabel}`;
      }
      breakdownFrameCost.textContent = `₹${frameCost.toFixed(2)}`;
    } else {
      breakdownFrameRow.style.display = 'none';
    }

    // Stretching row
    if (stretchingToggle.checked && stretchingCost > 0) {
      breakdownStretchingRow.style.display = 'table-row';
      if (breakdownStretchingDetail) {
        if (stretchingMargin > 0) {
          breakdownStretchingDetail.textContent = `${sqFt.toFixed(2)} Sq.Ft (incl. +${stretchingMargin}″ all 4 sides) × ₹${stretchingRate}`;
        } else {
          breakdownStretchingDetail.textContent = `${sqFt.toFixed(2)} Sq.Ft × ₹${stretchingRate}`;
        }
      }
      breakdownStretchingCost.textContent = `₹${stretchingCost.toFixed(2)}`;
    } else {
      breakdownStretchingRow.style.display = 'none';
    }

    breakdownUnitTotal.textContent = `₹${unitTotal.toFixed(2)}`;
  }

  // =========================================================================
  // BASKET & MULTI-ITEM QUOTATION
  // =========================================================================
  function addToBasket() {
    if (!currentCalculation || !currentCalculation.unitTotal) return;

    // Create deep copy
    const item = {
      id: 'item_' + Date.now(),
      ...currentCalculation
    };

    quotationBasket.push(item);
    renderBasket();
    showToast(`Added "${item.category} (${item.thickness})" to quotation basket`, 'success');
  }

  function removeFromBasket(itemId) {
    quotationBasket = quotationBasket.filter(i => i.id !== itemId);
    renderBasket();
  }

  function clearBasket() {
    if (quotationBasket.length === 0) return;
    quotationBasket = [];
    renderBasket();
    showToast('Quotation basket cleared', 'info');
  }

  function renderBasket() {
    basketCountBadge.textContent = quotationBasket.length;

    if (quotationBasket.length === 0) {
      basketItemsList.innerHTML = `
        <div style="text-align: center; color: var(--text-dim); padding: 2rem 0; font-size: 0.85rem;">
          <i class="fa-solid fa-basket-shopping" style="font-size: 1.75rem; margin-bottom: 0.5rem; opacity: 0.4;"></i>
          <p>Your basket is currently empty.</p>
          <p style="font-size: 0.75rem;">Configure an item and click "Add Item to Quotation Basket".</p>
        </div>
      `;
      basketSummaryBox.style.display = 'none';
      return;
    }

    basketItemsList.innerHTML = '';
    let grandTotal = 0;

    quotationBasket.forEach((item, index) => {
      grandTotal += item.grandTotal;

      const extrasDesc = [];
      if (item.holesEnabled && item.holesCost > 0) extrasDesc.push(`${item.holesCount} Holes (₹${item.holesCost})`);
      if (item.frameEnabled && item.frameCost > 0) {
        const wasteTxt = item.frameWastage > 0 ? ` + ${item.frameWastage}in waste` : '';
        extrasDesc.push(`Frame (${(item.totalFrameInches || item.perimeterInches).toFixed(1)}in${wasteTxt} @ ₹${item.frameRate} = ₹${item.frameCost.toFixed(0)})`);
      }
      if (item.stretchingEnabled && item.stretchingCost > 0) {
        extrasDesc.push(`Stretching (${item.sqFt.toFixed(2)} Sq.Ft @ ₹${item.stretchingRate || 220} = ₹${item.stretchingCost.toFixed(0)})`);
      }

      const extrasText = extrasDesc.length > 0 ? ` + ${extrasDesc.join(', ')}` : '';

      const itemEl = document.createElement('div');
      itemEl.className = 'basket-item';
      itemEl.innerHTML = `
        <div class="basket-item-info">
          <h4>
            <span class="category-tag">${item.category}</span>
            ${item.thickness}
          </h4>
          <p>
            ${item.width} &times; ${item.height} ${item.unit} (${item.sqFt.toFixed(2)} Sq.Ft)
            ${extrasText}
          </p>
        </div>
        <div class="basket-item-pricing">
          <span class="basket-price">₹${Math.round(item.grandTotal).toLocaleString('en-IN')}</span>
          <button type="button" class="btn btn-danger btn-sm" title="Remove item" data-id="${item.id}" style="padding: 0.3rem 0.6rem;">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      `;

      itemEl.querySelector('button').addEventListener('click', () => {
        removeFromBasket(item.id);
      });

      basketItemsList.appendChild(itemEl);
    });

    basketSummaryBox.style.display = 'block';
    basketGrandTotal.textContent = `₹${grandTotal.toFixed(2)}`;
  }

  // =========================================================================
  // PRINTABLE QUOTATION GENERATOR & MODAL
  // =========================================================================
  function openQuotationModal() {
    // If basket is empty, offer to add current calculation as a single item
    let itemsToPrint = [...quotationBasket];
    if (itemsToPrint.length === 0) {
      if (currentCalculation && currentCalculation.unitTotal > 0) {
        itemsToPrint = [{
          id: 'temp_single',
          ...currentCalculation
        }];
      } else {
        showToast('Please add items to quotation basket first.', 'warning');
        return;
      }
    }

    // Populate sheet
    const customer = customerNameInput.value.trim() || "Walk-in Customer";
    const phone = customerPhoneInput.value.trim() || "N/A";
    const quoteNum = "EST-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000);
    const dateFormatted = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

    sheetCustomerName.textContent = customer;
    sheetCustomerPhone.textContent = phone;
    sheetQuoteNum.textContent = quoteNum;
    sheetDate.textContent = dateFormatted;

    sheetTableBody.innerHTML = '';
    let subtotal = 0;

    itemsToPrint.forEach((item, i) => {
      subtotal += item.grandTotal;

      const extrasDesc = [];
      if (item.holesEnabled && item.holesCost > 0) extrasDesc.push(`${item.holesCount} Holes (₹${item.holesCost})`);
      if (item.frameEnabled && item.frameCost > 0) {
        const wasteTxt = item.frameWastage > 0 ? ` + ${item.frameWastage}in waste` : '';
        extrasDesc.push(`Frame: ${item.perimeterInches.toFixed(1)}in${wasteTxt} (${(item.totalFrameInches || item.perimeterInches).toFixed(1)}in @ ₹${item.frameRate} = ₹${item.frameCost.toFixed(0)})`);
      }
      if (item.stretchingEnabled && item.stretchingCost > 0) {
        extrasDesc.push(`Stretching: ${item.sqFt.toFixed(2)} Sq.Ft @ ₹${item.stretchingRate || 220} = ₹${item.stretchingCost.toFixed(0)}`);
      }

      const extrasStr = extrasDesc.length > 0 ? extrasDesc.join('<br>') : 'None';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${i + 1}</td>
        <td>
          <strong>${item.category}</strong><br>
          <span style="font-size: 0.78rem; color: #64748b;">${item.thickness}</span>
        </td>
        <td>${item.width} &times; ${item.height} ${item.unit}</td>
        <td>${item.sqFt.toFixed(2)}</td>
        <td>₹${item.baseRatePerSqFt.toFixed(2)}</td>
        <td style="font-size: 0.78rem;">${extrasStr}</td>
        <td style="text-align: right; font-weight: 600;">₹${item.grandTotal.toFixed(2)}</td>
      `;
      sheetTableBody.appendChild(tr);
    });

    sheetSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
    sheetGrandTotal.textContent = `₹${subtotal.toFixed(2)}`;

    quotationModal.classList.add('open');
  }

  function closeQuotationModal() {
    quotationModal.classList.remove('open');
  }

  // =========================================================================
  // SAVE ESTIMATES TO HISTORY
  // =========================================================================
  function saveCurrentEstimate() {
    let itemsToSave = [...quotationBasket];
    if (itemsToSave.length === 0) {
      if (currentCalculation && currentCalculation.unitTotal > 0) {
        itemsToSave = [{ ...currentCalculation }];
      } else {
        showToast('No items to save.', 'warning');
        return;
      }
    }

    const customer = customerNameInput.value.trim() || "Walk-in Customer";
    const phone = customerPhoneInput.value.trim() || "-";
    const totalAmount = itemsToSave.reduce((acc, curr) => acc + curr.grandTotal, 0);

    const quoteRecord = {
      id: 'quote_' + Date.now(),
      quoteNumber: "EST-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      timestamp: Date.now(),
      customer,
      phone,
      items: itemsToSave,
      totalAmount
    };

    window.materialDataManager.saveQuote(quoteRecord);
    updateBadges();
    renderSavedQuotes();
    showToast(`Quotation #${quoteRecord.quoteNumber} saved successfully!`, 'success');
  }

  function renderSavedQuotes() {
    const quotes = window.materialDataManager.getSavedQuotes();
    savedQuoteCountBadge.textContent = quotes.length;

    if (quotes.length === 0) {
      savedQuotesContainer.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; color: var(--text-dim);">
          <i class="fa-solid fa-clock-rotate-left" style="font-size: 2.5rem; margin-bottom: 0.75rem; opacity: 0.3;"></i>
          <p>No saved quotations found.</p>
          <p style="font-size: 0.8rem; margin-top: 4px;">Click "Save Quote" on any quotation to store it here for future reference.</p>
        </div>
      `;
      return;
    }

    savedQuotesContainer.innerHTML = '';
    quotes.forEach(quote => {
      const card = document.createElement('div');
      card.className = 'quote-card';
      card.innerHTML = `
        <div class="quote-card-header">
          <div>
            <span class="quote-number">${quote.quoteNumber}</span>
            <div class="quote-client">${quote.customer}</div>
          </div>
          <span class="quote-date">${quote.date}</span>
        </div>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.5rem;">
          ${quote.items.length} item(s) &bull; Ref: ${quote.phone || 'N/A'}
        </p>
        <div class="quote-total-price">₹${Math.round(quote.totalAmount).toLocaleString('en-IN')}</div>
        <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
          <button type="button" class="btn btn-primary btn-sm view-quote-btn" style="flex: 2;">
            <i class="fa-solid fa-print"></i> View / Print
          </button>
          <button type="button" class="btn btn-danger btn-sm del-quote-btn" style="flex: 1;" title="Delete quote">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      `;

      card.querySelector('.view-quote-btn').addEventListener('click', () => {
        // Load into modal
        customerNameInput.value = quote.customer;
        customerPhoneInput.value = quote.phone;
        quotationBasket = [...quote.items];
        renderBasket();
        openQuotationModal();
      });

      card.querySelector('.del-quote-btn').addEventListener('click', () => {
        window.materialDataManager.deleteQuote(quote.id);
        renderSavedQuotes();
        updateBadges();
        showToast('Quote deleted', 'info');
      });

      savedQuotesContainer.appendChild(card);
    });
  }

  // =========================================================================
  // TAB 2: RATE CARD MASTER / SPREADSHEET EDITOR
  // =========================================================================
  function populateCategoryFilterInMaster() {
    const categories = window.materialDataManager.getCategories();
    rateCategoryFilter.innerHTML = '<option value="ALL">All Categories</option>';
    categories.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat;
      rateCategoryFilter.appendChild(opt);
    });
  }

  function renderMasterRateTable() {
    const materials = window.materialDataManager.materials;
    const filterCat = rateCategoryFilter.value;
    const searchTerm = (rateSearchInput.value || '').toLowerCase().trim();
    const isAdmin = isAdminLoggedIn();
    const readonlyAttr = isAdmin ? '' : 'readonly tabindex="-1"';

    masterRateTableBody.innerHTML = '';

    materials.forEach(item => {
      if (filterCat !== 'ALL' && item.category !== filterCat) return;

      const combinedText = `${item.category} ${item.thickness} ${item.notes}`.toLowerCase();
      if (searchTerm && !combinedText.includes(searchTerm)) return;

      const baseTotal = (item.printing || 0) + (item.lamination || 0) + (item.materialPrice || 0) + (item.varnish || 0);

      const tr = document.createElement('tr');
      tr.setAttribute('data-id', item.id);
      tr.innerHTML = `
        <td><span class="category-tag">${item.category}</span></td>
        <td style="font-weight: 500;">${item.thickness}</td>
        <td><input type="number" class="table-input col-printing" value="${item.printing || 0}" min="0" ${readonlyAttr}></td>
        <td><input type="number" class="table-input col-lamination" value="${item.lamination || 0}" min="0" ${readonlyAttr}></td>
        <td><input type="number" class="table-input col-material" value="${item.materialPrice || 0}" min="0" ${readonlyAttr}></td>
        <td><input type="number" class="table-input col-varnish" value="${item.varnish || 0}" min="0" ${readonlyAttr}></td>
        <td><strong class="row-base-total" style="font-family: var(--font-mono); color: var(--accent-emerald);">₹${baseTotal}</strong></td>
        <td><input type="number" class="table-input col-frame" value="${item.framePerInch || 0}" min="0" style="width: 75px;" ${readonlyAttr}></td>
        <td><input type="number" class="table-input col-stretching" value="${item.defaultStretchingRate || 0}" min="0" style="width: 75px;" ${readonlyAttr}></td>
        <td>
          <input type="text" class="table-input col-notes" value="${item.notes || ''}" style="width: 150px; text-align: left;" placeholder="Notes/Extras" ${readonlyAttr}>
        </td>
        <td style="text-align: center; white-space: nowrap;">
          ${isAdmin ? `
            <div class="table-action-group">
              <button type="button" class="btn-table-action btn-table-edit" data-id="${item.id}" title="Edit Full Material Specs">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button type="button" class="btn-table-action btn-table-delete" data-id="${item.id}" title="Delete Material">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          ` : `
            <span style="font-size: 0.76rem; color: var(--text-muted); display: inline-flex; align-items: center; gap: 4px;" title="Administrator login required to edit or delete">
              <i class="fa-solid fa-lock" style="font-size: 0.72rem;"></i> Locked
            </span>
          `}
        </td>
      `;

      if (isAdmin) {
        // Live update row total on input
        const inputs = tr.querySelectorAll('.col-printing, .col-lamination, .col-material, .col-varnish');
        inputs.forEach(inp => {
          inp.addEventListener('input', () => {
            const p = parseFloat(tr.querySelector('.col-printing').value) || 0;
            const l = parseFloat(tr.querySelector('.col-lamination').value) || 0;
            const m = parseFloat(tr.querySelector('.col-material').value) || 0;
            const v = parseFloat(tr.querySelector('.col-varnish').value) || 0;
            tr.querySelector('.row-base-total').textContent = `₹${p + l + m + v}`;
          });
        });

        // Action buttons
        const editBtn = tr.querySelector('.btn-table-edit');
        const deleteBtn = tr.querySelector('.btn-table-delete');

        if (editBtn) {
          editBtn.addEventListener('click', () => openMaterialModal('edit', item.id));
        }
        if (deleteBtn) {
          deleteBtn.addEventListener('click', () => handleDeleteMaterial(item.id));
        }
      }

      masterRateTableBody.appendChild(tr);
    });

    rateCardCountBadge.textContent = materials.length;
  }

  // =========================================================================
  // ADD / EDIT / DELETE MATERIAL ACTIONS
  // =========================================================================
  function openMaterialModal(mode = 'add', itemId = null) {
    if (!isAdminLoggedIn()) {
      openAdminLoginModal();
      showToast('Administrator login required to add or edit materials', 'warning');
      return;
    }

    // Populate categories datalist
    const categories = window.materialDataManager.getCategories();
    materialCategoryDatalist.innerHTML = '';
    categories.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      materialCategoryDatalist.appendChild(opt);
    });

    if (mode === 'edit' && itemId) {
      const item = window.materialDataManager.getItemById(itemId);
      if (!item) return;

      materialModalId.value = item.id;
      materialModalHeadingText.textContent = `Edit Material: ${item.category} - ${item.thickness}`;
      materialModalSubmitText.textContent = 'Update Material';

      materialModalCategory.value = item.category || '';
      materialModalThickness.value = item.thickness || '';
      materialModalPrinting.value = item.printing ?? 0;
      materialModalLamination.value = item.lamination ?? 0;
      materialModalMaterialPrice.value = item.materialPrice ?? 0;
      materialModalVarnish.value = item.varnish ?? 0;
      materialModalFrame.value = item.framePerInch ?? 0;
      materialModalHoleRate.value = item.defaultHoleRate ?? 0;
      materialModalStretchingRate.value = item.defaultStretchingRate ?? 0;
      materialModalNotes.value = item.notes || '';
    } else {
      materialModalId.value = '';
      materialModalHeadingText.textContent = 'Add New Material';
      materialModalSubmitText.textContent = 'Save Material';

      const filterCat = rateCategoryFilter.value;
      materialModalCategory.value = (filterCat && filterCat !== 'ALL') ? filterCat : '';
      materialModalThickness.value = '';
      materialModalPrinting.value = '0';
      materialModalLamination.value = '0';
      materialModalMaterialPrice.value = '0';
      materialModalVarnish.value = '0';
      materialModalFrame.value = '0';
      materialModalHoleRate.value = '0';
      materialModalStretchingRate.value = '0';
      materialModalNotes.value = '';
    }

    updateModalBaseTotalPreview();
    materialModal.classList.add('open');
    setTimeout(() => {
      if (!materialModalCategory.value) {
        materialModalCategory.focus();
      } else {
        materialModalThickness.focus();
      }
    }, 100);
  }

  function closeMaterialModal() {
    materialModal.classList.remove('open');
    materialForm.reset();
  }

  function updateModalBaseTotalPreview() {
    const p = parseFloat(materialModalPrinting.value) || 0;
    const l = parseFloat(materialModalLamination.value) || 0;
    const m = parseFloat(materialModalMaterialPrice.value) || 0;
    const v = parseFloat(materialModalVarnish.value) || 0;
    const total = p + l + m + v;
    materialModalBaseTotalPreview.textContent = `₹${total.toFixed(2)} / sq.ft`;
  }

  function handleMaterialFormSubmit(e) {
    e.preventDefault();

    if (!isAdminLoggedIn()) {
      openAdminLoginModal();
      showToast('Administrator login required to perform this action', 'warning');
      return;
    }

    const id = materialModalId.value.trim();
    const category = materialModalCategory.value.trim();
    const thickness = materialModalThickness.value.trim();

    if (!category || !thickness) {
      showToast('Please enter both Category and Thickness / Variant', 'warning');
      return;
    }

    const printing = parseFloat(materialModalPrinting.value) || 0;
    const lamination = parseFloat(materialModalLamination.value) || 0;
    const materialPrice = parseFloat(materialModalMaterialPrice.value) || 0;
    const varnish = parseFloat(materialModalVarnish.value) || 0;
    const framePerInch = parseFloat(materialModalFrame.value) || 0;
    const defaultHoleRate = parseFloat(materialModalHoleRate.value) || 0;
    const defaultStretchingRate = parseFloat(materialModalStretchingRate.value) || 0;
    const notes = materialModalNotes.value.trim();

    if (id) {
      // Update existing item
      const updated = window.materialDataManager.updateItem({
        id,
        category,
        thickness,
        printing,
        lamination,
        materialPrice,
        varnish,
        framePerInch,
        defaultHoleRate,
        defaultStretchingRate,
        notes
      });

      if (updated) {
        closeMaterialModal();
        syncAppAfterMaterialChange(id, category);
        showToast(`Material "${category} - ${thickness}" updated successfully!`, 'success');
      } else {
        showToast('Failed to update material', 'warning');
      }
    } else {
      // Add new item
      const existing = window.materialDataManager.materials.find(
        m => m.category.toLowerCase() === category.toLowerCase() && m.thickness.toLowerCase() === thickness.toLowerCase()
      );
      if (existing) {
        showToast(`A material with "${category} - ${thickness}" already exists!`, 'warning');
        return;
      }

      const newItem = window.materialDataManager.addItem({
        category,
        thickness,
        printing,
        lamination,
        materialPrice,
        varnish,
        framePerInch,
        defaultHoleRate,
        defaultStretchingRate,
        notes
      });

      closeMaterialModal();
      syncAppAfterMaterialChange(newItem.id, category);
      showToast(`New material "${category} - ${thickness}" added successfully!`, 'success');
    }
  }

  function handleDeleteMaterial(id) {
    if (!isAdminLoggedIn()) {
      openAdminLoginModal();
      showToast('Administrator login required to delete materials', 'warning');
      return;
    }

    const item = window.materialDataManager.getItemById(id);
    if (!item) return;

    if (confirm(`Are you sure you want to delete "${item.category} - ${item.thickness}" from the rate card?`)) {
      window.materialDataManager.deleteItem(id);
      syncAppAfterMaterialChange();
      showToast(`Material "${item.category} - ${item.thickness}" deleted successfully!`, 'info');
    }
  }

  function syncAppAfterMaterialChange(targetHighlightId = null, targetCategory = null) {
    const prevSelectedCategory = materialCategorySelect.value;
    const prevSelectedVariantId = thicknessSelect.value;

    populateCategoryDropdown();

    // Preserve or intelligently update category selection
    const availableCategories = window.materialDataManager.getCategories();
    if (targetCategory && availableCategories.includes(targetCategory)) {
      materialCategorySelect.value = targetCategory;
    } else if (availableCategories.includes(prevSelectedCategory)) {
      materialCategorySelect.value = prevSelectedCategory;
    } else if (materialCategorySelect.options.length > 0) {
      materialCategorySelect.selectedIndex = 0;
    }

    handleCategoryChange();

    // Preserve or intelligently update variant selection
    if (targetHighlightId && [...thicknessSelect.options].some(o => o.value === targetHighlightId)) {
      thicknessSelect.value = targetHighlightId;
      handleVariantChange();
    } else if (prevSelectedVariantId && [...thicknessSelect.options].some(o => o.value === prevSelectedVariantId)) {
      thicknessSelect.value = prevSelectedVariantId;
      handleVariantChange();
    }

    populateCategoryFilterInMaster();

    // If a target category was modified or added and currently filtered, keep filter aligned
    if (targetCategory && rateCategoryFilter.value !== 'ALL') {
      rateCategoryFilter.value = targetCategory;
    }

    renderMasterRateTable();
    updateBadges();

    // Highlight modified/added row with animation
    if (targetHighlightId) {
      setTimeout(() => {
        const tr = masterRateTableBody.querySelector(`tr[data-id="${targetHighlightId}"]`);
        if (tr) {
          tr.classList.add('row-highlight-pulse');
          tr.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 60);
    }
  }

  function saveMasterRates() {
    if (!isAdminLoggedIn()) {
      openAdminLoginModal();
      showToast('Administrator login required to save rate changes', 'warning');
      return;
    }

    const rows = masterRateTableBody.querySelectorAll('tr');
    let updatedMaterials = [...window.materialDataManager.materials];

    rows.forEach(tr => {
      const id = tr.getAttribute('data-id');
      const item = updatedMaterials.find(m => m.id === id);
      if (item) {
        item.printing = parseFloat(tr.querySelector('.col-printing').value) || 0;
        item.lamination = parseFloat(tr.querySelector('.col-lamination').value) || 0;
        item.materialPrice = parseFloat(tr.querySelector('.col-material').value) || 0;
        item.varnish = parseFloat(tr.querySelector('.col-varnish').value) || 0;
        item.framePerInch = parseFloat(tr.querySelector('.col-frame').value) || 0;
        const stretchInp = tr.querySelector('.col-stretching');
        if (stretchInp) {
          item.defaultStretchingRate = parseFloat(stretchInp.value) || 0;
        }
        item.notes = tr.querySelector('.col-notes').value.trim();
      }
    });

    window.materialDataManager.saveMaterials(updatedMaterials);
    handleVariantChange();
    showToast('All rate card changes saved successfully!', 'success');
  }

  function resetMasterRatesToDefault() {
    if (!isAdminLoggedIn()) {
      openAdminLoginModal();
      showToast('Administrator login required to restore defaults', 'warning');
      return;
    }

    if (confirm('Are you sure you want to restore original spreadsheet rates? Any custom edits will be reset.')) {
      window.materialDataManager.resetToDefaults();
      populateCategoryDropdown();
      populateCategoryFilterInMaster();
      renderMasterRateTable();
      handleCategoryChange();
      showToast('Master rates restored to original spreadsheet values!', 'info');
    }
  }

  function exportRatesJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(window.materialDataManager.materials, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `material_rates_backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Rates exported to JSON backup file', 'success');
  }

  function importRatesJSON(e) {
    if (!isAdminLoggedIn()) {
      openAdminLoginModal();
      showToast('Administrator login required to import rate files', 'warning');
      return;
    }

    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].id) {
          window.materialDataManager.saveMaterials(parsed);
          populateCategoryDropdown();
          populateCategoryFilterInMaster();
          renderMasterRateTable();
          handleCategoryChange();
          showToast(`Successfully imported ${parsed.length} material rates!`, 'success');
        } else {
          showToast('Invalid JSON file format', 'warning');
        }
      } catch (err) {
        console.error(err);
        showToast('Error reading JSON file', 'warning');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  function updateBadges() {
    rateCardCountBadge.textContent = window.materialDataManager.materials.length;
    savedQuoteCountBadge.textContent = window.materialDataManager.getSavedQuotes().length;
  }

  // =========================================================================
  // TAB 4: THEME & COLOR CUSTOMIZER STUDIO
  // =========================================================================
  const themePresetsContainer = document.getElementById('themePresetsContainer');
  const customColorPickersContainer = document.getElementById('customColorPickersContainer');
  const saveThemeBtn = document.getElementById('saveThemeBtn');
  const resetThemeBtn = document.getElementById('resetThemeBtn');
  const copyCssBtn = document.getElementById('copyCssBtn');

  const COLOR_DEFINITIONS = [
    { key: "--primary", label: "Primary Accent (Buttons & Glow)", default: "#E94F37" },
    { key: "--secondary", label: "Secondary Accent (Highlights & Numbers)", default: "#F6F7EB" },
    { key: "--bg-dark", label: "Main Page Background", default: "#25282a" },
    { key: "--bg-card", label: "Cards & Panels Surface", default: "#393E41" },
    { key: "--bg-elevated", label: "Elevated Boxes & Containers", default: "#2d3134" },
    { key: "--bg-input", label: "Input Fields Background", default: "#202325" },
    { key: "--text-main", label: "Main Text & Heading Color", default: "#F6F7EB" },
    { key: "--text-muted", label: "Muted Text & Labels", default: "#b8bcbe" }
  ];

  function renderThemeStudio() {
    if (!themePresetsContainer || !customColorPickersContainer) return;

    // 1. Render Preset Palettes
    themePresetsContainer.innerHTML = '';
    const presets = window.THEME_PRESETS || [];
    presets.forEach(preset => {
      const card = document.createElement('div');
      card.className = 'palette-card';
      
      const currentPrimary = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
      if (currentPrimary.toLowerCase() === preset.colors['--primary'].toLowerCase()) {
        card.classList.add('active-palette');
      }

      const swatchesHtml = preset.swatches.map(color => 
        `<div class="palette-swatch" style="background-color: ${color};" title="${color}"></div>`
      ).join('');

      card.innerHTML = `
        <div>
          <div class="palette-title">${preset.name}</div>
          <div class="palette-desc">${preset.description}</div>
        </div>
        <div>
          <div class="palette-swatches">${swatchesHtml}</div>
          <button type="button" class="btn btn-secondary btn-sm" style="width: 100%;">
            <i class="fa-solid fa-wand-magic-sparkles"></i> Apply Palette
          </button>
        </div>
      `;

      card.addEventListener('click', () => {
        window.themeManager.applyTheme(preset.colors, true);
        renderThemeStudio();
        showToast(`Theme changed to "${preset.name}"`, 'success');
      });

      themePresetsContainer.appendChild(card);
    });

    // 2. Render Individual Color Pickers
    customColorPickersContainer.innerHTML = '';
    const rootStyle = getComputedStyle(document.documentElement);

    COLOR_DEFINITIONS.forEach(def => {
      let currentVal = rootStyle.getPropertyValue(def.key).trim();
      let hexVal = currentVal;
      if (!hexVal.startsWith('#')) {
        hexVal = def.default;
      }

      const pickerCard = document.createElement('div');
      pickerCard.className = 'color-picker-card';
      pickerCard.innerHTML = `
        <div class="color-input-wrapper" style="background-color: ${hexVal};">
          <input type="color" id="picker_${def.key.replace('--', '')}" value="${hexVal}">
        </div>
        <div class="color-info">
          <label for="hex_${def.key.replace('--', '')}">${def.label}</label>
          <input type="text" class="color-hex-input" id="hex_${def.key.replace('--', '')}" value="${hexVal}" maxlength="7" placeholder="#HEX">
        </div>
      `;

      const colorInput = pickerCard.querySelector('input[type="color"]');
      const hexInput = pickerCard.querySelector('.color-hex-input');
      const wrapper = pickerCard.querySelector('.color-input-wrapper');

      // Sync color input -> hex input & CSS variable
      colorInput.addEventListener('input', (e) => {
        const val = e.target.value.toUpperCase();
        hexInput.value = val;
        wrapper.style.backgroundColor = val;
        applySingleColorChange(def.key, val);
      });

      // Sync hex text input -> color input & CSS variable
      hexInput.addEventListener('input', (e) => {
        let val = e.target.value.trim();
        if (!val.startsWith('#') && val.length > 0) val = '#' + val;
        if (/^#[0-9A-F]{6}$/i.test(val)) {
          colorInput.value = val;
          wrapper.style.backgroundColor = val;
          applySingleColorChange(def.key, val);
        }
      });

      customColorPickersContainer.appendChild(pickerCard);
    });
  }

  function applySingleColorChange(cssVar, colorVal) {
    document.documentElement.style.setProperty(cssVar, colorVal);
    
    if (cssVar === '--primary') {
      const glow = window.themeManager.hexToRgba(colorVal, 0.4);
      document.documentElement.style.setProperty('--primary-glow', glow);
      document.documentElement.style.setProperty('--border-active', glow);
    } else if (cssVar === '--secondary') {
      const glow = window.themeManager.hexToRgba(colorVal, 0.35);
      document.documentElement.style.setProperty('--secondary-glow', glow);
    }

    window.themeManager.saveTheme({ [cssVar]: colorVal });
  }

  // =========================================================================
  // TOAST NOTIFICATIONS
  // =========================================================================
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'warning') icon = 'fa-triangle-exclamation';

    toast.innerHTML = `
      <i class="fa-solid ${icon}"></i>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease-out';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // =========================================================================
  // ATTACH EVENT LISTENERS
  // =========================================================================
  function attachEventListeners() {
    // Dropdown changes
    materialCategorySelect.addEventListener('change', handleCategoryChange);
    thicknessSelect.addEventListener('change', handleVariantChange);

    // Units
    unitInchesBtn.addEventListener('click', () => setUnit('inches'));
    unitFeetBtn.addEventListener('click', () => setUnit('feet'));

    // Dimension inputs
    [widthInput, heightInput].forEach(input => {
      input.addEventListener('input', calculateLivePrice);
      input.addEventListener('change', calculateLivePrice);
    });

    // Extras toggles and inputs
    holesToggle.addEventListener('change', () => {
      updateHolesUI();
      calculateLivePrice();
    });
    holesCountInput.addEventListener('input', calculateLivePrice);
    holesRateInput.addEventListener('input', () => {
      if (isAdminLoggedIn()) {
        calculateLivePrice();
      }
    });

    frameToggle.addEventListener('change', () => {
      updateFrameUI();
      calculateLivePrice();
    });
    if (frameCustomRateCheck) {
      frameCustomRateCheck.addEventListener('change', () => {
        updateFrameRateLockState();
        calculateLivePrice();
        if (frameCustomRateCheck.checked) {
          frameRateInput.focus();
          frameRateInput.select();
        }
      });
    }
    frameRateInput.addEventListener('input', () => {
      if (isAdminLoggedIn() || (frameCustomRateCheck && frameCustomRateCheck.checked)) {
        calculateLivePrice();
      }
    });
    frameWastageInput.addEventListener('input', () => {
      const val = parseFloat(frameWastageInput.value);
      if (!isNaN(val)) {
        saveFrameWastage(val);
      }
      calculateLivePrice();
    });

    stretchingToggle.addEventListener('change', () => {
      updateStretchingUI();
      calculateLivePrice();
    });
    if (stretchingMarginInput) {
      stretchingMarginInput.addEventListener('input', calculateLivePrice);
      stretchingMarginInput.addEventListener('change', calculateLivePrice);
    }
    stretchingRateInput.addEventListener('input', () => {
      if (isAdminLoggedIn()) {
        calculateLivePrice();
      }
    });
    stretchingRateInput.addEventListener('change', () => {
      if (isAdminLoggedIn()) {
        calculateLivePrice();
      }
    });

    // Rate price inputs click notification in employee mode
    document.querySelectorAll('.rate-price-input').forEach(inp => {
      inp.addEventListener('click', () => {
        if (inp.id === 'frameRateInput') {
          if (!isAdminLoggedIn() && frameCustomRateCheck && !frameCustomRateCheck.checked) {
            showToast('Check "Custom Rate (Client Selection)" to edit frame rate', 'info');
          }
        } else if (!isAdminLoggedIn()) {
          showToast('Prices and rates are fixed. Only Administrator can update rates.', 'info');
        }
      });
    });

    // Accordion toggle
    priceOverrideToggle.addEventListener('click', () => {
      priceOverridePanel.classList.toggle('open');
      overrideChevron.classList.toggle('fa-chevron-up');
      overrideChevron.classList.toggle('fa-chevron-down');
      if (!isAdminLoggedIn() && priceOverridePanel.classList.contains('open')) {
        showToast('Rates are view-only for employees. Administrator login required to edit rates.', 'info');
      }
    });

    [overridePrinting, overrideLamination, overrideMaterial, overrideVarnish].forEach(inp => {
      inp.addEventListener('input', () => {
        if (isAdminLoggedIn()) {
          calculateLivePrice();
        }
      });
    });

    resetOverrideBtn.addEventListener('click', () => {
      if (!isAdminLoggedIn()) {
        openAdminLoginModal();
        showToast('Administrator login required to reset or modify rate overrides', 'warning');
        return;
      }
      overridePrinting.value = '';
      overrideLamination.value = '';
      overrideMaterial.value = '';
      overrideVarnish.value = '';
      calculateLivePrice();
      showToast('Item rates reset to material defaults', 'info');
    });

    // Basket actions
    addToBasketBtn.addEventListener('click', addToBasket);
    clearBasketBtn.addEventListener('click', clearBasket);
    generateQuoteBtn.addEventListener('click', openQuotationModal);
    saveQuoteBtn.addEventListener('click', saveCurrentEstimate);

    resetCalcBtn.addEventListener('click', () => {
      widthInput.value = 1;
      heightInput.value = 1;
      frameWastageInput.value = getSavedFrameWastage();
      if (frameCustomRateCheck) frameCustomRateCheck.checked = false;
      if (stretchingMarginInput) stretchingMarginInput.value = 2;
      updateFrameRateLockState();
      handleVariantChange();
      showToast('Calculator reset', 'info');
    });

    // Auth & Admin Login Modal Actions
    btnHeaderAuth.addEventListener('click', () => {
      if (isAdminLoggedIn()) {
        if (confirm('Are you sure you want to log out of Administrator mode?')) {
          setAdminLoggedIn(false);
          showToast('Logged out. Switched to Employee mode.', 'info');
        }
      } else {
        openAdminLoginModal();
      }
    });

    btnBannerLogin.addEventListener('click', openAdminLoginModal);
    closeAdminLoginModalBtn.addEventListener('click', closeAdminLoginModal);
    cancelAdminLoginBtn.addEventListener('click', closeAdminLoginModal);
    adminLoginModal.addEventListener('click', (e) => {
      if (e.target === adminLoginModal) closeAdminLoginModal();
    });
    adminLoginForm.addEventListener('submit', handleAdminLoginFormSubmit);

    btnTogglePassword.addEventListener('click', () => {
      const isPassword = adminPasswordInput.type === 'password';
      adminPasswordInput.type = isPassword ? 'text' : 'password';
      togglePasswordIcon.className = isPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
    });

    // Rate Master Actions
    addNewMaterialBtn.addEventListener('click', () => openMaterialModal('add'));
    saveRatesBtn.addEventListener('click', saveMasterRates);
    resetRatesBtn.addEventListener('click', resetMasterRatesToDefault);
    exportRatesBtn.addEventListener('click', exportRatesJSON);
    importRatesInput.addEventListener('change', importRatesJSON);
    rateSearchInput.addEventListener('input', renderMasterRateTable);
    rateCategoryFilter.addEventListener('change', renderMasterRateTable);

    // Material Modal Actions
    closeMaterialModalBtn.addEventListener('click', closeMaterialModal);
    cancelMaterialModalBtn.addEventListener('click', closeMaterialModal);
    materialModal.addEventListener('click', (e) => {
      if (e.target === materialModal) {
        closeMaterialModal();
      }
    });
    materialForm.addEventListener('submit', handleMaterialFormSubmit);
    [materialModalPrinting, materialModalLamination, materialModalMaterialPrice, materialModalVarnish].forEach(inp => {
      inp.addEventListener('input', updateModalBaseTotalPreview);
    });

    // History Actions
    clearAllHistoryBtn.addEventListener('click', () => {
      if (confirm('Clear all saved quotation history?')) {
        try {
          localStorage.removeItem('print_calc_saved_quotes_v1');
          renderSavedQuotes();
          updateBadges();
          showToast('History cleared', 'info');
        } catch (e) {
          console.error(e);
        }
      }
    });

    // Modal Actions
    closeModalBtn.addEventListener('click', closeQuotationModal);
    printSlipBtn.addEventListener('click', () => {
      window.print();
    });

    quotationModal.addEventListener('click', (e) => {
      if (e.target === quotationModal) {
        closeQuotationModal();
      }
    });

    // Theme Studio Actions
    if (saveThemeBtn) {
      saveThemeBtn.addEventListener('click', () => {
        showToast('Custom theme saved to local storage!', 'success');
      });
    }

    if (resetThemeBtn) {
      resetThemeBtn.addEventListener('click', () => {
        window.themeManager.resetTheme();
        renderThemeStudio();
        showToast('Theme reset to default Obsidian Dark', 'info');
      });
    }

    if (copyCssBtn) {
      copyCssBtn.addEventListener('click', () => {
        const rootStyle = getComputedStyle(document.documentElement);
        let cssText = ':root {\n';
        COLOR_DEFINITIONS.forEach(def => {
          cssText += `  ${def.key}: ${rootStyle.getPropertyValue(def.key).trim()};\n`;
        });
        cssText += '}';
        navigator.clipboard.writeText(cssText).then(() => {
          showToast('CSS variables copied to clipboard!', 'success');
        }).catch(() => {
          showToast('Failed to copy to clipboard', 'warning');
        });
      });
    }
  }

  // Start app
  init();
});
