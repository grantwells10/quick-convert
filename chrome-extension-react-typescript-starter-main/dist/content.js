function createPopup(e,t){var n=document.createElement("div");n.style.position="fixed",n.style.top=t.top-50+"px",n.style.left=t.left+"px",n.style.backgroundColor="#fff",n.style.border="1px solid #000",n.style.padding="10px";var o=document.createElement("div");return o.textContent=e,n.appendChild(o),n.id="myPopup",n}console.log("[Content] this is content script"),document.addEventListener("mouseup",(function(e){var t=window.getSelection(),n=t.toString().trim();if(console.log("[Content] selection: "+t),n&&""!==n){const e=createPopup(n,t.getRangeAt(0).getBoundingClientRect());document.body.appendChild(e),document.addEventListener("mousedown",(function(t){e.contains(t.target)||(e.parentNode.removeChild(e),document.removeEventListener("mousedown",arguments.callee))}))}}));