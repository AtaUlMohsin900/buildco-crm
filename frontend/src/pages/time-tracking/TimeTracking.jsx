import { Link } from 'react-router-dom'
import { createColumnHelper } from '@tanstack/react-table'
import { FiPlus, FiEdit2, FiTrash2, FiClock } from 'react-icons/fi'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/common/DataTable'
import { useAppStore } from '../../store/appStore'

const TimeTracking = () => {
    const { timeEntries: data, deleteTimeEntry } = useAppStore()

    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor('employee', {
            header: 'Employee',
            cell: (info) => (
                <div className="font-medium text-gray-900 dark:text-gray-100">
                    {info.getValue()}
                </div>
            ),
        }),
        columnHelper.accessor('project', {
            header: 'Project',
        }),
        columnHelper.accessor('date', {
            header: 'Date',
        }),
        columnHelper.accessor('hours', {
            header: 'Hours',
            cell: (info) => (
                <div className="flex items-center">
                    <FiClock className="mr-2 text-gray-400" size={14} />
                    <span>{info.getValue()} hrs</span>
                </div>
            ),
        }),
        columnHelper.accessor('description', {
            header: 'Description',
        }),
        columnHelper.accessor('status', {
            header: 'Status',
            cell: (info) => (
                <span className={`badge ${info.getValue() === 'Approved' ? 'badge-success' : 'badge-warning'}`}>
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
                        <FiEdit2 size={18} />
                    </button>
                    <button
                        onClick={() => {
                            if (window.confirm('Are you sure you want to delete this entry?')) {
                                deleteTimeEntry(info.row.original.id)
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
                title="Time Tracking"
                parent="Dashboard"
                action={
                    <button className="btn-primary flex items-center space-x-2">
                        <FiPlus />
                        <span>Log Time</span>
                    </button>
                }
            />

            <DataTable data={data} columns={columns} />
        </div>
    )
}

export default TimeTracking
