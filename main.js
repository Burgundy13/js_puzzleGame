window.addEventListener("load", shuffleAll);
let allLevelDivs = document.querySelectorAll("[class*=level]");
let twoSlices = [];
let currentView = "level-1";

function shuffleAll() {
	for (const levelDiv of allLevelDivs) {
		let allSlices = levelDiv.querySelectorAll("[class*=image__holder]");
		let orderArray = [];
		for (let i = 0; i < allSlices.length; i++) {
			orderArray.push(i + 1);
		}
		for (let i = 0; i < allSlices.length; i++) {
			let rand = Math.floor(Math.random() * orderArray.length);
			allSlices[i].style.order = orderArray[rand];
			orderArray.splice(rand, 1);
		}
	}
	startGame();
}

function startGame() {
	//set links to show hide
	setNavLinks();
	//set clicks on all slices
	addClicksToSLices();
}

function addClicksToSLices() {
	let allSlices = document.querySelectorAll("[class*=image__holder]");
	for (const slice of allSlices) {
		slice.addEventListener("click", selectMe);
	}
}

function selectMe() {
	this.style.border = " 2px solid green";
	twoSlices.push(this);
	if (twoSlices.length === 2) {
		//get order of clicks
		let orderFirst = window
			.getComputedStyle(twoSlices[0])
			.getPropertyValue("order");
		let orderSecond = window
			.getComputedStyle(twoSlices[1])
			.getPropertyValue("order");
		console.log(orderFirst, orderSecond);
		//reorder
		twoSlices[0].style.order = orderSecond;
		twoSlices[1].style.order = orderFirst;

		twoSlices[0].style.border = "none";
		twoSlices[1].style.border = "none";

		//reset
		twoSlices.length = 0;

		checkIsComplete();
	}
}

function checkIsComplete() {
	let currentDiv = document.querySelector("." + currentView);
	let allSlices = currentDiv.querySelectorAll("[class*='image__holder']");
	let correctOrder = [];
	for (let i = 0; i < allSlices.length; i++) {
		correctOrder.push(i + 1);
	}
	let currentOrder = [];
	for (let i = 0; i < allSlices.length; i++) {
		const slice = allSlices[i];
		currentOrder.push(window.getComputedStyle(slice).getPropertyValue("order"));
	}

	if (currentOrder.toString() == correctOrder.toString()) {
		let activeLink = document.querySelector(".active");
		activeLink.classList.add("finished");
		currentDiv.style.border = "5px solid green";
		currentDiv.style.boxShadow = "0 0 16px green";
	}
}

function setNavLinks() {
	let headerNavLinks = document.querySelectorAll("[data-lvl]");

	for (let i = 0; i < headerNavLinks.length; i++) {
		const link = headerNavLinks[i];
		link.addEventListener("click", function () {
			currentView = this.getAttribute("data-lvl");
			for (const myLink of headerNavLinks) {
				myLink.classList.remove("active");
			}
			this.classList.add("active");
			for (let i = 0; i < allLevelDivs.length; i++) {
				allLevelDivs[i].style.display = " none";
			}
			let divToShow = document.querySelector("." + currentView);
			divToShow.style.display = "flex";
		});
	}
}
