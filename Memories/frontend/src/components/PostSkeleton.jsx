const PostSkeleton = () => {
  return (
    <div className='flex flex-wrap gap-5'>
      {[...Array(6)].map((_, index) => {
        return <>
        <div className='flex flex-col justify-start bg-[rgba(84,84,84,0.6)] md:bg-[rgba(84,84,84,0.4)] backdrop-blur-5xl p-4 rounded-md w-85 md:w-80 max-w-90 h-100'>
          <div className='flex flex-col gap-2'>
            <div className='bg-[rgba(84,84,84,0.6)] rounded-md h-60 animate-pulse'></div>
            <div className='bg-[rgba(84,84,84,0.6)] rounded-md h-4 animate-pulse'></div> 
            <div className='bg-[rgba(84,84,84,0.6)] rounded-md w-26 h-4 animate-pulse'></div>
            <div className='bg-[rgba(84,84,84,0.6)] rounded-md w-50 h-4 animate-pulse'></div> 
            <div className='bg-[rgba(84,84,84,0.6)] rounded-md w-70 h-4 animate-pulse'></div> 
            <div className='bg-[rgba(84,84,84,0.6)] rounded-md w-30 h-4 animate-pulse'></div> 
          </div> 
        </div>
        </>;
      })}
    </div>
  )
}

export default PostSkeleton
