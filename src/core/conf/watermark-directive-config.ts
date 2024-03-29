import type { App } from "vue";

export default (app: App) => {
  app.directive("watermark", {
    // called when the bound element's parent component and all its children are mounted.
    mounted(el, binding, vnode, prevVnode) {
      el.style.position = "relative";
      const watermark = document.createElement("div");
      watermark.setAttribute("id", "watermark");
      watermark.classList.add("watermark");
      watermark.style.position = "absolute";
      watermark.style.top = "0";
      watermark.style.left = "0";
      watermark.style.width = "100%";
      watermark.style.height = "100%";
      watermark.style.opacity = "0.5";
      watermark.style.pointerEvents = "none";
      const canvasUrl = getCanvasUrl(binding.value);
      watermark.style.background = `url(${canvasUrl}) left top repeat`;

      el.appendChild(watermark);
    },
    // called after the parent component and all of its children have updated
    updated(el, binding, vnode, prevVnode) {
      if (binding.value !== binding.oldValue) {
        const watermark = el.querySelector(".watermark");
        const canvasUrl = getCanvasUrl(binding.value);
        watermark.style.background = `url(${canvasUrl}) left top repeat`;
      }
    },
  });
};

function getCanvasUrl(text: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 300; // default width
  canvas.height = 180; // default height
  const ctx = canvas.getContext("2d")!;
  ctx.font = "18px Arial"; // font size
  ctx.fillStyle = "gray"; // font color
  ctx.textAlign = "center";
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((-20 * Math.PI) / 180);
  ctx.fillText(text, 0, 0);
  return canvas.toDataURL("image/png");
}
