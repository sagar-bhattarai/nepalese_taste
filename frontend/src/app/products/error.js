"use client"

const ErrorComponent = ({error}) => {
        console.log("error", error);

  return (
    <div className="py-20">
       <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-center text-red-600">
            <h2 className="text-3xl font-semibold mb-5">Oops! Something went wrong!</h2>
            <p className="text-lg">{error.message}</p>
          </div>
       </div>
    </div>
  )
}

export default ErrorComponent