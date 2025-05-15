"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Package, FileText, Download, Truck, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import MainNavigation from "@/components/main-navigation"
import { CartProvider } from "@/components/cart-provider"

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  useEffect(() => {
    // In a real app, you would fetch this from your backend
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    setOrders(savedOrders.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()))

    // Set the first order as selected by default
    if (savedOrders.length > 0) {
      setSelectedOrder(savedOrders[0])
    }
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Delivered":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            <CheckCircle className="mr-1 h-3 w-3" />
            Delivered
          </Badge>
        )
      case "Shipped":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
            <Truck className="mr-1 h-3 w-3" />
            Shipped
          </Badge>
        )
      default:
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            <Package className="mr-1 h-3 w-3" />
            Processing
          </Badge>
        )
    }
  }

  if (orders.length === 0) {
    return (
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <MainNavigation />
          <div className="container mx-auto px-4 py-12 max-w-3xl">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold mb-4">No Order History</h1>
              <p className="text-gray-500 mb-8">You haven't placed any orders yet.</p>
              <Link href="/products">
                <Button className="bg-orange-600 hover:bg-orange-700">Start Shopping</Button>
              </Link>
            </div>
          </div>
        </div>
      </CartProvider>
    )
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <MainNavigation />

        <main className="container mx-auto px-4 py-8 max-w-6xl">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Order History</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Past Orders</CardTitle>
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
                          {getStatusBadge(order.status)}
                        </div>
                        <div className="mt-2 flex justify-between">
                          <span className="text-sm text-gray-500">{order.items.length} items</span>
                          <span className="font-medium">Rs {order.totalPrice.toFixed(2)}</span>
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
                    <div className="flex justify-between items-center">
                      <CardTitle>Order Details</CardTitle>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          <span className="hidden sm:inline">Invoice</span>
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Download className="h-4 w-4" />
                          <span className="hidden sm:inline">Receipt</span>
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="summary">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="summary">Summary</TabsTrigger>
                        <TabsTrigger value="items">Items</TabsTrigger>
                        <TabsTrigger value="tracking">Tracking</TabsTrigger>
                      </TabsList>
                      <TabsContent value="summary" className="pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-medium mb-3">Order Information</h3>
                            <div className="space-y-3 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-500">Order ID:</span>
                                <span className="font-medium">{selectedOrder.id}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Date Placed:</span>
                                <span>{new Date(selectedOrder.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Status:</span>
                                <span>{getStatusBadge(selectedOrder.status)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Total Items:</span>
                                <span>{selectedOrder.items.length}</span>
                              </div>
                              {selectedOrder.status === "Delivered" && (
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Delivered On:</span>
                                  <span>{new Date(selectedOrder.deliveredDate).toLocaleDateString()}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-medium mb-3">Payment & Shipping</h3>
                            <div className="space-y-3 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-500">Payment Method:</span>
                                <span>Credit Card (****1234)</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Subtotal:</span>
                                <span>Rs {selectedOrder.totalPrice.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Shipping:</span>
                                <span>Free</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Tax:</span>
                                <span>Rs {(selectedOrder.totalPrice * 0.08).toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between font-medium">
                                <span>Total:</span>
                                <span>Rs {(selectedOrder.totalPrice * 1.08).toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Separator className="my-6" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-medium mb-3">Shipping Address</h3>
                            <div className="p-4 bg-gray-50 rounded-lg">
                              <p className="font-medium">{selectedOrder.customerInfo.name}</p>
                              <p>{selectedOrder.customerInfo.address}</p>
                              <p>{selectedOrder.customerInfo.phone}</p>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-medium mb-3">Contact Information</h3>
                            <div className="p-4 bg-gray-50 rounded-lg">
                              <p>
                                <span className="text-gray-500">Email:</span> {selectedOrder.customerInfo.email}
                              </p>
                              <p>
                                <span className="text-gray-500">Phone:</span> {selectedOrder.customerInfo.phone}
                              </p>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="items" className="pt-4">
                        <div className="space-y-4">
                          {selectedOrder.items.map((item: any, index: number) => (
                            <div key={index} className="flex items-center p-4 bg-white border rounded-lg">
                              <div className="w-16 h-16 relative mr-4 bg-gray-100 rounded">
                                <Image
                                  src={`/placeholder.svg?height=64&width=64`}
                                  alt={item.name}
                                  fill
                                  className="object-cover rounded"
                                  sizes="64px"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-sm text-gray-500">
                                  Rs {item.price.toFixed(2)} × {item.quantity}
                                </p>
                              </div>
                              <div className="text-right font-medium">Rs {(item.price * item.quantity).toFixed(2)}</div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-500">Subtotal</span>
                            <span>Rs {selectedOrder.totalPrice.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-500">Shipping</span>
                            <span>Free</span>
                          </div>
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-500">Tax (8%)</span>
                            <span>Rs {(selectedOrder.totalPrice * 0.08).toFixed(2)}</span>
                          </div>
                          <Separator className="my-2" />
                          <div className="flex justify-between font-medium">
                            <span>Total</span>
                            <span>Rs {(selectedOrder.totalPrice * 1.08).toFixed(2)}</span>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="tracking" className="pt-4">
                        <div className="relative">
                          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 z-0"></div>

                          {selectedOrder.trackingEvents.map((event: any, index: number) => (
                            <div key={index} className="relative z-10 flex items-start mb-8">
                              <div
                                className={`flex items-center justify-center w-12 h-12 rounded-full Rs {
                                  event.status === "Delivered"
                                    ? "bg-green-100 text-green-600"
                                    : event.status === "Shipped" || event.status === "Out for Delivery"
                                      ? "bg-purple-100 text-purple-600"
                                      : "bg-yellow-100 text-yellow-600"
                                }`}
                              >
                                {event.status === "Delivered" ? (
                                  <CheckCircle className="h-6 w-6" />
                                ) : event.status === "Shipped" || event.status === "Out for Delivery" ? (
                                  <Truck className="h-6 w-6" />
                                ) : (
                                  <Package className="h-6 w-6" />
                                )}
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

                        {selectedOrder.status !== "Delivered" && (
                          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h3 className="font-medium text-blue-800 mb-1">Estimated Delivery</h3>
                            <p className="text-sm text-blue-700">
                              Your order is expected to arrive by{" "}
                              <span className="font-medium">
                                {new Date(selectedOrder.estimatedDelivery).toLocaleDateString()}
                              </span>
                            </p>
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">Select an order to view its details</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/products">
              <Button className="bg-orange-600 hover:bg-orange-700">
                Continue Shopping
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
