import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSave, FiX } from 'react-icons/fi'
import { toast } from 'react-toastify'
import PageHeader from '../../components/common/PageHeader'
import { useAppStore } from '../../store/appStore'

const InvoiceForm = () => {
    const navigate = useNavigate()
    const { addInvoice } = useAppStore()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        client: '',
        date: new Date().toISOString().split('T')[0],
        duedate: new Date().toISOString().split('T')[0],
        amount: '',
        status: 'Unpaid',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            await new Promise((resolve) => setTimeout(resolve, 500))
            addInvoice({
                ...formData,
                amount: parseFloat(formData.amount)
            })
            toast.success('Invoice created successfully')
            navigate('/invoices')
        } catch (error) {
            toast.error('Failed to create invoice')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <PageHeader
                title="New Invoice"
                parent="Invoices"
                action={null}
            />

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Client */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Client <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="client"
                            required
                            value={formData.client}
                            onChange={handleChange}
                            className="input"
                            placeholder="Enter client name"
                        />
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Invoice Date <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            name="date"
                            required
                            value={formData.date}
                            onChange={handleChange}
                            className="input"
                        />
                    </div>

                    {/* Due Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Due Date <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            name="duedate"
                            required
                            value={formData.duedate}
                            onChange={handleChange}
                            className="input"
                        />
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Amount <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-2 text-gray-500">Rs.</span>
                            <input
                                type="number"
                                name="amount"
                                required
                                min="0"
                                step="0.01"
                                value={formData.amount}
                                onChange={handleChange}
                                className="input pl-10"
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="input"
                        >
                            <option value="Unpaid">Unpaid</option>
                            <option value="Paid">Paid</option>
                            <option value="Overdue">Overdue</option>
                        </select>
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate('/invoices')}
                        className="btn btn-secondary flex items-center space-x-2"
                        disabled={loading}
                    >
                        <FiX />
                        <span>Cancel</span>
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary flex items-center space-x-2"
                        disabled={loading}
                    >
                        <FiSave />
                        <span>{loading ? 'Saving...' : 'Save Invoice'}</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default InvoiceForm
