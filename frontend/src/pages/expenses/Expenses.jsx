import { Link } from 'react-router-dom'
import { createColumnHelper } from '@tanstack/react-table'
import { FiPlus, FiEdit2, FiTrash2, FiFileText } from 'react-icons/fi'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/common/DataTable'
import { useAppStore } from '../../store/appStore'

const Expenses = () => {
    const { expenses: data, deleteExpense } = useAppStore()
    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor('category', {
            header: 'Category',
            cell: (info) => <span className="font-medium text-gray-900 dark:text-gray-100">{info.getValue()}</span>
        }),
        columnHelper.accessor('name', {
            header: 'Name',
        }),
        columnHelper.accessor('date', {
            header: 'Date',
        }),
        columnHelper.accessor('amount', {
            header: 'Amount',
            cell: (info) => <span className="font-semibold text-gray-900 dark:text-gray-100">Rs. {info.getValue().toFixed(2)}</span>
        }),
        columnHelper.accessor('billable', {
            header: 'Billable',
            cell: (info) => (
                <span className={`badge ${info.getValue() === 'Yes' ? 'badge-success' : 'badge-secondary'}`}>
                    {info.getValue()}
                </span>
            )
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: (info) => (
                <div className="flex items-center space-x-2">
                    <Link to={`/expenses/${info.row.original.id}`} className="p-1 text-gray-500 hover:text-primary-600 transition-colors" title="View Receipt">
                        <FiFileText size={18} />
                    </Link>
                    <Link to={`/expenses/edit/${info.row.original.id}`} className="p-1 text-gray-500 hover:text-primary-600 transition-colors">
                        <FiEdit2 size={18} />
                    </Link>
                    <button
                        onClick={() => {
                            if (window.confirm('Are you sure you want to delete this expense?')) {
                                deleteExpense(info.row.original.id)
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
                title="Expenses"
                parent="Dashboard"
                action={
                    <Link to="/expenses/new" className="btn-primary flex items-center space-x-2">
                        <FiPlus />
                        <span>New Expense</span>
                    </Link>
                }
            />
            <DataTable data={data} columns={columns} />
        </div>
    )
}

export default Expenses
