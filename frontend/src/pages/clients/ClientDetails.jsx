import { useParams } from 'react-router-dom'
import PageHeader from '../../components/common/PageHeader'
import UnderConstruction from '../../components/common/UnderConstruction'

const ClientDetails = () => {
    const { id } = useParams()
    return (
        <div>
            <PageHeader title={`Client Details #${id}`} parent="Clients" />
            <UnderConstruction title="Client Details View" />
        </div>
    )
}

export default ClientDetails
