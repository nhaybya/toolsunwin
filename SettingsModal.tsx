import { useAppContext } from '../context/AppContext';

interface SettingsModalProps {
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const { strategy, setStrategy, algorithm, setAlgorithm } = useAppContext();

  const saveSettings = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-dark-light w-full max-w-md rounded-xl p-5 m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold font-montserrat">⚙️ Cài đặt hệ thống</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">🎯 Chiến lược đặt cược</h3>
            <div className="space-y-2">
              <label className="flex items-center p-3 bg-dark-lighter rounded-lg cursor-pointer hover:bg-dark-light">
                <input 
                  type="radio" 
                  name="strategy" 
                  value="normal" 
                  checked={strategy === 'normal'}
                  onChange={() => setStrategy('normal')}
                  className="form-radio text-primary" 
                />
                <span className="ml-2">📊 Thông thường (Cân bằng)</span>
              </label>
              <label className="flex items-center p-3 bg-dark-lighter rounded-lg cursor-pointer hover:bg-dark-light">
                <input 
                  type="radio" 
                  name="strategy" 
                  value="aggressive" 
                  checked={strategy === 'aggressive'}
                  onChange={() => setStrategy('aggressive')}
                  className="form-radio text-secondary"
                />
                <span className="ml-2">🔥 Tích cực (Rủi ro cao)</span>
              </label>
              <label className="flex items-center p-3 bg-dark-lighter rounded-lg cursor-pointer hover:bg-dark-light">
                <input 
                  type="radio" 
                  name="strategy" 
                  value="conservative" 
                  checked={strategy === 'conservative'}
                  onChange={() => setStrategy('conservative')}
                  className="form-radio text-success"
                />
                <span className="ml-2">🛡️ Bảo toàn (An toàn)</span>
              </label>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">🧠 Thuật toán dự đoán</h3>
            <div className="space-y-2">
              <label className="flex items-center p-3 bg-dark-lighter rounded-lg cursor-pointer hover:bg-dark-light">
                <input 
                  type="radio" 
                  name="algorithm" 
                  value="v2" 
                  checked={algorithm === 'v2'}
                  onChange={() => setAlgorithm('v2')}
                  className="form-radio text-primary" 
                />
                <span className="ml-2">V2 (Nâng cao)</span>
              </label>
              <label className="flex items-center p-3 bg-dark-lighter rounded-lg cursor-pointer hover:bg-dark-light">
                <input 
                  type="radio" 
                  name="algorithm" 
                  value="ai" 
                  checked={algorithm === 'ai'}
                  onChange={() => setAlgorithm('ai')}
                  className="form-radio text-secondary"
                />
                <span className="ml-2">AI (Thông minh nhân tạo)</span>
              </label>
            </div>
          </div>
          
          <button 
            onClick={saveSettings}
            className="w-full py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-95"
          >
            Lưu cài đặt
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
