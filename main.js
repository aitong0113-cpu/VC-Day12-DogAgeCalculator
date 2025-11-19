// 取得輸入欄位
const dogNameInput = document.getElementById("dog-name");
const birthdayInput = document.getElementById("birthday");
const sizeInput = document.getElementById("size");

// 按鈕
const calcBtn = document.getElementById("calc");
const clearBtn = document.getElementById("clear");

// 顯示結果（之後你可以在 HTML 加結果區塊）
const resultDogAge = document.getElementById("dog-age");
const resultHumanAge = document.getElementById("human-age");

// 🚀 頁面載入時讀取 localStorage
window.addEventListener("load", () => {
  const savedName = localStorage.getItem("dogName");
  const savedBirthday = localStorage.getItem("dogBirthday");
  const savedSize = localStorage.getItem("dogSize");
  const savedDogAge = localStorage.getItem("dogAge");
  const savedHumanAge = localStorage.getItem("humanAge");

  if (savedName) dogNameInput.value = savedName;
  if (savedBirthday) birthdayInput.value = savedBirthday;
  if (savedSize) sizeInput.value = savedSize;

  if (savedDogAge && savedHumanAge) {
    resultDogAge.textContent = savedDogAge;
    resultHumanAge.textContent = savedHumanAge;
  }
});

// 📌 AVMA 換算：不同體型 → 不同算法
function convertToHumanYears(dogYears, size) {
  // ➤ 官方科學基礎：
  // 小型犬：每年 ≈ 4.5 人年
  // 中型犬：每年 ≈ 5.5 人年
  // 大型犬：每年 ≈ 7.5 人年

  if (dogYears <= 2) {
    return dogYears * 10.5; // 前兩年相同
  }

  switch (size) {
    case "small":
      return 21 + (dogYears - 2) * 4.5;
    case "medium":
      return 21 + (dogYears - 2) * 5.5;
    case "large":
      return 21 + (dogYears - 2) * 7.5;
    default:
      return 21 + (dogYears - 2) * 4.5;
  }
}

// ✨ 計算按鈕事件
calcBtn.addEventListener("click", () => {
  const name = dogNameInput.value.trim();
  const birthday = birthdayInput.value;
  const size = sizeInput.value;

  if (!birthday) {
    alert("請輸入狗狗的生日！");
    return;
  }

  // 計算實際年齡
  const birthDate = new Date(birthday);
  const today = new Date();
  const diffMs = today - birthDate;
  const dogYears = diffMs / (1000 * 60 * 60 * 24 * 365.25);

  // 計算成人年齡
  const humanYears = convertToHumanYears(dogYears, size);

  // 顯示結果（四捨五入一位小數）
  resultDogAge.textContent = dogYears.toFixed(1);
  resultHumanAge.textContent = humanYears.toFixed(1);

  // 儲存資料
  localStorage.setItem("dogName", name);
  localStorage.setItem("dogBirthday", birthday);
  localStorage.setItem("dogSize", size);
  localStorage.setItem("dogAge", dogYears.toFixed(1));
  localStorage.setItem("humanAge", humanYears.toFixed(1));
});

// 🧼 清除資料
clearBtn.addEventListener("click", () => {
  localStorage.removeItem("dogName");
  localStorage.removeItem("dogBirthday");
  localStorage.removeItem("dogSize");
  localStorage.removeItem("dogAge");
  localStorage.removeItem("humanAge");

  // 恢復預設
  resultDogAge.textContent = "尚未計算";
  resultHumanAge.textContent = "尚未計算";
});
