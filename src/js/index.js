"use strict";

import "normalize.css";
import "../css/index.css";
import { knuthShuffle } from "knuth-shuffle";

const doItButton = document.querySelector("#doIt");
const copyButton = document.querySelector("#copy");
const textArea = document.querySelector("textarea");
const amount = document.querySelector("#amount");
const pickContainer = document.querySelector("#pickContainer");
const pickP = document.querySelector("#pickP");
const pickSpan = document.querySelector("#pickSpan");
const pick = document.querySelector("#pick");
const pickList = document.querySelector("ol");

const checkMaxAmount = () =>
	(amount.value =
		parseInt(amount.value) > amount.max ? amount.max : amount.value);

const eToLi = e => {
	const element = document.createElement("li");
	element.textContent = e;
	return element;
};

const copy = () => {
	const entriesCopy = Array.from(pickList.childNodes)
		.map(e => e.textContent)
		.join("\n");

	const copyEl = document.createElement("textarea");
	copyEl.value = entriesCopy;
	copyEl.style.position = "absolute";
	copyEl.style.left = "-5454px";
	document.body.appendChild(copyEl);
	copyEl.select();
	document.execCommand("copy");
	document.body.removeChild(copyEl);
	copyButton.textContent = "copied list";
	setTimeout(() => (copyButton.textContent = "copy list"), 3000);
};

copyButton.onclick = copy;

doItButton.onclick = () => {
	const amountInt = parseInt(amount.value);

	checkMaxAmount();

	const listShuffled = knuthShuffle(
		textArea.value.split("\n").filter(e => e)
	).slice(0, amountInt);

	pickContainer.style.display = "";
	pickP.style.display = "";
	copyButton.style.display = "none";
	pickList.style.display = "none";
	pick.style.display = "none";

	if (amountInt === 1) {
		pickSpan.textContent = "the pick:";
		[pick.textContent] = listShuffled;
		pick.style.display = "";
	} else {
		pickSpan.textContent = "the picks:";
		pickList.textContent = "";
		listShuffled.forEach(e => pickList.appendChild(eToLi(e)));
		pickList.style.display = "";
		copyButton.style.display = "";
	}
};

textArea.oninput = () => {
	if (textArea.value.split("\n").filter(e => e).length > 1) {
		doItButton.disabled = false;
		amount.max = textArea.value.split("\n").filter(e => e).length - 1;
	} else {
		doItButton.disabled = true;
		amount.max = 1;
	}
};

amount.onchange = checkMaxAmount;
