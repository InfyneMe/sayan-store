"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Package } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function OrderDetailsPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("id")
  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    if (!orderId) return

    // In a real app, you would fetch this from your backend
    const orders = JSON.parse(localStorage.getItem("orders") || "[]")
    const foundOrder = orders.find((o: any) => o.id === orderId)

    if (foundOrder) {
      setOrder(foundOrder)
    }
  }, [orderId])

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="text-gray-500 mb-8">We couldn't find the order you're looking for.</p>
          <Link href="/history">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Order History
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex items-center mb-6">
        <Link href="/history">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Order History
          </Button>
        </Link>
        <h1 className="text-2xl font-bold ml-4">Order Details</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Order {order.id}</CardTitle>
                <Badge
                  variant={
                    order.status === "Delivered" ? "default" : order.status === "Shipped" ? "secondary" : "outline"
                  }
                >
                  {order.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Items</h3>
                  <ul className="divide-y">
                    {order.items.map((item: any) => (
                      <li key={item.id} className="py-3 flex items-center">
                        <div className="w-12 h-12 relative mr-3">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover rounded"
                            sizes="48px"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-500">
                            Rs {item.price.toFixed(2)} x {item.quantity}
                          </p>
                        </div>
                        <div className="text-right font-medium">Rs {(item.price * item.quantity).toFixed(2)}</div>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Order Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal</span>
                      <span>Rs {order.totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>Rs {order.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/track?id=Rs {order.id}`} className="w-full">
                <Button className="w-full">
                  <Package className="mr-2 h-4 w-4" />
                  Track Order
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm text-gray-500">Name</h3>
                  <p>{order.customerInfo.name}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Email</h3>
                  <p>{order.customerInfo.email}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Phone</h3>
                  <p>{order.customerInfo.phone}</p>
                </div>
                <Separator />
                <div>
                  <h3 className="text-sm text-gray-500">Shipping Address</h3>
                  <p>{order.customerInfo.address}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Order Date</h3>
                  <p>{new Date(order.date).toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
