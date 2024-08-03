document.addEventListener("DOMContentLoaded", () => {
  const browserInfoElement = document.getElementById("browser-info");
  const locationInfoElement = document.getElementById("location-info");
  const copyButton = document.getElementById("copy-button");
  const copyStatus = document.getElementById("copy-status");

  //To Get Browser Information
  const browserInfo = `User Agent: ${navigator.userAgent}`;
  browserInfoElement.textContent = browserInfo;

  // To Get Location Information
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationInfo = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
        locationInfoElement.textContent = locationInfo;
      },
      (error) => {
        locationInfoElement.textContent = "Unable to retrieve location.";
      }
    );
  } else {
    locationInfoElement.textContent =
      "Geolocation is not supported by this browser.";
  }

  // To Copy Information to Clipboard
  copyButton.addEventListener("click", () => {
    const infoToCopy = `Browser Info: ${browserInfo}\nLocation Info: ${locationInfoElement.textContent}`;
    navigator.clipboard
      .writeText(infoToCopy)
      .then(() => {
        copyStatus.textContent = "Information copied to clipboard!";
        copyStatus.style.color = "green";
      })
      .catch(() => {
        copyStatus.textContent = "Failed to copy information.";
        copyStatus.style.color = "red";
      });
  });
});
