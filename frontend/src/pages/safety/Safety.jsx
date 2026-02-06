import { Link } from 'react-router-dom'
import { createColumnHelper } from '@tanstack/react-table'
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/common/DataTable'
import { useAppStore } from '../../store/appStore'

const Safety = () => {
    const { safety: data, deleteSafetyRecord } = useAppStore()

    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor('type', {
            header: 'Type',
            cell: (info) => (
                <div className="flex items-center space-x-2">
                    {info.getValue() === 'Incident' || info.getValue() === 'Near Miss' ? (
                        <FiAlertTriangle className="text-warning-500" />
                    ) : (
                        <FiCheckCircle className="text-success-500" />
                    )}
                    <span className="font-medium text-gray-900 dark:text-gray-100">{info.getValue()}</span>
                </div>
            ),
        }),
        columnHelper.accessor('date', {
            header: 'Date',
        }),
        columnHelper.accessor('description', {
            header: 'Description',
            cell: (info) => <div className="truncate max-w-xs" title={info.getValue()}>{info.getValue()}</div>
        }),
        columnHelper.accessor('location', {
            header: 'Location',
        }),
        columnHelper.accessor('reported_by', {
            header: 'Reported By',
        }),
        columnHelper.accessor('status', {
            header: 'Status',
            cell: (info) => (
                <span className={`badge ${info.getValue() === 'Passed' || info.getValue() === 'Resolved' ? 'badge-success' : 'badge-warning'}`}>
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
                            if (window.confirm('Are you sure you want to delete this record?')) {
                                deleteSafetyRecord(info.row.original.id)
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
                title="Safety Management"
                parent="Dashboard"
                action={
                    <button className="btn-primary flex items-center space-x-2">
                        <FiPlus />
                        <span>New Report</span>
                    </button>
                }
            />

            <DataTable data={data} columns={columns} />
        </div>
    )
}

export default Safety
