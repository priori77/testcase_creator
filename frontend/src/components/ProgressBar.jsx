import { useState, useEffect } from 'react'

function ProgressBar({ stage = 0, stageNames = [] }) {
  const [progress, setProgress] = useState(0)
  const totalStages = stageNames.length - 1
  const stageProgress = stage > 0 ? ((stage - 1) / (totalStages - 1)) * 100 : 0
  
  // 각 단계 내에서 애니메이션 효과 추가
  useEffect(() => {
    if (stage === 0) {
      setProgress(0)
      return
    }
    
    // 단계가 바뀔 때마다 진행 상태 초기화
    setProgress(stageProgress)
    
    // 현재 단계에서의 미세 진행률 애니메이션
    const interval = setInterval(() => {
      // 랜덤하게 약간씩 증가 (다음 단계 전까지)
      setProgress(prev => {
        const nextProgress = stageProgress + Math.random() * 3
        const maxProgress = stage === totalStages ? 100 : (stage / (totalStages - 1)) * 100 - 3
        return Math.min(nextProgress, maxProgress)
      })
    }, 800)
    
    return () => clearInterval(interval)
  }, [stage, stageProgress, totalStages])
  
  return (
    <div>
      <div className="mb-2 flex justify-between items-center">
        <div className="text-sm font-medium text-gray-700">
          {stageNames[stage] || '처리 중...'}
        </div>
        <div className="text-sm font-medium text-gray-500">
          {Math.round(progress)}%
        </div>
      </div>
      
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
        <div 
          style={{ width: `${progress}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500 transition-all duration-300 ease-in-out"
        />
      </div>
      
      <div className="flex justify-between">
        {stageNames.map((name, idx) => (
          <div 
            key={idx} 
            className={`text-xs ${idx <= stage ? 'text-primary-600 font-medium' : 'text-gray-400'}`}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProgressBar