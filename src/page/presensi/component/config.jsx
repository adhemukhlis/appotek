export const data = [
	{
		labels: [
			'1',
			'2',
			'3',
			'4',
			'5',
			'6',
			'7',
			'8',
			'9',
			'10',
			'11'
		],
		datasets: [
			{
				label: 'Kehadiran',
				backgroundColor: 'rgba(75,192,192,0.4)',
				borderColor: 'rgba(75,192,192,1)',
				data: [
					1,
					1,
					1,
					1,
					0,
					1,
					1,
					1,
					1,
					1,
					0
				],
				fill: true
			}
		]
	}, {
		labels: [
			'1',
			'2',
			'3',
			'4',
			'5',
			'6',
			'7',
			'8',
			'9',
			'10',
			'11'
		],
		datasets: [
			{
				label: 'Kehadiran',
				backgroundColor: 'rgba(75,192,192,0.4)',
				borderColor: 'rgba(75,192,192,1)',
				data: [
					1,
					1,
					1,
					1,
					1,
					1,
					0,
					1,
					1,
					1,
					1
				],
				fill: true
			}
		]
	}, {
		labels: [
			'1',
			'2',
			'3',
			'4',
			'5',
			'6',
			'7',
			'8',
			'9',
			'10',
			'11'
		],
		datasets: [
			{
				label: 'Kehadiran',
				backgroundColor: 'rgba(75,192,192,0.4)',
				borderColor: 'rgba(75,192,192,1)',
				data: [
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1
				],
				fill: true
			}
		]
	}
];
export const option = {
	legend: {
		display: false
	},
	responsive: true,
	tooltips: {
		mode: 'index',
		intersect: false
	},
	hover: {
		mode: 'nearest',
		intersect: true
	},
	scales: {
		yAxes: [
			{
				ticks: {
					stepSize: 1,
					max: 1
				}
			}
		]
	}
};