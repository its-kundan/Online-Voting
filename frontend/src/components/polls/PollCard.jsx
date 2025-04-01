import { Link } from 'react-router-dom'

const PollCard = ({ poll }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{poll.question}</h3>
        <p className="text-gray-600 mb-4">
          {poll.options.length} options • {poll.options.reduce((acc, opt) => acc + (opt.votes || 0), 0)} votes
        </p>
        <Link
          to={`/polls/${poll._id}`}
          className="inline-block text-primary hover:text-primary-dark font-medium"
        >
          View Poll →
        </Link>
      </div>
    </div>
  )
}

export default PollCard