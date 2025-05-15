import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CartProvider } from "@/components/cart-provider"
import ImageCarousel from "@/components/image-carousel"
import MainNavigation from "@/components/main-navigation"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <MainNavigation />

        <main>
          {/* Hero Section with Image Carousel */}
          <section className="relative">
            <ImageCarousel />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <div className="text-center text-white px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Loadzo</h1>
                <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
                  Premium Construction Materials for Your Projects
                </p>
                <Link href="/products">
                  <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Brand Information Section */}
          <section className="py-16 px-4 bg-white">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                Why Choose <span className="text-orange-600">BuildMart</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="border-none shadow-lg">
                  <CardContent className="pt-6">
                    <div className="rounded-full bg-orange-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-orange-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-2">Premium Quality</h3>
                    <p className="text-gray-600 text-center">
                      We source only the highest quality construction materials from trusted manufacturers to ensure
                      durability and reliability.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg">
                  <CardContent className="pt-6">
                    <div className="rounded-full bg-orange-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-orange-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-2">Competitive Pricing</h3>
                    <p className="text-gray-600 text-center">
                      We offer the best prices in the market without compromising on quality, helping you stay within
                      budget.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg">
                  <CardContent className="pt-6">
                    <div className="rounded-full bg-orange-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-orange-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-2">Fast Delivery</h3>
                    <p className="text-gray-600 text-center">
                      Our efficient logistics network ensures quick delivery of materials to your construction site when
                      you need them.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* About Us Section */}
          <section className="py-16 px-4 bg-gray-100">
            <div className="container mx-auto max-w-6xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-gray-800">About BuildMart</h2>
                  <p className="text-gray-600 mb-4">
                    BuildMart has been a trusted name in the construction industry for over 15 years. We started with a
                    simple mission: to provide high-quality construction materials at affordable prices with exceptional
                    customer service.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Today, we are proud to be the preferred supplier for contractors, builders, and DIY enthusiasts
                    across the country. Our extensive inventory includes everything from basic building materials to
                    specialized products for complex projects.
                  </p>
                  <p className="text-gray-600 mb-6">
                    At BuildMart, we understand that the success of your project depends on the quality of materials you
                    use. That's why we never compromise on quality and ensure that every product we sell meets the
                    highest industry standards.
                  </p>
                  <Link href="/products">
                    <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                      Explore Our Products
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400 opacity-90"></div>
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8">
                    <h3 className="text-2xl font-bold mb-4 text-center">Our Commitment</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <svg className="h-6 w-6 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Quality assurance on all products</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-6 w-6 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Transparent pricing with no hidden costs</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-6 w-6 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Expert advice on material selection</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-6 w-6 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Reliable delivery even to remote locations</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-6 w-6 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Dedicated customer support</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-16 px-4 bg-white">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What Our Customers Say</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="border-none shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-600 text-center italic mb-4">
                      "BuildMart has been our go-to supplier for all construction materials. Their quality is unmatched,
                      and their delivery is always on time. Highly recommended!"
                    </p>
                    <p className="text-center font-semibold">John Doe</p>
                    <p className="text-center text-sm text-gray-500">Contractor, JD Construction</p>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-600 text-center italic mb-4">
                      "As a DIY enthusiast, I appreciate the expert advice I get from BuildMart. Their staff is
                      knowledgeable and always helps me choose the right materials for my projects."
                    </p>
                    <p className="text-center font-semibold">Jane Smith</p>
                    <p className="text-center text-sm text-gray-500">DIY Enthusiast</p>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-600 text-center italic mb-4">
                      "The online ordering system is so convenient, and their tracking feature lets me know exactly when
                      my materials will arrive. BuildMart has revolutionized how we source materials."
                    </p>
                    <p className="text-center font-semibold">Robert Johnson</p>
                    <p className="text-center text-sm text-gray-500">Project Manager, RJ Builders</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 px-4 bg-orange-600 text-white">
            <div className="container mx-auto max-w-6xl text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Browse our extensive collection of premium construction materials and get everything you need delivered
                to your doorstep.
              </p>
              <Link href="/products">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </section>
        </main>

        <footer className="bg-gray-900 text-white py-12">
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
