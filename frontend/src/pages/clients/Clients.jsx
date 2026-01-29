import { Link } from 'react-router-dom'
import { createColumnHelper } from '@tanstack/react-table'
import { FiPlus, FiMoreHorizontal, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/common/DataTable'

import { useClientStore } from '../../store/clientStore'

const Clients = () => {
    // Data from store
    const { clients: data, deleteClient } = useClientStore()

    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor('company', {
            header: 'Company',
            cell: (info) => (
                <div className="font-medium text-gray-900">
                    <Link to={`/clients/${info.row.original.id}`} className="hover:text-primary-600">
                        {info.getValue()}
                    </Link>
                </div>
            ),
        }),
        columnHelper.accessor('contact', {
            header: 'Primary Contact',
        }),
        columnHelper.accessor('email', {
            header: 'Email',
            cell: (info) => <a href={`mailto:${info.getValue()}`} className="text-gray-600 hover:text-primary-600">{info.getValue()}</a>,
        }),
        columnHelper.accessor('phone', {
            header: 'Phone',
        }),
        columnHelper.accessor('status', {
            header: 'Status',
            cell: (info) => (
                <span className={`badge ${info.getValue() === 'Active' ? 'badge-success' : 'badge-secondary'}`}>
                    {info.getValue()}
                </span>
            ),
        }),
        columnHelper.accessor('due', {
            header: 'Due Amount',
            cell: (info) => <span className="text-danger-600 font-medium">Rs. {info.getValue().toFixed(2)}</span>
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: (info) => (
                <div className="flex items-center space-x-2">
                    <Link to={`/clients/${info.row.original.id}`} className="p-1 text-gray-500 hover:text-primary-600 transition-colors">
                        <FiEye size={18} />
                    </Link>
                    <button className="p-1 text-gray-500 hover:text-primary-600 transition-colors">
                        <FiEdit2 size={18} />
                    </button>
                    <button
                        onClick={() => {
                            if (window.confirm('Are you sure you want to delete this client?')) {
                                deleteClient(info.row.original.id)
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
                title="Clients"
                parent="Dashboard"
                action={
                    <Link to="/clients/new" className="btn-primary flex items-center space-x-2">
                        <FiPlus />
                        <span>New Client</span>
                    </Link>
                }
            />

            <DataTable data={data} columns={columns} />
        </div>
    )
}

export default Clients
