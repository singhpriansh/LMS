export const options = {
  responsive: true,
  scales: {
    yAxes: {
      display: false
    },
    xAxes: {
      display: false
    }
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const Days = [
  'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5',
  'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10',
  'Day 11', 'Day 12', 'Day 13', 'Day 14', 'Day 15',
  'Day 16', 'Day 17', 'Day 18', 'Day 19', 'Day 20',
  'Day 21', 'Day 22', 'Day 23', 'Day 24', 'Day 25',
  'Day 26', 'Day 27', 'Day 28', 'Day 29', 'Day 30',
  'Day 31', 'Day 32', 'Day 33', 'Day 34', 'Day 35',
  'Day 36', 'Day 37', 'Day 38', 'Day 39', 'Day 40',
  'Day 41', 'Day 42', 'Day 43', 'Day 44', 'Day 45',
  'Day 46', 'Day 47', 'Day 48', 'Day 49', 'Day 50'
];

const topics_covered = [
  3, 4, 5, 7, 2,
  6, 9, 3, 7, 4,
  7, 4, 5, 5, 6,
  7, 4, 5, 7, 4,
  6, 4, 5, 6, 5,
  4, 4, 6, 7, 2,
  4, 7, 3, 5, 6,
  1, 3, 4, 3, 3,
  3, 5, 7, 2, 4,
  4, 3, 1, 9, 3
]

export const data = {
  labels: Days,
  datasets: [
    {
      label: 'Topic covered',
      data: topics_covered,
      backgroundColor: 'rgba(153, 102, 235, 0.3)',
      borderColor: 'rgb(153, 102, 235)',
      borderWidth: 1,
    },
  ],
};
