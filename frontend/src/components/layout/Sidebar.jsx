import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    FiHome,
    FiUsers,
    FiFileText,
    FiDollarSign,
    FiFolder,
    FiCheckSquare,
    FiUserPlus,
    FiFile,
    FiCreditCard,
    FiTrendingUp,
    FiHeadphones,
    FiBarChart2,
    FiSettings,
    FiX,
    FiBox,
    FiTruck,
    FiTool,
    FiBriefcase,
    FiShield,
    FiClock,
    FiPieChart,
} from 'react-icons/fi'
import clsx from 'clsx'
import logo from '../../assets/logo.png'
import logoDark from '../../assets/logo-dark.png'
import { useThemeStore } from '../../store/themeStore'

const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: FiHome },
    { name: 'Clients', path: '/clients', icon: FiUsers },
    { name: 'Projects', path: '/projects', icon: FiFolder },
    { name: 'Invoices', path: '/invoices', icon: FiFileText },
    { name: 'Estimates', path: '/estimates', icon: FiDollarSign },
    { name: 'Resources', path: '/resources', icon: FiBox },
    { name: 'Suppliers', path: '/suppliers', icon: FiTruck },
    { name: 'Subcontractors', path: '/subcontractors', icon: FiTool },
    { name: 'Employees', path: '/employees', icon: FiBriefcase },
    { name: 'Safety', path: '/safety', icon: FiShield },
    { name: 'Time Tracking', path: '/time-tracking', icon: FiClock },
    { name: 'Cost Management', path: '/cost-management', icon: FiPieChart },
    { name: 'Tasks', path: '/tasks', icon: FiCheckSquare },
    { name: 'Leads', path: '/leads', icon: FiUserPlus },
    { name: 'Proposals', path: '/proposals', icon: FiFile },
    { name: 'Contracts', path: '/contracts', icon: FiCreditCard },
    { name: 'Expenses', path: '/expenses', icon: FiTrendingUp },
    { name: 'Payments', path: '/payments', icon: FiDollarSign },
    { name: 'Tickets', path: '/tickets', icon: FiHeadphones },
    { name: 'Reports', path: '/reports', icon: FiBarChart2 },
    { name: 'Settings', path: '/settings', icon: FiSettings },
]

const Sidebar = ({ isOpen, setIsOpen }) => {
    const { isDark } = useThemeStore()
    return (
        <>
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                initial={false}
                // Only animate x on mobile. On desktop, we transition width via CSS classes.
                animate={{ x: isOpen ? 0 : 0 }} // We'll handle mobile visibility via classes or conditionally if needed, but keeping this simple: "isOpen" means different things on mobile/desktop?
                // Actually, existing logic was: Mobile: isOpen toggles visibility. Desktop: Always visible.
                // New logic: 
                // Mobile: isOpen toggles visibility (overlay). 
                // Desktop: isOpen toggles width (expanded/collapsed).
                // Issue: isOpen state is shared.
                // If isOpen is true: Mobile=Visible, Desktop=Expanded.
                // If isOpen is false: Mobile=Hidden, Desktop=Collapsed.
                // We need to conditionally apply the 'x' animation only on mobile breakpoints.
                // Framer motion 'animate' applies inline styles passing media queries is tricky.
                // Better approach: Use CSS for the off-canvas toggle on mobile too if possible, or keep using Framer Motion but strictly for mobile.
                // However, simpler fix requested: "Set like other dashboard works" -> Collapsible sidebar.
                // We will use standard Tailwind responsive classes.
                className={clsx(
                    'fixed lg:static inset-y-0 left-0 z-30 bg-white border-r border-gray-200 flex flex-col shadow-lg lg:shadow-none dark:bg-gray-800 dark:border-gray-700 transition-all duration-300 ease-in-out',
                    // Mobile: Hide if !isOpen? No, framer motion handles x translation.
                    // But on desktop we want width change.
                    isOpen ? 'w-64 translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'
                )}
            >
                {/* Logo */}
                <div className={clsx(
                    "h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-700",
                    isOpen ? "justify-between" : "justify-center"
                )}>
                    {isOpen ? (
                        <img
                            src={isDark ? logoDark : logo}
                            alt="Buildco CRM"
                            className={`h-12 w-auto object-contain ${isDark ? 'brightness-0 invert' : ''}`}
                        />
                    ) : (
                        <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">B</div>
                    )}

                    <button
                        onClick={() => setIsOpen(false)}
                        className="lg:hidden text-gray-500 hover:text-gray-700"
                    >
                        <FiX size={24} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto custom-scrollbar py-4 px-3">
                    <ul className="space-y-1">
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    title={!isOpen ? item.name : ''}
                                    className={({ isActive }) =>
                                        clsx(
                                            'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group',
                                            isActive
                                                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md'
                                                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700',
                                            !isOpen && 'justify-center px-2'
                                        )
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <item.icon
                                                size={20}
                                                className={clsx(
                                                    'transition-transform duration-200 group-hover:scale-110',
                                                    isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'
                                                )}
                                            />
                                            <span className={clsx("font-medium whitespace-nowrap overflow-hidden transition-all duration-300",
                                                isOpen ? "w-auto opacity-100" : "w-0 opacity-0 hidden"
                                            )}>
                                                {item.name}
                                            </span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* User Info */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className={clsx(
                        "flex items-center rounded-lg bg-gray-50 dark:bg-gray-700 transition-all duration-300",
                        isOpen ? "space-x-3 p-3" : "justify-center p-2 bg-transparent"
                    )}>
                        <div className="w-10 h-10 min-w-[2.5rem] rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-semibold">
                            A
                        </div>
                        <div className={clsx("flex-1 min-w-0 transition-all duration-300", isOpen ? "opacity-100" : "w-0 opacity-0 hidden")}>
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-100">Admin User</p>
                            <p className="text-xs text-gray-500 truncate dark:text-gray-400">admin@buildco.com</p>
                        </div>
                    </div>
                </div>
            </motion.aside >
        </>
    )
}

export default Sidebar
