import { FiAlertTriangle, FiX } from 'react-icons/fi'

function ErrorAlert({ message, onDismiss }) {
  if (!message) return null
  
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded shadow-sm">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <FiAlertTriangle className="h-5 w-5 text-red-500" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">
            오류가 발생했습니다
          </h3>
          <div className="mt-1 text-sm text-red-700">
            {message}
          </div>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              onClick={onDismiss}
              className="inline-flex rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
            >
              <span className="sr-only">닫기</span>
              <FiX className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorAlert