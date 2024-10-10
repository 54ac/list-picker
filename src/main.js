import arrayShuffle from "array-shuffle";

const doItButton = document.getElementById("doIt");
const copyButton = document.getElementById("copy");
const backButton = document.getElementById("back");
const textArea = document.getElementById("listTextarea");
const amount = document.getElementById("amount");
const pickSpan = document.getElementById("pickSpan");
const pickSingle = document.getElementById("pickSingle");
const pickList = document.getElementById("pickList");
const listElements = document.getElementsByClassName("list");
const pickElements = document.getElementsByClassName("pick");

const checkMaxAmount = () => {
	if (isNaN(amount.value)) amount.value = 1;
	else if (amount.value < 1) amount.value = 1;
	else if (amount.value > amount.max) amount.value = amount.max;
};

const eToLi = (e) => {
	const element = document.createElement("li");
	element.textContent = e;
	return element;
};

const copy = () => {
	const entriesCopy = Array.from(pickList.childNodes)
		.map((e) => e.textContent)
		.join("\n");

	navigator.clipboard.writeText(entriesCopy);
	copyButton.textContent = "copied list";
	setTimeout(() => (copyButton.textContent = "copy list"), 3000);
};

copyButton.onclick = copy;

doItButton.onclick = () => {
	checkMaxAmount();
	const amountInt = parseInt(amount.value);

	const listShuffled = arrayShuffle(
		textArea.value.split("\n").filter((e) => e)
	).slice(0, amountInt);

	for (let i = 0; i < listElements.length; i++) {
		listElements[i].style.display = "none";
	}

	for (let i = 0; i < pickElements.length; i++) {
		pickElements[i].style.display = "initial";
	}

	doItButton.textContent = "pick again";

	if (amountInt === 1) {
		pickSpan.textContent = "the pick:";
		[pickSingle.textContent] = listShuffled;

		pickSingle.style.display = "unset";
		pickList.style.display = "none";
	} else {
		pickSpan.textContent = "the picks:";
		pickList.textContent = "";
		listShuffled.forEach((e) => pickList.appendChild(eToLi(e)));

		pickSingle.style.display = "none";
		pickList.style.display = "unset";
		copyButton.style.display = "unset";
	}
};

textArea.oninput = () => {
	if (textArea.value.split("\n").filter((e) => e).length > 1) {
		doItButton.disabled = false;
		amount.max = textArea.value.split("\n").filter((e) => e).length - 1;
	} else {
		doItButton.disabled = true;
		amount.max = 1;
	}
};

backButton.onclick = () => {
	for (let i = 0; i < listElements.length; i++) {
		listElements[i].style.display = "unset";
	}

	for (let i = 0; i < pickElements.length; i++) {
		pickElements[i].style.display = "none";
	}

	pickSingle.style.display = "none";
	pickList.style.display = "none";
	copyButton.style.display = "none";

	doItButton.textContent = "pick";
};

amount.max = textArea.value.split("\n").filter((e) => e).length - 1;
textArea.onblur = checkMaxAmount;

if (window.matchMedia("(orientation: portrait)").matches) amount.type = "text";
