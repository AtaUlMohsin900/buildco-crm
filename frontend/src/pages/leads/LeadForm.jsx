import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FiSave, FiX } from 'react-icons/fi'
import { toast } from 'react-toastify'
import PageHeader from '../../components/common/PageHeader'
import { useAppStore } from '../../store/appStore'

const LeadForm = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEditMode = !!id

    const { addLead, updateLead, leads } = useAppStore()
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        source: 'Website',
        status: 'New',
        assigned: 'Sales Team'
    })

    useEffect(() => {
        if (isEditMode) {
            const lead = leads.find(l => l.id === parseInt(id))
            if (lead) setFormData(lead)
        }
    }, [id, isEditMode, leads])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (isEditMode) {
                updateLead(parseInt(id), formData)
                toast.success('Lead updated')
            } else {
                addLead(formData)
                toast.success('Lead added')
            }
            navigate('/leads')
        } catch (error) {
            toast.error('Error saving lead')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <PageHeader title={isEditMode ? 'Edit Lead' : 'New Lead'} parent="Leads" action={null} />
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="label">Full Name *</label>
                        <input type="text" name="name" required value={formData.name} onChange={handleChange} className="input" />
                    </div>
                    <div>
                        <label className="label">Company Name</label>
                        <input type="text" name="company" value={formData.company} onChange={handleChange} className="input" />
                    </div>
                    <div>
                        <label className="label">Email Address *</label>
                        <input type="email" name="email" required value={formData.email} onChange={handleChange} className="input" />
                    </div>
                    <div>
                        <label className="label">Source</label>
                        <select name="source" value={formData.source} onChange={handleChange} className="input">
                            <option value="Website">Website</option>
                            <option value="Referral">Referral</option>
                            <option value="Cold Call">Cold Call</option>
                            <option value="Social Media">Social Media</option>
                        </select>
                    </div>
                    <div>
                        <label className="label">Status</label>
                        <select name="status" value={formData.status} onChange={handleChange} className="input">
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Qualified">Qualified</option>
                            <option value="Lost">Lost</option>
                        </select>
                    </div>
                </div>
                <div className="mt-8 flex justify-end space-x-4">
                    <button type="button" onClick={() => navigate('/leads')} className="btn btn-secondary">Cancel</button>
                    <button type="submit" className="btn btn-primary flex items-center space-x-2" disabled={loading}>
                        <FiSave /><span>{loading ? 'Saving...' : 'Save Lead'}</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LeadForm
