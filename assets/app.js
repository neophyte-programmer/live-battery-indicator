/*=============== BATTERY ===============*/
const initBattery = () => {
    const batteryLiquid = document.querySelector('.battery__liquid')
    const batteryStatus = document.querySelector('.battery__status')
    const batteryPercentage = document.querySelector('.battery__percentage')

    // Get battery level
    navigator.getBattery().then((battery) => {
        updateBattery = () => {
            // Update battery number level
            let level = Math.floor(battery.level * 100)
            batteryPercentage.innerHTML = `${level}%`

            // Update battery liquid level
            batteryLiquid.style.height = `${level}%`

            // Validate battery level and charging
            if (level === 100) {
                // Validate full battery
                batteryStatus.innerHTML = 'Fully Charged <i class="ri-battery-2-fill green-color"></i>'
                batteryLiquid.style.height = '105%' // Greater than 100 to hide ellipse
            }
            else if (battery.charging) {
                // Validate charging
                batteryStatus.innerHTML = 'Charging <i class="ri-battery-charging-fill animated-green"></i>'
            }
            else if (level <= 20 && !battery.charging) {
                // Validate low battery
                batteryStatus.innerHTML = 'Not Charged <i class="ri-battery-2-fill animated-red"></i>'
            }
        }
        
        updateBattery()
    })
}




/*=============== MAIN ===============*/
const main = () => {
    initBattery();

}

main();

