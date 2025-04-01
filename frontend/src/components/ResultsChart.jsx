import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const ResultsChart = ({ poll }) => {
  const data = {
    labels: poll.options.map(opt => opt.option),
    datasets: [
      {
        data: poll.options.map(opt => opt.votes || 0),
        backgroundColor: [
          '#4361ee',
          '#3f37c9',
          '#4cc9f0',
          '#4895ef',
          '#560bad',
          '#7209b7',
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    plugins: {
      legend: {
        position: 'right',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((acc, curr) => acc + curr, 0)
            const value = context.raw
            const percentage = Math.round((value / total) * 100)
            return `${context.label}: ${value} votes (${percentage}%)`
          }
        }
      }
    }
  }

  return (
    <div className="h-64 md:h-80">
      <Pie data={data} options={options} />
    </div>
  )
}

export default ResultsChart