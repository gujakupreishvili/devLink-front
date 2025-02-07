import React from 'react';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

interface LogoutProps {
  setLogout: (value: boolean) => void;
}

export default function Logout({ setLogout }: LogoutProps) {
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(true);

  const handleLogout = () => {
    deleteCookie('accessToken');
    localStorage.clear();
    sessionStorage.clear();
    router.push('/auth/signUp');
    setLogout(false)
  };
  const handleCancel = () => {
    setIsVisible(false);
    setTimeout(() => setLogout(false), 400);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
    <AnimatePresence>
      {isVisible && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
          <motion.div
            initial={{ y: -300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 10 }}
            className="bg-white p-6 rounded-lg shadow-lg w-[300px] md:w-[400px] text-center lg:h-[200px] flex flex-col justify-center items-center"
          >
            <p className="text-lg font-bold mb-4">Are you sure you want to log out?</p>
            <div className="w-full flex justify-between mt-[20px]">
              <button 
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-200 cursor-pointer transition-[2s] "
              >
                Cancel
              </button>
              <button 
              onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-400 cursor-pointer transition-[2s]"
              >
                Logout
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    </div>
  );
}



