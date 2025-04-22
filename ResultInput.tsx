import { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const ResultInput: React.FC = () => {
  const { gameResults, addGameResult, analyzePrediction } = useAppContext();
  const [inputValue, setInputValue] = useState('');

  const handleAnalyzeClick = () => {
    const input = inputValue.trim();
    
    if (gameResults.length === 0) {
      // First time input - expecting 6 numbers
      const numbers = input.split('-').map(n => parseInt(n.trim()));
      
      if (validateInput(numbers)) {
        for (const num of numbers) {
          addGameResult(num);
        }
        setInputValue('');
        analyzePrediction();
      } else {
        alert('Vui lòng nhập đúng định dạng với 6 số từ 3 đến 18 (ví dụ: 11-9-15-12-8-13)');
      }
    } else {
      // Subsequent inputs - just one number
      const newNumber = parseInt(input);
      
      if (validateSingleNumber(newNumber)) {
        addGameResult(newNumber);
        setInputValue('');
        analyzePrediction();
      } else {
        alert('Vui lòng nhập số từ 3 đến 18');
      }
    }
  };

  const validateInput = (numbers: number[]) => {
    if (!Array.isArray(numbers) || numbers.length !== 6) {
      return false;
    }
    return numbers.every(num => !isNaN(num) && num >= 3 && num <= 18);
  };

  const validateSingleNumber = (number: number) => {
    return !isNaN(number) && number >= 3 && number <= 18;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAnalyzeClick();
    }
  };

  return (
    <div className="md:col-span-2 bg-dark-light rounded-xl p-4 shadow-lg">
      <h2 className="text-lg font-semibold font-montserrat mb-3">🎲 Nhập kết quả</h2>
      
      {gameResults.length === 0 ? (
        <div className="bg-dark-lighter p-3 rounded-lg mb-4">
          <p className="text-sm">📝 Nhập 6 kết quả gần nhất (3-18)</p>
          <p className="text-xs text-gray-400">💫 VD: 11-9-15-12-8-13</p>
        </div>
      ) : (
        <div className="bg-dark-lighter p-3 rounded-lg mb-4">
          <p className="text-sm">📊 Kết quả hiện tại:</p>
          <div className="flex mt-2 space-x-2 overflow-x-auto py-1">
            {gameResults.map((result, index) => {
              const isTai = result >= 11;
              return (
                <div 
                  key={index} 
                  className={`flex items-center justify-center h-8 w-8 rounded-full ${isTai ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'} font-medium text-sm`}
                >
                  {result}
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      <div className="flex space-x-2">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-grow px-4 py-3 bg-dark text-white border border-dark-lighter rounded-lg focus:outline-none focus:ring-1 focus:ring-primary" 
          placeholder="Nhập kết quả"
        />
        <button 
          onClick={handleAnalyzeClick}
          className="px-4 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-95"
        >
          <i className="fas fa-magic mr-1"></i> Phân tích
        </button>
      </div>
      
      <div className="mt-3 text-xs text-gray-400">
        <i className="fas fa-info-circle mr-1"></i> Nhập số từ 3-18 hoặc kết quả đầu cách nhau bằng dấu -
      </div>
    </div>
  );
};

export default ResultInput;
