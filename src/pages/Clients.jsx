import { useEffect, useState } from 'react';
import { PlusIcon } from 'lucide-react';
import Modal from '../components/common/Modal';
import SearchButton from '../components/common/SearchButton';
import FilterButton from '../components/common/FilterButton';
import SortButton from '../components/common/SortButton';

const ClientsPage = () => {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Acme Corp',
      email: 'contact@acme.com',
      phone: '123-456-7890',
      company: 'Acme Holdings',
      createdBy: 'John Doe',
      timestamp: '2023/01/01',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Global Industries',
      email: 'info@global.com',
      phone: '234-567-8901',
      company: 'Global Ltd',
      createdBy: 'Jane Smith',
      timestamp: '2023/02/15',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Tech Solutions',
      email: 'support@techsol.com',
      phone: '345-678-9012',
      company: 'Tech Inc',
      createdBy: 'Mike Johnson',
      timestamp: '2023/03/20',
      status: 'Inactive',
    },
    {
      id: 4,
      name: 'Digital Dynamics',
      email: 'hello@digital.com',
      phone: '456-789-0123',
      company: 'Digital Corp',
      createdBy: 'Sarah Wilson',
      timestamp: '2023/04/05',
      status: 'Active',
    },
    {
      id: 5,
      name: 'Future Systems',
      email: 'info@future.com',
      phone: '567-890-1234',
      company: 'Future Ltd',
      createdBy: 'Tom Brown',
      timestamp: '2023/05/10',
      status: 'Active',
    },
    {
      id: 6,
      name: 'Smart Services',
      email: 'contact@smart.com',
      phone: '678-901-2345',
      company: 'Smart Inc',
      createdBy: 'Lisa Davis',
      timestamp: '2023/06/15',
      status: 'Inactive',
    },
    {
      id: 7,
      name: 'Innovative Solutions',
      email: 'help@innovative.com',
      phone: '789-012-3456',
      company: 'Innovative Corp',
      createdBy: 'David Miller',
      timestamp: '2023/07/20',
      status: 'Active',
    },
    {
      id: 8,
      name: 'Premier Products',
      email: 'sales@premier.com',
      phone: '890-123-4567',
      company: 'Premier Ltd',
      createdBy: 'Emma White',
      timestamp: '2023/08/25',
      status: 'Active',
    },
    {
      id: 9,
      name: 'Elite Enterprises',
      email: 'info@elite.com',
      phone: '901-234-5678',
      company: 'Elite Inc',
      createdBy: 'Chris Taylor',
      timestamp: '2023/09/30',
      status: 'Inactive',
    },
    {
      id: 10,
      name: 'Peak Performance',
      email: 'contact@peak.com',
      phone: '012-345-6789',
      company: 'Peak Corp',
      createdBy: 'Amanda Black',
      timestamp: '2023/10/05',
      status: 'Active',
    },
  ]);

  const [originalClients, setOriginalClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [activeFilters, setActiveFilters] = useState({});
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });

  // Store original data and initialize filtered data
  useEffect(() => {
    setOriginalClients(clients);
    setFilteredClients(clients);
  }, []);

  // Load from localStorage
  useEffect(() => {
    const savedClients = JSON.parse(localStorage.getItem('clients'));
    if (savedClients) {
      setClients(savedClients);
      setOriginalClients(savedClients);
      setFilteredClients(savedClients);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('clients', JSON.stringify(clients));
  }, [clients]);

  // Filter configuration
  const filterConfig = [
    {
      key: 'status',
      label: 'Status',
      type: 'checkbox',
      options: [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
      ],
    },
  ];

  const handleAddClient = () => {
    if (
      !newClient.name ||
      !newClient.email ||
      !newClient.phone ||
      !newClient.company
    ) {
      alert('Please fill in all fields');
      return;
    }

    const client = {
      id: clients.length + 1,
      name: newClient.name,
      email: newClient.email,
      phone: newClient.phone,
      company: newClient.company,
      createdBy: 'Current User',
      timestamp: new Date().toLocaleDateString(),
      status: 'Active',
    };

    const updatedClients = [...clients, client];
    setClients(updatedClients);
    setOriginalClients(updatedClients);
    applyFiltersAndSearch(updatedClients);

    setNewClient({ name: '', email: '', phone: '', company: '' });
    setShowAddModal(false);
  };

  const handleSearch = (searchTerm) => {
    const searchResults = originalClients.filter((client) =>
      Object.values(client).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    if (searchResults.length === 0) {
      alert('No matching clients found!');
      return;
    }

    setFilteredClients(searchResults);
  };

  const handleClearSearch = () => {
    applyFiltersAndSearch(originalClients);
  };

  const handleFilterChange = (filterKey, value) => {
    const newFilters = { ...activeFilters, [filterKey]: value };
    setActiveFilters(newFilters);
    applyFiltersAndSearch(originalClients, newFilters);
  };

  const applyFiltersAndSearch = (dataToFilter, filters = activeFilters) => {
    let filtered = [...dataToFilter];

    // Apply status filter
    if (filters.status && filters.status.length > 0) {
      filtered = filtered.filter((client) =>
        filters.status.includes(client.status)
      );
    }

    // Apply created by filter
    if (filters.createdBy && filters.createdBy.length > 0) {
      filtered = filtered.filter((client) =>
        filters.createdBy.includes(client.createdBy)
      );
    }

    setFilteredClients(filtered);
  };

  const handleDelete = (clientId) => {
    const updatedClients = clients.filter((client) => client.id !== clientId);
    setClients(updatedClients);
    setOriginalClients(updatedClients);
    applyFiltersAndSearch(updatedClients);
  };

  const openViewModal = (client) => {
    setSelectedClient(client);
    setShowViewModal(true);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col mb-8">
        <div className="flex-1 mb-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Clients
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-700">
            A list of all clients including their details.
          </p>
        </div>

        <div className="w-full mb-4">
          <div className="border-b border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-4 sm:h-16 space-y-4 sm:space-y-0">
              <div className="flex items-center w-full sm:w-auto justify-between sm:justify-start">
                <h1 className="text-lg font-medium">Clients</h1>
                <div className="ml-4 text-sm text-gray-500">
                  • {filteredClients.length} of {originalClients.length}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 w-full sm:w-auto justify-center sm:justify-end">
                <SortButton
                  clients={filteredClients}
                  setClients={setFilteredClients}
                />

                <button
                  onClick={() => setShowAddModal(true)}
                  className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  New Client
                </button>

                <SearchButton
                  onSearch={handleSearch}
                  onClear={handleClearSearch}
                  placeholder="Search clients..."
                />

                <FilterButton
                  filters={filterConfig}
                  activeFilters={activeFilters}
                  onFilterChange={handleFilterChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                    ID
                  </th>
                  <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                    Name
                  </th>
                  <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                    Phone
                  </th>
                  <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                    Company
                  </th>
                  <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                    Created By
                  </th>
                  <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                    Timestamp
                  </th>
                  <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="relative px-2 sm:px-4 md:px-6 py-2 sm:py-4">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredClients.map((client) => (
                  <tr
                    key={client.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="whitespace-nowrap px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-900">
                      {client.id}
                    </td>
                    <td className="whitespace-nowrap px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-900">
                      {client.name}
                    </td>
                    <td className="whitespace-nowrap px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-500">
                      {client.email}
                    </td>
                    <td className="whitespace-nowrap px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-500">
                      {client.phone}
                    </td>
                    <td className="whitespace-nowrap px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-500">
                      {client.company}
                    </td>
                    <td className="whitespace-nowrap px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-500">
                      {client.createdBy}
                    </td>
                    <td className="whitespace-nowrap px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-500">
                      {client.timestamp}
                    </td>
                    <td className="whitespace-nowrap px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-xs sm:text-sm">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-medium ${
                          client.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {client.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-right text-xs sm:text-sm">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => openViewModal(client)}
                          className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(client.id)}
                          className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Client Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Client"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={newClient.name}
              onChange={(e) =>
                setNewClient({ ...newClient, name: e.target.value })
              }
              placeholder="Enter client name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={newClient.email}
              onChange={(e) =>
                setNewClient({ ...newClient, email: e.target.value })
              }
              placeholder="Enter email address"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={newClient.phone}
              onChange={(e) =>
                setNewClient({ ...newClient, phone: e.target.value })
              }
              placeholder="Enter phone number"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={newClient.company}
              onChange={(e) =>
                setNewClient({ ...newClient, company: e.target.value })
              }
              placeholder="Enter company name"
              required
            />
          </div>

          <button
            onClick={handleAddClient}
            className="w-full px-4 py-2 text-white rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Add Client
          </button>
        </div>
      </Modal>

      {/* View Client Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="Client Details"
      >
        {selectedClient && (
          <div className="space-y-3">
            <div className="flex flex-col bg-gray-50 p-3 sm:p-4 rounded-lg">
              <p className="text-xs sm:text-sm md:text-base text-gray-700">
                <span className="font-semibold">Name:</span>{' '}
                {selectedClient.name}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-gray-700">
                <span className="font-semibold">Email:</span>{' '}
                {selectedClient.email}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-gray-700">
                <span className="font-semibold">Phone:</span>{' '}
                {selectedClient.phone}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-gray-700">
                <span className="font-semibold">Company:</span>{' '}
                {selectedClient.company}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-gray-700">
                <span className="font-semibold">Created By:</span>{' '}
                {selectedClient.createdBy}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-gray-700">
                <span className="font-semibold">Timestamp:</span>{' '}
                {selectedClient.timestamp}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-gray-700">
                <span className="font-semibold">Status:</span>{' '}
                <span
                  className={`inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-medium ${
                    selectedClient.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {selectedClient.status}
                </span>
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ClientsPage;
