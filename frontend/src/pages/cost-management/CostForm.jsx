import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FiSave, FiX } from 'react-icons/fi'
import { toast } from 'react-toastify'
import PageHeader from '../../components/common/PageHeader'
import { useAppStore } from '../../store/appStore'

const CostForm = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEditMode = !!id

    const { addCost, updateCost, costs, projects } = useAppStore()
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        project: '',
        cost_code: '',
        budget: '',
        actual: '',
        status: 'On Track'
    })

    useEffect(() => {
        if (isEditMode) {
            const cost = costs.find(c => c.id === parseInt(id))
            if (cost) setFormData(cost)
        }
    }, [id, isEditMode, costs])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const payload = { 
                ...formData, 
                budget: parseFloat(formData.budget) || 0,
                actual: parseFloat(formData.actual) || 0,
                variance: (parseFloat(formData.budget) || 0) - (parseFloat(formData.actual) || 0)
            }
            if (isEditMode) {
                updateCost(parseInt(id), payload)
                toast.success('Cost entry updated')
            } else {
                addCost(payload)
                toast.success('Cost entry added')
            }
            navigate('/cost-management')
        } catch (error) {
            toast.error('Error saving cost entry')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <PageHeader title={isEditMode ? 'Edit Cost Entry' : 'New Cost Entry'} parent="Cost Management" action={null} />
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="label">Project</label>
                        <select name="project" required value={formData.project} onChange={handleChange} className="input">
                            <option value="">-- Select Project --</option>
                            {projects.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="label">Cost Code</label>
                        <input type="text" name="cost_code" required value={formData.cost_code} onChange={handleChange} className="input" placeholder="e.g. 01-General" />
                    </div>
                    <div>
                        <label className="label">Budget Amount *</label>
                        <input type="number" name="budget" required value={formData.budget} onChange={handleChange} className="input" />
                    </div>
                    <div>
                        <label className="label">Actual Spending</label>
                        <input type="number" name="actual" value={formData.actual} onChange={handleChange} className="input" />
                    </div>
                    <div>
                        <label className="label">Status</label>
                        <select name="status" value={formData.status} onChange={handleChange} className="input">
                            <option value="On Track">On Track</option>
                            <option value="Over Budget">Over Budget</option>
                            <option value="Under Budget">Under Budget</option>
                        </select>
                    </div>
                </div>
                <div className="mt-8 flex justify-end space-x-4">
                    <button type="button" onClick={() => navigate('/cost-management')} className="btn btn-secondary">Cancel</button>
                    <button type="submit" className="btn btn-primary flex items-center space-x-2" disabled={loading}>
                        <FiSave /><span>{loading ? 'Saving...' : 'Save Cost Entry'}</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CostForm
