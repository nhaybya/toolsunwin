import { useAppContext } from '../context/AppContext';

interface StatsModalProps {
  onClose: () => void;
}

const StatsModal: React.FC<StatsModalProps> = ({ onClose }) => {
  const { stats } = useAppContext();
  
  const winRate = stats.totalGames > 0 
    ? Math.round((stats.winGames / stats.totalGames) * 100) 
    : 0;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-dark-light w-full max-w-md rounded-xl p-5 m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold font-montserrat">📊 Thống kê chi tiết</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-dark-lighter p-3 rounded-lg">
              <div className="text-xs text-gray-400 mb-1">Tổng phiên</div>
              <div className="text-xl font-semibold font-inter">{stats.totalGames}</div>
            </div>
            <div className="bg-dark-lighter p-3 rounded-lg">
              <div className="text-xs text-gray-400 mb-1">Phiên thắng</div>
              <div className="text-xl font-semibold font-inter text-success">{stats.winGames}</div>
            </div>
          </div>
          
          <div className="bg-dark-lighter p-3 rounded-lg">
            <div className="text-xs text-gray-400 mb-1">Tỉ lệ thắng</div>
            <div className="flex items-center">
              <div className="text-xl font-semibold font-inter">{winRate}%</div>
              <div className="ml-auto">
                <div className="w-32 bg-dark rounded-full h-2.5 overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: `${winRate}%` }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-dark-lighter p-3 rounded-lg">
              <div className="text-xs text-gray-400 mb-1">Streak thắng</div>
              <div className="text-xl font-semibold font-inter text-success">{stats.winningStreak}</div>
            </div>
            <div className="bg-dark-lighter p-3 rounded-lg">
              <div className="text-xs text-gray-400 mb-1">Streak thua</div>
              <div className="text-xl font-semibold font-inter text-danger">{stats.losingStreak}</div>
            </div>
          </div>
          
          <div className="bg-dark-lighter p-4 rounded-lg mt-4">
            <h3 className="text-sm font-medium mb-3">Lịch sử 10 phiên gần nhất</h3>
            <div className="space-y-2">
              {stats.history.length === 0 ? (
                <div className="text-sm text-gray-400 text-center py-2">Chưa có dữ liệu</div>
              ) : (
                stats.history.slice(-10).reverse().map((session, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center justify-between p-2 rounded-lg ${session.result === 'win' ? 'bg-success/10' : 'bg-danger/10'}`}
                  >
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-dark-lighter flex items-center justify-center text-xs mr-2">
                        {stats.history.slice(-10).length - index}
                      </div>
                      <div className="text-sm">
                        Dự đoán: {session.prediction} - {session.type}
                      </div>
                    </div>
                    <div className={`text-xs font-medium px-2 py-1 rounded ${session.result === 'win' ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'}`}>
                      {session.result === 'win' ? 'Thắng' : 'Thua'}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsModal;
