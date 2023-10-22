export default function Header({children}) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      {children}
    </header>
  )
}
