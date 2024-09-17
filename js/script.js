document.addEventListener("DOMContentLoaded", function() {
    const alarmTimeInput = document.getElementById("alarmTime");
    const setAlarmButton = document.getElementById("setAlarmButton");
    const alarmDisplay = document.getElementById("alarm");
    const countdownDisplay = document.getElementById("countdown");
    const alarmMessage = document.getElementById("alarmMessage");
    const alarmSound = document.getElementById("alarmSound");
    let alarmTime = null;
    let countdownInterval = null;

    // Event listener for the Set Alarm button
    setAlarmButton.addEventListener("click", function() {
        if (!alarmTimeInput.value) {
            alert("Please set an alarm time!");
            return;
        }
        
        // Set the alarm time
        alarmTime = new Date();
        const [hours, minutes] = alarmTimeInput.value.split(":");
        alarmTime.setHours(hours, minutes, 0, 0);

        // Display the alarm set time
        alarmDisplay.textContent = alarmTime.toLocaleTimeString();

        // Clear any existing countdown interval
        if (countdownInterval) clearInterval(countdownInterval);

        // Start the countdown
        startCountdown();
    });

    function startCountdown() {
        countdownInterval = setInterval(() => {
            const currentTime = new Date();
            const timeDifference = alarmTime - currentTime;

            // Check if the alarm time has been reached
            if (timeDifference <= 0) {
                clearInterval(countdownInterval);
                alarmMessage.textContent = "";
                alarmSound.play();
                countdownDisplay.textContent = "00:00:00";
            } else {
                // Calculate hours, minutes, and seconds remaining
                const hours = Math.floor(timeDifference / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

                // Display the countdown
                countdownDisplay.textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
            }
        }, 1000);
    }

    // Helper function to add leading zero to single digit numbers
    function padZero(number) {
        return number < 10 ? `0${number}` : number;
    }
});
