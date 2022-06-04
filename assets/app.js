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
				batteryStatus.innerHTML =
					'Fully Charged <i class="ri-battery-2-fill green-color"></i>'
				batteryLiquid.style.height = '105%' // Greater than 100 to hide ellipse
			} else if (battery.charging) {
				// Validate charging
				batteryStatus.innerHTML =
					'Charging... <i class="ri-battery-2-charge-line animated-green"></i>'
			} else if (level <= 20 && level > 5 && !battery.charging) {
				// Validate low battery
				batteryStatus.innerHTML =
					'Battery Low <i class="ri-plug-line animated-red"></i>'
			} else if (level <= 5 && !battery.charging) {
				// Validate critical battery
				batteryStatus.innerHTML =
					'Critical! <i class="ri-battery-2-line animated-red"></i>'
			} else {
				// Show nothing
				batteryStatus.innerHTML = ''
			}

			// Change color of battery status
			if (level <= 20 && !battery.charging) {
				batteryLiquid.classList.add('gradient-color-red')
				batteryLiquid.classList.remove(
					'gradient-color-green',
					'gradient-color-orange',
					'gradient-color-yellow',
					'animated-charge'
                )
			} else if (level <= 40 && level > 20 && !battery.charging) {
				batteryLiquid.classList.add('gradient-color-orange')
				batteryLiquid.classList.remove(
					'gradient-color-green',
					'gradient-color-red',
					'gradient-color-yellow',
					'animated-charge'
                )
			} else if (level <= 80 && level > 40 && !battery.charging) {
				batteryLiquid.classList.add('gradient-color-yellow')
				batteryLiquid.classList.remove(
					'gradient-color-green',
					'gradient-color-orange',
					'gradient-color-red',
					'animated-charge'
                )
			} else if (level <= 100 && level > 80 && !battery.charging) {
				batteryLiquid.classList.add('gradient-color-green')
				batteryLiquid.classList.remove(
					'gradient-color-red',
					'gradient-color-orange',
					'gradient-color-yellow',
					'animated-charge'
                )
			} else if (battery.charging) {
                batteryLiquid.classList.add('animated-charge')
				batteryLiquid.classList.remove(
					'gradient-color-green',
					'gradient-color-orange',
					'gradient-color-yellow',
					'gradient-color-red'
                )
			}
		}

		updateBattery()

		// Battery status events
		battery.addEventListener('chargingchange', updateBattery)
		battery.addEventListener('levelchange', updateBattery)
	})
}

/*=============== MAIN ===============*/
const main = () => {
	initBattery()
}

main()
