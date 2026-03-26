
const LoadingTableRow = () => {
    return (<tr className="bg-gray-500 w-full h-5"> </tr>)
}

const mediasLoading = () => {
    return (
        <div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input
                                    id="checkbox-all"
                                    type="checkbox"
                                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor="checkbox-all" className="sr-only">
                                    checkbox
                                </label>
                            </div>
                        </th>
                        <th scope="col" className="px-4 py-3">
                            File
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Type
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Size
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Last Modified
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <LoadingTableRow />
                    <LoadingTableRow />
                    <LoadingTableRow />
                    <LoadingTableRow />
                    <LoadingTableRow />
                    <LoadingTableRow />
                    <LoadingTableRow />
                    <LoadingTableRow />
                    <LoadingTableRow />
                    <LoadingTableRow />
                </tbody>
            </table>
        </div>
    )
}

export default mediasLoading