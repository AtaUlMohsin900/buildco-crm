import { Link } from 'react-router-dom'
import { createColumnHelper } from '@tanstack/react-table'
import { FiPlus, FiEdit2, FiTrash2, FiDownload } from 'react-icons/fi'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/common/DataTable'
import { useAppStore } from '../../store/appStore'

const Payments = () => {
    const { payments: data, deletePayment } = useAppStore()
    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor('id', {
            header: 'Payment #',
            cell: (info) => <span className="font-medium text-gray-900 dark:text-gray-100">{info.getValue()}</span>
        }),
        columnHelper.accessor('invoice', {
            header: 'Invoice #',
            cell: (info) => <span className="text-primary-600 cursor-pointer">{info.getValue()}</span>

        }),
        columnHelper.accessor('mode', {
            header: 'Payment Mode',
        }),
        columnHelper.accessor('txid', {
            header: 'Transaction ID',
        }),
        columnHelper.accessor('date', {
            header: 'Date',
        }),
        columnHelper.accessor('amount', {
            header: 'Amount',
            cell: (info) => <span className="font-semibold text-success-600">Rs. {info.getValue().toFixed(2)}</span>
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: (info) => (
                <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-500 hover:text-primary-600 transition-colors" title="Download Receipt">
                        <FiDownload size={18} />
                    </button>
                    <Link to={`/payments/edit/${info.row.original.id}`} className="p-1 text-gray-500 hover:text-primary-600 transition-colors">
                        <FiEdit2 size={18} />
                    </Link>
                    <button
                        onClick={() => {
                            if (window.confirm('Are you sure you want to delete this payment record?')) {
                                deletePayment(info.row.original.id)
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
                title="Payments"
                parent="Dashboard"
                action={
                    <Link to="/payments/new" className="btn-primary flex items-center space-x-2">
                        <FiPlus />
                        <span>Record Payment</span>
                    </Link>
                }
            />
            <DataTable data={data} columns={columns} />
        </div>
    )
}

export default Payments
