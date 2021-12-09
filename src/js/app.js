const s_ = s => { return document.querySelector(s) }
const root = document.documentElement.style;

const api = 'https://api.blockchair.com/ethereum/erc-20/0xcc8fa225d80b9c7d42f96e9570156c65d6caaa25/stats';
const api_bs = 'https://api.exchangedyn.com/free/quotes/usdves';

let profile_info = {
	name: 'Name',
	img: 'url(https://i.ibb.co/hXKhqgf/4.jpg)'
};

s_('.name').textContent = profile_info.name;
root.setProperty('--profile_img', `url(${profile_info.img})`);

const ObtenerSLP = () =>
{	// Obtener el valor del SLP
	s_('.usd').textContent = '...';
	s_('.bs').textContent = '...';
	fetch(api)
		.then(response => response.json())
		.then(api => {
			const usd = api.data.market_price_usd.toFixed(3) + ' USD';			
			const usd_ = api.data.market_price_usd;
			s_('.usd').textContent = usd;

				// Obtener el valor del Bs
				fetch(api_bs)
					.then(response => response.json())
					.then(api => {
						const bs = api.sources[5].quote;
						const calculo = (usd_ * bs).toFixed(2) + ' Bs.S';
						s_('.bs').textContent = calculo;
					});

		});
}

const ObtenerIP = () =>
{
	fetch('https://api.ipify.org/?format=json')
		.then(response => response.json())
		.then(api => {
			s_('.ip').textContent = api.ip;
		});
}


window.onload = () => {
	ObtenerIP();
	ObtenerSLP();

	setInterval(()=>{
		ObtenerSLP();
	}, 10000)
}

const form = s_('.searcher_cont');
const searcher = s_('.searcher');

form.addEventListener('submit', (e)=>{
	e.preventDefault();
	const valor = searcher.value;

	window.open(`https://google.com/search?q=${valor}`, '_BLANK');		
});





// User function
const profile     = s_('.profile');
const close_modal = s_('.close_modal');
const name_input  = s_('.name_input');
const profile_img = s_('.profile_img');

profile.addEventListener('click', ()=>
{
	s_('.modal_user').classList.add('modal_user_active');
	s_('.ghost').classList.add('ghost_active');

	setTimeout(()=>
	{
		s_('.modal_user').classList.add('modal_user_animation')
	}, 0)
});

close_modal.addEventListener('click', ()=>
{
	s_('.modal_user').classList.remove('modal_user_animation')
	s_('.ghost').classList.remove('ghost_active');
	

	setTimeout(()=>
	{
		s_('.modal_user').classList.remove('modal_user_active');
	}, 200)
});

name_input.addEventListener('keyup', (e)=>
{
	const name = e.target.value;
	s_('.name').textContent = name;

	window.localStorage.setItem('name', name);		

	if (e.target.value === "") {
		s_('.name').textContent = "Name";
		window.localStorage.setItem('name', 'Name');		
	}
});

profile_img.addEventListener('click', ()=>
{
	const input = document.createElement('input');
	input.type = 'file';
	input.accept = 'image/*';
	input.click();
	
	input.addEventListener('change', (e)=>
	{
		const reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
			reader.addEventListener('load', ()=>
			{
				const img = reader.result;
				root.setProperty('--profile_img', `url(${img})`);
				window.localStorage.setItem('img', img);
			});
	});
});

if (window.localStorage.getItem('img')) {
	const img =  (window.localStorage.getItem('img'));
	root.setProperty('--profile_img', `url(${img})`);
}

if (window.localStorage.getItem('name')) {
	const name =  (window.localStorage.getItem('name'));
	s_('.name').textContent = name;
}



/* Creador xd */
s_('.creator').addEventListener('click', ()=>
{
	window.open('https://github.com/Tufowin?tab=repositories', '_BLANK');
});