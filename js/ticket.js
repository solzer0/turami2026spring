// 계좌 텍스트 클릭/키보드로 복사
document.querySelectorAll(".account-number").forEach((el) => {
  const copy = () => {
    const accountText = el.textContent.trim();
    navigator.clipboard
      .writeText(accountText)
      .then(() => alert("복사되었습니다!\n" + accountText))
      .catch((err) => console.error("복사 실패:", err));
  };

  el.addEventListener("click", copy);

  // 접근성: Enter/Space 키로도 동작
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      copy();
    }
  });
});
