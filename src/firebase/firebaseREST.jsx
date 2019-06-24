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
export const TRANSAKSI_ITEM = ( transaksi ) => {
	let tmp = [];
	fetch( 'https://appotek-ppl.firebaseio.com/transaksi_item/'+transaksi+'.json' ).catch(err => {
		alert( "Something went wrong, sorry :(" );
		console.log( err )
	})
		.then(res => res.json( ))
		.then(parsedRes => {
			for ( let key in parsedRes ) {
				tmp.push({
					...parsedRes[key]
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
			console.log(parsedRes.val());
			return parsedRes;
		});
}
export const GET_CABANG_TOKO = (id) =>{
	fetch( 'https://appotek-ppl.firebaseio.com/cabang/'+id+'/detail_nama_cabang.json' ).catch(err => {
		alert( "Something went wrong, sorry :(" );
		console.log( err )
	})
		.then(res => res.json( ))
		.then(parsedRes => {
			console.log(parsedRes.val());
			console.log("woy");
			// return parsedRes;
		});
}