import { Link } from 'react-router-dom'
import { createColumnHelper } from '@tanstack/react-table'
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiSend } from 'react-icons/fi'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/common/DataTable'
import { useAppStore } from '../../store/appStore'

const Proposals = () => {
    const { proposals: data, deleteProposal } = useAppStore()
    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor('id', {
            header: 'Proposal #',
            cell: (info) => (
                <div className="font-medium text-gray-900 dark:text-gray-100">
                    <Link to={`/proposals/${info.getValue()}`} className="hover:text-primary-600 dark:hover:text-primary-400">
                        {info.getValue()}
                    </Link>
                </div>
            ),
        }),
        columnHelper.accessor('to', {
            header: 'To',
        }),
        columnHelper.accessor('subject', {
            header: 'Subject',
            cell: (info) => <span className="font-medium text-gray-900 dark:text-gray-100">{info.getValue()}</span>
        }),
        columnHelper.accessor('date', {
            header: 'Date',
        }),
        columnHelper.accessor('open_till', {
            header: 'Open Till',
        }),
        columnHelper.accessor('status', {
            header: 'Status',
            cell: (info) => {
                const status = info.getValue()
                let badgeClass = 'badge-secondary'
                if (status === 'Sent') badgeClass = 'badge-primary'
                if (status === 'Accepted') badgeClass = 'badge-success'
                if (status === 'Declined') badgeClass = 'badge-danger'
                if (status === 'Draft') badgeClass = 'badge-warning'
                return <span className={`badge ${badgeClass}`}>{status}</span>
            }
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: (info) => (
                <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-500 hover:text-primary-600 transition-colors" title="Send Email">
                        <FiSend size={18} />
                    </button>
                    <Link to={`/proposals/${info.row.original.id}`} className="p-1 text-gray-500 hover:text-primary-600 transition-colors">
                        <FiEye size={18} />
                    </Link>
                    <Link to={`/proposals/${info.row.original.id}`} className="p-1 text-gray-500 hover:text-primary-600 transition-colors">
                        <FiEdit2 size={18} />
                    </Link>
                    <button
                        onClick={() => {
                            if (window.confirm('Are you sure you want to delete this proposal?')) {
                                deleteProposal(info.row.original.id)
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
                title="Proposals"
                parent="Dashboard"
                action={
                    <Link to="/proposals/new" className="btn-primary flex items-center space-x-2">
                        <FiPlus />
                        <span>New Proposal</span>
                    </Link>
                }
            />
            <DataTable data={data} columns={columns} />
        </div>
    )
}

export default Proposals
