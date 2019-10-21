function goTo(destination) {
    switch (destination) {
        case "contact":
            window.location.href = "contact.html";
            break;
        case "index":
            window.location.href = "index.html#MatrixContainer";
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