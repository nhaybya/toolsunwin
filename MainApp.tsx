import { useState } from 'react';
import StrategySelector from './StrategySelector';
import ResultInput from './ResultInput';
import StatsSummary from './StatsSummary';
import PredictionResult from './PredictionResult';
import SettingsModal from './SettingsModal';
import StatsModal from './StatsModal';
import { useAppContext } from '../context/AppContext';

const MainApp: React.FC = () => {
  const { stats } = useAppContext();
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-montserrat bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text">NHAYY PRO</h1>
          <p className="text-gray-400 text-xs">Phiên bản 5.0 Ultimate</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowSettingsModal(true)}
            className="p-2 bg-dark-lighter rounded-lg hover:bg-dark-light transition-colors"
          >
            <i className="fas fa-cog text-gray-300"></i>
          </button>
          <button 
            onClick={() => setShowStatsModal(true)}
            className="p-2 bg-dark-lighter rounded-lg hover:bg-dark-light transition-colors"
          >
            <i className="fas fa-chart-pie text-gray-300"></i>
          </button>
        </div>
      </header>
      
      {/* Strategy Selection */}
      <StrategySelector />
      
      {/* Result Input & Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <ResultInput />
        <StatsSummary />
      </div>
      
      {/* Prediction Results */}
      <PredictionResult />
      
      {/* Modals */}
      {showSettingsModal && (
        <SettingsModal onClose={() => setShowSettingsModal(false)} />
      )}
      
      {showStatsModal && (
        <StatsModal onClose={() => setShowStatsModal(false)} />
      )}
    </>
  );
};

export default MainApp;
