import { Link } from 'react-router-dom'
import { createColumnHelper } from '@tanstack/react-table'
import { FiPlus, FiEdit2, FiTrash2, FiDownload, FiEye } from 'react-icons/fi'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/common/DataTable'
import { useAppStore } from '../../store/appStore'

const Contracts = () => {
    const { contracts: data, deleteContract } = useAppStore()
    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor('id', {
            header: 'Contract ID',
            cell: (info) => <span className="font-medium text-gray-900 dark:text-gray-100">{info.getValue()}</span>
        }),
        columnHelper.accessor('subject', {
            header: 'Subject',
        }),
        columnHelper.accessor('client', {
            header: 'Client',
        }),
        columnHelper.accessor('amount', {
            header: 'Value',
            cell: (info) => <span className="font-semibold text-gray-900 dark:text-gray-100">Rs. {info.getValue().toFixed(2)}</span>
        }),
        columnHelper.accessor('start_date', {
            header: 'Start Date',
        }),
        columnHelper.accessor('end_date', {
            header: 'End Date',
        }),
        columnHelper.accessor('status', {
            header: 'Status',
            cell: (info) => {
                const status = info.getValue()
                let badgeClass = 'badge-secondary'
                if (status === 'Active') badgeClass = 'badge-success'
                if (status === 'Pending') badgeClass = 'badge-warning'
                if (status === 'Expired') badgeClass = 'badge-danger'

                return <span className={`badge ${badgeClass}`}>{status}</span>
            }
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: (info) => (
                <div className="flex items-center space-x-2">
                    <Link to={`/contracts/${info.row.original.id}`} className="p-1 text-gray-500 hover:text-primary-600 transition-colors" title="View Details">
                        <FiEye size={18} />
                    </Link>
                    <Link to={`/contracts/edit/${info.row.original.id}`} className="p-1 text-gray-500 hover:text-primary-600 transition-colors">
                        <FiEdit2 size={18} />
                    </Link>
                    <button className="p-1 text-gray-500 hover:text-gray-900 transition-colors" title="Download PDF">
                        <FiDownload size={18} />
                    </button>
                    <button
                        onClick={() => {
                            if (window.confirm('Are you sure you want to delete this contract?')) {
                                deleteContract(info.row.original.id)
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
                title="Contracts"
                parent="Dashboard"
                action={
                    <Link to="/contracts/new" className="btn-primary flex items-center space-x-2">
                        <FiPlus />
                        <span>New Contract</span>
                    </Link>
                }
            />
            <DataTable data={data} columns={columns} />
        </div>
    )
}

export default Contracts
