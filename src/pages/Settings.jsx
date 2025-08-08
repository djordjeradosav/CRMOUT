// SettingsPage.jsx
import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { Switch } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    companyName: 'Acme Inc',
    timezone: 'UTC-5',
    notifications: {
      email: true,
      desktop: true,
      deals: true,
      tasks: false,
    },
  });

  const categories = {
    General: (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                       focus:border-gray-700 focus:ring-gray-700"
            value={settings.companyName}
            onChange={(e) =>
              setSettings({
                ...settings,
                companyName: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Time Zone
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                       focus:border-gray-700 focus:ring-gray-700"
            value={settings.timezone}
            onChange={(e) =>
              setSettings({
                ...settings,
                timezone: e.target.value,
              })
            }
          >
            <option value="UTC-5">UTC-5 (Eastern Time)</option>
            <option value="UTC-6">UTC-6 (Central Time)</option>
            <option value="UTC-7">UTC-7 (Mountain Time)</option>
            <option value="UTC-8">UTC-8 (Pacific Time)</option>
          </select>
        </div>
        <button
          className="mt-4 inline-flex justify-center rounded-md border border-transparent 
                     bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm 
                     hover:bg-gray-900 focus:outline-none focus:ring-2 
                     focus:ring-gray-700 focus:ring-offset-2 w-full sm:w-auto"
        >
          Save Changes
        </button>
      </div>
    ),
    Notifications: (
      <div className="space-y-6">
        {Object.entries(settings.notifications).map(([key, enabled]) => (
          <Switch.Group
            key={key}
            as="div"
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4"
          >
            <Switch.Label as="span" className="flex-grow flex flex-col">
              <span className="text-sm font-medium text-gray-900">
                {key.charAt(0).toUpperCase() + key.slice(1)} Notifications
              </span>
              <span className="text-sm text-gray-500">
                Receive notifications for {key} updates
              </span>
            </Switch.Label>
            <Switch
              checked={enabled}
              onChange={(checked) =>
                setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    [key]: checked,
                  },
                })
              }
              className={classNames(
                enabled ? 'bg-gray-800' : 'bg-gray-200',
                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700'
              )}
            >
              <span
                aria-hidden="true"
                className={classNames(
                  enabled ? 'translate-x-5' : 'translate-x-0',
                  'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                )}
              />
            </Switch>
          </Switch.Group>
        ))}
      </div>
    ),
    Team: (
      <div className="text-sm text-gray-500">
        Team management features coming soon.
      </div>
    ),
    Billing: (
      <div className="text-sm text-gray-500">
        Billing management features coming soon.
      </div>
    ),
  };

  return (
    <div className="w-full min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto py-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
          Settings
        </h1>

        <Tab.Group>
          <Tab.List className="flex flex-wrap sm:flex-nowrap gap-2 sm:space-x-1 rounded-xl bg-gray-900/20 p-1">
            {Object.keys(categories).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2 sm:py-2.5 text-sm font-medium leading-5',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white shadow text-gray-900'
                      : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-6">
            {Object.values(categories).map((panel, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames(
                  'rounded-xl bg-white p-4 sm:p-6',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-400 focus:outline-none focus:ring-2'
                )}
              >
                {panel}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default SettingsPage;
