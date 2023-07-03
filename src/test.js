export function addButtonGenerateData() {
	const cleanMatrix = document.querySelector('.control-matrix__clean');

	const btnGenerateMatrix = document.createElement('button');
	btnGenerateMatrix.classList.add('btn');
	btnGenerateMatrix.innerText = 'Добавить тестовые данные'
	btnGenerateMatrix.addEventListener("click", (event) => {
		const mA = document.querySelector('#matA');
		const mB = document.querySelector('#matB');
		mA.querySelectorAll('input').forEach(el => el.value = 4);
		mB.querySelectorAll('input').forEach(el => el.value = 5);
	});

	const br = document.createElement('br');

	cleanMatrix.append(br, btnGenerateMatrix);
}

export default addButtonGenerateData;