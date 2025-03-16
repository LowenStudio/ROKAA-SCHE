const roles = ["Red0", "Red1", "Blue0", "Blue1"];
const people = [
    { name: "Alice", offDays: ["2025-03-20"], assigned: [] },
    { name: "Bob", offDays: ["2025-03-18"], assigned: [] },
    { name: "Charlie", offDays: [], assigned: [] },
    { name: "David", offDays: [], assigned: [] },
    { name: "Emma", offDays: [], assigned: [] },
    { name: "Frank", offDays: [], assigned: [] },
    { name: "Grace", offDays: [], assigned: [] },
    { name: "Hank", offDays: [], assigned: [] },
    { name: "Ivy", offDays: [], assigned: [] },
    { name: "Jack", offDays: [], assigned: [] },
    { name: "Kelly", offDays: [], assigned: [] }
];

function generateMonthlySchedule() {
    let today = new Date();
    let scheduleHistory = JSON.parse(localStorage.getItem("schedule")) || [];

    for (let i = 0; i < 4; i++) {  
        let weekStart = new Date(today);
        weekStart.setDate(today.getDate() + i * 7);
        let week = weekStart.toISOString().split("T")[0];

        let schedule = { week };

        for (let role of roles) {
            let availablePeople = people.filter(p => !p.offDays.includes(week));
            let selected = availablePeople.length > 0 ? availablePeople[Math.floor(Math.random() * availablePeople.length)] : null;
            schedule[role] = selected ? selected.name : "No Available Person";
        }

        scheduleHistory.push(schedule);
    }

    localStorage.setItem("schedule", JSON.stringify(scheduleHistory));
    displaySchedule();
}

function displaySchedule() {
    let schedules = JSON.parse(localStorage.getItem("schedule")) || [];
    let tbody = document.querySelector("#scheduleTable tbody");
    tbody.innerHTML = "";

    schedules.forEach(s => {
        let row = `<tr>
            <td>${s.week}</td>
            <td>${s.Red0 || "N/A"}</td>
            <td>${s.Red1 || "N/A"}</td>
            <td>${s.Blue0 || "N/A"}</td>
            <td>${s.Blue1 || "N/A"}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

document.addEventListener("DOMContentLoaded", displaySchedule);