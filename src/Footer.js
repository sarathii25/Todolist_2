import React from 'react'

const Footer = () => {
    const year = new Date()
  return (
    <footer>
      <h5>CopyRight &copy; {year.getFullYear()}</h5>
    </footer>
  )
}

export default Footer
