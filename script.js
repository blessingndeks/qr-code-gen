const generateBtn = document.getElementById("gen");
const inputSection = document.querySelector("input-card");
const qrCode = document.getElementById("qrcode");
const secondDiv = document.querySelector(".actions");
const textInput = document.getElementById("qrText");
const qrBox = document.getElementById("qrcode");
const qrContainer = document.querySelector(".qr-box");
const downloadBtn = document.getElementById("downloadBtn");
const shareBtn = document.getElementById("shareBtn");

generateBtn.addEventListener("click", function () {
  const text = textInput.value.trim();

  if (text === "") {
    alert("Please enter a URL or text!");
    return;
  }

  secondDiv.style.display = "flex";

  qrBox.innerHTML = "";
  document.getElementById('input').style.display = "none";
  document.querySelector('.header').style.display = "none";
  document.getElementById('demo').style.display = "flex";

  function getQRSize() {
  const width = window.innerWidth;
  if (width < 480) return 128;
  if (width < 768) return 200;     
  if (width < 1024) return 250;   
  return 300; 
}

  new QRCode(qrBox, {
    text: text,
    width: getQRSize(),
    height: getQRSize(),
  });

  if ("window-width <=768px") {
    inputSection.style.display = "none";
    secondDiv.style.display = "flex";
  }

});

downloadBtn.addEventListener("click", function () {
  const img = qrBox.querySelector("img"); 
  if (img) {
    const imgSrc = img.src;
    const a = document.createElement("a");  
    a.href = imgSrc;
    a.download = "qrcode.png"; 
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a); 
  } 
  else {
    alert("Please generate a QR code first!");
  }
});

shareBtn.addEventListener("click", async function () {
  const img = qrBox.querySelector("img"); 
  if (img) {
    const imgSrc = img.src;
    try {
      const response = await fetch(imgSrc);
      const blob = await response.blob();
      const file = new File([blob], "qrcode.png", { type: blob.type });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "QR Code",
          text: "Here is your QR code!",
        });
      } else {
        alert("Sharing not supported on this browser.");
      }
    } catch (error) {
      console.error("Error sharing the QR code:", error);
    }
  } else {
    alert("Please generate a QR code first!");
  } 
});