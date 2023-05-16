var url = new URL(window.location.href);
url.port = 8080;
url.pathname = '/';
window.endpoint = {url:url.toString()};
