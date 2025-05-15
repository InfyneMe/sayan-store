"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Package, Truck, CheckCircle, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import MainNavigation from "@/components/main-navigation"
import { CartProvider } from "@/components/cart-provider"

// Dummy data for orders
const dummyOrders = [
  {
    id: "ORD-1234567890",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    status: "Processing",
    progress: 25,
    items: [
      { id: 1, name: "Premium Clay Bricks", quantity: 500, price: 0.75 },
      { id: 2, name: "Portland Cement (50kg)", quantity: 10, price: 12.99 },
    ],
    totalPrice: 500 * 0.75 + 10 * 12.99,
    customerInfo: {
      name: "John Doe",
      email: "john@example.com",
      phone: "(123) 456-7890",
      address: "123 Construction Ave, Building City, BC 12345",
    },
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    trackingEvents: [
      {
        status: "Order Placed",
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        description: "Your order has been received and is being processed.",
      },
      {
        status: "Processing",
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        description: "Your order is being prepared for shipping.",
      },
    ],
  },
  {
    id: "ORD-9876543210",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    status: "Shipped",
    progress: 75,
    items: [
      { id: 5, name: "Crushed Stone Aggregate", quantity: 2, price: 45.99 },
      { id: 6, name: "Fine River Sand", quantity: 3, price: 35.5 },
    ],
    totalPrice: 2 * 45.99 + 3 * 35.5,
    customerInfo: {
      name: "John Doe",
      email: "john@example.com",
      phone: "(123) 456-7890",
      address: "123 Construction Ave, Building City, BC 12345",
    },
    estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    trackingEvents: [
      {
        status: "Order Placed",
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        description: "Your order has been received and is being processed.",
      },
      {
        status: "Processing",
        date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        description: "Your order is being prepared for shipping.",
      },
      {
        status: "Shipped",
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        description: "Your order has been shipped and is on its way to you.",
      },
    ],
  },
  {
    id: "ORD-5678901234",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    status: "Delivered",
    progress: 100,
    items: [
      { id: 3, name: "Steel Rods (10mm)", quantity: 20, price: 8.5 },
      { id: 4, name: "Steel Rods (12mm)", quantity: 15, price: 10.75 },
      { id: 7, name: "White Cement (25kg)", quantity: 5, price: 18.99 },
    ],
    totalPrice: 20 * 8.5 + 15 * 10.75 + 5 * 18.99,
    customerInfo: {
      name: "John Doe",
      email: "john@example.com",
      phone: "(123) 456-7890",
      address: "123 Construction Ave, Building City, BC 12345",
    },
    estimatedDelivery: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    deliveredDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    trackingEvents: [
      {
        status: "Order Placed",
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        description: "Your order has been received and is being processed.",
      },
      {
        status: "Processing",
        date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
        description: "Your order is being prepared for shipping.",
      },
      {
        status: "Shipped",
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        description: "Your order has been shipped and is on its way to you.",
      },
      {
        status: "Out for Delivery",
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        description: "Your order is out for delivery and will arrive today.",
      },
      {
        status: "Delivered",
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        description: "Your order has been delivered successfully.",
      },
    ],
  },
]

