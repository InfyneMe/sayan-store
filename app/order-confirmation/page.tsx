"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle2, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function OrderConfirmationPage() {
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
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="text-gray-500 mb-8">We couldn't find the order you're looking for.</p>
          <Link href="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <Card className="border-green-200 bg-green-50">
        <CardHeader className="text-center pb-2">
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600 mb-6">
            Thank you for your order. We've received your purchase request and will process it shortly.
          </p>

          <div className="bg-white rounded-lg p-4 mb-6">
            <h3 className="font-medium mb-2">Order Details</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-500">Order ID:</div>
              <div className="text-right font-medium">{order.id}</div>

              <div className="text-gray-500">Date:</div>
              <div className="text-right">{new Date(order.date).toLocaleDateString()}</div>

              <div className="text-gray-500">Total Amount:</div>
              <div className="text-right font-medium">Rs {order.totalPrice.toFixed(2)}</div>

              <div className="text-gray-500">Status:</div>
              <div className="text-right">
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
                  {order.status}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <h3 className="font-medium mb-2">Delivery Information</h3>
            <div className="text-sm text-left">
              <p>
                <span className="text-gray-500">Name:</span> {order.customerInfo.name}
              </p>
              <p>
                <span className="text-gray-500">Email:</span> {order.customerInfo.email}
              </p>
              <p>
                <span className="text-gray-500">Phone:</span> {order.customerInfo.phone}
              </p>
              <p>
                <span className="text-gray-500">Address:</span> {order.customerInfo.address}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Link href="/track">
            <Button variant="outline">Track Order</Button>
          </Link>
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
