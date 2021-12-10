document.getElementById('defaultMainTabOpen').click();
document.getElementById('defaultEditTabOpen').click();
document.getElementById('defaultslideTabOpen').click();
function openMainTab(evt, cityName) {
	console.log(evt);
	let i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName('mainTabContent');
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = 'none';
	}
	tablinks = document.getElementsByClassName('mainTabLinks');
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace('active', '');
	}
	document.getElementById(cityName).style.display = 'block';
	evt.currentTarget.className += ' active';
}

//----switching tabs in edit profile-----------------

function openTab(evt, cityName) {
	console.log(cityName);
	let i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName('editProfiletabcontent');
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = 'none';
	}
	tablinks = document.getElementsByClassName('tablinks');
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace('active', '');
	}
	document.getElementById(cityName).style.display = 'block';
	evt.currentTarget.className += ' active';
}

function slideTab(evt, cityName) {
	console.log(cityName);
	let i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName('slideTabContent');
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = 'none';
	}
	tablinks = document.getElementsByClassName('slideTabLinks');
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace('activeSlide', '');
	}
	document.getElementById(cityName).style.display = 'flex';
	evt.currentTarget.className += ' activeSlide';
}



// styling upload resume in edit profile-------------
const file = document.querySelector('#file');
file.addEventListener('change', (e) => {
	const [file] = e.target.files;
	const { name: fileName, size } = file;
	const fileSize = (size / 1000).toFixed(2);
	const fileNameAndSize = `${fileName} - ${fileSize}KB`;
	document.querySelector('.file-name').textContent = fileNameAndSize;
});

