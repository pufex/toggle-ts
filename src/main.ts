const toggle = document.querySelector<HTMLDivElement>(".toggle")!
const toggleCircleContainer = 
toggle?.querySelector<HTMLDivElement>(".toggle__circle-container")!
const toggleCircle = toggle?.querySelector<HTMLDivElement>(".toggle__circle")!

const toggleDisabledHandler = () => {
  const body = document.querySelector("body")!;
  body.classList.remove("dark")
  if(!body.classList.contains("light"))
    body.classList.add("light")
}

const toggleEnabledHandler = () => {
  const body = document.querySelector("body")!;
  body.classList.remove("light")
  if(!body.classList.contains("dark"))
    body.classList.add("dark")
}

const handleToggleCircleGrab = (e: MouseEvent): void => {
  e.preventDefault();
  const mouseX = e.clientX;
  const width = toggleCircleContainer.offsetWidth;
  const x = toggleCircleContainer.offsetLeft

  if(mouseX < x)
    toggleCircle.style.left = "0px";
  else if(x + width < mouseX)
    toggleCircle.style.left = width.toString() + "px";
  else 
    toggleCircle.style.left = (mouseX - x).toString() + "px";
  
}

const handleToggleCircleUngrab = () => {
  window.removeEventListener("mousemove", handleToggleCircleGrab)
  window.removeEventListener("mouseup", handleToggleCircleUngrab)
  toggleCircle.style.cursor = "grab"
  toggleCircle.style.transition = "100ms left linear";

  const width = toggleCircleContainer.offsetWidth;
  const circleX = parseFloat(toggleCircle.style.left)

  if(circleX < width/2){
    toggleCircle.style.left = "0px";
    if(toggle.classList.contains("active"))
      toggle.classList.remove("active");
    toggleDisabledHandler();
  }
  else{
    toggleCircle.style.left = width.toString() + "px";
    if(!toggle.classList.contains("active"))
      toggle.classList.add("active");
    toggleEnabledHandler();
  }
}

toggleCircle?.addEventListener("mousedown", () => {
  toggleCircle.style.transition = "0ms left linear";
  toggleCircle.style.cursor = "grabbing"
  window.addEventListener("mousemove", handleToggleCircleGrab)
  window.addEventListener("mouseup", handleToggleCircleUngrab)
})

const handleToggleSwitch = () => {
  const width = toggleCircleContainer.offsetWidth;
  if(toggle.classList.contains("active")){
    toggleCircle.style.left = "0px";
    if(toggle.classList.contains("active"))
      toggle.classList.remove("active");
    toggleDisabledHandler();
  }else{
    toggleCircle.style.left = width.toString() + "px";
    if(!toggle.classList.contains("active"))
      toggle.classList.add("active");
    toggleEnabledHandler();
  }
}

toggle.addEventListener("click", (e) => {
  if(e.target != toggleCircle)
    handleToggleSwitch();
})  

