import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMenu, FiBell, FiSearch, FiMail, FiMoon, FiSun } from 'react-icons/fi'
import { useAuthStore } from '../../store/authStore'
import { useThemeStore } from '../../store/themeStore'

const Header = ({ toggleSidebar }) => {
    const { user, logout } = useAuthStore()
    const { isDark, toggleTheme } = useThemeStore()
    const navigate = useNavigate()
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
    const [isMessagesOpen, setIsMessagesOpen] = useState(false)

    // Refs for click outside handling
    const profileRef = useRef(null)
    const notificationsRef = useRef(null)
    const messagesRef = useRef(null)

    const handleToggleTheme = () => {
        toggleTheme()
    }

    // Apply dark mode class to html element
    useEffect(() => {
        const root = window.document.documentElement
        if (isDark) {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
    }, [isDark])

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false)
            }
            if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
                setIsNotificationsOpen(false)
            }
            if (messagesRef.current && !messagesRef.current.contains(event.target)) {
                setIsMessagesOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    // Mock Data
    const notifications = [
        { id: 1, title: 'New Invoice Paid', desc: 'Invoice #1024 was paid by ABC Corp', time: '5m ago', read: false },
        { id: 2, title: 'Project Deadline', desc: 'Website Redesign due tomorrow', time: '1h ago', read: false },
        { id: 3, title: 'New Ticket', desc: 'Support ticket #502 created', time: '3h ago', read: true },
    ]

    const messages = [
        { id: 1, sender: 'John Smith', text: 'Hey, when is the meeting?', time: '10m ago', avatar: 'J' },
        { id: 2, sender: 'Sarah Wilson', text: 'Files have been uploaded.', time: '2h ago', avatar: 'S' },
    ]

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm z-20 relative dark:bg-gray-800 dark:border-gray-700">
            {/* Left Sections */}
            <div className="flex items-center space-x-4">
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 dark:hover:bg-gray-700 dark:text-gray-200"
                >
                    <FiMenu size={24} className="text-gray-600 dark:text-gray-300" />
                </button>

                {/* Search Bar */}
                <div className="hidden md:flex items-center bg-gray-50 rounded-lg px-4 py-2 w-96 dark:bg-gray-700">
                    <FiSearch className="text-gray-400 mr-2" />
                    <input
                        type="text"
                        placeholder="Search clients, invoices, projects..."
                        className="bg-transparent border-none outline-none w-full text-sm text-gray-700 placeholder-gray-400 dark:text-gray-200 dark:placeholder-gray-500"
                    />
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
                {/* Theme Toggle */}
                <button
                    onClick={handleToggleTheme}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    aria-label="Toggle Theme"
                >
                    {isDark ? (
                        <FiSun size={20} className="text-warning-400" />
                    ) : (
                        <FiMoon size={20} className="text-gray-600 dark:text-gray-300" />
                    )}
                </button>

                {/* Notifications */}
                <div className="relative" ref={notificationsRef}>
                    <button
                        onClick={() => {
                            setIsNotificationsOpen(!isNotificationsOpen)
                            setIsMessagesOpen(false)
                            setIsProfileOpen(false)
                        }}
                        className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 dark:hover:bg-gray-700 focus:outline-none"
                    >
                        <FiBell size={20} className="text-gray-600 dark:text-gray-300" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-danger-500 rounded-full"></span>
                    </button>

                    {isNotificationsOpen && (
                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-100 animate-fade-in z-50 dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
                            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
                                <span className="text-xs text-primary-600 cursor-pointer hover:underline dark:text-primary-400">Mark all read</span>
                            </div>
                            <div className="max-h-64 overflow-y-auto">
                                {notifications.map(item => (
                                    <div key={item.id} className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer border-b border-gray-50 dark:border-gray-700/50 ${!item.read ? 'bg-blue-50/30' : ''}`}>
                                        <div className="flex justify-between items-start">
                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-200">{item.title}</p>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">{item.time}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-700 text-center">
                                <Link to="/notifications" className="text-xs font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400">View All</Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Messages */}
                <div className="relative" ref={messagesRef}>
                    <button
                        onClick={() => {
                            setIsMessagesOpen(!isMessagesOpen)
                            setIsNotificationsOpen(false)
                            setIsProfileOpen(false)
                        }}
                        className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 dark:hover:bg-gray-700 focus:outline-none"
                    >
                        <FiMail size={20} className="text-gray-600 dark:text-gray-300" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full"></span>
                    </button>

                    {isMessagesOpen && (
                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-100 animate-fade-in z-50 dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
                            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Messages</h3>
                                <span className="text-xs text-primary-600 cursor-pointer hover:underline dark:text-primary-400">New Message</span>
                            </div>
                            <div className="max-h-64 overflow-y-auto">
                                {messages.map(item => (
                                    <div key={item.id} className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer border-b border-gray-50 dark:border-gray-700/50 flex space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-secondary-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                            {item.avatar}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-baseline mb-0.5">
                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-200 truncate">{item.sender}</p>
                                                <span className="text-xs text-gray-400">{item.time}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-700 text-center">
                                <Link to="/messages" className="text-xs font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400">View All</Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* User Menu */}
                <div className="relative" ref={profileRef}>
                    <button
                        onClick={() => {
                            setIsProfileOpen(!isProfileOpen)
                            setIsNotificationsOpen(false)
                            setIsMessagesOpen(false)
                        }}
                        className="flex items-center space-x-3 pl-4 border-l border-gray-200 focus:outline-none dark:border-gray-700"
                    >
                        <div className="hidden md:block text-right">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                                {user?.name || 'Admin User'}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role || 'Administrator'}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-semibold cursor-pointer hover:shadow-lg transition-shadow duration-200">
                            {user?.name?.charAt(0) || 'A'}
                        </div>
                    </button>

                    {/* Dropdown */}
                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-100 animate-fade-in z-50 dark:bg-gray-800 dark:border-gray-700">
                            <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-primary-400">
                                My Profile
                            </Link>
                            <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-primary-400">
                                Settings
                            </Link>
                            <div className="border-t border-gray-100 my-1 dark:border-gray-700"></div>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left block px-4 py-2 text-sm text-danger-600 hover:bg-gray-50 font-medium dark:hover:bg-gray-700"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
