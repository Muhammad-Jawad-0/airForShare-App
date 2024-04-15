
function ThemeButton({ disabled ,tittle , onClick}) {
  return (
    <button style={{borderColor : "disabled" && "#a1a3a1"}} disabled={disabled} className="theme-btn" onClick={onClick}>
        {tittle}
    </button>
  )
}

export default ThemeButton;
