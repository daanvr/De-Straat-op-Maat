var vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
var MatrixHightCalced = 0.7 * vh;
var MatrixWidthCalced = 0.6 * vw;
var Biggest = new Array();
var MatrixItemPos = new Array();

//Load DB javascript to index.html
var newScript = document.createElement('script');
newScript.type = 'text/javascript';
newScript.src = 'strDB.js';
document.getElementsByTagName('head')[0].appendChild(newScript);

DBReady()
function DBReady() {
	console.log("is the DataBase ready?");
	if (typeof LoadDB == 'function' && LoadDB()) {
		console.log("YES");
		//console.log(StrDB);			
		Start()
	} else {
		console.log("Not jet");
		setTimeout(DBReady, 30);
	}
};


function Start() {
	console.log("Starting script");
	if (CalcBiggest()) {
		console.log("Biggest calculated");
		if (GenerateMatrixItemPosDB()) {
			console.log("Matrix Position calculated");
			BuildMatrix();
			BuildLibrary(0);
		}
	}
};

function RefreshViewportSizes() {
	vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	MatrixHightCalced = 0.7 * vh;
	MatrixWidthCalced = 0.6 * vw;
	onresize();
	console.log("Resizing Vieuwpoort");
};

function CalcBiggest() {
	for (i in StrDB) {
		if (i == 0) {
			Biggest.Intensiteit = StrDB[i].Intensiteit;
			Biggest.Ruimte = StrDB[i].Ruimte;
			//console.log("initalising biggest");

		} else {
			if (Biggest.Intensiteit < StrDB[i].Intensiteit) {
				Biggest.Intensiteit = StrDB[i].Intensiteit;
				//Biggest.Wnbr = StrDB[i].Intensiteit;
				//console.log("One is Wider");

			}
			if (Biggest.Ruimte < StrDB[i].Ruimte) {
				Biggest.Ruimte = StrDB[i].Ruimte;
				//console.log("One is Higher");

			}
		}
	}
	//console.log(Biggest.Intensiteit);
	//console.log(Biggest.Ruimte);
	return true;
};

