/*!
 * Copyright (c) 2023, Massachusetts Institute of Technology, Inc. All rights reserved.
 */
/* global navigator, window, document */
'use strict';

/**
 * Helper function for registering a wallet with the user's browser.
 *
 * Globals:
 *   WALLET_LOCATION - from local config.js
 *
 *   credentialHandlerPolyfill - from credential-handler-polyfill.min.js script.
 *
 *   WebCredentialHandler - from web-credential-handler.min.js.
 *      Utility/convenience library for the CHAPI polyfill, useful for wallet
 *      implementors.
 */

async function registerWalletWithBrowser() {
  try {
    await credentialHandlerPolyfill.loadOnce();
  } catch(e) {
    console.error('Error loading credential handler polyfill:', e);
  }

  console.log('Polyfill loaded');
  console.log('Registering wallet worker handler at:', WALLET_LOCATION);

  try {
    await WebCredentialHandler.installHandler();
    console.log('Wallet registered');
  } catch(e) {
    console.error('Wallet registration failed:', e);
  }
}
