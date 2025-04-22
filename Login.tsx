import { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const CORRECT_PASSWORD = "Nhayydzvcl";

  const handleLogin = () => {
    if (password === CORRECT_PASSWORD) {
      onLogin();
    } else {
      setAttemptCount(prev => prev + 1);
      if (attemptCount >= 1) {
        alert('Sai mật khẩu. Vui lòng liên hệ admin để được hỗ trợ.');
      } else {
        alert('Mật khẩu không đúng. Vui lòng thử lại!');
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh]">
      <div className="w-full max-w-md px-6 py-8 bg-dark-light rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-montserrat bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text">NHAYY PREMIUM</h1>
          <div className="mt-2 text-gray-300 text-sm">Phiên bản 5.0 Ultimate</div>
          <div className="flex justify-center mt-4">
            <span className="inline-flex h-1.5 w-12 rounded-full bg-primary animate-pulse-slow"></span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-dark-lighter p-3 rounded-lg">
            <div className="text-gray-300 text-xs mb-1.5">⚡ Tính năng cao cấp:</div>
            <div className="text-white text-sm grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <i className="fas fa-brain text-primary mr-2"></i>
                <span>AI Phân tích</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-chart-line text-primary mr-2"></i>
                <span>Dự đoán chuẩn xác</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-shield-alt text-primary mr-2"></i>
                <span>Bảo vệ tối ưu</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-tachometer-alt text-primary mr-2"></i>
                <span>Real-time Engine</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="block w-full px-4 py-3 bg-dark text-white border border-dark-lighter rounded-lg focus:outline-none focus:ring-1 focus:ring-primary" 
              placeholder="🔑 Nhập mật khẩu"
            />
            <div className="absolute inset-y-0 right-0 flex items-center px-3">
              <i 
                className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'} cursor-pointer text-gray-400 hover:text-primary`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>
          </div>
          
          <button 
            onClick={handleLogin}
            className="w-full py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-95 text-white"
          >
            ✨ Xác Nhận
          </button>
          
          <div className="text-center mt-4">
            <p className="text-gray-400 text-xs">Bản quyền © 2023 | Phiên bản cao cấp</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
