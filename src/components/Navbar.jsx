import moodleLogo from '../assets/moodle-logo.png';

export default function Navbar({ openLogin, openRegister }) {
  return (
    <nav className="absolute inset-x-0 top-0 z-30 mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-5 sm:px-8 sm:py-6">
        <img
            src={moodleLogo}
            alt="Moodle"
            className="h-auto w-36 object-contain"
        />
        <div className="flex items-center gap-4 sm:gap-6">
            <button 
                onClick={openLogin}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
                Log In
            </button>
            <button 
                onClick={openRegister}
                className="bg-emerald-500 hover:bg-emerald-700 text-white text-sm font-medium py-2 px-5 rounded-full transition-colors cursor-pointer"
            >
                Sign Up
            </button>
        </div>
    </nav>
  );
}