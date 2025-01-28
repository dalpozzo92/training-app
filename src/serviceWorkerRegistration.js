// src/serviceWorkerRegistration.js

// Questa funzione si occupa di registrare il service worker
// e di gestire le risorse in cache per supportare la modalità offline.
const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      window.location.hostname === '[::1]' ||
      window.location.hostname.match(
        /^127(\.[0-9]{1,3}){3}$/
      )
  );
  
  export function register() {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      // Questo è il punto in cui registriamo il service worker in modalità produzione
      const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
      if (publicUrl.origin !== window.location.origin) {
        // Assicurati che il service worker non venga registrato se la nostra app è ospitata su un dominio differente.
        return;
      }
  
      window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
        if (isLocalhost) {
          // In locale, verifichiamo se il service worker è stato già registrato
          checkValidServiceWorker(swUrl);
        } else {
          // Se non siamo in locale, registriamo direttamente il service worker
          registerValidSW(swUrl);
        }
      });
    }
  }
  
  function registerValidSW(swUrl) {
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log('Service Worker registrato: ', registration);
      })
      .catch((error) => {
        console.error('Errore durante la registrazione del Service Worker: ', error);
      });
  }
  
  function checkValidServiceWorker(swUrl) {
    // Controlliamo se il service worker è valido
    fetch(swUrl)
      .then((response) => {
        // Se la risposta è valida, registriamo il service worker
        if (response.status === 404 || response.type === 'no-store') {
          // Se non trova il service worker, potrebbe essere che il file non esista
          navigator.serviceWorker.ready.then((registration) => {
            registration.unregister();
          });
        } else {
          // Se è valido, registriamo il service worker
          registerValidSW(swUrl);
        }
      })
      .catch(() => {
        console.log('Nessun internet, offline mode.');
      });
  }
  
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          registration.unregister();
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }
  