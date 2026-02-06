import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FiSave, FiX } from 'react-icons/fi'
import { toast } from 'react-toastify'
import PageHeader from '../../components/common/PageHeader'
import { useAppStore } from '../../store/appStore'
import { useClientStore } from '../../store/clientStore'

const ContractForm = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEditMode = !!id

    const { addContract, updateContract, contracts } = useAppStore()
    const { clients } = useClientStore()
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        subject: '',
        client: '',
        start_date: new Date().toISOString().split('T')[0],
        end_date: '',
        amount: '',
        status: 'Draft'
    })

    useEffect(() => {
        if (isEditMode) {
            const con = contracts.find(c => c.id === id)
            if (con) setFormData(con)
        }
    }, [id, isEditMode, contracts])

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
                updateContract(id, payload)
                toast.success('Contract updated')
            } else {
                addContract(payload)
                toast.success('Contract created')
            }
            navigate('/contracts')
        } catch (error) {
            toast.error('Error saving contract')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <PageHeader title={isEditMode ? 'Edit Contract' : 'New Contract'} parent="Contracts" action={null} />
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="label">Contract Subject *</label>
                        <input type="text" name="subject" required value={formData.subject} onChange={handleChange} className="input" placeholder="e.g. Master Service Agreement" />
                    </div>
                    <div>
                        <label className="label">Client *</label>
                        <select name="client" required value={formData.client} onChange={handleChange} className="input">
                            <option value="">-- Select Client --</option>
                            {clients.map(c => <option key={c.id} value={c.company}>{c.company}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="label">Total Amount</label>
                        <input type="number" name="amount" value={formData.amount} onChange={handleChange} className="input" />
                    </div>
                    <div>
                        <label className="label">Start Date</label>
                        <input type="date" name="start_date" required value={formData.start_date} onChange={handleChange} className="input" />
                    </div>
                    <div>
                        <label className="label">End Date</label>
                        <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} className="input" />
                    </div>
                    <div>
                        <label className="label">Status</label>
                        <select name="status" value={formData.status} onChange={handleChange} className="input">
                            <option value="Draft">Draft</option>
                            <option value="Active">Active</option>
                            <option value="Pending">Pending</option>
                            <option value="Expired">Expired</option>
                        </select>
                    </div>
                </div>
                <div className="mt-8 flex justify-end space-x-4">
                    <button type="button" onClick={() => navigate('/contracts')} className="btn btn-secondary">Cancel</button>
                    <button type="submit" className="btn btn-primary flex items-center space-x-2" disabled={loading}>
                        <FiSave /><span>{loading ? 'Saving...' : 'Save Contract'}</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ContractForm
