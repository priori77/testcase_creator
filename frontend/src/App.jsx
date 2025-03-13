import React from 'react'
import { FiUpload } from 'react-icons/fi'

function App() {
  return (
    <div className="App min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">게임 테스트 케이스 생성기</h1>
          <p className="text-lg text-gray-600">PDF 문서에서 테스트 케이스를 자동으로 추출합니다.</p>
        </header>
        
        <div className="card">
          <div className="dropzone">
            <FiUpload className="upload-icon mx-auto text-4xl" />
            <p className="text-lg font-medium text-gray-700">PDF 파일을 끌어다 놓거나 클릭하여 업로드하세요</p>
            <p className="text-sm text-gray-500 mt-2">최대 10MB 크기의 PDF 파일을 지원합니다</p>
          </div>
          <div className="file-info mt-4 hidden">
            <p>선택된 파일 정보가 이곳에 표시됩니다</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App