import css from "./css/throwError.module.css"
export default function throwError(status: number, message: string) {
  const errWrapper = document.getElementById("errors-wrapper")
  if (!errWrapper) return
  const errDiv = document.createElement("div")
  errDiv.className = css.error;

  const closeBtn = document.createElement("div")
  closeBtn.className = css.closeBtn
  closeBtn.onclick = (e) => {e.stopPropagation(); e.target.parentElement.parentElement.style.display = 'none'}
  closeBtn.innerHTML = `<span className=${css.closeBtnIcon}>&times;</span>`
  errDiv.appendChild(closeBtn)

  const h1 = document.createElement("h1")
  h1.innerText = `${status}`
  errDiv.appendChild(h1)

  const p = document.createElement("p")
  p.innerText = message
  errDiv.appendChild(p)

  const line = document.createElement("div")
  line.className = css.line
  errDiv.appendChild(line)

  errWrapper.appendChild(errDiv)
  setTimeout(() => {
    errDiv.style.display = "none"
  }, 5000)

}