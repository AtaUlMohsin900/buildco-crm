import { create } from 'zustand'

export const useAppStore = create((set) => ({
    // --- INVOICES ---
    invoices: [
        { id: 'INV-1001', client: 'Acme Corp', date: '2026-01-15', duedate: '2026-02-15', status: 'Paid', amount: 1250.00 },
        { id: 'INV-1002', client: 'Globex Inc', date: '2026-01-20', duedate: '2026-02-20', status: 'Unpaid', amount: 3400.00 },
        { id: 'INV-1003', client: 'Soylent Corp', date: '2026-01-22', duedate: '2026-02-22', status: 'Overdue', amount: 850.50 },
    ],
    addInvoice: (invoice) => set((state) => ({ invoices: [...state.invoices, { ...invoice, id: `INV-${Date.now()}` }] })),
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
    addPayment: (item) => set((state) => ({ payments: [...state.payments, { ...item, id: `PAY-${Date.now()}` }] })),
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
}))
