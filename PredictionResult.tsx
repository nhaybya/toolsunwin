import { useAppContext } from '../context/AppContext';

const PredictionResult: React.FC = () => {
  const { lastPrediction, recordPredictionResult, showPrediction } = useAppContext();
  
  if (!lastPrediction || !showPrediction) {
    return null;
  }
  
  const handleResultSuccess = () => {
    recordPredictionResult(true);
  };
  
  const handleResultFail = () => {
    recordPredictionResult(false);
  };
  
  return (
    <div className="mb-6">
      <div className="bg-dark-light rounded-xl p-4 shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-semibold font-montserrat">🔮 Kết quả dự đoán</h2>
          <div className={`px-2 py-1 text-xs font-medium rounded ${
            lastPrediction.type === 'TÀI' ? 'bg-success/20 text-success' : 'bg-secondary/20 text-secondary'
          }`}>
            {lastPrediction.type === 'TÀI' 
              ? <><i className="fas fa-arrow-up text-success mr-1"></i> TÀI (11-18)</>
              : <><i className="fas fa-arrow-down text-secondary mr-1"></i> XỈU (3-10)</>
            }
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Main Prediction */}
          <div className="bg-dark-lighter p-4 rounded-lg border-2 border-primary/30">
            <h3 className="text-sm font-medium text-gray-300 mb-2">Dự đoán chính</h3>
            <div className="flex items-center">
              <span className="text-5xl font-bold font-inter text-primary">{lastPrediction.primaryNumber}</span>
              <div className="ml-4">
                <div className="text-sm font-medium">Độ tin cậy: {lastPrediction.confidence}%</div>
                <div className="mt-1 flex">
                  <div className="w-32 bg-dark rounded-full h-2 overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: `${lastPrediction.confidence}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Secondary Predictions */}
          <div className="bg-dark-lighter p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-300 mb-2">Dự đoán phụ</h3>
            <div className="flex space-x-3 items-center">
              {lastPrediction.secondaryNumbers.map((number, index) => (
                <div key={index} className="flex items-center justify-center h-12 w-12 rounded-full bg-dark text-white font-medium text-xl">
                  {number}
                </div>
              ))}
            </div>
            
            <h3 className="text-sm font-medium text-gray-300 mt-5 mb-2">Nên tránh</h3>
            <div className="flex flex-wrap gap-2">
              {lastPrediction.avoid.map((number, index) => (
                <div key={index} className="flex items-center justify-center h-7 w-7 rounded-full bg-danger/20 text-danger text-xs">
                  {number}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Pattern Analysis */}
        <div className="mt-4 bg-dark-lighter p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-300 mb-2">
            <i className="fas fa-chart-line mr-1"></i> Phân tích mẫu
          </h3>
          <div className="text-sm">
            {lastPrediction.pattern === 'TRIANGLE' && 
              `Mẫu hiện tại: Tụ vào một khoảng hẹp. Khả năng cao sẽ có sự đột phá ra khỏi vùng dao động hẹp. Nên chọn ${lastPrediction.type}.`
            }
            {lastPrediction.pattern === 'CHANNEL' && 
              `Mẫu hiện tại: Dao động trong một phạm vi ổn định. Xu hướng đang dao động trong một khoảng ổn định. Theo dõi điểm đảo chiều.`
            }
            {lastPrediction.pattern === 'WAVE' && 
              `Mẫu hiện tại: Dao động ngắn hạn. Xu hướng đang biến động. Khả năng cao sẽ đảo chiều sang ${lastPrediction.type}.`
            }
          </div>
        </div>
        
        {/* Result Feedback */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button 
            onClick={handleResultSuccess}
            className="py-3 bg-success/20 hover:bg-success/30 text-success rounded-lg font-medium transition-all active:scale-95 border border-success/30"
          >
            <i className="fas fa-check-circle mr-1"></i> Dự đoán đúng
          </button>
          <button 
            onClick={handleResultFail}
            className="py-3 bg-danger/20 hover:bg-danger/30 text-danger rounded-lg font-medium transition-all active:scale-95 border border-danger/30"
          >
            <i className="fas fa-times-circle mr-1"></i> Dự đoán sai
          </button>
        </div>
      </div>
    </div>
  );
};

export default PredictionResult;
