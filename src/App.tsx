import React, { useState } from 'react'
import './styles/bayer-theme.css'
import { ShoppingCart, Menu, X, Eye, Award, Truck, Shield, Phone, Mail, MapPin, Clock, Trash2, Plus, Minus, Calendar, User, CheckCircle, Home, Package, TestTube, Info, MessageSquare } from 'lucide-react'

interface Product {
  id: number
  name: string
  price: number
  category: string
  image: string
  description: string
  features: string[]
}

interface CartItem {
  product: Product
  quantity: number
}

interface BookingForm {
  name: string
  email: string
  phone: string
  date: string
  time: string
  message: string
}

const products: Product[] = [
  {
    id: 1,
    name: "Classic Aviator Gold",
    price: 189,
    category: "Sunglasses",
    image: "https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Timeless aviator style with premium UV protection lenses",
    features: ["UV400 Protection", "Polarized Lenses", "Metal Frame"]
  },
  {
    id: 2,
    name: "Modern Round Titanium",
    price: 159,
    category: "Prescription",
    image: "https://images.pexels.com/photos/1627639/pexels-photo-1627639.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Contemporary round frames with ultra-lightweight titanium",
    features: ["Titanium Frame", "Anti-Glare Coating", "Adjustable Nose Pads"]
  },
  {
    id: 3,
    name: "Executive Square Black",
    price: 219,
    category: "Prescription",
    image: "https://images.pexels.com/photos/947885/pexels-photo-947885.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Professional square frames perfect for business settings",
    features: ["Acetate Frame", "Blue Light Filter", "Spring Hinges"]
  },
  {
    id: 4,
    name: "Sport Performance Pro",
    price: 249,
    category: "Sports",
    image: "https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "High-performance sports eyewear with impact resistance",
    features: ["Impact Resistant", "Non-Slip Grip", "Wraparound Design"]
  },
  {
    id: 5,
    name: "Vintage Cat Eye Rose",
    price: 179,
    category: "Sunglasses",
    image: "https://images.pexels.com/photos/1162519/pexels-photo-1162519.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Retro cat-eye design with modern comfort and style",
    features: ["Vintage Design", "Gradient Lenses", "Comfortable Fit"]
  },
  {
    id: 6,
    name: "Minimalist Rimless",
    price: 299,
    category: "Prescription",
    image: "https://images.pexels.com/photos/1627639/pexels-photo-1627639.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Ultra-lightweight rimless design for maximum comfort",
    features: ["Rimless Design", "Featherweight", "Scratch Resistant"]
  },
  {
    id: 7,
    name: "Designer Wayfarer",
    price: 199,
    category: "Sunglasses",
    image: "https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Classic wayfarer style with contemporary updates",
    features: ["Iconic Style", "100% UV Protection", "Durable Frame"]
  },
  {
    id: 8,
    name: "Blue Light Blocker",
    price: 139,
    category: "Computer",
    image: "https://images.pexels.com/photos/1627639/pexels-photo-1627639.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Specialized lenses to reduce digital eye strain",
    features: ["Blue Light Filter", "Anti-Fatigue", "Clear Lenses"]
  },
  {
    id: 9,
    name: "Luxury Oversized",
    price: 329,
    category: "Sunglasses",
    image: "https://images.pexels.com/photos/1527389/pexels-photo-1527389.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Statement oversized frames with premium materials",
    features: ["Oversized Style", "Premium Acetate", "Designer Look"]
  }
]

const eyeglassBrands = [
  "Ray-Ban", "Oakley", "Prada", "Gucci", "Tom Ford", 
  "Versace", "Dolce & Gabbana", "Persol", "Maui Jim", "Costa Del Mar",
  "Warby Parker", "Oliver Peoples", "Cartier", "Dior", "Burberry",
  "Ralph Lauren", "Giorgio Armani", "Michael Kors", "Kate Spade", "Coach"
]

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: ''
  })
  const [bookingSubmitted, setBookingSubmitted] = useState(false)

  const categories = ["All", "Prescription", "Sunglasses", "Sports", "Computer"]

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  const addToCart = (productId: number) => {
    const product = products.find(p => p.id === productId)
    if (!product) return

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === productId)
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevItems, { product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId))
  }

  const updateQuantity = (productId: number, change: number) => {
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item.product.id === productId) {
          const newQuantity = item.quantity + change
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item
        }
        return item
      }).filter(item => item.quantity > 0)
    })
  }

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  }

  const scrollToSection = (sectionId: string) => {
    setShowCart(false)
    setMobileMenuOpen(false)
    setSidebarOpen(false)
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setBookingSubmitted(true)
    setTimeout(() => {
      setBookingSubmitted(false)
      setBookingForm({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        message: ''
      })
    }, 5000)
  }

  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setBookingForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen lmnt-theme-background-bg">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full w-80 lmnt-theme-primary-bg lmnt-theme-on-primary shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b lmnt-theme-divider-footer">
            <div className="flex items-center space-x-3">
              <Eye className="w-8 h-8 lmnt-theme-secondary" />
              <div>
                <span className="text-xl font-bold block">Vasan Eye Care</span>
                <span className="text-xs opacity-80">Premium Eyewear</span>
              </div>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="p-2 hover:lmnt-theme-secondary transition-colors rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 overflow-y-auto p-6">
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('home')}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:lmnt-theme-secondary-bg hover:lmnt-theme-on-secondary transition-colors text-left"
                >
                  <Home className="w-5 h-5" />
                  <span className="font-medium">Home</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('products')}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:lmnt-theme-secondary-bg hover:lmnt-theme-on-secondary transition-colors text-left"
                >
                  <Package className="w-5 h-5" />
                  <span className="font-medium">Collection</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('eye-testing')}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:lmnt-theme-secondary-bg hover:lmnt-theme-on-secondary transition-colors text-left"
                >
                  <TestTube className="w-5 h-5" />
                  <span className="font-medium">Free Eye Test</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:lmnt-theme-secondary-bg hover:lmnt-theme-on-secondary transition-colors text-left"
                >
                  <Award className="w-5 h-5" />
                  <span className="font-medium">Services</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:lmnt-theme-secondary-bg hover:lmnt-theme-on-secondary transition-colors text-left"
                >
                  <Info className="w-5 h-5" />
                  <span className="font-medium">About</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:lmnt-theme-secondary-bg hover:lmnt-theme-on-secondary transition-colors text-left"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span className="font-medium">Contact</span>
                </button>
              </li>
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-6 border-t lmnt-theme-divider-footer">
            <div className="lmnt-theme-secondary-bg lmnt-theme-on-secondary p-4 rounded-lg text-center">
              <p className="text-sm font-semibold mb-2">Need Help?</p>
              <p className="text-xs mb-3 opacity-90">Contact our support team</p>
              <a 
                href="tel:5551234567" 
                className="text-sm font-bold hover:opacity-80 transition-opacity"
              >
                (555) 123-4567
              </a>
            </div>
          </div>
        </div>
      </aside>

      {/* Header */}
      <header className="lmnt-theme-primary-bg lmnt-theme-on-primary shadow-lg sticky top-0 z-30">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              {/* Hamburger Menu Button */}
              <button 
                onClick={() => setSidebarOpen(true)}
                className="p-2 hover:lmnt-theme-secondary transition-colors rounded-lg"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              <Eye className="w-10 h-10 lmnt-theme-secondary" />
              <div>
                <span className="text-2xl font-bold block">Vasan Eye Care</span>
                <span className="text-xs opacity-80">Premium Eyewear</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="hover:lmnt-theme-secondary transition-colors font-medium">Home</button>
              <button onClick={() => scrollToSection('products')} className="hover:lmnt-theme-secondary transition-colors font-medium">Collection</button>
              <button onClick={() => scrollToSection('eye-testing')} className="hover:lmnt-theme-secondary transition-colors font-medium">Free Eye Test</button>
              <button onClick={() => scrollToSection('services')} className="hover:lmnt-theme-secondary transition-colors font-medium">Services</button>
              <button onClick={() => scrollToSection('about')} className="hover:lmnt-theme-secondary transition-colors font-medium">About</button>
              <button onClick={() => scrollToSection('contact')} className="hover:lmnt-theme-secondary transition-colors font-medium">Contact</button>
              <button 
                onClick={() => setShowCart(!showCart)}
                className="relative p-2 hover:lmnt-theme-secondary transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 lmnt-theme-secondary-bg lmnt-theme-on-secondary text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 hover:lmnt-theme-secondary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-2 border-t lmnt-theme-divider-primary">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left py-2 hover:lmnt-theme-secondary transition-colors">Home</button>
              <button onClick={() => scrollToSection('products')} className="block w-full text-left py-2 hover:lmnt-theme-secondary transition-colors">Collection</button>
              <button onClick={() => scrollToSection('eye-testing')} className="block w-full text-left py-2 hover:lmnt-theme-secondary transition-colors">Free Eye Test</button>
              <button onClick={() => scrollToSection('services')} className="block w-full text-left py-2 hover:lmnt-theme-secondary transition-colors">Services</button>
              <button onClick={() => scrollToSection('about')} className="block w-full text-left py-2 hover:lmnt-theme-secondary transition-colors">About</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-2 hover:lmnt-theme-secondary transition-colors">Contact</button>
              <button 
                onClick={() => {
                  setShowCart(!showCart)
                  setMobileMenuOpen(false)
                }}
                className="block w-full text-left py-2 hover:lmnt-theme-secondary transition-colors"
              >
                Cart ({getTotalItems()})
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* Shopping Cart Overlay */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-end">
          <div className="lmnt-theme-surface-bg w-full max-w-2xl h-full overflow-y-auto shadow-2xl">
            <div className="sticky top-0 lmnt-theme-primary-bg lmnt-theme-on-primary p-6 flex justify-between items-center z-10">
              <h2 className="text-3xl font-bold">Shopping Cart</h2>
              <button 
                onClick={() => setShowCart(false)}
                className="p-2 hover:lmnt-theme-secondary transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingCart className="w-24 h-24 lmnt-theme-on-surface opacity-20 mx-auto mb-6" />
                  <h3 className="lmnt-theme-primary text-2xl font-bold mb-2">Your cart is empty</h3>
                  <p className="lmnt-theme-on-surface mb-8">Add some eyewear to get started!</p>
                  <button 
                    onClick={() => {
                      setShowCart(false)
                      scrollToSection('products')
                    }}
                    className="lmnt-theme-secondary-bg lmnt-theme-on-secondary px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all"
                  >
                    Browse Collection
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-6 mb-8">
                    {cartItems.map(item => (
                      <div key={item.product.id} className="lmnt-theme-surface-variant-bg rounded-xl p-4 flex gap-4">
                        <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="lmnt-theme-primary font-bold text-lg">{item.product.name}</h3>
                              <p className="lmnt-theme-secondary text-sm font-semibold">{item.product.category}</p>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.product.id)}
                              className="lmnt-theme-danger p-2 hover:opacity-80 transition-opacity"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                          <p className="lmnt-theme-on-surface text-sm mb-3">{item.product.description}</p>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3 lmnt-theme-surface-bg rounded-lg p-2">
                              <button 
                                onClick={() => updateQuantity(item.product.id, -1)}
                                className="lmnt-theme-primary hover:lmnt-theme-secondary transition-colors p-1"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="lmnt-theme-primary font-bold w-8 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.product.id, 1)}
                                className="lmnt-theme-primary hover:lmnt-theme-secondary transition-colors p-1"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="text-right">
                              <p className="lmnt-theme-secondary text-2xl font-bold">${item.product.price * item.quantity}</p>
                              <p className="lmnt-theme-on-surface text-xs">${item.product.price} each</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cart Summary */}
                  <div className="border-t-2 lmnt-theme-divider-primary pt-6">
                    <div className="lmnt-theme-surface-variant-bg rounded-xl p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="lmnt-theme-on-surface text-lg">Subtotal ({getTotalItems()} items)</span>
                        <span className="lmnt-theme-primary text-xl font-bold">${getTotalPrice()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="lmnt-theme-on-surface text-lg">Shipping</span>
                        <span className="lmnt-theme-success text-xl font-bold">FREE</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="lmnt-theme-on-surface text-lg">Tax (Est.)</span>
                        <span className="lmnt-theme-primary text-xl font-bold">${(getTotalPrice() * 0.08).toFixed(2)}</span>
                      </div>
                      <div className="border-t-2 lmnt-theme-divider-primary pt-4 flex justify-between items-center">
                        <span className="lmnt-theme-primary text-2xl font-bold">Total</span>
                        <span className="lmnt-theme-secondary text-3xl font-bold">${(getTotalPrice() * 1.08).toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      <button className="w-full lmnt-theme-secondary-bg lmnt-theme-on-secondary py-4 rounded-lg text-lg font-bold hover:opacity-90 transition-all transform hover:scale-105 shadow-lg">
                        Proceed to Checkout
                      </button>
                      <button 
                        onClick={() => {
                          setShowCart(false)
                          scrollToSection('products')
                        }}
                        className="w-full lmnt-theme-surface-variant-bg lmnt-theme-primary py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-all"
                      >
                        Continue Shopping
                      </button>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                      <div>
                        <Shield className="w-8 h-8 lmnt-theme-success mx-auto mb-2" />
                        <p className="text-xs lmnt-theme-on-surface">Secure Payment</p>
                      </div>
                      <div>
                        <Truck className="w-8 h-8 lmnt-theme-success mx-auto mb-2" />
                        <p className="text-xs lmnt-theme-on-surface">Free Shipping</p>
                      </div>
                      <div>
                        <Award className="w-8 h-8 lmnt-theme-success mx-auto mb-2" />
                        <p className="text-xs lmnt-theme-on-surface">1 Year Warranty</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="relative h-[700px] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/1666304/pexels-photo-1666304.jpeg?auto=compress&cs=tinysrgb&w=1600')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white z-10">
          <div className="max-w-3xl">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              See the World<br />
              <span className="lmnt-theme-secondary">Clearly</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-90">
              Discover our curated collection of premium eyewear designed for style, comfort, and perfect vision
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollToSection('products')} className="lmnt-theme-secondary-bg lmnt-theme-on-secondary px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105 shadow-lg">
                Shop Collection
              </button>
              <button onClick={() => scrollToSection('eye-testing')} className="lmnt-theme-surface-bg lmnt-theme-primary px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105 shadow-lg">
                Book Free Eye Test
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Marquee Section */}
      <section className="py-12 lmnt-theme-surface-bg border-y-2 lmnt-theme-divider-primary overflow-hidden">
        <div className="mb-6 text-center">
          <h3 className="lmnt-theme-primary text-2xl font-bold">Premium Brands We Carry</h3>
          <p className="lmnt-theme-on-surface text-sm mt-2">Authorized dealer for world's leading eyewear brands</p>
        </div>
        
        <div className="relative">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
          
          {/* Marquee container */}
          <div className="flex animate-marquee">
            {/* First set of brands */}
            <div className="flex space-x-16 px-8 min-w-max">
              {eyeglassBrands.map((brand, index) => (
                <div 
                  key={`brand-1-${index}`}
                  className="flex items-center justify-center"
                >
                  <span className="lmnt-theme-primary text-2xl md:text-3xl font-bold whitespace-nowrap opacity-70 hover:opacity-100 hover:lmnt-theme-secondary transition-all duration-300">
                    {brand}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Duplicate set for seamless loop */}
            <div className="flex space-x-16 px-8 min-w-max">
              {eyeglassBrands.map((brand, index) => (
                <div 
                  key={`brand-2-${index}`}
                  className="flex items-center justify-center"
                >
                  <span className="lmnt-theme-primary text-2xl md:text-3xl font-bold whitespace-nowrap opacity-70 hover:opacity-100 hover:lmnt-theme-secondary transition-all duration-300">
                    {brand}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Free Eye Testing Section */}
      <section id="eye-testing" className="py-20 lmnt-theme-surface-variant-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold lmnt-theme-primary mb-4">
              Free Eye Testing
            </h2>
            <p className="lmnt-theme-on-surface text-lg max-w-2xl mx-auto">
              Schedule your complimentary comprehensive eye examination with our certified optometrists
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Benefits */}
            <div className="space-y-8">
              <div className="lmnt-theme-surface-bg p-8 rounded-2xl shadow-lg">
                <h3 className="lmnt-theme-primary font-bold text-2xl mb-6">What's Included</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="w-6 h-6 lmnt-theme-success flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="lmnt-theme-primary font-semibold text-lg mb-1">Visual Acuity Test</h4>
                      <p className="lmnt-theme-on-surface text-sm">Comprehensive assessment of your vision clarity at various distances</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="w-6 h-6 lmnt-theme-success flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="lmnt-theme-primary font-semibold text-lg mb-1">Refraction Assessment</h4>
                      <p className="lmnt-theme-on-surface text-sm">Precise measurement to determine your exact prescription needs</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="w-6 h-6 lmnt-theme-success flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="lmnt-theme-primary font-semibold text-lg mb-1">Eye Health Examination</h4>
                      <p className="lmnt-theme-on-surface text-sm">Thorough check for common eye conditions and diseases</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="w-6 h-6 lmnt-theme-success flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="lmnt-theme-primary font-semibold text-lg mb-1">Pressure Test</h4>
                      <p className="lmnt-theme-on-surface text-sm">Glaucoma screening using advanced tonometry equipment</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="w-6 h-6 lmnt-theme-success flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="lmnt-theme-primary font-semibold text-lg mb-1">Digital Retinal Imaging</h4>
                      <p className="lmnt-theme-on-surface text-sm">High-resolution images to monitor your eye health over time</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="w-6 h-6 lmnt-theme-success flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="lmnt-theme-primary font-semibold text-lg mb-1">Expert Consultation</h4>
                      <p className="lmnt-theme-on-surface text-sm">Personalized recommendations from our experienced optometrists</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lmnt-theme-primary-bg lmnt-theme-on-primary p-8 rounded-2xl shadow-lg">
                <h3 className="font-bold text-2xl mb-4">Why Choose Our Eye Testing?</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center space-x-3">
                    <Award className="w-5 h-5 lmnt-theme-secondary flex-shrink-0" />
                    <span>Certified optometrists with 15+ years experience</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Eye className="w-5 h-5 lmnt-theme-secondary flex-shrink-0" />
                    <span>State-of-the-art diagnostic equipment</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 lmnt-theme-secondary flex-shrink-0" />
                    <span>30-minute comprehensive examination</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 lmnt-theme-secondary flex-shrink-0" />
                    <span>No obligation to purchase</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Booking Form */}
            <div className="lmnt-theme-surface-bg p-10 rounded-2xl shadow-xl">
              <h3 className="lmnt-theme-primary font-bold text-3xl mb-8">Book Your Free Eye Test</h3>
              
              {bookingSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-24 h-24 lmnt-theme-success mx-auto mb-6" />
                  <h4 className="lmnt-theme-primary text-2xl font-bold mb-4">Booking Confirmed!</h4>
                  <p className="lmnt-theme-on-surface text-lg mb-2">Thank you for scheduling your eye test.</p>
                  <p className="lmnt-theme-on-surface">We'll send you a confirmation email shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  <div>
                    <label className="lmnt-theme-on-surface block mb-2 font-semibold">Full Name *</label>
                    <input 
                      type="text" 
                      name="name"
                      value={bookingForm.name}
                      onChange={handleBookingChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 lmnt-theme-primary-border focus:outline-none focus:ring-2 focus:ring-offset-2"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="lmnt-theme-on-surface block mb-2 font-semibold">Email Address *</label>
                    <input 
                      type="email" 
                      name="email"
                      value={bookingForm.email}
                      onChange={handleBookingChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 lmnt-theme-primary-border focus:outline-none focus:ring-2 focus:ring-offset-2"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="lmnt-theme-on-surface block mb-2 font-semibold">Phone Number *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={bookingForm.phone}
                      onChange={handleBookingChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 lmnt-theme-primary-border focus:outline-none focus:ring-2 focus:ring-offset-2"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="lmnt-theme-on-surface block mb-2 font-semibold">Preferred Date *</label>
                      <input 
                        type="date" 
                        name="date"
                        value={bookingForm.date}
                        onChange={handleBookingChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 rounded-lg border-2 lmnt-theme-primary-border focus:outline-none focus:ring-2 focus:ring-offset-2"
                      />
                    </div>
                    <div>
                      <label className="lmnt-theme-on-surface block mb-2 font-semibold">Preferred Time *</label>
                      <select 
                        name="time"
                        value={bookingForm.time}
                        onChange={handleBookingChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border-2 lmnt-theme-primary-border focus:outline-none focus:ring-2 focus:ring-offset-2"
                      >
                        <option value="">Select time</option>
                        <option value="09:00">9:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="16:00">4:00 PM</option>
                        <option value="17:00">5:00 PM</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="lmnt-theme-on-surface block mb-2 font-semibold">Additional Notes</label>
                    <textarea 
                      name="message"
                      value={bookingForm.message}
                      onChange={handleBookingChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border-2 lmnt-theme-primary-border focus:outline-none focus:ring-2 focus:ring-offset-2"
                      placeholder="Any specific concerns or requirements?"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full lmnt-theme-secondary-bg lmnt-theme-on-secondary py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-all transform hover:scale-105 shadow-lg"
                  >
                    Book Appointment
                  </button>
                  <p className="text-xs lmnt-theme-on-surface text-center opacity-75">
                    By booking, you agree to our terms and privacy policy
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold lmnt-theme-primary mb-4">Why Choose Vasan Eye Care</h2>
            <p className="lmnt-theme-on-surface text-lg max-w-2xl mx-auto">
              We provide comprehensive eye care services and premium eyewear solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="lmnt-theme-surface-bg p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="lmnt-theme-secondary-bg lmnt-theme-on-secondary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="w-10 h-10" />
              </div>
              <h3 className="lmnt-theme-primary font-bold text-xl mb-3">Eye Examination</h3>
              <p className="lmnt-theme-on-surface text-sm leading-relaxed">
                Comprehensive eye exams by certified optometrists using latest technology
              </p>
            </div>

            <div className="lmnt-theme-surface-bg p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="lmnt-theme-secondary-bg lmnt-theme-on-secondary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10" />
              </div>
              <h3 className="lmnt-theme-primary font-bold text-xl mb-3">Premium Quality</h3>
              <p className="lmnt-theme-on-surface text-sm leading-relaxed">
                Only the finest materials and lenses from world-renowned manufacturers
              </p>
            </div>

            <div className="lmnt-theme-surface-bg p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="lmnt-theme-secondary-bg lmnt-theme-on-secondary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="w-10 h-10" />
              </div>
              <h3 className="lmnt-theme-primary font-bold text-xl mb-3">Free Delivery</h3>
              <p className="lmnt-theme-on-surface text-sm leading-relaxed">
                Complimentary shipping on all orders with secure packaging
              </p>
            </div>

            <div className="lmnt-theme-surface-bg p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="lmnt-theme-secondary-bg lmnt-theme-on-secondary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10" />
              </div>
              <h3 className="lmnt-theme-primary font-bold text-xl mb-3">1 Year Warranty</h3>
              <p className="lmnt-theme-on-surface text-sm leading-relaxed">
                Full coverage warranty on all eyewear with free adjustments
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 lmnt-theme-surface-variant-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold lmnt-theme-primary mb-4">
              Our Premium Collection
            </h2>
            <p className="lmnt-theme-on-surface text-lg max-w-2xl mx-auto">
              Handpicked selection of designer eyewear for every style and occasion
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'lmnt-theme-secondary-bg lmnt-theme-on-secondary shadow-lg'
                    : 'lmnt-theme-surface-bg lmnt-theme-on-surface hover:shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                className="lmnt-theme-surface-bg rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2"
              >
                <div className="h-72 overflow-hidden relative group">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 lmnt-theme-secondary-bg lmnt-theme-on-secondary px-3 py-1 rounded-full text-sm font-bold">
                    ${product.price}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="lmnt-theme-primary font-bold text-xl">{product.name}</h3>
                  </div>
                  <p className="lmnt-theme-secondary text-sm font-semibold mb-3">{product.category}</p>
                  <p className="lmnt-theme-on-surface text-sm mb-4 leading-relaxed">{product.description}</p>
                  
                  <div className="mb-4">
                    <p className="text-xs lmnt-theme-on-surface font-semibold mb-2">Features:</p>
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((feature, idx) => (
                        <span key={idx} className="text-xs lmnt-theme-surface-variant-bg lmnt-theme-on-surface px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => addToCart(product.id)}
                    className="w-full lmnt-theme-primary-bg lmnt-theme-on-primary py-3 rounded-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold lmnt-theme-primary mb-6">
                About Vasan Eye Care
              </h2>
              <div className="space-y-4 lmnt-theme-on-surface text-lg leading-relaxed">
                <p>
                  For over <span className="lmnt-theme-secondary font-bold">25 years</span>, Vasan Eye Care has been at the forefront of eyewear innovation, 
                  combining cutting-edge technology with timeless design to create glasses that 
                  not only enhance your vision but complement your unique style.
                </p>
                <p>
                  Our expert opticians work with the world's leading lens manufacturers to ensure 
                  every pair of glasses we create meets the highest standards of quality and precision.
                </p>
                <p>
                  We believe that eyewear is more than just a medical necessity—it's a fashion statement, 
                  a confidence booster, and an extension of your personality.
                </p>
                <p className="lmnt-theme-primary font-semibold">
                  Visit our showroom to experience personalized service and find the perfect 
                  eyewear for your lifestyle.
                </p>
              </div>
            </div>
            <div className="h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Vasan Eye Care Showroom"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 lmnt-theme-surface-variant-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold lmnt-theme-primary mb-4">
              Visit Our Showroom
            </h2>
            <p className="lmnt-theme-on-surface text-lg max-w-2xl mx-auto">
              Experience our collection in person and get expert advice from our opticians
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="lmnt-theme-surface-bg p-10 rounded-2xl shadow-xl">
              <h3 className="lmnt-theme-primary font-bold text-3xl mb-8">Get in Touch</h3>
              <form className="space-y-6">
                <div>
                  <label className="lmnt-theme-on-surface block mb-2 font-semibold">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg border-2 lmnt-theme-primary-border focus:outline-none focus:ring-2 focus:ring-offset-2"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="lmnt-theme-on-surface block mb-2 font-semibold">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 rounded-lg border-2 lmnt-theme-primary-border focus:outline-none focus:ring-2 focus:ring-offset-2"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="lmnt-theme-on-surface block mb-2 font-semibold">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-3 rounded-lg border-2 lmnt-theme-primary-border focus:outline-none focus:ring-2 focus:ring-offset-2"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="lmnt-theme-on-surface block mb-2 font-semibold">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border-2 lmnt-theme-primary-border focus:outline-none focus:ring-2 focus:ring-offset-2"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full lmnt-theme-secondary-bg lmnt-theme-on-secondary py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-all transform hover:scale-105 shadow-lg"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div className="lmnt-theme-surface-bg p-10 rounded-2xl shadow-xl">
              <h3 className="lmnt-theme-primary font-bold text-3xl mb-8">Visit Us</h3>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 lmnt-theme-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="lmnt-theme-primary font-semibold text-lg mb-2">Address</h4>
                    <p className="lmnt-theme-on-surface leading-relaxed">
                      123 Vision Street<br />
                      Downtown Plaza, Suite 200<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 lmnt-theme-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="lmnt-theme-primary font-semibold text-lg mb-2">Phone</h4>
                    <p className="lmnt-theme-on-surface">(555) 123-4567</p>
                    <p className="lmnt-theme-on-surface text-sm opacity-75">Mon-Fri: 9AM - 7PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 lmnt-theme-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="lmnt-theme-primary font-semibold text-lg mb-2">Email</h4>
                    <p className="lmnt-theme-on-surface">info@vasaneyecare.com</p>
                    <p className="lmnt-theme-on-surface">support@vasaneyecare.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 lmnt-theme-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="lmnt-theme-primary font-semibold text-lg mb-2">Business Hours</h4>
                    <div className="lmnt-theme-on-surface space-y-1">
                      <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
                      <p>Saturday: 10:00 AM - 6:00 PM</p>
                      <p>Sunday: 11:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="lmnt-theme-footer-bg lmnt-theme-on-footer py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Eye className="w-8 h-8 lmnt-theme-secondary" />
                <span className="text-2xl font-bold">Vasan Eye Care</span>
              </div>
              <p className="text-sm opacity-80 leading-relaxed">
                Premium eyewear for discerning customers since 1998. 
                Your vision is our passion.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => scrollToSection('home')} className="hover:lmnt-theme-secondary transition-colors">Home</button></li>
                <li><button onClick={() => scrollToSection('products')} className="hover:lmnt-theme-secondary transition-colors">Collection</button></li>
                <li><button onClick={() => scrollToSection('eye-testing')} className="hover:lmnt-theme-secondary transition-colors">Free Eye Test</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:lmnt-theme-secondary transition-colors">Services</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:lmnt-theme-secondary transition-colors">About Us</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:lmnt-theme-secondary transition-colors">Contact</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li>Comprehensive Eye Exams</li>
                <li>Prescription Lenses</li>
                <li>Contact Lens Fitting</li>
                <li>Frame Adjustments</li>
                <li>Lens Replacement</li>
                <li>Sports Eyewear</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Newsletter</h4>
              <p className="text-sm opacity-80 mb-4">
                Subscribe for exclusive offers and updates
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-l-lg lmnt-theme-surface-bg lmnt-theme-on-surface focus:outline-none"
                />
                <button className="lmnt-theme-secondary-bg lmnt-theme-on-secondary px-4 py-2 rounded-r-lg font-semibold hover:opacity-90 transition-opacity">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t lmnt-theme-divider-footer pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm opacity-80">
              <p>&copy; 2024 Vasan Eye Care. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="hover:lmnt-theme-secondary transition-colors">Privacy Policy</a>
                <a href="#" className="hover:lmnt-theme-secondary transition-colors">Terms of Service</a>
                <a href="#" className="hover:lmnt-theme-secondary transition-colors">Sitemap</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App