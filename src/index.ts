
console.log("YourSDK loaded");

(function(){
  // Auto init
  const scriptEl = document.currentScript;
  const siteId = scriptEl?.getAttribute("data-site-id") || "default";

  // Example DOM injection
  const div = document.createElement("div");
  div.innerHTML = "SDK Loaded for site: " + siteId;
  document.body.appendChild(div);
})();
