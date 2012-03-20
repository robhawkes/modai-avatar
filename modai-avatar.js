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
		battery.addEventListener("levelchange", updateBattery);
		// Device connected to power, or unplugged
		battery.addEventListener("chargingchange", updateBattery);

		// Update battery first time around
		updateBattery();
	}
}

function updateBattery() {
	avatarState.energy = battery.level;

	for (var i = 0; i < avatars.length; i++) {
		var avatar = avatars[i];
		var energyMask = avatar.getElementsByClassName("avatar-energy-mask")[0];
		var charge = avatar.getElementsByClassName("avatar-charge")[0];

		energyMask.style.height = avatarState.maxHeight-(avatarState.maxHeight*avatarState.energy);
		charge.style.height = avatarState.maxHeight-(avatarState.maxHeight*avatarState.energy);

		if (battery.charging) {
			avatar.classList.add("charge");
		} else {
			avatar.classList.remove("charge");
		}
	}
}

function onClick(e) {
	e.preventDefault();
	e.stopPropagation();

	this.classList.toggle("active");
}

initAvatar();