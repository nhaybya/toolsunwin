import { useAppContext } from '../context/AppContext';

const StatsSummary: React.FC = () => {
  const { stats } = useAppContext();
  
  const winRate = stats.totalGames > 0 
    ? Math.round((stats.winGames / stats.totalGames) * 100) 
    : 0;

  return (
    <div className="bg-dark-light rounded-xl p-4 shadow-lg">
      <h2 className="text-lg font-semibold font-montserrat mb-3">📊 Thống kê</h2>
      
      <div className="space-y-3">
        <div className="bg-dark-lighter p-3 rounded-lg">
          <div className="text-xs text-gray-400 mb-1">Tổng phiên</div>
          <div className="text-xl font-semibold font-inter">{stats.totalGames}</div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-dark-lighter p-3 rounded-lg">
            <div className="text-xs text-gray-400 mb-1">Thắng</div>
            <div className="text-lg font-semibold font-inter text-success">{stats.winGames}</div>
          </div>
          <div className="bg-dark-lighter p-3 rounded-lg">
            <div className="text-xs text-gray-400 mb-1">Tỉ lệ</div>
            <div className="text-lg font-semibold font-inter">{winRate}%</div>
          </div>
        </div>
        
        <div className="bg-dark-lighter p-3 rounded-lg">
          <div className="text-xs text-gray-400 mb-1">Chuỗi thắng</div>
          <div className="flex items-end">
            <div className="text-lg font-semibold font-inter">{stats.winningStreak}</div>
            <div className="text-xs text-gray-400 ml-1 mb-0.5">liên tiếp</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSummary;
