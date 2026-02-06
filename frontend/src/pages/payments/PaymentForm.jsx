import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FiSave, FiX } from 'react-icons/fi'
import { toast } from 'react-toastify'
import PageHeader from '../../components/common/PageHeader'
import { useAppStore } from '../../store/appStore'

const PaymentForm = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEditMode = !!id

    const { addPayment, updatePayment, invoices, payments } = useAppStore()
    const [loading, setLoading] = useState(false)
    
    // Show all invoices (reversed for newest first)
    const dueInvoices = [...invoices].reverse()

    const [formData, setFormData] = useState({
        invoice: '',
        date: new Date().toISOString().split('T')[0],
        amount: '',
        mode: 'Bank Transfer',
        txid: '',
        notes: ''
    })

    // Load existing payment data if in edit mode
    useEffect(() => {
        if (isEditMode) {
            const paymentToEdit = payments.find(p => p.id === id)
            if (paymentToEdit) {
                setFormData({
                    invoice: paymentToEdit.invoice || '',
                    date: paymentToEdit.date || new Date().toISOString().split('T')[0],
                    amount: paymentToEdit.amount || '',
                    mode: paymentToEdit.mode || 'Bank Transfer',
                    txid: paymentToEdit.txid || '',
                    notes: paymentToEdit.notes || ''
                })
            } else {
                toast.error('Payment record not found')
                navigate('/payments')
            }
        }
    }, [id, isEditMode, payments, navigate])

    const handleChange = (e) => {
        const { name, value } = e.target
        
        // Special handling for invoice selection to auto-fill amount
        if (name === 'invoice') {
            const selectedInvoice = invoices.find(inv => inv.id === value)
            setFormData(prev => ({
                ...prev,
                invoice: value,
                // Only auto-fill amount if we found the invoice
                amount: selectedInvoice ? selectedInvoice.amount : prev.amount
            }))
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 500))
            
            const payload = {
                ...formData,
                amount: parseFloat(formData.amount)
            }

            if (isEditMode) {
                updatePayment(id, payload)
                toast.success('Payment updated successfully')
            } else {
                addPayment(payload)
                toast.success('Payment recorded successfully')
            }
            
            navigate('/payments')
        } catch (error) {
            toast.error(isEditMode ? 'Failed to update payment' : 'Failed to record payment')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <PageHeader
                title={isEditMode ? 'Edit Payment' : 'Record Payment'}
                parent="Payments"
                action={null}
            />

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Invoice Selection */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Select Invoice <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="invoice"
                            required
                            value={formData.invoice}
                            onChange={handleChange}
                            className="input"
                            disabled={isEditMode} // Optional: Lock invoice on edit if desired, but nice to allow change
                        >
                            <option value="">-- Select Invoice --</option>
                            {dueInvoices.map(inv => (
                                <option key={inv.id} value={inv.id}>
                                    {inv.id} - {inv.client} (Rs. {inv.amount.toFixed(2)}) - {inv.status}
                                </option>
                            ))}
                        </select>
                        <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">Showing all invoices (including Paid)</p>
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Payment Date <span className="text-red-500">*</span>
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

                    {/* Payment Mode */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Payment Mode <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="mode"
                            value={formData.mode}
                            onChange={handleChange}
                            className="input"
                        >
                            <option value="Bank Transfer">Bank Transfer</option>
                            <option value="Cash">Cash</option>
                            <option value="Cheque">Cheque</option>
                            <option value="Online">Online (Credit/Debit)</option>
                            <option value="UPI">UPI / Wallet</option>
                        </select>
                    </div>

                    {/* Transaction ID */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Transaction ID / Cheque No.
                        </label>
                        <input
                            type="text"
                            name="txid"
                            value={formData.txid}
                            onChange={handleChange}
                            className="input"
                            placeholder="e.g. TXN12345678"
                        />
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Amount Received <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-2 text-gray-500 dark:text-gray-400">Rs.</span>
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

                    {/* Notes */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Notes / Remarks
                        </label>
                        <textarea
                            name="notes"
                            rows="3"
                            value={formData.notes}
                            onChange={handleChange}
                            className="input"
                            placeholder="Add any additional notes here..."
                        ></textarea>
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate('/payments')}
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
                        <span>{loading ? 'Saving...' : (isEditMode ? 'Update Payment' : 'Record Payment')}</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default PaymentForm