export default function TrackOrderPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  useEffect(() => {
    // In a real app, you would fetch this from your backend
    // For demo purposes, we'll use the dummy data
    setOrders(dummyOrders)

    // Set the first order as selected by default
    if (dummyOrders.length > 0) {
      setSelectedOrder(dummyOrders[0])
    }

    // Also save to localStorage for the order history page
    localStorage.setItem("orders", JSON.stringify(dummyOrders))
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Order Placed":
        return <Package className="h-6 w-6" />
      case "Processing":
        return <Package className="h-6 w-6" />
      case "Shipped":
        return <Truck className="h-6 w-6" />
      case "Out for Delivery":
        return <Truck className="h-6 w-6" />
      case "Delivered":
        return <CheckCircle className="h-6 w-6" />
      default:
        return <Package className="h-6 w-6" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Order Placed":
        return "bg-blue-100 text-blue-600"
      case "Processing":
        return "bg-yellow-100 text-yellow-600"
      case "Shipped":
        return "bg-purple-100 text-purple-600"
      case "Out for Delivery":
        return "bg-indigo-100 text-indigo-600"
      case "Delivered":
        return "bg-green-100 text-green-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress < 25) return "bg-blue-500"
    if (progress < 50) return "bg-yellow-500"
    if (progress < 75) return "bg-purple-500"
    if (progress < 100) return "bg-indigo-500"
    return "bg-green-500"
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <MainNavigation />

        <main className="container mx-auto px-4 py-8 max-w-6xl">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Track Your Orders</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Your Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className={`p-4 rounded-lg cursor-pointer transition-colors Rs {
                          selectedOrder?.id === order.id
                            ? "bg-orange-50 border border-orange-200"
                            : "bg-white border hover:bg-gray-50"
                        }`}
                        onClick={() => setSelectedOrder(order)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">{order.id}</h3>
                            <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                          </div>
                          <div
                            className={`px-2 py-1 text-xs font-medium rounded-full Rs {
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Shipped"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.status}
                          </div>
                        </div>
                        <div className="mt-2">
                          <Progress
                            value={order.progress}
                            className="h-2"
                            indicatorClassName={getProgressColor(order.progress)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              {selectedOrder ? (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Order Status: {selectedOrder.id}</CardTitle>
                        <p className="text-sm text-gray-500 mt-1">
                          Ordered on {new Date(selectedOrder.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div
                        className={`px-3 py-1 text-sm font-medium rounded-full Rs {
                          selectedOrder.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : selectedOrder.status === "Shipped"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {selectedOrder.status}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-8">
                      <div className="flex justify-between mb-2">
                        <div className="text-sm text-gray-500">Estimated Delivery</div>
                        <div className="font-medium">
                          {selectedOrder.status === "Delivered"
                            ? "Delivered on " + new Date(selectedOrder.deliveredDate).toLocaleDateString()
                            : new Date(selectedOrder.estimatedDelivery).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div className="text-sm text-gray-500">Total Amount</div>
                        <div className="font-medium">Rs {selectedOrder.totalPrice.toFixed(2)}</div>
                      </div>
                      <div className="flex justify-between">
                        <div className="text-sm text-gray-500">Shipping Address</div>
                        <div className="text-right">{selectedOrder.customerInfo.address}</div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <Progress
                        value={selectedOrder.progress}
                        className="h-3 mb-4"
                        indicatorClassName={getProgressColor(selectedOrder.progress)}
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Order Placed</span>
                        <span>Processing</span>
                        <span>Shipped</span>
                        <span>Delivered</span>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 z-0"></div>

                      {selectedOrder.trackingEvents.map((event: any, index: number) => (
                        <div key={index} className="relative z-10 flex items-start mb-8">
                          <div
                            className={`flex items-center justify-center w-12 h-12 rounded-full Rs {getStatusColor(
                              event.status,
                            )}`}
                          >
                            {getStatusIcon(event.status)}
                          </div>
                          <div className="ml-4">
                            <div className="flex items-center">
                              <h3 className="font-medium">{event.status}</h3>
                              <span className="text-sm text-gray-500 ml-2">
                                {new Date(event.date).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">Select an order to view its tracking details</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/history">
              <Button variant="outline" className="bg-white">
                View Complete Order History
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </main>

        <footer className="bg-gray-900 text-white py-12 mt-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">BuildMart</h3>
                <p className="text-gray-400">
                  Your one-stop shop for quality construction materials at competitive prices.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link href="/track" className="text-gray-400 hover:text-white transition-colors">
                      Track Order
                    </Link>
                  </li>
                  <li>
                    <Link href="/history" className="text-gray-400 hover:text-white transition-colors">
                      Order History
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>
                      123 Construction Ave
                      <br />
                      Building City, BC 12345
                    </span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span>(123) 456-7890</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span>info@buildmart.com</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>Monday - Friday: 8:00 AM - 6:00 PM</li>
                  <li>Saturday: 9:00 AM - 5:00 PM</li>
                  <li>Sunday: Closed</li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} BuildMart. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  )
}
