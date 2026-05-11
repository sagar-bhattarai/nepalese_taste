"use client"

const SortBy = ({ setSort, ItemName, classes = "" }) => {
    return (
        <select
            className={classes}
            name="sort"
            id="sort"
            onChange={(e) => setSort(e.target.value)}
        >
            <option value="latest">Select Sort</option>

            <option value="latest">Latest {ItemName}</option>
            <option value="oldest">Oldest {ItemName}</option>

            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>

            <option value="name_asc">Name: A - Z</option>
            <option value="name_desc">Name: Z - A</option>
        </select>
    );
};

export default SortBy





{/*
    

    const SortBy = ({ setSort, ItemName, classes="" }) => {
    return (
        <>
                <select
                    className={classes}
                    name="sort"
                    id="sort"
                    onChange={(e) => setSort(e.target.value)}>
                    <option value={JSON.stringify({ createdAt: -1 })}>By Default</option> 
                    <option value={JSON.stringify({ createdAt: -1 })}>Latest {ItemName}</option>
                    <option value={JSON.stringify({ createdAt: 1 })}>Oldest {ItemName}</option>
                    <option value={JSON.stringify({ lowTohigh: -1 })}>Price: High to Low</option>
                    <option value={JSON.stringify({ highToLow: 1 })}>Price: Low to High</option>
                    <option value={JSON.stringify({ asc: 1 })}>Name: A - Z</option>
                    <option value={JSON.stringify({ dec: -1 })}>Name: Z - A</option>
                </select>
            </>
        )
    }


*/}