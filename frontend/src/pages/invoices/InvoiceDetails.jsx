import { useParams } from 'react-router-dom'
import PageHeader from '../../components/common/PageHeader'
import UnderConstruction from '../../components/common/UnderConstruction'

const InvoiceDetails = () => {
    const { id } = useParams()
    return (
        <div>
            <PageHeader title={`Invoice ${id}`} parent="Invoices" />
            <UnderConstruction title="Invoice View" />
        </div>
    )
}

export default InvoiceDetails
