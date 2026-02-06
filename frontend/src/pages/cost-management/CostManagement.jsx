import { Link } from 'react-router-dom'
import { createColumnHelper } from '@tanstack/react-table'
import { FiPlus, FiEdit2, FiTrash2, FiPieChart } from 'react-icons/fi'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/common/DataTable'
import { useAppStore } from '../../store/appStore'

const CostManagement = () => {
    const { costs: data, deleteCost } = useAppStore()

    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor('project', {
            header: 'Project',
            cell: (info) => (
                <div className="font-medium text-gray-900 dark:text-gray-100">
                    {info.getValue()}
                </div>
            ),
        }),
        columnHelper.accessor('cost_code', {
            header: 'Cost Code',
        }),
        columnHelper.accessor('budget', {
            header: 'Budget',
            cell: (info) => <span className="text-gray-900 dark:text-gray-100">Rs. {info.getValue().toFixed(2)}</span>
        }),
        columnHelper.accessor('actual', {
            header: 'Actual Cost',
            cell: (info) => <span className="text-gray-900 dark:text-gray-100">Rs. {info.getValue().toFixed(2)}</span>
        }),
        columnHelper.accessor('variance', {
            header: 'Variance',
            cell: (info) => (
                <span className={`font-medium ${info.getValue() >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
                    Rs. {info.getValue().toFixed(2)}
                </span>
            ),
        }),
        columnHelper.accessor('status', {
            header: 'Status',
            cell: (info) => (
                <span className={`badge ${info.getValue() === 'On Track' ? 'badge-success' : 'badge-danger'}`}>
                    {info.getValue()}
                </span>
            ),
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: (info) => (
                <div className="flex items-center space-x-2">
                    <Link to={`/cost-management/edit/${info.row.original.id}`} className="p-1 text-gray-500 hover:text-primary-600 transition-colors">
                        <FiEdit2 size={18} />
                    </Link>
                    <button
                        onClick={() => {
                            if (window.confirm('Are you sure you want to delete this cost entry?')) {
                                deleteCost(info.row.original.id)
                            }
                        }}
                        className="p-1 text-gray-500 hover:text-danger-600 transition-colors"
                    >
                        <FiTrash2 size={18} />
                    </button>
                </div>
            ),
        }),
    ]

    return (
        <div className="animate-fade-in">
            <PageHeader
                title="Cost Management"
                parent="Dashboard"
                action={
                    <Link to="/cost-management/new" className="btn-primary flex items-center space-x-2">
                        <FiPlus />
                        <span>New Cost Code</span>
                    </Link>
                }
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 dark:text-gray-400 font-medium">Total Budget</h3>
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                            <FiPieChart size={20} />
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 dark:text-white">Rs. 130,000.00</div>
                    <div className="mt-2 text-sm text-green-600 flex items-center">
                        <span>Across active projects</span>
                    </div>
                </div>
            </div>

            <DataTable data={data} columns={columns} />
        </div>
    )
}

export default CostManagement
