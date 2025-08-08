import React, { useEffect, useState } from 'react';
import { PlusIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
import Modal from '../components/common/Modal';
import SearchButton from '../components/common/SearchButton';
import FilterButton from '../components/common/FilterButton';

const InvoicePage = () => {
  const [invoices, setInvoices] = useState([
    {
      id: 1,
      invoiceNumber: 'INV-001',
      client: 'Acme Corp',
      amount: 1500.0,
      dueDate: '2025-02-01',
      isPaid: false,
      createdAt: '2025-01-05',
    },
    {
      id: 2,
      invoiceNumber: 'INV-002',
      client: 'TechStart Inc',
      amount: 2300.0,
      dueDate: '2025-01-20',
      isPaid: true,
      createdAt: '2025-01-03',
    },
    {
      id: 3,
      invoiceNumber: 'INV-003',
      client: 'Global Solutions',
      amount: 3450.0,
      dueDate: '2025-02-15',
      isPaid: false,
      createdAt: '2025-01-07',
    },
    {
      id: 4,
      invoiceNumber: 'INV-004',
      client: 'Digital Dynamics',
      amount: 1800.0,
      dueDate: '2025-02-28',
      isPaid: true,
      createdAt: '2025-01-10',
    },
    {
      id: 5,
      invoiceNumber: 'INV-005',
      client: 'Innovation Labs',
      amount: 4200.0,
      dueDate: '2025-03-05',
      isPaid: false,
      createdAt: '2025-01-12',
    },
    {
      id: 6,
      invoiceNumber: 'INV-006',
      client: 'Future Systems',
      amount: 2750.0,
      dueDate: '2025-02-10',
      isPaid: true,
      createdAt: '2025-01-15',
    },
    {
      id: 7,
      invoiceNumber: 'INV-007',
      client: 'Smart Solutions',
      amount: 3100.0,
      dueDate: '2025-03-15',
      isPaid: false,
      createdAt: '2025-01-18',
    },
    {
      id: 8,
      invoiceNumber: 'INV-008',
      client: 'Tech Ventures',
      amount: 1950.0,
      dueDate: '2025-02-20',
      isPaid: true,
      createdAt: '2025-01-20',
    },
    {
      id: 9,
      invoiceNumber: 'INV-009',
      client: 'Cloud Nine Ltd',
      amount: 2800.0,
      dueDate: '2025-03-01',
      isPaid: false,
      createdAt: '2025-01-22',
    },
    {
      id: 10,
      invoiceNumber: 'INV-010',
      client: 'Quantum Corp',
      amount: 3900.0,
      dueDate: '2025-03-10',
      isPaid: true,
      createdAt: '2025-01-25',
    },
    {
      id: 11,
      invoiceNumber: 'INV-011',
      client: 'New Tech Solutions',
      amount: 2500.0,
      dueDate: '2025-03-20',
      isPaid: false,
      createdAt: '2025-01-28',
    },
  ]);

  const [originalInvoices, setOriginalInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [newInvoice, setNewInvoice] = useState({
    invoiceNumber: '',
    client: '',
    amount: '',
    dueDate: '',
  });

  // Store original data and initialize filtered data
  useEffect(() => {
    setOriginalInvoices(invoices);
    setFilteredInvoices(invoices);
  }, []);

  // Load from localStorage
  useEffect(() => {
    const savedInvoices = JSON.parse(localStorage.getItem('invoices'));
    if (savedInvoices) {
      setInvoices(savedInvoices);
      setOriginalInvoices(savedInvoices);
      setFilteredInvoices(savedInvoices);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('invoices', JSON.stringify(invoices));
  }, [invoices]);

  // Filter configuration
  const filterConfig = [
    {
      key: 'status',
      label: 'Payment Status',
      type: 'checkbox',
      options: [
        { value: 'paid', label: 'Paid' },
        { value: 'pending', label: 'Pending' },
      ],
    },
    {
      key: 'amountRange',
      label: 'Amount Range',
      type: 'checkbox',
      options: [
        { value: '0-1000', label: '$0 - $1,000' },
        { value: '1000-2500', label: '$1,000 - $2,500' },
        { value: '2500-4000', label: '$2,500 - $4,000' },
        { value: '4000+', label: '$4,000+' },
      ],
    },
    {
      key: 'dueMonth',
      label: 'Due Date',
      type: 'checkbox',
      options: [
        { value: '2025-01', label: 'January 2025' },
        { value: '2025-02', label: 'February 2025' },
        { value: '2025-03', label: 'March 2025' },
      ],
    },
  ];

  const handleAddInvoice = () => {
    if (
      !newInvoice.invoiceNumber ||
      !newInvoice.client ||
      !newInvoice.amount ||
      !newInvoice.dueDate
    ) {
      alert('Please fill in all fields');
      return;
    }

    const invoice = {
      id: invoices.length + 1,
      ...newInvoice,
      isPaid: false,
      createdAt: new Date().toISOString().split('T')[0],
      amount: parseFloat(newInvoice.amount),
    };

    const updatedInvoices = [...invoices, invoice];
    setInvoices(updatedInvoices);
    setOriginalInvoices(updatedInvoices);
    applyFiltersAndSearch(updatedInvoices);

    setNewInvoice({
      invoiceNumber: '',
      client: '',
      amount: '',
      dueDate: '',
    });

    setShowModal(false);
  };

  const togglePaymentStatus = (id) => {
    const updatedInvoices = invoices.map((invoice) =>
      invoice.id === id ? { ...invoice, isPaid: !invoice.isPaid } : invoice
    );
    setInvoices(updatedInvoices);
    setOriginalInvoices(updatedInvoices);
    applyFiltersAndSearch(updatedInvoices);
  };

  const handleSearch = (searchTerm) => {
    const searchResults = originalInvoices.filter((invoice) =>
      Object.values(invoice).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    if (searchResults.length === 0) {
      alert('No matching invoices found!');
      return;
    }

    setFilteredInvoices(searchResults);
  };

  const handleClearSearch = () => {
    applyFiltersAndSearch(originalInvoices);
  };

  const handleFilterChange = (filterKey, value) => {
    const newFilters = { ...activeFilters, [filterKey]: value };
    setActiveFilters(newFilters);
    applyFiltersAndSearch(originalInvoices, newFilters);
  };

  const applyFiltersAndSearch = (dataToFilter, filters = activeFilters) => {
    let filtered = [...dataToFilter];

    // Apply payment status filter
    if (filters.status && filters.status.length > 0) {
      filtered = filtered.filter((invoice) => {
        const status = invoice.isPaid ? 'paid' : 'pending';
        return filters.status.includes(status);
      });
    }

    // Apply amount range filter
    if (filters.amountRange && filters.amountRange.length > 0) {
      filtered = filtered.filter((invoice) => {
        return filters.amountRange.some((range) => {
          switch (range) {
            case '0-1000':
              return invoice.amount >= 0 && invoice.amount <= 1000;
            case '1000-2500':
              return invoice.amount > 1000 && invoice.amount <= 2500;
            case '2500-4000':
              return invoice.amount > 2500 && invoice.amount <= 4000;
            case '4000+':
              return invoice.amount > 4000;
            default:
              return false;
          }
        });
      });
    }

    // Apply due month filter
    if (filters.dueMonth && filters.dueMonth.length > 0) {
      filtered = filtered.filter((invoice) => {
        const dueMonth = invoice.dueDate.substring(0, 7); // YYYY-MM format
        return filters.dueMonth.includes(dueMonth);
      });
    }

    setFilteredInvoices(filtered);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Invoices</h1>
          <p className="text-gray-600 mt-1">
            Showing {filteredInvoices.length} of {originalInvoices.length}{' '}
            invoices
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <SearchButton
            onSearch={handleSearch}
            onClear={handleClearSearch}
            placeholder="Search invoices..."
          />

          <FilterButton
            filters={filterConfig}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
          />

          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            New Invoice
          </button>
        </div>
      </div>

      {/* Add Invoice Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Create New Invoice"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Invoice Number
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={newInvoice.invoiceNumber}
              onChange={(e) =>
                setNewInvoice({
                  ...newInvoice,
                  invoiceNumber: e.target.value,
                })
              }
              placeholder="INV-001"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Client Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={newInvoice.client}
              onChange={(e) =>
                setNewInvoice({ ...newInvoice, client: e.target.value })
              }
              placeholder="Client name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={newInvoice.amount}
              onChange={(e) =>
                setNewInvoice({ ...newInvoice, amount: e.target.value })
              }
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={newInvoice.dueDate}
              onChange={(e) =>
                setNewInvoice({ ...newInvoice, dueDate: e.target.value })
              }
              required
            />
          </div>

          <button
            onClick={handleAddInvoice}
            className="w-full px-4 py-2 text-white rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Add Invoice
          </button>
        </div>
      </Modal>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInvoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {invoice.invoiceNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {invoice.client}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${invoice.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {invoice.createdAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {invoice.dueDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      invoice.isPaid
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {invoice.isPaid ? 'Paid' : 'Pending'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => togglePaymentStatus(invoice.id)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {invoice.isPaid ? (
                      <XCircleIcon className="w-4 h-4 mr-1 text-red-500" />
                    ) : (
                      <CheckCircleIcon className="w-4 h-4 mr-1 text-green-500" />
                    )}
                    {invoice.isPaid ? 'Mark Unpaid' : 'Mark Paid'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredInvoices.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No invoices found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoicePage;
