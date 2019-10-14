function goTo(destination) {
	switch (destination) {
		case "contact":
			window.location.href = "contact.html";
			break;
		case "achtergrond":
			window.location.href = "achtergrond.html";
			break;
		case "home":
			window.location.href = "index.html";
			break;
		default:
			window.location.href = "index.html";
			break;
	}
}