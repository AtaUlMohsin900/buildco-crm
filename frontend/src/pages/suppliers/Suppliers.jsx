import { Link } from 'react-router-dom'
import { createColumnHelper } from '@tanstack/react-table'
import { FiPlus, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/common/DataTable'
import { useAppStore } from '../../store/appStore'

const Suppliers = () => {
    const { suppliers: data, deleteSupplier } = useAppStore()

    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor('name', {
            header: 'Supplier Name',
            cell: (info) => (
                <div className="font-medium text-gray-900 dark:text-gray-100">
                    <Link to={`/suppliers/${info.row.original.id}`} className="hover:text-primary-600 dark:hover:text-primary-400">
                        {info.getValue()}
                    </Link>
                </div>
            ),
        }),
        columnHelper.accessor('contact_person', {
            header: 'Contact Person',
        }),
        columnHelper.accessor('email', {
            header: 'Email',
            cell: (info) => <a href={`mailto:${info.getValue()}`} className="text-gray-600 hover:text-primary-600">{info.getValue()}</a>,
        }),
        columnHelper.accessor('phone', {
            header: 'Phone',
        }),
        columnHelper.accessor('category', {
            header: 'Category',
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
                    <Link to={`/suppliers/${info.row.original.id}`} className="p-1 text-gray-500 hover:text-primary-600 transition-colors">
                        <FiEye size={18} />
                    </Link>
                    <Link to={`/suppliers/edit/${info.row.original.id}`} className="p-1 text-gray-500 hover:text-primary-600 transition-colors">
                        <FiEdit2 size={18} />
                    </Link>
                    <button
                        onClick={() => {
                            if (window.confirm('Are you sure you want to delete this supplier?')) {
                                deleteSupplier(info.row.original.id)
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
                title="Suppliers"
                parent="Dashboard"
                action={
                    <Link to="/suppliers/new" className="btn-primary flex items-center space-x-2">
                        <FiPlus />
                        <span>New Supplier</span>
                    </Link>
                }
            />

            <DataTable data={data} columns={columns} />
        </div>
    )
}

export default Suppliers
