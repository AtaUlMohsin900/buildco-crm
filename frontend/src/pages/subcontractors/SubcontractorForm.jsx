import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FiSave, FiX } from 'react-icons/fi'
import { toast } from 'react-toastify'
import PageHeader from '../../components/common/PageHeader'
import { useAppStore } from '../../store/appStore'

const SubcontractorForm = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEditMode = !!id

    const { addSubcontractor, updateSubcontractor, subcontractors } = useAppStore()
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        company_name: '',
        contact_person: '',
        trade: '',
        phone: '',
        email: '',
        status: 'Active',
        rating: 5.0
    })

    useEffect(() => {
        if (isEditMode) {
            const sub = subcontractors.find(s => s.id === parseInt(id))
            if (sub) setFormData(sub)
        }
    }, [id, isEditMode, subcontractors])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const payload = { ...formData, rating: parseFloat(formData.rating) || 0 }
            if (isEditMode) {
                updateSubcontractor(parseInt(id), payload)
                toast.success('Subcontractor updated')
            } else {
                addSubcontractor(payload)
                toast.success('Subcontractor added')
            }
            navigate('/subcontractors')
        } catch (error) {
            toast.error('Error saving subcontractor')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <PageHeader title={isEditMode ? 'Edit Subcontractor' : 'New Subcontractor'} parent="Subcontractors" action={null} />
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="label">Company Name *</label>
                        <input type="text" name="company_name" required value={formData.company_name} onChange={handleChange} className="input" />
                    </div>
                    <div>
                        <label className="label">Contact Person</label>
                        <input type="text" name="contact_person" value={formData.contact_person} onChange={handleChange} className="input" />
                    </div>
                    <div>
                        <label className="label">Trade (e.g. Electrical)</label>
                        <input type="text" name="trade" value={formData.trade} onChange={handleChange} className="input" />
                    </div>
                    <div>
                        <label className="label">Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="input" />
                    </div>
                    <div>
                        <label className="label">Phone</label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="input" />
                    </div>
                    <div>
                        <label className="label">Rating (1-5)</label>
                        <input type="number" step="0.1" name="rating" value={formData.rating} onChange={handleChange} className="input" />
                    </div>
                </div>
                <div className="mt-8 flex justify-end space-x-4">
                    <button type="button" onClick={() => navigate('/subcontractors')} className="btn btn-secondary">Cancel</button>
                    <button type="submit" className="btn btn-primary flex items-center space-x-2" disabled={loading}>
                        <FiSave /><span>{loading ? 'Saving...' : 'Save Subcontractor'}</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SubcontractorForm
