import { FaSearch } from 'react-icons/fa';

export const Search = ({ word = '', onChange, isVisible = true, placeholder, className }) => {
  return isVisible ? (
    <div className={`flex w-full bg-white text-sm  border-2 border-primary-100 items-center rounded-lg overflow-hidden pl-4 ${className}`}>
      <FaSearch className="text-primary-500 pr-3 text-3xl " />
      <input
        type="text"
        className="block w-full text-primary-700 py-3 focus:bg-gray-200   border-0  focus:ring-transparent  outline-none"
        placeholder={placeholder}
        value={word}
        onChange={onChange}
      />
    </div>
  ) : null;
};
