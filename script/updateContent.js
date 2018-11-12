
function updateBirthday() {
	p = document.getElementById("ageText");
	let currDate = new Date();
	let birthdayDate = new Date(currDate.getFullYear(), 06-1, 14);
	let age = currDate.getFullYear()-1999;
	if (birthdayDate > currDate) {
		age--;
	}
	document.getElementById("ageText").innerHTML = age;
}

window.onload = updateBirthday;
