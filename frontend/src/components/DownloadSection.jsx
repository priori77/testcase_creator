import { useState } from 'react'
import { FiDownload, FiCheck } from 'react-icons/fi'

function DownloadSection({ downloadId }) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  
  if (!downloadId) {
    return null
  }
  
  const handleDownload = async () => {
    try {
      setIsDownloading(true)
      
      // 파일 다운로드 링크 생성
      const response = await fetch(`/api/download?id=${downloadId}`)
      
      if (!response.ok) {
        throw new Error('파일 다운로드에 실패했습니다.')
      }
      
      // 파일 다운로드
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = `테스트케이스_${new Date().toISOString().slice(0, 10)}.xlsx`
      document.body.appendChild(a)
      a.click()
      
      // 정리
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      
      setDownloaded(true)
    } catch (error) {
      console.error('Download error:', error)
      alert(error.message)
    } finally {
      setIsDownloading(false)
    }
  }
  
  return (
    <div className="card text-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Excel 파일 다운로드</h2>
      
      <p className="text-gray-600 mb-6">
        생성된 테스트 케이스를 Excel 파일로 다운로드하세요.
      </p>
      
      <button
        onClick={handleDownload}
        disabled={isDownloading || downloaded}
        className={`btn flex items-center justify-center mx-auto ${
          downloaded 
            ? 'bg-green-100 text-green-700 hover:bg-green-100' 
            : 'btn-primary'
        }`}
      >
        {isDownloading ? (
          <span className="inline-flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            다운로드 중...
          </span>
        ) : downloaded ? (
          <span className="inline-flex items-center">
            <FiCheck className="mr-2" />
            다운로드 완료
          </span>
        ) : (
          <span className="inline-flex items-center">
            <FiDownload className="mr-2" />
            Excel 파일 다운로드
          </span>
        )}
      </button>
    </div>
  )
}

export default DownloadSection