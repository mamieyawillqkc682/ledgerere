
const form = document.getElementById("leadForm");
const message = document.getElementById("formMessage");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const button = form.querySelector("button");
  button.disabled = true;
  message.textContent = "Sending...";

  const data = {
    name: form.elements.name.value,
    email: form.elements.email.value
  };

  try {
    const response = await fetch("/api/submit-lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) throw new Error(result.error);

    message.textContent = "Thank you! Your information was submitted.";
    form.reset();

  } catch (error) {
    message.textContent = "Something went wrong. Please try again.";
  } finally {
    button.disabled = false;
  }
});
