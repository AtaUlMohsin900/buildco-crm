import { Link } from 'react-router-dom'
import { createColumnHelper } from '@tanstack/react-table'
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiStar } from 'react-icons/fi'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/common/DataTable'
import { useAppStore } from '../../store/appStore'

const Subcontractors = () => {
    const { subcontractors: data, deleteSubcontractor } = useAppStore()

    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor('company_name', {
            header: 'Company Name',
            cell: (info) => (
                <div className="font-medium text-gray-900 dark:text-gray-100">
                    {info.getValue()}
                </div>
            ),
        }),
        columnHelper.accessor('contact_person', {
            header: 'Contact Person',
        }),
        columnHelper.accessor('trade', {
            header: 'Trade',
        }),
        columnHelper.accessor('email', {
            header: 'Email',
            cell: (info) => <a href={`mailto:${info.getValue()}`} className="text-gray-600 hover:text-primary-600">{info.getValue()}</a>,
        }),
        columnHelper.accessor('rating', {
            header: 'Rating',
            cell: (info) => (
                <div className="flex items-center text-yellow-500">
                    <span className="mr-1 text-gray-700">{info.getValue()}</span>
                    <FiStar className="fill-current" size={14} />
                </div>
            ),
        }),
        columnHelper.accessor('status', {
            header: 'Status',
            cell: (info) => (
                <span className={`badge ${info.getValue() === 'Active' ? 'badge-success' : 'badge-secondary'}`}>
                    {info.getValue()}
                </span>
            ),
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: (info) => (
                <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-500 hover:text-primary-600 transition-colors">
                        <FiEye size={18} />
                    </button>
                    <button className="p-1 text-gray-500 hover:text-primary-600 transition-colors">
                        <FiEdit2 size={18} />
                    </button>
                    <button
                        onClick={() => {
                            if (window.confirm('Are you sure you want to delete this subcontractor?')) {
                                deleteSubcontractor(info.row.original.id)
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
                title="Subcontractors"
                parent="Dashboard"
                action={
                    <button className="btn-primary flex items-center space-x-2">
                        <FiPlus />
                        <span>New Subcontractor</span>
                    </button>
                }
            />

            <DataTable data={data} columns={columns} />
        </div>
    )
}

export default Subcontractors
