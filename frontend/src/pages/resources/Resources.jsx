import { Link } from 'react-router-dom'
import { createColumnHelper } from '@tanstack/react-table'
import { FiPlus, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/common/DataTable'
import { useAppStore } from '../../store/appStore'

const Resources = () => {
    const { resources: data, deleteResource } = useAppStore()

    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor('name', {
            header: 'Resource Name',
            cell: (info) => (
                <div className="font-medium text-gray-900 dark:text-gray-100">
                    <Link to={`/resources/${info.row.original.id}`} className="hover:text-primary-600 dark:hover:text-primary-400">
                        {info.getValue()}
                    </Link>
                </div>
            ),
        }),
        columnHelper.accessor('type', {
            header: 'Type',
        }),
        columnHelper.accessor('quantity', {
            header: 'Quantity',
        }),
        columnHelper.accessor('unit', {
            header: 'Unit',
        }),
        columnHelper.accessor('cost', {
            header: 'Cost',
            cell: (info) => <span className="font-medium">Rs. {info.getValue().toFixed(2)}</span>
        }),
        columnHelper.accessor('status', {
            header: 'Status',
            cell: (info) => (
                <span className={`badge ${info.getValue() === 'In Stock' || info.getValue() === 'Active' ? 'badge-success' : 'badge-warning'}`}>
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
                            if (window.confirm('Are you sure you want to delete this resource?')) {
                                deleteResource(info.row.original.id)
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
                title="Resources"
                parent="Dashboard"
                action={
                    <button className="btn-primary flex items-center space-x-2">
                        <FiPlus />
                        <span>New Resource</span>
                    </button>
                }
            />

            <DataTable data={data} columns={columns} />
        </div>
    )
}

export default Resources
