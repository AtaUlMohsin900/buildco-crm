import { Link } from 'react-router-dom'
import { createColumnHelper } from '@tanstack/react-table'
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiDownload } from 'react-icons/fi'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/common/DataTable'
import { useAppStore } from '../../store/appStore'

const Estimates = () => {
    // Data from store
    const { estimates: data, deleteEstimate } = useAppStore()

    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor('id', {
            header: 'Estimate #',
            cell: (info) => (
                <div className="font-medium text-gray-900">
                    <Link to={`/estimates/${info.getValue()}`} className="hover:text-primary-600">
                        {info.getValue()}
                    </Link>
                </div>
            ),
        }),
        columnHelper.accessor('client', {
            header: 'Client',
            cell: (info) => <span className="font-medium text-gray-700">{info.getValue()}</span>
        }),
        columnHelper.accessor('date', {
            header: 'Date',
        }),
        columnHelper.accessor('expiry', {
            header: 'Expiry Date',
        }),
        columnHelper.accessor('status', {
            header: 'Status',
            cell: (info) => {
                const status = info.getValue()
                let badgeClass = 'badge-secondary'
                if (status === 'Sent') badgeClass = 'badge-primary'
                if (status === 'Accepted') badgeClass = 'badge-success'
                if (status === 'Draft') badgeClass = 'badge-warning'
                if (status === 'Declined') badgeClass = 'badge-danger'

                return <span className={`badge ${badgeClass}`}>{status}</span>
            },
        }),
        columnHelper.accessor('amount', {
            header: 'Amount',
            cell: (info) => <span className="font-semibold text-gray-900">Rs. {info.getValue().toFixed(2)}</span>
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: (info) => (
                <div className="flex items-center space-x-2">
                    <Link to={`/estimates/${info.row.original.id}`} className="p-1 text-gray-500 hover:text-primary-600 transition-colors">
                        <FiEye size={18} />
                    </Link>
                    <button className="p-1 text-gray-500 hover:text-primary-600 transition-colors">
                        <FiEdit2 size={18} />
                    </button>
                    <button className="p-1 text-gray-500 hover:text-gray-900 transition-colors" title="Download PDF">
                        <FiDownload size={18} />
                    </button>
                    <button
                        onClick={() => {
                            if (window.confirm('Are you sure you want to delete this estimate?')) {
                                deleteEstimate(info.row.original.id)
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
                title="Estimates"
                parent="Dashboard"
                action={
                    <button className="btn-primary flex items-center space-x-2">
                        <FiPlus />
                        <span>New Estimate</span>
                    </button>
                }
            />

            <DataTable data={data} columns={columns} />
        </div>
    )
}

export default Estimates
