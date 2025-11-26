import { useState } from 'react'

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

function Header({ onNavigate, currentPage }: HeaderProps) {

    const menuItems = [
        { name: 'Home', page: 'home' },
        { name: 'Test Activity', page: 'test-activity' },
        { name: 'First Activity', page: 'first-activity' },
        { name: 'Second Activity', page: 'second-activity' },
        { name: 'State Management', page: 'state-management' },
    ]

  const [accountMenuOpen, setAccountMenuOpen] = useState(false)

  const handleNavClick = (page: string, event: React.MouseEvent) => {
    event.preventDefault()
    onNavigate(page)
    if (page === 'account') {
      setAccountMenuOpen(!accountMenuOpen)
    } else {
      setAccountMenuOpen(false)
    }
  }
    
    return(
    <header>
        <nav>
            <ul>
                {menuItems.map(item => (
                    <li key={item.page}>
                        <a href={`/${item.page}`} 
                           onClick={(e) => handleNavClick(item.page, e)} 
                           className={currentPage === item.page ? "active" : ""}>
                            {item.name}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    </header>
    )
}

export default Header