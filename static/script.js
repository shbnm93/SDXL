document.addEventListener("DOMContentLoaded", () => {
    const modelImages = document.querySelectorAll(".model-selection img");
  
    modelImages.forEach((modelImage) => {
      modelImage.addEventListener("click", (event) => {
        event.target.classList.add("model-selected");
        modelImages.forEach((image) => {
          if (image !== event.target) {
            image.classList.remove("model-selected");
          }
        });
      });
    });
  });
  
  function fetchImage() {
    const promptText = document.getElementById("prompt").value;
    const negativePromptText = document.getElementById("negative-prompt").value;
    const model = document
      .querySelector(".model-selected")
      .getAttribute("api_link");
  
    console.log("Prompt:", promptText);
    console.log("Negative Prompt:", negativePromptText);
    console.log("Model:", model);
  
    fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: promptText,
        negativePrompt: negativePromptText,
        model: model,
      }),
    })
      .then(function (response) {
        if (response.ok) {
          return response.blob();
        }
        throw new Error("Network response was not OK.");
      })
      .then(function (imageBlob) {
        var imageUrl = URL.createObjectURL(imageBlob);
        document.getElementById("display-image").src = imageUrl;
        document.getElementById("display-image").alt = promptText;
      })
      .catch(function (error) {
        console.log("Error fetching image:", error);
        alert("Error Generating Image");
      });
  }