function BuildMatrix() {
	//Matrix Title text Building
	var MatrixIntroTitle = document.createElement("H1");
	// var TitleText = "Matrix van alle Straten"
	// MatrixIntroTitle.appendChild(TitleText);
	MatrixIntroTitle.textContent = "Matrix van alle Straten";

	//Matrix Intro Text Building
	var MatrixIntroText = document.createElement("P");
	MatrixIntroText.textContent = "Dit is de inroductie tekst over deze matrix.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc gravida, tortor vel vehicula malesuada, massa nibh facilisis risus, non pharetra erat enim a mauris. Etiam orci urna, hendrerit nec bibendum id, placerat ut nibh. Donec non interdum lacus. Vestibulum in magna felis. Morbi et nulla mattis, blandit eros a, egestas leo. Etiam efficitur odio vel lectus venenatis convallis. Cras blandit lacus quis porttitor eleifend. Nunc pellentesque porta malesuada.";

	//Matrix Legenda Building
	var LegendaLeft = document.createElement("div");
	LegendaLeft.id = "MatrixTextLeft";
	LegendaLeft.className = "MatrixTextLeft";
	LegendaLeft.innerHTML = "<img src='img/intensiteit.png' alt='' height='22'>"
	LegendaLeft.innerHTML += "  Verkeersinensieit";

	//Matrix Legenda Building
	var LegendaBottom = document.createElement("div");
	LegendaBottom.id = "MatrixTextBottom";
	LegendaBottom.className = "MatrixTextBottom";
	LegendaBottom.innerHTML = "<img src='img/ruimte.png' alt='' height='22'>"
	LegendaBottom.innerHTML += "  Ruimte";

	//Matrix Building
	var Matrix = document.createElement("div");
	Matrix.id = "Matrix";
	Matrix.className = "Matrix";
	Matrix.innerHTML = "";
	var SizCal;
	SizCal = "height: ";
	SizCal += MatrixHightCalced;
	SizCal += "px;";
	SizCal += "width: ";
	SizCal += MatrixWidthCalced;
	SizCal += "px;";
	Matrix.style.cssText += SizCal;
	if (document.getElementById("MatrixContainer")) {
		document.getElementById("MatrixContainer").innerHTML = "";
		console.log("removing HTML in Matrix div");
	}

	document.getElementById("MatrixContainer").appendChild(MatrixIntroTitle);
	document.getElementById("MatrixContainer").appendChild(MatrixIntroText);
	document.getElementById("MatrixContainer").appendChild(LegendaLeft);
	document.getElementById("MatrixContainer").appendChild(LegendaBottom);
	document.getElementById("MatrixContainer").appendChild(Matrix);

	//Matrix legenda positioning
	var Matrixoffsets = document.getElementById('Matrix').getBoundingClientRect();

	//Left legenda text
	document.getElementById('MatrixTextLeft').style.cssText += "display: inline-block;";
	var LeftTransformCalc = "transform: rotate(-90deg) translate(";
	LeftTransformCalc += -Matrixoffsets.height / 2 - 160;
	LeftTransformCalc += "px, ";
	LeftTransformCalc += -(1920 - vw) / 29 - 5;
	LeftTransformCalc += "px);";
	document.getElementById('MatrixTextLeft').style.cssText += LeftTransformCalc;
	document.getElementById('MatrixTextLeft').style.cssText += "transform-origin: top left;";

	//Bottom legenda text
	document.getElementById('MatrixTextBottom').style.cssText += "display: inline-block;";
	var BottomTransformCalc = "transform: translate(";
	BottomTransformCalc += Matrixoffsets.width / 2 - 100;
	BottomTransformCalc += "px, ";
	BottomTransformCalc += Matrixoffsets.height - 5;
	BottomTransformCalc += "px);";
	document.getElementById('MatrixTextBottom').style.cssText += BottomTransformCalc;
	document.getElementById('MatrixTextBottom').style.cssText += "transform-origin: top left;";


	for (i in StrDB) {
		var StrInMatrix = document.createElement("div");
		StrInMatrix.id = "StreetName" + i;
		StrInMatrix.className = "StrInMatrix";
		// StrInMatrix.innerHTML = StrDB[i].Name;
		var BuildID = i;
		StrInMatrix.onmouseover = (function () {
			var I = i;
			return function () { MatrixHoverBox(I); }
		})();

		// StrInMatrix.onmouseleave = (function () { //This is a bit of crazy code called "closure". it is because you can not use the i var inside the funtion
		// 	var I = i;
		// 	return function () { MatrixHoverBoxRemove(I); }
		// })();

		// StrInMatrix.style.cssText += "color: red;";
		StrInMatrix.style.cssText += MatrixItemPos[i];

		var BuildStreetInfo = "";
		BuildStreetInfo += "This is placholder text";
		// BuildStreetInfo = CreateStrInfo(i, BuildID);


		// StrInMatrixInfo.innerHTML = BuildStreetInfo;

		document.getElementById("Matrix").appendChild(StrInMatrix);
		// document.getElementById("Matrix").appendChild(StrInMatrixInfo);
	}
};

function SortStrDB(SortVar, SortDir) {
	// SortDir of 1 is Assending
	// SortDir of 0 is Desending
	if (SortDir === undefined) { SortDir = 1; } //Default is Assending


	// if (SortDir) {
	// 	StrDB.sort(function (a, b) { return a.SortVar - b.SortVar });
	// 	console.log("Sorted (" + SortVar + ") in sort direction: " + SortDir);
	// };
	// 	if (!SortDir) {
	// 	StrDB.sort(function (a, b) { return b.SortVar - a.SortVar });
	// 	console.log("Sorted (" + SortVar + ") in sort direction: " + SortDir);
	// };


	// StrDB.sort((a, b) => (
	// 	(a.SortVar === null) - (b.SortVar === null)
	// 	|| a.SortVar - b.SortVar
	// ));
	// console.log(SortVar);

	return true;
};

