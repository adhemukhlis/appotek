export const LIST_CABANG = (  ) => {
	let tmp = [
		{
			id: 'all',
			nama_cabang: 'All'
		}
	];
	fetch( 'https://appotek-ppl.firebaseio.com/cabang.json' ).catch(err => {
		alert( "Something went wrong, sorry :(" );
		console.log( err )
	})
		.then(res => res.json( ))
		.then(parsedRes => {
			for ( let key in parsedRes ) {
				tmp.push({
					...parsedRes[key],
					id: key
				})
			}
		});
	return tmp
}
export const GET_BARANG = (id) =>{
	fetch( 'https://appotek-ppl.firebaseio.com/barang/'+id+'.json' ).catch(err => {
		alert( "Something went wrong, sorry :(" );
		console.log( err )
	})
		.then(res => res.json( ))
		.then(parsedRes => {
			console.log(parsedRes);
			return parsedRes;
		});
}