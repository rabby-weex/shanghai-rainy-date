// Romantic Background Music & Mobile Navigation Controller

(function() {
  // Determine current active page
  const path = window.location.pathname.toLowerCase();
  let currentKey = 'index';
  if (path.includes('jingan')) currentKey = 'jingan';
  else if (path.includes('xuhui')) currentKey = 'xuhui';
  else if (path.includes('jiading')) currentKey = 'jiading';
  else if (path.includes('songjiang')) currentKey = 'songjiang';

  // 1. Create BGM Audio element
  const audio = document.createElement('audio');
  audio.id = 'romantic-bgm';
  audio.src = 'bgm.mp3';
  audio.loop = true;
  audio.preload = 'auto';
  document.body.appendChild(audio);

  // 2. Create Floating Music Fab Button
  const fab = document.createElement('div');
  fab.className = 'music-player-fab';
  fab.innerHTML = `
    <div class="vinyl-disc">💿</div>
    <div class="music-note-float">♪</div>
  `;
  document.body.appendChild(fab);

  let isPlaying = false;

  function setPlayingState(playing) {
    isPlaying = playing;
    if (playing) {
      fab.classList.add('playing');
      audio.play().catch(e => console.log('Autoplay deferred:', e));
    } else {
      fab.classList.remove('playing');
      audio.pause();
    }
  }

  fab.addEventListener('click', () => {
    setPlayingState(!isPlaying);
  });

  // 3. Create Opening Ceremony Invitation Modal
  const hasOpened = sessionStorage.getItem('shanghai_date_opened');
  
  if (!hasOpened) {
    const modal = document.createElement('div');
    modal.className = 'invite-modal-overlay';
    modal.innerHTML = `
      <div class="invite-card">
        <div class="invite-seal">💌</div>
        <h2 class="invite-title">致亲爱的：雨天漫游</h2>
        <p class="invite-subtitle">AN INVITATION FOR OCTOBER 4TH</p>
        <p class="invite-text">
          周日的上海有些许细雨，<br>
          但我为你挑选了不用淋湿鞋袜的浪漫路线。<br>
          戴上耳机，推开这扇门，<br>
          挑选一条你最喜欢的漫步时光吧。
        </p>
        <button class="btn-open-invite" id="btn-enter-date">
          <span>开启漫游 · 倾听月光</span>
          <span>🎵</span>
        </button>
      </div>
    `;
    document.body.appendChild(modal);

    const btnEnter = document.getElementById('btn-enter-date');
    btnEnter.addEventListener('click', () => {
      modal.classList.add('hidden');
      sessionStorage.setItem('shanghai_date_opened', 'true');
      setPlayingState(true);
      setTimeout(() => modal.remove(), 500);
    });
  }

  // 4. Create Bottom Mobile Navigation Dock
  const dock = document.createElement('div');
  dock.className = 'bottom-dock';
  dock.innerHTML = `
    <div class="dock-container">
      <a href="index.html" class="dock-item ${currentKey === 'index' ? 'active' : ''}">
        <span class="dock-icon">🏛️</span>
        <span class="dock-label">市区艺术</span>
      </a>
      <a href="jingan.html" class="dock-item ${currentKey === 'jingan' ? 'active' : ''}">
        <span class="dock-icon">☕</span>
        <span class="dock-label">静安洋房</span>
      </a>
      <a href="xuhui.html" class="dock-item ${currentKey === 'xuhui' ? 'active' : ''}">
        <span class="dock-icon">🎻</span>
        <span class="dock-label">徐汇琴韵</span>
      </a>
      <a href="jiading.html" class="dock-item ${currentKey === 'jiading' ? 'active' : ''}">
        <span class="dock-icon">🎋</span>
        <span class="dock-label">嘉定烟雨</span>
      </a>
      <a href="songjiang.html" class="dock-item ${currentKey === 'songjiang' ? 'active' : ''}">
        <span class="dock-icon">🏰</span>
        <span class="dock-label">松江云间</span>
      </a>
    </div>
  `;
  document.body.appendChild(dock);

  // 5. Connect the existing hero audio button if present on page
  const ambientBtn = document.getElementById('toggle-audio-btn');
  if (ambientBtn) {
    ambientBtn.addEventListener('click', () => {
      // If user clicks the ambient rain button, also ensure BGM is pleasant
      if (!isPlaying) {
        setPlayingState(true);
      }
    });
  }

  // WeChat auto-audio unlock hook
  document.addEventListener('WeixinJSBridgeReady', function() {
    if (sessionStorage.getItem('shanghai_date_opened')) {
      audio.play().then(() => setPlayingState(true)).catch(() => {});
    }
  }, false);
})();
