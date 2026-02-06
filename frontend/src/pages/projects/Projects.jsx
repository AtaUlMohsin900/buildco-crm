import { Link } from 'react-router-dom'
import { createColumnHelper } from '@tanstack/react-table'
import { FiPlus, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/common/DataTable'
import { useAppStore } from '../../store/appStore'

const Projects = () => {
    // Data from store
    const { projects: data, deleteProject } = useAppStore()

    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor('name', {
            header: 'Project Name',
            cell: (info) => <span className="font-medium text-gray-900 dark:text-gray-100">{info.getValue()}</span>
        }),
        columnHelper.accessor('client', {
            header: 'Client',
        }),
        columnHelper.accessor('start_date', {
            header: 'Start Date',
        }),
        columnHelper.accessor('deadline', {
            header: 'Deadline',
        }),
        columnHelper.accessor('status', {
            header: 'Status',
            cell: (info) => {
                const status = info.getValue()
                let badgeClass = 'badge-secondary'
                if (status === 'In Progress') badgeClass = 'badge-primary'
                if (status === 'Completed') badgeClass = 'badge-success'
                if (status === 'Not Started') badgeClass = 'badge-warning'
                if (status === 'On Hold') badgeClass = 'badge-danger'

                return <span className={`badge ${badgeClass}`}>{status}</span>
            },
        }),
        columnHelper.accessor('progress', {
            header: 'Progress',
            cell: (info) => (
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        className="bg-primary-600 h-2.5 rounded-full"
                        style={{ width: `${info.getValue()}%` }}
                    ></div>
                </div>
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
                            if (window.confirm('Are you sure you want to delete this project?')) {
                                deleteProject(info.row.original.id)
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
                title="Projects"
                parent="Dashboard"
                action={
                    <Link to="/projects/new" className="btn-primary flex items-center space-x-2">
                        <FiPlus />
                        <span>New Project</span>
                    </Link>
                }
            />

            <DataTable data={data} columns={columns} />
        </div>
    )
}

export default Projects
