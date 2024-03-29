/*!
 * Copyright (c) 2023, Massachusetts Institute of Technology, Inc. All rights reserved.
 */

// wallet package
const WALLET_PACKAGE_ANDROID = 'app.lcw';
const WALLET_PACKAGE_IOS = 'edu.mit.eduwallet';

// opens wallet based on mobile os
function openWallet() {
  const userAgent = (navigator.userAgent || navigator.vendor || window.opera).toLowerCase();

  // Windows detection (must come first because its UA also contains "android")
  if (/windows phone/i.test(userAgent)) {
    // this wallet does not support Windows
    return;
  }

  // Android detection
  if (/android/i.test(userAgent)) {
    openAndroidWallet();
    return;
  }

  // iOS detection (!window.MSStream prevents IE11 detection)
  if (/ipad|iphone|ipod/.test(userAgent) && !window.MSStream) {
    openIosWallet();
    return;
  }
}

// opens Android wallet
function openAndroidWallet() {
  const [_, locationPath] = window.location.href.split('https://');
  window.location.replace(`intent://${locationPath}#Intent;scheme=https;package=${WALLET_PACKAGE_ANDROID};end`);
}

// opens iOS wallet
function openIosWallet() {
  const [_, locationPath] = window.location.href.split('https://');
  window.location.replace(`${WALLET_PACKAGE_IOS}://${locationPath}`);
}
