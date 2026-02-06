import { createColumnHelper } from '@tanstack/react-table'
import { FiDownload, FiFileText } from 'react-icons/fi'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/common/DataTable'
import { useAppStore } from '../../store/appStore'

const Reports = () => {
    const { reports: data } = useAppStore()
    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor('name', {
            header: 'Report Name',
            cell: (info) => (
                <div className="flex items-center">
                    <FiFileText className="mr-2 text-primary-500" />
                    <span className="font-medium text-gray-900">{info.getValue()}</span>
                </div>
            )
        }),
        columnHelper.accessor('type', {
            header: 'Type',
        }),
        columnHelper.accessor('date', {
            header: 'Generated Date',
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: () => (
                <button className="p-1 text-gray-500 hover:text-primary-600 transition-colors" title="Download">
                    <FiDownload size={18} />
                </button>
            ),
        }),
    ]

    return (
        <div className="animate-fade-in">
            <PageHeader
                title="Reports"
                parent="Dashboard"
                action={
                    <Link to="/reports/new" className="btn-primary flex items-center space-x-2">
                        <FiFileText />
                        <span>Generate Report</span>
                    </Link>
                }
            />
            <DataTable data={data} columns={columns} />
        </div>
    )
}

export default Reports