function BuildLibrary(IndexSortVar, IndexSortDir) {

	//when I get the code to wait for the function this would work
	//if (IndexSortVar === 0) {SortStrDB("Intensiteit", 0)};
	//if (IndexSortVar === 1) {SortStrDB("Ruimte", 0)};

	if (IndexSortVar === undefined) {
		IndexSortVar = "Intensiteit";
	}

	// if (SortStrDB(IndexSortVar, IndexSortDir)) {
	// 	console.log("Index sorted, ready to build");
	// };

	if (IndexSortVar == 'Intensiteit') { StrDB.sort(function (a, b) { return a.Intensiteit - b.Intensiteit }); };
	if (IndexSortVar == 'Ruimte') { StrDB.sort(function (a, b) { return a.Ruimte - b.Ruimte }); };

	$('.IndexItem').each(function (i, obj) {
		obj.remove()
		//console.log("Removed IndexItem " + i);
	});

	for (i in StrDB) {//Building a Street info Box per Street
		var IndexItem = BuildStrBox(i);
		IndexItem.className += " IndexItem";
		document.getElementById("IndexContainer").appendChild(IndexItem);
	}
	console.log("Index Built");
};

function onresize() {
	if (GenerateMatrixItemPosDB()) {
		BuildMatrix();
	}
	console.log("rebuilt the Matrix");
};

function BuildBar(Type, i) {
	var MaxBar = document.createElement("div");
	MaxBar.className = "MaxBar";
	MaxBar.id = "MaxBar-";
	MaxBar.id += Type;
	MaxBar.id += "-";
	MaxBar.id += i;

	//add progress to the bar
	MaxBar.appendChild(BuildProgres(Type, i));

	return MaxBar;
};

function BuildProgres(Type, i) {
	//Preparing Progress div
	var ProgressBar = document.createElement("div");
	ProgressBar.id = "Progress-";
	ProgressBar.id += Type;
	ProgressBar.id += "-";
	if (Type == 0) { //if Intensiteit
		ProgressBar.id += StrDB[i].Intensiteit;
		ProgressBar.className = "Progress Intensiteit";
		var ProgressWidth = StrDB[i].Intensiteit / Biggest.Intensiteit * 255 + 8;
	} else if (Type == 1) { //if Ruimte
		ProgressBar.id += StrDB[i].Ruimte;
		ProgressBar.className = "Progress Ruimte";
		var ProgressWidth = StrDB[i].Ruimte / Biggest.Ruimte * 255 + 8;
	}
	if (ProgressWidth > 255) { ProgressWidth = 255; } //if more progress than max, then limit to max
	ProgressBar.style.cssText = "width: " + ProgressWidth + "px;"; // Set Progress Width to CSS
	return ProgressBar;
};

function BuildStrBox(i) {
	//preparing Bar Container div
	var StrBox = document.createElement("div");
	StrBox.className = "StrBox";
	StrBox.id = "StrBox-";
	StrBox.id += i;

	//console.log(StrDB);

	//div inner HTML
	var GeneratingStrBoxHTML = "<p class='StrNameText'>";
	GeneratingStrBoxHTML += StrDB[i].Name;
	GeneratingStrBoxHTML += ", ";
	GeneratingStrBoxHTML += StrDB[i].Plaatsnaam;
	GeneratingStrBoxHTML += "</p>";
	GeneratingStrBoxHTML += "<p class='DetailText'>";
	GeneratingStrBoxHTML += StrDB[i].Intensiteit;
	GeneratingStrBoxHTML += " mvt/etm - ";
	GeneratingStrBoxHTML += StrDB[i].Ruimte;
	GeneratingStrBoxHTML += " meter";
	GeneratingStrBoxHTML += "";
	GeneratingStrBoxHTML += "</p>";
	StrBox.innerHTML = GeneratingStrBoxHTML;

	StrBox.style.fontSize = "10px";

	StrBox.appendChild(BuildPreBarLogo("0"));
	StrBox.appendChild(BuildBar("0", i));
	StrBox.appendChild(BuildPreBarLogo("1"));
	StrBox.appendChild(BuildBar("1", i));

	return StrBox;
};

