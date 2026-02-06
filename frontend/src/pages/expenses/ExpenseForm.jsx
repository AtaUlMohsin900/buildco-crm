import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FiSave, FiX } from 'react-icons/fi'
import { toast } from 'react-toastify'
import PageHeader from '../../components/common/PageHeader'
import { useAppStore } from '../../store/appStore'

const ExpenseForm = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEditMode = !!id

    const { addExpense, updateExpense, expenses } = useAppStore()
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        category: 'Travel',
        date: new Date().toISOString().split('T')[0],
        amount: '',
        billable: 'No'
    })

    useEffect(() => {
        if (isEditMode) {
            const exp = expenses.find(e => e.id === parseInt(id))
            if (exp) setFormData(exp)
        }
    }, [id, isEditMode, expenses])

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
                updateExpense(parseInt(id), payload)
                toast.success('Expense updated')
            } else {
                addExpense(payload)
                toast.success('Expense recorded')
            }
            navigate('/expenses')
        } catch (error) {
            toast.error('Error saving expense')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <PageHeader title={isEditMode ? 'Edit Expense' : 'New Expense'} parent="Expenses" action={null} />
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="label">Expense Description *</label>
                        <input type="text" name="name" required value={formData.name} onChange={handleChange} className="input" placeholder="e.g. Office Supplies" />
                    </div>
                    <div>
                        <label className="label">Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} className="input">
                            <option value="Travel">Travel</option>
                            <option value="Office Supplies">Office Supplies</option>
                            <option value="Labor">Labor</option>
                            <option value="Materials">Materials</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="label">Date</label>
                        <input type="date" name="date" required value={formData.date} onChange={handleChange} className="input" />
                    </div>
                    <div>
                        <label className="label">Amount *</label>
                        <input type="number" name="amount" required value={formData.amount} onChange={handleChange} className="input" />
                    </div>
                    <div>
                        <label className="label">Billable to Client?</label>
                        <select name="billable" value={formData.billable} onChange={handleChange} className="input">
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                </div>
                <div className="mt-8 flex justify-end space-x-4">
                    <button type="button" onClick={() => navigate('/expenses')} className="btn btn-secondary">Cancel</button>
                    <button type="submit" className="btn btn-primary flex items-center space-x-2" disabled={loading}>
                        <FiSave /><span>{loading ? 'Saving...' : 'Save Expense'}</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ExpenseForm
