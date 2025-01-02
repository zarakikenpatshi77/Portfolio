import { Box, AppBar, Toolbar, IconButton, useScrollTrigger, Fab, Zoom } from '@mui/material'
import { Brightness4, Brightness7, KeyboardArrowUp } from '@mui/icons-material'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const ScrollTop = ({ children }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  })

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  )
}

ScrollTop.propTypes = {
  children: PropTypes.node.isRequired,
}

const NavButton = motion(Fab)
const MotionLink = motion.create('a')

const Layout = ({ children, darkMode, setDarkMode }) => {
  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <Box>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(255, 255, 255, 0.05)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', gap: 4 }}>
            {navItems.map((item) => (
              <MotionLink
                key={item.label}
                href={item.href}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  position: 'relative'
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </MotionLink>
            ))}
          </Box>
          <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* Add spacing below AppBar */}
      <Box component="main">
        {children}
      </Box>
      <ScrollTop>
        <NavButton size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </NavButton>
      </ScrollTop>
    </Box>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
}

export default Layout
