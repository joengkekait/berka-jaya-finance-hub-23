
import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: number;
  changeLabel?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  change,
  changeLabel,
}) => {
  const isPositive = change && change > 0;
  
  return (
    <div className="bjt-card">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
          <p className="text-2xl font-semibold mt-1">{value}</p>
          
          {change !== undefined && (
            <div className="flex items-center mt-2">
              {isPositive ? (
                <ArrowUp className="h-4 w-4 text-bjt-success mr-1" />
              ) : (
                <ArrowDown className="h-4 w-4 text-bjt-error mr-1" />
              )}
              <span className={`text-sm ${isPositive ? 'text-bjt-success' : 'text-bjt-error'}`}>
                {Math.abs(change)}% {changeLabel || 'dari bulan lalu'}
              </span>
            </div>
          )}
        </div>
        
        <div className="bg-bjt-gradient rounded-full p-3 text-white">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
