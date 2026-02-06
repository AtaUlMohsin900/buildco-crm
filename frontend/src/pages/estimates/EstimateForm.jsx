import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FiSave, FiX } from 'react-icons/fi'
import { toast } from 'react-toastify'
import PageHeader from '../../components/common/PageHeader'
import { useAppStore } from '../../store/appStore'
import { useClientStore } from '../../store/clientStore'

const EstimateForm = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEditMode = !!id

    const { addEstimate, updateEstimate, estimates } = useAppStore()
    const { clients } = useClientStore()
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        client: '',
        date: new Date().toISOString().split('T')[0],
        expiry: '',
        amount: '',
        status: 'Draft'
    })

    useEffect(() => {
        if (isEditMode) {
            const est = estimates.find(e => e.id === id)
            if (est) setFormData(est)
        }
    }, [id, isEditMode, estimates])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const payload = { ...formData, amount: parseFloat(formData.amount) || 0 }
            if (isEditMode) {
                updateEstimate(id, payload)
                toast.success('Estimate updated')
            } else {
                addEstimate(payload)
                toast.success('Estimate created')
            }
            navigate('/estimates')
        } catch (error) {
            toast.error('Error saving estimate')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <PageHeader title={isEditMode ? 'Edit Estimate' : 'New Estimate'} parent="Estimates" action={null} />
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="label">Client *</label>
                        <select name="client" required value={formData.client} onChange={handleChange} className="input">
                            <option value="">-- Select Client --</option>
                            {clients.map(c => <option key={c.id} value={c.company}>{c.company}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="label">Estimate Date</label>
                        <input type="date" name="date" required value={formData.date} onChange={handleChange} className="input" />
                    </div>
                    <div>
                        <label className="label">Expiry Date</label>
                        <input type="date" name="expiry" value={formData.expiry} onChange={handleChange} className="input" />
                    </div>
                    <div>
                        <label className="label">Total Amount *</label>
                        <input type="number" name="amount" required value={formData.amount} onChange={handleChange} className="input" />
                    </div>
                    <div>
                        <label className="label">Status</label>
                        <select name="status" value={formData.status} onChange={handleChange} className="input">
                            <option value="Draft">Draft</option>
                            <option value="Sent">Sent</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Declined">Declined</option>
                        </select>
                    </div>
                </div>
                <div className="mt-8 flex justify-end space-x-4">
                    <button type="button" onClick={() => navigate('/estimates')} className="btn btn-secondary">Cancel</button>
                    <button type="submit" className="btn btn-primary flex items-center space-x-2" disabled={loading}>
                        <FiSave /><span>{loading ? 'Saving...' : 'Save Estimate'}</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EstimateForm
