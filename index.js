const randombt = document.getElementById("randombt");
const quoteText = document.getElementById("quoteText");
const saveqtcon = document.querySelector(".save-quotes-container");
const saveqtcon1 = document.getElementById("savedQuotesList");

// Load saved quotes on page load
document.addEventListener("DOMContentLoaded", loadSavedQuotes);

function copyQuote() {
    const quoteinText = quoteText.innerText;

    navigator.clipboard.writeText(quoteinText)
        .then(() => {
            alert("Quote copied to clipboard!");
        })
        .catch(err => {
            console.error("Failed to copy:", err);
        });
}

function saveQuote() {
        const quoteinText = quoteText.innerHTML;
        const newqtele = document.createElement("p");
        newqtele.classList.add("quotes-card-save");
        newqtele.innerHTML = quoteinText;
        saveqtcon1.appendChild(newqtele);
    // Store in localStorage
    let savedQuotes = JSON.parse(localStorage.getItem("savedQuotes")) || [];
    savedQuotes.push(quoteinText);
    localStorage.setItem("savedQuotes", JSON.stringify(savedQuotes));
}

function shareOnTwitter() {
    const quoteinText = quoteText.innerText;
    const tweetUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(quoteinText)}`;
    window.open(tweetUrl, "_blank"); // Opens Twitter in a new tab
}

function deleteLastQuote() {
    const savedQuotes = document.querySelectorAll(".quotes-card-save");
    if (savedQuotes.length > 0) {
        savedQuotes[savedQuotes.length - 1].remove();

        // Remove from localStorage
        let savedQuotesArray = JSON.parse(localStorage.getItem("savedQuotes")) || [];
        savedQuotesArray.pop(); // Remove the last item
        localStorage.setItem("savedQuotes", JSON.stringify(savedQuotesArray));
    } else {
        alert("No saved quotes to delete!");
    }
}

function loadSavedQuotes() {
    let savedQuotes = JSON.parse(localStorage.getItem("savedQuotes")) || [];
    savedQuotes.forEach(quote => {
        const newqtele = document.createElement("p");
        newqtele.classList.add("quotes-card-save");
        newqtele.innerText = quote;
        saveqtcon.appendChild(newqtele);
    });
}

randombt.addEventListener("click", async () => {
    try {
        const response = await fetch("https://api.freeapi.app/api/v1/public/quotes/quote/random");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();  
        quoteText.innerHTML = `"${data.data.content}" <br> - <b>${data.data.author}</b>`;

    } catch (error) {
        console.error("Error fetching quote:", error);
        alert("Failed to fetch a quote. Please try again! " + error.message);
    }
});
