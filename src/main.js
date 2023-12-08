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

const checkMaxAmount = () =>
	(amount.value =
		parseInt(amount.value) > amount.max ? amount.max : amount.value);

const eToLi = (e) => {
	const element = document.createElement("li");
	element.textContent = e;
	return element;
};

const copy = () => {
	const entriesCopy = Array.from(pickList.childNodes)
		.map((e) => e.textContent)
		.join("\n");

	if (navigator.clipboard) navigator.clipboard.writeText(entriesCopy);
	else {
		const copyEl = document.createElement("textarea");
		copyEl.value = entriesCopy;
		copyEl.style.position = "absolute";
		copyEl.style.left = "-5454px";
		document.body.appendChild(copyEl);
		copyEl.select();
		document.execCommand("copy");
		document.body.removeChild(copyEl);
	}
	copyButton.textContent = "copied list";
	setTimeout(() => (copyButton.textContent = "copy list"), 3000);
};

copyButton.onclick = copy;

doItButton.onclick = () => {
	const amountInt = parseInt(amount.value);

	checkMaxAmount();

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
amount.onchange = checkMaxAmount;

for (let i = 0; i < pickElements.length; i++) {
	pickElements[i].style.display = "none";
}

if (navigator.serviceWorker) {
	const sw = "service-worker.js";
	window.addEventListener("load", () => navigator.serviceWorker.register(sw));
}
