"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Minus, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

const products = [
  {
    id: 1,
    name: "Premium Clay Bricks",
    description: "High-quality clay bricks for construction, perfect for walls and facades",
    price: 0.75,
    unit: "per piece",
    image: "/placeholder.svg?height=300&width=300",
    category: "breaks",
    inStock: true,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "Portland Cement (50kg)",
    description: "Premium grade cement for all construction needs, suitable for foundations and structural work",
    price: 12.99,
    unit: "per bag",
    image: "/placeholder.svg?height=300&width=300",
    category: "cement",
    inStock: true,
    rating: 4.9,
    reviews: 208,
  },
  {
    id: 3,
    name: "Steel Rods (10mm)",
    description: "Durable steel rods for reinforcement, high tensile strength for structural integrity",
    price: 8.5,
    unit: "per rod",
    image: "/placeholder.svg?height=300&width=300",
    category: "rods",
    inStock: true,
    rating: 4.7,
    reviews: 95,
  },
  {
    id: 4,
    name: "Steel Rods (12mm)",
    description: "Heavy-duty steel rods for structural support, ideal for columns and beams",
    price: 10.75,
    unit: "per rod",
    image: "/placeholder.svg?height=300&width=300",
    category: "rods",
    inStock: true,
    rating: 4.8,
    reviews: 112,
  },
  {
    id: 5,
    name: "Crushed Stone Aggregate",
    description: "Chips rock for concrete mixing and landscaping, uniform size for consistent results",
    price: 45.99,
    unit: "per ton",
    image: "/placeholder.svg?height=300&width=300",
    category: "chips rock",
    inStock: true,
    rating: 4.6,
    reviews: 78,
  },
  {
    id: 6,
    name: "Fine River Sand",
    description: "Clean river sand for construction and masonry, washed and screened for quality",
    price: 35.5,
    unit: "per ton",
    image: "/placeholder.svg?height=300&width=300",
    category: "sand",
    inStock: true,
    rating: 4.7,
    reviews: 86,
  },
  {
    id: 7,
    name: "White Cement (25kg)",
    description: "Fine white cement for decorative finishes, perfect for tiles and ornamental work",
    price: 18.99,
    unit: "per bag",
    image: "/placeholder.svg?height=300&width=300",
    category: "cement",
    inStock: true,
    rating: 4.9,
    reviews: 64,
  },
  {
    id: 8,
    name: "Solid Concrete Blocks",
    description: "Solid concrete blocks for walls and foundations, high compression strength",
    price: 2.25,
    unit: "per block",
    image: "/placeholder.svg?height=300&width=300",
    category: "breaks",
    inStock: true,
    rating: 4.8,
    reviews: 102,
  },
]

export default function ProductGrid() {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [quantities, setQuantities] = useState<Record<number, number>>(
    products.reduce((acc, product) => ({ ...acc, [product.id]: 1 }), {}),
  )

  const handleQuantityChange = (productId: number, amount: number) => {
    setQuantities((prev) => {
      const newQuantity = Math.max(1, (prev[productId] || 1) + amount)
      return { ...prev, [productId]: newQuantity }
    })
  }

  const handleAddToCart = (product: any) => {
    addToCart({
      ...product,
      quantity: quantities[product.id],
    })

    toast({
      title: "Added to cart",
      description: `Rs {quantities[product.id]} × Rs {product.name} added to your cart`,
      duration: 3000,
    })
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow">
          <div className="aspect-square relative">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {product.inStock ? (
              <Badge className="absolute top-3 right-3 bg-green-500">In Stock</Badge>
            ) : (
              <Badge variant="outline" className="absolute top-3 right-3 bg-red-500 text-white">
                Out of Stock
              </Badge>
            )}
          </div>
          <CardContent className="p-4">
            <div className="flex items-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`h-4 w-4 Rs {star <= Math.round(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
            </div>
            <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
            <div className="mt-3 flex justify-between items-center">
              <p className="font-bold text-lg text-orange-600">
                Rs {product.price.toFixed(2)} <span className="text-sm font-normal text-gray-500">{product.unit}</span>
              </p>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex flex-col gap-3">
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-none text-gray-600"
                onClick={() => handleQuantityChange(product.id, -1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="flex-1 text-center">{quantities[product.id] || 1}</div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-none text-gray-600"
                onClick={() => handleQuantityChange(product.id, 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button
              className="w-full bg-orange-600 hover:bg-orange-700"
              onClick={() => handleAddToCart(product)}
              disabled={!product.inStock}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
