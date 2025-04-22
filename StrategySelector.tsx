import { useAppContext } from '../context/AppContext';

const StrategySelector: React.FC = () => {
  const { strategy, setStrategy } = useAppContext();

  return (
    <div className="bg-dark-light p-4 rounded-xl mb-6 shadow-lg">
      <h2 className="text-lg font-semibold font-montserrat mb-3">🎯 Chiến lược dự đoán</h2>
      <div className="grid grid-cols-3 gap-3" data-component="strategy-selector">
        <button 
          data-strategy="normal" 
          onClick={() => setStrategy('normal')}
          className={`strategy-btn bg-dark-lighter p-3 rounded-lg text-center hover:bg-primary/10 transition-colors border-2 border-transparent ${strategy === 'normal' ? 'active border-primary' : ''}`}
        >
          <i className="fas fa-balance-scale text-xl mb-1 text-primary"></i>
          <div className="text-sm font-medium">Thông thường</div>
        </button>
        <button 
          data-strategy="aggressive" 
          onClick={() => setStrategy('aggressive')}
          className={`strategy-btn bg-dark-lighter p-3 rounded-lg text-center hover:bg-secondary/10 transition-colors border-2 border-transparent ${strategy === 'aggressive' ? 'active border-secondary' : ''}`}
        >
          <i className="fas fa-fire text-xl mb-1 text-secondary"></i>
          <div className="text-sm font-medium">Tích cực</div>
        </button>
        <button 
          data-strategy="conservative" 
          onClick={() => setStrategy('conservative')}
          className={`strategy-btn bg-dark-lighter p-3 rounded-lg text-center hover:bg-success/10 transition-colors border-2 border-transparent ${strategy === 'conservative' ? 'active border-success' : ''}`}
        >
          <i className="fas fa-shield-alt text-xl mb-1 text-success"></i>
          <div className="text-sm font-medium">Bảo toàn</div>
        </button>
      </div>
    </div>
  );
};

export default StrategySelector;
