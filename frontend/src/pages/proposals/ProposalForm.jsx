import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FiSave, FiX } from 'react-icons/fi'
import { toast } from 'react-toastify'
import PageHeader from '../../components/common/PageHeader'
import { useAppStore } from '../../store/appStore'

const ProposalForm = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEditMode = !!id

    const { addProposal, updateProposal, proposals } = useAppStore()
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        to: '',
        subject: '',
        date: new Date().toISOString().split('T')[0],
        open_till: '',
        status: 'Draft'
    })

    useEffect(() => {
        if (isEditMode) {
            const prop = proposals.find(p => p.id === id)
            if (prop) setFormData(prop)
        }
    }, [id, isEditMode, proposals])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (isEditMode) {
                updateProposal(id, formData)
                toast.success('Proposal updated')
            } else {
                addProposal(formData)
                toast.success('Proposal created')
            }
            navigate('/proposals')
        } catch (error) {
            toast.error('Error saving proposal')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <PageHeader title={isEditMode ? 'Edit Proposal' : 'New Proposal'} parent="Proposals" action={null} />
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="label">Sent To *</label>
                        <input type="text" name="to" required value={formData.to} onChange={handleChange} className="input" placeholder="e.g. Big Corp" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="label">Subject *</label>
                        <input type="text" name="subject" required value={formData.subject} onChange={handleChange} className="input" placeholder="e.g. Service Proposal" />
                    </div>
                    <div>
                        <label className="label">Proposal Date</label>
                        <input type="date" name="date" required value={formData.date} onChange={handleChange} className="input" />
                    </div>
                    <div>
                        <label className="label">Valid Till</label>
                        <input type="date" name="open_till" value={formData.open_till} onChange={handleChange} className="input" />
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
                    <button type="button" onClick={() => navigate('/proposals')} className="btn btn-secondary">Cancel</button>
                    <button type="submit" className="btn btn-primary flex items-center space-x-2" disabled={loading}>
                        <FiSave /><span>{loading ? 'Saving...' : 'Save Proposal'}</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ProposalForm
