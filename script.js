const roles = ["Red0", "Red1", "Blue0", "Blue1"];
const people = [
    { name: "YW", offDays: ["2025-03-20"], assigned: [] },
    { name: "HC", offDays: ["2025-03-18"], assigned: [] },
    { name: "JM", offDays: [], assigned: [] },
    { name: "DH", offDays: [], assigned: [] },
    { name: "CW", offDays: [], assigned: [] },
    { name: "JM", offDays: [], assigned: [] },
    { name: "HH", offDays: [], assigned: [] },
    { name: "JY", offDays: [], assigned: [] },
    { name: "SH", offDays: [], assigned: [] },
    { name: "DG", offDays: [], assigned: [] },
    { name: "SW", offDays: [], assigned: [] }
];

function generateMonthlySchedule() {
    let today = new Date();
    let currentMonth = today.getMonth(); // Get current month
    let currentYear = today.getFullYear(); // Get current year

    let firstDay = new Date(currentYear, currentMonth, 1); // First day of the month
    let lastDay = new Date(currentYear, currentMonth + 1, 0); // Last day of the month
    let numDays = lastDay.getDate(); // Number of days in the current month

    let calendarHTML = '';
    let firstDayOfWeek = firstDay.getDay(); // Day of the week for the first day of the month (0 = Sunday, 6 = Saturday)

    // Add empty cells for the first week (before the first day)
    for (let i = 0; i < firstDayOfWeek; i++) {
        calendarHTML += `<div class="day"></div>`;
    }

    for (let day = 1; day <= numDays; day++) {
        let date = new Date(currentYear, currentMonth, day);
        let dateString = date.toISOString().split('T')[0]; // ISO formatted date

        let availablePeople = people.filter(p => !p.offDays.includes(dateString));
        let schedule = { date: dateString };

        roles.forEach(role => {
            let selected = availablePeople.length > 0 ? availablePeople[Math.floor(Math.random() * availablePeople.length)] : null;
            schedule[role] = selected ? selected.name : "No Available Person";
        });

        calendarHTML += `<div class="day">
                            <strong>${day}</strong>
                            <div>${schedule.Red0 || "N/A"}</div>
                            <div>${schedule.Red1 || "N/A"}</div>
                            <div>${schedule.Blue0 || "N/A"}</div>
                            <div>${schedule.Blue1 || "N/A"}</div>
                         </div>`;
    }

    // Inject the calendar HTML into the page
    document.querySelector("#calendar").innerHTML = calendarHTML;
}

document.addEventListener("DOMContentLoaded", () => {
    // Ensures script is only run when the DOM is loaded
    console.log("DOM Loaded: Generating Schedule...");
    generateMonthlySchedule();
});