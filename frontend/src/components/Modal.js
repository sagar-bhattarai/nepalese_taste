import { FaTimes } from "react-icons/fa"

const Modal = ({ title, onConfirm, show, setShow, children}) => {
    return (
        <div className={`${show ? " overflow-y-auto overflow-x-hidden bg-gray-800/60 dark:bg-gray-100/20 z-[99] h-full fixed top-0 right-0 left-0  justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)]- max-h-full" : "hidden"}  `}>
            <div className="flex items-center h-full relative p-4 w-full max-w-md max-h-full top-0 right-0  left-0 bottom-0 m-auto">
                <div className="relative w-full min-w-[400px] border border-gray-500 rounded-md shadow-sm p-4 md:p-6 bg-white dark:bg-[#311b45]">
                    {/* <button
                        onClick={() => setShow(false)}
                        type="button" className="absolute top-3 end-2.5 text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center" data-modal-hide="popup-modal">
                        <FaTimes />
                        <span className="sr-only">Close modal</span>
                    </button> */}
                    <div className="p-4 md:p-5 text-center">
                        <h3 className="mb-6 text-body">{title}</h3>
                        {children}
                        <div className="flex items-center space-x-4 justify-between">
                            <button
                                onClick={onConfirm}
                                data-modal-hide="popup-modal" type="button" className="w-full cursor-pointer rounded-md text-white bg-green-600  hover:bg-green-800 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
                                Yes, I'm sure
                            </button>
                            <button
                                onClick={() => setShow(false)}
                                data-modal-hide="popup-modal" type="button" className="w-full cursor-pointer text-body  rounded-md bg-red-600 hover:bg-red-800 hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
                                No, cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal