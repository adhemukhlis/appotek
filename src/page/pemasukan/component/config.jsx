export const data = {
	labels: [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'Agustus',
		'September',
		'October',
		'November',
		'December'
	],
	datasets: [
		{
			label: 'Jakarta',
			backgroundColor: 'rgba(2,44,122,0.4)',
			borderColor: 'rgba(2,44,122,1)',
			data: [
				10000000,
				12000000,
				17000000,
				16000000,
				20000000,
				19000000,
				20000000,
				21000000,
				22000000,
				24000000,
				21000000,
				23000000
			],
			fill: false
		}, {
			label: 'Purwokerto 1',
			fill: false,
			backgroundColor: 'rgba(236,15,71,0.4)',
			borderColor: 'rgba(236,15,71,1)',
			data: [
				8000000,
				10000000,
				14000000,
				15000000,
				19500000,
				21000000,
				18000000,
				20000000,
				17000000,
				22000000,
				24000000,
				21000000
			]
		}, {
			label: 'Purwokerto 2',
			fill: false,
			backgroundColor: 'rgba(75,192,192,0.4)',
			borderColor: 'rgba(75,192,192,1)',
			data: [
				7500000,
				8000000,
				10000000,
				13000000,
				12000000,
				15000000,
				19000000,
				17000000,
				20000000,
				19000000,
				21000000,
				24000000
			]
		}
	]
};
function daysInMonth( month, year ) {
	return new Date( year, month, 0 ).getDate( )
}
let databln_label =[]
let databln_val1 =[]
let databln_val2 =[]
let databln_val3 =[]
let min = 120000
let max = 500000
for (let index = 0; index < daysInMonth(4,2019); index++) {
	databln_label.push(index+1)
	databln_val1.push(min+Math.random()*(max-min))	
	databln_val2.push(min+Math.random()*(max-min))	
	databln_val3.push(min+Math.random()*(max-min))	
}
export const data_bln = {
	labels: databln_label,
	datasets: [
		{
			label: 'Jakarta',
			backgroundColor: 'rgba(2,44,122,0.4)',
			borderColor: 'rgba(2,44,122,1)',
			data:databln_val1,
			fill: false
		}, {
			label: 'Purwokerto 1',
			fill: false,
			backgroundColor: 'rgba(236,15,71,0.4)',
			borderColor: 'rgba(236,15,71,1)',
			data: databln_val2
		}, {
			label: 'Purwokerto 2',
			fill: false,
			backgroundColor: 'rgba(75,192,192,0.4)',
			borderColor: 'rgba(75,192,192,1)',
			data: databln_val3
		}
	]
};
export const option =(label, title) => ({
	responsive: true,
	title: {
		display: true,
		text: 'Diagram Pemasukan Seluruh Cabang'
	},
	tooltips: {
		mode: 'index',
		intersect: false,
		callbacks: {
			label: ( tooltipItem, data ) => {
				return "Rp" + Number( tooltipItem.yLabel )
					.toFixed( 0 )
					.replace( /./g, function ( c, i, a ) {
						return i > 0 && c !== "." && ( a.length - i ) % 3 === 0
							? "." + c
							: c
					})
			}
		},
		itemSort: ( a, b, data ) => b.yLabel - a.yLabel
	},
	hover: {
		mode: 'nearest',
		intersect: true
	},
	scales: {
		xAxes: [
			{
				display: true,
				scaleLabel: {
					display: true,
					labelString: label
				}
			}
		],
		yAxes: [
			{
				display: true,
				scaleLabel: {
					display: true,
					labelString: 'Value'
				},
				ticks: {
					beginAtZero: true
				}
			}
		]
	}
})