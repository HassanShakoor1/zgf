'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Drawer, IconButton, List, ListItem, ListItemText, Box } from '@mui/material'
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material'

interface NavigationProps {
  className?: string
}

export default function Navigation({ className = '' }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const navigationItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Our Goats' },
    { href: '/products', label: 'Goats for Sale' },
    { href: '/reels', label: 'Goat Reels' },
    { href: '/contact', label: 'Contact Us' },
  ]

  const isActive = (href: string) => pathname === href

  const drawer = (
    <Box sx={{ width: 280 }} role="presentation">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <img src="/logo.jpeg" alt="Zohan Goat Farm Logo" className="h-8 w-8 rounded-full object-cover mr-2" />
          <span className="text-lg font-bold bg-gradient-to-r from-yellow-600 to-cyan-600 bg-clip-text text-transparent">
            Zohan Goat Farm
          </span>
        </div>
        <IconButton onClick={handleDrawerToggle} className="text-gray-600">
          <CloseIcon />
        </IconButton>
      </div>
      <List className="pt-4">
        {navigationItems.map((item) => (
          <ListItem key={item.href} className="px-6 py-2">
            <Link 
              href={item.href} 
              className={`w-full block py-3 px-4 rounded-lg text-lg font-medium transition-all ${
                isActive(item.href)
                  ? 'bg-gradient-to-r from-yellow-100 to-cyan-100 text-cyan-700 font-semibold'
                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-cyan-50 hover:text-yellow-600'
              }`}
              onClick={handleDrawerToggle}
            >
              {item.label}
            </Link>
          </ListItem>
        ))}
      </List>
      
      {/* Contact Info in Drawer */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-r from-yellow-50 to-cyan-50 border-t">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">📞 Call us now!</p>
          <div className="space-y-1">
            <a 
              href="tel:+92-322-450-7174" 
              className="block text-base font-semibold bg-gradient-to-r from-yellow-600 to-cyan-600 bg-clip-text text-transparent"
            >
              0322 450 7174
            </a>
            <a 
              href="tel:+92-311-445-3396" 
              className="block text-base font-semibold bg-gradient-to-r from-yellow-600 to-cyan-600 bg-clip-text text-transparent"
            >
              0311 44 53396
            </a>
          </div>
          <p className="text-xs text-gray-500 mt-2">📍 Lahore, Pakistan</p>
        </div>
      </div>
    </Box>
  )

  return (
    <>
      <nav className={`bg-white shadow-lg sticky top-0 z-50 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img src="/logo.jpeg" alt="Zohan Goat Farm Logo" className="h-10 w-10 rounded-full object-cover mr-3" />
              <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-yellow-600 to-cyan-600 bg-clip-text text-transparent">
                Zohan Goat Farm
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-6">
                {navigationItems.map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className={`px-4 py-2 rounded-lg text-base font-semibold transition-all transform hover:scale-105 ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-yellow-500 to-cyan-500 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gradient-to-r hover:from-yellow-100 hover:to-cyan-100 hover:text-yellow-600'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <IconButton
                onClick={handleDrawerToggle}
                className="text-gray-700 hover:text-yellow-600 p-2"
                size="large"
              >
                <MenuIcon fontSize="large" />
              </IconButton>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 280,
            background: 'linear-gradient(135deg, #fefce8 0%, #ecfeff 50%, #ffffff 100%)'
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  )
}
