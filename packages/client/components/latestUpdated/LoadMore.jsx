import { useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";

export default function({ setComicArray }) {
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    async function getComicData(pageNum) {
        const response = await fetch("http://localhost:3001/comics/latest_updated", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                limit: 25,
                page: pageNum
            })
        })
        .then(res => res.json())
        if(!response.data) return setHasFinished(true);
        if(response.data.length < 25) setHasFinished(true);
        setIsLoading(false)
        setComicArray(oldEle => [...oldEle, ...response.data])
    }

    const handleClick = () => {
        setIsLoading(true)
        setTimeout(() => {
            getComicData(page);
            setPage(lastNum => lastNum + 1);
        }, 1000)
    }

    if(hasFinished) return;
    return (
        <div className="px-4 w-full mt-4 shadow-xl">
            <div className="py-2 transition-all rounded-md mb-5 mt-2 mx-auto flex text-2xl w-fit px-5 justify-center dark:bg-[#213243] dark:text-slate-200 text-white bg-themeColor items-center">
                { isLoading && <span className="w-fit h-fit animate-spin mr-2"><CgSpinnerTwo /></span> }
                <button className="text-xl disable" onClick={handleClick} disabled={isLoading}>Show more comics</button>
            </div>
        </div>
    )
}