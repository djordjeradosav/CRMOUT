// Importovanje potrebnih React komponenti i biblioteka za kreiranje grafikona
import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Loader2 } from 'lucide-react';

// Glavna komponenta za prikaz CRM grafikona koja prikazuje prodaju i potencijalne klijente
const CrmChart = () => {
  // Definisanje state varijabli pomocu useState hook-a
  // data - cuva podatke za grafikon
  // error - cuva informacije o greskama
  // isLoading - prati status ucitavanja podataka
  // isFullscreen - kontrolise prikaz grafikona preko celog ekrana
  // stats - cuva statisticke podatke o klijentima, prodaji i potencijalnim klijentima
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [stats, setStats] = useState({
    clients: 0,
    totalSales: 0,
    totalLeads: 0,
  });

  // useEffect hook koji se pokrece pri prvom renderovanju komponente
  // sluzi za dohvatanje i obradu CRM podataka
  useEffect(() => {
    const fetchCRMData = async () => {
      try {
        // Dohvatanje podataka sa API-ja
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch CRM data');
        }
        const rawData = await response.json();

        // Transformacija proizvoda u format pogodan za graf
        // Generise random datume u poslednjih 30 dana
        const formattedData = rawData.products.map((item) => ({
          date: new Date(
            Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
          ).toLocaleDateString(),
          sales: item.price * item.stock,
          leads: Math.floor(item.rating * 20),
        }));

        // Izracunavanje ukupnih statistika za sve proizvode
        const totalStats = formattedData.reduce(
          (acc, curr) => ({
            clients: acc.clients + 1,
            totalSales: acc.totalSales + curr.sales,
            totalLeads: acc.totalLeads + curr.leads,
          }),
          { clients: 0, totalSales: 0, totalLeads: 0 }
        );

        // Azuriranje state-a sa obradjenim podacima
        setStats(totalStats);
        setData(formattedData);
        setIsLoading(false);
      } catch (err) {
        // Postavljanje poruke o gresci ako dohvatanje podataka nije uspelo
        setError('Failed to fetch CRM data.');
        setIsLoading(false);
      }
    };

    fetchCRMData();
  }, []);

  return (
    <>
      {/* Glavni kontejner koji sadrzi graf i statistike */}
      <div className="bg-white p-6 rounded-lg shadow">
        {/* Zaglavlje sa naslovom */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Sales and Leads Overview
          </h2>
        </div>

        {/* Prikaz statistickih podataka */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm text-gray-500">Total Clients</h3>
            <p className="text-2xl font-semibold">{stats.clients}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm text-gray-500">Total Sales</h3>
            <p className="text-2xl font-semibold">
              ${stats.totalSales.toLocaleString()}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm text-gray-500">Total Leads</h3>
            <p className="text-2xl font-semibold">{stats.totalLeads}</p>
          </div>
        </div>

        {/* Kontejner za graf */}
        <div className="h-96 bg-white rounded">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : error ? (
            // Prikaz greske ako je doslo do problema pri ucitavanju
            <div className="flex items-center justify-center h-full text-red-500">
              {error}
            </div>
          ) : (
            // Responsive graf koji prikazuje podatke o prodaji i potencijalnim klijentima
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                {/* X-osa koja prikazuje datume */}
                <XAxis dataKey="date" tick={{ fill: '#6B7280' }} />
                {/* Y-osa sa formatiranim vrednostima */}
                <YAxis
                  tick={{ fill: '#6B7280' }}
                  tickFormatter={(value) => `${value.toLocaleString()}`}
                />
                {/* Tooltip koji se prikazuje pri prelasku misa preko grafa */}
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                  }}
                  formatter={(value) => [`${value.toLocaleString()}`, 'Value']}
                />
                {/* Grid linije u pozadini grafa */}
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                {/* Linija koja predstavlja prodaju */}
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={false}
                  name="Sales"
                />
                {/* Linija koja predstavlja potencijalne klijente */}
                <Line
                  type="monotone"
                  dataKey="leads"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  dot={false}
                  name="Leads"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Modal dijalog za prikaz grafa preko celog ekrana */}
      <Dialog
        open={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
      </Dialog>
    </>
  );
};

export default CrmChart;
