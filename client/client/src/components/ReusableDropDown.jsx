import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem
} from '../components/ui/dropdown-menu'

import { 
    ChevronDown,
    House,
    Settings,
    LogOut
} from 'lucide-react'

const ReUsableDropDown = ({
    user
}) => {
    return (
         <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 focus:outline-none hover:bg-gray-100 rounded-lg px-2 py-1 transition-colors">
                    <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full hover:bg-blue-600 transition-colors">
                    {user.avatar}
                    </div>
                    <div className="text-sm text-left hidden md:block">
                    <p className="font-medium group-hover:text-blue-700 transition-colors">{user.name}</p>
                    <p className="text-gray-500 group-hover:text-blue-500 transition-colors">{user.email}</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-blue-700 transition-colors" />
                  </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-[180px]">
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer transition-colors">
                    <House className="w-4 h-4 mr-1" />
                    Home
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer transition-colors">
                    <Settings className="w-4 h-4 mr-1" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem  className="text-red-600 focus:text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-900/50 dark:hover:to-pink-900/50 transition-all duration-200  group">
                    <button className='flex justify-between items center'>
                      <LogOut className="w-4 h-4 mr-2" />
                    Logout
                    </button>
                    
                  </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
    )
}

export default ReUsableDropDown