import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { syncToSheets } from '../utils/syncService'

export const useAppStore = create(
    persist(
        (set) => ({
            // --- INVOICES ---
            invoices: [
                { id: 'INV-1001', client: 'Acme Corp', date: '2026-01-15', duedate: '2026-02-15', status: 'Paid', amount: 1250.00 },
                { id: 'INV-1002', client: 'Globex Inc', date: '2026-01-20', duedate: '2026-02-20', status: 'Unpaid', amount: 3400.00 },
                { id: 'INV-1003', client: 'Soylent Corp', date: '2026-01-22', duedate: '2026-02-22', status: 'Overdue', amount: 850.50 },
            ],
            addInvoice: (invoice) => set((state) => {
                const newInvoice = { ...invoice, id: `INV-${Date.now()}` }
                let newPayments = state.payments
                
                // If invoice is created as 'Paid', automatically add a payment record
                if (invoice.status === 'Paid') {
                    const payId = `PAY-${Date.now()}`;
                    newPayments = [...state.payments, {
                        id: payId,
                        invoice: newInvoice.id,
                        mode: 'Other', 
                        date: invoice.date,
                        amount: invoice.amount,
                        txid: 'AUTO-CREATED'
                    }]
                    // Sync auto-created payment
                    syncToSheets('payments', newPayments[newPayments.length-1]);
                }

                // Sync the new invoice
                syncToSheets('invoices', newInvoice);

                return { 
                    invoices: [...state.invoices, newInvoice],
                    payments: newPayments
                }
            }),
            deleteInvoice: (id) => set((state) => ({ invoices: state.invoices.filter((i) => i.id !== id) })),

            // --- ESTIMATES ---
            estimates: [
                { id: 'EST-2001', client: 'Acme Corp', date: '2026-01-25', expiry: '2026-02-05', status: 'Sent', amount: 1200.00 },
                { id: 'EST-2002', client: 'Umbrella Corp', date: '2026-01-28', expiry: '2026-02-08', status: 'Draft', amount: 5000.00 },
            ],
            addEstimate: (item) => set((state) => ({ estimates: [...state.estimates, { ...item, id: `EST-${Date.now()}` }] })),
            deleteEstimate: (id) => set((state) => ({ estimates: state.estimates.filter((i) => i.id !== id) })),

            // --- PROJECTS ---
            projects: [
                { id: 1, name: 'Web Redesign', client: 'Acme Corp', start_date: '2026-01-10', deadline: '2026-03-01', status: 'In Progress', progress: 45 },
                { id: 2, name: 'Mobile App', client: 'Globex Inc', start_date: '2026-02-01', deadline: '2026-05-15', status: 'Not Started', progress: 0 },
            ],
            addProject: (item) => set((state) => ({ projects: [...state.projects, { ...item, id: state.projects.length + 1 }] })),
            deleteProject: (id) => set((state) => ({ projects: state.projects.filter((i) => i.id !== id) })),

            // --- TASKS ---
            tasks: [
                { id: 1, title: 'Design Homepage', project: 'Web Redesign', assignee: 'John Doe', duedate: '2026-02-10', status: 'In Progress', priority: 'High' },
                { id: 2, title: 'Setup Database', project: 'Mobile App', assignee: 'Jane Smith', duedate: '2026-02-12', status: 'Pending', priority: 'Medium' },
            ],
            addTask: (item) => set((state) => ({ tasks: [...state.tasks, { ...item, id: state.tasks.length + 1 }] })),
            deleteTask: (id) => set((state) => ({ tasks: state.tasks.filter((i) => i.id !== id) })),

            // --- LEADS ---
            leads: [
                { id: 1, name: 'Michael Scott', company: 'Dunder Mifflin', email: 'michael@dm.com', source: 'Website', status: 'New', assigned: 'Sales Team' },
                { id: 2, name: 'Dwight Schrute', company: 'Schrute Farms', email: 'dwight@farms.com', source: 'Referral', status: 'Contacted', assigned: 'Sales Team' },
            ],
            addLead: (item) => set((state) => ({ leads: [...state.leads, { ...item, id: state.leads.length + 1 }] })),
            deleteLead: (id) => set((state) => ({ leads: state.leads.filter((i) => i.id !== id) })),

            // --- PROPOSALS ---
            proposals: [
                { id: 'PRO-3001', to: 'Big Corp', subject: 'Marketing Service', date: '2026-01-20', open_till: '2026-02-20', status: 'Sent' },
            ],
            addProposal: (item) => set((state) => ({ proposals: [...state.proposals, { ...item, id: `PRO-${Date.now()}` }] })),
            deleteProposal: (id) => set((state) => ({ proposals: state.proposals.filter((i) => i.id !== id) })),

            // --- CONTRACTS ---
            contracts: [
                { id: 'CON-4001', subject: 'Service Agreement', client: 'Acme Corp', start_date: '2026-01-01', end_date: '2026-12-31', amount: 15000.00, status: 'Active' },
                { id: 'CON-4002', subject: 'NDA', client: 'Globex Inc', start_date: '2026-02-01', end_date: '2027-02-01', amount: 0.00, status: 'Pending' },
            ],
            addContract: (item) => set((state) => ({ contracts: [...state.contracts, { ...item, id: `CON-${Date.now()}` }] })),
            deleteContract: (id) => set((state) => ({ contracts: state.contracts.filter((i) => i.id !== id) })),

            // --- EXPENSES ---
            expenses: [
                { id: 1, category: 'Travel', name: 'Flight to NYC', date: '2026-01-12', amount: 450.00, billable: 'Yes' },
                { id: 2, category: 'Office Supplies', name: 'Printer Ink', date: '2026-01-15', amount: 89.99, billable: 'No' },
            ],
            addExpense: (item) => set((state) => ({ expenses: [...state.expenses, { ...item, id: state.expenses.length + 1 }] })),
            deleteExpense: (id) => set((state) => ({ expenses: state.expenses.filter((i) => i.id !== id) })),

            // --- PAYMENTS ---
            payments: [
                { id: 'PAY-5001', invoice: 'INV-1001', mode: 'Bank Transfer', date: '2026-01-16', amount: 1250.00, txid: 'TXN123456' },
            ],
            addPayment: (item) => set((state) => {
                // Ensure amount is a number
                const safeAmount = parseFloat(item.amount) || 0;
                
                // Add the payment
                const newPayment = { 
                    ...item, 
                    id: `PAY-${Date.now()}`,
                    amount: safeAmount 
                };
                const newPayments = [...state.payments, newPayment];
                
                // Find and update the invoice status to 'Paid'
                const newInvoices = state.invoices.map(inv => 
                    inv.id === item.invoice ? { ...inv, status: 'Paid' } : inv
                );

                // Sync the manual payment
                syncToSheets('payments', newPayment);

                return { 
                    payments: newPayments, 
                    invoices: newInvoices 
                };
            }),
            updatePayment: (id, data) => set((state) => ({
        payments: state.payments.map((p) => p.id === id ? { ...p, ...data } : p)
    })),
    deletePayment: (id) => set((state) => ({ payments: state.payments.filter((i) => i.id !== id) })),

            // --- TICKETS ---
            tickets: [
                { id: 1, subject: 'Login issue', contact: 'John Doe', priority: 'High', status: 'Open', last_reply: '2 hours ago' },
                { id: 2, subject: 'Feature request', contact: 'Jane Smith', priority: 'Low', status: 'In Progress', last_reply: '1 day ago' },
            ],
            addTicket: (item) => set((state) => ({ tickets: [...state.tickets, { ...item, id: state.tickets.length + 1 }] })),
            deleteTicket: (id) => set((state) => ({ tickets: state.tickets.filter((i) => i.id !== id) })),

            // --- REPORTS ---
            // Reports usually don't have lists like this, but we can store config or generated reports
            reports: [
                { id: 1, name: 'Sales Report Jan', type: 'Sales', date: '2026-02-01' },
            ],

            // --- RESOURCES ---
            resources: [
                { id: 1, name: 'Cement Bags', type: 'Material', quantity: 500, unit: 'Bags', cost: 550.00, status: 'In Stock' },
                { id: 2, name: 'Excavator 3000', type: 'Equipment', quantity: 2, unit: 'Units', cost: 15000.00, status: 'Active' },
                { id: 3, name: 'Steel Rods', type: 'Material', quantity: 1000, unit: 'Kg', cost: 75.00, status: 'Low Stock' },
            ],
            addResource: (item) => set((state) => ({ resources: [...state.resources, { ...item, id: state.resources.length + 1 }] })),
            deleteResource: (id) => set((state) => ({ resources: state.resources.filter((i) => i.id !== id) })),

            // --- SUPPLIERS ---
            suppliers: [
                { id: 1, name: 'BuildMate Supplies', contact_person: 'Robert Fox', email: 'robert@buildmate.com', phone: '+1 555-0101', category: 'General', status: 'Active' },
                { id: 2, name: 'Concrete Kings', contact_person: 'Sam Wilson', email: 'sam@concretekings.com', phone: '+1 555-0102', category: 'Concrete', status: 'Active' },
            ],
            addSupplier: (item) => set((state) => ({ suppliers: [...state.suppliers, { ...item, id: state.suppliers.length + 1 }] })),
            deleteSupplier: (id) => set((state) => ({ suppliers: state.suppliers.filter((i) => i.id !== id) })),

            // --- SUBCONTRACTORS ---
            subcontractors: [
                { id: 1, company_name: 'Sparky Electric', contact_person: 'Electro Max', trade: 'Electrical', phone: '+1 555-0201', email: 'max@sparky.com', status: 'Active', rating: 4.8 },
                { id: 2, company_name: 'Flow Plumbers', contact_person: 'Mario Luigi', trade: 'Plumbing', phone: '+1 555-0202', email: 'mario@flow.com', status: 'Active', rating: 4.5 },
            ],
            addSubcontractor: (item) => set((state) => ({ subcontractors: [...state.subcontractors, { ...item, id: state.subcontractors.length + 1 }] })),
            deleteSubcontractor: (id) => set((state) => ({ subcontractors: state.subcontractors.filter((i) => i.id !== id) })),

            // --- EMPLOYEES ---
            employees: [
                { id: 1, name: 'Esther Howard', role: 'Project Manager', department: 'Management', email: 'esther@buildco.com', phone: '+1 555-0301', status: 'Active' },
                { id: 2, name: 'Cody Fisher', role: 'Site Engineer', department: 'Engineering', email: 'cody@buildco.com', phone: '+1 555-0302', status: 'Active' },
            ],
            addEmployee: (item) => set((state) => {
                const newEmployee = { ...item, id: state.employees.length + 1 };
                syncToSheets('employees', newEmployee);
                return { employees: [...state.employees, newEmployee] };
            }),
            updateEmployee: (id, data) => set((state) => ({
                employees: state.employees.map((e) => e.id === id ? { ...e, ...data } : e)
            })),
            deleteEmployee: (id) => set((state) => ({ employees: state.employees.filter((i) => i.id !== id) })),

            // --- SAFETY ---
            safety: [
                { id: 1, type: 'Inspection', date: '2026-02-01', description: 'Weekly Site Safety Walk', reported_by: 'Safety Officer', status: 'Passed', location: 'Site A' },
                { id: 2, type: 'Near Miss', date: '2026-01-28', description: 'Loose scaffolding near entrance', reported_by: 'John Doe', status: 'Resolved', location: 'Site B' },
            ],
            addSafetyRecord: (item) => set((state) => ({ safety: [...state.safety, { ...item, id: state.safety.length + 1 }] })),
            deleteSafetyRecord: (id) => set((state) => ({ safety: state.safety.filter((i) => i.id !== id) })),

            // --- TIME TRACKING ---
            timeEntries: [
                { id: 1, employee: 'Cody Fisher', project: 'Web Redesign', date: '2026-02-05', hours: 8, description: 'Frontend development', status: 'Approved' },
                { id: 2, employee: 'Esther Howard', project: 'Mobile App', date: '2026-02-05', hours: 4, description: 'Client meeting', status: 'Pending' },
            ],
            addTimeEntry: (item) => set((state) => ({ timeEntries: [...state.timeEntries, { ...item, id: state.timeEntries.length + 1 }] })),
            deleteTimeEntry: (id) => set((state) => ({ timeEntries: state.timeEntries.filter((i) => i.id !== id) })),

            // --- COST MANAGEMENT ---
            costs: [
                { id: 1, project: 'Web Redesign', cost_code: '01-General', budget: 50000, actual: 12000, variance: 38000, status: 'On Track' },
                { id: 2, project: 'Mobile App', cost_code: '02-Development', budget: 80000, actual: 5000, variance: 75000, status: 'On Track' },
            ],
            addCost: (item) => set((state) => ({ costs: [...state.costs, { ...item, id: state.costs.length + 1 }] })),
            deleteCost: (id) => set((state) => ({ costs: state.costs.filter((i) => i.id !== id) })),
        }),
        {
            name: 'buildco-app-store',
            getStorage: () => localStorage, // Explicitly define localStorage behavior
        }
    )
)