function BuildPreBarLogo(type) {
	var PreLogo = document.createElement("IMG");
	PreLogo.className = "bar-logo-img";
	PreLogo.height = 10;
	PreLogo.style.marginTop = "-10px"
	PreLogo.style.display = "inline-block";
	if (type == 0) { PreLogo.src = "img/intensiteit.png" };
	if (type == 1) { PreLogo.src = "img/ruimte.png" };

	var PreLogoBox = document.createElement("div");
	PreLogoBox.style.width = "35px";
	//PreLogoBox.style.height = "10px";
	PreLogoBox.style.textAlign = "center"
	PreLogoBox.style.display = "inline-block";
	// PreLogoBox.style.fontSize = "10px"
	PreLogoBox.appendChild(PreLogo);

	return PreLogoBox;
}


function MatrixHoverBox(i) {
	var Box = BuildStrBox(i)
	var css = "";
	Box.style.cssText += MatrixItemPos[i];
	Box.style.cssText += css;
	Box.id = "MatrixItemHovering"
	Box.onmouseleave = MatrixHoverBoxRemove;
	document.getElementById("Matrix").appendChild(Box);
	console.log("Adding div of Street");
	//document.getElementById("Matrix").onmouseover = MatrixHoverBoxRemove;
};

function MatrixHoverBoxRemove() {
	var ID = "MatrixItemHovering";
	while (document.getElementById(ID)) {
		document.getElementById(ID).remove();
		console.log("Remove div of Streets");
	}
};

function GenerateMatrixItemPosDB() {
	for (i in StrDB) {
		//calc x and y position
		var HorTrans = Math.round(((StrDB[i].Ruimte / Biggest.Ruimte) * MatrixWidthCalced) * 0.9 - (vw * 0.07));
		var VertTrans = Math.round((((Biggest.Intensiteit - StrDB[i].Intensiteit) / Biggest.Intensiteit) * MatrixHightCalced) * 0.9);

		//build css for positioning
		var MatrixItemPosCalc = "";
		MatrixItemPosCalc += "transform: translate("
		MatrixItemPosCalc += HorTrans;
		MatrixItemPosCalc += "px, "
		MatrixItemPosCalc += VertTrans;
		MatrixItemPosCalc += "px);"

		//Set the possition of this specific item to the global var
		MatrixItemPos[i] = MatrixItemPosCalc;
	}

	//console.log("Item position for matirx calculated");
	//console.log(MatrixItemPos);
	return true;
};


// making animations using jQuery! :)
$(document).ready(function () {
	var GoDownTriangle = $(".GoDown");
	GoDownTriangle.fadeIn(250);
	GoDownTriangle.animate({opacity: '0.4'}, 500);
	// GoDownTriangle.fadeOut(1000);
	GoDownTriangle.animate({opacity: '1'}, 500);

	//$(".GoDown").animate({display: 'block', opacity: '0.4'}, "slow");
	// div.animate({ opacity: '0.4' }, "slow");
	// div.animate({ width: '300px', opacity: '0.8' }, "slow");
	// div.animate({ height: '100px', opacity: '0.4' }, "slow");
	// div.animate({ width: '100px', opacity: '0.8' }, "slow");
});

































// function MatrixItemPosCal(i) {
// 	//calc x and y position
// 	var HorTrans = ((StrDB[i].Ruimte / Biggest.Ruimte) * MatrixWidthCalced) * 0.9 - (vw * 0.07);
// 	var VertTrans = (((Biggest.Intensiteit - StrDB[i].Intensiteit) / Biggest.Intensiteit) * MatrixHightCalced) * 0.9;

// 	//build css for positioning
// 	var MatrixItemPosCal = "";
// 	MatrixItemPosCal += "transform: translate("
// 	MatrixItemPosCal += HorTrans;
// 	MatrixItemPosCal += "px, "
// 	MatrixItemPosCal += VertTrans;
// 	MatrixItemPosCal += "px);"
// 	//console.log(MatrixItemPosCal)

// 	return MatrixItemPosCal;
// };