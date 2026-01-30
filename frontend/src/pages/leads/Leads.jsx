import { Link } from 'react-router-dom'
import { createColumnHelper } from '@tanstack/react-table'
import { FiPlus, FiEdit2, FiTrash2, FiUserCheck, FiMail } from 'react-icons/fi'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/common/DataTable'
import { useAppStore } from '../../store/appStore'

const Leads = () => {
    const { leads: data, deleteLead } = useAppStore()
    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor('name', {
            header: 'Name',
            cell: (info) => <span className="font-medium text-gray-900">{info.getValue()}</span>
        }),
        columnHelper.accessor('company', {
            header: 'Company',
        }),
        columnHelper.accessor('email', {
            header: 'Email',
            cell: (info) => (
                <a href={`mailto:${info.getValue()}`} className="flex items-center text-gray-600 hover:text-primary-600">
                    <FiMail className="mr-2" /> {info.getValue()}
                </a>
            )
        }),
        columnHelper.accessor('source', {
            header: 'Source',
        }),
        columnHelper.accessor('status', {
            header: 'Status',
            cell: (info) => {
                const status = info.getValue()
                let badgeClass = 'badge-secondary'
                if (status === 'New') badgeClass = 'badge-primary'
                if (status === 'Contacted') badgeClass = 'badge-warning'
                if (status === 'Qualified') badgeClass = 'badge-success'
                if (status === 'Lost') badgeClass = 'badge-danger'

                return <span className={`badge ${badgeClass}`}>{status}</span>
            }
        }),
        columnHelper.accessor('assigned', {
            header: 'Assigned To',
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: (info) => (
                <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-500 hover:text-success-600 transition-colors" title="Convert to Client">
                        <FiUserCheck size={18} />
                    </button>
                    <Link to={`/leads/${info.row.original.id}`} className="p-1 text-gray-500 hover:text-primary-600 transition-colors">
                        <FiEdit2 size={18} />
                    </Link>
                    <button
                        onClick={() => {
                            if (window.confirm('Are you sure you want to delete this lead?')) {
                                deleteLead(info.row.original.id)
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
                title="Leads"
                parent="Dashboard"
                action={
                    <Link to="/leads/new" className="btn-primary flex items-center space-x-2">
                        <FiPlus />
                        <span>New Lead</span>
                    </Link>
                }
            />
            <DataTable data={data} columns={columns} />
        </div>
    )
}

export default Leads
