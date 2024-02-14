export function Card ({
  type
}: {
  type: 'normal' | 'dynamic'
}) {
  return (
    <article className="border-[10px] border-neutral-400 rounded-xl h-[300px] w-full animate-pulse">
      <div className="flex flex-col h-full">
        <div className="py-4 h-[68px] bg-neutral-200 flex justify-center items-center">
          <div className="animate-pulse bg-neutral-400 h-8 rounded-xl w-56"></div>
        </div>
        {
          type === 'normal' ? (
            <div className="grow flex items-center justify-center">
              <div className="h-12 w-40 rounded-xl animate-pulse bg-neutral-300"></div>
            </div>
          ) : (
            <div className="grow flex flex-col items-center justify-start gap-4">
              <div className="h-8 w-32 bg-neutral-300 rounded-lg mt-5"></div>
              <div className="mt-4 h-12 w-40 rounded-xl animate-pulse bg-neutral-300"></div>
            </div>
          )
        }
      </div>
    </article>
  )
}

export const CardsSkeleton = () => {
  return (
    <div className="mt-5 px-2 grid" style={{
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 500px))',
      justifyContent: 'center',
      gap: '32px',
      alignItems: 'center'
    }}>
      <Card type='normal' />
      <Card type='normal' />
      <Card type='dynamic' />
    </div>
  )
}

export const ChartLineSkeleton = () => {
  return (
    <div className='h-[500px] bg-neutral-200 w-full max-w-[780px] rounded-xl animate-pulse border-[10px] border-neutral-300'></div>
  )
}

export const ChartBarSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-x-14 gap-y-8 justify-center items-center py-10 px-5">
      <div className='h-[500px] bg-neutral-200 w-full max-w-[780px] rounded-xl animate-pulse flex gap-4 items-end p-5'>
        <div className="h-[400px] bg-neutral-400 animate-pulse rounded-lg grow"></div>
        <div className="h-[350px] bg-neutral-400 animate-pulse rounded-lg grow"></div>
        <div className="h-[140px] bg-neutral-400 animate-pulse rounded-lg grow"></div>
        <div className="h-[280px] bg-neutral-400 animate-pulse rounded-lg grow"></div>
        <div className="h-[150px] bg-neutral-400 animate-pulse rounded-lg grow"></div>
        <div className="h-[120px] bg-neutral-400 animate-pulse rounded-lg grow"></div>

        <div className="h-[230px] bg-neutral-400 animate-pulse rounded-lg grow"></div>
        <div className="h-[190px] bg-neutral-400 animate-pulse rounded-lg grow"></div>
        <div className="h-[375px] bg-neutral-400 animate-pulse rounded-lg grow"></div>
        <div className="h-[180px] bg-neutral-400 animate-pulse rounded-lg grow"></div>
        <div className="h-[200px] bg-neutral-400 animate-pulse rounded-lg grow"></div>
        <div className="h-[155px] bg-neutral-400 animate-pulse rounded-lg grow"></div>
      </div>
      <ChartLineSkeleton />
    </div>
  )
}