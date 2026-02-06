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
import Resources from './pages/resources/Resources'
import Suppliers from './pages/suppliers/Suppliers'
import Subcontractors from './pages/subcontractors/Subcontractors'
import Employees from './pages/employees/Employees'
import Safety from './pages/safety/Safety'
import TimeTracking from './pages/time-tracking/TimeTracking'
import CostManagement from './pages/cost-management/CostManagement'
import Settings from './pages/settings/Settings'
import UnderConstruction from './pages/UnderConstruction'
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
                <Route path="/estimates/new" element={<UnderConstruction title="New Estimate" />} />
                <Route path="/estimates/:id" element={<UnderConstruction title="Estimate Details" />} />

                {/* Projects */}
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/new" element={<ProjectForm />} />
                <Route path="/projects/:id" element={<UnderConstruction title="Project Details" />} />

                {/* Tasks */}
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/tasks/new" element={<UnderConstruction title="New Task" />} />
                <Route path="/tasks/:id" element={<UnderConstruction title="Task Details" />} />

                {/* Leads */}
                <Route path="/leads" element={<Leads />} />
                <Route path="/leads/new" element={<UnderConstruction title="New Lead" />} />
                <Route path="/leads/:id" element={<UnderConstruction title="Lead Details" />} />

                {/* Proposals */}
                <Route path="/proposals" element={<Proposals />} />
                <Route path="/proposals/new" element={<UnderConstruction title="New Proposal" />} />
                <Route path="/proposals/:id" element={<UnderConstruction title="Proposal Details" />} />

                {/* Contracts */}
                <Route path="/contracts" element={<Contracts />} />
                <Route path="/contracts/new" element={<UnderConstruction title="New Contract" />} />
                <Route path="/contracts/:id" element={<UnderConstruction title="Contract Details" />} />

                {/* Expenses */}
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/expenses/new" element={<UnderConstruction title="New Expense" />} />
                <Route path="/expenses/:id" element={<UnderConstruction title="Expense Details" />} />

                {/* Payments */}
                <Route path="/payments" element={<Payments />} />
                <Route path="/payments/new" element={<UnderConstruction title="New Payment" />} />
                <Route path="/payments/:id" element={<UnderConstruction title="Payment Details" />} />

                {/* Tickets */}
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/tickets/new" element={<TicketForm />} />
                <Route path="/tickets/:id" element={<UnderConstruction title="Ticket Details" />} />

                {/* Reports */}
                <Route path="/reports" element={<Reports />} />

                {/* Resources */}
                <Route path="/resources" element={<Resources />} />
                <Route path="/resources/new" element={<UnderConstruction title="New Resource" />} />
                <Route path="/resources/:id" element={<UnderConstruction title="Resource Details" />} />

                {/* Suppliers */}
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/suppliers/new" element={<UnderConstruction title="New Supplier" />} />
                <Route path="/suppliers/:id" element={<UnderConstruction title="Supplier Details" />} />

                {/* Subcontractors */}
                <Route path="/subcontractors" element={<Subcontractors />} />
                <Route path="/subcontractors/new" element={<UnderConstruction title="New Subcontractor" />} />
                <Route path="/subcontractors/:id" element={<UnderConstruction title="Subcontractor Details" />} />

                {/* Employees */}
                <Route path="/employees" element={<Employees />} />
                <Route path="/employees/new" element={<UnderConstruction title="New Employee" />} />
                <Route path="/employees/:id" element={<UnderConstruction title="Employee Details" />} />

                {/* Safety */}
                <Route path="/safety" element={<Safety />} />
                <Route path="/safety/new" element={<UnderConstruction title="New Safety Record" />} />
                <Route path="/safety/:id" element={<UnderConstruction title="Safety Record Details" />} />

                {/* Time Tracking */}
                <Route path="/time-tracking" element={<TimeTracking />} />
                <Route path="/time-tracking/new" element={<UnderConstruction title="Log Time" />} />

                {/* Cost Management */}
                <Route path="/cost-management" element={<CostManagement />} />
                <Route path="/cost-management/new" element={<UnderConstruction title="New Cost Entry" />} />

                {/* Settings */}
                <Route path="/settings" element={<Settings />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default App
