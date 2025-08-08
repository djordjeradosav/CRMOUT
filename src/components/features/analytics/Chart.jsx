// Importovanje potrebnih React komponenti i biblioteka
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

// Glavna komponenta za prikaz grafikona
const Chart = () => {
  // State varijable za upravljanje podacima i UI stanjima
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // useEffect hook za dohvatanje Bitcoin podataka pri ucitavanju komponente
  useEffect(() => {
    const fetchBitcoinData = async () => {
      try {
        // Dohvatanje podataka sa CoinGecko API-ja za poslednjih 30 dana
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const rawData = await response.json();

        // Transformacija podataka u format pogodan za grafikon
        const formattedData = rawData.prices.map(([timestamp, price]) => ({
          date: new Date(timestamp).toLocaleDateString(),
          price: Math.round(price),
        }));

        setData(formattedData);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchBitcoinData();
  }, []);

  return (
    <>
      {/* Glavni kontejner za grafikon */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Bitcoin Price Overview
          </h2>
        </div>

        {/* Kontejner za grafikon sa stanjima ucitavanja i greske */}
        <div className="h-96 bg-white rounded">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full text-red-500">
              {error}
            </div>
          ) : (
            // Responsive grafikon sa Bitcoin podacima
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="date" tick={{ fill: '#6B7280' }} />
                <YAxis
                  tick={{ fill: '#6B7280' }}
                  tickFormatter={(value) => `${value.toLocaleString()}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                  }}
                  formatter={(value) => [`${value.toLocaleString()}`, 'Price']}
                />
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Dialog za prikaz grafikona preko celog ekrana */}
      <Dialog
        open={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />

        <div className="relative bg-white rounded-lg w-full max-w-6xl h-[80vh] p-6">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            Close
          </button>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Bitcoin Price Overview
          </h2>
        </div>
      </Dialog>
    </>
  );
};

export default Chart;
