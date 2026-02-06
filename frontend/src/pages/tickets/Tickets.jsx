import { Link } from 'react-router-dom'
import { createColumnHelper } from '@tanstack/react-table'
import { FiPlus, FiEdit2, FiTrash2, FiMessageCircle } from 'react-icons/fi'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/common/DataTable'
import { useAppStore } from '../../store/appStore'

const Tickets = () => {
    const { tickets: data, deleteTicket } = useAppStore()
    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor('id', {
            header: '#',
        }),
        columnHelper.accessor('subject', {
            header: 'Subject',
            cell: (info) => <span className="font-medium text-gray-900 dark:text-gray-100">{info.getValue()}</span>
        }),
        columnHelper.accessor('contact', {
            header: 'Contact',
        }),
        columnHelper.accessor('priority', {
            header: 'Priority',
            cell: (info) => {
                const priority = info.getValue()
                let colorClass = 'text-gray-600'
                if (priority === 'High') colorClass = 'text-danger-600'
                if (priority === 'Medium') colorClass = 'text-warning-600'

                return <span className={`font-medium ${colorClass}`}>{priority}</span>
            }
        }),
        columnHelper.accessor('status', {
            header: 'Status',
            cell: (info) => {
                const status = info.getValue()
                let badgeClass = 'badge-secondary'
                if (status === 'Open') badgeClass = 'badge-danger'
                if (status === 'In Progress') badgeClass = 'badge-primary'
                if (status === 'Resolved') badgeClass = 'badge-success'

                return <span className={`badge ${badgeClass}`}>{status}</span>
            },
        }),
        columnHelper.accessor('last_reply', {
            header: 'Last Reply',
            cell: (info) => <span className="text-gray-500 text-sm">{info.getValue()}</span>
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: (info) => (
                <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-500 hover:text-primary-600 transition-colors" title="Reply">
                        <FiMessageCircle size={18} />
                    </button>
                    <button className="p-1 text-gray-500 hover:text-primary-600 transition-colors">
                        <FiEdit2 size={18} />
                    </button>
                    <button
                        onClick={() => {
                            if (window.confirm('Are you sure you want to delete this ticket?')) {
                                deleteTicket(info.row.original.id)
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
                title="Support Tickets"
                parent="Dashboard"
                action={
                    <Link to="/tickets/new" className="btn-primary flex items-center space-x-2">
                        <FiPlus />
                        <span>Open New Ticket</span>
                    </Link>
                }
            />
            <DataTable data={data} columns={columns} />
        </div>
    )
}

export default Tickets
