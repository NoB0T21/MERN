import { useContext, useState } from "react"
import {Search} from '../Icons/Icons.jsx';
import {api} from '../../utils/api.js'
import { DataContext } from '../../context/DataProvider.jsx';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
  const navigate = useNavigate();
  const {setSearchData} = useContext(DataContext)
    const [formDatas, setFormData] = useState({
    title:'',tags:[]
  })
  const [inputValue, setInputValue] = useState('');
  const [isloding, SetIsloding] = useState(false);

  const handleInputChange = (e) => {setInputValue(e.target.value)};

  const handleInputKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ',' && inputValue.trim() !== '') {
        const newTags = inputValue
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)
      .map(tag => (tag.startsWith('#') ? tag : `#${tag}`))
      .filter(tag => !formDatas.tags.includes(tag));
      
      if (newTags.length > 0) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, ...newTags],
        }));
      }
        setInputValue('');
      }
    };
    const removeTag = (indexToRemove) => {
      setFormData((prev) => ({
        ...prev,
        tags: prev.tags.filter((_, index) => index !== indexToRemove),
      }));
    };
    
    const handleSubmit = async (e) => {
    e.preventDefault();
    const currentTags = [...formDatas.tags]; // ensure current value
    const tagString = currentTags.join(',');
    let url = `/explore/search?searchQuery=${formDatas.title}`;
    if (tagString) {
      url += `&tags=${encodeURIComponent(tagString)}`;
    }
    const data = await api.get(url);
    setSearchData(data.data)
    navigate(url);
  }
  return (
    <>
      <div className='hidden md:flex flex-col justify-center items-center gap-2 bg-[rgba(84,84,84,0.6)] shadow-xl backdrop-blur-5xl p-3 rounded-md w-65 lg:w-70 xl:w-75 max-w-130 h-80 max-h-70'>
        <h2 className='font-semibold text-2xl'>Search a Memory</h2>
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-3 px-2 w-full text-white">
          <div className="relative w-full">
            <input onChange={(e) => {setFormData({...formDatas, title: e.target.value})}} value={formDatas.title}
              className="peer bg-zinc-800 p-2 border border-zinc-800 focus:border-indigo-500 rounded-md outline-none w-[97%] h-10 text-white transition-all duration-200" type="text"/>
            <label className="left-4 absolute bg-zinc-800 px-1 border border-zinc-800 peer-focus:border-indigo-500 rounded-sm text-gray-400 text-md peer-focus:text-[#fff] peer-valid:text-[#fff] scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-2 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
              <span>Search</span>
            </label>
          </div>
          <div className="relative w-full">
            <input onKeyDown={handleInputKeyDown} onChange={(e) => {handleInputChange(e)}} value={inputValue}
              className="peer bg-zinc-800 p-2 border border-zinc-800 focus:border-indigo-500 rounded-md outline-none w-[97%] h-10 text-white transition-all duration-200" type="text"/>
              {formDatas.tags.length > 0 && 
              <>
                <div className="flex flex-wrap gap-2 mt-2 w-full h-13 overflow-auto">
                  {formDatas.tags.map((tag, index) => (
                    <span key={index} className="flex items-center gap-1 bg-zinc-800 px-2 py-1 rounded-full h-8 text-white text-sm">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="flex justify-center items-center bg-zinc-700 rounded-full w-4 h-4"
                      >
                        <span>x</span>
                      </button>
                    </span>
                  ))}
                </div>
              </>
              }
            <label className="top-0 left-4 absolute bg-zinc-800 px-1 border border-zinc-800 peer-focus:border-indigo-500 rounded-sm text-gray-400 text-md peer-focus:text-[#fff] peer-valid:text-[#fff] scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-2 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
              <span>Tags</span>
            </label>
          </div>
          <button disabled={isloding} className="z-1 before:-z-1 before:absolute relative flex justify-center items-center gap-2 bg-indigo-700 before:bg-indigo-600 shadow-lg mt-2 p-1 xl:p-2 rounded-md w-full before:w-0 hover:before:w-full before:h-full overflow-hidden transition-all before:transition-all duration-300 before:duration-350" type="submit" value="Upload">
            <Search/><h1 className='font-semibold text-[1.1rem]'>Search Post</h1>
          </button>
        </form>
      </div>
    </>
  )
}

export default SearchForm
