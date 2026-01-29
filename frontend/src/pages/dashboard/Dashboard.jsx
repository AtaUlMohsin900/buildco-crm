import { FiDollarSign, FiFileText, FiUsers, FiTrendingUp } from 'react-icons/fi'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
)
import { useAppStore } from '../../store/appStore'
import { useClientStore } from '../../store/clientStore'

const Dashboard = () => {
    // Data from stores
    const { invoices } = useAppStore()
    const { clients } = useClientStore()

    // Calculate dynamic stats
    const totalRevenue = invoices
        .filter(inv => inv.status === 'Paid')
        .reduce((sum, inv) => sum + (parseFloat(inv.amount) || 0), 0)

    const totalInvoices = invoices.length

    // Calculate pending/overdue/unpaid amount
    const pendingAmount = invoices
        .filter(inv => inv.status === 'Unpaid' || inv.status === 'Overdue' || inv.status === 'Draft')
        .reduce((sum, inv) => sum + (parseFloat(inv.amount) || 0), 0)

    const activeClients = clients.filter(c => c.status === 'Active').length

    // Stats data
    const stats = [
        {
            name: 'Total Revenue',
            value: `Rs. ${totalRevenue.toLocaleString()}`,
            change: '+12.5%', // Keeping static for now as we lack historical data
            changeType: 'increase',
            icon: FiDollarSign,
            bgClass: 'bg-gradient-to-br from-primary-400 to-primary-600',
        },
        {
            name: 'Total Invoices',
            value: totalInvoices.toString(),
            change: '+8.2%',
            changeType: 'increase',
            icon: FiFileText,
            bgClass: 'bg-gradient-to-br from-secondary-400 to-secondary-600',
        },
        {
            name: 'Active Clients',
            value: activeClients.toString(),
            change: '+5.1%',
            changeType: 'increase',
            icon: FiUsers,
            bgClass: 'bg-gradient-to-br from-success-400 to-success-600',
        },
        {
            name: 'Pending Payments',
            value: `Rs. ${pendingAmount.toLocaleString()}`,
            change: '-3.2%',
            changeType: 'decrease',
            icon: FiTrendingUp,
            bgClass: 'bg-gradient-to-br from-warning-400 to-warning-600',
        },
    ]

    // Calculate Chart Data

    // 1. Revenue Over Time (Line Chart)
    const monthlyRevenue = new Array(12).fill(0)
    invoices.forEach(inv => {
        if (inv.status === 'Paid') {
            const date = new Date(inv.date)
            // Ensure we only count for current year or handle correctly
            // For simplicity, we just map month index 0-11
            const monthIndex = date.getMonth()
            if (monthIndex >= 0 && monthIndex < 12) {
                monthlyRevenue[monthIndex] += (parseFloat(inv.amount) || 0)
            }
        }
    })

    const revenueData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Revenue',
                data: monthlyRevenue,
                borderColor: 'rgb(245, 191, 35)', // primary color (approx)
                backgroundColor: 'rgba(245, 191, 35, 0.1)',
                fill: true,
                tension: 0.4,
            },
        ],
    }

    // 2. Invoice Status Distribution (Doughnut Chart)
    const statusCounts = {
        Paid: 0,
        Unpaid: 0,
        Overdue: 0,
        Draft: 0
    }

    invoices.forEach(inv => {
        if (statusCounts[inv.status] !== undefined) {
            statusCounts[inv.status]++
        } else {
            // Fallback for any other status, treating as Draft or ignore
            statusCounts.Draft++
        }
    })

    const invoiceStatusData = {
        labels: ['Paid', 'Unpaid', 'Overdue', 'Draft'],
        datasets: [
            {
                data: [statusCounts.Paid, statusCounts.Unpaid, statusCounts.Overdue, statusCounts.Draft],
                backgroundColor: [
                    'rgba(34, 197, 94, 0.8)',   // Paid - Green
                    'rgba(245, 158, 11, 0.8)',  // Unpaid - Amber/Warning
                    'rgba(239, 68, 68, 0.8)',   // Overdue - Red
                    'rgba(156, 163, 175, 0.8)', // Draft - Gray
                ],
                borderWidth: 0,
            },
        ],
    }

    // Monthly comparison data
    const monthlyComparisonData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: '2025',
                data: [12000, 19000, 15000, 25000, 22000, 30000],
                backgroundColor: 'rgba(14, 165, 233, 0.8)',
            },
            {
                label: '2024',
                data: [10000, 15000, 12000, 20000, 18000, 25000],
                backgroundColor: 'rgba(168, 85, 247, 0.8)',
            },
        ],
    }

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
            },
        },
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
                <p className="text-gray-600 mt-1 dark:text-gray-400">Welcome back! Here's what's happening with your business.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="card hover:shadow-hard transition-shadow duration-300 animate-slide-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
                                <p className="text-2xl font-bold text-gray-900 mt-2 dark:text-white">{stat.value}</p>
                                <p
                                    className={`text-sm mt-2 ${stat.changeType === 'increase' ? 'text-success-600' : 'text-danger-600'
                                        }`}
                                >
                                    {stat.change} from last month
                                </p>
                            </div>
                            <div
                                className={`w-14 h-14 rounded-lg flex items-center justify-center shadow-lg ${stat.bgClass}`}
                            >
                                <stat.icon className="text-white" size={28} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 card">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 dark:text-white">Revenue Overview</h3>
                    <div className="h-80">
                        <Line data={revenueData} options={chartOptions} />
                    </div>
                </div>

                {/* Invoice Status */}
                <div className="card">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 dark:text-white">Invoice Status</h3>
                    <div className="h-80 flex items-center justify-center">
                        <Doughnut data={invoiceStatusData} options={chartOptions} />
                    </div>
                </div>
            </div>

            {/* Monthly Comparison */}
            <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 dark:text-white">Monthly Comparison</h3>
                <div className="h-80">
                    <Bar data={monthlyComparisonData} options={chartOptions} />
                </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Invoices */}
                <div className="card">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 dark:text-white">Recent Invoices</h3>
                    <div className="space-y-3">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div key={item} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 dark:bg-gray-700/50 dark:hover:bg-gray-700">
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-gray-200">Invoice #INV-{1000 + item}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Client Name {item}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-gray-900 dark:text-gray-200">Rs. {(Math.random() * 10000).toFixed(2)}</p>
                                    <span className="badge badge-success">Paid</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Projects */}
                <div className="card">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 dark:text-white">Recent Projects</h3>
                    <div className="space-y-3">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div key={item} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 dark:bg-gray-700/50 dark:hover:bg-gray-700">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="font-medium text-gray-900 dark:text-gray-200">Project {item}</p>
                                    <span className="badge badge-primary">{Math.floor(Math.random() * 100)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-600">
                                    <div
                                        className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
