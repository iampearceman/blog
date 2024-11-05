import { useState, ReactNode, Children } from 'react';

interface TabProps {
  label: string;
  children: ReactNode;
}

export function Tab({ children }: TabProps) {
  return <div>{children}</div>;
}

interface TabsProps {
  children: ReactNode;
}

export function Tabs({ children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = Children.toArray(children);

  return (
    <div className="mt-4">
      <div className="flex border-b">
        {tabs.map((tab: any, index) => (
          <button
            key={index}
            className={`px-4 py-2 ${
              activeTab === index
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-600 hover:text-blue-500'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      <div className="p-4 border-l border-r border-b rounded-b">
        {tabs[activeTab]}
      </div>
    </div>
  );
}