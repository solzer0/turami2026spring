document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const panes = document.querySelectorAll(".tab-pane");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      panes.forEach((p) => p.classList.remove("active"));

      tab.classList.add("active");
      const target = tab.getAttribute("data-tab");
      document.getElementById(target).classList.add("active");
    });
  });
});

// =========================
// Kakao RoughMap lazy init
// =========================
(function () {
  let mapRendered = false;

  function getTargetSize() {
    const wrap = document.getElementById("kakao-map-wrap");
    if (!wrap) return { w: 640, h: 360 };
    const w = Math.max(320, Math.round(wrap.clientWidth)); // 최소폭 가드
    // 데스크탑 16:9, 모바일 4:3 권장
    const isMobile = window.matchMedia("(max-width: 600px)").matches;
    const ratio = isMobile ? 3 / 4 : 9 / 16;
    const h = Math.max(220, Math.round(w * ratio));
    return { w, h };
  }

  function renderKakaoMap() {
    if (mapRendered || typeof window.daum === "undefined" || !daum.roughmap)
      return;
    const { w, h } = getTargetSize();
    const containerId = "daumRoughmapContainer1753927748378";
    const container = document.getElementById(containerId);
    if (!container) return;

    // 안전 초기화 후 렌더
    container.innerHTML = "";
    new daum.roughmap.Lander({
      timestamp: "1753927748378",
      key: "6jotfgszqdk",
      mapWidth: w,
      mapHeight: h,
    }).render();

    mapRendered = true;
  }

  function hookLocationTab() {
    const locTab = document.querySelector('.tab[data-tab="location"]');
    if (locTab) {
      locTab.addEventListener("click", () => {
        // 탭 콘텐츠가 보여진 뒤에 렌더(레이아웃 확정)
        setTimeout(renderKakaoMap, 0);
      });
    }
    // 페이지 진입 시 이미 location 탭이 active인 경우
    const locationPane = document.getElementById("location");
    if (locationPane && locationPane.classList.contains("active")) {
      setTimeout(renderKakaoMap, 0);
    }
  }

  // 리사이즈 시 재렌더(간단한 debounce)
  function debounce(fn, ms) {
    let t;
    return () => {
      clearTimeout(t);
      t = setTimeout(fn, ms);
    };
  }
  window.addEventListener(
    "resize",
    debounce(() => {
      if (!mapRendered) return;
      mapRendered = false;
      renderKakaoMap();
    }, 200)
  );

  document.addEventListener("DOMContentLoaded", hookLocationTab);
})();
