/**
 * Material Price Master - PWA & Offline Engine
 * Handles Service Worker registration, Install Prompt, and Offline Status
 */

(function () {
  'use strict';

  let deferredInstallPrompt = null;
  const STORAGE_KEY_PWA_DISMISSED = 'mpc_pwa_install_dismissed';

  // 1. Register Service Worker
  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('./sw.js')
          .then((registration) => {
            console.log('[PWA] Service Worker registered with scope:', registration.scope);

            // Listen for SW updates
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    showToast('🔄 New update available! Refresh to use the latest version.', 'info');
                  }
                });
              }
            });
          })
          .catch((err) => {
            console.warn('[PWA] Service Worker registration failed:', err);
          });
      });
    }
  }

  // 2. Mobile Install Prompt Handling
  function initInstallPrompt() {
    const installBanner = document.getElementById('pwaInstallBanner');
    const btnPromptInstall = document.getElementById('btnPromptInstall');
    const btnHeaderInstall = document.getElementById('btnHeaderInstall');
    const btnDismissInstall = document.getElementById('btnDismissInstall');
    const btnLaterInstall = document.getElementById('btnLaterInstall');

    // Check if user previously dismissed prompt today
    const lastDismissed = localStorage.getItem(STORAGE_KEY_PWA_DISMISSED);
    const dismissedRecently = lastDismissed && (Date.now() - parseInt(lastDismissed, 10) < 24 * 60 * 60 * 1000);

    // Listen for Chrome / Edge / Android install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent browser default mini-infobar
      e.preventDefault();
      deferredInstallPrompt = e;
      console.log('[PWA] beforeinstallprompt event captured');

      // Show header install button if available
      if (btnHeaderInstall) {
        btnHeaderInstall.style.display = 'inline-flex';
      }

      // Show bottom mobile install banner (if not dismissed in last 24 hrs)
      if (installBanner && !dismissedRecently) {
        setTimeout(() => {
          installBanner.classList.add('visible');
          installBanner.style.display = 'flex';
        }, 1800); // 1.8s delay after initial load for smooth UX
      }
    });

    // Handle "Install" button click
    async function triggerInstallFlow() {
      if (!deferredInstallPrompt) {
        // If iOS Safari or unsupported browser, show helpful instructions
        if (isIosSafari()) {
          showIosInstallModal();
        } else {
          showToast('📲 To install: Open browser menu (⋮) and select "Add to Home screen" or "Install app"', 'info');
        }
        return;
      }

      // Trigger native browser install dialog
      deferredInstallPrompt.prompt();
      const choiceResult = await deferredInstallPrompt.userChoice;
      console.log('[PWA] User choice:', choiceResult.outcome);

      if (choiceResult.outcome === 'accepted') {
        showToast('🎉 Thank you! Installing Material Calculator...', 'success');
        hideInstallBanner();
      } else {
        showToast('You can install anytime from the header button or browser menu.', 'info');
      }

      deferredInstallPrompt = null;
    }

    if (btnPromptInstall) {
      btnPromptInstall.addEventListener('click', triggerInstallFlow);
    }

    if (btnHeaderInstall) {
      btnHeaderInstall.addEventListener('click', triggerInstallFlow);
    }

    function hideInstallBanner() {
      if (installBanner) {
        installBanner.classList.remove('visible');
        setTimeout(() => {
          installBanner.style.display = 'none';
        }, 300);
      }
    }

    function dismissInstallPrompt() {
      localStorage.setItem(STORAGE_KEY_PWA_DISMISSED, Date.now().toString());
      hideInstallBanner();
    }

    if (btnDismissInstall) {
      btnDismissInstall.addEventListener('click', dismissInstallPrompt);
    }

    if (btnLaterInstall) {
      btnLaterInstall.addEventListener('click', dismissInstallPrompt);
    }

    // App successfully installed listener
    window.addEventListener('appinstalled', () => {
      console.log('[PWA] Material Calculator was successfully installed!');
      hideInstallBanner();
      if (btnHeaderInstall) {
        btnHeaderInstall.style.display = 'none';
      }
      showToast('🎉 Material Calculator installed! Works 100% offline from your home screen.', 'success');
    });

    // Detect if already running in standalone mode (installed app)
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      console.log('[PWA] Running in Standalone App Mode');
      if (installBanner) installBanner.style.display = 'none';
      if (btnHeaderInstall) btnHeaderInstall.style.display = 'none';
    } else if (isIosSafari() && btnHeaderInstall) {
      // On iOS Safari, show header button so users can see instructions
      btnHeaderInstall.style.display = 'inline-flex';
    }
  }

  // 3. iOS Safari Helper
  function isIosSafari() {
    const ua = window.navigator.userAgent;
    const isIos = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
    const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS/.test(ua);
    return isIos && isSafari;
  }

  function showIosInstallModal() {
    const modal = document.getElementById('iosInstallModal');
    if (modal) {
      modal.classList.add('active');
    } else {
      alert('To install on iPhone/iPad:\n1. Tap the Share button at the bottom of Safari.\n2. Select "Add to Home Screen".');
    }
  }

  // 4. Online & Offline Detection
  function initNetworkMonitor() {
    const statusBadge = document.getElementById('networkStatusBadge');

    function updateNetworkStatus() {
      const isOnline = navigator.onLine;

      if (statusBadge) {
        if (isOnline) {
          statusBadge.className = 'network-badge online';
          statusBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span>Online</span>';
          statusBadge.title = 'Connected to internet. Automatic sync active.';
        } else {
          statusBadge.className = 'network-badge offline';
          statusBadge.innerHTML = '<i class="fa-solid fa-plane-slash"></i> <span>Offline (Active)</span>';
          statusBadge.title = 'Offline mode: All calculations, rate cards & saved quotes work 100% locally.';
        }
      }
    }

    window.addEventListener('online', () => {
      updateNetworkStatus();
      showToast('🌐 Internet connection restored! All data in sync.', 'success');
    });

    window.addEventListener('offline', () => {
      updateNetworkStatus();
      showToast('⚡ You are now OFFLINE! Material Calculator continues to work 100% without internet.', 'warning');
    });

    // Initial check
    updateNetworkStatus();
  }

  // Helper toast notification
  function showToast(message, type) {
    if (window.showToast) {
      window.showToast(message, type);
      return;
    }
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type || 'info'}`;
    toast.innerHTML = `<i class="fa-solid ${type === 'warning' ? 'fa-triangle-exclamation' : type === 'success' ? 'fa-circle-check' : 'fa-circle-info'}"></i> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // Initialize all PWA capabilities when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    registerServiceWorker();
    initInstallPrompt();
    initNetworkMonitor();
  });
})();
