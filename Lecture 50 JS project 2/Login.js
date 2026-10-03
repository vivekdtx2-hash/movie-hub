const signupForm = document.querySelector("#signupForm");
const successMessage = document.querySelector("#successMessage");

signupForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = document.querySelector("#name").value.trim();

    // Name browser में save करना
    localStorage.setItem("movieHubUser", name);

    // पूरा form छुपाना
    signupForm.classList.add("hidden");

    // Congratulations message
    successMessage.innerHTML = `
        <div class="text-3xl mb-3">✓</div>

        <h3 class="text-xl font-semibold text-white">
            Congratulations!
        </h3>

        <p class="text-green-400 mt-2">
            Your Account is Created Successfully.
        </p>
    `;

    successMessage.classList.remove("hidden");

});