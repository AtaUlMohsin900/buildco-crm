import { useState } from 'react'
import { FiSave, FiUser, FiLock, FiBell } from 'react-icons/fi'
import PageHeader from '../../components/common/PageHeader'
import { useAuthStore } from '../../store/authStore'
import { toast } from 'react-toastify'

const Settings = () => {
    const { user } = useAuthStore()
    const [activeTab, setActiveTab] = useState('profile')
    const [loading, setLoading] = useState(false)

    const handleSave = async (e) => {
        e.preventDefault()
        setLoading(true)
        // Simulate API
        setTimeout(() => {
            setLoading(false)
            toast.success('Settings saved successfully')
        }, 1000)
    }

    return (
        <div className="animate-fade-in">
            <PageHeader title="Settings" parent="Dashboard" />

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                <div className="flex border-b border-gray-200 dark:border-gray-700">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`px-6 py-4 text-sm font-medium flex items-center space-x-2 border-b-2 transition-colors ${activeTab === 'profile'
                            ? 'border-primary-500 text-primary-600 bg-primary-50 dark:bg-gray-700/50 dark:text-primary-400'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700'
                            }`}
                    >
                        <FiUser />
                        <span>Profile Settings</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('security')}
                        className={`px-6 py-4 text-sm font-medium flex items-center space-x-2 border-b-2 transition-colors ${activeTab === 'security'
                            ? 'border-primary-500 text-primary-600 bg-primary-50 dark:bg-gray-700/50 dark:text-primary-400'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700'
                            }`}
                    >
                        <FiLock />
                        <span>Security</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('notifications')}
                        className={`px-6 py-4 text-sm font-medium flex items-center space-x-2 border-b-2 transition-colors ${activeTab === 'notifications'
                            ? 'border-primary-500 text-primary-600 bg-primary-50 dark:bg-gray-700/50 dark:text-primary-400'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700'
                            }`}
                    >
                        <FiBell />
                        <span>Notifications</span>
                    </button>
                </div>

                <div className="p-6">
                    {activeTab === 'profile' && (
                        <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Full Name</label>
                                    <input type="text" defaultValue={user?.name || 'Admin User'} className="input" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Email Address</label>
                                    <input type="email" defaultValue={user?.email || 'admin@buildco.com'} className="input bg-gray-50 dark:bg-gray-700 dark:text-gray-400" readOnly />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Phone Number</label>
                                    <input type="tel" className="input" placeholder="+1 234 567 890" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Job Title</label>
                                    <input type="text" defaultValue={user?.role || 'Administrator'} className="input" />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className="btn-primary flex items-center space-x-2" disabled={loading}>
                                    <FiSave />
                                    <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                                </button>
                            </div>
                        </form>
                    )}

                    {activeTab === 'security' && (
                        <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Current Password</label>
                                <input type="password" class="input" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">New Password</label>
                                    <input type="password" class="input" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Confirm New Password</label>
                                    <input type="password" class="input" />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className="btn-primary flex items-center space-x-2" disabled={loading}>
                                    <FiSave />
                                    <span>{loading ? 'Updating...' : 'Update Password'}</span>
                                </button>
                            </div>
                        </form>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="space-y-4 max-w-2xl">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg dark:bg-gray-700">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Receive emails about new activities</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" defaultChecked className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600 dark:bg-gray-600 dark:border-gray-500"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg dark:bg-gray-700">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Desktop Notifications</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Receive desktop push notifications</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600 dark:bg-gray-600 dark:border-gray-500"></div>
                                </label>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Settings
