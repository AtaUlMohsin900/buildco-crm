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
import PaymentForm from './pages/payments/PaymentForm'
import Tickets from './pages/tickets/Tickets'
import TicketForm from './pages/tickets/TicketForm'
import Reports from './pages/reports/Reports'
import ReportForm from './pages/reports/ReportForm'
import Resources from './pages/resources/Resources'
import ResourceForm from './pages/resources/ResourceForm'
import Suppliers from './pages/suppliers/Suppliers'
import SupplierForm from './pages/suppliers/SupplierForm'
import Subcontractors from './pages/subcontractors/Subcontractors'
import SubcontractorForm from './pages/subcontractors/SubcontractorForm'
import Employees from './pages/employees/Employees'
import EmployeeForm from './pages/employees/EmployeeForm'
import Safety from './pages/safety/Safety'
import SafetyForm from './pages/safety/SafetyForm'
import TimeTracking from './pages/time-tracking/TimeTracking'
import TimeEntryForm from './pages/time-tracking/TimeEntryForm'
import CostManagement from './pages/cost-management/CostManagement'
import CostForm from './pages/cost-management/CostForm'
import EstimateForm from './pages/estimates/EstimateForm'
import TaskForm from './pages/tasks/TaskForm'
import LeadForm from './pages/leads/LeadForm'
import ProposalForm from './pages/proposals/ProposalForm'
import ContractForm from './pages/contracts/ContractForm'
import ExpenseForm from './pages/expenses/ExpenseForm'
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
                <Route path="/clients/edit/:id" element={<ClientForm />} />
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
                <Route path="/tasks/new" element={<TaskForm />} />
                <Route path="/tasks/edit/:id" element={<TaskForm />} />
                <Route path="/tasks/:id" element={<UnderConstruction title="Task Details" />} />

                {/* Leads */}
                <Route path="/leads" element={<Leads />} />
                <Route path="/leads/new" element={<LeadForm />} />
                <Route path="/leads/edit/:id" element={<LeadForm />} />
                <Route path="/leads/:id" element={<UnderConstruction title="Lead Details" />} />

                {/* Proposals */}
                <Route path="/proposals" element={<Proposals />} />
                <Route path="/proposals/new" element={<ProposalForm />} />
                <Route path="/proposals/edit/:id" element={<ProposalForm />} />
                <Route path="/proposals/:id" element={<UnderConstruction title="Proposal Details" />} />

                {/* Contracts */}
                <Route path="/contracts" element={<Contracts />} />
                <Route path="/contracts/new" element={<ContractForm />} />
                <Route path="/contracts/edit/:id" element={<ContractForm />} />
                <Route path="/contracts/:id" element={<UnderConstruction title="Contract Details" />} />

                {/* Expenses */}
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/expenses/new" element={<ExpenseForm />} />
                <Route path="/expenses/edit/:id" element={<ExpenseForm />} />
                <Route path="/expenses/:id" element={<UnderConstruction title="Expense Details" />} />

                {/* Payments */}
                <Route path="/payments" element={<Payments />} />
                <Route path="/payments/new" element={<PaymentForm />} />
                <Route path="/payments/edit/:id" element={<PaymentForm />} />
                <Route path="/payments/:id" element={<UnderConstruction title="Payment Details" />} />

                {/* Tickets */}
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/tickets/new" element={<TicketForm />} />
                <Route path="/tickets/:id" element={<UnderConstruction title="Ticket Details" />} />

                {/* Reports */}
                <Route path="/reports" element={<Reports />} />
                <Route path="/reports/new" element={<ReportForm />} />

                {/* Resources */}
                <Route path="/resources" element={<Resources />} />
                <Route path="/resources/new" element={<ResourceForm />} />
                <Route path="/resources/edit/:id" element={<ResourceForm />} />
                <Route path="/resources/:id" element={<UnderConstruction title="Resource Details" />} />

                {/* Suppliers */}
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/suppliers/new" element={<SupplierForm />} />
                <Route path="/suppliers/edit/:id" element={<SupplierForm />} />
                <Route path="/suppliers/:id" element={<UnderConstruction title="Supplier Details" />} />

                {/* Subcontractors */}
                <Route path="/subcontractors" element={<Subcontractors />} />
                <Route path="/subcontractors/new" element={<SubcontractorForm />} />
                <Route path="/subcontractors/edit/:id" element={<SubcontractorForm />} />
                <Route path="/subcontractors/:id" element={<UnderConstruction title="Subcontractor Details" />} />

                {/* Employees */}
                <Route path="/employees" element={<Employees />} />
                <Route path="/employees/new" element={<EmployeeForm />} />
                <Route path="/employees/edit/:id" element={<EmployeeForm />} />
                <Route path="/employees/:id" element={<UnderConstruction title="Employee Details" />} />

                {/* Safety */}
                <Route path="/safety" element={<Safety />} />
                <Route path="/safety/new" element={<SafetyForm />} />
                <Route path="/safety/edit/:id" element={<SafetyForm />} />
                <Route path="/safety/:id" element={<UnderConstruction title="Safety Record Details" />} />

                {/* Time Tracking */}
                <Route path="/time-tracking" element={<TimeTracking />} />
                <Route path="/time-tracking/new" element={<TimeEntryForm />} />
                <Route path="/time-tracking/edit/:id" element={<TimeEntryForm />} />

                {/* Cost Management */}
                <Route path="/cost-management" element={<CostManagement />} />
                <Route path="/cost-management/new" element={<CostForm />} />
                <Route path="/cost-management/edit/:id" element={<CostForm />} />

                {/* Settings */}
                <Route path="/settings" element={<Settings />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default App
