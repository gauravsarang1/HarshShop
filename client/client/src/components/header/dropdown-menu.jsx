import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { 
  User, Settings, LogOut, ShoppingBag, Heart, 
  Clock, Package, CreditCard, MapPin, Gift, 
  Truck, Shield 
} from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const DropDown = ({ userData, handleLogout }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button variant="ghost" className="relative h-12 w-12 rounded-full shadow-lg bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 hover:from-indigo-200 hover:to-purple-200 dark:hover:from-indigo-800 dark:hover:to-purple-800 transition-all duration-300 border-2 border-white/20 dark:border-gray-700/20">
            <Avatar className="h-10 w-10">
              <AvatarImage src={userData?.avatar} alt={userData?.name || "User"} />
              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold">
                {userData?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            {/* Online indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-900 rounded-full" />
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-80 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-br from-white/95 to-gray-50/95 dark:from-gray-800/95 dark:to-gray-900/95 backdrop-blur-xl p-4 overflow-hidden" 
        align="end" 
        forceMount
        sideOffset={8}
      >
        <DropdownMenuLabel className="font-normal mb-4">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={userData?.avatar} alt={userData?.name || "User"} />
                  <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold">
                    {userData?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 border-2 border-white dark:border-gray-900 rounded-full" />
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold leading-none bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  {userData?.name || "Guest User"}
                </p>
                <p className="text-sm leading-none text-gray-500 dark:text-gray-400 mt-1">
                  {userData?.email || "guest@example.com"}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Shield className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">{userData?.role === "admin" ? "Admin" : userData?.role === "customer" ? "Verified Customer" : "Guest User"}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
        
        {/* Account Management */}
        <DropdownMenuGroup>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link to={userData ? "/account" : "/auth/register"}>
              <DropdownMenuItem 
                className="rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/50 dark:hover:to-cyan-900/50 transition-all duration-200 p-3 my-1 group"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">{userData ? "My Account" : "Create Account"}</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{userData ? "Manage your account" : "Create an account to get started"}</p>
                </div>
              </DropdownMenuItem>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Link to="/orders">
              <DropdownMenuItem 
                className="rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/50 dark:hover:to-pink-900/50 transition-all duration-200 p-3 my-1 group"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                  <Package className="h-4 w-4 text-white" />
                </div>
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">My Orders</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Track your orders</p>
                </div>
              </DropdownMenuItem>
            </Link>
          </motion.div>

          {userData && <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/settings">
              <DropdownMenuItem 
                className="rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-900/50 dark:hover:to-emerald-900/50 transition-all duration-200 p-3 my-1 group"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                  <Settings className="h-4 w-4 text-white" />
                </div>
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">Settings</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Manage preferences</p>
                </div>
              </DropdownMenuItem>
            </Link>
          </motion.div>}
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent my-2" />
        
        {/* Shopping */}
        <DropdownMenuGroup>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Link to="/wishlist">
              <DropdownMenuItem 
                className="rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 dark:hover:from-red-900/50 dark:hover:to-orange-900/50 transition-all duration-200 p-3 my-1 group"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                  <Heart className="h-4 w-4 text-white" />
                </div>
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">Wishlist</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Saved items</p>
                </div>
              </DropdownMenuItem>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/cart">
              <DropdownMenuItem 
                className="rounded-xl hover:bg-gradient-to-r hover:from-yellow-50 hover:to-amber-50 dark:hover:from-yellow-900/50 dark:hover:to-amber-900/50 transition-all duration-200 p-3 my-1 group"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                  <ShoppingBag className="h-4 w-4 text-white" />
                </div>
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">Shopping Cart</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">View your cart</p>
                </div>
              </DropdownMenuItem>
            </Link>
          </motion.div>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent my-2" />
        
        {/* Additional Features */}
        {/*<DropdownMenuGroup>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Link to="/addresses">
              <DropdownMenuItem 
                className="rounded-xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-blue-50 dark:hover:from-indigo-900/50 dark:hover:to-blue-900/50 transition-all duration-200 p-3 my-1 group"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">Addresses</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Manage delivery addresses</p>
                </div>
              </DropdownMenuItem>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/payment-methods">
              <DropdownMenuItem 
                className="rounded-xl hover:bg-gradient-to-r hover:from-violet-50 hover:to-purple-50 dark:hover:from-violet-900/50 dark:hover:to-purple-900/50 transition-all duration-200 p-3 my-1 group"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                  <CreditCard className="h-4 w-4 text-white" />
                </div>
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">Payment Methods</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Manage payment options</p>
                </div>
              </DropdownMenuItem>
            </Link>
          </motion.div>
        </DropdownMenuGroup>*/}

        <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent my-2" />
        
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45 }}
        >
          {userData && <DropdownMenuItem 
            className="text-red-600 focus:text-red-600 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-900/50 dark:hover:to-pink-900/50 transition-all duration-200 p-3 my-1 group"
            onClick={handleLogout}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
              <LogOut className="h-4 w-4 text-white" />
            </div>
            <div>
              <span className="font-medium">Log out</span>
              <p className="text-xs text-gray-500 dark:text-gray-400">Sign out of your account</p>
            </div>
          </DropdownMenuItem>
          }
          {!userData && <DropdownMenuItem 
            className="text-red-600 focus:text-red-600 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-900/50 dark:hover:to-pink-900/50 transition-all duration-200 p-3 my-1 group"
            onClick={handleLogout}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
              <LogOut className="h-4 w-4 text-white" />
            </div>
            <div>
              <span className="font-medium">Log in</span>
              <p className="text-xs text-gray-500 dark:text-gray-400">Sign in to your account</p>
            </div>
          </DropdownMenuItem>
          }
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropDown