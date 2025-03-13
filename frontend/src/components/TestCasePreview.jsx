import { useState } from 'react'
import { FiChevronDown, FiChevronUp, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'

function TestCasePreview({ testCases = [] }) {
  const [expandedCase, setExpandedCase] = useState(null)
  
  if (!testCases.length) {
    return null
  }
  
  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">생성된 테스트 케이스</h2>
      
      <div className="overflow-hidden border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">기능</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">테스트 케이스</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">우선순위</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상세</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {testCases.map((testCase, index) => (
              <TestCaseRow 
                key={testCase.id || index}
                testCase={testCase}
                index={index}
                isExpanded={expandedCase === index}
                toggleExpand={() => setExpandedCase(expandedCase === index ? null : index)}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-3 text-sm text-gray-500">
        <p>총 {testCases.length}개의 테스트 케이스가 생성되었습니다.</p>
      </div>
    </div>
  )
}

function TestCaseRow({ testCase, index, isExpanded, toggleExpand }) {
  // 우선순위에 따른 스타일 
  const priorityStyles = {
    'High': 'bg-red-100 text-red-800',
    'Medium': 'bg-yellow-100 text-yellow-800',
    'Low': 'bg-green-100 text-green-800',
  }
  
  const priorityStyle = priorityStyles[testCase.priority] || 'bg-gray-100 text-gray-800'
  
  return (
    <>
      <tr className={isExpanded ? 'bg-gray-50' : 'hover:bg-gray-50'}>
        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">TC-{String(index + 1).padStart(3, '0')}</td>
        <td className="px-4 py-3 text-sm text-gray-900">{testCase.feature || '-'}</td>
        <td className="px-4 py-3 text-sm text-gray-900">
          {testCase.name || testCase.description?.substring(0, 60) + '...' || '-'}
        </td>
        <td className="px-4 py-3 whitespace-nowrap">
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${priorityStyle}`}>
            {testCase.priority || 'Medium'}
          </span>
        </td>
        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
          <button
            onClick={toggleExpand}
            className="text-primary-600 hover:text-primary-800"
          >
            {isExpanded ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
          </button>
        </td>
      </tr>
      
      {isExpanded && (
        <tr>
          <td colSpan={5} className="bg-gray-50 px-4 py-4">
            <div className="rounded border border-gray-200 bg-white p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">설명</h4>
                  <p className="text-sm text-gray-600 whitespace-pre-line">{testCase.description || '-'}</p>
                  
                  {testCase.preconditions && (
                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">전제 조건</h4>
                      <p className="text-sm text-gray-600 whitespace-pre-line">{testCase.preconditions}</p>
                    </div>
                  )}
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">테스트 단계</h4>
                  {testCase.steps?.length > 0 ? (
                    <ol className="list-decimal list-inside text-sm space-y-1 text-gray-600">
                      {testCase.steps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  ) : (
                    <p className="text-sm text-gray-600">-</p>
                  )}
                  
                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">예상 결과</h4>
                    <p className="text-sm text-gray-600 whitespace-pre-line">{testCase.expected_result || '-'}</p>
                  </div>
                  
                  <div className="mt-3 flex items-center">
                    <h4 className="text-sm font-medium text-gray-700 mr-2">상태:</h4>
                    <span className="flex items-center">
                      {testCase.status === 'Passed' ? (
                        <FiCheckCircle className="text-green-500 mr-1" />
                      ) : (
                        <FiAlertCircle className="text-gray-400 mr-1" />
                      )}
                      <span className="text-sm">{testCase.status || '대기 중'}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

export default TestCasePreview