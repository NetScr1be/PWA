// main.js
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// List of Iconoir icons and their URLs
var icons = [
    { name: 'icon1', url: 'https://iconoir.com/icons/icon1' },
    { name: 'icon2', url: 'https://iconoir.com/icons/icon2' },
    // Add more icons here...
];

// Function to create a list of icons
function createIconList() {
    var iconList = document.createElement('ul');

    icons.forEach(function(icon) {
        var listItem = document.createElement('li');
        var link = document.createElement('a');
        link.href = icon.url;
        link.textContent = icon.name;
        link.download = icon.name + '.svg'; // This will trigger a download when the link is clicked
        listItem.appendChild(link);
        iconList.appendChild(listItem);
    });

    return iconList;
}

// Add the icon list to the body when the page loads
window.addEventListener('load', function() {
    document.body.appendChild(createIconList());
});