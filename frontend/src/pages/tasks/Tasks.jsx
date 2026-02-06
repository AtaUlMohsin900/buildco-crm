import { Link } from 'react-router-dom'
import { createColumnHelper } from '@tanstack/react-table'
import { FiPlus, FiEdit2, FiTrash2, FiCheckCircle } from 'react-icons/fi'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/common/DataTable'
import { useAppStore } from '../../store/appStore'

const Tasks = () => {
    // Data from store
    const { tasks: data, deleteTask } = useAppStore()

    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor('title', {
            header: 'Task Name',
            cell: (info) => <span className="font-medium text-gray-900 dark:text-gray-100">{info.getValue()}</span>
        }),
        columnHelper.accessor('project', {
            header: 'Project',
        }),
        columnHelper.accessor('assignee', {
            header: 'Assigned To',
        }),
        columnHelper.accessor('duedate', {
            header: 'Due Date',
        }),
        columnHelper.accessor('priority', {
            header: 'Priority',
            cell: (info) => {
                const priority = info.getValue()
                let colorClass = 'text-gray-600'
                if (priority === 'High') colorClass = 'text-danger-600'
                if (priority === 'Medium') colorClass = 'text-warning-600'
                if (priority === 'Low') colorClass = 'text-success-600'

                return <span className={`font-medium ${colorClass}`}>{priority}</span>
            }
        }),
        columnHelper.accessor('status', {
            header: 'Status',
            cell: (info) => {
                const status = info.getValue()
                let badgeClass = 'badge-secondary'
                if (status === 'In Progress') badgeClass = 'badge-primary'
                if (status === 'Completed') badgeClass = 'badge-success'
                if (status === 'Pending') badgeClass = 'badge-warning'

                return <span className={`badge ${badgeClass}`}>{status}</span>
            },
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: (info) => (
                <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-500 hover:text-success-600 transition-colors" title="Mark Complete">
                        <FiCheckCircle size={18} />
                    </button>
                    <Link to={`/tasks/${info.row.original.id}`} className="p-1 text-gray-500 hover:text-primary-600 transition-colors">
                        <FiEdit2 size={18} />
                    </Link>
                    <button
                        onClick={() => {
                            if (window.confirm('Are you sure you want to delete this task?')) {
                                deleteTask(info.row.original.id)
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
                title="Tasks"
                parent="Dashboard"
                action={
                    <Link to="/tasks/new" className="btn-primary flex items-center space-x-2">
                        <FiPlus />
                        <span>New Task</span>
                    </Link>
                }
            />

            <DataTable data={data} columns={columns} />
        </div>
    )
}

export default Tasks
