import { useState } from 'react'
import Header from './shared/Header'
import Footer from './shared/Footer'
import './App.css'
import TestActivityView from './activities/testActivity/TestActivityView'
import FirstActivityView from './activities/FirstActivity/FirstActivityView'
import SecondActivityView from './activities/SecondActivity/SecondActivityView'

function App() {

  const [currentPage, setCurrentPage] = useState('')

  const handleNavigate = (page: string) => {
    setCurrentPage(page)
  }

  const renderCurrentPage = () => {

    switch(currentPage) {
      case 'test-activity':
        return <TestActivityView />;
      case 'first-activity':
        return <FirstActivityView />;
      case 'second-activity':
        return <SecondActivityView />;
      default:
        return <div>Welcome to the Home Page</div>;
    }
  }

  return (
    <>
      <Header onNavigate={handleNavigate} currentPage={currentPage} />
      <main>
      {renderCurrentPage()}
      </main>
      <Footer />
    </>
  )
}

export default App
