"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Menu, X, Home, Package, Truck, History } from "lucide-react"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"

export default function MainNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { totalItems } = useCart()
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-10 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-orange-600 flex items-center">
          <span className="mr-2">🏗️</span> Loadzo
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className={`font-medium transition-colors Rs {
              isActive("/") ? "text-orange-600" : "text-gray-700 hover:text-orange-600"
            }`}
          >
            Home
          </Link>
          <Link
            href="/products"
            className={`font-medium transition-colors Rs {
              isActive("/products") ? "text-orange-600" : "text-gray-700 hover:text-orange-600"
            }`}
          >
            Products
          </Link>
          <Link
            href="/track"
            className={`font-medium transition-colors Rs {
              isActive("/track") ? "text-orange-600" : "text-gray-700 hover:text-orange-600"
            }`}
          >
            Track Order
          </Link>
          <Link
            href="/history"
            className={`font-medium transition-colors Rs {
              isActive("/history") ? "text-orange-600" : "text-gray-700 hover:text-orange-600"
            }`}
          >
            Order History
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="/cart">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              href="/"
              className="flex items-center py-2 px-4 rounded-md hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="h-5 w-5 mr-3" />
              <span>Home</span>
            </Link>
            <Link
              href="/products"
              className="flex items-center py-2 px-4 rounded-md hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <Package className="h-5 w-5 mr-3" />
              <span>Products</span>
            </Link>
            <Link
              href="/track"
              className="flex items-center py-2 px-4 rounded-md hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <Truck className="h-5 w-5 mr-3" />
              <span>Track Order</span>
            </Link>
            <Link
              href="/history"
              className="flex items-center py-2 px-4 rounded-md hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <History className="h-5 w-5 mr-3" />
              <span>Order History</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
