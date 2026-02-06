import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FiSave, FiX } from 'react-icons/fi'
import { toast } from 'react-toastify'
import PageHeader from '../../components/common/PageHeader'
import { useAppStore } from '../../store/appStore'

const TimeEntryForm = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEditMode = !!id

    const { addTimeEntry, updateTimeEntry, timeEntries, projects, employees } = useAppStore()
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        employee: '',
        project: '',
        date: new Date().toISOString().split('T')[0],
        hours: '',
        description: '',
        status: 'Pending'
    })

    useEffect(() => {
        if (isEditMode) {
            const entry = timeEntries.find(e => e.id === parseInt(id))
            if (entry) setFormData(entry)
        }
    }, [id, isEditMode, timeEntries])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const payload = { ...formData, hours: parseFloat(formData.hours) || 0 }
            if (isEditMode) {
                updateTimeEntry(parseInt(id), payload)
                toast.success('Time entry updated')
            } else {
                addTimeEntry(payload)
                toast.success('Time entry added')
            }
            navigate('/time-tracking')
        } catch (error) {
            toast.error('Error saving time entry')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <PageHeader title={isEditMode ? 'Edit Time Entry' : 'Log Time'} parent="Time Tracking" action={null} />
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="label">Employee</label>
                        <select name="employee" required value={formData.employee} onChange={handleChange} className="input">
                            <option value="">-- Select Employee --</option>
                            {employees.map(e => <option key={e.id} value={e.name}>{e.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="label">Project</label>
                        <select name="project" required value={formData.project} onChange={handleChange} className="input">
                            <option value="">-- Select Project --</option>
                            {projects.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="label">Date</label>
                        <input type="date" name="date" required value={formData.date} onChange={handleChange} className="input" />
                    </div>
                    <div>
                        <label className="label">Hours Worked *</label>
                        <input type="number" step="0.5" name="hours" required value={formData.hours} onChange={handleChange} className="input" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="label">Description</label>
                        <input type="text" name="description" value={formData.description} onChange={handleChange} className="input" />
                    </div>
                </div>
                <div className="mt-8 flex justify-end space-x-4">
                    <button type="button" onClick={() => navigate('/time-tracking')} className="btn btn-secondary">Cancel</button>
                    <button type="submit" className="btn btn-primary flex items-center space-x-2" disabled={loading}>
                        <FiSave /><span>{loading ? 'Saving...' : 'Save Time Entry'}</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default TimeEntryForm
