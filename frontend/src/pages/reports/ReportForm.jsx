import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSave, FiCheck } from 'react-icons/fi'
import { toast } from 'react-toastify'
import PageHeader from '../../components/common/PageHeader'
import { useAppStore } from '../../store/appStore'

const ReportForm = () => {
    const navigate = useNavigate()
    const { addReport } = useAppStore()
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        type: 'Sales',
        date: new Date().toISOString().split('T')[0]
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            addReport(formData)
            toast.success('Report generated successfully')
            navigate('/reports')
        } catch (error) {
            toast.error('Error generating report')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <PageHeader title="Generate New Report" parent="Reports" action={null} />
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="label">Report Name *</label>
                        <input type="text" name="name" required value={formData.name} onChange={handleChange} className="input" placeholder="e.g. Monthly Revenue Feb 2026" />
                    </div>
                    <div>
                        <label className="label">Report Type</label>
                        <select name="type" value={formData.type} onChange={handleChange} className="input">
                            <option value="Sales">Sales Report</option>
                            <option value="Expenses">Expense Report</option>
                            <option value="Project">Project Progress</option>
                            <option value="Inventory">Inventory/Resources</option>
                        </select>
                    </div>
                    <div>
                        <label className="label">Reference Date</label>
                        <input type="date" name="date" required value={formData.date} onChange={handleChange} className="input" />
                    </div>
                </div>
                <div className="mt-8 flex justify-end space-x-4">
                    <button type="button" onClick={() => navigate('/reports')} className="btn btn-secondary">Cancel</button>
                    <button type="submit" className="btn btn-primary flex items-center space-x-2" disabled={loading}>
                        <FiCheck /><span>{loading ? 'Generating...' : 'Generate Report'}</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ReportForm
