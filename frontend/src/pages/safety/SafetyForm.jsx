import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FiSave, FiX } from 'react-icons/fi'
import { toast } from 'react-toastify'
import PageHeader from '../../components/common/PageHeader'
import { useAppStore } from '../../store/appStore'

const SafetyForm = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEditMode = !!id

    const { addSafetyRecord, updateSafetyRecord, safety } = useAppStore()
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        type: 'Inspection',
        date: new Date().toISOString().split('T')[0],
        description: '',
        reported_by: '',
        status: 'Passed',
        location: ''
    })

    useEffect(() => {
        if (isEditMode) {
            const rec = safety.find(s => s.id === parseInt(id))
            if (rec) setFormData(rec)
        }
    }, [id, isEditMode, safety])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (isEditMode) {
                updateSafetyRecord(parseInt(id), formData)
                toast.success('Safety record updated')
            } else {
                addSafetyRecord(formData)
                toast.success('Safety record added')
            }
            navigate('/safety')
        } catch (error) {
            toast.error('Error saving safety record')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <PageHeader title={isEditMode ? 'Edit Safety Record' : 'New Safety Record'} parent="Safety" action={null} />
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="label">Record Type</label>
                        <select name="type" value={formData.type} onChange={handleChange} className="input">
                            <option value="Inspection">Inspection</option>
                            <option value="Incident">Incident</option>
                            <option value="Near Miss">Near Miss</option>
                            <option value="Training">Training</option>
                        </select>
                    </div>
                    <div>
                        <label className="label">Date</label>
                        <input type="date" name="date" required value={formData.date} onChange={handleChange} className="input" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="label">Description *</label>
                        <textarea name="description" required value={formData.description} onChange={handleChange} className="input h-24" placeholder="Details of the safety event..."></textarea>
                    </div>
                    <div>
                        <label className="label">Reported By</label>
                        <input type="text" name="reported_by" value={formData.reported_by} onChange={handleChange} className="input" />
                    </div>
                    <div>
                        <label className="label">Location</label>
                        <input type="text" name="location" value={formData.location} onChange={handleChange} className="input" />
                    </div>
                    <div>
                        <label className="label">Status</label>
                        <select name="status" value={formData.status} onChange={handleChange} className="input">
                            <option value="Passed">Passed</option>
                            <option value="Failed">Failed</option>
                            <option value="Pending">Pending</option>
                            <option value="Resolved">Resolved</option>
                        </select>
                    </div>
                </div>
                <div className="mt-8 flex justify-end space-x-4">
                    <button type="button" onClick={() => navigate('/safety')} className="btn btn-secondary">Cancel</button>
                    <button type="submit" className="btn btn-primary flex items-center space-x-2" disabled={loading}>
                        <FiSave /><span>{loading ? 'Saving...' : 'Save Record'}</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SafetyForm
