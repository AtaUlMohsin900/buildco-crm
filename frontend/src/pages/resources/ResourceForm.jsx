import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FiSave, FiX } from 'react-icons/fi'
import { toast } from 'react-toastify'
import PageHeader from '../../components/common/PageHeader'
import { useAppStore } from '../../store/appStore'

const ResourceForm = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEditMode = !!id

    const { addResource, updateResource, resources } = useAppStore()
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        type: 'Material',
        quantity: '',
        unit: '',
        cost: '',
        status: 'In Stock'
    })

    useEffect(() => {
        if (isEditMode) {
            const resource = resources.find(r => r.id === parseInt(id))
            if (resource) setFormData(resource)
        }
    }, [id, isEditMode, resources])

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
                quantity: parseFloat(formData.quantity) || 0,
                cost: parseFloat(formData.cost) || 0 
            }
            if (isEditMode) {
                updateResource(parseInt(id), payload)
                toast.success('Resource updated')
            } else {
                addResource(payload)
                toast.success('Resource added')
            }
            navigate('/resources')
        } catch (error) {
            toast.error('Error saving resource')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <PageHeader title={isEditMode ? 'Edit Resource' : 'New Resource'} parent="Resources" action={null} />
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="label">Resource Name *</label>
                        <input type="text" name="name" required value={formData.name} onChange={handleChange} className="input" placeholder="e.g. Cement Bags" />
                    </div>
                    <div>
                        <label className="label">Type</label>
                        <select name="type" value={formData.type} onChange={handleChange} className="input">
                            <option value="Material">Material</option>
                            <option value="Equipment">Equipment</option>
                            <option value="Labor">Labor</option>
                        </select>
                    </div>
                    <div>
                        <label className="label">Quantity *</label>
                        <input type="number" name="quantity" required value={formData.quantity} onChange={handleChange} className="input" />
                    </div>
                    <div>
                        <label className="label">Unit</label>
                        <input type="text" name="unit" value={formData.unit} onChange={handleChange} className="input" placeholder="e.g. Bags, Kg, Units" />
                    </div>
                    <div>
                        <label className="label">Cost per Unit</label>
                        <input type="number" name="cost" value={formData.cost} onChange={handleChange} className="input" />
                    </div>
                </div>
                <div className="mt-8 flex justify-end space-x-4">
                    <button type="button" onClick={() => navigate('/resources')} className="btn btn-secondary">Cancel</button>
                    <button type="submit" className="btn btn-primary flex items-center space-x-2" disabled={loading}>
                        <FiSave /><span>{loading ? 'Saving...' : 'Save Resource'}</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ResourceForm
