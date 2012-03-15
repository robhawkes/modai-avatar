var avatars = document.getElementsByClassName("avatar");
var battery = navigator.mozBattery;

var avatarEmotions = {
	HAPPY: 0,
	SAD: 1
}
var avatarState = {
	energy: 1,
	emotion: avatarEmotions.HAPPY,
	maxHeight: 127
}

function initAvatar() {
	// Set up listeners
	for (var i = 0; i < avatars.length; i++) {
		var avatar = avatars[i];
		avatar.addEventListener("click", onClick, true);
	}

	if (battery) {
		// Device battery level changed
		battery.addEventListener("levelchange", onBatteryLevelChange, false);
		// Device connected to power, or unplugged
		battery.addEventListener("chargingchange", onBatteryChargingChange, false);
	}
}

function updateEnergy(energy) {
	avatarState.energy = energy;

	for (var i = 0; i < avatars.length; i++) {
		var avatar = avatars[i];
		var energyMask = avatar.getElementsByClassName("avatar-energy-mask")[0];
		energyMask.style.height = avatarState.maxHeight-(avatarState.maxHeight*avatarState.energy);
	}
}

function onClick(e) {
	e.preventDefault();
	e.stopPropagation();

	this.classList.toggle("active");
}

function onBatteryLevelChange(e) {
	updateEnergy(battery.level);
}

function onBatteryChargingChange(e) {
	// battery.charging;
}

initAvatar();