import { Link } from 'react-router-dom'
import { createColumnHelper } from '@tanstack/react-table'
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiPhone, FiMail } from 'react-icons/fi'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/common/DataTable'
import { useAppStore } from '../../store/appStore'

const Employees = () => {
    const { employees: data, deleteEmployee } = useAppStore()

    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor('name', {
            header: 'Name',
            cell: (info) => (
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-sm">
                        {info.getValue().charAt(0)}
                    </div>
                    <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">{info.getValue()}</div>
                        <div className="text-xs text-gray-500">{info.row.original.role}</div>
                    </div>
                </div>
            ),
        }),
        columnHelper.accessor('department', {
            header: 'Department',
        }),
        columnHelper.accessor('email', {
            header: 'Contact',
            cell: (info) => (
                <div className="flex flex-col space-y-1">
                    <div className="flex items-center text-sm text-gray-600">
                        <FiMail className="mr-2" size={14} />
                        {info.getValue()}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <FiPhone className="mr-2" size={14} />
                        {info.row.original.phone}
                    </div>
                </div>
            )
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
                            if (window.confirm('Are you sure you want to delete this employee?')) {
                                deleteEmployee(info.row.original.id)
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
                title="Employees"
                parent="Dashboard"
                action={
                    <button className="btn-primary flex items-center space-x-2">
                        <FiPlus />
                        <span>New Employee</span>
                    </button>
                }
            />

            <DataTable data={data} columns={columns} />
        </div>
    )
}

export default Employees
