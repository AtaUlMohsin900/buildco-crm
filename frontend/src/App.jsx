import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'

// Layouts
import DashboardLayout from './layouts/DashboardLayout'
import AuthLayout from './layouts/AuthLayout'

// Pages
import Login from './pages/auth/Login'
import Dashboard from './pages/dashboard/Dashboard'
import Clients from './pages/clients/Clients'
import ClientForm from './pages/clients/ClientForm'
import ClientDetails from './pages/clients/ClientDetails'
import Invoices from './pages/invoices/Invoices'
import InvoiceForm from './pages/invoices/InvoiceForm'
import InvoiceDetails from './pages/invoices/InvoiceDetails'
import Estimates from './pages/estimates/Estimates'
import Projects from './pages/projects/Projects'
import ProjectForm from './pages/projects/ProjectForm'
import Tasks from './pages/tasks/Tasks'
import Leads from './pages/leads/Leads'
import Proposals from './pages/proposals/Proposals'
import Contracts from './pages/contracts/Contracts'
import Expenses from './pages/expenses/Expenses'
import Payments from './pages/payments/Payments'
import Tickets from './pages/tickets/Tickets'
import TicketForm from './pages/tickets/TicketForm'
import Reports from './pages/reports/Reports'
import Settings from './pages/settings/Settings'
import NotFound from './pages/NotFound'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuthStore()

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return children
}

function App() {
    return (
        <Routes>
            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
            </Route>

            {/* Protected Dashboard Routes */}
            <Route
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Clients */}
                <Route path="/clients" element={<Clients />} />
                <Route path="/clients/new" element={<ClientForm />} />
                <Route path="/clients/:id" element={<ClientDetails />} />

                {/* Invoices */}
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/invoices/new" element={<InvoiceForm />} />
                <Route path="/invoices/:id" element={<InvoiceDetails />} />

                {/* Estimates */}
                <Route path="/estimates" element={<Estimates />} />

                {/* Projects */}
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/new" element={<ProjectForm />} />

                {/* Tasks */}
                <Route path="/tasks" element={<Tasks />} />

                {/* Leads */}
                <Route path="/leads" element={<Leads />} />

                {/* Proposals */}
                <Route path="/proposals" element={<Proposals />} />

                {/* Contracts */}
                <Route path="/contracts" element={<Contracts />} />

                {/* Expenses */}
                <Route path="/expenses" element={<Expenses />} />

                {/* Payments */}
                <Route path="/payments" element={<Payments />} />

                {/* Tickets */}
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/tickets/new" element={<TicketForm />} />

                {/* Reports */}
                <Route path="/reports" element={<Reports />} />

                {/* Settings */}
                <Route path="/settings" element={<Settings />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default App
