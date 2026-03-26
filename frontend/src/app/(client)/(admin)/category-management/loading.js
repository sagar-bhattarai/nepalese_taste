import { FaSpinner } from 'react-icons/fa';
const loading = () => {
    return (
        <div className='flex justify-center py-10'><FaSpinner className='animate-spin' /></div>
    )
}

export default loading